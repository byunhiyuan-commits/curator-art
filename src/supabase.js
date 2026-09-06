import { createClient } from '@supabase/supabase-js';

// Supabase 환경 설정 (Vercel 배포 시 환경 변수로 주입되거나 로컬 .env 지원)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

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
