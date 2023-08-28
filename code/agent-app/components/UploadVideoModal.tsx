import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  AspectRatio,
  Box,
  Center,
  Modal,
  Text,
  Heading,
  Button
} from 'native-base'
import { Video } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import * as FileSystem from 'expo-file-system'
import { cloudinary_url, cloudinary_upload_preset} from './_utils'

export default function UploadVideoModal({
  open,
  onClose,
  image,
  setImage,
  setUploadUrl
}: {
    open: boolean,
    onClose: () => void,
    image: any,
    setImage: (image: any) => void,
    setUploadUrl: (url: string) => void
}): JSX.Element {
  const video = React.useRef(null)
  const [loadingMessage, setLoadingMessage] = useState<string>('')

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      base64: true,
      videoMaxDuration:5 // 5 seconds
    })
  
    if (!result.cancelled) {
      setImage(result)
    }
  }
  
  const uploadVideo = async (image: any) => {
    // * upload first to cloudinary
    // get actual video data from device in base64
    const fsRead = await FileSystem.readAsStringAsync(image.uri, {
      encoding: 'base64'
    })
    // further encode into base64 for cloudinary upload
    const base64Video = `data:video/mp4;base64,${fsRead}`
    const data = { // prepare data to be passed to cloudinary
      'file': base64Video,
      'upload_preset': cloudinary_upload_preset
    }
    let cloudinaryFileLink = ''
    try { 
      setLoadingMessage('Uploading video...')
      const res = await axios.post(cloudinary_url, data)
      // * get link to cloudinary
      cloudinaryFileLink = res.data.url
      setLoadingMessage('')
      setUploadUrl(cloudinaryFileLink)
      onClose()
    } catch (e) {
      console.error('Cloudinary upload error: ', e)
    }
  }

  return (
    <Modal size={'full'} isOpen={open} style={styles.mainModal}>
        <Modal.Content maxWidth={"400px"}>
          <Modal.Body style={styles.modalBody}>
            <Heading allowFontScaling={false} style={styles.modalHeader}>Upload your video</Heading>
            <Heading allowFontScaling={false} size='sm' style={styles.modalSubheader}>in MP4, AVI, or MOV format.</Heading>
            <Box style={styles.notesContainer}>
              <Text allowFontScaling={false} style={styles.notes}>• Please make sure that your video does not exceed five seconds.</Text>
              <Text allowFontScaling={false} style={styles.notes}>• Your entire body should be seen from the video clip.</Text>
              <Text allowFontScaling={false} style={styles.notes}>• It is highly recommended that you follow the camera angle as shown in the sample video.</Text>
          </Box>
          <Center>
          {image && 
              <AspectRatio w='100%' ratio={16/9}>
                <Video
                  ref={video}
                  source={{uri: image.uri}}
                  useNativeControls
                  shouldPlay
                  isMuted
                  resizeMode='contain'
                  isLooping
                />
            </AspectRatio>
          }
        </Center>
          {!loadingMessage && 
            <Button.Group style={styles.buttonContainer}>
              <Button style={styles.button}
                backgroundColor={'#FF7800'}
                _text={{
                  allowFontScaling: false
                }}
                onPress={async () => {
                  if (!image) {
                    pickImage()
                    return
                  }
                  await uploadVideo(image)
                }}
              >
                {image ? 'Upload' : 'Open Gallery'}
              </Button>
              <Button
                style={styles.button}
                borderColor='#FF7800'
                borderWidth={'1'}
                backgroundColor='transparent'
                _text={{
                  color: '#FF7800',
                  allowFontScaling: false
                }}
                _pressed={{
                  backgroundColor: 'rgba(255, 120, 0, 0.2)',
                }}
                onPress={() => onClose() }
              >
                Cancel
              </Button>
            </Button.Group>
          }
          {loadingMessage && 
            <Button _text={{ allowFontScaling: false }} isLoading={true} isLoadingText={loadingMessage} />
          }
          </Modal.Body>
        </Modal.Content>
      </Modal>
  )
}

const styles = StyleSheet.create({
  mainModal: {
  },
  modalBody: {
    flex: 1,
    alignItems: 'center'
  },
  modalHeader: {
    fontSize: 30,
    fontFamily: 'Roboto',
    marginTop: 10,
    marginBottom: 5
  },
  modalSubheader: {
    fontSize: 15,
    fontFamily: 'Roboto'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  button: {
    margin: 10,
    width: 125,
    borderRadius: 25,
  },
  notesContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  notes: {
    fontFamily: 'Roboto-Light',
    fontSize: 17
  },
  mainBox: {
    height: '80%'
  }
});