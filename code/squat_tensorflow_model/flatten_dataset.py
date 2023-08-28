import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.preprocessing import LabelEncoder
import tensorflowjs as tfjs

# * define some constants
MAX_JOINT_ANGLES_LEN = 325
NUM_JOINT_ANGLE_PAIRS = 12
NUM_EPOCHS = 50

# * LOAD DATASET
data = pd.read_csv('../dataset3.csv')
# * shuffle the dataset
# data = data.sample(frac = 1).reset_index(drop=True)
headers = data.columns # might not use this anymore
classifications = data.classification # labels for each video
# get each row
rows = data.iloc[:, :-1].to_numpy()
dependentVariables = data.iloc[:,-1].values

# * encode output into 0 = correct and 1 = wrong
classes = ['CORRECT', 'WRONG']
LE1 = LabelEncoder()
dependentVariables = np.array(LE1.fit_transform(dependentVariables))

# * CONVERT NONE AND NAN VALUES TO -1

flattenedRows = [] # this array will hold all the joint angles in each row but flattened.

for i in range(len(rows)): # iterate thru each row
  combinedJointAngles = []
  for j in range(len(rows[i])): # iterate thru each column in row
    # convert the string representation of arrays into an actual list
    temp = rows[i][j].strip('][').split(', ')
    # turn list to numpy array
    temp = np.array(temp)
    # convert Nones to 0
    noNones = np.where(temp == 'None', 0.0, temp)
    #convert NaNs to 0 as well
    noNans = np.where(noNones == 'nan', 0.0, noNones)
    #convert all strings and -1s in noNans to floats
    floats = noNans.astype(float)
    #convert all elements in array into floats
    # pad the arrays with 0s to make the length of each joint angle list have uniform len
    padWidth = abs(len(floats)-MAX_JOINT_ANGLES_LEN)
    paddedValues = np.pad(floats, (0, padWidth), 'constant', constant_values=(0))
    combinedJointAngles = np.concatenate((combinedJointAngles, paddedValues), axis=None)
  flattenedRows.append(combinedJointAngles)

# * flattenedRows now contains an array of joint angles. Each element represents each row.
# ? reshape into 100 rows, 12 features (joint-angles), each feature containing 325 values
reshapedRows = tf.reshape(flattenedRows, [100, NUM_JOINT_ANGLE_PAIRS, MAX_JOINT_ANGLES_LEN]) # this is done only on simpleRNN

# print(reshapedRows)
# print(len(reshapedRows))
# print(reshapedRows.shape)

# # * BUILD THE MODEL

# ? simple RNN model
inputLayer = tf.keras.Input((NUM_JOINT_ANGLE_PAIRS, MAX_JOINT_ANGLES_LEN))
maskingLayer = tf.keras.layers.Masking(mask_value=0, input_shape=(NUM_JOINT_ANGLE_PAIRS, MAX_JOINT_ANGLES_LEN))(inputLayer)
# hidden1 = tf.keras.layers.SimpleRNN(100, activation='sigmoid')(maskingLayer)
# hidden1 = tf.keras.layers.LSTM(100, activation='sigmoid')(maskingLayer)
hidden1 = tf.keras.layers.GRU(100, activation='sigmoid')(maskingLayer)
hidden2 = tf.keras.layers.Dense(88, activation='relu')(hidden1)
hidden3 = tf.keras.layers.Dense(60, activation='relu')(hidden2)
hidden4 = tf.keras.layers.Dense(38, activation='relu')(hidden3)
hidden5 = tf.keras.layers.Dense(16, activation='relu')(hidden4)
outputs = tf.keras.layers.Dense(2, activation='relu')(hidden5)

model = tf.keras.Model(inputs=inputLayer, outputs=outputs)
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.build((100, NUM_JOINT_ANGLE_PAIRS, MAX_JOINT_ANGLES_LEN))

print(model.summary())

# # * PREPARE THE TRAINING DATASET (we get only values 0-39)
X_train = np.array(reshapedRows[:40]) # for RNN
Y_train = np.array(dependentVariables[:40])

# ? look for binary classifier, train ko lang correct, any other videos should be wrong
# ? one class classification
# ? try joint angle feature base
# ? try cnn

# # * TRAIN

# [print(i.shape, i.dtype) for i in model.inputs]
# [print(o.shape, o.dtype) for o in model.outputs]
# [print(l.name, l.input_shape, l.dtype) for l in model.layers]
model.fit(X_train, Y_train, epochs=NUM_EPOCHS, batch_size=20, verbose=2)

# #* EVALUATE (we get only values 40-69)
X_eval = np.array(reshapedRows[40:70])
Y_eval = np.array(dependentVariables[40:70])
model.evaluate(X_eval, Y_eval, batch_size=15, verbose=1)


#* PREDICT

# ? trying out all the values in the dataset
for i in range(len(reshapedRows)):
  predictMe = tf.reshape(reshapedRows[i], (1,NUM_JOINT_ANGLE_PAIRS, MAX_JOINT_ANGLES_LEN))
  prediction = model.predict(predictMe)
  prediction_class = np.argmax(prediction)
  print(prediction, prediction_class, classifications[i], '=>', classes[prediction_class],'\n')


# * TEST (we test with the remaining values in the dataset)
X_test = np.array(reshapedRows[70:100])
Y_test = np.array(dependentVariables[70:100])
for i in range(len(X_test)):
  predictMe = tf.reshape(X_test[i], (1, NUM_JOINT_ANGLE_PAIRS, MAX_JOINT_ANGLES_LEN))
  prediction = model.predict(predictMe)
  prediction_class = np.argmax(prediction)
  print(prediction, prediction_class, classifications[i], '=>', classes[prediction_class], '\n')

# * Export the created model into tfjs format
# tfjs.converters.save_keras_model(model, './tfjs_model_simpleRNN')

# * save the model
model.save('../../model_server/static/gfgModel')
print('Model Saved!')
