#!/bin/bash

# Function to activate Python virtual environment
activate_venv() {
  # Assuming Python 3.6 or newer is installed
  source venv/bin/activate
}

# Step into the flask-api directory
cd flask-api

# Create a Python virtual environment and activate it
echo "Creating a Python virtual environment..."
python3 -m venv venv
activate_venv

# Install Python dependencies
echo "Installing Python dependencies from requirements.txt..."
pip install -r requirements.txt

# Start the Flask application in the background
echo "Starting Flask API..."
python app.py &

# Save the PID of the Flask process to later use it for shutting down
FLASK_PID=$!

# Navigate back to the root directory, then into the front-end directory
cd ../front-end

# Install npm packages
echo "Installing npm packages..."
npm install

# Start the npm development server
echo "Starting npm development server..."
npm run dev

# Optionally, if you want to stop the Flask app when terminating this script,
# uncomment the following lines:
# trap "kill $FLASK_PID" EXIT
