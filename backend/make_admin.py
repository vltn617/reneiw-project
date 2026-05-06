# backend/make_admin.py
from database import SessionLocal
import models

db = SessionLocal()
# 첫 번째 가입한 유저를 관리자로 변경
user = db.query(models.User).first()
if user:
    user.is_admin = True
    db.commit()
    print(f"유저 {user.username}이(가) 관리자가 되었습니다!")
else:
    print("가입된 유저가 없습니다.")
db.close()