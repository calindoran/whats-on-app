import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Navigation from './components/Navigation'
import { MenuProvider } from 'react-native-popup-menu'

export default function App() {
  return (
    <NavigationContainer>
      <MenuProvider>
        <Navigation />
      </MenuProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}
