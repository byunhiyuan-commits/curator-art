import React, { useState } from 'react';
import { Palette, Layers, Lock, ShieldCheck, Sparkles, BookOpen, QrCode, X, Copy, Check, ExternalLink, Download } from 'lucide-react';
import { GirlWithPearl, VanGoghArtist } from './ArtCharacters';

export default function Navbar({ activeTab, onTabChange, isAdmin, onOpenAdmin }) {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const siteUrl = "https://curator-art-three.vercel.app/";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 text-stone-900 transition-all shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo with Cute Art Flair */}
        <div 
          onClick={() => onTabChange('form')}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-500 p-0.5 shadow-sm group-hover:rotate-6 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-amber-600">
              <Palette className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-extrabold text-base sm:text-lg tracking-tight font-curator flex items-center gap-1.5 leading-tight text-stone-900">
              <span>시간을 잇는 큐레이터</span>
              <span className="text-xs">🎨</span>
            </div>
            <div className="text-[10px] text-amber-800 font-bold font-sans">
              AI로 재해석하는 서양미술사 5차시
            </div>
          </div>
        </div>

        {/* Tab Buttons (Form vs Gallery) */}
        <div className="flex items-center gap-1 bg-amber-50/80 p-1 rounded-2xl border border-amber-200">
          <button
            type="button"
            onClick={() => onTabChange('form')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'form'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs'
                : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/60'
            }`}
          >
            <span>✍️ 기획하기</span>
            <span className="hidden sm:inline text-[11px] opacity-80">(策划)</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('gallery')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs'
                : 'text-stone-700 hover:text-amber-900 hover:bg-amber-100/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>🖼️ 갤러리</span>
            <span className="hidden sm:inline text-[11px] opacity-80">(展厅)</span>
          </button>
        </div>

        {/* Right Actions: QR Code Button & Teacher Admin */}
        <div className="flex items-center gap-2">
          {/* QR Code Modal Trigger */}
          <button
            type="button"
            onClick={() => setIsQrModalOpen(true)}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all bg-amber-500 hover:bg-amber-600 text-white shadow-xs cursor-pointer hover:scale-102"
            title="스마트폰 접속 QR코드 크게보기"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline font-extrabold">📱 QR코드</span>
            <span className="sm:hidden font-extrabold">QR</span>
          </button>

          {/* Teacher Admin Trigger */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border cursor-pointer ${
              isAdmin
                ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs'
                : 'bg-white border-amber-200 text-stone-700 hover:text-amber-900 hover:bg-amber-50'
            }`}
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">관리자 켜짐 👑</span>
                <span className="sm:hidden">관리중</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">교사용 관리자</span>
                <span className="sm:hidden">교사용</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* 스마트폰 학생 접속용 대형 QR 코드 팝업 모달 */}
      {isQrModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-4 border-amber-300 text-center animate-step"
            onClick={e => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 헤더 */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold mb-2">
              <span>📱 스마트폰 간편 접속</span>
            </div>
            <h3 className="text-xl font-extrabold text-stone-900 font-curator">
              시간을 잇는 큐레이터 🎨
            </h3>
            <p className="text-xs text-stone-600 mt-1 font-sans">
              스마트폰 카메라로 비추면 바로 입장합니다!
            </p>

            {/* QR코드 이미지 (선명한 800x800) */}
            <div className="mt-4 p-3 bg-white border-3 border-amber-200 rounded-2xl shadow-inner inline-block">
              <img 
                src="/qrcode.png" 
                alt="접속 QR코드"
                className="w-56 h-56 mx-auto rounded-xl object-contain" 
              />
            </div>

            {/* 접속 주소 및 복사 버튼 */}
            <div className="mt-4 flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl p-2 text-xs">
              <span className="font-mono text-stone-700 truncate mr-2 select-all text-[11px]">
                {siteUrl}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-1 text-xs cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사됨' : '복사'}</span>
              </button>
            </div>

            {/* 하단 다운로드 및 새창 안내 */}
            <div className="mt-3 flex items-center justify-center gap-3 text-xs">
              <a 
                href="/qrcode.png" 
                download="시간을잇는큐레이터_QR코드.png"
                className="text-amber-800 hover:text-amber-950 font-bold underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>QR 이미지 다운로드</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
