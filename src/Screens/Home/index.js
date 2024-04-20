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
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SuccessModal } from '../../Components/ReusableComponent/SuccessModal';
import { useSelector } from 'react-redux';
import { getRequestWithOutBody } from '../../App/fetch';
import { BASE_URL } from '../../App/api';
import { Loader } from '../../Components/ReusableComponent/Loader';

export const Home = () => {
  const data = [
    {
      id: 1,
      type: 'Credit Card',
      cardNo: '****** ****** ****** 23456',
      holder: 'Billy Kane',
      day: '25',
      match: true,
    },
    {
      id: 2,
      type: 'Credit Card',
      cardNo: '****** ****** ****** 23456',
      holder: 'Billy Kane',
      day: '25',
      match: false,
    },
  ];
  const [lostCard, setLostCard] = useState(false);
  const Navigation = useNavigation();
  const [secondModal, setSecondModal] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [foundCards, setFoundCards] = useState([]);
  const [lostCardsData, setLostCardsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardTypeData, setCardTypeData] = useState([]);
  console.log('Authreducer', AuthReducer)

  useEffect(() => {
    setLoading(true);
    getRequestWithOutBody(
      `${BASE_URL}/cards/active-card-types/`,
      AuthReducer.userData.token,
    )
      .then(result => {
        // console.log('result.results of card type', result.results)
        setCardTypeData(result.results); // Store issuer data
        getRequestWithOutBody(
          `${BASE_URL}/cards/found-cards/`,
          AuthReducer.userData.token,
        )
          .then(result => {
            // console.log('result on lost cards', result.results)

            setFoundCards(result.results);
            getRequestWithOutBody(
              `${BASE_URL}/cards/lost-cards/`,
              AuthReducer.userData.token,
            )
              .then(result => {
                // console.log('result on lost cards', result.results)

                setLostCardsData(result.results);
                setLoading(false);
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

  // Function to fetch updated data from both found cards and lost cards
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

  const FoundCards = () => {
    setLostCard(false);
  };
  const CardsLost = () => {
    setLostCard(true);
  };

  const formatCardNumber = (cardNumber) => {
    const visibleDigits = 4;
    const maskedDigits = cardNumber.length - visibleDigits;
    const maskedPart = '*'.repeat(maskedDigits);
    const visiblePart = cardNumber.slice(-visibleDigits);
    return `${maskedPart}${visiblePart}`;
  };

  const ListEmptyComponent = () => {
    return (
      <>
        {loading ? <Loader /> : null}
      </>
    );
  };

  const renderItem = ({ item, index }) => {
    const cardType = cardTypeData.find((cardType) => cardType?.id === item?.card_type);
    const formattedCardNumber = formatCardNumber(item?.card_number);

    return (
      <>
        <View
          style={{
            borderColor: 'rgba(11, 16, 92, 0.1)',
            borderRadius: 7,
            borderWidth: 1,
            height: 138,
            // width: 342,
            // marginTop: 20,
            marginBottom: 22,
          }}>
          <Pressable
            onPress={() => {
              if ((item.found_by && item.found_by_user_profile) || (item.lost_by && item.lost_by_user_profile)) {
                Navigation.navigate('ChatScreen', {
                  userInfo: item,
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

  const ListHeaderComponent = () => {
    return (
      <>
        <View
          style={{
            marginHorizontal: '1%',
            // marginVertical: '5%',
            marginBottom: 20,
          }}>
          {/* <Header header={'Home'} /> */}

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 25,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Heading
                Stylefont={'normal'}
                Fontweight={'bold'}
                Fontsize={23}
                txtAlign={'center'}
                p={10}
                lh={31}
                Heading={'Hello,'}
                color={'rgba(11, 16, 92, 1)'}
                ml={-10}
              />
              <Heading
                Stylefont={'normal'}
                Fontweight={'bold'}
                Fontsize={23}
                // txtAlign={'center'}
                width={220}
                p={10}
                lh={31}
                Heading={AuthReducer?.userData?.user?.profile?.display_name}
                color={'rgba(249, 180, 1, 1)'}
                ml={-17}
              />
            </View>
            <View 
            // style={{
            //   width: 46,
            //   height: 46,
            //   // alignSelf: 'center',
            //   // marginTop: -10,
            //   // marginBottom: '8%',
            //   // backgroundColor: 'white',
            //   // borderWidth: 2,
            //   // borderColor: 'rgba(11, 16, 92, 0.3)',
            //   borderRadius: 75,
            // }}
            >
              <Image
                // source={require('../../Assets/Images/homeImg.png')}
                source={{
                  uri: `http://23.26.137.178:8000//${AuthReducer?.userData?.user?.profile?.profile_pic}`,
                }}
                style={{
                  width: 44,
                  height: 44,
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  borderRadius: 75,

                }}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 14,
            }}>
            <View
              style={{
                borderColor: 'rgba(11, 16, 92, 0.1)',
                borderRadius: 10,
                borderWidth: 1,
                height: 249,
                // width: 171,
                flex: 1,
                marginRight: 2,
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 15,
                }}>
                <Image
                  source={require('../../Assets/Images/atmcard.png')}
                  style={{
                    // width: 44,
                    // height: 44,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                />
                <View
                  style={{
                    width: 31,
                    height: 31,
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    backgroundColor: 'rgba(220, 0, 0, 1)',
                    borderWidth: 3,
                    borderColor: 'white',
                    borderRadius: 75,
                    marginTop: 42,
                    // padding: 2
                  }}>
                  <Entypo name="cross" size={26} color={'white'} />
                </View>
              </View>
              <View style={{ alignSelf: 'center' }}>
                <Heading
                  Stylefont={'normal'}
                  // Fontweight={'bold'}
                  Fontsize={18}
                  txtAlign={'center'}
                  //   p={10}
                  lh={23}
                  Heading={'Report Lost Card'}
                  color={'rgba(11, 16, 92, 1)'}
                  mt={20}
                  width={118}
                />
              </View>
              <Heading
                Stylefont={'normal'}
                // Fontweight={'bold'}
                Fontsize={11}
                txtAlign={'center'}
                // p={10}
                lh={15}
                Heading={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                }
                color={'rgba(102, 112, 128, 1)'}
                ml={-3}
                mb={20}
              // width={170}
              />
              {/* <View style={{alignSelf: 'center'}} */}
              <Pressable
                onPress={() => {
                  Navigation.navigate('LostNewCard');
                }}>
                <LinearGradient
                  colors={['#FCDD8E', '#F9B401']}
                  start={{ x: 0.5, y: -5 }}
                  end={{ x: 0.4, y: 4 }}
                  style={{
                    // flex: 1,
                    height: 30,
                    marginHorizontal: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 100,
                    borderRadius: 7,
                  }}>
                  <Heading
                    color={'#0B105C'}
                    Fontsize={12}
                    Heading={'Submit Form'}
                    // width={60}
                    txtAlign={'center'}
                  />
                </LinearGradient>
              </Pressable>
            </View>
            <View
              style={{
                borderColor: 'rgba(11, 16, 92, 0.1)',
                borderRadius: 10,
                borderWidth: 1,
                height: 249,
                width: 171,
                flex: 1,
              }}>
              <View style={{ alignSelf: 'center', marginTop: 15 }}>
                <Image
                  source={require('../../Assets/Images/atmcard2.png')}
                  style={{
                    width: 69,
                    height: 72,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                />
              </View>
              <View style={{ alignSelf: 'center' }}>
                <Heading
                  Stylefont={'normal'}
                  // Fontweight={'bold'}
                  Fontsize={18}
                  txtAlign={'center'}
                  //   p={10}
                  lh={23}
                  Heading={'Report Found Card'}
                  color={'rgba(11, 16, 92, 1)'}
                  mt={12}
                  width={118}
                />
              </View>
              <Heading
                Stylefont={'normal'}
                // Fontweight={'bold'}
                Fontsize={11}
                txtAlign={'center'}
                // p={10}
                lh={15}
                Heading={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                }
                color={'rgba(102, 112, 128, 1)'}
                ml={-3}
                mb={20}
              // width={170}
              />
              {/* <View style={{alignSelf: 'center'}} */}
              <Pressable
                onPress={() => {
                  Navigation.navigate('FoundCard');
                }}>
                <LinearGradient
                  colors={['#FCDD8E', '#F9B401']}
                  start={{ x: 0.5, y: -5 }}
                  end={{ x: 0.4, y: 4 }}
                  style={{
                    // flex: 1,
                    height: 30,
                    // marginLeft: 33,
                    marginHorizontal: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 100,
                    borderRadius: 7,
                  }}>
                  <Heading
                    color={'#0B105C'}
                    Fontsize={12}
                    Heading={'Submit Form'}
                    // width={60}
                    txtAlign={'center'}
                  />
                </LinearGradient>
              </Pressable>
            </View>
          </View>
          {lostCard ? (
            <View
              style={{
                borderColor: 'rgba(11, 16, 92, 0.1)',
                borderWidth: 2,
                borderRadius: 5,
                height: 56,
                width: '100%',
                marginTop: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
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
            </View>
          ) : (
            <View
              style={{
                borderColor: 'rgba(11, 16, 92, 0.1)',
                borderWidth: 2,
                borderRadius: 5,
                height: 56,
                width: '100%',
                marginTop: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
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
            marginHorizontal: '6%',
            marginVertical: '5%',            // marginVertical: '5%',
            // marginBottom: 20,
          }}>
          <Header header={'Home'} />
        </View>
        <View
          style={{
            marginHorizontal: '5%',
            // marginVertical: '5%',
            marginBottom: Platform.OS === 'ios' ? '30%' : '32%',
            // borderBottomColor: 'rgba(0, 0, 0, 0.1)',
            // borderBottomWidth: 1,
          }}>
          <FlatList
            data={lostCard ? lostCardsData : foundCards}
            renderItem={renderItem}
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
