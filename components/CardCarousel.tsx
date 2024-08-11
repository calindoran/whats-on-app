import React from 'react'
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Theme from '../constants/Theme'

const CARD_WIDTH = Theme.dimensions.width - 100
const CARD_HEIGHT = 180

type Props = {
  list: any[]
  onSelect: (item: any) => void
}

export const CardCarousel = (props: Props) => {
  const animatedValue = new Animated.Value(0)

  animatedValue.addListener(() => {
    return
  })

  return (
    <FlatList
      data={props.list}
      horizontal
      snapToInterval={CARD_WIDTH + 24}
      decelerationRate={'fast'}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={3}
      keyExtractor={(item) => item.name}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: index === 0 ? 0 : 24,
              marginRight: index === props.list.length - 1 ? 24 : 0,
              marginVertical: 16,
            }}
            onPress={() => props.onSelect(item)}
          >
            <View style={styles.card}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => props.onSelect(item)}
                >
                  <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.imageCategory} />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.category}>{item.name}</Text>
                <View style={styles.detailContainer}>
                  <Text style={styles.detail}>
                    {`${item.count} ${'Events'}`}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexDirection: 'row',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: Theme.colorPalette.main.color_white,
    shadowColor: Theme.colorPalette.main.color_gray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    alignSelf: 'flex-end',
  },
  imageContainer: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'flex-end',
    paddingVertical: 24,
  },
  imageCategory: {
    flex: 1,
    resizeMode: 'contain',
  },
  titleContainer: {
    left: 24,
    top: 16,
    position: 'absolute',
  },
  category: {
    fontSize: 20,
    color: Theme.colorPalette.main.color_primary,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  detail: {
    fontSize: 14,
    color: Theme.colorPalette.main.color_primary,
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    bottom: 0,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: Theme.colorPalette.main.color_primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 16,
    color: Theme.colorPalette.main.color_white,
  },
})
