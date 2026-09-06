import React, { useState, useRef } from 'react';
import { 
  Quote, Sparkles, Filter, Trash2, Edit3, Calendar, Maximize2, 
  Pin, Info, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal 
} from 'lucide-react';
import { MOVEMENTS, getArtworkForExhibit, getPastelPalette } from '../data/movements';
import { 
  GirlWithPearl, VanGoghArtist, MonetArtist, MonaLisaSmile, 
  GallerySpotlights, VelvetRopeBarrier 
} from './ArtCharacters';
import ExhibitDetailModal from './ExhibitDetailModal';

// 단일 전시 카드 컴포넌트
function ExhibitCard({ item, movement, isAdmin, onEditExhibit, onDeleteExhibit, onClick }) {
  const artwork = getArtworkForExhibit(movement, item);
  const palette = getPastelPalette(item.id);
  const isSample = item.id?.startsWith('sample-') || item.studentId === '10901';

  return (
    <article
      onClick={() => onClick(item)}
      className={`rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between group border-3 ${palette.border} ${palette.bg} cursor-pointer transform hover:-translate-y-1`}
    >
      {/* 상단 작품 원화 & 뱃지 영역 */}
      <div className="relative h-36 sm:h-40 overflow-hidden">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-full object-cover scale-105 blur-[1.5px] brightness-95 group-hover:scale-115 transition-transform duration-700"
        />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/70" />

        {/* 좌측 상단 화파 뱃지 + 현대 키워드 */}
        <div className="absolute top-3 left-3 flex items-start gap-1.5 z-10 max-w-[65%] flex-wrap">
          <span className={`text-xs font-extrabold px-3 py-1 rounded-xl shadow-md backdrop-blur-xs w-fit ${movement.badgeClass}`}>
            🎨 {movement.name}
          </span>
          <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-white text-stone-900 shadow-md border border-white/80">
            #{item.modernKeyword}
          </span>
        </div>

        {/* 사용자 요청 반영: 카드 오른쪽 상단에 눈에 띄는 "📌 예시" 뱃지 */}
        {isSample && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-xs shadow-lg border-2 border-white tracking-wider">
            <span>📌</span>
            <span>예시</span>
          </div>
        )}

        {/* 하단 작품명 오버레이 */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <div className="font-extrabold truncate drop-shadow text-xs sm:text-sm">
            🖼️ {artwork.title} ({artwork.artist})
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>크게보기</span>
          </div>
        </div>

        {/* 관리자 모드 전용 액션 (수정 / 삭제) */}
        {isAdmin && (
          <div 
            className={`absolute z-30 bg-white/95 backdrop-blur-xs p-1 rounded-xl shadow-md border border-stone-300 flex items-center gap-1 ${
              isSample ? 'top-3 right-22' : 'top-3 right-3'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => onEditExhibit(item)}
              title="게시물 수정 (编辑)"
              className="p-1.5 text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDeleteExhibit(item.id)}
              title="게시물 삭제 (删除)"
              className="p-1.5 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 카드 본문: 서양미술사를 배우는 이유 */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <Quote className="w-7 h-7 mb-2 text-amber-600 opacity-70" />
          <p className="text-base sm:text-lg leading-relaxed font-quote font-extrabold text-stone-900 whitespace-pre-line tracking-normal">
            “{item.reasonText}”
          </p>
        </div>

        {/* 카드 하단: 학생 큐레이터 정보 */}
        <div className="pt-3 border-t border-stone-300/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-stone-600 font-sans text-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(item.createdAt).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })}</span>
          </div>

          <div className="text-right">
            <span className="text-stone-600 text-xs font-medium">큐레이터: </span>
            <span className="font-extrabold text-sm sm:text-base font-curator text-stone-900 underline decoration-amber-400 decoration-2 underline-offset-4">
              {item.studentId} {item.studentName}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function GalleryView({ exhibits, isAdmin, onDeleteExhibit, onEditExhibit, onGoWrite }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [selectedExhibitForModal, setSelectedExhibitForModal] = useState(null);
  
  // 화파 모아보기 보기 모드: 'wrap' (전체 다 보기 - 기본값) 또는 'scroll' (좌우 화살표 슬라이더)
  const [filterMode, setFilterMode] = useState('wrap');
  const scrollContainerRef = useRef(null);

  // 좌우 스크롤 이동 함수
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  // 마우스 휠 세로 스크롤을 가로 스크롤로 자연스럽게 변환
  const handleWheel = (e) => {
    if (filterMode === 'scroll' && scrollContainerRef.current) {
      if (e.deltaY !== 0) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  // 화파별 메타데이터 맵 생성
  const movementMap = MOVEMENTS.reduce((acc, mov) => {
    acc[mov.id] = mov;
    return acc;
  }, {});

  // 필터링된 전체 목록
  const filteredExhibits = selectedFilter === 'ALL'
    ? exhibits
    : exhibits.filter(e => e.movementId === selectedFilter);

  // 화파별 페이지(`selectedFilter !== 'ALL'`) 전용 데이터 분리
  const currentMovement = selectedFilter !== 'ALL' ? movementMap[selectedFilter] : null;
  const isSampleExhibit = (e) => e.id?.startsWith('sample-') || e.studentId === '10901';
  
  // 선택된 화파의 예시 카드 (10901 김영서)
  const sampleCard = selectedFilter !== 'ALL' 
    ? filteredExhibits.find(isSampleExhibit) 
    : null;

  // 선택된 화파의 실제 학생 카드들
  const studentCards = selectedFilter !== 'ALL' 
    ? filteredExhibits.filter(e => !isSampleExhibit(e)) 
    : [];

  // 필터 칩 공통 렌더링 함수 (전체보기 + 9대 화파)
  const renderFilterChips = () => (
    <>
      <button
        type="button"
        onClick={() => setSelectedFilter('ALL')}
        className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold shrink-0 transition-all cursor-pointer ${
          selectedFilter === 'ALL'
            ? 'bg-stone-900 text-amber-300 shadow-md ring-2 ring-amber-400'
            : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
        }`}
      >
        🌟 전체 보기 ({exhibits.length})
      </button>
      {MOVEMENTS.map(m => {
        const count = exhibits.filter(e => e.movementId === m.id).length;
        const isActive = selectedFilter === m.id;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => setSelectedFilter(m.id)}
            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              isActive
                ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300 scale-102'
                : 'bg-amber-50/80 hover:bg-amber-100 text-stone-800 border border-amber-200/90 hover:border-amber-300'
            }`}
          >
            <span>{m.name}</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
              isActive ? 'bg-amber-800 text-white' : 'bg-amber-200 text-amber-900 font-bold'
            }`}>
              {count}
            </span>
          </button>
        );
      })}
    </>
  );

  return (
    <div className="padlet-container max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
      {/* 참고1~3 스타일 미술관 조명 빔 */}
      <GallerySpotlights />

      {/* 밝고 세련된 갤러리 헤더 */}
      <div className="relative z-20 text-center mb-6 sm:mb-8">
        {/* 화가 캐릭터 3총사의 환영 인사 */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-3">
          <div className="transform -rotate-6 hover:rotate-0 transition-transform">
            <MonetArtist className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-md" />
          </div>
          <div className="transform hover:scale-110 transition-transform">
            <GirlWithPearl className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md" />
          </div>
          <div className="transform rotate-6 hover:rotate-0 transition-transform">
            <VanGoghArtist className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-md" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D9488] text-white text-sm sm:text-base font-extrabold mb-2 shadow-md border border-[#2DD4BF]">
          <span>🏛️ 우리 반 온라인 명작 갤러리 (在线微型展厅)</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-curator">
          시간을 잇는 큐레이터 갤러리 🎨
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-1 font-sans font-medium">
          과거의 화파를 통해 2026년 오늘을 바라본 1학년 큐레이터들의 전시회
        </p>

        <div className="mt-2 inline-block bg-amber-100/80 border border-amber-300 rounded-2xl py-1.5 px-5 shadow-2xs">
          <p className="text-base sm:text-lg text-amber-950 font-hand font-bold">
            “카드를 클릭하면 다 함께 크고 시원하게 감상할 수 있어요! 🔍”
          </p>
        </div>

        <VelvetRopeBarrier />
      </div>

      {/* 상단 툴바: 화파 필터 칩 & 새 생각 작성 버튼 */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-amber-200 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-stone-800 font-curator flex-wrap">
            <Filter className="w-5 h-5 text-amber-600" />
            <span>🎨 화파별 모아보기 (按流派筛选):</span>

            {/* 사용자 요청 반영: 전체 다 보기 vs 좌우 화살표 슬라이더 모드 토글 */}
            <div className="inline-flex items-center bg-amber-100/90 p-1 rounded-2xl border border-amber-300 text-xs font-bold ml-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setFilterMode('wrap')}
                className={`px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterMode === 'wrap'
                    ? 'bg-amber-600 text-white shadow-xs font-extrabold'
                    : 'text-stone-700 hover:text-amber-900'
                }`}
                title="전체 10개 화파를 한눈에 모두 펼쳐보기"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>한눈에 다 보기</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('scroll')}
                className={`px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterMode === 'scroll'
                    ? 'bg-amber-600 text-white shadow-xs font-extrabold'
                    : 'text-stone-700 hover:text-amber-900'
                }`}
                title="좌우 이동 화살표로 넘겨가며 보기"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>좌우 화살표</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onGoWrite}
            className="self-end sm:self-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-sm sm:text-base shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
          >
            <Sparkles className="w-4 h-4" />
            <span>✍️ 나도 전시하기 (我也要展示)</span>
          </button>
        </div>

        {/* 필터 칩 목록: 2가지 모드 지원 (전체 한번에 다 보이기 OR 좌우 화살표 슬라이더) */}
        {filterMode === 'wrap' ? (
          /* 1. 전체 한번에 다 보이기 (flex-wrap) - 기본 모드 */
          <div className="flex flex-wrap items-center gap-2 pt-3">
            {renderFilterChips()}
          </div>
        ) : (
          /* 2. 좌우 이동 화살표 슬라이더 모드 */
          <div className="relative flex items-center pt-3 gap-1.5">
            {/* 왼쪽 이동 화살표 버튼 */}
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="왼쪽으로 스크롤"
              className="shrink-0 w-9 h-9 rounded-full bg-white hover:bg-amber-100 text-amber-900 border-2 border-amber-300 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
              title="왼쪽 화파 보기"
            >
              <ChevronLeft className="w-5 h-5 text-amber-800" />
            </button>

            {/* 가로 스크롤 컨테이너 (휠 마우스 지원) */}
            <div
              ref={scrollContainerRef}
              onWheel={handleWheel}
              className="flex items-center gap-2 overflow-x-auto py-1 scroll-smooth scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-amber-50 px-1 flex-1 rounded-xl"
            >
              {renderFilterChips()}
            </div>

            {/* 오른쪽 이동 화살표 버튼 (고흐 옆 고갱, 세잔까지 이동 가능) */}
            <button
              type="button"
              onClick={scrollRight}
              aria-label="오른쪽으로 스크롤"
              className="shrink-0 w-9 h-9 rounded-full bg-white hover:bg-amber-100 text-amber-900 border-2 border-amber-300 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
              title="오른쪽 화파 보기 (고갱, 세잔)"
            >
              <ChevronRight className="w-5 h-5 text-amber-800" />
            </button>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 1. 각 화파 페이지 모드 (selectedFilter !== 'ALL')          */}
      {/*    요구사항: 예시 카드를 제일 오른쪽 상단에 고정하고         */}
      {/*             카드 오른쪽 상단에 '예시'라고 표시               */}
      {/* ========================================================= */}
      {selectedFilter !== 'ALL' && currentMovement ? (
        <div className="space-y-6">
          {/* 화파 소개 헤더 배너 */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/70 rounded-3xl p-5 sm:p-6 border-2 border-amber-300 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`text-xs sm:text-sm font-extrabold px-3 py-1 rounded-xl shadow-xs ${currentMovement.badgeClass}`}>
                    🎨 {currentMovement.name}
                  </span>
                  <span className="text-xs text-stone-600 font-medium font-sans">
                    ({currentMovement.nameZh}) · 대표 화가: <strong>{currentMovement.artist}</strong>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-curator mt-1">
                  {currentMovement.desc}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-0.5">
                  {currentMovement.descZh}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap mt-3">
                  {currentMovement.keywords.map((kw, i) => (
                    <span key={i} className="text-xs bg-white/90 text-amber-900 font-bold px-2.5 py-0.5 rounded-full border border-amber-200 shadow-2xs">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* 화파 대표작 미니 썸네일 스트립 */}
              <div className="flex items-center gap-2 shrink-0 overflow-x-auto max-w-full">
                {currentMovement.artworks.slice(0, 3).map((art, idx) => (
                  <div key={idx} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xs relative group/thumb" title={`${art.title} (${art.artist})`}>
                    <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/30 group-hover/thumb:bg-black/0 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 레이아웃: 좌측 2열 (학생 카드들) + 우측 1열 (제일 오른쪽 상단 고정 예시 카드) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* 좌측 메인 2열: 학생 큐레이터 카드 목록 */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 font-extrabold text-stone-800 text-base sm:text-lg font-curator">
                  <span>👨‍🎨 우리 반 학생 큐레이터 작품</span>
                  <span className="text-xs sm:text-sm bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">
                    {studentCards.length}개
                  </span>
                </div>
                <span className="text-xs text-stone-500 font-sans">
                  과거와 현대를 잇는 우리들의 시선
                </span>
              </div>

              {studentCards.length === 0 ? (
                /* 학생 카드가 아직 없을 때의 안내 */
                <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border-3 border-dashed border-amber-300">
                  <MonaLisaSmile className="w-16 h-16 mx-auto mb-3" />
                  <h3 className="font-extrabold text-base sm:text-lg text-stone-800 font-curator">
                    아직 이 화파에 등록된 학생 카드가 없습니다.
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
                    우측 상단에 고정된 <strong>10901 김영서의 모범 예시 카드</strong>를 참고하여, 첫 번째 큐레이터가 되어 멋진 생각을 남겨보세요! 🎨
                  </p>
                  <button
                    type="button"
                    onClick={onGoWrite}
                    className="mt-4 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm sm:text-base transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>첫 번째 생각 전시하기 ✍️</span>
                  </button>
                </div>
              ) : (
                /* 학생 카드 그리드 */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {studentCards.map((item) => (
                    <ExhibitCard
                      key={item.id}
                      item={item}
                      movement={currentMovement}
                      isAdmin={isAdmin}
                      onEditExhibit={onEditExhibit}
                      onDeleteExhibit={onDeleteExhibit}
                      onClick={setSelectedExhibitForModal}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 우측 1열: 요구사항 반영 - "제일 오른쪽 상단에 고정된 예시 카드" */}
            <div className="lg:col-span-1 lg:sticky lg:top-24 z-10 space-y-3">
              {/* 예시 카드 상단 안내 라벨 */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5 rounded-2xl shadow-md flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-extrabold text-sm font-curator">
                  <Pin className="w-4 h-4 text-amber-200" />
                  <span>📌 1학년 모범 예시 카드</span>
                </div>
                <span className="text-[11px] font-extrabold bg-white/25 px-2 py-0.5 rounded-full border border-white/40">
                  우측 상단 고정
                </span>
              </div>

              {/* 고정된 김영서 학생의 예시 카드 */}
              {sampleCard && (
                <div className="relative">
                  <ExhibitCard
                    item={sampleCard}
                    movement={currentMovement}
                    isAdmin={isAdmin}
                    onEditExhibit={onEditExhibit}
                    onDeleteExhibit={onDeleteExhibit}
                    onClick={setSelectedExhibitForModal}
                  />
                </div>
              )}

              {/* 큐레이터 꿀팁 도움말 박스 */}
              <div className="bg-amber-50/90 border-2 border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-950 leading-relaxed font-sans shadow-2xs">
                <div className="flex items-center gap-1.5 font-extrabold text-amber-900 mb-1">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>큐레이터 작성 팁 (参考指南):</span>
                </div>
                <p className="text-[12px] text-stone-700">
                  위 <strong>모범 예시(10901 김영서)</strong>를 참고하여, 2026년 현대 사회 키워드와 <strong>"서양미술사를 배우는 이유"</strong>를 쉽고 명확하게 연결해보세요!
                </p>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* 2. 전체 보기 모드 (selectedFilter === 'ALL')                */
        /* ========================================================= */
        filteredExhibits.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border-3 border-dashed border-amber-300 max-w-md mx-auto my-8">
            <MonaLisaSmile className="w-16 h-16 mx-auto mb-3" />
            <h3 className="font-extrabold text-base sm:text-lg text-stone-800 font-curator">
              아직 등록된 전시 카드가 없습니다.
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              暂无作品，快来成为第一个策展人吧！
            </p>
            <button
              type="button"
              onClick={onGoWrite}
              className="mt-4 px-6 py-3 rounded-2xl bg-amber-600 text-white font-extrabold text-sm sm:text-base hover:bg-amber-700 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>첫 번째 생각 전시하기 🎨</span>
            </button>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filteredExhibits.map((item) => {
              const movement = movementMap[item.movementId] || {
                name: '서양미술',
                nameZh: '西方美术',
                artwork: '대표 명작',
                artist: '명장 화가',
                image: '/artworks/impressionism_1.jpg',
                badgeClass: 'bg-stone-800 text-white'
              };

              return (
                <div key={item.id} className="break-inside-avoid">
                  <ExhibitCard
                    item={item}
                    movement={movement}
                    isAdmin={isAdmin}
                    onEditExhibit={onEditExhibit}
                    onDeleteExhibit={onDeleteExhibit}
                    onClick={setSelectedExhibitForModal}
                  />
                </div>
              );
            })}
          </div>
        )
      )}

      {/* 대형 카드 감상 라이트박스 모달 */}
      <ExhibitDetailModal
        exhibit={selectedExhibitForModal}
        isOpen={!!selectedExhibitForModal}
        onClose={() => setSelectedExhibitForModal(null)}
      />
    </div>
  );
}
