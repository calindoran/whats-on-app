import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { dummyEventList } from '../api/DummyData'
import CardEvent from '../components/CardEvent'
import Theme from '../constants/Theme'
import { EventType } from '../types/DataTypes'
import { configureNotifications } from '../utils/NotificationUtils'

type RootStackParamList = {
  CalendarScreen: undefined
}

type Props = NativeStackScreenProps<RootStackParamList>

const eventData = dummyEventList

export default function CalendarScreen(props: Props) {
  // TODO: Populate eventList with data from the API
  const [isLoading, setIsLoading] = useState(false)
  const [eventList, setEventList] = useState(eventData)

  useEffect(() => {
    configureNotifications()
  }, [])

  function removeEvent(event: EventType) {
    const updatedEventList = eventList.filter((item) => item.id !== event.id)
    setEventList(updatedEventList)
  }

  const handleCancel = (event: EventType) => {
    Alert.alert('Event cancellation', 'Cancel your event?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => {
          removeEvent(event)
        },
      },
    ])
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Events</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            color={Theme.colorPalette.main.color_primary}
            size="large"
          />
        </View>
      ) : (
        <View style={styles.listContainer}>
          {eventList.length === 0 ? (
            <Text style={styles.emptyViewText}>No Events</Text>
          ) : (
            <View>
              {eventList.map((event) => (
                <CardEvent
                  event={event}
                  key={event.id}
                  onPressCancel={() => handleCancel(event)}
                />
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
  },
  header: {
    marginHorizontal: 24,
    marginVertical: 16,
    fontSize: 30,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyViewText: {
    fontSize: 24,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  loadingContainer: {
    position: 'absolute',
    top: Theme.dimensions.height / 2,
    left: Theme.dimensions.width / 2,
  },
})
