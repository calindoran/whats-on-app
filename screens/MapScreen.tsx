import { Feather } from '@expo/vector-icons'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import MapView, { Callout, Circle, Marker } from 'react-native-maps'
import { dummyEventList } from '../api/DummyData'
import Colors from '../constants/Colors'

export default function MapScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false)

  // TODO: Populate eventList and categoryList with data from the API
  const eventData = dummyEventList
  const [eventList, setEventList] = useState(eventData)

  const [initialLocation, setInitialLocation] = useState<{
    latitude: number
    longitude: number
    altitude: number | null
    accuracy: number | null
    altitudeAccuracy: number | null
    heading: number | null
    speed: number | null
  } | null>(null)

  useEffect(() => {
    async function getLocationAsync() {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        return
      }

      let location = await Location.getCurrentPositionAsync()
      setInitialLocation({
        ...location.coords,
      })
    }

    getLocationAsync()
  }, [])

  const handleEventSelect = (item: {
    eventName: string
    eventType: string
    music_genre: string
    scheduledDate: Date
    timeSlot: string
    id: number
  }) => {
    navigation.navigate('EventDetailScreen', { item })
  }

  return (
    <View style={styles.container}>
      {initialLocation && !isLoading ? (
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            ...initialLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingIndicatorColor={Colors.colorPalette.main.color_primary}
          userLocationUpdateInterval={1000}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Circle
            center={{
              ...initialLocation,
            }}
            radius={2000}
            strokeWidth={2}
            strokeColor="rgba(0, 0, 255, 0.5)"
            fillColor="rgba(0, 0, 255, 0.2)"
          />
          {eventList.map((event) => (
            <Marker
              key={event.id}
              coordinate={{ ...initialLocation }}
              title={event.eventName}
            >
              <Callout style={styles.calloutContainer}>
                <TouchableOpacity onPress={() => handleEventSelect(event)}>
                  <View style={styles.calloutButton}>
                    <Text style={styles.calloutTitle}>{event.eventName}</Text>
                    <Text style={styles.calloutText}>{event.music_genre}</Text>
                  </View>
                </TouchableOpacity>
              </Callout>
            </Marker>
          ))}
        </MapView>
      ) : (
        <ActivityIndicator
          style={styles.loadingContainer}
          size="large"
          color={Colors.colorPalette.main.color_primary}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  calloutContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.colorPalette.main.color_white,
    paddingLeft: 8,
  },
  calloutTitle: {
    paddingBottom: 12,
    fontSize: 18,
  },
  calloutText: {
    fontSize: 13,
  },
  calloutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  loadingContainer: {
    position: 'absolute',
    top: Colors.dimensions.height / 2,
    left: Colors.dimensions.width / 2,
  },
})
