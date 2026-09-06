@echo off
chcp 65001 > nul
title 시간을 잇는 큐레이터 (웹 앱 실행기)
echo ========================================================
echo   [시간을 잇는 큐레이터] 반응형 웹 앱을 시작합니다.
echo   - 5차시 서양미술사 복습 프로젝트
echo   - 고정 접속 링크: http://localhost:5173
echo ========================================================
echo.

cd /d "%~dp0"

:: 브라우저 자동 실행 (2초 후)
start "" cmd /c "timeout /t 2 /nobreak > nul && start http://localhost:5173"

:: Vite 개발 서버 실행 (고정 포트 5173, 외부 기기 접속 가능)
call npm run dev

pause
