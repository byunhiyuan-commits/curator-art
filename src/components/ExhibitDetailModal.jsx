import React from 'react';
import { X, Quote, Calendar, Sparkles, Award } from 'lucide-react';
import { MOVEMENTS, getArtworkForExhibit, getPastelPalette } from '../data/movements';

export default function ExhibitDetailModal({ exhibit, isOpen, onClose }) {
  if (!isOpen || !exhibit) return null;

  const movement = MOVEMENTS.find(m => m.id === exhibit.movementId) || {
    name: '서양미술',
    nameZh: '西方美术',
    artwork: '대표 명작',
    artist: '명장 화가',
    image: '/artworks/impressionism_1.jpg',
    badgeClass: 'bg-amber-600 text-white'
  };

  const artwork = getArtworkForExhibit(movement, exhibit);
  const palette = getPastelPalette(exhibit.id);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-2xl ${palette.bg} rounded-3xl shadow-2xl border-4 ${palette.border} overflow-hidden flex flex-col max-h-[92vh] animate-step`}
        onClick={e => e.stopPropagation()}
      >
        {/* 상단 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-md cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 상단 원화 대형 배너 (작품 감상) */}
        <div className="relative h-48 sm:h-64 w-full bg-stone-900 overflow-hidden shrink-0">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover object-center"
          />
          {/* 비네팅 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          {/* 상단 화파 및 키워드 */}
          <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap max-w-[80%]">
            {(exhibit.id?.startsWith('sample-') || exhibit.studentId === '10901') && (
              <span className="text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg border-2 border-white flex items-center gap-1">
                📌 예시 카드
              </span>
            )}
            <span className={`text-xs sm:text-sm font-extrabold px-3.5 py-1 rounded-xl shadow-md ${movement.badgeClass}`}>
              🎨 {movement.name} ({movement.nameZh})
            </span>
            <span className="text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full bg-white/95 text-stone-900 shadow-md">
              🏷️ #{exhibit.modernKeyword}
            </span>
          </div>

          {/* 작품 캡션 */}
          <div className="absolute bottom-3 left-4 right-14 text-white text-xs sm:text-sm">
            <div className="font-extrabold text-base sm:text-lg drop-shadow truncate">
              🖼️ {artwork.title}
            </div>
            <div className="text-amber-300 font-bold text-xs truncate">
              화가: {artwork.artist}
            </div>
          </div>
        </div>

        {/* 본문: 학생의 깊은 생각 감상 영역 (다 같이 크게 보는 화면) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 text-amber-700 mb-2">
              <Quote className="w-8 h-8 opacity-70" />
              <span className="font-extrabold text-sm sm:text-base font-curator">
                우리가 서양미술사를 배우는 이유:
              </span>
            </div>

            {/* 생각 본문 (크고 또렷하게) */}
            <p className="text-lg sm:text-2xl font-quote font-extrabold text-stone-900 leading-relaxed sm:leading-loose whitespace-pre-line tracking-normal">
              “{exhibit.reasonText}”
            </p>
          </div>

          {/* 하단 큐레이터 정보 */}
          <div className="pt-4 border-t-2 border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-stone-600 font-sans">
              <Calendar className="w-4 h-4 text-stone-400" />
              <span>{new Date(exhibit.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                큐
              </div>
              <div className="text-right">
                <div className="text-[11px] text-stone-500 font-sans">전시 큐레이터</div>
                <div className="text-base sm:text-lg font-extrabold font-curator text-stone-900 underline decoration-amber-400 decoration-3 underline-offset-4">
                  {exhibit.studentId} {exhibit.studentName}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
