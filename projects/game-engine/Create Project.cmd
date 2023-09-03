@echo off
color 0f
title Create Project

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

echo // Runs once the engine is finished setting up> Main.js
echo Game.Loaded.AddListener(() =^> {>> Main.js
echo     Game.CreateCanvas();>> Main.js
echo     Game.Start();>> Main.js
echo });>> Main.js

cd ..

(
echo ^<html^>
echo 	^<head^>
echo 		^<title^>Game^</title^>
echo 		^<link rel="stylesheet" type="text/css" href="style.css"^>
echo 		^<script src="../../Engine.js"^>^</script^>
echo 		^<script src="Assets/Main.js"^>^</script^>
echo 	^</head^>
echo 	^<body^>
echo 	^</body^>
echo ^</html^>
)> index.html

(
echo * {
echo     background:black;
echo }
echo.
echo html {
echo     margin: 0;
echo     padding: 0;
echo }
echo.
echo canvas {
echo     margin: auto;
echo     position: absolute;
echo     top: 0;
echo     bottom: 0;
echo     left: 0;
echo     right: 0;
echo }
)> style.css

echo Successfully created project "%name%" (find in directory Projects/%name%)
echo You can play the game by running "index.html" found in the project directory
echo.
echo Press any key to close
pause >nul
exit