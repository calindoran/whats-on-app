import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors'

export default function CardSmall({ event, onPress }: any) {
  const { eventName, eventType, scheduledDate, timeSlot } = event

  const formattedDate = new Date(scheduledDate)
  const day = formattedDate.getDate()
  const month = formattedDate.toLocaleString('default', { month: 'short' })

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.eventType}>
            {eventType}, {eventName}
          </Text>
          <Text style={styles.time}>
            {timeSlot}, {day} {month}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: 24,
    marginVertical: 8,
    paddingVertical: 8,
    backgroundColor: Colors.colorPalette.main.color_white,
    shadowColor: Colors.colorPalette.main.color_gray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  eventType: {
    fontSize: 14,
    padding: 4,
  },
  time: {
    fontSize: 14,
    padding: 4,
    color: Colors.colorPalette.main.color_gray,
  },
})
