@echo off

echo Installing required pip packages...
pip install Flask werkzeug flask-cors torch torchvision matplotlib numpy

echo Running the Python API Script...
start cmd /k "python .\flask-api\app.py"

echo Installing Node Dependencies...
cd front-end
start cmd "npm install"

echo Starting the Node.js application in a new window...
start cmd /k "npm run dev"

echo Done!

pause
