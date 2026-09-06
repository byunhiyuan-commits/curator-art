import { createClient } from '@supabase/supabase-js';

// Supabase 환경 설정 (Vercel 환경 변수 우선, 기본값으로 프로젝트 연결)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ejlpxwflsacdjiobfnsj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqbHB4d2Zsc2FjZGppb2JmbnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2MTc2NjYsImV4cCI6MjEwNDE5MzY2Nn0.FPgqEDAQmqpTNaNvrTR6fDOM1oVUhm7aCIkxQp52ink';


export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseUrl.startsWith('http') && 
  supabaseAnonKey && 
  supabaseAnonKey.length > 20
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : null;

if (isSupabaseConfigured) {
  console.log("⚡ Supabase 클라우드 실시간 데이터베이스 연결 활성화!");
} else {
  console.log("ℹ️ Supabase 키 미설정 (로컬 스토리지 모드로 자동 동작)");
}
