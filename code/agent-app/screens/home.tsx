import React, { useState } from 'react'
import { StyleSheet, View, Text, ImageBackground, Platform } from 'react-native'
import { Video } from 'expo-av'
import { Button } from 'native-base'

const videoBackgroundSource = require('../assets/videos/burpees.mp4')
const imageBackgroundSource = require('../assets/images/burpees.gif')

export default function HomeScreen({ navigation }: { navigation: any }): JSX.Element {
  const video = React.useRef(null)
  const [status, setStatus] = useState(null)
  const deviceOS = Platform.OS
  if ((deviceOS === 'ios' || deviceOS === 'android') && status !== null) { // if video is successfuly loaded display it as background
    return (
        <View style={styles.container}>
          <Video
            ref={video}
            source={videoBackgroundSource}
            style={styles.videoBackground}
            shouldPlay
            isMuted
            resizeMode={Video.RESIZE_MODE_COVER}
            isLooping
            rate={0.70}
            onPlaybackStatusUpdate={(status: any) => setStatus(status)}
          />
            <View style={styles.appTitleContainer}>
              <Text allowFontScaling={false} style={styles.header}>AGENT</Text>
              <Text allowFontScaling={false} style={styles.subheader}>Automated Guidance for Exercise and Therapy</Text>
              <Button
                style={styles.buttonContainer}
                onPress={() => { navigation.navigate('Browse') }}
                variant={'subtle'}
                size={'xl'}
                _text={{fontSize: '2xl', fontFamily: 'Roboto', color:'rgba(255, 255, 255, 1)', allowFontScaling: false}}
              >
                Browse Exercises
              </Button>
            </View>
        </View>
    )
  }

  return ( // otherwise, display an image
      <ImageBackground
        source={imageBackgroundSource}
        resizeMode={'stretch'}
        style={styles.imageBackground}
      >
        <View style={styles.appTitleContainer}>
          <Text allowFontScaling={false} style={styles.header}>AGENT</Text>
          <Text allowFontScaling={false} style={styles.subheader}>Automated Guidance for Exercise and Therapy</Text>
          <Button
            style={styles.buttonContainer}
            onPress={() => { navigation.navigate('Browse') }}
            variant={'subtle'}
            size={'xl'}
          _text={{ fontSize: '2xl', fontFamily: 'Roboto', color: 'rgba(255, 255, 255, 1)', allowFontScaling: false }}
          >
            Browse Exercises
          </Button>
        </View>
      </ImageBackground>
    )

}

const styles = StyleSheet.create({
  videoBackground: {
    position: 'absolute',
    alignItems: 'stretch',
    top: 0,
    left: 0,
    bottom: 0, 
    right: 0
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  appTitleContainer: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height:'20%'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 95,
    color: '#F7F7F7',
    fontFamily: 'Montserrat'
  },
  subheader: {
    fontSize: 25,
    fontWeight:'bold',
    textAlign: 'center',
    color: '#F7F7F7',
    fontFamily: 'Roboto',
    marginLeft: 7,
    marginRight: 7,
  },
  buttonContainer: {
    margin: 25,
    marginTop: 50,
    borderRadius: 50,
    height: 60,
    width: 225,
    backgroundColor: '#D4B499'
  }
});