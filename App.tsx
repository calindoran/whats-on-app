import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { MenuProvider } from 'react-native-popup-menu'
import Navigation from './components/Navigation'
import { useColorScheme } from './components/useColorScheme'

export default function App() {
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <MenuProvider>
          <Navigation />
        </MenuProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </NavigationContainer>
  )
}
