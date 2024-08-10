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
import Colors from '../constants/Colors'
import {
  configureNotifications,
  handleNotification,
} from '../utils/NotificationUtils'

export default function CalendarScreen() {
  const [isLoading, setIsLoading] = useState(true)

  // TODO: Populate eventList with data from the API
  const eventData = dummyEventList
  const [eventList, setEventList] = useState(eventData)

  useEffect(() => {
    configureNotifications()
  }, [])

  function removeEvent(event: {
    eventName?: string
    eventType?: string
    scheduledDate?: Date
    timeSlot?: string
    id: any
    appType?: any
  }) {
    const updatedEventList = eventList.filter((item) => item.id !== event.id)
    setEventList(updatedEventList)
  }

  const handleCancel = (event: {
    eventName: string
    eventType: string
    scheduledDate: Date
    timeSlot: string
    id: number
  }) => {
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
        <ActivityIndicator
          style={styles.loadingContainer}
          color={Colors.colorPalette.main.color_primary}
          size="large"
        />
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
    top: Colors.dimensions.height / 2,
    left: Colors.dimensions.width / 2,
  },
})
