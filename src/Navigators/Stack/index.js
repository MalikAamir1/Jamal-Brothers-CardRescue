import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../../Screens/Login';
import {SignUp} from '../../Screens/SignUp';
import {TermofServices} from '../../Screens/TermsOfServices';
import {OtpScreen} from '../../Components/OtpScreen';
import {ProfileCreate} from '../../Screens/ProfileCreate';
import {ForgotPassword} from '../../Screens/ForgotPassword';
import {useDispatch, useSelector} from 'react-redux';
import {PasswordChange} from '../../Screens/PasswordChange';
import {AddCard} from '../../Screens/AddCard.js';
import {Home} from '../../Screens/Home';
import {MyCards} from '../../Screens/MyCards';
import {LostCards} from '../../Screens/LostCards';
import {LostNewCard} from '../../Screens/LostNewCard';
import {ChatScreen} from '../../Screens/ChatScreen';
import {ReturnedCards} from '../../Screens/ReturnedCards';
import {LostExistingCard} from '../../Screens/LostExistingCard';
import {Notifications} from '../../Screens/Notifications';
import {FoundCard} from '../../Screens/FoundCard';
import {FoundCardsList} from '../../Screens/FoundCardsList';
import {Chats} from '../../Screens/Chats';
import {Profile} from '../../Screens/Profile';
import {Feedback} from '../../Screens/Feedback';
import {Settings} from '../../Screens/Settings';
import DrawerNavigator from '../Drawer/drawer';
import {AboutApp} from '../../Screens/AboutApp';
import {PrivacyPolicy} from '../../Screens/PrivacyPolicy';
import {TermsAndConditions} from '../../Screens/TermsAndConditions';
import SimpleBottomScreen from '../SimpleBottomScreen';
import {EditProfile} from '../../Screens/EditProfile';
import {userDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Splash} from '../../Screens/Splash';
import {Button, Image} from 'react-native';
import {ChatScreenDemo} from '../../Screens/ChatScreenDemo';
import { NotificationDetails } from '../../Screens/NotificationDetails';

export default function StackNavigator({route, navigation}) {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  const termServicesBool = useSelector(
    state => state.TermServicesReducer.userData,
  );
  const signupBool = useSelector(state => state.SignupReducer.userData);
  const otpScreenBool = useSelector(state => state.ScreenReducer.userData);
  const userAuth = useSelector(state => state.AuthReducer);
  const [userData, setUserData] = useState({});
  const [loader, setLoader] = useState(true);
  // console.log('signupBool', signupBool);

  React.useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const getData = async () => {
    try {
      let value = await AsyncStorage.getItem('user').then(res => {
        return res;
      });
      return value;
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    (async () => {
      let value = getData().then(res => {
        // console.log('this is res in APp');
        // console.log(res);
        let v = JSON.parse(res);

        // console.log('v:', v);

        if (v?.user.id) {
          dispatch(userDataFromAsyncStorage(v));
          //  SplashScreen.hide();
        } else {
          //  SplashScreen.hide();
        }
      });
    })().catch(err => {
      console.error(err);
    });
  }, []);

  React.useEffect(() => {
    if (userAuth.userData?.user?.id) {
      setUserData(userAuth.userData);
    } else {
      setUserData(null);
    }
  }, [userAuth.userData]);

  // useEffect(() => {
  //   console.log('userData:', userData);
  //   console.log('userAuth:', userAuth.userData.user);
  // }, [userData]);
  // useEffect(() => {
  //   console.log('otpScreenBool:', otpScreenBool);
  // }, [otpScreenBool]);

  if (loader) return <SplashScreenPage />;

  function SplashScreenPage() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Group>
            <Stack.Screen name="splash" component={Splash} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userData == null ? (
          <>
            {signupBool ? (
              <>
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen
                  name="TermofServices"
                  component={TermofServices}
                />
                <Stack.Screen name="OtpScreen" component={OtpScreen} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
                <Stack.Screen
                  name="PasswordChange"
                  component={PasswordChange}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen
                  name="TermofServices"
                  component={TermofServices}
                />
                <Stack.Screen name="OtpScreen" component={OtpScreen} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
                <Stack.Screen
                  name="PasswordChange"
                  component={PasswordChange}
                />
              </>
            )}
          </>
        ) : otpScreenBool ? (
          <>
            <Stack.Screen name="ProfileCreate" component={ProfileCreate} />
            <Stack.Screen name="AddFirstCard" component={AddCard} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SimpleBottomScreen"
              component={SimpleBottomScreen}
            />
            <Stack.Screen name="AddCard" component={AddCard} />
            <Stack.Screen name="MyCards" component={MyCards} />
            <Stack.Screen name="LostNewCard" component={LostNewCard} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="ChatScreenDemo" component={ChatScreenDemo} />
            <Stack.Screen name="ReturnedCards" component={ReturnedCards} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="NotificationDetails" component={NotificationDetails} />
            <Stack.Screen name="FoundCard" component={FoundCard} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="AboutApp" component={AboutApp} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditions}
            />
            <Stack.Screen
              name="LostExistingCard"
              component={LostExistingCard}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
