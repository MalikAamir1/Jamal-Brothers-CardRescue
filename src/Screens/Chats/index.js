import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  // TouchableOpacity,
  View,
} from 'react-native';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Heading from '../../Components/ReusableComponent/Heading';
import { Header } from '../../Components/ReusableComponent/Header';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { useCallback, useEffect, useState } from 'react';
import Head from '../../Components/ReusableComponent/Head';
import ButtonComp from '../../Components/ReusableComponent/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ModalView } from '../../Components/ReusableComponent/Modal';
import CheckBox from '../../Components/ReusableComponent/Checkbox';
import { SuccessModal } from '../../Components/ReusableComponent/SuccessModal';
import app from '../../Firebase/firebaseConfig';
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import { Loader } from '../../Components/ReusableComponent/Loader';
import { RefreshControl } from 'react-native-gesture-handler';
import { getRequestWithOutBody } from '../../App/fetch';
import { BASE_URL } from '../../App/api';

export const Chats = ({ navigation }) => {
  const Navigation = useNavigation();
  const AuthReducerID = useSelector(state => state.AuthReducer?.userData?.user?.id);
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [cardSelect, setCardSelect] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [userData, setUserData] = useState([]);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const loggedInUserEmail = AuthReducer?.userData?.user?.email;
  const display_name = AuthReducer?.userData?.user?.profile?.display_name;
  const [combinedDataState, setCombinedDataState] = useState([]); // New state variable
  const [loader, setloader] = useState(false);
  const [latestOne, setLatestOne] = useState([]);
  // console.log('eg', combinedDataState);

  const fetchData2 = async () => {
    try {
      const latestUpdate = await database().ref(`latest/${AuthReducerID}`).once('value');
      const latestUpdateArray = latestUpdate.val();
      setLatestOne(latestUpdateArray)

      getRequestWithOutBody(
        `${BASE_URL}/cards/match-cards/`,
        AuthReducer.userData.token,
      )
        .then(result => {
          const filteredUserData = result.results
          const combinedData = filteredUserData.map(user => {
            // const userId = user?.user_id;
            const latestMessageObject = latestUpdateArray?.[`${user?.card_type_id}_${user?.issuer_id}_${user?.card_number}`]?.[user?.to_user_id];
            console.log('result on match cards', latestMessageObject)
            const latestMessage = latestMessageObject?.text || '';
            const messageCount = latestMessageObject?.messageCount || '';
            const sentAt = latestMessageObject?.sentAt || '';
            const senderId = latestMessageObject?.sentBy || '';
            const readFlag = latestMessageObject?.readFlag || false;

            console.log('aaaaaaaaaaaaaa', latestMessage)
            return {
              ...user,
              latestMessage,
              readFlag,
              senderId,
              messageCount,
              sentAt
            };
          });

          setCombinedDataState(combinedData)
          setloader(false);
        })
        .catch(error => {
          console.log('error', error);
          setloader(false);
        });

    } catch (error) {
      console.error('Error fetching data:', error);
      setloader(false);
    }
  };

  useEffect(() => {
    setloader(true);
    fetchData2();
    // setloader(false);
  }, []);


  useEffect(() => {
    const messagesRef = database().ref(`latest/${AuthReducerID}`);
    messagesRef.on('value', fetchData2);

    return () => {
      messagesRef.off('value', fetchData2);
    };
  }, [AuthReducerID]);

  // console.log('userDatauserData', userData)

  const sortChatsByTime = (chats) => {
    return chats.sort((a, b) => {
      return new Date(b.sentAt) - new Date(a.sentAt);
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchData2();
    }, []),
  );

  const filteredData = userData.filter(item => {
    // Check if item's display_name is not equal to the one in the reducer
    return item.display_name !== display_name;
  });

  const navigationFunc = async (item) => {
    console.log('item for seen', item.readFlag)
    // const latestRef = database().ref(`latest/${item.to_user_id}/${item.card_type_id}_${item.issuer_id}_${item.card_number}/${AuthReducerID}`);
    const latestRef2 = database().ref(`latest/${AuthReducerID}/${item.card_type_id}_${item.issuer_id}_${item.card_number}/${item.to_user_id}`);

    // await latestRef.update({
    //   readFlag: true,
    //   messageCount: 0
    // });
    await latestRef2.update({
      readFlag: true,
      messageCount: 0
    });
    // console.log('item in func', item)
    Navigation.navigate('ChatScreen', { userInfo: item, screenName: 'Chats' })
  }

  const formatCardNumber = (cardNumber) => {
    const visibleDigits = 4;
    const maskedDigits = cardNumber.length - visibleDigits;
    const maskedPart = '*'.repeat(maskedDigits);
    const visiblePart = cardNumber.slice(-visibleDigits);
    return `${maskedPart}${visiblePart}`;
  };

  const renderItem = ({ item }) => {
    // Check if item.sentAt is defined and is a valid date
    const formattedSentAt = new Date(item.sentAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Set to false to display time without AM/PM
    });
    console.log('item for seen', formattedSentAt)

    return (
      <>
        <TouchableOpacity
          // onPress={() =>
          //   Navigation.navigate('ChatScreen', {userInfo: item})
          // }
          onPress={() => navigationFunc(item)}
        >
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              // marginHorizontal: '%',
              width: '96%',
              // marginBottom: 10,
            }}>
            <View
              style={{
                flex: 1,
                borderBottomColor: 'rgba(156, 156, 156, 0.7)',
                borderRadius: 7,
                borderBottomWidth: 0.5,
                height: 69,
                //   width: 332,
                marginTop: 10,
                marginHorizontal: '2%',
              }}>
              <View
                style={{
                  // justifyContent: 'space-between',
                  flexDirection: 'row',
                  // marginTop: 40,
                }}>
                <View>
                  <Image
                    source={{ uri: item.user_media ? `http://23.26.137.178:8000/media/${item.user_media}` : null }}
                    style={{
                      width: 57,
                      height: 57,
                      borderRadius: 28.5,
                      marginRight: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <View style={{ marginLeft: 2 }}>
                    <View
                      style={{
                        // flexDirection: 'row',
                        marginTop: 3,
                      }}>
                      <Heading
                        Heading={item.to_display_name.substring(0, 25)}
                        Fontsize={18}
                        Fontweight={item.sentBy == AuthReducerID || item.readFlag ? 'normal' : 800}
                        //   color={COLORS.dark}
                        color={'rgba(16, 35, 78, 1)'}
                      // Fontweight={'bold'}
                      // txtAlign={'center'}
                      />
                    </View>
                    <Heading
                      // Heading={`${item.card_type}, ${item.issuer_name}, ${formatCardNumber(item.card_number)}`}
                      Heading={`${item.latestMessage.substring(0, 30)}...`}
                      Fontsize={14}
                      color={'rgba(156, 156, 156, 1)'}
                      Fontweight={item.sentBy == AuthReducerID || item.readFlag ? 'normal' : 800}
                      // txtAlign={'center'}
                      mt={4}
                    // width={200}
                    // maxTextLength={35}
                    />
                  </View>
                  <View style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    marginRight: 10
                  }}>
                    <View
                      style={{
                        // marginLeft: 20,
                        // width: 14,
                        // height: 14,
                        // marginRight: 20,
                        width: 24,
                        height: 24,
                        // flexDirection: 'column',
                      }}>
                      {/* <View> */}
                      {item.messageCount ? (
                        <LinearGradient
                          colors={
                            ['rgba(252, 221, 142, 1)', 'rgba(249, 180, 1, 1)']}
                          start={{ x: 0.5, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.gradient}>
                          <Text
                            style={{
                              color: '#10234E',
                              fontSize: 12,
                            }}>
                            {item.messageCount}
                          </Text>
                        </LinearGradient>
                      ) : null}
                    </View>
                    <View>
                      <Heading
                        // Heading={`${item.card_type}, ${item.issuer_name}, ${formatCardNumber(item.card_number)}`}
                        Heading={formattedSentAt}
                        Fontsize={12}
                        color={'#9C9C9C'}
                        Fontweight={item.sentBy == AuthReducerID || item.readFlag ? 400 : 800}
                        // txtAlign={'center'}
                        mt={9}
                      // width={200}
                      // maxTextLength={35}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  // console.log('combinedDataState', combinedDataState)

  const ListHeaderComponent = () => {
    return (
      <>
        <View
          style={{
            marginHorizontal: '5%',
            // marginVertical: '5%',
            marginBottom: '7%',
          }}>
          <Header header={'Chats'} screenName={true} />
        </View>
      </>
    );
  };
  console.log('userData on chats ', userData.display_name);
  return (
    <>
      <SuccessModal
        set={setModalVisible}
        get={modalVisible}
        txt={'Card Add Successfully'}
        done={() => {
          setModalVisible(false);
          Navigation.navigate('LostCards');
        }}
        urlImg={require('../../Assets/Images/successIcon.png')}
        btntxt={'Done'}
        paratxt={
          "You should freeze your card with your bank until it's recovered or matched"
        }
      />

      <SafeArea style={{ flex: 1 }}>
        {loader ? (
          <Loader />
        ) : (
          <View
            style={{
              //   marginVertical: '5%',

              marginVertical: '5%',
              marginBottom: Platform.OS === 'ios' ? '13.5%' : '18%',
              // borderBottomColor: 'rgba(0, 0, 0, 0.1)',
              // borderBottomWidth: 1,
            }}>
            <FlatList
              data={sortChatsByTime(combinedDataState)}
              keyExtractor={item => item?.card_id}
              renderItem={renderItem}
              // keyExtractor={item => item.metal_id}
              contentContainerStyle={{
                flexDirection: 'column',
                paddingBottom: 70,
              }}
              ListHeaderComponent={ListHeaderComponent}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={loader}
                  onRefresh={() => {
                    // setRefreshing(true); // Start the refresh animation
                    fetchData2(); // Fetch new data
                  }}
                />
              }
            />
          </View>
        )}
      </SafeArea>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center',
  },
});
