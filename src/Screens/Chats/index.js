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
import {Header} from '../../Components/ReusableComponent/Header';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {useCallback, useEffect, useState} from 'react';
import Head from '../../Components/ReusableComponent/Head';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ModalView} from '../../Components/ReusableComponent/Modal';
import CheckBox from '../../Components/ReusableComponent/Checkbox';
import {SuccessModal} from '../../Components/ReusableComponent/SuccessModal';
import app from '../../Firebase/firebaseConfig';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {Loader} from '../../Components/ReusableComponent/Loader';
import {RefreshControl} from 'react-native-gesture-handler';

export const Chats = ({navigation}) => {
  const Navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [cardSelect, setCardSelect] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [userData, setUserData] = useState([]);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const loggedInUserEmail = AuthReducer?.userData?.user?.email;
  const display_name = AuthReducer?.userData?.user?.profile?.display_name;
  const [loader, setloader] = useState(false);
  console.log('eg', display_name);

  useEffect(() => {
    setloader(true);
    const fetchData = async () => {
      try {
        const snapshot = await database().ref('users').once('value');

        const chatData = snapshot.val();
        if (chatData) {
          const chatArray = Object.values(chatData);
          const filteredUserData = chatArray.filter(
            user => user.email !== loggedInUserEmail,
          );
          // console.log('eghjyb', filteredUserData);

          setUserData(filteredUserData);
          setloader(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setloader(false);
      }
    };

    fetchData();
  }, []);
  // console.log('storedUsevrDataa:', userData.display_name);

  // useEffect(() => {
  // const storedUserRef = app.database().ref('users');
  // storedUserRef.once('value', async snapshot => {
  //   const userData = snapshot.val();
  // console.log('storedUserData:', storedUserRef);
  // setStoreUsers(userData);
  // });
  // }, []);

  // const data = [
  //   {
  //     id: 1,
  //     head: 'Mia William',
  //     description: 'great idea',
  //     time: '12:30',
  //     image: require('../../Assets/Images/chatuser1.png'),
  //   },
  //   {
  //     id: 2,
  //     head: 'Marvin',
  //     description: 'great idea',
  //     time: '12:30',
  //     image: require('../../Assets/Images/chatuser2.png'),
  //   },
  //   {
  //     id: 3,
  //     head: 'Esther Wade',
  //     description: 'great idea',
  //     time: '12:30',
  //     image: require('../../Assets/Images/chatuser3.png'),
  //   },
  //   {
  //     id: 4,
  //     head: 'Kristin',
  //     description: 'great idea',
  //     time: '12:30',
  //     image: require('../../Assets/Images/chatuser4.png'),
  //   },
  //   {
  //     id: 5,
  //     head: 'Annette',
  //     description: 'great idea',
  //     time: '12:30',
  //     image: require('../../Assets/Images/chatuser5.png'),
  //   },
  //   {
  //     id: 6,
  //     head: 'Brooklyn',
  //     description: 'great idea',
  //     time: '12:30',
  //     image: require('../../Assets/Images/chatuser6.png'),
  //   },
  //   {
  //     id: 7,
  //     head: 'Wade',
  //     description: 'great idea',
  //     time: '12:30',
  //     image: require('../../Assets/Images/chatuser7.png'),
  //   },
  // ];

  const getData = () => {
    setloader(true);
    const fetchData = async () => {
      try {
        const snapshot = await database().ref('users').once('value');

        const chatData = snapshot.val();
        if (chatData) {
          const chatArray = Object.values(chatData);
          const filteredUserData = chatArray.filter(
            user => user.email !== loggedInUserEmail,
          );
          // console.log('eghjyb', filteredUserData);

          setUserData(filteredUserData);
          setloader(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setloader(false);
      }
    };

    fetchData();
  };

  useFocusEffect(
    useCallback(() => {
      setloader(true);
      getData();
    }, []),
  );

  const filteredData = userData.filter(item => {
    // Check if item's display_name is not equal to the one in the reducer
    return item.display_name !== display_name;
  });

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            Navigation.navigate('ChatScreen', {userToken: item.token})
          }>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              // marginHorizontal: '%',
              width: '100%',
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
                    source={{uri: item.profileImage ? item.profileImage : null}}
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
                  <View style={{marginLeft: 2}}>
                    <View
                      style={{
                        // flexDirection: 'row',
                        marginTop: 3,
                      }}>
                      <Heading
                        Heading={item.display_name}
                        Fontsize={18}
                        //   color={COLORS.dark}
                        color={'rgba(16, 35, 78, 1)'}
                        // Fontweight={'bold'}
                        // txtAlign={'center'}
                      />
                    </View>
                    <Heading
                      Heading={item.latestMessage}
                      Fontsize={14}
                      color={'rgba(156, 156, 156, 1)'}
                      // txtAlign={'center'}
                      mt={5}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: 20,
                      flexDirection: 'column',
                    }}>
                    <View>
                      <Image
                        source={require('../../Assets/Images/notificationquantity.png')}
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

      <SafeArea style={{flex: 1}}>
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
              data={filteredData}
              keyExtractor={item => item.token}
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
                    getData(); // Fetch new data
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
