import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import {
  AspectRatio,
  CheckIcon,
  ChevronRightIcon,
  HStack,
  Box,
  Button,
  Text,
  Icon
} from 'native-base'
import { Video } from 'expo-av'

const isIos = Platform.OS === 'ios'
export default function ResultsScreen({ route: { params }, navigation}: {route: {params: any}, navigation: any}): JSX.Element {
  const { image, prediction, exercise } = params
  const video = React.useRef(null)

  const instructions = exercise?.exerciseInstructions
  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <AspectRatio w='100%' ratio={16/9}>
          <Video
            ref={video}
            source={image}
            useNativeControls
            shouldPlay
            resizeMode='contain'
            isLooping
            isMuted
          />
        </AspectRatio>
      </View>
      {prediction === 'CORRECT' && 
        <Button
          style={styles.feedbackChipCorrect}
          leftIcon={<Icon as={MaterialIcons} name="check-circle" size="sm" />}
          size="32"
          _text={{
            fontSize: 23,
            color: 'white',
            allowFontScaling: false
          }}
        >
          Excellent!
        </Button>
      }
      {prediction === 'WRONG' && 
        <Button
          style={styles.feedbackChipWrong}
          leftIcon={<Icon as={MaterialIcons} name="error" size="sm" />}
          size="32"
          _text={{
            fontSize: isIos ? 20 : null,
            color: 'white',
            allowFontScaling: false
          }}
        >
          Needs Improvement!
        </Button>
      }
      <Box style={styles.list}>
      {instructions.map((text: string, index: number) => {
        return (
          <HStack space={2} key={index} style={{flex: 0, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
            {prediction === 'CORRECT' ? <CheckIcon size="5" mt="0.5" color="#D4B499" /> : <ChevronRightIcon size="7" mt="0.5" color="#FF7800" />}
            <Text allowFontScaling={false} style={styles.instructions}>{text}</Text>
          </HStack>
        )
      })}
      </Box>
      <Button.Group>
        <Button
          backgroundColor={'#FF7800'}
          onPress={() => { navigation.goBack() }}
          _text={{ allowFontScaling: false }}
        >
          Go back to Exercise
        </Button>
        <Button
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
          onPress={() => { navigation.navigate('Browse')}}
        >
          Browse Exercises
        </Button>
      </Button.Group>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  list: {
    fontFamily: 'Roboto-Light',
    alignContent: 'center',
    width: '90%'
  },
  instructions: {
    fontFamily: 'Montserrat',
    flex: 1,
    flexWrap: 'wrap',
    margin: 5,
    fontSize: 20,
  },
  videoContainer: {
    width: '90%'
  },
  feedbackChipCorrect: {
    backgroundColor: '#32CD32',
    padding: 20,
    borderRadius: 10,
    width: '40%',
    height: '10%'
  },
  feedbackChipWrong: {
    backgroundColor: '#FF7800',
    padding: 20,
    borderRadius: 10,
    width: '60%',
    height: '10%'
  }
});