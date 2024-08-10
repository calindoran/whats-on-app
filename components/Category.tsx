import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'

const windowWidth = Dimensions.get('window').width

const Category = ({ category, isSelected, onPress }: any) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected ? styles.selectedButton : null]}
      onPress={onPress}
    >
      <Feather
        name={category.icon}
        size={36}
        color={
          isSelected
            ? Colors.colorPalette.main.color_white
            : Colors.colorPalette.main.color_primary
        }
        style={styles.icon}
      />
      <Text style={[styles.text, isSelected ? styles.selectedText : null]}>
        {category.name}
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
    borderColor: Colors.colorPalette.main.color_primary,
    borderWidth: 1,
    width: windowWidth / 4,
    height: windowWidth / 4,
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: Colors.colorPalette.main.color_primary,
  },
  text: {
    color: Colors.colorPalette.main.color_primary,
    fontSize: 14,
    textAlign: 'center',
  },
  selectedText: {
    color: Colors.colorPalette.main.color_white,
  },
  icon: {
    flex: 1,
  },
})

export default Category
