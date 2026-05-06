import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const dummyDiscussions = [
    { id: 1, title: "바이러스X: 김영한 작가의 과학적 고증, 어디까지 실화인가?", author: "과학덕후", category: "Book", tags: ["과학검증"] },
    { id: 2, title: "웹툰 '내일'의 열린 결말, 주인공의 선택에 대한 3가지 가설", author: "웹툰매니아", category: "Webtoon", tags: ["결말예측"] },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">새로운 해석으로 작품을 완성하세요</h1>
        <p className="text-gray-500 mt-2">영화, 책, 웹툰의 깊은 이야기를 나누는 공간</p>
      </header>

      <section className="grid gap-6">
        {dummyDiscussions.map((item) => (
          <Link key={item.id} to={`/discussion/${item.id}`} className="block bg-white p-6 rounded-xl shadow-sm border hover:border-brand transition-colors">
            <div className="flex gap-2 mb-3">
              <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-600 rounded">{item.category}</span>
              {item.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded">#{tag}</span>
              ))}
            </div>
            <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-400 mt-2">작성자: {item.author}</p>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Home;