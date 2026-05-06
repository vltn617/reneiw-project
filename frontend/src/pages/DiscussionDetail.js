import React from 'react';
import { MessageSquare, ThumbsUp } from 'lucide-react';

const DiscussionDetail = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white p-8 rounded-2xl shadow-sm border">
        <h1 className="text-3xl font-bold mb-4">바이러스X: 김영한 작가의 과학적 고증, 어디까지 실화인가?</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b">
          <span>작성자: 과학덕후</span>
          <span>•</span>
          <span>2026.05.06</span>
        </div>
        
        <div className="prose max-w-none text-gray-700 leading-relaxed">
          <p>김영한 작가님의 '바이러스X'에서 언급된 RNA 변형 방식은 현대 생명공학적으로...</p>
          {/* 실제 내용은 여기에 들어갑니다 */}
        </div>

        <div className="flex gap-4 mt-12">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <ThumbsUp className="w-4 h-4" /> 124
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <MessageSquare className="w-4 h-4" /> 56
          </button>
        </div>
      </article>

      <section className="mt-8">
        <h3 className="font-bold mb-4 text-lg">새로운 해석 추가 (56)</h3>
        <textarea 
          placeholder="당신의 해석을 더해 작품을 완성해 주세요."
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-brand outline-none h-32"
        />
        <button className="mt-2 bg-brand text-white px-6 py-2 rounded-lg font-bold float-right">등록</button>
      </section>
    </div>
  );
};

export default DiscussionDetail;