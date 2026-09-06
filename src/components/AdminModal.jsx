import React, { useState } from 'react';
import { Lock, X, KeyRound, AlertCircle, CheckCircle, ShieldCheck, RefreshCw, Download, PlusCircle } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, isAdmin, onLoginSuccess, onLogout, onResetToSample, onClearAll, exhibitsCount }) {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '1130') {
      onLoginSuccess();
      setPassword('');
      setErrorMsg('');
    } else {
      setErrorMsg('비밀번호가 올바르지 않습니다. (密码错误)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base sm:text-lg font-curator">
              교사용 관리자 페이지 (教师管理)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 본문 */}
        <div className="p-6">
          {!isAdmin ? (
            /* 로그인 폼 */
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-stone-800">
                  선생님 인증이 필요합니다
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  请输入教师管理密码 (Enter Teacher Password)
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  관리자 비밀번호 (密码)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    autoFocus
                    placeholder="비밀번호 입력 (4자리)"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full pl-9 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                {errorMsg && (
                  <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errorMsg}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                관리자 모드 활성화 (激活管理模式)
              </button>
            </form>
          ) : (
            /* 관리자 대시보드 옵션 */
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-800">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold">관리자 모드가 활성화되었습니다!</div>
                  <div className="text-emerald-700">갤러리 각 카드의 수정/삭제 버튼이 켜졌습니다.</div>
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="font-bold text-stone-700">전시 현황 요약 (统计):</div>
                <div className="text-stone-600">• 현재 등록된 큐레이션: <strong>{exhibitsCount}개</strong></div>
                <div className="text-stone-600">• 게시물 삭제/수정은 갤러리 화면의 각 카드 우상단 아이콘을 이용하세요.</div>
              </div>

              {/* 관리 버튼 모음 */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={onResetToSample}
                  className="w-full py-2 px-3 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
                  <span>기본 샘플 데이터로 복원하기 (恢复默认示例)</span>
                </button>

                <button
                  type="button"
                  onClick={onClearAll}
                  className="w-full py-2 px-3 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-rose-500" />
                  <span>전체 게시물 비우기 (清空所有学生作品)</span>
                </button>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between items-center">
                <button
                  type="button"
                  onClick={onLogout}
                  className="text-xs text-stone-500 hover:text-stone-800 font-medium"
                >
                  관리자 로그아웃 (退出管理)
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800"
                >
                  완료 (完成)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
