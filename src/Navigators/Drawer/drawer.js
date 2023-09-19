import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Image, Platform} from 'react-native';
// import {Home} from '../../Screens/Home';
import {LostCards} from '../../Screens/LostCards';
import {FoundCardsList} from '../../Screens/FoundCardsList';
import {Chats} from '../../Screens/Chats';
import {ReturnedCards} from '../../Screens/ReturnedCards';
import {MyCards} from '../../Screens/MyCards';
import {Profile} from '../../Screens/Profile';
import {Feedback} from '../../Screens/Feedback';
import {Settings} from '../../Screens/Settings';
import CustomDrawer from '../../Components/CustomDrawer';
import {Home} from '../../Screens/Home';
import SimpleBottomScreen from '../SimpleBottomScreen';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  //   const drawerIcon = ({focused, size}) => {
  //     return (
  //       <Ionicons
  //         name={name}
  //         size={size}
  //         color={focused ? Colors.active : Colors.inactive}
  //       />
  //     );
  //   };
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerActiveBackgroundColor: 'transparent',
        drawerHideStatusBarOnOpen: Platform.OS === 'ios' ? true : false,
        // overlayColor: Colors.transparent,
        drawerStyle: {
          // backgroundColor: Colors.bg,
          width: '80%',
        },
        drawerItemStyle: {
          height: 36,
          marginLeft: 20,
        },
        drawerLabelStyle: {
          fontSize: 16, // Adjust the font size as needed
          fontWeight: 'normal',
          height: 20,
          color: 'rgba(16, 35, 78, 1)', // Adjust font weight as needed
          // You can also set other text styles here like color, fontFamily, etc.
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={SimpleBottomScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/home.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
          name="Home"
          options={{
            drawerIcon: ({focused, size}) => (
              <Image
                source={require('../../Assets/Images/home.png')}
                style={{width: size, height: size}}
              />
            ),
          }}>
          {() => <SimpleBottomScreen screenName="Home" />}
        </Drawer.Screen> */}
      <Drawer.Screen
        name="Lost Cards"
        component={SimpleBottomScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/lostcards.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
          name="Lost Cards"
          options={{
            drawerIcon: ({focused, size}) => (
              <Image
                source={require('../../Assets/Images/lostcards.png')}
                style={{width: 24, height: 24}}
              />
            ),
          }}>
          {() => <SimpleBottomScreen screenName="Lost Cards" />}
        </Drawer.Screen> */}
      <Drawer.Screen
        name="Found Cards"
        component={SimpleBottomScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/foundcards.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Chats"
        component={SimpleBottomScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/chats.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Returned Cards"
        component={ReturnedCards}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/returnedchats.png')}
              style={{width: 24, height: 21.74}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="My Cards"
        component={MyCards}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/mycards.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={Profile}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/myprofile.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={SimpleBottomScreen}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/feedback.png')}
              style={{width: 24, height: 22.28}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/setting.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/home.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Lost Cards"
        component={LostCards}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/lostcards.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Found Cards"
        component={FoundCardsList}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/foundcards.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Chats"
        component={Chats}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/chats.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Returned Cards"
        component={ReturnedCards}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/returnedchats.png')}
              style={{width: 24, height: 21.74}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="My Cards"
        component={MyCards}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/mycards.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={Profile}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/myprofile.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={Feedback}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/feedback.png')}
              style={{width: 24, height: 22.28}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../Assets/Images/setting.png')}
              style={{width: 24, height: 24}}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
    //  </NavigationContainer>
  );
};

export default DrawerNavigator;

const Colors = {
  bg: '#009688',
  active: '#fff',
  inactive: '#eee',
  transparent: 'transparent',
};
