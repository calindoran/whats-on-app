import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Navigation from './components/Navigation'

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}
