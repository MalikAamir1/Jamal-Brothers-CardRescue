import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Heading from '../../Components/ReusableComponent/Heading';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import Input from '../../Components/ReusableComponent/Input';
import { Formik } from 'formik';
import * as yup from 'yup';
import ButtonComp from '../../Components/ReusableComponent/Button';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icons from 'react-native-vector-icons/MaterialIcons';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import { removeOtpScreen } from '../../Store/Reducers/ScreenReducer';
import { Loader } from '../../Components/ReusableComponent/Loader';
import {
  getRequestWithCookie,
  getRequestWithOutBody,
  postRequestWithToken,
  postRequestWithTokenAndCookie,
} from '../../App/fetch';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropdownComponent from '../../Components/ReusableComponent/DropDown';
import { SuccessModal } from '../../Components/ReusableComponent/SuccessModal';
import { BASE_URL } from '../../App/api';
import {
  getDataFromAsync,
  setDataToAsync,
} from '../../Utils/getAndSetAsyncStorage';
import { userDataFromAsyncStorage } from '../../Store/Reducers/AuthReducer';
import InputWithCalender from '../../Components/ReusableComponent/InputWithCalender';
import { removeSignupScreen } from '../../Store/Reducers/SignupReducer';

export const AddCard = ({ route }) => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  // const userAuth = useSelector(state => state.AuthReducer);
  const AuthReducer = useSelector(state => state.AuthReducer.userData);
  const DefaultObject = { id: 1 };

  const [modalVisible, setModalVisible] = useState(false);
  const [secondModal, setSecondModal] = useState(false);

  const [screenName, setScreenName] = useState('ProfileCreate');
  const [cardType, setCardtype] = useState([]);
  const [bank, setBank] = useState([]);
  const [error, onChangeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardHolder, setCardHolder] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [addCardPress, setAddCardPress] = useState(false);
  const [arrayOfCard, setArrayOfCard] = useState([DefaultObject]);
  const [selectedCardtype, setSelectedCardtype] = useState('');
  const [selectedIssuer, setSelectedIssuer] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [errorCardType, setErrorCardType] = useState(null);
  const [errorIssuer, setErrorIssuer] = useState(null);
  const [errorCardHolder, setErrorcardHolder] = useState(null);
  const [errorCardNo, setErrorCardNo] = useState(null);
  const [errorExpiryDate, setErrorExpiryDate] = useState(null);
  const [errorCvv, setErrorCvv] = useState(null);
  const [addMoreCard, setAddMoreCard] = useState(false);
  const [oldCardType, setOldCardType] = useState('');
  const [oldIssuer, setOldIssuer] = useState('');
  const [oldCardHolder, setOldCardHolder] = useState('');
  const [oldCardNo, setOldCardNo] = useState('');
  const [oldExpiry, setOldExpiry] = useState('');
  const [oldCvv, setOldCvv] = useState('');
  const [issuersData, setIssuersData] = useState([]);
  const [cardTypeData, setCardTypeData] = useState([]);
  const [issuerDatabaseId, setIssuerDatabaseId] = useState('');
  const [cardTypeDatabaseId, setCardTypeDatabaseId] = useState('');

  console.log(arrayOfCard);

  const resetArrayOfCard = () => {
    setArrayOfCard([DefaultObject]);
  };

  useFocusEffect(
    React.useCallback(() => {
      resetArrayOfCard();
    }, []),
  );

  useEffect(() => {
    setScreenName(route.params.screenName);
    // console.log(screenName)
  }, []);

  // let data = [
  //   {
  //     label: 'Credit Card',
  //     value: 'Credit Card',
  //   },
  //   {
  //     label: 'Debit Card',
  //     value: 'Debit Card',
  //   },
  // ];
  // let dataOfBank = [
  //   {
  //     label: 'Bank Of America',
  //     value: 'Bank Of America',
  //   },
  //   {
  //     label: 'Bank Of Chicago',
  //     value: 'Bank Of Chicago',
  //   },
  // ];
  // console.log('issuerDatabaseId', issuerDatabaseId)
  // console.log('selectedMonthmmmm', selectedMonth)
  // console.log('selectedYearmmmm', selectedYear)
  // console.log('issuer', selectedIssuer.id)
  // console.log('cardtype', selectedCardtype.id)
  // console.log('cardNo', cardNo)
  // console.log('cvv', cvv)
  // console.log('cardHolder', cardHolder)
  // console.log('oldCardType', oldCardType)
  // console.log('oldIssuer', oldIssuer)
  // console.log('oldCardHolder', oldCardHolder)
  // console.log('oldCardNo', oldCardNo)
  // console.log('oldExpiry', oldExpiry)
  // console.log('oldCvv', oldCvv)
  // console.log('addMoreCard', addMoreCard)
  // console.log('issuersData', cardTypeData)

  useEffect(() => {
    getRequestWithOutBody(
      `${BASE_URL}/cards/active-card-types/`,
      AuthReducer.token,
    )
      .then(result => {
        // console.log('result', result)
        const cardType = result.results.map(item => ({
          label: item.card_type,
          value: item.card_type,
          id: item.id
        }));
        // console.log('cardType', cardType);

        setCardtype(cardType);
        setCardTypeData(result.results); // Store issuer data
        getRequestWithOutBody(
          `${BASE_URL}/cards/active-issuers/`,
          AuthReducer.token,
        )
          .then(result2 => {
            console.log('result', result2)
            const issuers = result2.results.map(item => ({
              label: item.issuer_name,
              value: item.issuer_name,
              id: item.id
            }));
            setBank(issuers)
            setIssuersData(result2.results); // Store issuer data
          })
          .catch(error => {
            console.log('error', error);
          });
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  useEffect(() => {
    const parsedIssuerDatabaseId = parseInt(issuerDatabaseId, 10);
    const found = issuersData.find(obj => {
      return obj.id === parsedIssuerDatabaseId;
    });
    // console.log('MMMMMMMMMMMMmmmmmm', found)
    setOldIssuer(found?.issuer_name);

  }, [issuerDatabaseId]);

  useEffect(() => {
    const parsedCardTypeDatabaseId = parseInt(cardTypeDatabaseId, 10);
    const found = cardTypeData.find(obj => {
      return obj.id === parsedCardTypeDatabaseId;
    });
    console.log('MMMMMMMMMMMMmmmmmm', found)
    setOldCardType(found?.card_type);

  }, [cardTypeDatabaseId]);

  const updateArrayOfCard = () => {
    const isValid = validateFields(
      selectedCardtype,
      selectedIssuer,
      cardHolder,
      cardNo,
      selectedMonth,
      selectedYear,
      cvv,
    );
    console.log('isValid: ', isValid);
    if (isValid) {
      onChangeError('');
      // Perform the necessary actions when all fields are valid

      var formdata = new FormData();
      // Assuming selectedYear is initially in two-digit format like "25"
      // Convert it to a four-digit year by adding "20" as a prefix
      // var formattedYear = "20" + selectedYear;

      formdata.append('expiration_month', selectedMonth);
      formdata.append('expiration_year', selectedYear);
      formdata.append('issuer_id', selectedIssuer.id);
      formdata.append('card_type_id', selectedCardtype.id);
      formdata.append('card_number', cardNo);
      formdata.append('cvv', cvv);
      formdata.append('card_holder', cardHolder);
      formdata.append('comments', '-');
      formdata.append('is_active', 'True');
      formdata.append('card_holding_days', 0);
      formdata.append('card_status', 'my-card');

      setLoading(true);
      postRequestWithToken(
        `${BASE_URL}/cards/add-card/`,
        formdata,
        AuthReducer.token,
      )
        .then(result => {
          console.log('result of Add my card', result);
          const errorMessage = JSON.stringify({ "error": "Card with this number already exists in found cards." });
          const errorMessage2 = JSON.stringify({ "error": "Card with this number already exists in your lost cards." });
          const errorMessage3 = JSON.stringify({ "error": "Card with this number already exists in my-card cards." })
          if (JSON.stringify(result) === errorMessage) {
            console.log('122221212')
            setLoading(false);
            setSelectedMonth(null);
            setSelectedYear(null);
            Alert.alert('Error', 'Card with this number already exists in found cards.');
          } else if (JSON.stringify(result) === errorMessage2) {
            setLoading(false);
            setSelectedMonth(null);
            setSelectedYear(null);
            Alert.alert('Error', 'Card with this number already exists in your lost cards.');
          } else if (JSON.stringify(result) === errorMessage3) {
            setLoading(false);
            setSelectedMonth(null);
            setSelectedYear(null);
            Alert.alert('Error', 'Card with this number already exists.');
          }
          else {
            // Alert.alert('Error', result.Error);
            const formattedExpiryDate = result.card.expiration_date ? result.card.expiration_date.substring(5, 7) + " / " + result.card.expiration_date.substring(2, 4) : "";
            // const getIssuerNameById = (issuerId) => {
            //   const issuer = issuersData.find(item => item.id === issuerId);
            //   return issuer ? issuer.issuer_name : '';
            // };                  

            setSelectedMonth(null)
            setSelectedYear(null)
            setSelectedIssuer('')
            setSelectedCardtype('')
            setCardNo('')
            setCvv('')
            setCardHolder('')
            setCardTypeDatabaseId(result.card.card_type)
            setIssuerDatabaseId(result.card.issuer)
            setOldCardNo(result.card.card_number)
            setOldExpiry(formattedExpiryDate)
            setOldCvv(result.card.cvv)
            setOldCardHolder(result.card.card_holder)
            // setModalVisible(true);

            //     app
            //       .database()
            //       .ref(`users/${AuthReducer.userData.token}`)
            //       .update({
            //         display_name: valueFullName,
            //         profileImage: `https://nextgenbulliontool.com${AuthReducer?.userData?.user?.profile?.profile_pic}`,
            //       })
            //       .then(() =>
            //         console.log('User data created successfully in database'),
            //       );
            //     Navigation.navigate('AddFirstCard', {
            //       screenName: 'ProfileCreate',
            //     });
            setAddMoreCard(true)
            setLoading(false);
          }

        })
        .catch(error => {
          console.log('error', error);
          setLoading(false);
        });
    } else {
      // Handle the case when some fields are empty or invalid
      // onChangeError('Invalid fields')
    }
    // const newObj = { id: 'random' };
    // setArrayOfCard([...arrayOfCard, newObj]);
  };

  const handleDateChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  let loginValidationScheme = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required '),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required '),
  });

  const validateFields = (
    selectedCardtype,
    selectedIssuer,
    cardHolder,
    cardNo,
    selectedMonth,
    selectedYear,
    cvv,
  ) => {
    let isValid = true;

    // Validation for Card Type
    if (!selectedCardtype) {
      // onChangeError('Full Name Should not be empty.');
      setErrorCardType('Card Type should be selected.');
      isValid = false;
      // return false;
    } else {
      setErrorCardType(''); // Clear error if the field is not empty
    }

    // Validation for Issuer
    if (!selectedIssuer) {
      // onChangeError('Full Name Should not be empty.');
      setErrorIssuer('Issuer should be selected.');
      isValid = false;
      // return false;
    } else {
      setErrorIssuer(''); // Clear error if the field is not empty
    }

    // Validation for NameOnCard
    const nameOnCardPattern = /^[A-Za-z\s]+$/;
    if (!cardHolder.trim()) {
      // onChangeError('Address Should not be empty.');
      setErrorcardHolder('Card Holder should not be empty.');
      isValid = false;
      // return false;
    } else if (!nameOnCardPattern.test(cardHolder)) {
      setErrorcardHolder('Name On Card should only contain alphabets and spaces.');
      isValid = false;
    } else {
      setErrorcardHolder(''); // Clear error if the field is not empty
    }

    // Validation for Card Number
    if (!cardNo.trim()) {
      // onChangeError('Address Should not be empty.');
      setErrorCardNo('Card Number Should not be empty.');
      isValid = false;
      // return false;
    } else if (cardNo.length <= 12) {
      setErrorCardNo('Card Number should be more then 12 digits');
      isValid = false;
    } else {
      setErrorCardNo(''); // Clear error if the field is not empty
    }

    // Validation for Expiry Date
    if (!selectedMonth) {
      // onChangeError('Full Name Should not be empty.');
      setErrorExpiryDate('Expiry Date should be selected.');
      isValid = false;
      // return false;
    } else if (!selectedYear) {
      setErrorExpiryDate('Expiry Date should be selected.');
      isValid = false;
    } else {
      setErrorExpiryDate(''); // Clear error if the field is not empty
    }

    // Validation for cvv
    if (!cvv.trim()) {
      // onChangeError('Address Should not be empty.');
      setErrorCvv('CVV Should not be empty.');
      isValid = false;
      // return false;
    } else if (cvv.length < 3) {
      setErrorCvv('Invalid CVV length.');
      isValid = false;
    } else {
      setErrorCvv(''); // Clear error if the field is not empty
    }

    // All fields are valid
    return isValid;
  };

  function AddCard() {
    // dispatch(removeOtpScreen());
    // Navigation.navigate('AddCard', {
    //   // screenName: 'ProfileCreate',
    // });
    const isValid = validateFields(
      selectedCardtype,
      selectedIssuer,
      cardHolder,
      cardNo,
      selectedMonth,
      selectedYear,
      cvv,
    );
    console.log('isValid: ', isValid);
    if (isValid) {
      onChangeError('');
      // Perform the necessary actions when all fields are valid

      var formdata = new FormData();
      // Assuming selectedYear is initially in two-digit format like "25"
      // Convert it to a four-digit year by adding "20" as a prefix
      // var formattedYear = "20" + selectedYear;

      formdata.append('expiration_month', selectedMonth);
      formdata.append('expiration_year', selectedYear);
      formdata.append('issuer_id', selectedIssuer.id);
      formdata.append('card_type_id', selectedCardtype.id);
      formdata.append('card_number', cardNo);
      formdata.append('cvv', cvv);
      formdata.append('card_holder', cardHolder);
      formdata.append('comments', '-');
      formdata.append('is_active', 'True');
      formdata.append('card_holding_days', 0);
      formdata.append('card_status', 'my-card');

      setLoading(true);
      postRequestWithToken(
        `${BASE_URL}/cards/add-card/`,
        formdata,
        AuthReducer.token,
      )
        .then(result => {
          console.log('result of Add my card', result);
          const errorMessage = JSON.stringify({ "error": "Card with this number already exists in found cards." });
          const errorMessage2 = JSON.stringify({ "error": "Card with this number already exists in lost cards." });
          const errorMessage3 = JSON.stringify({ "error": "Card with this number already exists in my-card cards." })
          if (JSON.stringify(result) === errorMessage) {
            console.log('122221212')
            setLoading(false);
            setSelectedMonth(null);
            setSelectedYear(null);
            Alert.alert('Error', 'Card with this number already exists in found cards.');
          } else if (JSON.stringify(result) === errorMessage2) {
            setLoading(false);
            setSelectedMonth(null);
            setSelectedYear(null);
            Alert.alert('Error', 'Card with this number already exists in lost cards.');
          } else if (JSON.stringify(result) === errorMessage3) {
            setLoading(false);
            setSelectedMonth(null);
            setSelectedYear(null);
            Alert.alert('Error', 'Card with this number already exists.');
          }
          else {
            // Alert.alert('Error', result.Error);
            setModalVisible(true);
            setLoading(false);
          }
          // setModalVisible(true);

          //     app
          //       .database()
          //       .ref(`users/${AuthReducer.userData.token}`)
          //       .update({
          //         display_name: valueFullName,
          //         profileImage: `https://nextgenbulliontool.com${AuthReducer?.userData?.user?.profile?.profile_pic}`,
          //       })
          //       .then(() =>
          //         console.log('User data created successfully in database'),
          //       );
          //     Navigation.navigate('AddFirstCard', {
          //       screenName: 'ProfileCreate',
          //     });
          setLoading(false);
        })
        .catch(error => {
          console.log('error', error);
          setLoading(false);
        });
    } else {
      // Handle the case when some fields are empty or invalid
      // onChangeError('Invalid fields')
    }
  }

  const ListHeaderComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            margin: '8%',
            marginBottom: 0,
            marginLeft: 8,
          }}>
          <Pressable
            onPress={() => {
              Navigation.goBack();
            }}>
            <Image
              source={require('../../Assets/Images/back.png')}
              style={{
                width: 18,
                height: 15,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
            />
          </Pressable>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Heading
            Stylefont={'normal'}
            Fontweight={'bold'}
            Fontsize={24}
            txtAlign={'center'}
            p={10}
            lh={31}
            Heading={'Add Card'}
            color={'rgba(11, 16, 92, 1)'}
          />
        </View>
        <View style={{ marginBottom: '11%', marginTop: 10 }}>
          <Heading
            Fontsize={15}
            txtAlign={'center'}
            Heading={'Enter your card details'}
            color={'#7B869E'}
            lh={20}
          />
        </View>
      </>
    );
  };

  const ListFooterComponent = () => {
    return (
      <>
        {/* <Pressable
          onPress={() => {
            updateArrayOfCard();
          }}>
          <View
            style={{
              //   justifyContent: 'space-between',
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginTop: 3,
            }}>
            <Image
              source={require('../../Assets/Images/addCard.png')}
              //   style={{width: 20, marginTop: 12, marginBottom: 14}}
              resizeMethod={'resize'}
              resizeMode={'contain'}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: 'rgba(11, 16, 92, 1)',
                marginLeft: 8,
                marginTop: 2,
              }}>
              Add more card
            </Text>
          </View>
        </Pressable> */}

        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row',
            marginVertical: '15%',
            // marginBottom: 20
          }}>
          <ButtonComp
            btnwidth={'97%'}
            btnHeight={56}
            btnText={'Submit'}
            justify={'center'}
            align={'center'}
            fontSize={16}
            radius={15}
            txtwidth={'100%'}
            // bgcolor={'#BA7607'}
            press={() => {
              // updateArrayOfCard();
              // Navigation.navigate('SimpleBottomTab');
              AddCard();
              // setModalVisible(true);
            }}
          />
        </View>
        <View>
          {error && (
            <>
              <InteractParagraph
                txtAlign={'center'}
                p={error}
                mv={4}
                color={'red'}
              />
            </>
          )}
        </View>
      </>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        {addMoreCard ? (
          <>
            <View>
              <DropdownComponent
                data={cardType}
                defaultValue={'Credit Card'}
                urlImg={require('../../Assets/Images/cardType.png')}
                value={oldCardType}
                setValue={setSelectedCardtype}
                title={'Card Type'}
                disabled={true}
              />
            </View>

            <View style={{ marginVertical: '2%', marginTop: '8%' }}>
              <DropdownComponent
                data={bank}
                defaultValue={'Bank Of America'}
                urlImg={require('../../Assets/Images/bank.png')}
                value={selectedIssuer}
                setValue={setSelectedIssuer}
                title={'Issuer'}
                disabled={true}
              />
            </View>

            <View style={{ marginVertical: '2%', marginTop: '5%' }}>
              <Input
                title={'Card Holder'}
                urlImg={require('../../Assets/Images/frame.png')}
                placeholder={'Claire James'}
                value={oldCardHolder}
                // value={dataFromOtpScreenOfSignUp.email}
                onChangeText={setCardHolder}
                dob={false}
                disabled={true}
                th={true}
              />
            </View>

            <View style={{ marginVertical: '1%', marginTop: '5%' }}>
              <Input
                title={'Card Number'}
                urlImg={require('../../Assets/Images/cardNo.png')}
                placeholder={'****** ****** ****** 23456'}
                value={oldCardNo}
                // value={dataFromOtpScreenOfSignUp.email}
                onChangeText={setCardNo}
                dob={false}
                maxLength={16}
                keyboardType={'numeric'}
                disabled={true}
              />
            </View>

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View style={{ marginVertical: '5%', width: '47%' }}>
                <InputWithCalender
                  title={'Expiry Date'}
                  urlImg={require('../../Assets/Images/calender.png')}
                  placeholder={'10 / 25'}
                  value={oldExpiry}
                  // onChangeText={setPurchaseDate}
                  ml={'24%'}
                  disabled={true}
                  onDateChange={handleDateChange}
                  calenderdisable={true}
                // mleft={0}as
                />
              </View>
              <View style={{ marginVertical: '5%', width: '47%' }}>
                <Input
                  title={'CVV'}
                  urlImg={require('../../Assets/Images/calender.png')}
                  placeholder={'9879700'}
                  pass={false}
                  value={oldCvv}
                  onChangeText={setCvv}
                  dob={false}
                  ml={'23%'}
                  mleft={'11%'}
                  keyboardType="numeric"
                  maxLength={4}
                  disabled={true}
                />
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 0.5,
                borderTopColor: 'rgba(156, 156, 156, 0.6)',
                marginTop: 20,
                paddingTop: 40,
              }}
            />
          </>
        ) : null}

        {/* // index > 0 && ( // Check if it's not the first item in the array
          //   <View
          //     style={{
          //       borderTopWidth: 0.5,
          //       borderTopColor: 'rgba(156, 156, 156, 0.6)',
          //       marginTop: 20,
          //       paddingTop: 40,
          //     }}
          //   />
          // )} */}
        <>
          <View>
            <DropdownComponent
              data={cardType}
              defaultValue={'Credit Card'}
              urlImg={require('../../Assets/Images/cardType.png')}
              value={selectedCardtype}
              setValue={setSelectedCardtype}
              title={'Card Type'}
            />
            {!!errorCardType && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  marginTop: 5,
                  // marginBottom: 15,
                  marginLeft: 39,
                }}>
                {errorCardType}
              </Text>
            )}
          </View>

          <View style={{ marginVertical: '2%', marginTop: '8%' }}>
            <DropdownComponent
              data={bank}
              defaultValue={'Bank Of America'}
              urlImg={require('../../Assets/Images/bank.png')}
              value={selectedIssuer}
              setValue={setSelectedIssuer}
              title={'Issuer'}
            />
            {!!errorIssuer && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  marginTop: 5,
                  // marginBottom: 15,
                  marginLeft: 39,
                }}>
                {errorIssuer}
              </Text>
            )}
          </View>

          <View style={{ marginVertical: '2%', marginTop: '5%' }}>
            <Input
              title={'Card Holder'}
              urlImg={require('../../Assets/Images/frame.png')}
              placeholder={'Claire James'}
              value={cardHolder}
              // value={dataFromOtpScreenOfSignUp.email}
              onChangeText={setCardHolder}
              dob={false}
              th={true}
            />
            {!!errorCardHolder && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  marginTop: 5,
                  // marginBottom: 15,
                  marginLeft: 39,
                }}>
                {errorCardHolder}
              </Text>
            )}
          </View>

          <View style={{ marginVertical: '1%', marginTop: '5%' }}>
            <Input
              title={'Card Number'}
              urlImg={require('../../Assets/Images/cardNo.png')}
              placeholder={'****** ****** ****** 23456'}
              value={cardNo}
              // value={dataFromOtpScreenOfSignUp.email}
              onChangeText={setCardNo}
              dob={false}
              maxLength={16}
              keyboardType={'numeric'}
            />
            {!!errorCardNo && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  marginTop: 5,
                  // marginBottom: 15,
                  marginLeft: 39,
                }}>
                {errorCardNo}
              </Text>
            )}
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{ marginVertical: '5%', width: '47%' }}>
              <InputWithCalender
                title={'Expiry Date'}
                urlImg={require('../../Assets/Images/calender.png')}
                placeholder={'10 / 25'}
                // value={purchaseDate}
                // onChangeText={setPurchaseDate}
                ml={'24%'}
                disabled={true}
                onDateChange={handleDateChange}
              // mleft={0}as
              />
              {!!errorExpiryDate && (
                <Text
                  style={{
                    fontSize: 12,
                    color: 'red',
                    marginTop: 5,
                    // marginBottom: 15,
                    marginLeft: 39,
                  }}>
                  {errorExpiryDate}
                </Text>
              )}
            </View>
            <View style={{ marginVertical: '5%', width: '47%' }}>
              <Input
                title={'CVV'}
                urlImg={require('../../Assets/Images/calender.png')}
                placeholder={'9879700'}
                pass={false}
                value={cvv}
                onChangeText={setCvv}
                dob={false}
                ml={'23%'}
                mleft={'11%'}
                keyboardType="numeric"
                maxLength={4}

              />
              {!!errorCvv && (
                <Text
                  style={{
                    fontSize: 12,
                    color: 'red',
                    marginTop: 5,
                    // marginBottom: 15,
                    marginLeft: 39,
                  }}>
                  {errorCvv}
                </Text>
              )}
            </View>
          </View>
        </>
      </>
    );
  };

  return (
    <>
      <SuccessModal
        set={setModalVisible}
        get={modalVisible}
        txt={'Card Add Successfully'}
        done={() => {
          setModalVisible(false);
          route.params.screenName == 'MyCards'
            ? Navigation.navigate('MyCards', {
              prevName: 'AddCard',
            })
            :
            setLoading(true)
          getRequestWithCookie(
            `${BASE_URL}/users/user-profile/`,
            AuthReducer.token,
          )
            .then(result => {
              console.log(result);
              setLoading(false);

              setDataToAsync('user', JSON.stringify(result));
              dispatch(removeSignupScreen());

              getDataFromAsync('user')
                .then(res => {
                  dispatch(userDataFromAsyncStorage(JSON.parse(res)));
                  // console.log('res: ', res);
                  dispatch(removeOtpScreen());
                })
                .catch(err => {
                  console.log(
                    'Error From getting from local storage: ',
                    err,
                  );
                });

              // Navigation.navigate('SimpleBottomTab', result);
            })
            .catch(error => {
              console.log('error', error);
              setLoading(false);
            })
        }}
        urlImg={require('../../Assets/Images/successIcon.png')}
        btntxt={'Done'}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={secondModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setSecondModal(!secondModal);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          }}>
          <Pressable
            onPress={() => {
              setModalVisible(false);
              setLoading(true);

              getRequestWithCookie(
                `${BASE_URL}/users/user-profile/`,
                AuthReducer.token,
              )
                .then(result => {
                  console.log(result);
                  setLoading(false);

                  setDataToAsync('user', JSON.stringify(result));
                  dispatch(removeSignupScreen());

                  getDataFromAsync('user')
                    .then(res => {
                      dispatch(userDataFromAsyncStorage(JSON.parse(res)));
                      // console.log('res: ', res);
                      dispatch(removeOtpScreen());
                    })
                    .catch(err => {
                      console.log(
                        'Error From getting from local storage: ',
                        err,
                      );
                    });

                  // Navigation.navigate('SimpleBottomTab', result);
                })
                .catch(error => {
                  console.log('error', error);
                  setLoading(false);
                });
            }}>
            <View style={styles.modalView}>
              <View style={{ marginTop: 15, marginHorizontal: 20 }}>
                <Heading
                  Heading={'Note'}
                  Fontsize={20}
                  color={'rgba(11, 16, 92, 1)'}
                  Fontweight={'bold'}
                  txtAlign={'center'}
                  // mv={10}
                  mt={25}
                />
                <Heading
                  Heading={
                    'Your card  will be destroyed after 30 days of getting found by the founder.'
                  }
                  Fontsize={18}
                  color={'rgba(11, 16, 92, 1)'}
                  // Fontweight={'bold'}
                  txtAlign={'center'}
                  mv={10}
                  width={236}
                  lh={23}
                />
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
      {/* <View style={{backgroundColor: '#FCFCFC'}}> */}
      <Formik
        initialValues={{ email: '', password: '' }}
        validateOnMount={true}
        onSubmit={values => {
          simpleLogin(values);
        }}
        validationSchema={loginValidationScheme}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <>
            {/* <View style={{
              backgroundColor: '#FCFCFC',
              // paddingBottom: 10
            }}> */}
            {loading ? (
              <Loader />
            ) : (
              // <ScrollView>
              <View
                style={{
                  marginHorizontal: '5%',
                  marginTop: Platform.OS === 'ios' ? '10%' : 6,
                  // marginBottom: Platform.OS === 'ios' ? '10%' : 6
                }}>
                <FlatList
                  data={arrayOfCard}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{ flexDirection: 'column' }}
                  ListHeaderComponent={ListHeaderComponent}
                  ListFooterComponent={ListFooterComponent}
                  showsVerticalScrollIndicator={false}
                />
              </View>
              // </ScrollView>
            )}
            {/* </View> */}
          </>
        )}
      </Formik>
      {/* </View> */}
    </>
  );
};

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: '#25241C',
    // opacity: 0.9,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
