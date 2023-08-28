import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import {
  AspectRatio,
  Box,
  Stack,
  Center,
  Text,
  Heading,
  CheckIcon,
  CircleIcon,
  HStack,
  Button,
  PresenceTransition
} from 'native-base'
import { Video } from 'expo-av'
import { ExerciseCardProps } from '../components/ExerciseCard'
import { AVPlaybackSource } from 'expo-av/build/AV.types'
import UploadVideoModal from '../components/UploadVideoModal'
import ErrorModal from '../components/ErrorModal'
import axios from 'axios'
import {baseUrlLocal, baseUrlProd} from '../components/_utils'

export default function ExerciseScreen({ route: { params }, navigation }: {route: { params: any}, navigation: any}): JSX.Element {
  const exercise: ExerciseCardProps = params
  const video = React.useRef(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [image, setImage] = useState<any>(null)
  const [uploadUrl, setUploadUrl] = useState<string>('')
  const [loadingMessage, setLoadingMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const instructions = exercise?.exerciseInstructions

  useLayoutEffect(() => {
    navigation.setOptions({
      title: exercise.exerciseName
    })
  })

  const classifyVideoRNN = async (url: string) => {
    console.log(url)
    try {
      // * identify what exercise was uploaded
      setLoadingMessage('Identifying exercise...')
      console.log('Identifying exercise...')
      const classRes = await axios.post(`${baseUrlLocal}/cnn/classify`, {
        videoUrl: url
      })
      const classification = classRes?.data || null
      console.log(classification)

      // ? we call the appropriate model based on the classfication
      // * for now, since we only have squats, we only have this if condition
      if (classification !== 'BodyWeightSquats') {
        setErrorMessage('The app identified a different exercise. Please make sure that you are performing the right exercise.')
        setShowErrorModal(true)
        setImage(null)
        setUploadUrl('')
        setLoadingMessage('')
        return
      }

      // * send the video to the squat RNN API to get the joint angle pairs
      setLoadingMessage('Extracting video features...(this may take a while)')
      const res = await axios.post(`${baseUrlLocal}/rnn/getJointAnglePairs`, {
        videoUrl: url
      })
      console.log('joint angles extracted')
      
      // * send the extracted joint angle pairs to the squat RNN API to classify
      setLoadingMessage('Evaluating video...')
      const predictionRes = await axios.post(`${baseUrlLocal}/rnn/classify`, {
        jointAnglePairs: res.data
      })
      console.log(predictionRes.data)
      setLoadingMessage('Done!')
      navigation.navigate('Results', {prediction: predictionRes.data, image, exercise})
    } catch (e) {
      setErrorMessage('Our models are tired right now. They\'re not being paid to work 😞 Please try again later!')
      setShowErrorModal(true)
      setImage(null)
      setUploadUrl('')
      setLoadingMessage('')
      console.error('FastAPI classify error: ', e)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowModal(false)
      setImage(null)
      setUploadUrl('')
      setLoadingMessage('')
      
    })

    unsubscribe
  }, [navigation])
  
  return (
    <ScrollView>
      <Box alignSelf='center' alignItems={'center'} >
        <Stack space={3} backgroundColor='red'>
          <Center>
            <AspectRatio w='100%' ratio={16/9}>
                <Video
                  ref={video}
                  source={exercise.exerciseSampleVideo as unknown as AVPlaybackSource}
                  useNativeControls
                  isMuted
                  resizeMode='stretch'
                  isLooping
                />
            </AspectRatio>
          </Center>
          <Box style={styles.textContainer}>
            <Heading allowFontScaling={false}  size={'lg'} color='#D4B499' style={styles.subHeaderTitle}>
              How to perform
            </Heading>
            <Heading allowFontScaling={false} size={'2xl'} style={styles.header}>{exercise.exerciseName}</Heading>
            <Box style={styles.subHeaderContent}>
              {instructions.map((text: string, index: number) => {
                return (
                  <HStack space={2} key={index} style={{flex: 0, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                    <CircleIcon size="5" mt="0.5" color="#D4B499" />
                    <Text allowFontScaling={false} style={styles.instructions}>{text}</Text>
                  </HStack>
                )
              })}
            </Box>
          </Box>
          <Center>
          </Center>
          <Center>
            { !image && 
              <Button
                size={'md'}
                onPress={() => { setShowModal(true) }}
                leftIcon={<CheckIcon />}
                backgroundColor={'#FF7800'}
                _text={{
                  allowFontScaling: false
                }}
                disabled={exercise?.exerciseName !== 'Squats'}
              >
                Check your form!
              </Button>
            }
          </Center>
        </Stack>
        <PresenceTransition
          visible={showModal}
          initial={{
            opacity: 0,
            scale: 0
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 250
            }
          }}
        >
          <UploadVideoModal
            open={showModal}
            onClose={() => { setShowModal(false) }}
            image={image}
            setImage={(image) => setImage(image)}
            setUploadUrl={(url) => setUploadUrl(url)}
          />
        </PresenceTransition>
        {/* ERROR MESSAGE  */}
        <PresenceTransition
          visible={showErrorModal}
          initial={{
            opacity: 0,
            scale: 0
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 250
            }
          }}
        >
          <ErrorModal
            open={showErrorModal}
            onClose={() => { setShowErrorModal(false) }}
            errorMessage={errorMessage}
          />
        </PresenceTransition>
        {image && uploadUrl && !loadingMessage &&
          <Button
            size={'lg'}
            onPress={() => { classifyVideoRNN(uploadUrl) }}
            backgroundColor={'#FF7800'}
            _text={{
              allowFontScaling: false
            }}
          >
            Analyze Exercise  
          </Button>
        }
        {loadingMessage && 
            <Button _text={{ allowFontScaling:false }} isLoading={true} backgroundColor={'#D4B499'} isLoadingText={loadingMessage} />
        }
      </Box>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    fontFamily: 'Montserrat-Bold',
  },
  subHeaderTitle: {
    fontWeight: '300',
    fontFamily: 'Roboto',
    marginTop: 10,
    marginBottom: 10
  },
  subHeaderContent: {
    fontWeight: '300',
    fontFamily: 'Roboto-Light',
    marginTop: 15,
    marginBottom: 10,
    marginRight: 15,
  },
  textContainer: {
    paddingLeft: 20,
  },
  instructions: {
    fontFamily: 'Montserrat',
    flex: 1,
    flexWrap: 'wrap',
    margin: 5,
    fontSize: 20,
  }
});