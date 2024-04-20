import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Pressable,
  PermissionsAndroid,
  Linking,
  Alert,
} from 'react-native';
import Head from '../../Components/ReusableComponent/Head';
import ButtonComp from '../../Components/ReusableComponent/Button';
import { SuccessModal } from '../../Components/ReusableComponent/SuccessModal';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Heading from '../../Components/ReusableComponent/Heading';
import LinearGradient from 'react-native-linear-gradient';
import { sendLocationMessage, sendTextMessage } from '../../Utils/Actions/chatActions';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import { Loader } from '../../Components/ReusableComponent/Loader';
import { putRequestWithToken } from '../../App/fetch';
import { BASE_URL } from '../../App/api';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapThumbnail from '../../Components/ReusableComponent/MapThumbnail';

export const ChatScreen = ({ route }) => {
  const userToken =
    route.params?.userInfo?.found_by?.id ||
    route.params?.userInfo?.lost_by?.id ||
    route.params?.userInfo?.to_user_id
  const card_id =
    !route.params?.screenName ?
      `${route.params?.userInfo?.card_type}_${route.params?.userInfo?.issuer}_${route.params?.userInfo?.card_number}`
      :
      `${route.params?.userInfo?.card_type_id}_${route.params?.userInfo?.issuer_id}_${route.params?.userInfo?.card_number}`
  const Navigation = useNavigation();
  const AuthReducerId = useSelector(
    state => state.AuthReducer.userData.user.id,
  );
  const AuthReducer = useSelector(state => state.AuthReducer.userData.token);
  const AuthReducerData = useSelector(state => state.AuthReducer.userData);
  const [secondModal, setSecondModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [myMessages, setMyMessages] = useState([]);
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [issuerId, setIssuerId] = useState('');
  const [cardTypeId, setCardTypeId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardId, setCardId] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [otherUserMessages, setOtherUserMessages] = useState([]);
  // console.log('userMessages', userMessages)
  const [allMessages, setAllMessages] = useState([]);
  const loggedInUser = AuthReducer?.user;
  const [userBio, setUserBio] = useState([]);
  const [myBio, setMyBio] = useState([]);
  const [loader, setloader] = useState(false);
  const [foundBy, setFoundBy] = useState(false);
  const [cardInfo, setCardInfo] = useState();
  const mergedMessages = [...userMessages, ...otherUserMessages];
  const sortedMergedMessages = mergedMessages.sort(
    (a, b) => new Date(a.sentAt) - new Date(b.sentAt),
  );
  const flatListRef = useRef();
  // console.log('AuthReducer', AuthReducer)
  // console.log('route.params on chat screen', cardTypeId)

  useEffect(() => {
    setExpirationMonth(
      route.params?.userInfo?.expiration_month.toString().padStart(2, '0')
    )
    setExpirationYear(
      route.params?.userInfo?.expiration_year
    )
    setIssuerId(
      route.params?.userInfo?.issuer || route.params?.userInfo?.issuer_id
    )
    setCardTypeId(
      !route.params?.screenName ?
        route.params?.userInfo?.card_type : route.params?.userInfo?.card_type_id
    )
    setCardNumber(
      route.params?.userInfo?.card_number
    )
    setCvv(
      route.params?.userInfo?.cvv
    )
    setCardHolder(
      route.params?.userInfo?.card_holder
    )
    setCardId(
      route.params?.userInfo?.id || route.params?.userInfo?.card_id
    )
  }, []);

  useEffect(() => {
    // Scroll to the end of the FlatList whenever sortedMergedMessages changes
    // Scroll to the end of the FlatList whenever sortedMergedMessages changes
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    } else {
      console.log('error in scroll')
    }
  }, [sortedMergedMessages]);
  // console.log('messageText', messageText)


  // console.log('cardid', card_id)

  useEffect(() => {
    setloader(true);
    const messageData = database().ref(`messages/${AuthReducerId}/${card_id}/${userToken}`);
    const latestRef2 = database().ref(`latest/${AuthReducerId}/${card_id}/${userToken}`);

    messageData.on('value', async snapshot => {
      const userMsg = snapshot.val();
      // console.log('mymsg', userMsg);
      // console.log('userMsg', userMsg)
      if (userMsg) {
        const sortedMessages = Object.values(userMsg).sort(
          (a, b) => new Date(a.sentAt) - new Date(b.sentAt),
        );
        // await latestRef2.update({
        //   readFlag: true,
        //   messageCount: 0
        // });
        // console.log('latestRef2', latestRef2)

        setUserMessages(sortedMessages);

        const usersSnapshot = await database().ref(`cardInfo/${AuthReducerId}/${userToken}`).once('value');
        const usersData = usersSnapshot.val();

        // console.log('usersData', usersData)
        setCardInfo(usersData)
        if (usersData?.foundBy == AuthReducerId) {
          console.log('foundBy')
          setFoundBy(true)
        } else {
          console.log('lostby')
        }
      } else {
        try {
          const messageData = {
            foundBy: route.params?.userInfo?.found_by?.id ||
              route.params?.userInfo?.created_by?.id,
            lostBy: route.params?.userInfo?.lost_by?.id ||
              route.params?.userInfo?.created_by?.id,
            expiration_month: route.params?.userInfo?.expiration_month,
            expiration_year: route.params?.userInfo?.expiration_year,
            issuer: route.params?.userInfo?.issuer,
            card_type: route.params?.userInfo?.card_type,
            card_number: route.params?.userInfo?.card_number,
            cvv: route.params?.userInfo?.cvv,
            card_holder: route.params?.userInfo?.card_holder,
            card_id: route.params?.userInfo?.id,
          };
          // console.log('messageData', messageData)
          const messageRef = database()
            .ref(`cardInfo/${userToken}/${AuthReducerId}`)
            .set(messageData)
            .then(res => console.log('userMsgSaved'))
            .catch(err => console.log('userMsgNotSaved'));

          const messageRef2 = database()
            .ref(`cardInfo/${AuthReducerId}/${userToken}`)
            .set(messageData)
            .then(res => console.log('userMsgSaved'))
            .catch(err => console.log('userMsgNotSaved'));
        } catch (error) {
          console.log(error);
        }
      }
    });

    const userProfile = database().ref(`users/${userToken}`);
    userProfile.once('value', async snapshot => {
      const userPro = snapshot.val();
      // console.log('jadhgjshgkjdfhg', userProfile)
      setUserBio(userPro);
    });
    setloader(false);
  }, [userToken, AuthReducerId]);

  const sendMessage = useCallback(async () => {
    if (messageText == '') {
      console.log('empty message')
    } else {
      try {
        const newMessage = {
          sentBy: AuthReducerId,
          sentAt: new Date().toISOString(),
          message: messageText,
        };
        setUserMessages(prevMessages => [...prevMessages, newMessage]);
        setMessageText('');
        await sendTextMessage(userToken, AuthReducerId, messageText, card_id);
      } catch (error) {
        console.log(error);
      }
    }
  }, [messageText, AuthReducerId, userToken]);
  // console.log('userToken in chatscreen', userToken)

  const returnbtn = () => {
    try {
      var formdata = new FormData();

      formdata.append('expiration_month', expirationMonth);
      formdata.append('expiration_year', expirationYear);
      formdata.append('issuer_id', issuerId);
      formdata.append('card_type_id', cardTypeId);
      formdata.append('card_number', cardNumber);
      formdata.append('cvv', cvv);
      formdata.append('card_holder', cardHolder);
      formdata.append('comments', '-');
      formdata.append('is_active', 'True');
      formdata.append('card_holding_days', 0);
      formdata.append('card_status', 'returned');
      formdata.append('card_id', cardId);

      setloader(true);
      putRequestWithToken(
        `${BASE_URL}/cards/update-card/`,
        formdata,
        AuthReducer,
      )
        .then(async result => {
          // console.log('result of Add my card', result);
          setSecondModal(true);
          setloader(false);
          try {
            await database().ref(`cardInfo/${userToken}/${AuthReducerId}`).remove();
            await database().ref(`cardInfo/${AuthReducerId}/${userToken}`).remove();
            await sendTextMessage(userToken, AuthReducerId, 'Card has been returned', card_id);


            // console.log('Chat deleted successfully');
          } catch (error) {
            console.error('Error deleting chat:', error);
          }
        })
        .catch(error => {
          console.log('error', error);
          setloader(false);
        });
      // After all API requests are completed, you can show the success modal
    } catch (error) {
      console.error('Error making API requests:', error);
      // Handle error, show an error message, etc.
    }
    // setSecondModal(true)
  };

  const receivebtn = () => {
    try {
      var formdata = new FormData();

      formdata.append('expiration_month', expirationMonth);
      formdata.append('expiration_year', expirationYear);
      formdata.append('issuer_id', issuerId);
      formdata.append('card_type_id', cardTypeId);
      formdata.append('card_number', cardNumber);
      formdata.append('cvv', cvv);
      formdata.append('card_holder', cardHolder);
      formdata.append('comments', '-');
      formdata.append('is_active', 'True');
      formdata.append('card_holding_days', 0);
      formdata.append('card_status', 'my-card');
      formdata.append('card_id', cardId);

      setloader(true);
      putRequestWithToken(
        `${BASE_URL}/cards/update-card/`,
        formdata,
        AuthReducer,
      )
        .then(async result => {
          // console.log('result of Add my card', result);
          setModalVisible(true);
          setloader(false);
          try {
            await database().ref(`cardInfo/${userToken}/${AuthReducerId}`).remove();
            await database().ref(`cardInfo/${AuthReducerId}/${userToken}`).remove();
            await sendTextMessage(userToken, AuthReducerId, 'Card has been received', card_id);

            // console.log('Chat deleted successfully');
          } catch (error) {
            console.error('Error deleting chat:', error);
          }
        })
        .catch(error => {
          console.log('error', error);
          setloader(false);
        });
      // After all API requests are completed, you can show the success modal
    } catch (error) {
      console.error('Error making API requests:', error);
      // Handle error, show an error message, etc.
    }
    // setSecondModal(true)
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('Location permission granted');
          getCurrentLocation();
        } else {
          // console.log('Location permission denied');
        }
      } catch (error) {
        // console.error('Error requesting location permission:', error);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // Alert.alert('latitude', latitude )
        // Now you have the latitude and longitude
        // console.log('Latitude:', latitude);
        // console.log('Longitude:', longitude);
        setLatitude(latitude)
        setLongitude(longitude)
        const newMessage = {
          sentBy: AuthReducerId,
          sentAt: new Date().toISOString(),
          lat: latitude,
          long: longitude,
        };
        setUserMessages(prevMessages => [...prevMessages, newMessage]);
        setMessageText('');
        await sendLocationMessage(userToken, AuthReducerId, latitude, longitude, card_id);

        // Proceed with reverse geocoding
        reverseGeocode(latitude, longitude);
      },
      error => {
        console.error('Error getting current location:', error);
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000, forceAndroidLocationManager: true },
    );
  };

  const reverseGeocode = (latitude, longitude) => {
    // Set your API key (required for some geocoding services)
    Geocoder.init('AIzaSyDtp3OKKerq7d8LiZjKwo78fm9QEg8MMZk');

    // Perform reverse geocoding
    Geocoder.from(latitude, longitude)
      .then(response => {
        const address = response.results[0].formatted_address;
        const city = response.results[0].address_components.find(component =>
          component.types.includes('locality'),
        ).long_name;
        const country = response.results[0].address_components.find(component =>
          component.types.includes('country'),
        ).long_name;

        // console.log('Address:', address);
        // console.log('City:', city);
        // console.log('Country:', country);
      })
      .catch(error => {
        console.error('Error during reverse geocoding:', error);
      });
  };

  const renderItem = ({ item }) => {
    // console.log('item in chatscreen', item)
    // console.log('userToken in chatscreen', userToken)
    const messageTime = new Date(item.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const openMapsApp = () => {
      const url = Platform.select({
        ios: `http://maps.apple.com/?ll=${item.lat},${item.long}`,
        android: `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.long}`,
      });

      Linking.openURL(url).catch(err => console.error('Error opening maps app:', err));
    };
    // console.log('item', item)
    return (
      <>
        <View style={{ marginHorizontal: '1%', flex: 1, }}>
          {item.sentBy == userToken ? (
            <View style={{ marginTop: 30, maxWidth: '75%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 20
                }}>
                {/* {route.params?.userInfo?.found_by_user_profile?.profile_pic || route.params?.userInfo?.lost_by_user_profile?.profile_pic || route.params?.userInfo?.photo_url ? ( */}
                <Image
                  source={{
                    uri:
                      route.params?.userInfo?.found_by_user_profile?.profile_pic ||
                      route.params?.userInfo?.lost_by_user_profile?.profile_pic
                      ||
                      `http://23.26.137.178:8000/media/${route.params?.userInfo?.user_media}`,
                    // uri: route.params?.userInfo?.found_by_user_profile?.profile_pic,
                  }}
                  style={{
                    // backgroundColor: 'red',
                    // marginTop: -30,
                    width: 37,
                    height: 37,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                />
                {/* // ) : (
                //   <Image
                //     source={require('../../Assets/Images/myprofile.png')}
                //     style={{ marginTop: -30 }}
                //   />
                // )} */}

                <View style={{ marginLeft: 11 }}>
                  {item.lat ? (
                    <Pressable onPress={() => openMapsApp()} >
                      <MapThumbnail
                        latitude={item.lat}
                        longitude={item.long}
                        title="Current Location"
                      />
                    </Pressable>
                  ) : (
                    <LinearGradient
                      colors={['#0B105C', '#407BFF']}
                      start={{ x: 2, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 230,
                        borderRadius: 7,
                        borderColor: 'white',
                        borderWidth: 3,
                      }}>
                      <Heading
                        // Stylefont={'normal'}

                        Heading={item.text}
                        color={'rgba(255, 255, 255, 1)'}
                        Fontsize={13}
                        width={220}
                        txtAlign={'left'}
                        p={10}
                        lh={18}
                      />
                    </LinearGradient>
                  )}
                  <Heading
                    Heading={messageTime}
                    color={'rgba(156, 156, 156, 1)'}
                    Fontsize={12}
                    txtAlign={'right'}
                    mr={'1%'}
                    mb={5}
                  />
                </View>
              </View>
            </View>
          ) : (
            <>
              <View style={{ marginTop: 30, alignItems: 'flex-end' }}>
                <View style={{ maxWidth: '75%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginRight: Platform.OS == 'ios' ? 20 : 30,

                    }}>
                    <View style={{
                      width: Platform.OS == 'ios' ? 230 : 220,
                    }}>
                      {item.lat ? (
                        <Pressable onPress={() => openMapsApp()} >
                          <MapThumbnail
                            latitude={item.lat}
                            longitude={item.long}
                            title="Current Location"
                          />
                        </Pressable>
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            // marginLeft: 100,
                            // width: 50,
                            marginRight: 11,
                            // alignItems: 'right',
                            borderRadius: 7,
                            // borderColor: 'white',
                            borderWidth: 3,
                            borderColor:
                              Platform.OS === 'ios'
                                ? 'rgba(0, 0, 0, 0.1)'
                                : 'rgba(0, 0, 0, 0.12)',
                            // elevation: 12,
                          }}>

                          <Heading
                            Fontsize={13}
                            width={220}
                            txtAlign={'left'}
                            p={10}
                            lh={18}
                            Heading={item.text}
                            color={'rgba(156, 156, 156, 1)'}
                          />
                        </View>
                      )}
                    </View>

                    <Image
                      source={{
                        uri: `http://23.26.137.178:8000//${AuthReducerData?.user?.profile?.profile_pic}`,
                      }}
                      style={{
                        // marginTop: -30,
                        width: 37,
                        height: 37,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  </View>
                  <Heading
                    Heading={messageTime}
                    color={'rgba(156, 156, 156, 1)'}
                    Fontsize={12}
                    txtAlign={'left'}
                    // ml={102}
                    mt={3}
                    mb={5}
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </>
    );
  };

  // console.log('sortedMergedMessages', sortedMergedMessages)

  return (
    <>
      <SuccessModal
        set={setSecondModal}
        get={secondModal}
        txt={'Card Add Successfully'}
        done={() => {
          setSecondModal(false);
          Navigation.navigate('ReturnedCards');
        }}
        urlImg={require('../../Assets/Images/successIcon.png')}
        btntxt={'Go Back'}
        paratxt={'The card has been return to his rightful owner.'}
      />

      <SuccessModal
        set={setModalVisible}
        get={modalVisible}
        txt={'Card Add Successfully'}
        done={() => {
          setModalVisible(false);
          Navigation.navigate('MyCards', {
            screenName: true,
          });
        }}
        urlImg={require('../../Assets/Images/successIcon.png')}
        btntxt={'Go Back'}
        paratxt={'The card has been received.'}
      />

      <SafeArea>
        {loader ? (
          <Loader />
        ) : (
          <View
            style={{
              flex: 1,
            }}>
            <View>
              <Head
                head={
                  route.params?.userInfo?.found_by_user_profile?.display_name.substring(0, 15) ||
                  route.params?.userInfo?.lost_by_user_profile?.display_name.substring(0, 15) ||
                  route.params?.userInfo?.to_display_name.substring(0, 15)
                }
              />
            </View>
            {route.params?.userInfo?.lost_by?.id || route.params?.userInfo?.status == 'found' ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexDirection: 'row',
                  marginTop: '5%',
                  marginBottom: 20,
                  height: 45,
                  marginHorizontal: 20,
                }}>
                <ButtonComp
                  btnText={'Mark As Return'}
                  press={() => {
                    returnbtn();
                    // console.log('return button')
                  }}
                />
              </View>
            ) : <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                marginTop: '5%',
                marginBottom: 20,
                height: 45,
                marginHorizontal: 20,
              }}>
              <ButtonComp
                btnText={'Mark As Received'}
                press={() => {
                  receivebtn();
                  // console.log('return button')
                }}
              />
            </View>}
            {/* <KeyboardAvoidingView
              style={{flex: 1, marginBottom: 45}}
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              // keyboardVerticalOffset={65}
            > */}
            <FlatList
              data={Object.values(sortedMergedMessages)}
              renderItem={renderItem}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              ref={flatListRef}
              onContentSizeChange={() => {
                flatListRef.current.scrollToEnd({ animated: true });
              }}
            // style={{ paddingTop: 40 }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: 'rgba(11, 16, 92, 0.5)',
                borderWidth: 1,
                backgroundColor: 'white',
                width: '90%',
                borderRadius: 20,
                height: 48,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 5,
                marginLeft: 18,
                marginBottom: Platform.OS == 'ios' ? 9 : 40,
              }}>
              <TextInput
                value={messageText}
                onChangeText={text => setMessageText(text)}
                placeholder="Type message"
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: 'black',
                  fontStyle: 'italic',
                  fontSize: 12,
                  marginHorizontal: 20
                }}
                placeholderTextColor={'rgba(102, 112, 128, 1)'}
                activeUnderlineColor={'transparent'}
                underlineColorAndroid={'transparent'}
                underlineColor={'transparent'}
                editable={true}
                placeholderStyle={{ fontStyle: 'italic' }}
                onSubmitEditing={sendMessage}
              />

              <Pressable onPress={() => requestLocationPermission()} >
                <Image
                  source={require('../../Assets/Images/sendLocation.png')}
                  style={{ marginRight: 10 }}
                />
              </Pressable>

              <TouchableOpacity onPress={sendMessage}>
                <Image
                  source={require('../../Assets/Images/sendmessage.png')}
                  style={{
                    width: 46,
                    height: 76,
                    marginRight: 1,
                    marginTop: 2,
                  }}
                />
              </TouchableOpacity>
            </View>
            {/* </KeyboardAvoidingView> */}
          </View>
        )}
      </SafeArea>
    </>
  );
};
