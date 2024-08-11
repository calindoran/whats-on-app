import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { dummyCategoryList, dummyEventList } from '../api/DummyData'
import Category from '../components/Category'
import SearchBar from '../components/SearchBar'
import Theme from '../constants/Theme'
import { EventType } from '../types/DataTypes'
import { filterEventsByCategory } from '../utils/CategoryUtils'

type RootStackParamList = {
  EventDetailScreen?: { item?: EventType }
}

type Props = NativeStackScreenProps<RootStackParamList>

const eventData = dummyEventList
const categoryData = dummyCategoryList

export default function SearchScreen(props: Props) {
  // TODO: Populate eventList and categoryList with data from the API
  const [isLoading, setIsLoading] = useState(false)
  const [eventList, setEventList] = useState(eventData)
  const [filteredEventList, setFilteredEventList] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleCategoryFilter = (category: any) => {
    if (selectedCategory === category) {
      setSelectedCategory('')
      setFilteredEventList(eventList)
    } else {
      const filteredList = filterEventsByCategory(category, eventList)
      setSelectedCategory(category)
      setFilteredEventList(filteredList)
    }
  }

  const renderCategory = ({ item }: any) => (
    <Category
      category={item}
      isSelected={selectedCategory === item.name}
      onPress={() => handleCategoryFilter(item.name)}
      key={item.name}
    />
  )

  const handleEventSelect = (item: any) => {
    props.navigation.navigate('EventDetailScreen', { item })
  }

  const handleSearch = (text: string) => {
    const searchedText = text.toLowerCase()
    const filteredList = eventList.filter((event) => {
      return event.genre.toLowerCase().includes(searchedText)
    })
    setFilteredEventList(filteredList)
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Theme.colorPalette.main.color_primary}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <SearchBar onSearch={handleSearch} placeholder={'Search'} />
          </View>
          <View style={styles.categoryContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={Theme.dimensions.width + 24}
              decelerationRate={'fast'}
              data={categoryData}
              keyExtractor={(category) => category.name}
              renderItem={renderCategory}
            />
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    marginTop: 56,
    marginBottom: 12,
    marginHorizontal: 24,
  },
  categoryContainer: {
    marginHorizontal: 24,
  },
  listContainer: {
    marginBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
})
