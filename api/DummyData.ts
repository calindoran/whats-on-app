import { CategoryType, EventType } from '../types/DataTypes'

export const dummyEventList: EventType[] = [
  {
    name: 'Event Name',
    type: 'Event Type',
    genre: 'Jazz',
    date: new Date(),
    slot: 'Time Slot',
    id: 0,
  },
  {
    name: 'Another Event',
    type: 'Another Type',
    genre: 'Rock',
    date: new Date(),
    slot: 'Another Time Slot',
    id: 1,
  },
  {
    name: 'Yet Another Event',
    type: 'Yet Another Type',
    genre: 'Pop',
    date: new Date(),
    slot: 'Yet Another Time Slot',
    id: 2,
  },
]

export const dummyCategoryList: CategoryType[] = [
  {
    name: 'Disco',
    icon: 'disc',
    image: require('../assets/images/disco.jpg'),
    count: 10,
    id: 0,
  },
  {
    name: 'Jazz',
    icon: 'music',
    image: require('../assets/images/jazz.jpg'),
    count: 5,
    id: 1,
  },
  {
    name: 'Pop',
    icon: 'headphones',
    image: require('../assets/images/pop.jpg'),
    count: 8,
    id: 2,
  },
  {
    name: 'Rock',
    icon: 'speaker',
    image: require('../assets/images/rock.jpg'),
    count: 8,
    id: 3,
  },
]
