import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Theme from '../constants/Theme'

type Props = {
  placeholder: string
  onSearch: (text: string) => void
}

export default function SearchBar(props: Props) {
  const [isSearchFocused, setSearchFocused] = useState(false)

  const handleSearchFocus = () => {
    setSearchFocused(true)
    props.onSearch('')
  }

  const handleSearchBlur = () => {
    setSearchFocused(false)
  }

  return (
    <TouchableOpacity style={styles.container}>
      <Feather
        name="search"
        size={20}
        color={Theme.colorPalette.main.color_light_gray}
        style={styles.icon}
      />
      <TextInput
        style={styles.textInput}
        placeholder={props.placeholder}
        onChangeText={props.onSearch}
        onBlur={handleSearchBlur}
        onFocus={handleSearchFocus}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colorPalette.main.color_white,
    padding: 12,
    borderRadius: 20,
    flexDirection: 'row',
    shadowColor: Theme.colorPalette.main.color_gray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    elevation: 6,
  },
  textInput: {
    flex: 1,
  },
  icon: { paddingEnd: 8 },
})
