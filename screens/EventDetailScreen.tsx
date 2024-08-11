import { Feather, Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Button from '../components/buttons/Button'
import Theme from '../constants/Theme'
import { EventType } from '../types/DataTypes'

type RootStackParamList = {
  EventDetailScreen?: { event?: EventType }
}

type Props = NativeStackScreenProps<RootStackParamList>

export default function EventDetailScreen(props: Props) {
  // TODO: Populate eventList with data from the API
  const [isLoading, setIsLoading] = useState(false)
  const { event } = (props.route.params as { event?: EventType }) || {}

  const navToMoreDetailScreen = (event: EventType) => {
    props.navigation.navigate('EventDetailScreen', { event })
  }

  const shareContent = async () => {
    try {
      const shareResult = await Share.share({
        message: 'Whats on? Check out this event!',
        title: 'App Sharing',
      })
      return shareResult
    } catch (error) {
      // @ts-expect-error - ignore error
      console.error(error.message)
    }
  }

  return (
    <View style={styles.outerContainer}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            color={Theme.colorPalette.main.color_primary}
            size="large"
          />
        </View>
      ) : (
        <>
          <ScrollView style={styles.container}>
            <View style={styles.shareContainer}>
              <TouchableOpacity onPress={shareContent}>
                <Feather
                  name="share"
                  size={24}
                  color={Theme.colorPalette.main.color_primary}
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
                  <Text style={styles.title}>{event?.name}</Text>
                  <Text style={styles.about}>{event?.genre}</Text>
                </View>
                <View style={styles.locationContainer}>
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color={Theme.colorPalette.main.color_primary}
                  />
                  <Text style={styles.location}>{event?.type}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              text={'More Details'}
              onPress={() => {
                event && navToMoreDetailScreen(event)
              }}
            />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1 },
  loadingContainer: {
    position: 'absolute',
    top: Theme.dimensions.height / 2,
    left: Theme.dimensions.width / 2,
  },
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
    backgroundColor: Theme.colorPalette.main.color_white,
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
    color: Theme.colorPalette.main.color_primary,
    justifyContent: 'center',
  },
})
