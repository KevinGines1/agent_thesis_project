# AGENT: Automated Guidance for Exercise and Therapy with Human Pose Estimation and Machine Learning
Authors: Kevin A. Gines and Arian J. Jacildo

Exercising provides tons of benefits both physically and mentally. The Internet and social media have made it easier for people to find the proper routine that suits their fitness goals without having personal trainers. However, there is a heightened risk of injury when such exercises are done with poor form and improper execution. AGENT is a mobile application developed to provide users feedback to their exercise form. For this study, a bodyweight squat dataset was used to train a Recurrent Neural Network (RNN) model to identify if a user's squat is correct or not. The RNN utilizes the joint angles found from each frame in the video for its classification. These joint angles are extracted using human pose estimation by using OpenCV and OpenPose. The RNN had an F-score of 0.71 and an accuracy rating of 71\%. Using PSSUQ, it was observed that the respondents who evaluated AGENT were overall satisfied with the application and its core feature. Further improvements for AGENT include the use of a larger dataset, and the addition of exercises other than the squat.

Keywords: human pose estimation, exercise, form, checker, tensorflow