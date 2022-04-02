@echo off
color 0f
title Create Lucid Engine Project

:start
cls
set /p name=Project name: 
echo.

if "%name%" == " " goto start

if exist "Projects" goto CreateProject
mkdir Projects

:CreateProject
cd Projects
mkdir %name%

cd %name%
mkdir Assets

cd Assets
mkdir Scripts
mkdir Sprites
mkdir Sounds

cd Scripts
echo let bgColour = 'white';>> Main.js
echo.>> Main.js
echo // Runs once the game engine has finished setting up>> Main.js
echo EngineEvents.EngineLoaded = () =^> {>> Main.js
echo     game.settings.bgColour = bgColour;>> Main.js
echo.>> Main.js
echo     game.start();>> Main.js
echo }>> Main.js

cd ../..
echo ^<html^>>> index.html
echo 	^<head^>>> index.html
echo 		^<title^>Game^</title^>>> index.html
echo 		^<link rel="stylesheet" type="text/css" href="style.css"^>>> index.html
echo 		^<script src="../../Lucid.js"^>^</script^>>> index.html
echo 		^<script src="Assets/Scripts/Main.js"^>^</script^>>> index.html
echo 	^</head^>>> index.html
echo 	^<body^>>> index.html
echo 		^<canvas^>Your browser does not support HTML5^</canvas^>>> index.html
echo 	^</body^>>> index.html
echo ^</html^>>> index.html

echo body {>> style.css
echo     margin: 0;>> style.css
echo     padding: 0;>> style.css
echo }>> style.css
echo.>> style.css
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