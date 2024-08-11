import { Feather } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import 'react-native-reanimated'
import Theme from '../constants/Theme'
import CalendarScreen from '../screens/CalendarScreen'
import EventDetailScreen from '../screens/EventDetailScreen'
import HomeScreen from '../screens/HomeScreen'
import MapScreen from '../screens/MapScreen'
import NotificationScreen from '../screens/NotificationScreen'
import SearchScreen from '../screens/SearchScreen'
export { ErrorBoundary } from 'expo-router'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <Navigation />
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventDetailScreen"
        component={EventDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function MapStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventDetailScreen"
        component={EventDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const getIconName = () => {
            switch (route.name) {
              case 'Home':
                return 'home'
              case 'Search':
                return 'search'
              default:
                return 'info'
            }
          }
          const iconName = getIconName()
          return <Feather name={iconName} size={30} color={color} />
        },
        tabBarStyle: {
          ...styles.shadow,
          position: 'absolute',
          bottom: 8,
          left: 8,
          right: 8,
          borderRadius: 20,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 0,
        },
        tabBarActiveTintColor: Theme.colorPalette.main.color_primary,
        tabBarInactiveTintColor: Theme.colorPalette.main.color_gray,
        headerShown: false,
        tabBarShowLabel: false,
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen
        name="Map"
        component={MapStack}
        options={{
          tabBarButton(props) {
            return (
              <TouchableOpacity
                onPress={props.onPress}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View style={styles.tabBarButton}>
                  <Feather
                    name="map-pin"
                    size={30}
                    color={Theme.colorPalette.main.color_white}
                  />
                </View>
              </TouchableOpacity>
            )
          },
        }}
      />
      <Tab.Screen name="Search" component={SearchStack} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarButton: {
    width: 56,
    height: 56,
    borderRadius: 32,
    backgroundColor: Theme.colorPalette.main.color_primary,
    shadowColor: Theme.colorPalette.main.color_gray,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: Theme.colorPalette.main.color_gray,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
})
