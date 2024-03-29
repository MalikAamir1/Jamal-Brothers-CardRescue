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
import Head from '../../Components/ReusableComponent/Head';
import ButtonComp from '../../Components/ReusableComponent/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ModalView } from '../../Components/ReusableComponent/Modal';
import CheckBox from '../../Components/ReusableComponent/Checkbox';
import { SuccessModal } from '../../Components/ReusableComponent/SuccessModal';
import { getRequestWithOutBody } from '../../App/fetch';
import { BASE_URL } from '../../App/api';
import { useSelector } from 'react-redux';
import { Loader } from '../../Components/ReusableComponent/Loader';

export const LostCards = ({ route }) => {
  const Navigation = useNavigation();
  const AuthReducer = useSelector(state => state.AuthReducer.userData);

  const [secondModal, setSecondModal] = useState(false);
  const [lostCards, setLostCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardTypeData, setCardTypeData] = useState([]);

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

  useEffect(() => {
    setLoading(true);
    getRequestWithOutBody(
      `${BASE_URL}/cards/active-card-types/`,
      AuthReducer.token,
    )
      .then(result => {
        console.log('result.results of card type', result.results)
        setCardTypeData(result.results); // Store issuer data
        getRequestWithOutBody(
          `${BASE_URL}/cards/lost-cards/`,
          AuthReducer.token,
        )
          .then(result => {
            console.log('result on lost cards', result.results)

            setLostCards(result.results);
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
      });
  }, []);

  // Function to fetch updated data from the server
  const fetchUpdatedData = async () => {
    try {
      // setLoading(true);
      const result = await getRequestWithOutBody(
        `${BASE_URL}/cards/lost-cards/`,
        AuthReducer.token
      );
      setLostCards(result.results);
      // setLoading(false);
    } catch (error) {
      console.log('Error fetching updated data:', error);
      // setLoading(false);
    }
  };

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
              if (item.found_by && item.found_by_user_profile) {
                Navigation.navigate('ChatScreen', {
                  // Additional parameters if needed
                  userInfo: item
                });
              } else {
                setSecondModal(true);
              }
            }}
          >
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
            marginHorizontal: '5%',
            marginTop: '5%',
            // marginBottom: Platform.OS === 'ios' ? '18%' : '28%',
          }}>
          <Header header={'Lost Cards'} screenName={true} />
        </View>
      </>
    );
  };

  // const ListFooterComponent = () => {
  //   return (
  //     <>
  //       <View
  //         style={{
  //           marginTop: 50,
  //           // marginBottom: 35,
  //           marginBottom: Platform.OS === 'ios' ? '18%' : '28%',

  //           // marginBottom: 50,
  //           margin: '5%',
  //           // position: 'absolute',
  //           // bottom: Platform.OS === 'ios' ? 0 : 55,
  //         }}>
  //         <View style={{ flexDirection: 'row' }}>
  //           <LinearGradient
  //             colors={['#FCDD8E', '#F9B401']}
  //             start={{ x: 0.5, y: -5 }}
  //             end={{ x: 0.4, y: 4 }}
  //             style={{
  //               flex: 1,
  //               marginLeft: 5,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //               marginRight: 5,
  //               // width: 181,
  //               width: 160,
  //               height: 56,
  //               borderRadius: 7,
  //             }}>
  //             <TouchableOpacity
  //               style={{
  //                 width: 190,
  //                 alignItems: 'center',
  //               }}
  //               onPress={() => {
  //                 Navigation.navigate('LostExistingCard');
  //               }}>
  //               <Text
  //                 style={{
  //                   color: '#0B105C',
  //                   fontSize: 16,
  //                   // fontWeight: 'bold',
  //                 }}>
  //                 Lost Existing Card?
  //               </Text>
  //             </TouchableOpacity>
  //           </LinearGradient>
  //           <LinearGradient
  //             colors={['#FCDD8E', '#F9B401']}
  //             start={{ x: 0.5, y: -5 }}
  //             end={{ x: 0.4, y: 4 }}
  //             style={{
  //               flex: 1,
  //               marginLeft: 5,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //               // width: 181,
  //               width: 160,
  //               borderRadius: 7,
  //             }}>
  //             <TouchableOpacity
  //               style={{
  //                 width: 190,
  //                 alignItems: 'center',
  //               }}
  //               onPress={() => {
  //                 Navigation.navigate('LostNewCard');
  //               }}>
  //               <Text
  //                 style={{
  //                   color: '#0B105C',
  //                   fontSize: 16,
  //                   // fontWeight: 'bold',
  //                 }}>
  //                 Lost New Card
  //               </Text>
  //             </TouchableOpacity>
  //           </LinearGradient>
  //         </View>
  //       </View>
  //     </>
  //   );
  // };

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
        {loading ? (
          <Loader />
        ) : (
          <View
            style={{
              flex: 1,
            }}>
            <View style={{ flex: 1, marginBottom: Platform.OS === 'ios' ? '43%' : '43%' }}>
              <View
                style={{
                  marginHorizontal: '5%',
                  marginTop: '5%',
                  // marginBottom: Platform.OS === 'ios' ? '18%' : '28%',
                  marginBottom: 15,
                }}>
                <Header header={'Lost Cards'} screenName={true} />
              </View>
              <FlatList
                data={lostCards}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <View
              style={{
                // marginTop: 50,
                //   marginBottom: Platform.OS === 'ios' ? '21%' : '38%',
                // margin: '5%',
                position: 'absolute',
                bottom: 90,
                left: 0,
                right: 0,
                // backgroundColor: 'transparent',
                paddingBottom: Platform.OS === 'ios' ? 20 : 0, // Adjust for iPhone X bottom safe area
              }}>
              <View style={{
                flexDirection: 'row', 
                justifyContent: 'space-between',
                marginHorizontal: '5%',
              }}>
                <LinearGradient
                  colors={['#FCDD8E', '#F9B401']}
                  start={{ x: 0.5, y: -5 }}
                  end={{ x: 0.4, y: 4 }}
                  style={{
                    flex: 1,
                    marginLeft: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 5,
                    // width: 181,
                    width: 160,
                    height: 56,
                    borderRadius: 7,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 190,
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      Navigation.navigate('LostExistingCard');
                    }}>
                    <Text
                      style={{
                        color: '#0B105C',
                        fontSize: 16,
                        // fontWeight: 'bold',
                      }}>
                      Lost Existing Card?
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                  colors={['#FCDD8E', '#F9B401']}
                  start={{ x: 0.5, y: -5 }}
                  end={{ x: 0.4, y: 4 }}
                  style={{
                    flex: 1,
                    marginLeft: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // width: 181,
                    width: 160,
                    borderRadius: 7,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 190,
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      Navigation.navigate('LostNewCard');
                    }}>
                    <Text
                      style={{
                        color: '#0B105C',
                        fontSize: 16,
                        // fontWeight: 'bold',
                      }}>
                      Lost New Card
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>

          </View>
        )}
      </SafeArea>
    </>
  );
};
