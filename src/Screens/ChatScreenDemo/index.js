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
} from 'react-native';
import Head from '../../Components/ReusableComponent/Head';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {SuccessModal} from '../../Components/ReusableComponent/SuccessModal';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Heading from '../../Components/ReusableComponent/Heading';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import {sendTextMessage} from '../../Utils/Actions/chatActions';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import {Loader} from '../../Components/ReusableComponent/Loader';

export const ChatScreenDemo = ({route}) => {
  //   const userToken = route.params.userToken;
  const Navigation = useNavigation();
  const [secondModal, setSecondModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  //   const AuthReducer = useSelector(state => state.AuthReducer.userData.token);
  //   const AuthReducerData = useSelector(state => state.AuthReducer.userData);
  const [myMessages, setMyMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [otherUserMessages, setOtherUserMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  //   const loggedInUser = AuthReducer?.user;
  const [userBio, setUserBio] = useState([]);
  const [myBio, setMyBio] = useState([]);
  const [loader, setloader] = useState(false);
  const mergedMessages = [...userMessages, ...otherUserMessages];
  const sortedMergedMessages = mergedMessages.sort(
    (a, b) => new Date(a.sentAt) - new Date(b.sentAt),
  );
  const flatListRef = useRef();

  useEffect(() => {
    // Scroll to the end of the FlatList whenever sortedMergedMessages changes
    flatListRef.current.scrollToEnd({animated: true});
  }, [sortedMergedMessages]);

  console.log('sortedMergedMessages', sortedMergedMessages);
  // console.log('auth', userBio);
  // console.log('userToken', userToken);
  // console.log('AuthReducer', AuthReducerData.user.profile.profile_pic);
  // console.log('userMessages', userBio.profileImage);
  // let backNames = route.params.backName;

  //   useEffect(() => {
  //     setloader(true);
  //     const messageData = database().ref(`messages/${userToken}/${AuthReducer}`);
  //     messageData.on('value', async snapshot => {
  //       const userMsg = snapshot.val();
  //       // console.log('mymsg', userMsg);
  //       if (userMsg) {
  //         const sortedMessages = Object.values(userMsg).sort(
  //           (a, b) => new Date(a.sentAt) - new Date(b.sentAt),
  //         );
  //         setUserMessages(sortedMessages);
  //       }
  //     });
  //     const secondMessageData = database().ref(
  //       `messages/${AuthReducer}/${userToken}`,
  //     );
  //     secondMessageData.on('value', async snapshot => {
  //       const userMsg = snapshot.val();
  //       if (userMsg) {
  //         const sortedMessages = Object.values(userMsg).sort(
  //           (a, b) => new Date(a.sentAt) - new Date(b.sentAt),
  //         );
  //         setOtherUserMessages(sortedMessages);
  //       }
  //     });

  //     const userProfile = database().ref(`users/${userToken}`);
  //     userProfile.once('value', async snapshot => {
  //       const userPro = snapshot.val();
  //       setUserBio(userPro);
  //     });
  //     // const myProfile = database().ref(`users/${AuthReducer}`);
  //     // myProfile.once('value', async snapshot => {
  //     //   const myPro = snapshot.val();
  //     //   setMyBio(myPro);
  //     // });
  //     setloader(false);
  //   }, [userToken, AuthReducer]);

  //   const sendMessage = useCallback(async () => {
  //     try {
  //       const newMessage = {
  //         sentBy: AuthReducerData.token,
  //         sentAt: new Date().toISOString(),
  //         message: messageText,
  //       };
  //       setUserMessages(prevMessages => [...prevMessages, newMessage]);
  //       setMessageText('');
  //       await sendTextMessage(userToken, AuthReducerData, messageText);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, [messageText, AuthReducer, userToken]);

  const data = [
    {
      id: 1,
      sentBy: 'user',
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 2,
      sentBy: 'user',
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 3,
      sentBy: 'mytext',
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 4,
      sentBy: 'mytext',
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ];

  const renderItem = ({item}) => {
    // const messageTime = new Date(item.sentAt).toLocaleTimeString([], {
    //   hour: '2-digit',
    //   minute: '2-digit',
    // });
    return (
      <>
        <View style={{marginHorizontal: '1%', flex: 1}}>
          {item.sentBy === 'user' ? (
            <View style={{marginTop: 25}}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../../Assets/Images/chatuser1.png')}
                  style={{
                    marginTop: -15,
                    width: 48.56,
                    height: 48.56,
                    // width: 37,
                    // height: 37,
                    marginLeft: 15,
                    borderRadius: 20,
                    // borderColor: 'rgba(0, 0, 0, 0.1)',
                    // borderWidth: 1,
                  }}
                />

                <View>
                  <LinearGradient
                    colors={['#0B105C', '#407BFF']}
                    start={{x: 2, y: 0}}
                    end={{x: 0, y: 1}}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 250,
                      borderRadius: 7,
                      borderColor: 'white',
                      borderWidth: 3,
                    }}>
                    <Heading
                      // Stylefont={'normal'}

                      Heading={item.message}
                      color={'rgba(255, 255, 255, 1)'}
                      Fontsize={14}
                      width={220}
                      txtAlign={'left'}
                      p={10}
                      lh={18}
                      ml={-30}
                      mt={-5}
                      mb={8}
                    />
                  </LinearGradient>
                </View>
              </View>
              <Heading
                Heading={'12:30'}
                color={'rgba(156, 156, 156, 1)'}
                Fontsize={12}
                txtAlign={'right'}
                mr={74}
              />
            </View>
          ) : (
            <View style={{marginTop: 40}}>
              <View
                style={{
                  flexDirection: 'row',
                  // marginRight: 20,
                }}>
                <View
                  style={{
                    flex: 1,
                    marginLeft: 70,
                    // width: 250,
                    alignItems: 'right',
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
                    Fontsize={14}
                    width={220}
                    txtAlign={'left'}
                    p={10}
                    lh={18}
                    Heading={item.message}
                    color={'rgba(156, 156, 156, 1)'}
                  />
                </View>

                <Image
                  source={require('../../Assets/Images/chatscreendemouser.png')}
                  style={{
                    marginTop: -30,
                    // width: 45.56,
                    // height: 45.56,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                />
              </View>
              <Heading
                Heading={'12:30'}
                color={'rgba(156, 156, 156, 1)'}
                Fontsize={12}
                ml={68}
                mt={3}
                mb={0}
              />
            </View>
          )}
        </View>
      </>
    );
  };

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
            style={{
              flex: 1,
            }}>
            <View>
              <Head
                head={'Mia William'}
                // backName={backNames}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                marginTop: '11%',
                marginBottom: 40,
                height: 45,
                marginHorizontal: 20,
              }}>
              <ButtonComp
                btnText={'Mark As Return'}
                press={() => {
                  setSecondModal(true);
                }}
              />
            </View>
            <FlatList
              data={data}
              renderItem={renderItem}
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}
              ref={flatListRef}
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
                borderRadius: 30,
                height: 48,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 5,
                marginLeft: 18,
                // marginBottom: 20,
              }}>
              <TextInput
                value={messageText}
                onChangeText={text => setMessageText(text)}
                placeholder="Type message"
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: 'black',
                  // fontStyle: 'italic',
                  fontSize: 12,
                  paddingTop: 3,
                  paddingLeft: 5,
                  // fontFamily: 'Poppins-ThinItalic',
                }}
                contentStyle={{fontFamily: 'Poppins-Italic'}}
                placeholderTextColor={'rgba(102, 112, 128, 1)'}
                activeUnderlineColor={'transparent'}
                underlineColorAndroid={'transparent'}
                underlineColor={'transparent'}
                // editable={false}
                placeholderStyle={
                  {
                    // fontFamily: 'Poppins-ThinItalic',
                    // fontStyle: 'italic',
                  }
                }
              />
              <Image
                source={require('../../Assets/Images/sendLocation.png')}
                style={{marginRight: 10}}
              />

              <TouchableOpacity>
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
          </View>
        )}
      </SafeArea>
    </>
  );
};
