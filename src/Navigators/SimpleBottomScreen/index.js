import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import Icon, {Icons} from '../components/Icons';
// import Colors from '../constants/Colors';
// import ColorScreen from '../screens/ColorScreen';
import * as Animatable from 'react-native-animatable';
// import {Home} from '../../Screens/Home';
import { LostCards } from '../../Screens/LostCards';
import { FoundCardsList } from '../../Screens/FoundCardsList';
import { Chats } from '../../Screens/Chats';
import { Feedback } from '../../Screens/Feedback';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import LinearGradient from 'react-native-linear-gradient';
import DrawerNavigator from '../Drawer/drawer';
import { Home } from '../../Screens/Home';
import { getRequestWithOutBody } from '../../App/fetch';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../App/api';
import { useFocusEffect } from '@react-navigation/native';

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    image: require('../../Assets/Images/homeBottom.png'),
    component: Home,
    imageWidth: 25,
    imageHeight: 23,
  },
  {
    route: 'LostCards',
    label: 'Lost Cards',
    image: require('../../Assets/Images/lostcardbottom.png'),
    component: LostCards,
    imageWidth: 30,
    imageHeight: 24,
  },
  {
    route: 'FoundCardsList',
    label: 'Found Cards',
    image: require('../../Assets/Images/foundcardbottom.png'),
    component: FoundCardsList,
    imageWidth: 28,
    imageHeight: 24,
  },
  {
    route: 'Chats',
    label: 'Chats',
    image: require('../../Assets/Images/chatsbottom.png'),
    component: Chats,
    imageWidth: 19.5,
    imageHeight: 18,
  },
  {
    route: 'Feedback',
    label: 'Feedback',
    image: require('../../Assets/Images/feedbackbottom.png'),
    component: Feedback,
    imageWidth: 28,
    imageHeight: 24,
  },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  //   0.92: {translateY: -34},
  1: { scale: 1.2, translateY: -10 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -10 },
  1: { scale: 1, translateY: 7 },
};

const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = props => {
  const { item, onPress, accessibilityState, notificationCount } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);



  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      // console.log(viewRef.current);
      //   textRef.current.transitionTo({scale: 1});
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      //   textRef.current.transitionTo({scale: 0});
    }
  }, [focused]);
  console.log('notification count aaaaaa, ', notificationCount)
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={100} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <LinearGradient
            colors={
              focused
                ? // ? ['rgba(249, 180, 1, 1)', 'rgba(252, 221, 142, 1)']
                ['rgba(252, 221, 142, 1)', 'rgba(249, 180, 1, 1)']
                : ['transparent', 'transparent'] // Set transparent colors when not focused
            }
            start={{ x: 0.5, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}>
            {/* Your button content goes here */}
            <Image
              source={item.image}
              style={{ width: item.imageWidth, height: item.imageHeight }}
            />
          </LinearGradient>
        </View>
        {/* <Animatable.Text style={styles.text}>{item.label}</Animatable.Text> */}
      </Animatable.View>
      <Text style={styles.text}>{item.label}</Text>
      {item.route === 'Chats' && notificationCount > 0 && (
        <View style={{
          position: 'absolute',
          top: 13,
          right: 5,
          backgroundColor: 'red',
          borderRadius: 50,
          borderWidth: 2,
          borderColor: 'white',
          width: 26,
          height: 26,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          alignContent: 'center',
        }}>
          <Text style={{
            color: 'white',
            fontSize: 12,
            fontWeight: 'bold',
            padding: 0,
            margin: 0,
          }}>{notificationCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function SimpleBottomScreen() {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [notificationCount, setNotificationCount] = useState();
  console.log('totalMessageCount', notificationCount)

  const fetchData2 = () => {
      getRequestWithOutBody(
      `${BASE_URL}/cards/match-cards/`,
      AuthReducer.userData.token,
      )
      .then(result => {
        // console.log('result at notification', result.results)
        // Calculate the total message count by summing up messageCount from each object
        const totalMessageCount = result.results.reduce(
          (total, card) => total + parseInt(card.latest_message.messageCount),
      0
      );
      setNotificationCount(totalMessageCount)
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  useEffect(() => {
    fetchData2()
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData2();
    }, []),
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}>
      {TabArr.map((item, index) => {
        return (
          <>
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: props => <TabButton {...props} item={item} notificationCount={notificationCount} />,
              }}
            />
          </>
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
    // width: '100%',
    // marginRights: -200,
  },
  tabBar: {
    margin: Platform.OS === 'ios' ? -15 : -15,
    height: Platform.OS === 'ios' ? 100 : 85,
    position: 'absolute',
    // bottom: 5,
    right: 16,
    left: 16,
    // width: '100%',
    // borderRadius: 16,
    // backgroundColor: 'white',
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? -30 : -25,
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
    borderRadius: 25,
  },
  text: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 20,
    marginTop: 38,
    // color: Colors.primary,
    color: 'rgba(11, 16, 92, 1)',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center',
  },
});
