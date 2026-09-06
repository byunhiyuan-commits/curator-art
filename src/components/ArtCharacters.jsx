import React from 'react';

// 1. 진주 귀걸이를 한 소녀 (참고1의 세련된 일러스트 스타일)
export function GirlWithPearl({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 둥근 프레임 배경 */}
      <circle cx="50" cy="50" r="46" fill="#1C2536" stroke="#D4AF37" strokeWidth="3" />
      {/* 몸체/오렌지-황토빛 옷 */}
      <path d="M22 96C25 80 40 76 60 76C80 76 92 84 94 96" fill="#D97724" stroke="#8C4A11" strokeWidth="2.5" />
      <path d="M48 76L46 96" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      {/* 목과 얼굴 */}
      <path d="M46 62V76C46 76 56 78 58 76V62" fill="#FCE7D6" />
      <path d="M38 42C38 28 54 26 64 36C70 42 70 56 62 62C54 68 40 64 38 42Z" fill="#FCE7D6" stroke="#4A3B32" strokeWidth="2" />
      {/* 세련된 파란 터번 */}
      <path d="M34 40C32 24 50 16 68 18C82 20 86 34 82 46C80 50 74 54 70 48C66 42 66 30 54 28C42 26 36 34 34 40Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M68 34C74 38 88 44 86 64C84 76 74 78 72 74C72 64 72 44 68 34Z" fill="#FBBF24" opacity="0.9" />
      {/* 신비로운 진주 귀걸이 */}
      <circle cx="48" cy="54" r="4.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="47" cy="52.5" r="1.5" fill="#E2E8F0" />
      {/* 얼굴 디테일 (참고1의 섬세한 라인) */}
      <ellipse cx="45" cy="46" rx="2" ry="3" fill="#1E293B" />
      <ellipse cx="58" cy="47" rx="2" ry="3" fill="#1E293B" />
      <path d="M50 48V53H53" stroke="#4A3B32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M47 58C49 60 54 60 56 58" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 2. 트렌디한 반 고흐 화가 캐릭터
export function VanGoghArtist({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0F172A" stroke="#F59E0B" strokeWidth="3" />
      {/* 푸른 작업복 */}
      <path d="M24 96C28 78 45 74 55 74C68 74 80 80 84 96" fill="#1E3A8A" stroke="#172554" strokeWidth="2.5" />
      {/* 얼굴 */}
      <circle cx="52" cy="54" r="22" fill="#FED7AA" stroke="#431407" strokeWidth="2" />
      {/* 귀여운 주황빛 수염 */}
      <path d="M38 58C42 72 62 72 66 58C66 68 58 76 52 76C46 76 38 68 38 58Z" fill="#EA580C" />
      {/* 반짝이는 눈 & 눈썹 */}
      <circle cx="45" cy="50" r="2.5" fill="#0F172A" />
      <circle cx="59" cy="50" r="2.5" fill="#0F172A" />
      <path d="M41 45C44 43 48 44 49 46" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 46C56 44 60 43 63 45" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
      {/* 고흐의 상징 노란 밀짚모자 */}
      <ellipse cx="52" cy="36" rx="34" ry="10" fill="#FBBF24" stroke="#B45309" strokeWidth="2.5" />
      <path d="M32 34C34 20 44 16 52 16C60 16 70 20 72 34Z" fill="#FDE047" stroke="#B45309" strokeWidth="2.5" />
      <path d="M32 33C44 37 60 37 72 33" stroke="#D97706" strokeWidth="2.5" />
      {/* 붓 */}
      <g transform="translate(18, 55) rotate(-35)">
        <rect x="0" y="0" width="5" height="24" rx="2" fill="#78350F" />
        <path d="M0 0C1 -6 4 -6 5 0Z" fill="#F59E0B" />
      </g>
    </svg>
  );
}

// 3. 클로드 모네 인상파 화가 캐릭터
export function MonetArtist({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#38BDF8" strokeWidth="3" />
      {/* 옷 */}
      <path d="M24 96C28 78 45 74 55 74C68 74 80 80 84 96" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
      {/* 얼굴과 턱수염 */}
      <circle cx="52" cy="54" r="22" fill="#FFEDD5" stroke="#451A03" strokeWidth="2" />
      <path d="M38 58C42 74 62 74 66 58C66 70 58 78 52 78C46 78 38 70 38 58Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      {/* 눈 & 미소 */}
      <path d="M43 49C44 47 48 47 49 49" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M55 49C56 47 60 47 61 49" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      {/* 화가 베레모 */}
      <path d="M22 36C22 18 50 14 68 16C84 18 88 30 84 38C76 44 26 44 22 36Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2.5" />
      {/* 수련 꽃 */}
      <circle cx="72" cy="30" r="6" fill="#F472B6" />
      <circle cx="72" cy="30" r="2.5" fill="#FEF08A" />
    </svg>
  );
}

// 4. 모나리자 일러스트 캐릭터 (참고2, 3 스타일)
export function MonaLisaSmile({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#2E3B2C" stroke="#A3E635" strokeWidth="3" />
      {/* 초록 드레스 */}
      <path d="M25 96C28 80 40 76 52 76C64 76 76 80 79 96" fill="#166534" stroke="#14532D" strokeWidth="2.5" />
      <path d="M38 88C42 84 62 84 66 88" fill="#FEF08A" opacity="0.8" />
      {/* 얼굴 & 긴 생머리 */}
      <path d="M34 40C34 68 38 80 40 82C42 65 42 40 44 36" fill="#3E2723" />
      <path d="M70 40C70 68 66 80 64 82C62 65 62 40 60 36" fill="#3E2723" />
      <circle cx="52" cy="52" r="18" fill="#FDE68A" stroke="#3E2723" strokeWidth="1.5" />
      {/* 오묘한 미소 */}
      <ellipse cx="46" cy="48" rx="2" ry="2.5" fill="#1C1917" />
      <ellipse cx="58" cy="48" rx="2" ry="2.5" fill="#1C1917" />
      <path d="M48 57C50 59 54 59 56 57" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 5. 상단 3개 스포트라이트 조명 (참고1~3 미술관 조명 완벽 구현)
export function GallerySpotlights() {
  return (
    <div className="relative w-full flex justify-around items-start pointer-events-none overflow-hidden h-24 sm:h-32 mb-[-60px] sm:mb-[-80px] z-10">
      {[1, 2, 3].map((num) => (
        <div key={num} className="flex flex-col items-center">
          {/* 천장 조명 갓 */}
          <div className="w-12 sm:w-16 h-6 sm:h-8 rounded-t-full bg-gradient-to-b from-stone-400 to-stone-200 border border-stone-400 shadow-md relative">
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-amber-200 rounded-b-md" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-amber-400 rounded-full blur-[1px]" />
          </div>
          {/* 퍼져나가는 따뜻한 조명 빛줄기 (Spotlight Beam) */}
          <div 
            className="w-36 sm:w-48 h-32 sm:h-44 opacity-25 bg-gradient-to-b from-amber-300 via-amber-100 to-transparent"
            style={{
              clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
              filter: 'blur(3px)'
            }}
          />
        </div>
      ))}
    </div>
  );
}

// 6. 하단 붉은 벨벳 로프 & 골드 기둥 바리케이드 (참고1~3 하단 가이드 완벽 구현)
export function VelvetRopeBarrier() {
  return (
    <div className="w-full relative flex items-center justify-between pointer-events-none select-none py-2 my-2">
      {/* 붉은 벨벳 로프 줄 */}
      <div className="absolute inset-x-4 top-4 h-2 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-full shadow-sm border border-red-700" />
      
      {/* 황금빛 지지대 기둥들 */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="relative z-10 flex flex-col items-center">
          {/* 기둥 둥근 헤드 */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 shadow-sm border border-amber-700 ring-1 ring-amber-200" />
          {/* 고리 */}
          <div className="w-2 h-1.5 bg-stone-700 -mt-0.5 rounded-xs" />
          {/* 기둥 본체 */}
          <div className="w-2 h-8 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 border-x border-amber-600" />
        </div>
      ))}
    </div>
  );
}
