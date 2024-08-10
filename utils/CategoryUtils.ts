export const filterEventsByCategory = (category: string, eventList: any[]) => {
  if (category === '') {
    return eventList
  } else {
    const filteredList = eventList.filter(
      (event) => event.music_genre.toLowerCase() === category.toLowerCase(),
    )
    return filteredList
  }
}
