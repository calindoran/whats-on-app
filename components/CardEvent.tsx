import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import Colors from '../constants/Colors'

export default function CardEvent({ event, onPressCancel, onPress }: any) {
  const { eventName, eventType, scheduledDate } = event

  const formattedDate = new Date(scheduledDate)
  const day = formattedDate.getDate()
  const month = formattedDate.toLocaleString('default', { month: 'short' })

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <View>
            <Text style={styles.dateTextDisplay}>{day}</Text>
          </View>
          <View>
            <Text style={styles.monthText}>{month}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.eventType}>
            {eventType}, {eventName}
          </Text>
          <Text style={styles.time}>{scheduledDate}</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer}>
          <Menu>
            <MenuTrigger>
              <Entypo
                name="dots-three-vertical"
                size={20}
                color={Colors.colorPalette.main.color_light_gray}
                onPress={onPress}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={onPressCancel} text="Cancel" />
            </MenuOptions>
          </Menu>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 20,
    marginHorizontal: 24,
    marginBottom: 16,
    paddingVertical: 8,
    backgroundColor: Colors.colorPalette.main.color_white,
    shadowColor: Colors.colorPalette.main.color_gray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    elevation: 6,
  },
  dateContainer: {
    backgroundColor: Colors.colorPalette.main.color_primary,
    marginHorizontal: 8,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.colorPalette.main.color_gray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    margin: 16,
    justifyContent: 'flex-start',
  },
  dateTextDisplay: {
    fontSize: 34,
    color: Colors.colorPalette.main.color_white,
  },
  monthText: {
    fontSize: 18,
    color: Colors.colorPalette.main.color_white,
  },
  eventType: {
    fontSize: 18,
    padding: 8,
  },
  time: {
    fontSize: 14,
    padding: 8,
    color: Colors.colorPalette.main.color_gray,
  },
})
