import React, { useState } from 'react';
import { X, Save, Edit3 } from 'lucide-react';
import { MOVEMENTS } from '../data/movements';

export default function EditExhibitModal({ exhibit, isOpen, onClose, onSave }) {
  if (!isOpen || !exhibit) return null;

  const [movementId, setMovementId] = useState(exhibit.movementId);
  const [modernKeyword, setModernKeyword] = useState(exhibit.modernKeyword);
  const [reasonText, setReasonText] = useState(exhibit.reasonText);

  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      ...exhibit,
      movementId,
      modernKeyword: modernKeyword.trim(),
      reasonText: reasonText.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base font-curator">
              게시물 수정 (编辑展品)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          <div className="p-2.5 rounded-lg bg-stone-100 text-stone-700">
            <strong>작성 학생:</strong> {exhibit.studentId} {exhibit.studentName} ({exhibit.classNum}반)
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              화파 선택 (流派选择)
            </label>
            <select
              value={movementId}
              onChange={(e) => setMovementId(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500"
            >
              {MOVEMENTS.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.nameZh})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              2026 현대 키워드 (现代关键词)
            </label>
            <input
              type="text"
              value={modernKeyword}
              onChange={(e) => setModernKeyword(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              서양미술사를 배우는 이유 (理由与感悟)
            </label>
            <textarea
              rows={4}
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-serif-kr"
            />
          </div>

          <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-medium"
            >
              취소 (取消)
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>저장하기 (保存)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
