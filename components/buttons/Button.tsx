import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import Theme from '../../constants/Theme'

export default function Button({ onPress, loading, text }: any) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator style={styles.activity_icon} color="white" />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 8,
    flex: 1,
    justifyContent: 'center',
    shadowColor: Theme.colorPalette.main.color_gray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    elevation: 6,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
  },
  activity_icon: {
    padding: 13,
  },
})
