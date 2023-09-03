@echo off
color 0f
title Create Game Engine Project

:start
cls
set /p name=Project name: 
echo.

if "%name%" == " " goto start

if exist "Projects" goto CreateProject
mkdir Projects

:CreateProject
cd Projects
if not exist "%name%" mkdir %name%

cd %name%
if not exist "Assets" mkdir Assets

cd Assets
if not exist "Scripts" mkdir Scripts
if not exist "Textures" mkdir Textures
if not exist "Sounds" mkdir Sounds

cd Scripts
echo window.addEventListener('load', () =^> {>> Main.js
echo     Game.CreateCanvas();>> Main.js
echo     Game.Start();>> Main.js
echo });>> Main.js

cd ../..
echo ^<html^>> index.html
echo 	^<head^>>> index.html
echo 		^<title^>Game^</title^>>> index.html
echo 		^<link rel="stylesheet" type="text/css" href="style.css"^>>> index.html
echo 		^<script src="https://eriksando.github.io/lib/game-engine/Engine.js"^>^</script^>>> index.html
echo 		^<script src="Assets/Scripts/Main.js"^>^</script^>>> index.html
echo 	^</head^>>> index.html
echo 	^<body^>>> index.html
echo 	^</body^>>> index.html
echo ^</html^>>> index.html

echo #canvas {>> style.css
echo     position: absolute;>> style.css
echo     top: 0;>> style.css
echo     bottom: 0;>> style.css
echo     left: 0;>> style.css
echo     right: 0;>> style.css
echo }>> style.css

echo Successfully created project "%name%" (find in directory Projects/%name%)
echo You can play the game by running "index.html" found in the project directory
echo.
echo Press any key to close
pause >nul
exit