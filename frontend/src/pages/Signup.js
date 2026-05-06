import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 유효성 검사 로직
  const validate = () => {
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    if (formData.username.length < 4) return "아이디는 4자 이상이어야 합니다.";
    if (formData.password.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
    if (!specialChar.test(formData.password)) return "비밀번호에 특수문자를 최소 1개 포함해주세요.";
    if (formData.password !== formData.confirmPassword) return "비밀번호가 일치하지 않습니다.";
    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) return setError(errorMsg);

    try {
     // 'localhost' 대신 '127.0.0.1'을 사용해 보세요.
      const response = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: formData.username, password: formData.password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('반갑습니다! 회원가입이 완료되었습니다.');
        navigate('/');
      } else {
        setError(data.detail || '가입 실패');
      }
    } catch (err) {
      setError('서버 연결을 확인해주세요.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">reneiw 시작하기</h2>
        <p className="text-center text-gray-500 mb-8">당신만의 해석을 기록해보세요</p>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
            <input 
              type="text" required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand outline-none transition-all"
              placeholder="4~20자 사이로 입력"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input 
              type="password" required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand outline-none transition-all"
              placeholder="특수문자 포함 8자 이상"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
            <input 
              type="password" required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand outline-none transition-all"
              placeholder="한 번 더 입력해주세요"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium animate-pulse">{error}</p>}

          <button type="submit" className="w-full bg-brand text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-md active:scale-95 transform">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;