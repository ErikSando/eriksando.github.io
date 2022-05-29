@echo off
title Multiplayer Game Server
:main
node server.js
echo.
echo Restarting in:
echo 3
timeout /t 1 >nul
echo 2
timeout /t 1 >nul
echo 1
timeout /t 1 >nul
echo.
echo Restarting...
echo.
goto main