import { Entypo } from '@expo/vector-icons'
import { format } from 'date-fns'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import Theme from '../constants/Theme'
import { EventType } from '../types/DataTypes'

type Props = {
  event: EventType
  onPress?: () => void
  onPressCancel?: () => void
}

export default function CardEvent(props: Props) {
  const { name, type, date } = props.event
  const formattedDate = format(new Date(date), 'yyyy-MM-dd HH:mm')
  const day = new Date(date).getDate()
  const month = new Date(date).toLocaleString('default', { month: 'short' })

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
            {type}, {name}
          </Text>
          <Text style={styles.time}>{formattedDate}</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer}>
          <Menu>
            <MenuTrigger>
              <Entypo
                name="dots-three-vertical"
                size={20}
                color={Theme.colorPalette.main.color_light_gray}
                onPress={props.onPress}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                style={styles.menu}
                onSelect={props.onPressCancel}
                text="Cancel"
              />
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
    backgroundColor: Theme.colorPalette.main.color_white,
    shadowColor: Theme.colorPalette.main.color_gray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    elevation: 6,
  },
  dateContainer: {
    backgroundColor: Theme.colorPalette.main.color_primary,
    marginHorizontal: 8,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Theme.colorPalette.main.color_gray,
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
    color: Theme.colorPalette.main.color_white,
  },
  monthText: {
    fontSize: 18,
    color: Theme.colorPalette.main.color_white,
  },
  eventType: {
    fontSize: 18,
    padding: 8,
  },
  time: {
    fontSize: 14,
    padding: 8,
    color: Theme.colorPalette.main.color_gray,
  },
  menu: {
    backgroundColor: Theme.colorPalette.main.color_white,
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
  },
})
