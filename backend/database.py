from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 프로그램을 껐다 켜도 저장되는 SQLite 파일
SQLALCHEMY_DATABASE_URL = "sqlite:///./reneiw.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# DB 세션을 생성하고 닫아주는 함수 (Dependency Injection용)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()