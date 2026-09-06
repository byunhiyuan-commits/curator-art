import rawStudents from './students.json';

export const ALL_STUDENTS = rawStudents;

// 1반부터 8반까지 반별 그룹화
export const STUDENTS_BY_CLASS = rawStudents.reduce((acc, student) => {
  const c = student.classNum;
  if (!acc[c]) acc[c] = [];
  acc[c].push(student);
  return acc;
}, {});

export const CLASS_LIST = [1, 2, 3, 4, 5, 6, 7, 8];
