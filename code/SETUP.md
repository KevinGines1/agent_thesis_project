# Development Set-up
## Prerequisites
* Expo CLI (for PC) and Expo App (for mobile phones)
* NodeJS
* React
* Yarn (package manager)
* TensorFlow and Keras (ML Models were built using Python)
* Python
* OpenCV
* Android/iOS Phone (For testing published app, use Android phone only)
* FastAPI
* (optional) Jupyter Notebook (for training ML models)
* (optional) VSCode

## Instructions for running the mobile application locally
1. Open command prompt or any terminal
2. Navigate to `agent-app`
3. Run the command `yarn start`
4. Expo will show a QR code in the terminal which will give you access to the app.

## Instructions for running the FastAPI Server
1. Open command prompt or any terminal
2. Navigate to `model_server/python_server`
3. Run the command `py server.py`
4. The server should be up and running

## Important Files/Folders
- `code/agent-app` - The mobile application
- `model_server/python_server` - The FastAPI server
- `squat_tensorflow_model/flatten_dataset.py` - The code used for building the RNN Model
- `squat_tensorflow_model/CNN_3CLASS.ipynb`  - The Jupyter notebook code used for building the CNN-RNN Model

## Useful Tutorials
- [Human Pose Estimation using OpenCV and OpenPose](https://www.youtube.com/watch?v=9jQGsUidKHs)
- [Video Classification with a CNN-RNN Architecture](https://keras.io/examples/vision/video_classification/)
- [Recurrent Neural Networks (RNN) with Keras](https://www.tensorflow.org/guide/keras/rnn)
- [Illustrated Guide to Recurrent Neural Networks: Understanding the Intuition](https://youtu.be/LHXXI4-IEns?list=PLCSEclMJyGdaZGkrFQKX5DWnRdidP2OeK)
- [AI as an API - Part 2 - Deploy an ML Model Rest API using Encryption, Docker, Keras, FastAPI & NoSQL](https://youtu.be/nTdMjFcK3SM?list=PLCSEclMJyGdaZGkrFQKX5DWnRdidP2OeK) (For deploying FastAPI that contains ML models)
- [Publishing Expo React Native Apps to Expo](https://youtu.be/eIle1I047II?list=PLCSEclMJyGdaZGkrFQKX5DWnRdidP2OeK)
- [React Native Tutorial for Beginners](https://youtube.com/playlist?list=PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ)
