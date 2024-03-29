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
import { useNavigation } from '@react-navigation/native';
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
import Head from '../../Components/ReusableComponent/Head';
import { ModalWithCalender } from '../../Components/ReusableComponent/ModalWithCalender';
import InputWithCalender from '../../Components/ReusableComponent/InputWithCalender';
import { BASE_URL } from '../../App/api';

export const FoundCard = ({ route }) => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer.userData);

  const [modalVisible, setModalVisible] = useState(false);
  const [secondModal, setSecondModal] = useState(false);

  const [userData, setUserData] = useState({});
  const [cardType, setCardtype] = useState([]);
  const [bank, setBank] = useState([]);
  const [error, onChangeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardHolder, setCardHolder] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [cvv, setCvv] = useState('');
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
  const [inputText, setInputText] = useState('');
  const [numberOfDaysError, setNumberOfDaysError] = useState('');
  console.log('inputText', inputText)

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
          })
          .catch(error => {
            console.log('error', error);
          });
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

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

  const submitbtn = () => {
    // setSecondModal(true);
    const isValid = validateFields(
      selectedCardtype,
      selectedIssuer,
      cardHolder,
      cardNo,
      selectedMonth,
      selectedYear,
      cvv,
    );
    if (isValid) {
      setModalVisible(true);
    } else {
      // Handle the case when some fields are empty or invalid
      // onChangeError('Invalid fields')
    }
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

  const handleDateChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  return (
    <>
      <ModalWithCalender
        setNumberOfDaysError={numberOfDaysError}
        set={setModalVisible}
        get={modalVisible}
        txt={'When will you destroy the card which is in your possession?'}
        no={() => {
          setModalVisible(false);
        }}
        yes={(inputText) => {
          if (!inputText.trim()) {
            setNumberOfDaysError('Number of Days should not be empty.');
            console.log('aaaaasfhdsjfhdkjfg')
          } else {
            setInputText(inputText)
            setNumberOfDaysError('');
            var formdata = new FormData();

            formdata.append('expiration_month', selectedMonth);
            formdata.append('expiration_year', selectedYear);
            formdata.append('issuer_id', selectedIssuer.id);
            formdata.append('card_type_id', selectedCardtype.id);
            formdata.append('card_number', cardNo);
            formdata.append('cvv', cvv);
            formdata.append('card_holder', cardHolder);
            formdata.append('comments', '-');
            formdata.append('is_active', 'True');
            formdata.append('card_holding_days', inputText);
            formdata.append('card_status', 'found');

            setLoading(true);
            setModalVisible(false);
            postRequestWithToken(
              `${BASE_URL}/cards/add-card/`,
              formdata,
              AuthReducer.token,
            )
              .then(result => {
                console.log('result of Add my card', result);
                if (result.error == 'Card with this number already exists.') {
                  setLoading(false);
                  setSelectedMonth(null);
                  setSelectedYear(null);
                  Alert.alert('Error', 'Card with this number already exists.');
                }
                else {
                  // Alert.alert('Error', result.Error);
                  setSecondModal(true);
                  setLoading(false);
                }
              })
              .catch(error => {
                console.log('error', error);
                setLoading(false);
                setModalVisible(false);
                Alert.alert(error);
              });

          }
        }}
        urlImg={require('../../Assets/Images/successIcon.png')}
        btntxt={'Done'}
        paratxt={
          "You should freeze your card with your bank until it's recovered or matched"
        }
      />

      <SuccessModal
        set={setSecondModal}
        get={secondModal}
        txt={'Card Add Successfully'}
        done={() => {
          setSecondModal(false);
          Navigation.navigate('FoundCardsList');
        }}
        urlImg={require('../../Assets/Images/successIcon.png')}
        btntxt={'Done'}
        paratxt={
          `Please destroy the card after ${inputText} days if no match has been found.`
        }
      />

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
            {loading ? (
              <Loader />
            ) : (
              <ScrollView>
                <View
                  style={{
                    marginHorizontal: '5%',
                    marginTop: Platform.OS === 'ios' ? '10%' : 6,
                  }}>
                  <View
                    style={{
                      marginHorizontal: -20,
                      // marginVertical: '5%',
                      marginBottom: 40,
                    }}>
                    <Head head={'Found Card'} foundCard={true} />
                  </View>

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
                      marginTop: 1,
                    }}>
                    <View style={{ marginVertical: '4%', width: '47%' }}>
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
                    <View style={{ marginVertical: '4%', width: '47%' }}>
                      <Input
                        title={'CVV'}
                        urlImg={require('../../Assets/Images/calender.png')}
                        placeholder={'9879700'}
                        pass={false}
                        value={cvv}
                        onChangeText={setCvv}
                        dob={false}
                        ml={'24%'}
                        mleft={Platform.OS === 'ios' ? '12%' : '9%'}
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

                  <View
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      flexDirection: 'row',
                      marginVertical: '8%',
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
                        submitbtn();
                      }}
                    />
                  </View>
                </View>
              </ScrollView>
            )}
          </>
        )}
      </Formik>
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
