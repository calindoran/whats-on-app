import React, { useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { dummyCategoryList, dummyEventList } from '../api/DummyData'
import Category from '../components/Category'
import SearchBar from '../components/SearchBar'
import Colors from '../constants/Colors'
import { filterEventsByCategory } from '../utils/CategoryUtils'

export default function SearchScreen({ navigation, route }: any) {
  const [isLoading, setIsLoading] = useState(false)

  // TODO: Populate eventList and categoryList with data from the API
  const eventData = dummyEventList
  const [eventList, setEventList] = useState(eventData)

  const categoryData = dummyCategoryList

  const [filteredEventList, setFilteredEventList] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const category = route.params?.category

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
    navigation.navigate('EventDetailScreen', { item })
  }

  const handleSearch = (text: string) => {
    const searchedText = text.toLowerCase()

    const filteredList = eventList.filter((event) => {
      const isMusicGenreMatch = event.music_genre
        .toLowerCase()
        .includes(searchedText)

      return isMusicGenreMatch
    })

    setFilteredEventList(filteredList)
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Colors.colorPalette.main.color_primary}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <SearchBar onSearch={handleSearch} placeholder_text={'Search'} />
          </View>
          <View style={styles.categoryContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={Colors.dimensions.width + 24}
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
