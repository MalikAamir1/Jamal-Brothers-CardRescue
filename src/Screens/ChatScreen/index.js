import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Head from '../../Components/ReusableComponent/Head';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {SuccessModal} from '../../Components/ReusableComponent/SuccessModal';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Heading from '../../Components/ReusableComponent/Heading';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import {sendTextMessage} from '../../Utils/Actions/chatActions';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import {Loader} from '../../Components/ReusableComponent/Loader';

export const ChatScreen = ({route}) => {
  const userToken = route.params.userToken;
  const Navigation = useNavigation();
  const [secondModal, setSecondModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer.userData.token);
  const [myMessages, setMyMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const loggedInUser = AuthReducer?.user;
  const [userBio, setUserBio] = useState([]);
  const [loader, setloader] = useState(false);
  console.log('auth', userBio);
  console.log('userToken', userToken);
  console.log('AuthReducer', AuthReducer);
  console.log('userMessages', userMessages);
  // console.log('Profile Image URL:', userBio.profileImage);

  // let backNames = route.params.backName;

  useEffect(() => {
    setloader(true);
    const messageData = database().ref(`messages/${AuthReducer}`);
    const secondMessageData = database().ref(`messages/${userToken}`);
    messageData.once('value', async snapshot => {
      const userMsg = snapshot.val();
      if (userMsg) {
        setUserMessages(Object.values(userMsg));
      }
    });
    secondMessageData.once('value', async snapshot => {
      const userMsg = snapshot.val();
      if (userMsg) {
        setUserMessages(Object.values(userMsg));
      }
    });
    const userProfile = database().ref(`users/${AuthReducer}`);
    userProfile.once('value', async snapshot => {
      const userPro = snapshot.val();
      setUserBio(userPro);
    });
    const secondUserProfile = database().ref(`users/${userToken}`);
    secondUserProfile.once('value', async snapshot => {
      const userPro = snapshot.val();
      setUserBio(userPro);
    });
    setloader(false);
  }, [AuthReducer]);

  useEffect(() => {
    setloader(true);
    const messageData = database().ref(`messages/${userToken}`);
    messageData.once('value', async snapshot => {
      const userMsg = snapshot.val();
      if (userMsg) {
        setUserMessages(Object.values(userMsg));
      }
    });
    const userProfile = database().ref(`users/${userToken}`);
    userProfile.once('value', async snapshot => {
      const userPro = snapshot.val();
      setUserBio(userPro);
    });
    setloader(false);
  }, [userToken]);

  const sendMessage = useCallback(async () => {
    try {
      const newMessage = {
        sentBy: AuthReducer.email,
        sentAt: new Date().toISOString(),
        text: messageText,
      };
      setUserMessages(prevMessages => [...prevMessages, newMessage]);
      setMessageText('');
      await sendTextMessage(userToken, AuthReducer, messageText);
    } catch (error) {
      console.log(error);
    }
  }, [messageText]);

  const renderItem = ({item}) => {
    const messageTime = new Date(item.sentAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return (
      <>
        <View style={{marginHorizontal: '1%', flex: 1}}>
          {item.sentBy == 'userToken' ? (
            <View style={{marginBottom: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {/* {userBio.profileImage ? (
                  <Image
                    source={{uri: userBio.profileImage}}
                    style={{marginTop: -30}}
                  />
                ) : ( */}
                <Image
                  source={require('../../Assets/Images/splashlogo.png')}
                  style={{marginTop: -30}}
                />
                {/* )} */}

                <View>
                  <LinearGradient
                    colors={['#0B105C', '#407BFF']}
                    start={{x: 2, y: 0}}
                    end={{x: 0, y: 1}}
                    style={{
                      flex: 1,
                      // marginLeft: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 230,
                      borderRadius: 7,
                      borderColor: 'white',
                      borderWidth: 3,
                      // shadowColor: 'rgba(11, 16, 92, 0.3)',
                      // shadowOffset: {width: 0, height: 15},
                      // shadowOpacity: 1,
                      // shadowRadius: 40,
                    }}>
                    <Heading
                      Stylefont={'normal'}
                      Fontsize={13}
                      txtAlign={'left'}
                      p={10}
                      lh={18}
                      Heading={item.message}
                      color={'rgba(255, 255, 255, 1)'}
                      //   ml={-17}
                    />
                  </LinearGradient>
                </View>
              </View>
              <Heading
                Heading={item.sentAt}
                color={'rgba(156, 156, 156, 1)'}
                Fontsize={12}
                txtAlign={'right'}
                mr={Platform.OS === 'ios' ? 93 : 84}
              />
            </View>
          ) : (
            <View style={{marginBottom: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 20,
                }}>
                <View
                  style={{
                    flex: 1,
                    // backgroundColor: 'rgba(255, 255, 255, 5)',
                    backgroundColor: 'red',
                    marginLeft: 100,
                    // justifyContent: 'right',
                    alignItems: 'right',
                    // width: '20%',

                    borderRadius: 7,
                    borderColor: 'white',
                    borderWidth: 3,
                    // marginLeft: 70,
                    // width: '10%',
                    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                    // shadowColor: '#000',
                    // shadowOffset: {width: 0, height: 2},
                    // shadowOpacity: 0.5,
                    // shadowRadius: 4,
                    elevation: 5,
                  }}>
                  <Heading
                    Fontsize={13}
                    width={220}
                    txtAlign={'left'}
                    p={10}
                    lh={18}
                    Heading={item.sentBy}
                    color={'rgba(156, 156, 156, 1)'}
                    // ml={-17}
                  />
                </View>
                {userBio.profileImage ? (
                  <Image
                    source={{uri: userBio.profileImage}}
                    style={{
                      marginTop: -30,
                      width: 37,
                      height: 37,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                    }}
                  />
                ) : (
                  <Image
                    source={require('../../Assets/Images/myprofile.png')}
                    style={{marginTop: -30}}
                  />
                )}
              </View>
              <Heading
                Heading={messageTime}
                color={'rgba(156, 156, 156, 1)'}
                Fontsize={12}
                // txtAlign={'left'}
                ml={100}
                mt={3}
              />
            </View>
          )}
        </View>
      </>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <View>
          <Head
            head={userBio.display_name}
            // backName={backNames}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row',
            marginVertical: '7%',
            // marginLeft: '-2%',
            // marginTop: '5%',
            marginHorizontal: 20,
          }}>
          <ButtonComp
            btnText={'Mark As Return'}
            press={() => {
              setSecondModal(true);
            }}
          />
        </View>
      </>
    );
  };

  // const ListFooterComponent = () => {
  //   return (
  //     <>
  //       {/* <KeyboardAvoidingView style={{flex: 1}} behavior="position"> */}
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           borderColor: 'rgba(11, 16, 92, 0.5)',
  //           borderWidth: 1,
  //           backgroundColor: 'white',
  //           width: '90%',
  //           borderRadius: 20,
  //           height: 48,
  //           shadowColor: '#000',
  //           shadowOffset: {width: 0, height: 2},
  //           shadowOpacity: 0.5,
  //           shadowRadius: 4,
  //           elevation: 5,
  //           marginLeft: 18,
  //           marginBottom: 20,
  //         }}>
  //         <TextInput
  //           // autoFocus={true}
  //           value={messageText}
  //           onChangeText={text => setMessageText(text)}
  //           // onSubmitEditing={console.log('submitdone')}
  //           placeholder="Type message"
  //           // contextMenuHidden={true}
  //           style={{
  //             flex: 1,
  //             backgroundColor: 'transparent', // Make the TextInput background transparent
  //             color: 'black',
  //             fontSize: 12,
  //           }}
  //           placeholderTextColor={'rgba(102, 112, 128, 1)'}
  //           activeUnderlineColor={'transparent'}
  //           underlineColorAndroid={'transparent'}
  //           underlineColor={'transparent'}
  //         />
  //         <Image
  //           source={require('../../Assets/Images/sendLocation.png')}
  //           style={{marginRight: 10}}
  //         />

  //         <TouchableOpacity onPress={sendMessage}>
  //           <Image
  //             source={require('../../Assets/Images/sendmessage.png')}
  //             style={{width: 46, height: 76, marginRight: 1, marginTop: 2}}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //       {/* </KeyboardAvoidingView> */}
  //     </>
  //   );
  // };

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
      <SafeArea>
        {loader ? (
          <Loader />
        ) : (
          <View
            style={
              {
                //   marginVertical: '5%',
                // marginBottom: Platform.OS === 'ios' ? '10%' : '28%',
              }
            }>
            <View>
              <Head
                head={userBio.display_name}
                // backName={backNames}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                marginTop: '5%',
                marginBottom: 5,
                height: 45,
                // paddingVertical: 100,
                // marginLeft: '-2%',
                // marginTop: '5%',
                marginHorizontal: 20,
              }}>
              <ButtonComp
                btnText={'Mark As Return'}
                press={() => {
                  setSecondModal(true);
                }}
              />
            </View>
            <View
              style={{
                marginBottom: Platform.OS === 'ios' ? '10%' : 0,
                height: '76%',
              }}>
              <FlatList
                data={Object.values(userMessages)}
                renderItem={renderItem}
                // keyExtractor={item => item.metal_id}
                contentContainerStyle={{flexDirection: 'column'}}
                // ListHeaderComponent={ListHeaderComponent}
                // ListFooterComponent={ListFooterComponent}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              // keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
              {/* <ScrollView automaticallyAdjustKeyboardInsets={true}> */}
              {/* <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={{flex: 1}}> */}
              {/* <ScrollView style={{flex: 1}}> */}
              <View
                style={{
                  flexDirection: 'row',
                  // position: 'relative',
                  // bottom: 140,
                  alignItems: 'center',
                  borderColor: 'rgba(11, 16, 92, 0.5)',
                  borderWidth: 1,
                  backgroundColor: 'white',
                  width: '90%',
                  borderRadius: 20,
                  height: 48,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.5,
                  shadowRadius: 4,
                  elevation: 5,
                  marginLeft: 18,
                  marginBottom: 20,
                  // paddingBottom: Platform.OS === 'ios' ? 20 : 0,
                }}>
                <TextInput
                  // autoFocus={true}
                  value={messageText}
                  onChangeText={text => setMessageText(text)}
                  // onSubmitEditing={console.log('submitdone')}
                  placeholder="Type message"
                  // contextMenuHidden={true}
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent', // Make the TextInput background transparent
                    color: 'black',
                    fontSize: 12,
                  }}
                  placeholderTextColor={'rgba(102, 112, 128, 1)'}
                  activeUnderlineColor={'transparent'}
                  underlineColorAndroid={'transparent'}
                  underlineColor={'transparent'}
                />
                <Image
                  source={require('../../Assets/Images/sendLocation.png')}
                  style={{marginRight: 10}}
                />

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
              {/* </ScrollView> */}
            </KeyboardAvoidingView>
          </View>
        )}
      </SafeArea>
    </>
  );
};
