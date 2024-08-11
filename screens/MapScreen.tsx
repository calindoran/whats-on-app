import { NativeStackScreenProps } from '@react-navigation/native-stack'
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
import Theme from '../constants/Theme'
import { EventType, LocationType } from '../types/DataTypes'

type RootStackParamList = { EventDetailScreen: { event: EventType } }
type Props = NativeStackScreenProps<RootStackParamList>

const eventData = dummyEventList

export default function MapScreen(props: Props) {
  // TODO: Populate eventList and categoryList with data from the API
  const [isLoading, setIsLoading] = useState(false)
  const [eventList, setEventList] = useState(eventData)
  const [initialLocation, setInitialLocation] = useState<LocationType>(null)

  useEffect(() => {
    async function getLocationAsync() {
      try {
        setIsLoading(true)
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          return
        }
        let location = await Location.getCurrentPositionAsync()
        setInitialLocation({
          ...location.coords,
        })
      } catch (error) {
        console.error('Error getting location:', error)
      } finally {
        setIsLoading(false)
      }
    }
    getLocationAsync()
  }, [])

  const handleEventSelect = (event: EventType) => {
    props.navigation.navigate('EventDetailScreen', { event })
  }

  return (
    <View style={styles.container}>
      {isLoading ?? !initialLocation ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Theme.colorPalette.main.color_primary}
          />
        </View>
      ) : (
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            ...initialLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingIndicatorColor={Theme.colorPalette.main.color_primary}
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
              title={event.name}
              coordinate={{ ...initialLocation }}
            >
              <Callout style={styles.calloutContainer}>
                <TouchableOpacity onPress={() => handleEventSelect(event)}>
                  <View style={styles.calloutButton}>
                    <Text style={styles.calloutTitle}>{event.name}</Text>
                    <Text style={styles.calloutText}>{event.genre}</Text>
                  </View>
                </TouchableOpacity>
              </Callout>
            </Marker>
          ))}
        </MapView>
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
    backgroundColor: Theme.colorPalette.main.color_white,
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
  },
  calloutTitle: {
    paddingBottom: 12,
    fontSize: 18,
  },
  calloutText: {
    fontSize: 14,
  },
  calloutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  loadingContainer: {
    position: 'absolute',
    top: Theme.dimensions.height / 2,
    left: Theme.dimensions.width / 2,
  },
})
