@echo off
title Server

:start

node Server.js

echo Restarting in 3...
timeout /t 1 >nul

echo Restarting in 2...
timeout /t 1 >nul

echo Restarting in 1...
timeout /t 1 >nul

cls

goto start