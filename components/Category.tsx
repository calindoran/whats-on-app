import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Theme from '../constants/Theme'
import { CategoryType } from '../types/DataTypes'

type Props = {
  category: CategoryType
  isSelected?: boolean
  onPress?: () => void
}

const windowWidth = Dimensions.get('window').width

const Category = (props: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.isSelected ? styles.selectedButton : null]}
      onPress={props.onPress}
    >
      <Feather
        name={props.category.icon as typeof Feather.defaultProps.name}
        size={36}
        color={
          props.isSelected
            ? Theme.colorPalette.main.color_white
            : Theme.colorPalette.main.color_primary
        }
        style={styles.icon}
      />
      <Text
        style={[styles.text, props.isSelected ? styles.selectedText : null]}
      >
        {props.category.name}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 10,
    borderColor: Theme.colorPalette.main.color_primary,
    borderWidth: 1,
    width: windowWidth / 4,
    height: windowWidth / 4,
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: Theme.colorPalette.main.color_primary,
  },
  text: {
    color: Theme.colorPalette.main.color_primary,
    fontSize: 14,
    textAlign: 'center',
  },
  selectedText: {
    color: Theme.colorPalette.main.color_white,
  },
  icon: {
    flex: 1,
  },
})

export default Category
