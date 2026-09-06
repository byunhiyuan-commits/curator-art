import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import GalleryView from './components/GalleryView';
import AdminModal from './components/AdminModal';
import EditExhibitModal from './components/EditExhibitModal';
import { INITIAL_EXHIBITS } from './data/initialData';
import { isSupabaseConfigured, supabase } from './supabase';

const STORAGE_KEY = 'curator_bridging_time_exhibits_v6';

// Supabase DB 레코드를 앱 카드 포맷으로 매핑
function mapSupabaseRecord(row) {
  return {
    id: String(row.id),
    studentId: row.student_id || row.studentId,
    studentName: row.student_name || row.studentName,
    movementId: row.movement_id || row.movementId,
    modernKeyword: row.modern_keyword || row.modernKeyword,
    reasonText: row.reason_text || row.reasonText,
    artworkIndex: row.artwork_index ?? row.artworkIndex ?? 0,
    createdAt: row.created_at || row.createdAt || new Date().toISOString()
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'gallery'
  const [exhibits, setExhibits] = useState(() => {
    try {
      const savedV6 = localStorage.getItem(STORAGE_KEY);
      if (savedV6) {
        return JSON.parse(savedV6);
      }
      const prevSaved = localStorage.getItem('curator_bridging_time_exhibits_v5') ||
                        localStorage.getItem('curator_bridging_time_exhibits_v4') ||
                        localStorage.getItem('curator_bridging_time_exhibits_v3') || 
                        localStorage.getItem('curator_bridging_time_exhibits_v2');
      if (prevSaved) {
        const parsed = JSON.parse(prevSaved);
        const userAdded = parsed.filter(item => !item.id?.startsWith('sample-'));
        return [...userAdded, ...INITIAL_EXHIBITS];
      }
    } catch (e) {
      console.error('Failed to load exhibits from localStorage', e);
    }
    return INITIAL_EXHIBITS;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingExhibit, setEditingExhibit] = useState(null);

  // 1. Supabase 실시간 클라우드 DB 연동 리스너 (Realtime WebSocket)
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    // (1) 초기 데이터 전체 로드
    const loadSupabaseData = async () => {
      try {
        const { data, error } = await supabase
          .from('exhibits')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          const userCards = data.map(mapSupabaseRecord);
          const merged = [...userCards, ...INITIAL_EXHIBITS];
          setExhibits(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        }
      } catch (err) {
        console.warn("Supabase 데이터 로드 실패 (로컬 모드 유지):", err);
      }
    };

    loadSupabaseData();

    // (2) 실시간 Realtime 변경 감지 (누군가 글을 쓰거나 삭제하면 즉시 전 학생 화면에 반영)
    const channel = supabase
      .channel('realtime:exhibits')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'exhibits' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const newCard = mapSupabaseRecord(payload.new);
          setExhibits((prev) => [newCard, ...prev.filter(item => item.id !== newCard.id)]);
        } else if (payload.eventType === 'DELETE') {
          const deletedId = String(payload.old.id);
          setExhibits((prev) => prev.filter(item => item.id !== deletedId));
        } else if (payload.eventType === 'UPDATE') {
          const updatedCard = mapSupabaseRecord(payload.new);
          setExhibits((prev) => prev.map(item => item.id === updatedCard.id ? updatedCard : item));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 2. localStorage 자동 로컬 백업 저장
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(exhibits));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [exhibits]);

  // 새 전시물 제출 (Supabase 실시간 클라우드 DB 저장 + 로컬 상태 즉시 반영)
  const handleSubmitSuccess = async (newExhibit) => {
    setExhibits((prev) => [newExhibit, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('exhibits').insert([{
          student_id: newExhibit.studentId,
          student_name: newExhibit.studentName,
          movement_id: newExhibit.movementId,
          modern_keyword: newExhibit.modernKeyword,
          reason_text: newExhibit.reasonText,
          artwork_index: newExhibit.artworkIndex || 0,
          created_at: newExhibit.createdAt || new Date().toISOString()
        }]);
      } catch (err) {
        console.error("Supabase 저장 실패:", err);
      }
    }
  };

  // 게시물 삭제 (관리자 전용: Supabase 및 로컬 동시 삭제)
  const handleDeleteExhibit = async (id) => {
    if (window.confirm('정말 이 전시 게시물을 삭제하시겠습니까? (确定要删除此展品吗？)')) {
      setExhibits((prev) => prev.filter((item) => item.id !== id));

      if (isSupabaseConfigured && supabase && !id.startsWith('sample-')) {
        try {
          await supabase.from('exhibits').delete().eq('id', id);
        } catch (err) {
          console.error("Supabase 삭제 실패:", err);
        }
      }
    }
  };

  // 게시물 수정 저장 (관리자 전용: Supabase 및 로컬 동시 수정)
  const handleSaveEdit = async (updated) => {
    setExhibits((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));

    if (isSupabaseConfigured && supabase && !updated.id.startsWith('sample-')) {
      try {
        await supabase.from('exhibits').update({
          modern_keyword: updated.modernKeyword,
          reason_text: updated.reasonText
        }).eq('id', updated.id);
      } catch (err) {
        console.error("Supabase 수정 실패:", err);
      }
    }
  };

  // 샘플 데이터로 복원
  const handleResetToSample = () => {
    if (window.confirm('기본 예시 샘플 데이터로 되돌리시겠습니까? (确定要恢复为默认示例数据吗？)')) {
      setExhibits(INITIAL_EXHIBITS);
    }
  };

  // 전체 데이터 비우기
  const handleClearAll = () => {
    if (window.confirm('모든 학생 전시 데이터를 비우시겠습니까? (경고: 복구할 수 없습니다)')) {
      setExhibits(INITIAL_EXHIBITS);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      {/* 상단 네비게이션 */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        isAdmin={isAdmin}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1">
        {activeTab === 'form' ? (
          <StudentForm
            onSubmitSuccess={handleSubmitSuccess}
            onGoGallery={() => setActiveTab('gallery')}
          />
        ) : (
          <GalleryView
            exhibits={exhibits}
            isAdmin={isAdmin}
            onDeleteExhibit={handleDeleteExhibit}
            onEditExhibit={(item) => setEditingExhibit(item)}
            onGoWrite={() => setActiveTab('form')}
          />
        )}
      </main>

      {/* 알록달록 미술관 푸터 */}
      <footer className="border-t-2 border-amber-200 bg-white/80 py-6 text-center text-xs text-stone-600">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <p className="font-extrabold text-stone-800 font-curator text-sm">
            🎨 시간을 잇는 큐레이터 (时间的策展人) · AI로 재해석하는 서양미술사 5차시 복습
          </p>
          <p className="text-[11px] text-amber-900 font-medium">
            🖌️ 중학교 1학년 미술과 교육과정 연계 · 근대 서양미술사 9대 화파 탐색 프로젝트 🖼️
          </p>
          <p className="text-[10px] text-stone-600 pt-1">
            © 2026 Middle School Art Class. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* 교사용 관리자 모달 */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isAdmin={isAdmin}
        onLoginSuccess={() => setIsAdminModalOpen(false) || setIsAdmin(true)}
        onLogout={() => setIsAdmin(false) || setIsAdminModalOpen(false)}
        onResetToSample={handleResetToSample}
        onClearAll={handleClearAll}
        exhibitsCount={exhibits.length}
      />

      {/* 게시물 수정 모달 */}
      <EditExhibitModal
        exhibit={editingExhibit}
        isOpen={!!editingExhibit}
        onClose={() => setEditingExhibit(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
