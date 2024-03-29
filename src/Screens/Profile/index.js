import {
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import HeadWithIcon from '../../Components/ReusableComponent/HeadWithIcon';
import Heading from '../../Components/ReusableComponent/Heading';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SuccessModal } from '../../Components/ReusableComponent/SuccessModal';
import { useSelector } from 'react-redux';
import { getRequestWithOutBody } from '../../App/fetch';
import { BASE_URL } from '../../App/api';
import { Loader } from '../../Components/ReusableComponent/Loader';

export const Profile = ({ route }) => {
  const [lostCard, setLostCard] = useState(1);
  const Navigation = useNavigation();
  const [secondModal, setSecondModal] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [foundCards, setFoundCards] = useState([]);
  const [lostCardsData, setLostCardsData] = useState([]);
  const [myCards, setMyCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardTypeData, setCardTypeData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getRequestWithOutBody(
      `${BASE_URL}/cards/active-card-types/`,
      AuthReducer.userData.token,
    )
      .then(result => {
        console.log('result.results of card type', result.results)
        setCardTypeData(result.results); // Store issuer data
        getRequestWithOutBody(
          `${BASE_URL}/cards/found-cards/`,
          AuthReducer.userData.token,
        )
          .then(result => {
            console.log('result on lost cards', result.results)

            setFoundCards(result.results);
            getRequestWithOutBody(
              `${BASE_URL}/cards/lost-cards/`,
              AuthReducer.userData.token,
            )
              .then(result => {
                console.log('result on lost cards', result.results)

                setLostCardsData(result.results);
                getRequestWithOutBody(
                  `${BASE_URL}/cards/my-cards/`,
                  AuthReducer.userData.token,
                )
                  .then(result => {
                    console.log('result on lost cards', result.results)

                    setMyCards(result.results);
                    setLoading(false);
                    // setCardTypeData(result.results); // Store issuer data
                  })
                  .catch(error => {
                    console.log('error', error);
                    setLoading(false);
                  });
                // setLoading(false);
                // setCardTypeData(result.results); // Store issuer data
              })
              .catch(error => {
                console.log('error', error);
                setLoading(false);
              });
          })
          .catch(error => {
            console.log('error', error);
            setLoading(false);
          });
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }, []);

  const fetchUpdatedData = async () => {
    try {
      // setLoading(true);

      // Fetch found cards data
      const foundCardsResult = await getRequestWithOutBody(
        `${BASE_URL}/cards/found-cards/`,
        AuthReducer.userData.token
      );
      setFoundCards(foundCardsResult.results);

      // Fetch lost cards data
      const lostCardsResult = await getRequestWithOutBody(
        `${BASE_URL}/cards/lost-cards/`,
        AuthReducer.userData.token
      );
      setLostCardsData(lostCardsResult.results);

      // Fetch my cards data
      const myCardsResult = await getRequestWithOutBody(
        `${BASE_URL}/cards/my-cards/`,
        AuthReducer.userData.token
      );
      setMyCards(lostCardsResult.results);

      // setLoading(false);
    } catch (error) {
      console.log('Error fetching updated data:', error);
      // setLoading(false);
    }
  };

  // useFocusEffect to fetch updated data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUpdatedData();
    }, [])
  );

  const formatCardNumber = (cardNumber) => {
    const visibleDigits = 4;
    const maskedDigits = cardNumber.length - visibleDigits;
    const maskedPart = '*'.repeat(maskedDigits);
    const visiblePart = cardNumber.slice(-visibleDigits);
    return `${maskedPart}${visiblePart}`;
  };

  const FoundCards = () => {
    setLostCard(1);
  };
  const CardsLost = () => {
    setLostCard(2);
  };
  const Mycards = () => {
    setLostCard(3);
  };

  // const data = [
  //   {
  //     id: 1,
  //     type: 'Credit Card',
  //     cardNo: '****** ****** ****** 23456',
  //     holder: 'Billy Kane',
  //     day: '25',
  //     match: true,
  //   },
  //   {
  //     id: 2,
  //     type: 'Credit Card',
  //     cardNo: '****** ****** ****** 23456',
  //     holder: 'Billy Kane',
  //     day: '25',
  //     match: false,
  //   },
  // ];

  // const ListEmptyComponent = () => {
  //   return (
  //     <Loader />
  //   );
  // };

  const renderItem = ({ item }) => {
    const cardType = cardTypeData.find((cardType) => cardType?.id === item?.card_type);
    const formattedCardNumber = formatCardNumber(item?.card_number);

    return (
      <>
        <View
          style={{
            borderColor: 'rgba(11, 16, 92, 0.1)',
            marginHorizontal: '5%',
            borderRadius: 7,
            borderWidth: 1,
            height: 138,
            // width: 342,
            marginTop: 20,
          }}>
          <Pressable
            onPress={() => {
              if (item.lost_by && item.lost_by_user_profile) {
                Navigation.navigate('ChatScreen', {
                  // Additional parameters if needed
                  userInfo: item
                });
              } else {
                setSecondModal(true);
              }
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                // marginTop: 40,
              }}>
              <View>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={14}
                    mt={20}
                    lh={18}
                    Heading={'Card Type'}
                    color={'rgba(16, 35, 78, 1)'}
                    ml={20}
                  />
                  <Heading
                    Stylefont={'normal'}
                    // Fontweight={'bold'}
                    Fontsize={14}
                    txtAlign={'left'}
                    // p={10}
                    lh={18}
                    Heading={cardType?.card_type || 'N/A'}
                    color={'rgba(102, 112, 128, 1)'}
                    ml={Platform.OS === 'ios' ? 21 : 21}
                    mt={5}
                  />
                </View>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={14}
                    mt={20}
                    lh={18}
                    Heading={'Card Number'}
                    color={'rgba(16, 35, 78, 1)'}
                    ml={20}
                  />
                  <Heading
                    Stylefont={'normal'}
                    // Fontweight={'bold'}
                    Fontsize={14}
                    txtAlign={'center'}
                    // p={10}
                    lh={18}
                    Heading={formattedCardNumber}
                    color={'rgba(102, 112, 128, 1)'}
                    ml={Platform.OS === 'ios' ? 21 : 21}
                    mt={5}
                  />
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 20,
                }}>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={14}
                    mt={20}
                    lh={18}
                    txtAlign={'right'}
                    Heading={'Card Holder'}
                    color={'rgba(16, 35, 78, 1)'}
                  // ml={-20}
                  />
                  <Heading
                    Stylefont={'normal'}
                    // Fontweight={'bold'}
                    Fontsize={14}
                    // txtAlign={'center'}
                    // p={10}
                    lh={18}
                    Heading={item.card_holder.substring(0, 15)}
                    color={'rgba(102, 112, 128, 1)'}
                    // ml={16}
                    txtAlign={'right'}
                    mt={5}
                  />
                </View>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={14}
                    mt={20}
                    lh={18}
                    Heading={'Day'}
                    color={'rgba(16, 35, 78, 1)'}
                    txtAlign={'right'}
                  // ml={20}
                  />
                  <Heading
                    Stylefont={'normal'}
                    // Fontweight={'bold'}
                    Fontsize={14}
                    txtAlign={'right'}
                    // p={10}
                    lh={18}
                    Heading={item.card_holding_days}
                    color={'rgba(102, 112, 128, 1)'}
                    // ml={20}
                    mt={5}
                  />
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </>
    );
  };

  const renderItem2 = ({ item }) => {
    const cardType = cardTypeData.find((cardType) => cardType?.id === item?.card_type);
    const formattedCardNumber = formatCardNumber(item?.card_number);

    return (
      <>
        <View
          style={{
            borderColor: 'rgba(11, 16, 92, 0.1)',
            marginHorizontal: '5%',
            borderRadius: 7,
            borderWidth: 1,
            height: 138,
            // width: 342,
            marginTop: 20,
          }}>
          <Pressable
            onPress={() => {
              if (item.found_by && item.found_by_user_profile) {
                Navigation.navigate('ChatScreen', {
                  // Additional parameters if needed
                  userInfo: item
                });
              } else {
                setSecondModal(true);
              }
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                // marginTop: 40,
              }}>
              <View>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={14}
                    mt={20}
                    lh={18}
                    Heading={'Card Type'}
                    color={'rgba(16, 35, 78, 1)'}
                    ml={20}
                  />
                  <Heading
                    Stylefont={'normal'}
                    // Fontweight={'bold'}
                    Fontsize={14}
                    txtAlign={'left'}
                    // p={10}
                    lh={18}
                    Heading={cardType?.card_type || 'N/A'}
                    color={'rgba(102, 112, 128, 1)'}
                    ml={Platform.OS === 'ios' ? 21 : 21}
                    mt={5}
                  />
                </View>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={14}
                    mt={20}
                    lh={18}
                    Heading={'Card Number'}
                    color={'rgba(16, 35, 78, 1)'}
                    ml={20}
                  />
                  <Heading
                    Stylefont={'normal'}
                    // Fontweight={'bold'}
                    Fontsize={14}
                    txtAlign={'center'}
                    // p={10}
                    lh={18}
                    Heading={formattedCardNumber}
                    color={'rgba(102, 112, 128, 1)'}
                    ml={Platform.OS === 'ios' ? 21 : 21}
                    mt={5}
                  />
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 20,
                }}>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={14}
                    mt={20}
                    lh={18}
                    txtAlign={'right'}
                    Heading={'Card Holder'}
                    color={'rgba(16, 35, 78, 1)'}
                  // ml={-20}
                  />
                  <Heading
                    Stylefont={'normal'}
                    // Fontweight={'bold'}
                    Fontsize={14}
                    // txtAlign={'center'}
                    // p={10}
                    lh={18}
                    Heading={item.card_holder.substring(0, 15)}
                    color={'rgba(102, 112, 128, 1)'}
                    // ml={16}
                    txtAlign={'right'}
                    mt={5}
                  />
                </View>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={14}
                    mt={20}
                    lh={18}
                    Heading={'Day'}
                    color={'rgba(16, 35, 78, 1)'}
                    txtAlign={'right'}
                  // ml={20}
                  />
                  <Heading
                    Stylefont={'normal'}
                    // Fontweight={'bold'}
                    Fontsize={14}
                    txtAlign={'right'}
                    // p={10}
                    lh={18}
                    Heading={item.card_holding_days}
                    color={'rgba(102, 112, 128, 1)'}
                    // ml={20}
                    mt={5}
                  />
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </>
    );
  };
  const renderItem3 = ({ item }) => {
    const cardType = cardTypeData.find((cardType) => cardType?.id === item?.card_type);
    const formattedCardNumber = formatCardNumber(item?.card_number);

    return (
      <>
        <View
          style={{
            borderColor: 'rgba(11, 16, 92, 0.1)',
            marginHorizontal: '5%',
            borderRadius: 7,
            borderWidth: 1,
            height: 138,
            // width: 342,
            marginTop: 20,
          }}>
          <Pressable
            onPress={() => {
              Navigation.navigate('MyCards', {
                prevName: 'Profile',
              });
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                // marginTop: 40,
              }}>
              <View>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={14}
                    mt={20}
                    lh={18}
                    Heading={'Card Type'}
                    color={'rgba(16, 35, 78, 1)'}
                    ml={20}
                  />
                  <Heading
                    Stylefont={'normal'}
                    // Fontweight={'bold'}
                    Fontsize={14}
                    txtAlign={'left'}
                    // p={10}
                    lh={18}
                    Heading={cardType?.card_type || 'N/A'}
                    color={'rgba(102, 112, 128, 1)'}
                    ml={Platform.OS === 'ios' ? 21 : 21}
                    mt={5}
                  />
                </View>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={14}
                    mt={20}
                    lh={18}
                    Heading={'Card Number'}
                    color={'rgba(16, 35, 78, 1)'}
                    ml={20}
                  />
                  <Heading
                    Stylefont={'normal'}
                    // Fontweight={'bold'}
                    Fontsize={14}
                    txtAlign={'center'}
                    // p={10}
                    lh={18}
                    Heading={formattedCardNumber}
                    color={'rgba(102, 112, 128, 1)'}
                    ml={Platform.OS === 'ios' ? 21 : 21}
                    mt={5}
                  />
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 20,
                }}>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={14}
                    mt={20}
                    lh={18}
                    txtAlign={'right'}
                    Heading={'Card Holder'}
                    color={'rgba(16, 35, 78, 1)'}
                  // ml={-20}
                  />
                  <Heading
                    Stylefont={'normal'}
                    // Fontweight={'bold'}
                    Fontsize={14}
                    // txtAlign={'center'}
                    // p={10}
                    lh={18}
                    Heading={item.card_holder.substring(0, 15)}
                    color={'rgba(102, 112, 128, 1)'}
                    // ml={16}
                    txtAlign={'right'}
                    mt={5}
                  />
                </View>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={14}
                    mt={20}
                    lh={18}
                    Heading={'Day'}
                    color={'rgba(16, 35, 78, 1)'}
                    txtAlign={'right'}
                  // ml={20}
                  />
                  <Heading
                    Stylefont={'normal'}
                    // Fontweight={'bold'}
                    Fontsize={14}
                    txtAlign={'right'}
                    // p={10}
                    lh={18}
                    Heading={item.card_holding_days}
                    color={'rgba(102, 112, 128, 1)'}
                    // ml={20}
                    mt={5}
                  />
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <>
        {loading ? <View style={{ marginTop: 20 }}><Loader /></View> : null}
      </>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <View>


          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                alignItems: 'center',
                margin: 20,
                marginTop: 30,
              }}>
              <View
                style={{
                  width: 98,
                  height: 98,
                  alignSelf: 'center',
                  // marginTop: '8%',
                  // marginBottom: '8%',
                  backgroundColor: 'white',
                  borderWidth: 2,
                  borderColor: 'rgba(11, 16, 92, 0.3)',
                  borderRadius: 75,
                }}>
                <Image
                  // source={require('../../Assets/Images/profileImage.png')}
                  source={{
                    // uri: `https://jbpl.pythonanywhere.com${AuthReducer?.userData?.user?.profile?.profile_pic}`,
                    uri: `http://23.26.137.178:8000//${AuthReducer?.userData?.user?.profile?.profile_pic}`,
                  }}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: 87,
                    height: 89,
                    marginTop: 2,
                    borderRadius: 75,
                  }}
                  resizeMode={'cover'}
                />
              </View>
            </View>
            <View style={{ marginTop: 24, marginLeft: -5 }}>
              <Heading
                Stylefont={'normal'}
                Fontweight={'bold'}
                Fontsize={24}
                // txtAlign={'center'}
                // p={10}
                lh={26}
                Heading={AuthReducer?.userData?.user?.profile?.display_name}
                color={'rgba(16, 35, 78, 1)'}
                // ml={-10}
                //   mb={20}
                //   width={170}
                mt={10}
                width={220}
              // ml={-32}
              />
              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <FontAwesome
                  name="envelope-o"
                  size={18}
                  color="rgba(156, 156, 156, 1)"
                // style={{paddingLeft: 5}}
                />
                <Heading
                  Stylefont={'normal'}
                  // Fontweight={'bold'}
                  Fontsize={13}
                  // txtAlign={'center'}
                  // p={10}
                  // lh={26}
                  Heading={AuthReducer?.userData?.user?.email}
                  color={'rgba(0, 36, 97, 1)'}
                  ml={10}
                  // mr={40}
                //   mb={20}
                  width={190}
                // mt={10}
                />
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                <Feather
                  name="phone"
                  size={18}
                  color="rgba(156, 156, 156, 1)"
                // style={{paddingLeft: 5}}
                />
                <Heading
                  Stylefont={'normal'}
                  // Fontweight={'bold'}
                  Fontsize={13}
                  txtAlign={'center'}
                  // p={10}
                  // lh={26}
                  Heading={AuthReducer?.userData?.user?.profile?.telephone}
                  color={'rgba(0, 36, 97, 1)'}
                  ml={10}
                //   mb={20}
                //   width={170}
                // mt={10}
                />
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                <EvilIcons
                  name="location"
                  size={28}
                  color="rgba(156, 156, 156, 1)"
                  style={{ marginLeft: -5 }}
                />
                <Heading
                  Stylefont={'normal'}
                  // Fontweight={'bold'}
                  Fontsize={13}
                  // txtAlign={'center'}
                  // p={10}
                  // lh={26}
                  Heading={AuthReducer?.userData?.user?.profile?.street}
                  color={'rgba(0, 36, 97, 1)'}
                  ml={7}
                  //   mb={20}
                  width={200}
                // mt={10}
                />
              </View>
            </View>
          </View>
          {lostCard == 2 ? (
            <View
              style={{
                borderColor: 'rgba(11, 16, 92, 0.1)',
                borderWidth: 2,
                borderRadius: 5,
                height: 56,
                width: '90%',
                marginTop: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginLeft: 20,
              }}>
              <TouchableOpacity
                style={{
                  //   width: 190,
                  alignItems: 'center',
                  flex: 1,
                  // marginLeft: 40,
                  justifyContent: 'center',
                  width: '30%',
                  borderRadius: 7,
                  borderColor: 'white',
                  borderWidth: 3,
                }}
                onPress={FoundCards}>
                <Text
                  style={{
                    color: '#10234E',
                    fontSize: 14,
                    // fontWeight: 'bold',
                  }}>
                  Found Cards
                </Text>
              </TouchableOpacity>
              <LinearGradient
                colors={['#0B105C', '#407BFF']}
                start={{ x: 2, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  flex: 1,
                  // marginLeft: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '30%',
                  borderRadius: 7,
                  borderColor: 'white',
                  borderWidth: 3,
                  // shadowColor: 'rgba(11, 16, 92, 0.3)',
                  // shadowOffset: {width: 0, height: 15},
                  // shadowOpacity: 1,
                  // shadowRadius: 40,
                }}>
                <TouchableOpacity
                  style={{
                    //   width: 190,
                    alignItems: 'center',
                  }}
                // onPress={setLostCard(false)}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      // fontWeight: 'bold',
                    }}>
                    Lost Cards
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              <TouchableOpacity
                style={{
                  //   width: 190,
                  alignItems: 'center',
                  flex: 1,
                  // marginLeft: 40,
                  justifyContent: 'center',
                  width: '52%',
                  borderRadius: 7,
                  borderColor: 'white',
                  borderWidth: 3,
                }}
                onPress={Mycards}>
                <Text
                  style={{
                    color: '#10234E',
                    fontSize: 14,
                    // fontWeight: 'bold',
                  }}>
                  My Cards
                </Text>
              </TouchableOpacity>
            </View>
          ) : lostCard == 1 ? (
            <View
              style={{
                borderColor: 'rgba(11, 16, 92, 0.1)',
                borderWidth: 2,
                borderRadius: 5,
                height: 56,
                width: '90%',
                marginTop: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginLeft: 20,
              }}>
              <LinearGradient
                colors={['#0B105C', '#407BFF']}
                start={{ x: 2, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  flex: 1,
                  // marginLeft: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '52%',
                  borderRadius: 7,
                  borderColor: 'white',
                  borderWidth: 3,
                }}>
                <TouchableOpacity
                  style={{
                    //   width: 190,
                    alignItems: 'center',
                  }}
                //   onPress={yes}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      // fontWeight: 'bold',
                    }}>
                    Found Cards
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              <TouchableOpacity
                style={{
                  //   width: 190,
                  alignItems: 'center',
                  flex: 1,
                  // marginLeft: 40,
                  justifyContent: 'center',
                  width: '52%',
                  borderRadius: 7,
                  borderColor: 'white',
                  borderWidth: 3,
                }}
                onPress={CardsLost}>
                <Text
                  style={{
                    color: '#10234E',
                    fontSize: 14,
                    // fontWeight: 'bold',
                  }}>
                  Lost Cards
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  //   width: 190,
                  alignItems: 'center',
                  flex: 1,
                  // marginLeft: 40,
                  justifyContent: 'center',
                  width: '52%',
                  borderRadius: 7,
                  borderColor: 'white',
                  borderWidth: 3,
                }}
                onPress={Mycards}>
                <Text
                  style={{
                    color: '#10234E',
                    fontSize: 14,
                    // fontWeight: 'bold',
                  }}>
                  My Cards
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                borderColor: 'rgba(11, 16, 92, 0.1)',
                borderWidth: 2,
                borderRadius: 5,
                height: 56,
                width: '90%',
                marginTop: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginLeft: 20,
              }}>
              <TouchableOpacity
                style={{
                  //   width: 190,
                  alignItems: 'center',
                  flex: 1,
                  // marginLeft: 40,
                  justifyContent: 'center',
                  width: '52%',
                  borderRadius: 7,
                  borderColor: 'white',
                  borderWidth: 3,
                }}
                onPress={FoundCards}>
                <Text
                  style={{
                    color: '#10234E',
                    fontSize: 14,
                    // fontWeight: 'bold',
                  }}>
                  Found Cards
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  //   width: 190,
                  alignItems: 'center',
                  flex: 1,
                  // marginLeft: 40,
                  justifyContent: 'center',
                  width: '52%',
                  borderRadius: 7,
                  borderColor: 'white',
                  borderWidth: 3,
                }}
                onPress={CardsLost}>
                <Text
                  style={{
                    color: '#10234E',
                    fontSize: 14,
                    // fontWeight: 'bold',
                  }}>
                  Lost Cards
                </Text>
              </TouchableOpacity>
              <LinearGradient
                colors={['#0B105C', '#407BFF']}
                start={{ x: 2, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  flex: 1,
                  // marginLeft: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '52%',
                  borderRadius: 7,
                  borderColor: 'white',
                  borderWidth: 3,
                }}>
                <TouchableOpacity
                  style={{
                    //   width: 190,
                    alignItems: 'center',
                  }}
                //   onPress={yes}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      // fontWeight: 'bold',
                    }}>
                    My Cards
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
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
        txt={'Sorry, no match was found'}
        done={() => {
          setSecondModal(false);
        }}
        urlImg={require('../../Assets/Images/unsuccessful.png')}
        btntxt={'Go Back'}
      />
      <SafeArea>
        <View
          style={{
            //   marginVertical: '5%',
            marginBottom: Platform.OS === 'ios' ? '18%' : '18%',
          }}>
          <View style={{ marginBottom: 10 }}>
            <HeadWithIcon head={'Profile'} screenName={true} />
          </View>
          <FlatList
            data={lostCard == 1
              ? foundCards
              : lostCard == 2
                ? lostCardsData
                : myCards}
            renderItem={
              lostCard == 1
                ? renderItem
                : lostCard == 2
                  ? renderItem2
                  : renderItem3
            }
            keyExtractor={item => item.id}
            contentContainerStyle={{ flexDirection: 'column' }}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={ListEmptyComponent} // Rendered when the list is empty
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeArea>
    </>
  );
};
