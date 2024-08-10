import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { CardCarousel } from '../components/CardCarousel'
import CardSmall from '../components/CardSmall'
import Category from '../components/Category'
import SearchBar from '../components/SearchBar'
import Colors from '../constants/Colors'
import { dummyCategoryList, dummyEventList } from '../api/DummyData'

export default function HomeScreen({ navigation }: { navigation: any }) {
  // TODO: Populate eventList and categoryList with data from the API
  const [isLoading, setIsLoading] = useState(false)
  const eventData = dummyEventList
  const [eventList, setEventList] = useState(eventData)
  const categoryData = dummyCategoryList
  const [categoryList, setCategoryList] = useState(categoryData)

  function goToCalendar() {
    navigation.navigate('CalendarScreen')
  }

  function goToNotifications() {
    navigation.navigate('NotificationScreen')
  }

  const handleSearch = () => {
    navigation.navigate('SearchScreen')
  }

  const handleCategorySelect = (selectedCategory: any) => {
    navigation.navigate('SearchScreen', { category: selectedCategory })
  }

  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.loading_container}>
          <ActivityIndicator
            size="large"
            color={Colors.colorPalette.main.color_primary}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Whats On?</Text>
              <Feather
                name="bell"
                size={24}
                style={styles.icon}
                onPress={goToNotifications}
              />
            </View>
            <ImageBackground
              style={styles.cardContainer}
              imageStyle={{ borderRadius: 20, overflow: 'hidden' }}
              source={require('../assets/images/background-search.png')}
            >
              <View style={styles.greetingWrapper}>
                <Text style={styles.greetingText}>Welcome</Text>
              </View>
              <Text style={styles.detailText}>Let's see what's on!</Text>
              <View style={styles.searchContainer}>
                <SearchBar placeholder={'Search'} onSearch={handleSearch} />
              </View>
            </ImageBackground>
          </View>
          <View style={styles.appContainer}>
            <Text style={styles.text}>For You</Text>
            <View>
              <CardCarousel
                list={categoryList}
                onSelect={handleCategorySelect}
              />
            </View>

            {eventList.length === 0 ? null : (
              <View>
                <Text style={styles.text}>Upcoming Events</Text>
                <View style={styles.listContainer}>
                  {eventList.slice(0, 2).map((event) => (
                    <CardSmall
                      event={event}
                      key={event.id}
                      onPress={goToCalendar}
                    />
                  ))}
                </View>
              </View>
            )}
            <Text style={styles.text}>All Events</Text>
            <View style={styles.categoryContainer}>
              {categoryList?.map((category) => (
                <Category
                  category={category}
                  key={category.id}
                  onPress={() => handleCategorySelect(category)}
                />
              ))}
            </View>
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
    marginBottom: 120,
  },
  topContainer: {
    paddingHorizontal: 24,
  },
  cardContainer: {
    marginVertical: 16,
    padding: 16,
  },
  headerContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingWrapper: {
    marginTop: 8,
    marginBottom: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    paddingBottom: 8,
  },
  appContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  listContainer: {
    flex: 1,
    marginVertical: 8,
  },
  categoryContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerText: {
    fontSize: 34,
    color: Colors.colorPalette.main.color_primary,
    flex: 1,
  },
  greetingText: {
    paddingHorizontal: 8,
    fontSize: 24,
    color: Colors.colorPalette.main.color_white,
  },
  text: {
    flex: 1,
    fontSize: 18,
  },
  detailText: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    color: Colors.colorPalette.main.color_white,
  },
  icon: {
    color: Colors.colorPalette.main.color_primary,
  },
  loading_container: {
    alignContent: 'center',
    justifyContent: 'center',
  },
})
