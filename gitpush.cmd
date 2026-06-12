@echo off
cd /d "C:\Users\ADMIN\Desktop\beatlz-fullstack\qanbie"

:: Remove accidental .git in parent if exists
if exist "..\.git" rd /s /q "..\.git"

:: Init git if not already
git init

:: Configure user (adjust if needed)
git config user.email "dev@seelay.app"
git config user.name "Seelay Dev"

:: Add remote
git remote remove origin 2>nul
git remote add origin https://github.com/Aravindh-dev12/seelay.git

:: Stage everything
git add -A

:: Commit
git commit -m "Initial seelay commit"

:: Push (this will prompt for auth if not already configured)
git push -u origin main --force

echo Done
timeout /t 5
