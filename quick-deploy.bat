@echo off
echo ========================================
echo   Portfolio Deployment Helper
echo ========================================
echo.

echo This script will help you push your portfolio to GitHub.
echo.
echo Before running this script:
echo 1. Create a new repository on GitHub
echo 2. Name it 'portfolio' or 'abhijit-barik.github.io'
echo 3. Make it PUBLIC
echo 4. Do NOT initialize with README
echo.

set /p repo_url="Enter your GitHub repository URL (e.g., https://github.com/Abhijit-Barik01/portfolio.git): "

if "%repo_url%"=="" (
    echo Error: Repository URL cannot be empty!
    pause
    exit /b 1
)

echo.
echo Adding remote repository...
git remote add origin %repo_url%

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo   SUCCESS! Your code is on GitHub
echo ========================================
echo.
echo Next steps:
echo 1. Go to your repository on GitHub
echo 2. Click Settings ^> Pages
echo 3. Select 'main' branch and '/' folder
echo 4. Click Save
echo 5. Wait 1-2 minutes for deployment
echo.
echo Your site will be live at:
echo https://abhijit-barik01.github.io/[your-repo-name]/
echo.

pause

