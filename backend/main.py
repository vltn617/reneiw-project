from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field, field_validator # validator 대신 field_validator 사용 (v2 기준)
import models, database, auth
import re

# DB 테이블 생성
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# CORS 설정: 포트 번호와 IP를 모두 명시하여 브라우저 차단 방지
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:3004", 
        "http://127.0.0.1:3004"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- [Pydantic Schemas] 통합 정의 ---
class UserCreate(BaseModel):
    username: str = Field(..., min_length=4, max_length=20)
    password: str = Field(..., min_length=8, max_length=72)

    @field_validator('password')
    @classmethod
    def password_complexity(cls, v):
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", v):
            raise ValueError('비밀번호는 최소 하나 이상의 특수문자를 포함해야 합니다.')
        return v

# 나머지 스키마 (CommunityCreate, PostCreate 등)는 그대로 유지
class CommunityCreate(BaseModel):
    name: str
    category: str
    admin_id: int

class PostCreate(BaseModel):
    title: str
    content: str
    user_id: int
    community_id: int

class CommentCreate(BaseModel):
    content: str
    post_id: int
    user_id: int

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(database.get_db)):
    if db.query(models.User).filter(models.User.username == user.username).first():
        raise HTTPException(status_code=400, detail="아이디가 중복됩니다.")
    
    new_user = models.User(
        username=user.username, 
        hashed_password=auth.get_password_hash(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"id": new_user.id, "status": "success"}

@app.post("/set-nickname")
def set_nickname(user_id: int, nickname: str, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user: raise HTTPException(status_code=404, detail="유저 없음")
    
    if db.query(models.User).filter(models.User.nickname == nickname).first():
        raise HTTPException(status_code=400, detail="이미 존재하는 닉네임입니다.")
    
    db_user.nickname = nickname
    db.commit()
    return {"message": "Success"}

@app.post("/login")
def login(user: UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="인증 실패")
    
    token = auth.create_access_token({"sub": db_user.username, "id": db_user.id})
    return {"access_token": token, "nickname": db_user.nickname}