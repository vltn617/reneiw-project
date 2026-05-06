import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NicknameSetup = () => {
  const [nickname, setNickname] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const handleSubmit = async () => {
    const response = await fetch(`http://127.0.0.1:8000/set-nickname?user_id=${userId}&nickname=${nickname}`, {
      method: 'POST',
    });
    if (response.ok) {
      alert('설정 완료! 로그인 화면으로 이동합니다.');
      navigate('/login');
    } else {
      alert('이미 사용 중인 닉네임입니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-4xl font-black">당신만의 별명을 정해주세요.</h1>
        <input 
          type="text" className="w-full text-center text-3xl border-b-2 border-brand outline-none py-2"
          placeholder="닉네임 입력" onChange={(e) => setNickname(e.target.value)}
        />
        <button onClick={handleSubmit} className="w-full bg-brand text-white py-4 rounded-2xl font-bold text-xl">
          reneiw 시작하기
        </button>
      </div>
    </div>
  );
};

export default NicknameSetup;