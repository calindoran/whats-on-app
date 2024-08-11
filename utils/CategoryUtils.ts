import { EventType } from '../types/DataTypes'

export const filterEventsByCategory = (
  category: string,
  eventList: EventType[],
) => {
  if (category === '') {
    return eventList
  } else {
    const filteredList = eventList.filter(
      (event) => event.genre.toLowerCase() === category.toLowerCase(),
    )
    return filteredList
  }
}
