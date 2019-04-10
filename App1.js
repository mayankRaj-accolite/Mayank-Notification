import { Platform } from 'react-native';
import FCM, { FCMEvent } from "react-native-fcm";

export function saveTokenDevice() {
  FCM.requestPermissions({ badge: true, sound: true, alert: true });

  FCM.getFCMToken().then(token => {
    storage.save({
      key: 'device',
      data: {
        type: Platform.OS,
        token: token
      }
    });
  });
};

function showLocalNotification(title, body) {
  FCM.presentLocalNotification({
    id: 0,
    icon: "ic_launcher", // as FCM payload, you can relace this with custom icon you put in mipmap
    title: title,
    body: body, // as FCM payload (required)
    priority: "high",
    ongoing: false,
    wake_screen: true,
    show_in_foreground: true // notification when app is in foreground (local & remote)
  });
};


export function registerAppListener() {
    FCM.on(FCMEvent.Notification, async (notif) => {
      FCM.getBadgeNumber().then(number => {
        showLocalNotification(notif.title, notif.body);
        FCM.setBadgeNumber(number + 1);
      });
    });
  };