import { CategoryType, EventType } from '../types/DataTypes'

export const dummyEventList: EventType[] = [
  {
    name: 'Event Name',
    type: 'Event Type',
    genre: 'Music Genre',
    date: new Date(),
    slot: 'Time Slot',
    id: 0,
  },
]

export const dummyCategoryList: CategoryType[] = [
  {
    name: 'Event Type',
    icon: 'settings',
    image: require('../assets/images/user-profile.png'),
    count: 10,
    id: 0,
  },
]
