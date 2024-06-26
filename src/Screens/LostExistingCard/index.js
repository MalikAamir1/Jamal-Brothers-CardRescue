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
import { useSelector } from 'react-redux';
import { getRequestWithOutBody, putRequestWithToken } from '../../App/fetch';
import { BASE_URL } from '../../App/api';
import { Loader } from '../../Components/ReusableComponent/Loader';

export const LostExistingCard = () => {
  const Navigation = useNavigation();
  const AuthReducer = useSelector(state => state.AuthReducer.userData);

  const [modalVisible, setModalVisible] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [cardSelect, setCardSelect] = useState(false);
  const [myCards, setMyCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardTypeData, setCardTypeData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState();

  const data = [
    {
      id: 1,
      type: 'Credit Card',
      cardNo: '****** ****** ****** 23456',
      holder: 'Billy Kane',
      day: '25',
      match: false,
    },
    {
      id: 2,
      type: 'Credit Card',
      cardNo: '****** ****** ****** 23456',
      holder: 'Billy Kane',
      day: '25',
      match: true,
    },
  ];

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
          `${BASE_URL}/cards/my-cards/`,
          AuthReducer.token,
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
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  const fetchUpdatedData = async () => {
    try {
      // setLoading(true);
      const result = await getRequestWithOutBody(
        `${BASE_URL}/cards/my-cards/`,
        AuthReducer.token
      );
      setMyCards(result.results);
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

  const handleCardSelection = (selectedCard) => {
    const updatedSelectedCards = selectedCards.some(card => card.id === selectedCard.id)
      ? selectedCards.filter(card => card.id !== selectedCard.id)
      : [...selectedCards, selectedCard];

    setSelectedCards(updatedSelectedCards);
  };

  const handleSubmission = () => {
    // Use the selectedCards state as needed
    // Add your logic here to handle the submission
    try {
      for (const selectedCard of selectedCards) {
        console.log('Selected Cards:', selectedCard);
        var formdata = new FormData();

        formdata.append('expiration_month', selectedCard.expiration_month);
        formdata.append('expiration_year', selectedCard.expiration_year);
        formdata.append('issuer_id', selectedCard.issuer);
        formdata.append('card_type_id', selectedCard.card_type);
        formdata.append('card_number', selectedCard.card_number);
        formdata.append('cvv', selectedCard.cvv);
        formdata.append('card_holder', selectedCard.card_holder);
        formdata.append('comments', '-');
        formdata.append('is_active', 'True');
        formdata.append('card_holding_days', 0);
        formdata.append('card_status', 'lost');
        formdata.append('card_id', selectedCard.id);

        setLoading(true);
        putRequestWithToken(
          `${BASE_URL}/cards/update-card/`,
          formdata,
          AuthReducer.token,
        )
          .then(result => {
            console.log('result of Add my card', result);
            // setSecondModal(true);
            setModalVisible(true);

            setLoading(false);
          })
          .catch(error => {
            console.log('error', error);
            setLoading(false);
          });
      }

      // After all API requests are completed, you can show the success modal
    } catch (error) {
      console.error('Error making API requests:', error);
      // Handle error, show an error message, etc.
    }
  };

  const renderItem = ({ item }) => {
    const cardType = cardTypeData.find((cardType) => cardType?.id === item?.card_type);
    const formattedCardNumber = formatCardNumber(item?.card_number);

    return (
      <>
        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
          <View>
            <CheckBox isChecked={item.match}
              onPress={(isChecked) => handleCardSelection(item, isChecked)}
            />
          </View>
          <View
            style={{
              borderColor: 'rgba(11, 16, 92, 0.1)',
              // marginHorizontal: '5%',
              borderRadius: 7,
              borderWidth: 1,
              height: 138,
              width: '75%',
              //   width: 332,
              marginTop: 10,
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
                    Heading={item.card_holder.substring(0, 10)}
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
          </View>
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
            marginBottom: 30,
          }}>
          <Head head={'Lost Cards'} />
        </View>
      </>
    );
  };

  // const ListFooterComponent = () => {
  //   return (
  //     <>
  //       <View
  //         style={{
  //           flexGrow: 1,
  //           // marginHorizontal: '3%',
  //           padding: 15,
  //           borderRadius: 15,
  //           marginTop: 50,
  //           marginBottom: 50,

  //         }}>
  //         <View
  //           style={{
  //             justifyContent: 'center',
  //             alignContent: 'center',
  //             flexDirection: 'row',
  //             //   marginVertical: '5%',
  //             // marginLeft: '-2%',
  //             // marginTop: '5%',
  //           }}>
  //           <ButtonComp
  //             btnText={'Submit'}
  //             press={() => {
  //               // setModalVisible(true);
  //               handleSubmission()
  //               //   Login();
  //             }}
  //           />
  //         </View>
  //       </View>
  //     </>
  //   );
  // };

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

      <SafeArea>
        {loading ? (
          <Loader />
        ) : (
          <View
            style={{
              flex: 1,
            }}>
          <View
            style={{
              //   marginVertical: '5%',
              flex: 1, 
              // marginBottom: Platform.OS === 'ios' ? '2%' : '2%'
              // marginBottom: Platform.OS === 'ios' ? 0 : '8%',
            }}>
            <View
              style={{
                marginHorizontal: '1%',
                // marginVertical: '5%',
                marginBottom: 10,
              }}>
              <Head head={'My Cards'} />
            </View>
            <FlatList
              data={myCards}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingBottom: 100 }}
              // ListHeaderComponent={ListHeaderComponent}
              // ListFooterComponent={ListFooterComponent}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View
          style={{
            // flexGrow: 1,
            // marginHorizontal: '3%',
            padding: 15,
            borderRadius: 15,
            // marginTop: 50,
            // marginBottom: 50,

          }}>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              flexDirection: 'row',
              //   marginVertical: '5%',
              // marginLeft: '-2%',
              // marginTop: '5%',
            }}>
            <ButtonComp
              btnText={'Submit'}
              press={() => {
                // setModalVisible(true);
                handleSubmission()
                //   Login();
              }}
            />
          </View>
        </View>
        </View>
        )}
      </SafeArea>
    </>
  );
};
