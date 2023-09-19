import React, {useEffect, useRef, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator, Button, Text, TextInput} from 'react-native-paper';
import Input from '../../Components/ReusableComponent/Input';
import {Formik} from 'formik';
import * as yup from 'yup';
import ButtonComp from '../../Components/ReusableComponent/Button';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icons from 'react-native-vector-icons/MaterialIcons';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import {removeOtpScreen} from '../../Store/Reducers/ScreenReducer';
import {Loader} from '../../Components/ReusableComponent/Loader';
import {
  getRequestWithCookie,
  postRequestWithTokenAndCookie,
} from '../../App/fetch';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropdownComponent from '../../Components/ReusableComponent/DropDown';
import {SuccessModal} from '../../Components/ReusableComponent/SuccessModal';
import Head from '../../Components/ReusableComponent/Head';

export const LostNewCard = ({route}) => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.AuthReducer);

  const [modalVisible, setModalVisible] = useState(false);
  const [secondModal, setSecondModal] = useState(false);

  const [userData, setUserData] = useState({});
  const [cardType, setCardtype] = useState({});
  const [bank, setBank] = useState({});
  const [error, onChangeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardHolder, setCardHolder] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  let data = [
    {
      label: 'Credit Card',
      value: 'Credit Card',
    },
    {
      label: 'Debit Card',
      value: 'Debit Card',
    },
  ];
  let dataOfBank = [
    {
      label: 'Bank Of America',
      value: 'Bank Of America',
    },
    {
      label: 'Bank Of Chicago',
      value: 'Bank Of Chicago',
    },
  ];

  const submitbtn = () => {
    setModalVisible(true);
  }

  const AuthReducer = useSelector(state => state.AuthReducer);

  console.log('AuthReducer.userData: ', AuthReducer.userData);

  let loginValidationScheme = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required '),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required '),
  });

  return (
    <>
      <SuccessModal
        set={setModalVisible}
        get={modalVisible}
        txt={'Card Add Successfully'}
        done={() => {
          setModalVisible(false);
          Navigation.navigate('LostCards', {
            LostNewCard: true,
          });
        }}
        urlImg={require('../../Assets/Images/successIcon.png')}
        btntxt={'Done'}
        paratxt={
          "You should freeze your card with your bank until it's recovered or matched"
        }
      />
      <Formik
        initialValues={{email: '', password: ''}}
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
                    marginTop: Platform.OS === 'ios' ? '15%' : 6,
                  }}>
                  <View
                    style={{
                      marginHorizontal: -20,
                      // marginVertical: '5%',
                      marginBottom: 40,
                    }}>
                    <Head head={'Lost New Card'} />
                  </View>

                  <View>
                    <DropdownComponent
                      data={data}
                      defaultValue={'Credit Card'}
                      urlImg={require('../../Assets/Images/cardType.png')}
                      value={cardType}
                      setValue={setCardtype}
                      title={'Card type'}
                    />
                  </View>
                  <View style={{marginVertical: '2%', marginTop: '8%'}}>
                    <DropdownComponent
                      data={dataOfBank}
                      defaultValue={'Bank Of America'}
                      urlImg={require('../../Assets/Images/bank.png')}
                      value={bank}
                      setValue={setBank}
                      title={'Issuer'}
                    />
                  </View>

                  <View style={{marginVertical: '2%', marginTop: '5%'}}>
                    <Input
                      title={'Card Holder'}
                      urlImg={require('../../Assets/Images/frame.png')}
                      placeholder={'Enter name'}
                      value={cardHolder}
                      // value={dataFromOtpScreenOfSignUp.email}
                      onChangeText={setCardHolder}
                      dob={false}
                    />
                    {errors.fullName && touched.fullName && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'red',
                          marginTop: 5,
                          marginBottom: 5,
                          marginLeft: 15,
                        }}>
                        {errors.fullName}
                      </Text>
                    )}
                    {/* </View> */}
                  </View>
                  <View style={{marginVertical: '1%', marginTop: '5%'}}>
                    <Input
                      title={'Card Number'}
                      urlImg={require('../../Assets/Images/cardNo.png')}
                      placeholder={'****** ****** ****** 23456'}
                      value={cardNo}
                      // value={dataFromOtpScreenOfSignUp.email}
                      onChangeText={setCardNo}
                      dob={false}
                    />
                    {errors.fullName && touched.fullName && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'red',
                          marginTop: 5,
                          marginBottom: 5,
                          marginLeft: 15,
                        }}>
                        {errors.fullName}
                      </Text>
                    )}
                    {/* </View> */}
                  </View>

                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View style={{marginVertical: '4%', width: '47%'}}>
                      <Input
                        title={'Expiry Date'}
                        urlImg={require('../../Assets/Images/calender.png')}
                        placeholder={'MM/DD'}
                        pass={false}
                        value={purchaseDate}
                        onChangeText={setPurchaseDate}
                        dob={false}
                        ml={'24%'}
                        mleft={'12%'}
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'red',
                            marginTop: 5,
                            marginBottom: 5,
                            marginLeft: 15,
                          }}>
                          {errors.confirmPassword}
                        </Text>
                      )}
                    </View>
                    <View style={{marginVertical: '4%', width: '47%'}}>
                      <Input
                        title={'CVV'}
                        urlImg={require('../../Assets/Images/calender.png')}
                        placeholder={'9879700'}
                        pass={false}
                        //   value={valueAddress}
                        //   onChangeText={onChangeAddress}
                        dob={false}
                        ml={'24%'}
                        mleft={'12%'}
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'red',
                            marginTop: 5,
                            marginBottom: 5,
                            marginLeft: 15,
                          }}>
                          {errors.confirmPassword}
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
