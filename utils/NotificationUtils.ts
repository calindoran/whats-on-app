import {
  scheduleNotificationAsync,
  setNotificationHandler,
} from 'expo-notifications'

export function configureNotifications() {
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })
}

export const handleNotification = (titleContent: any, bodyContent: any) => {
  const notificationContent = {
    title: titleContent,
    body: bodyContent,
  }
  scheduleNotificationAsync({
    content: notificationContent,
    trigger: {
      seconds: 5,
    },
  })
}
