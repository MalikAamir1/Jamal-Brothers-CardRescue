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
import {ActivityIndicator, Button, Text} from 'react-native-paper';
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
import Head from '../../Components/ReusableComponent/Head';

export const EditProfile = ({route}) => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.AuthReducer);

  const [modalVisible, setModalVisible] = useState(false);

  const [userData, setUserData] = useState({});
  const [valueFullName, onChangeFullName] = useState('');
  const [valueEmail, onChangeEmail] = useState('');
  const [valuePhoneNumber, onChangePhoneNumber] = useState('');
  // const [valuePhoneNumber, onChangePhoneNumber] = useState('');
  const [valueAddress, onChangeAddress] = useState('');
  const [profileImage, onChangeProfileImage] = useState('');
  const [error, onChangeError] = useState('');
  const [loading, setLoading] = useState(false);

  const AuthReducer = useSelector(state => state.AuthReducer);

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

  function CreateProfile() {
    // dispatch(removeOtpScreen());
    Navigation.navigate('Profile');
  }

  function acceptModal() {
    setModalVisible(false);
    setLoading(true);
  }

  return (
    <>
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
                      marginHorizontal: -10,
                    }}>
                    <Head head={'Edit Profile'} />
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 125,
                        height: 125,
                        alignSelf: 'center',
                        marginTop: '10%',
                        // marginBottom: '8%',
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: 'rgba(11, 16, 92, 0.3)',
                        borderRadius: 75,
                      }}>
                      <Image
                        source={require('../../Assets/Images/profileImage.png')}
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          width: 136,
                          height: 136,
                        }}
                        resizeMode={'cover'}
                      />
                      <View
                        style={{
                          width: 45,
                          height: 42,
                          position: 'absolute',
                          alignSelf: 'flex-end',
                          backgroundColor: 'white',
                          borderWidth: 2,
                          borderColor: 'rgba(11, 16, 92, 0.3)',
                          borderRadius: 75,
                          marginTop: 82,
                        }}>
                        <Image
                          source={require('../../Assets/Images/camera.png')}
                          style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            width: 24,
                            height: 24,
                            marginTop: 7,
                          }}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{marginVertical: '2%', marginTop: '10%'}}>
                    {/* <View style={{marginBottom: '5%', marginTop: '10%'}}> */}
                    <Input
                      title={'Full Name'}
                      urlImg={require('../../Assets/Images/frame.png')}
                      placeholder={'Enter your name'}
                      value={valueFullName}
                      // value={dataFromOtpScreenOfSignUp.email}
                      onChangeText={onChangeFullName}
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

                  <View style={{marginVertical: '2%'}}>
                    <Input
                      title={'Phone Number'}
                      urlImg={require('../../Assets/Images/phone.png')}
                      placeholder={'123 456 7890'}
                      pass={false}
                      value={valuePhoneNumber}
                      onChangeText={onChangePhoneNumber}
                      dob={false}
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'red',
                          marginTop: 5,
                          marginBottom: 5,
                          marginLeft: 15,
                        }}>
                        {errors.phoneNumber}
                      </Text>
                    )}
                  </View>
                  <View style={{marginVertical: '2%'}}>
                    <Pressable
                      onPress={() => {
                        console.log('working');
                        setModalVisible(true);
                      }}></Pressable>
                    <Input
                      title={'Date of Birth'}
                      urlImg={require('../../Assets/Images/calender.png')}
                      placeholder={'MM/DD/YYYY'}
                      pass={true}
                      dob={true}
                      // value={valuePhoneNumber}
                      // onChangeText={onChangePhoneNumber}
                      // disabled={true}
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'red',
                          marginTop: 5,
                          marginBottom: 5,
                          marginLeft: 15,
                        }}>
                        {errors.phoneNumber}
                      </Text>
                    )}
                  </View>
                  {/* <Pressable
                    onPress={() => {
                      console.log('working');
                      setModalVisible(true);
                    }}>
                    <View
                      style={{
                        width: '60%',
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginVertical: 10,
                        padding: 17,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                        elevation: 5,
                        borderRadius: 35,
                        // marginLeft: -5
                      }}>
                      <View>
                        <Text style={{color: '#667080'}}>{'MM/DD/YYYY'}</Text>
                      </View>
                      <View style={{alignSelf: 'center'}}>
                        <AntDesign name="down" size={14} color={'#667080'} />
                      </View>
                    </View>
                  </Pressable> */}

                  <View style={{marginVertical: '2%'}}>
                    <Input
                      title={'Email ID'}
                      urlImg={require('../../Assets/Images/emailIcon.png')}
                      // placeholder={dataFromOtpScreenOfSignUp.Email}
                      placeholder={'email@domain.com'}
                      pass={false}
                      value={valueEmail}
                      onChangeText={onChangeEmail}
                      // value={userAuth.userData.user.email}
                      disabled={true}
                      dob={false}
                    />
                    {errors.email && touched.email && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'red',
                          marginTop: 5,
                          marginBottom: 5,
                          marginLeft: 15,
                        }}>
                        {errors.email}
                      </Text>
                    )}
                  </View>

                  <View style={{marginVertical: '2%'}}>
                    <Input
                      title={'Address'}
                      urlImg={require('../../Assets/Images/location.png')}
                      placeholder={'1901 Thornridge Cir. Shiloh, Hawaii 81063'}
                      pass={false}
                      value={valueAddress}
                      onChangeText={onChangeAddress}
                      dob={false}
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

                  <View
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      flexDirection: 'row',
                      marginVertical: '4%',
                    }}>
                    <ButtonComp
                      btnwidth={'97%'}
                      btnHeight={56}
                      btnText={'Save'}
                      justify={'center'}
                      align={'center'}
                      fontSize={16}
                      radius={15}
                      txtwidth={'100%'}
                      // bgcolor={'#BA7607'}
                      press={() => {
                        CreateProfile();
                        // Navigation.navigate('SimpleBottomTab');
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
