@echo off
color 0f
title Create Project

echo Select option
echo.
echo [1] New project
echo [2] Start with example
echo.
choice /c 12 >nul
cls
if errorlevel 2 goto example
if errorlevel 1 goto newproj

:newproj
set /p name=Project name (no spaces): 
echo.
if "%name%" == " " goto start
if not exist "Projects" mkdir Projects
cd Projects
if not exist "%name%" mkdir %name%
cd %name%
if not exist "Assets" mkdir Assets
cd ../..
xcopy /e /q "examples\blank" "Projects\%name%"
cls
echo Created project "%name%" (find in Projects/%name%)
echo You can play the game by opening index.html found in the project directory
echo.
echo Press any key to close
pause >nul
exit

:example
set projname=""
echo Select example
echo.
echo [1] Character controller
echo [2] Shadows (line of sight)
echo [3] Multiplayer
echo.
choice /c 123 >nul
if errorlevel 3 set projname="multiplayer"
if errorlevel 2 set projname="shadows"
if errorlevel 1 set projname="basic"
cls
set /p name=Project name (no spaces): 
echo.
if "%name%" == " " goto start
if not exist "Projects" mkdir Projects
cd Projects
if not exist "%name%" mkdir %name%
cd %name%
if not exist "Assets" mkdir Assets
cd ../..
xcopy /e /q "examples\%projname%" "Projects\%name%"
cls
echo Created project "%name%" (find in Projects/%name%)
echo You can play the game by opening index.html found in the project directory
echo.
echo Press any key to close
pause >nul
exit