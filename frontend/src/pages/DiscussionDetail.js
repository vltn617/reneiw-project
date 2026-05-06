import React, { useState } from 'react';

const DiscussionDetail = () => {
  const [comment, setComment] = useState(""); // 입력값 상태 관리

  const handleRegister = async () => {
    if (!comment) return alert("내용을 입력하세요!");

    try {
      // 백엔드 API 호출
      const response = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "새 댓글", // 임시 타이틀
          content: comment,
          owner_id: 1, // 테스트용 유저 ID (회원가입한 유저의 ID)
        }),
      });

      if (response.ok) {
        alert("데이터가 DB에 저장되었습니다!");
        setComment(""); // 입력창 초기화
      } else {
        alert("저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("백엔드 서버가 켜져 있는지 확인하세요!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* ... 기존 코드 ... */}
      <section className="mt-8">
        <h3 className="font-bold mb-4 text-lg">새로운 해석 추가</h3>
        <textarea 
          value={comment}
          onChange={(e) => setComment(e.target.value)} // 입력할 때마다 상태 업데이트
          placeholder="당신의 해석을 더해 작품을 완성해 주세요."
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-brand outline-none h-32"
        />
        <button 
          onClick={handleRegister} // 버튼 클릭 시 함수 실행
          className="mt-2 bg-brand text-white px-6 py-2 rounded-lg font-bold float-right"
        >
          등록
        </button>
      </section>
    </div>
  );
};

export default DiscussionDetail;