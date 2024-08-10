import { Feather, Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Button from '../components/buttons/Button'
import Colors from '../constants/Colors'

export default function EventDetailScreen({ route, navigation }: any) {
  const { item } = route.params

  const shareContent = async () => {
    try {
      const result = await Share.share({
        message: 'Take a look at this...',
        title: 'App Sharing',
      })
    } catch (error) {
      // @ts-expect-error - ignore error
      console.error(error.message)
    }
  }

  const navToMoreDetailScreen = (item: {
    eventName: string
    eventType: string
    music_genre: string
    scheduledDate: Date
    timeSlot: string
    id: number
  }) => {
    navigation.navigate('EventMoreDetailScreen', { item })
  }

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.shareContainer}>
          <TouchableOpacity onPress={shareContent}>
            <Feather
              name="share"
              size={24}
              color={Colors.colorPalette.main.color_primary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.headerContainer}>
          <Image
            style={styles.imageContainer}
            source={require('../assets/images/user-profile.png')}
          />
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.eventName}</Text>
              <Text style={styles.about}>{item.music_genre}</Text>
            </View>
            <View style={styles.locationContainer}>
              <Ionicons
                name="location-outline"
                size={18}
                color={Colors.colorPalette.main.color_primary}
              />
              <Text style={styles.location}>{item.eventType}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          text={'More Details'}
          onPress={() => navToMoreDetailScreen(item)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  shareContainer: {
    flex: 1,
    marginTop: 48,
    marginHorizontal: 4,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.colorPalette.main.color_white,
    marginVertical: 12,
    padding: 16,
    borderRadius: 20,
  },
  imageContainer: {
    marginRight: 16,
    borderRadius: 50,
    overflow: 'hidden',
    width: 100,
    height: 100,
  },
  titleContainer: {
    flex: 1,
  },
  locationContainer: { flexDirection: 'row', paddingVertical: 8 },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 126,
    marginHorizontal: 24,
  },
  title: {
    fontSize: 24,
  },
  about: {
    fontSize: 20,
  },
  location: {
    fontSize: 16,
    flex: 1,
    color: Colors.colorPalette.main.color_primary,
    justifyContent: 'center',
  },
})
