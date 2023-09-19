import React, {useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import Heading from '../Heading';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import COLORS from '../../../Assets/Style/Color';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-paper';

export const Header = props => {
  const Navigation = useNavigation();
  const [screenName, setScreenName] = useState(
    props.screenName ? props.screenName : false,
  );

  const [notificationCount, setNotificationCount] = useState(2);
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <View style={{alignSelf: 'center'}}>
        <Pressable
          onPress={() => {
            Navigation.dispatch(DrawerActions.openDrawer());
          }}>
          <Image
            source={require('../../../Assets/Images/menuIcon.png')}
            style={{
              width: 24,
              height: 24,
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
          {/* <MaterialIcons name="menu-open" size={30} color={'black'} /> */}
        </Pressable>
      </View>
      <View style={{alignSelf: 'center', width: 200, marginLeft: 20}}>
        <Heading
          Heading={props.header}
          Fontsize={18}
          //   color={COLORS.dark}
          Fontweight={'bold'}
          txtAlign={'center'}
          color={'rgba(11, 16, 92, 1)'}
        />
      </View>
      <View style={{alignSelf: 'center'}}>
        <Pressable
          onPress={() => {
            Navigation.navigate('MyCards', {
              prevName: 'Header',
              screenName: screenName,
            });
          }}
          style={{position: 'relative'}}>
          <Image
            source={require('../../../Assets/Images/allCards.png')}
            style={{
              width: 28,
              height: 24,
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}
          />
        </Pressable>
      </View>
      <View style={{alignSelf: 'center'}}>
        <Pressable
          onPress={() => {
            Navigation.navigate('Notifications');
          }}
          style={{position: 'relative'}}>
          <Image
            source={require('../../../Assets/Images/notification.png')}
            style={{
              width: 25,
              height: 27,
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
          {notificationCount > 0 && (
            <View
              style={{
                position: 'absolute',
                // top: -2,
                right: -1,
                backgroundColor: 'red',
                borderRadius: 50,
                borderWidth: 2,
                borderColor: 'white',
                width: 16,
                height: 16,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 8,
                  fontWeight: 'bold',
                  padding: 0,
                  margin: 0,
                }}>
                {notificationCount}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};
