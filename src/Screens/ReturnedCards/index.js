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
import React, {useEffect, useState} from 'react';
import Head from '../../Components/ReusableComponent/Head';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ModalView} from '../../Components/ReusableComponent/Modal';
import CheckBox from '../../Components/ReusableComponent/Checkbox';
import {SuccessModal} from '../../Components/ReusableComponent/SuccessModal';
import { useSelector } from 'react-redux';
import { getRequestWithOutBody } from '../../App/fetch';
import { BASE_URL } from '../../App/api';
import { Loader } from '../../Components/ReusableComponent/Loader';

export const ReturnedCards = () => {
  const Navigation = useNavigation();
  const AuthReducer = useSelector(state => state.AuthReducer.userData);

  const [modalVisible, setModalVisible] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [cardSelect, setCardSelect] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [returnCards, setReturnCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardTypeData, setCardTypeData] = useState([]);

  const data = [
    {
      id: 1,
      type: 'Credit Card',
      cardNo: '****** ****** ****** 23456',
      holder: 'Billy Kane',
      day: '25',
    },
    {
      id: 2,
      type: 'Credit Card',
      cardNo: '****** ****** ****** 23456',
      holder: 'Billy Kane',
      day: '25',
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
          `${BASE_URL}/cards/returned-cards/`,
          AuthReducer.token,
        )
          .then(result => {
            console.log('result on lost cards', result.results)

            setReturnCards(result.results);
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
        `${BASE_URL}/cards/returned-cards/`,
        AuthReducer.token
      );
      setReturnCards(result.results);
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

  const renderItem = ({item}) => {
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
          {/* <Pressable
            onPress={() => {
              setModalVisible(true);
              setSelectedCard(item.id);
            }}> */}
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
                    ml={Platform.OS === 'ios' ? 21 : 22}
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
          {/* </Pressable> */}
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
          <Head head={'Returned Cards'} screenName={true} />
        </View>
      </>
    );
  };

  return (
    <>
      <SafeArea>
      {loading ? (
          <Loader />
        ) : (
        <View
          style={{
            //   marginVertical: '5%',
            marginBottom: Platform.OS === 'ios' ? '18%' : '28%',
          }}>
          <FlatList
            data={returnCards}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{flexDirection: 'column'}}
            ListHeaderComponent={ListHeaderComponent}
            showsVerticalScrollIndicator={false}
          />
        </View>
        )}
      </SafeArea>
    </>
  );
};
