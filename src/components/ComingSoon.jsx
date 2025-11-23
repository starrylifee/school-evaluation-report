import React from 'react';
import { ClipboardList } from 'lucide-react';

const ComingSoon = ({ title, description, checklist = [] }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-white via-blue-50/40 to-blue-100/20 p-6">
      <div className="bg-white shadow-lg shadow-blue-200/40 border border-blue-100 rounded-3xl max-w-3xl w-full p-10 text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner shadow-blue-100">
          <ClipboardList size={32} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-blue-400 font-semibold mb-2">업데이트 준비 중</p>
          <h2 className="text-3xl font-black text-brandNavy mb-4">{title}</h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        {checklist.length > 0 && (
          <div className="text-left bg-blue-50/60 rounded-2xl p-6 border border-blue-100 space-y-3">
            {checklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-6 h-6 rounded-full bg-white text-blue-500 font-bold flex items-center justify-center shadow">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-gray-400">최신 협의 자료 업로드 예정 · 2025 Seoul Sindap Elementary School</p>
      </div>
    </div>
  );
};

export default ComingSoon;

