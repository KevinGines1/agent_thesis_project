import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, ImageURISource} from 'react-native'
import { Box, Text, Skeleton, Stack, Divider, Image } from 'native-base'


export interface ExerciseCardProps { 
  exerciseName: string
  exerciseSampleVideo: string
  exerciseSubtitle: string
  exerciseSampleVideoThumbnail: string
  exerciseInstructions: string[]
}

export default function ExerciseCard({ exercise, navigation }: { exercise: ExerciseCardProps, navigation?: any }): JSX.Element {
  const [loading, setLoading] = useState(true)

  return (
    <Box alignSelf={'center'} alignItems={'center'} style={styles.card}>
      <Stack space={1}>
        <TouchableOpacity
          style={styles.touchableCard}
          onPress={() => {
            navigation.navigate('Exercise', exercise)
        }}>
          <Image
            source={exercise.exerciseSampleVideoThumbnail as ImageURISource }
            alt={`${exercise.exerciseName} image`}
            size={'2xl'}
            style={styles.thumbnail}
            resizeMode={'cover'}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
          {!loading && 
            <>
              <Text allowFontScaling={false} style={styles.cardTitle}>{ exercise.exerciseName }</Text>
              <Text allowFontScaling={false} style={styles.cardSubTitle}>{  exercise.exerciseSubtitle }</Text>
            </>
          }
          {loading && 
            <>
              <Skeleton.Text startColor={'#D4B499'}/>
            </>
          }
        </TouchableOpacity>
        <Divider />
      </Stack>
    </Box>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#F7F7F7',
    marginTop: 10,
    marginLeft: 10,
    height: 350,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnail: {
    borderRadius: 25
  },
  container: {
    width: '100%',
    flex: 1,
    alignItems:'center'
  },
  video: {
    alignSelf: 'center',
  },
  touchableCard: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageHolder: {
    width: '100%',
    height: '80%',
    borderWidth: 1
  },
  cardTitle: {
    fontSize: 25,
    textAlignVertical:'center',
    padding: 15,
    fontFamily: 'Roboto-Medium',
  },
  cardSubTitle: {
    fontSize: 20,
    textAlignVertical: 'center',
    fontFamily: 'Roboto'
  }
});
