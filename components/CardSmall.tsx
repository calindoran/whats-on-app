import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Theme from '../constants/Theme'
import { EventType } from '../types/DataTypes'

type Props = {
  event: EventType
  onPress?: () => void
}

export default function CardSmall(props: Props) {
  const { name, type, date, slot } = props.event
  const day = new Date(date).getDate()
  const month = new Date(date).toLocaleString('default', { month: 'short' })

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.eventType}>
            {type}, {name}
          </Text>
          <Text style={styles.time}>
            {slot}, {day} {month}
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
    backgroundColor: Theme.colorPalette.main.color_white,
    shadowColor: Theme.colorPalette.main.color_gray,
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
    color: Theme.colorPalette.main.color_gray,
  },
})
