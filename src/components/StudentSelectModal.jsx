import React, { useState } from 'react';
import { X, Search, Check, UserCheck, Users } from 'lucide-react';
import { STUDENTS_BY_CLASS, CLASS_LIST } from '../data/students';

export default function StudentSelectModal({ isOpen, onClose, onSelect, currentStudent }) {
  const [selectedClass, setSelectedClass] = useState(currentStudent ? currentStudent.classNum : 1);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Search filter across all classes or active class
  const classStudents = STUDENTS_BY_CLASS[selectedClass] || [];
  const filteredStudents = searchQuery.trim() === ''
    ? classStudents
    : Object.values(STUDENTS_BY_CLASS).flat().filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.includes(searchQuery)
      );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[88vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-900 to-stone-800 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 font-curator">
              <Users className="w-5 h-5 text-amber-400" />
              나의 학번과 이름 선택
            </h3>
            <p className="text-xs text-stone-300 mt-0.5">
              请选择你的学号与姓名 (Select your student ID & Name)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-stone-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Class Tabs */}
        <div className="p-3 sm:p-4 bg-stone-50 border-b border-stone-200 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="이름 또는 학번 검색 (搜索姓名或学号)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          {/* Class Tabs (hidden if searching) */}
          {searchQuery.trim() === '' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CLASS_LIST.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedClass(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold shrink-0 transition-all ${
                    selectedClass === c
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {c}반 <span className="text-[11px] opacity-80">({c}班)</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Students List Grid */}
        <div className="p-4 overflow-y-auto flex-1 min-h-[260px]">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-sm">
              일치하는 학생을 찾을 수 없습니다.
              <p className="text-xs text-stone-400 mt-1">未找到匹配的学生</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredStudents.map(student => {
                const isSelected = currentStudent && currentStudent.id === student.id;
                return (
                  <button
                    key={student.id}
                    type="button"
                    onClick={() => {
                      onSelect(student);
                      onClose();
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 shadow-xs ring-1 ring-amber-400'
                        : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-700">
                        {student.studentNum}
                      </span>
                      <div className="truncate">
                        <div className="text-sm font-bold text-stone-800 truncate">
                          {student.name}
                        </div>
                        <div className="text-xs text-stone-600">
                          {student.id} · {student.classNum}반
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors"
          >
            닫기 (关闭)
          </button>
        </div>
      </div>
    </div>
  );
}
