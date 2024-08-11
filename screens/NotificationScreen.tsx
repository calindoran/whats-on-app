import { NativeStackScreenProps } from '@react-navigation/native-stack'
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
import Theme from '../constants/Theme'

type RootStackParamList = { CalendarScreen: undefined }
type Props = NativeStackScreenProps<RootStackParamList>

const eventData = dummyEventList

export default function NotificationScreen(props: Props) {
  // TODO: Populate eventList with data from the API
  const [isLoading, setIsLoading] = useState(false)
  const [eventList, setEventList] = useState(eventData)

  function navToCalendar() {
    props.navigation.navigate('CalendarScreen')
  }

  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Theme.colorPalette.main.color_primary}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.appContainer}>
            <Text style={styles.headerText}>Notifications</Text>
            {eventList.length === 0 ? null : (
              <View style={styles.listContainer}>
                <View>
                  {eventList.map((event) => (
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
