import React, { useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { dummyEventList } from '../api/DummyData'
import CardSmall from '../components/CardSmall'
import Colors from '../constants/Colors'

export default function NotificationScreen({
  navigation,
}: {
  navigation: any
}) {
  // TODO: Populate eventList with data from the API
  const [isLoading, setIsLoading] = useState(false)
  const eventData = dummyEventList
  const [eventList, setEventList] = useState(eventData)

  function navToCalendar() {
    navigation.navigate('CalendarScreen')
  }

  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Colors.colorPalette.main.color_primary}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.appContainer}>
            <Text style={styles.headerText}>Notifications</Text>
            {eventList.length === 0 ? null : (
              <View style={styles.listContainer}>
                <View>
                  {eventList.slice(0, 2).map((event) => (
                    <CardSmall
                      event={event}
                      key={event.id}
                      onPress={navToCalendar}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
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
  appContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  listContainer: {
    flex: 1,
  },
  headerText: {
    marginVertical: 16,
    fontSize: 30,
  },
  loadingContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
})
