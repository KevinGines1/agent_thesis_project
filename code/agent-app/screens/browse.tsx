import React from 'react'
import { StyleSheet, FlatList, ScrollView} from 'react-native'
import ExerciseCard from '../components/ExerciseCard'
import {
  Heading
} from 'native-base'

const exercises = [
  {
    exerciseName: 'Squats',
    exerciseSampleVideo: require('../assets/video_samples/squat_1.mp4'),
    exerciseSampleVideoThumbnail: require('../assets/images/squat_poster_2.jpg'), // TODO: upload this na lang sa cloudinary?
    exerciseSubtitle: 'Legs • No Equipment',
    exerciseInstructions: [
      'Keep your feet at shoulder width apart and pointed straight ahead.',
      'When squatting, your hips will move down and back. Your lumbar curve should be maintained, and your heels should stay flat on the floor the entire time.',
      'In squats, your hips will descend lower than your knees.'
    ]
  },
  {
    exerciseName: 'Push-ups (Coming Soon)',
    exerciseSampleVideo: require('../assets/video_samples/squat_2.mp4'),
    exerciseSampleVideoThumbnail: require('../assets/images/push_up_poster.jpg'),
    exerciseSubtitle: 'Chest • No Equipment',
    exerciseInstructions: [
      'The training model for this exercise has not yet been developed.'
    ]
  }
]

export default function BrowseScreen({ navigation }:{navigation: any}): JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <Heading allowFontScaling={false} size={'xl'} style={styles.heading}>Workouts</Heading>
      <FlatList
        horizontal
        data={exercises}
        renderItem={({item}) => {
          return <ExerciseCard exercise={item} navigation={navigation} />
        }}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
      <Heading allowFontScaling={false} size={'xl'} style={styles.heading}>Favorites</Heading>
      <FlatList
        horizontal
        data={[]}
        renderItem={({item}) => {
          return <ExerciseCard exercise={item} navigation={navigation} />
        }}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <Heading size={'sm'} margin='15px' fontFamily="Montserrat">
            Feature coming soon!
          </Heading>
        }
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    width:'100%'
  },
  heading: {
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    marginTop: 10,
    marginLeft: 10,
  },
});