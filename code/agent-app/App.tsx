import React, { useState } from 'react'
import HomeScreen from './screens/home'
import BrowseScreen from './screens/browse'
import ResultsScreen from './screens/results'
import ExerciseScreen from './screens/exercise'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider } from 'native-base'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { MaterialIcons } from '@expo/vector-icons'
import { IconButton, Icon } from 'native-base'

const Stack = createNativeStackNavigator()

const useFonts = async () => {
  await Font.loadAsync({
    'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
  })
}

export default function App(): JSX.Element {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={useFonts}
        onFinish={() => setIsReady(true)}
        onError={(e) => console.log('Error on font load: ', e)}
      />

    )
  }
  
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='AGENT'
            component={HomeScreen}
            options={{
              headerShown: false
            }} />
          <Stack.Group
            screenOptions={{
              headerStyle: {
                backgroundColor: '#D4B499'
              },
              headerTitleStyle: {
                fontFamily: 'Montserrat',
                fontSize: 25
              }}}
          >
            <Stack.Screen
              name='Browse'
              component={BrowseScreen}
              options={{
                title: 'Exercises',
                headerBackVisible: false
            }}/>
            <Stack.Screen
              name='Exercise'
              component={ExerciseScreen}
              options={({navigation}) => ({
                headerBackButtonMenuEnabled: false,
                headerBackTitleStyle: {
                  fontFamily: 'Montserrat'
                },
                headerLeft: () => (
                  <IconButton
                    icon={<Icon as={MaterialIcons} name='arrow-back' />}
                    borderRadius='full'
                    _icon={{
                      size: 'sm',
                      color: '#fff'
                    }}
                    onPress={() => navigation.goBack()}
                  />
                )
              })}
            />
            <Stack.Screen
              name='Results'
              component={ResultsScreen}
              options={{
                headerBackVisible: false
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
