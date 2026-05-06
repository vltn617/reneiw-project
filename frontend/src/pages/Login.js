import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('nickname', data.nickname);
      navigate('/');
    } else {
      alert('아이디 또는 비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="p-10 bg-white rounded-3xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center">반가워요!</h2>
        <input type="text" placeholder="아이디" required className="w-full p-4 border rounded-xl"
          onChange={(e) => setFormData({...formData, username: e.target.value})} />
        <input type="password" placeholder="비밀번호" required className="w-full p-4 border rounded-xl"
          onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <button type="submit" className="w-full bg-brand text-white py-4 rounded-xl font-bold">로그인</button>
      </form>
    </div>
  );
};

export default Login;