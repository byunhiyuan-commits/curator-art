import React from 'react';
import { Palette, Layers, Lock, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { GirlWithPearl, VanGoghArtist } from './ArtCharacters';

export default function Navbar({ activeTab, onTabChange, isAdmin, onOpenAdmin }) {
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

        {/* Teacher Admin Trigger */}
        <div className="flex items-center gap-2">
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
    </nav>
  );
}
