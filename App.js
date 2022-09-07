import React, {useEffect} from 'react';

import {StyleSheet, Text, View, Alert, Button} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {TriggerType} from '@notifee/react-native';
const App = () => {
  useEffect(() => {
    messaging().registerDeviceForRemoteMessages();
    const unsubscribe = messaging().onMessage(message => {
      console.log('A message come', message);
      Alert.alert(message.notification.title, message.notification.body);
    });
    messaging()
      .subscribeToTopic('weather')
      .then(message => {
        console.log('weather topic');
      });
    /* messaging()
      .getToken()
      .then(token => {
        console.log('token', token);
      });
      */
    return () => {
      unsubscribe();
    };
  }, []);

  const handleCreateNoti = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'My updated test message',
      body: 'my updated body',
      android: {
        channelId: channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const handleCreateScheduleNoti = () => {
    const date = new Date(Date.now());
    date.setMinutes(10);
    const ts = date.setSeconds(0);
    notifee.createTriggerNotification(
      {
        title: 'Schedule noti',
        body: 'Schedule noti bd',
        android: {
          channelId: 'default',
        },
      },

      {
        type: TriggerType.TIMESTAMP,
        timestamp: ts,
      },
    );
  };
  const handleCreateStyling =()=>{}

  return (
    <View>
      <Text>Heelo</Text>
      <Button title="Create notification" onPress={handleCreateNoti}></Button>
      <Button
        title="Create Schedule Notification"
        onPress={handleCreateScheduleNoti}
      />
      <Button title='Create Style Notification' onPress={handleCreateStyling}></Button>
    </View>
  );
};

export default App;
