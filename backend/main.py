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
    try:
        db_user = db.query(models.User).filter(models.User.username == user.username).first()
        if db_user:
            raise HTTPException(status_code=400, detail="이미 사용 중인 아이디입니다.")
        
        # auth.py 내부에서 passlib 이슈가 발생할 수 있으므로 try-except로 감싸서 확인
        hashed_pw = auth.get_password_hash(user.password)
        
        new_user = models.User(
            username=user.username, 
            hashed_password=hashed_pw
        )
        db.add(new_user)
        db.commit()
        return {"status": "success", "message": "회원가입이 완료되었습니다."}
    except Exception as e:
        # 에러 발생 시 상세 내용을 로그에 출력
        print(f"❌ Signup Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ... (나머지 엔드포인트 유지)