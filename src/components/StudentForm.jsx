import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, 
  UserCheck, HelpCircle, Palette, Check, Lightbulb, PenTool
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOVEMENTS } from '../data/movements';
import StudentSelectModal from './StudentSelectModal';
import { 
  GirlWithPearl, VanGoghArtist, MonetArtist, MonaLisaSmile, 
  GallerySpotlights, VelvetRopeBarrier 
} from './ArtCharacters';

export default function StudentForm({ onSubmitSuccess, onGoGallery }) {
  const [currentStep, setCurrentStep] = useState(1);

  // 폼 데이터
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [modernKeyword, setModernKeyword] = useState('');
  const [reasonText, setReasonText] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stepError, setStepError] = useState('');

  // 스텝 이동
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedStudent) {
        setStepError('먼저 나의 학번과 이름을 선택해 주세요! 🎨 (请先选择学号与姓名)');
        return;
      }
    } else if (currentStep === 2) {
      if (!selectedMovement) {
        setStepError('나의 원픽 근대 화파 액자를 선택해 주세요! 🖼️ (请选择一个你喜欢的流派)');
        return;
      }
    } else if (currentStep === 3) {
      if (!modernKeyword.trim()) {
        setStepError('2026년 현대 키워드를 직접 타이핑해 주세요! ✍️ (请直接输入现代关键词)');
        return;
      }
    }
    setStepError('');
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setStepError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // 최종 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reasonText.trim()) {
      setStepError('서양미술사를 배우는 이유를 작성해 주세요! 🏛️ (请写下学习西方美术史的理由)');
      return;
    }

    const newExhibit = {
      id: 'exhibit-' + Date.now(),
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      classNum: selectedStudent.classNum,
      movementId: selectedMovement.id,
      modernKeyword: modernKeyword.trim(),
      reasonText: reasonText.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti');
    }

    setIsSubmitted(true);
    onSubmitSuccess(newExhibit);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setSelectedStudent(null);
    setSelectedMovement(null);
    setModernKeyword('');
    setReasonText('');
    setStepError('');
  };

  return (
    <div className="padlet-container max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
      {/* 참고1~3 스타일 미술관 조명 빔 */}
      <GallerySpotlights />

      {/* 참고1~3 스타일 대형 갤러리 헤더 액자 배너 */}
      <header className="relative z-20 mb-6 sm:mb-8 text-center">
        {/* 상단 갤러리 메인 프레임 액자 */}
        <div className="relative mx-auto max-w-2xl rounded-3xl p-3 sm:p-4 bg-gradient-to-br from-[#8C5824] via-[#B87A38] to-[#6A3F14] shadow-2xl border-4 border-[#F5D061]">
          {/* 액자 안쪽 캔버스: 참고1의 푸른 소용돌이 밤하늘 붓터치 텍스처 */}
          <div className="relative rounded-2xl overflow-hidden py-6 sm:py-8 px-4 bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#0A1128] text-white border-2 border-amber-300/40">
            {/* 소용돌이 붓터치 아우라 */}
            <div 
              className="absolute inset-0 opacity-30 pointer-events-none mix-blend-screen bg-cover bg-center"
              style={{ backgroundImage: "radial-gradient(#60A5FA 1px, transparent 1px), radial-gradient(#FACC15 1px, transparent 1px)", backgroundSize: "20px 20px, 40px 40px" }}
            />

            {/* 좌우 장식 명작 캐릭터 액자 (참고1, 2, 3 반영) */}
            <div className="absolute top-2 left-2 sm:left-4 hidden xs:block transform -rotate-6 hover:rotate-0 transition-transform">
              <GirlWithPearl className="w-11 h-11 sm:w-14 sm:h-14 shadow-lg drop-shadow" />
            </div>
            <div className="absolute top-2 right-2 sm:right-4 hidden xs:block transform rotate-6 hover:rotate-0 transition-transform">
              <VanGoghArtist className="w-11 h-11 sm:w-14 sm:h-14 shadow-lg drop-shadow" />
            </div>

            {/* 청록색 붓터치 차시 뱃지 (참고1의 '5 - 6차시' 붓터치 스트랩) */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#0D9488] text-white font-extrabold text-xs sm:text-sm shadow-md border border-[#2DD4BF] mb-2 transform -rotate-1">
              🎨 5차시 서양미술사 복습 프로젝트 (第5课时 复习)
            </div>

            {/* 메인 캘리그래피 타이틀 */}
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-curator text-white drop-shadow-md">
              시간을 잇는 큐레이터
            </h1>
            <p className="text-xs sm:text-sm text-amber-200 mt-1 font-sans font-medium">
              时间的策展人 · Curator Bridging Time
            </p>

            {/* 부제목 슬로건 */}
            <div className="mt-3 inline-block bg-black/40 backdrop-blur-xs px-4 py-1 rounded-xl border border-white/20">
              <p className="text-sm sm:text-base text-amber-300 font-hand font-bold">
                “과거의 예술을 통해 현재를 바라보다 🖌️”
              </p>
            </div>
          </div>
        </div>

        {/* 참고1~3 하단 붉은 벨벳 로프 & 골드 기둥 바리케이드 */}
        <VelvetRopeBarrier />
      </header>

      {/* 완료 화면 (제출 후) */}
      {isSubmitted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-300 text-center animate-step max-w-lg mx-auto relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-amber-100 rounded-full blur-xl pointer-events-none" />
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-curator">
            축하합니다! 나의 생각 전시 완료! 🎨✨
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            恭喜！你的策展作品已成功上架展厅！
          </p>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4 my-5 text-left text-xs sm:text-sm space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-stone-600">👤 큐레이터 (策划人):</span>
              <span className="font-bold text-stone-900">{selectedStudent?.display}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-600">🎨 원픽 화파 (流派):</span>
              <span className="font-bold text-amber-800">{selectedMovement?.name} ({selectedMovement?.nameZh})</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-600">🏷️ 2026 현대 키워드:</span>
              <span className="font-bold text-rose-700">#{modernKeyword}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              type="button"
              onClick={onGoGallery}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-amber-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🖼️ 전시 갤러리로 입장하기 (进入画廊)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetForm}
              className="px-4 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              다시 작성하기 (重新填写)
            </button>
          </div>
        </div>
      ) : (
        /* 심리테스트형 스텝 바이 스텝 (Wizard) 컨테이너 */
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-xl border-2 border-amber-200 relative">

          {/* 상단 프로그레스 바 (심리테스트 진행도 게이지) */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-2 font-curator">
              <span className="inline-flex items-center gap-1 text-sm text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                ✨ STEP {currentStep} / 4 단계
              </span>
              <span className="text-[11px] text-stone-600">
                {currentStep === 1 && '1. 학번-이름 선택 (学号与姓名)'}
                {currentStep === 2 && '2. 나의 원픽 화파 (选择我的流派)'}
                {currentStep === 3 && '3. 2026 현대 키워드 (现代关键词)'}
                {currentStep === 4 && '4. 서양미술사를 배우는 이유 (学习理由)'}
              </span>
            </div>

            {/* 게이지 바 */}
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-amber-200">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600 rounded-full transition-all duration-400 ease-out shadow-xs"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* 에러 메시지 알림 바 */}
          {stepError && (
            <div className="mb-4 p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-700 text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{stepError}</span>
            </div>
          )}


          {/* ========================================================================= */}
          {/* STEP 1: 학번-이름 선택 창만 단독으로 표시 (화가 모네가 반갑게 맞이) */}
          {/* ========================================================================= */}
          {currentStep === 1 && (
            <div className="animate-step space-y-5">
              <div className="flex items-start gap-3 bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-transparent p-3 sm:p-4 rounded-2xl border border-amber-200/80">
                <MonetArtist className="w-14 h-14 sm:w-16 sm:h-16 shrink-0" />
                <div>
                  <div className="inline-block text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md mb-1">
                    👤 STEP 1
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-stone-900 font-curator">
                    나의 학번과 이름은 무엇인가요?
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5">
                    我的学号与姓名是？ (Please select your student ID and name)
                  </p>
                  <p className="text-xs text-amber-800 mt-1 font-semibold">
                    🎨 모네가 반갑게 인사해요: “우리 반 명렬표에서 너의 이름을 찾아줘!”
                  </p>
                </div>
              </div>

              {/* 학생 선택 버튼 또는 선택 완료 카드 */}
              <div className="pt-2">
                {selectedStudent ? (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-500 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center font-extrabold text-base shadow-sm">
                        {selectedStudent.studentNum}번
                      </div>
                      <div>
                        <div className="text-lg sm:text-xl font-bold text-stone-900 font-curator">
                          {selectedStudent.name}
                        </div>
                        <div className="text-xs text-amber-900 font-semibold">
                          학번: {selectedStudent.id} ({selectedStudent.classNum}반)
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 text-xs font-bold bg-white text-stone-800 rounded-xl border-2 border-stone-300 hover:bg-stone-50 shadow-xs transition-colors cursor-pointer"
                    >
                      다시 선택 (更改)
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-8 px-4 rounded-3xl border-3 border-dashed border-amber-400 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-500 text-stone-800 flex flex-col items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm group"
                  >
                    <div className="w-14 h-14 rounded-full bg-amber-200 group-hover:bg-amber-300 flex items-center justify-center text-amber-800 transition-colors shadow-inner">
                      <UserCheck className="w-7 h-7" />
                    </div>
                    <div className="text-center">
                      <div className="text-base sm:text-lg font-bold font-curator text-stone-900">
                        📋 명렬표에서 나의 이름 선택하기
                      </div>
                      <div className="text-xs text-stone-600 mt-1">
                        点击在此处打开名册选择 (Click here to select your name from roster)
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}


          {/* ========================================================================= */}
          {/* STEP 2: 9대 근대 화파 명작 액자 선택 (고흐 화가가 안내) */}
          {/* ========================================================================= */}
          {currentStep === 2 && (
            <div className="animate-step space-y-4">
              <div className="flex items-start justify-between gap-3 bg-gradient-to-r from-amber-50/80 via-yellow-50/50 to-transparent p-3 sm:p-4 rounded-2xl border border-amber-200/80">
                <div>
                  <div className="inline-block text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md mb-1">
                    🖼️ STEP 2
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-stone-900 font-curator">
                    오늘 만난 서양미술사 중 나의 ‘원픽’ 화파는?
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5">
                    在今天学习的西方美术史中，你最喜欢的近代流派是？ (Select your favorite modern art movement)
                  </p>
                  <p className="text-xs text-amber-900 font-semibold mt-1">
                    🌻 고흐의 추천: “마음에 드는 화파의 명작 액자를 클릭해봐!”
                  </p>
                </div>
                <VanGoghArtist className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 hidden xs:block" />
              </div>

              {/* 9개 화파 액자 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1 max-h-[56vh] overflow-y-auto pr-1 scrollbar-thin">
                {MOVEMENTS.map((mov) => {
                  const isSelected = selectedMovement?.id === mov.id;
                  return (
                    <div
                      key={mov.id}
                      onClick={() => {
                        setSelectedMovement(mov);
                        setStepError('');
                      }}
                      className={`cursor-pointer rounded-2xl p-3 transition-all relative flex flex-col ${
                        isSelected
                          ? 'bg-amber-50 ring-3 ring-amber-500 shadow-lg scale-[1.02]'
                          : 'bg-stone-50 hover:bg-white hover:shadow-md border-2 border-stone-200'
                      }`}
                    >
                      {/* 선택 체크 뱃지 */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 z-10 bg-amber-600 text-white rounded-full p-1.5 shadow-md animate-bounce">
                          <Check className="w-4 h-4" />
                        </div>
                      )}

                      {/* 액자(Frame) 디자인 */}
                      <div className={`relative overflow-hidden rounded-xl aspect-4/3 bg-stone-900 mb-2.5 ${
                        isSelected ? 'frame-gold-selected' : 'frame-gold'
                      }`}>
                        <img
                          src={mov.image}
                          alt={mov.name}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 pointer-events-none frame-inner-bevel border border-black/20" />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 text-white text-[11px] leading-tight">
                          <div className="font-bold truncate">{mov.artwork}</div>
                          <div className="text-amber-300 text-[10px] truncate">{mov.artist}</div>
                        </div>
                      </div>

                      {/* 화파 이름 & 중국어 */}
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm sm:text-base text-stone-900 font-curator">
                            {mov.name}
                          </h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-200 text-stone-800 font-bold">
                            {mov.nameZh}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-1 leading-snug line-clamp-2">
                          {mov.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}


          {/* ========================================================================= */}
          {/* STEP 3: 2026년 현대 키워드 직접 작성 (요구사항 4: 클릭 선택 불가, 오직 참고만!) */}
          {/* ========================================================================= */}
          {currentStep === 3 && (
            <div className="animate-step space-y-4">
              <div className="flex items-start justify-between gap-3 bg-gradient-to-r from-amber-50/80 via-blue-50/50 to-transparent p-3 sm:p-4 rounded-2xl border border-amber-200/80">
                <div>
                  <div className="inline-block text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md mb-1">
                    🏷️ STEP 3
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-stone-900 font-curator">
                    선택한 화파의 시선으로 2026년 현대를 그린다면?
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5">
                    美术反映时代。如果用<strong>{selectedMovement?.name}</strong>的视角描绘2026年，你想融入什么关键词？
                  </p>
                  <p className="text-xs text-amber-900 font-semibold mt-1">
                    💡 진주 귀걸이를 한 소녀: “2026년의 풍경이나 우리들의 모습을 직접 키워드로 적어줘!”
                  </p>
                </div>
                <GirlWithPearl className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 hidden xs:block" />
              </div>

              {/* 직접 타이핑하는 텍스트 입력창 (메인 필수) */}
              <div className="pt-2">
                <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5 font-curator">
                  ✍️ 나만의 2026 현대 키워드 직접 입력하기 (请亲自输入关键词) <span className="text-rose-500">*필수</span>
                </label>
                <div className="relative">
                  <PenTool className="absolute left-3.5 top-3.5 w-5 h-5 text-amber-600" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="직접 생각한 키워드를 입력해 주세요 (예: 기후변화, SNS 중독, K-pop 등)"
                    value={modernKeyword}
                    onChange={(e) => {
                      setModernKeyword(e.target.value);
                      setStepError('');
                    }}
                    className="w-full pl-11 pr-4 py-3.5 text-base bg-stone-50 border-2 border-amber-300 rounded-2xl focus:bg-white focus:outline-none focus:ring-3 focus:ring-amber-400 focus:border-amber-500 transition-all font-curator shadow-inner"
                  />
                </div>
              </div>

              {/* 요구사항 4 반영: 클릭할 수 없는 순수 참고용 가이드 칩 */}
              <div className="bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-2xl p-4 text-xs space-y-2 select-none">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>💡 키워드 참고 예시 (직접 타이핑해 주세요 / 仅供参考，请在上方亲自输入):</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    '#기후변화', '#SNS 중독', '#K-pop & 아이돌', '#AI 인공지능', 
                    '#스마트폰과 단절', '#학업과 무한경쟁', '#배달 문화', '#환경오염'
                  ].map((ex, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white/90 border border-amber-200 text-stone-700 font-bold cursor-default shadow-2xs"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-stone-600 font-medium pt-1">
                  🔒 위 예시는 아이디어 참고용입니다. 마음에 드는 단어나 새로운 생각을 <strong>위 입력창에 직접 적어주세요!</strong>
                </p>
              </div>
            </div>
          )}


          {/* ========================================================================= */}
          {/* STEP 4: 서양미술사를 배우는 이유 (모나리자가 따뜻하게 경청) */}
          {/* ========================================================================= */}
          {currentStep === 4 && (
            <div className="animate-step space-y-4">
              <div className="flex items-start justify-between gap-3 bg-gradient-to-r from-amber-50/80 via-emerald-50/50 to-transparent p-3 sm:p-4 rounded-2xl border border-amber-200/80">
                <div>
                  <div className="inline-block text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md mb-1">
                    🏛️ STEP 4 · 가장 중요한 질문 (最重要的问题)
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-stone-900 font-curator">
                    우리가 ‘서양미술사’라는 과거의 역사를 배우는 이유는 무엇일까요?
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5">
                    结合前面的思考，你认为我们学习“西方美术史”这段过去历史的理由是什么？
                  </p>
                  <p className="text-xs text-emerald-800 font-semibold mt-1">
                    ✨ 모나리자의 미소: “과거와 현재를 잇는 너만의 멋진 생각을 솔직하게 들려줘!”
                  </p>
                </div>
                <MonaLisaSmile className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 hidden xs:block" />
              </div>

              {/* 생각 가이드 박스 */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 text-xs sm:text-sm text-stone-700 space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>큐레이터 생각 힌트 (思考提示):</span>
                </div>
                <p className="text-xs leading-relaxed text-stone-600">
                  과거 화가들이 그 시대의 변화(혁명, 산업 혁명, 사진 발명 등)를 그림에 담아냈듯이, 
                  과거를 배우는 것은 오늘날 <strong>‘우리들의 세상과 삶을 더 깊고 풍성하게 바라보는 눈’</strong>을 키우기 위해서입니다.
                </p>
              </div>

              {/* 텍스트에어리어 */}
              <div>
                <textarea
                  rows={5}
                  autoFocus
                  placeholder="과거의 화가들이 그 시대의 고민을 그림에 담아냈던 것처럼, 오늘날 우리도... (请写下你最真实的思考与感受)"
                  value={reasonText}
                  onChange={(e) => {
                    setReasonText(e.target.value);
                    setStepError('');
                  }}
                  className="w-full p-4 text-sm sm:text-base bg-stone-50 border-2 border-amber-300 rounded-2xl focus:bg-white focus:outline-none focus:ring-3 focus:ring-amber-400 focus:border-amber-500 transition-all font-quote leading-relaxed shadow-inner"
                />
                <div className="text-right text-xs text-stone-600 mt-1 font-sans">
                  {reasonText.length}자 입력됨 (已输入)
                </div>
              </div>
            </div>
          )}


          {/* ========================================================================= */}
          {/* 하단 네비게이션 버튼 (이전 / 다음 / 최종 전시하기) */}
          {/* ========================================================================= */}
          <div className="pt-6 mt-6 border-t border-amber-200 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 sm:px-6 py-3 rounded-2xl border-2 border-stone-300 text-stone-800 font-extrabold text-sm sm:text-base hover:bg-stone-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>이전</span>
                <span className="text-xs text-stone-600 font-normal">(上一步)</span>
              </button>
            ) : (
              <div /> // 빈 공간 정렬
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-base sm:text-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>다음으로 넘어가기 ➜</span>
                <span className="text-xs text-amber-200 font-normal">(下一步)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-7 sm:px-9 py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-base sm:text-xl shadow-xl shadow-amber-900/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-6 h-6 text-amber-300" />
                <span>✨ 나의 생각 전시하기</span>
                <span className="text-xs text-amber-200 font-normal">(展示我的想法)</span>
              </button>
            )}
          </div>

        </div>
      )}

      {/* 학번/이름 선택 팝업 모달 */}
      <StudentSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(student) => {
          setSelectedStudent(student);
          setStepError('');
        }}
        currentStudent={selectedStudent}
      />
    </div>
  );
}
