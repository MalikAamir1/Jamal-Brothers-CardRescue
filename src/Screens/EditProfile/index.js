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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BASE_URL} from '../../App/api';
import {
  getDataFromAsync,
  setDataToAsync,
} from '../../Utils/getAndSetAsyncStorage';
import {userDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import InputWithCalenderWithDropdownList from '../../Components/ReusableComponent/DropdownCalender';
import app from '../../Firebase/firebaseConfig';

export const EditProfile = ({route}) => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();

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
  const [dataFromDb, setDataFromDb] = useState({});
  const [userProfilePic, setUserProfilePic] = useState('');

  const AuthReducer = useSelector(state => state.AuthReducer);
  // console.log('AuthReducer on edit profile', AuthReducer);

  useEffect(() => {
    if (AuthReducer?.userData?.user) {
      setLoading(true);
      onChangeFullName(AuthReducer?.userData?.user?.profile?.display_name);
      onChangePhoneNumber(AuthReducer?.userData?.user?.profile?.telephone);
      onChangeAddress(AuthReducer?.userData?.user?.profile?.street);
      setLoading(false);
    }
  }, [dataFromDb]);

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

  const rbSheetRef = useRef();

  const openGallery = () => {
    let option = {
      include64: true,
      mediaType: 'photo',
    };
    launchImageLibrary(option, res => {
      console.log(res);
      if (res.assets) {
        // setBanner(res.assets[0].uri);
        console.log('library Image');
        console.log(res.assets[0].uri);
        setUserProfilePic(res.assets[0].uri);
        onChangeProfileImage(res.assets[0].uri);
        UpploadProfileImage(res.assets[0].uri);
        // rbSheetRef.current.close();
        // setIsImageUpload(true);
      } else if (res.didCancel) {
        console.log('cancel');
        console.log(res.didCancel);
      }
    });
  };

  const openCamera = () => {
    let option = {
      include64: true,
      mediaType: 'photo',
    };
    launchCamera(option, res => {
      console.log(res);
      if (res.assets) {
        // setBanner(res.assets[0].uri);
        // console.log('lCamera Img');
        // console.log(res.assets[0].uri);
        onChangeProfileImage(res.assets[0].uri);
        UpploadProfileImage(res.assets[0].uri);
        // rbSheetRef.current.close();
        // setIsImageUpload(true);
      } else if (res.didCancel) {
        console.log('cancel');
        console.log(res.didCancel);
      }
    });
  };
  // https://jbpl.pythonanywhere.com/media/profile.png

  const validateFields = (
    localFullName,
    // valueEmail,
    valuePhoneNumber,
    valueAddress,
    // profileImage,
  ) => {
    // Validation for Full Name
    if (!localFullName.trim()) {
      onChangeError('Full Name is empty.');
      return false;
    }

    // Validation for Phone Number
    const phoneNumberPattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!valuePhoneNumber.trim()) {
      onChangeError('Phone Number Should not be empty.');
      return false;
    } else if (valuePhoneNumber.length != 10) {
      onChangeError('Invalid Phone Number.');
      return false;
    }

    // Validation for Address
    if (!valueAddress.trim()) {
      onChangeError('Address is empty.');
      return false;
    }

    // All fields are valid
    return true;
  };

  function EditProfile() {
    const isValid = validateFields(
      valueFullName,
      // valueEmail,
      valuePhoneNumber,
      valueAddress,
      // profileImage,
    );
    console.log('isValid: ', isValid);
    if (isValid) {
      onChangeError('');

      var formdataProfile = new FormData();

      formdataProfile.append('email', AuthReducer?.userData?.user?.email);
      formdataProfile.append('display_name', valueFullName);
      formdataProfile.append('telephone', valuePhoneNumber);
      formdataProfile.append('street', valueAddress);

      setLoading(true);

      postRequestWithTokenAndCookie(
        `${BASE_URL}/users/update-user-profile/`,
        formdataProfile,
        AuthReducer.userData.token,
      )
        .then(result => {
          console.log(
            'result of image',
            AuthReducer?.userData?.user?.profile?.profile_pic,
          );
          app
            .database()
            .ref(`users/${AuthReducer.userData.token}`)
            .update({
              display_name: valueFullName,
              profileImage: `https://nextgenbulliontool.com${AuthReducer?.userData?.user?.profile?.profile_pic}`,
            })
            .then(() =>
              console.log('User data edited successfully in database'),
            );
          setLoading(true);

          getRequestWithCookie(
            `${BASE_URL}/users/user-profile/`,
            AuthReducer.userData.token,
          )
            .then(result => {
              console.log(result);
              setLoading(false);

              setDataToAsync('user', JSON.stringify(result));

              getDataFromAsync('user')
                .then(res => {
                  dispatch(userDataFromAsyncStorage(JSON.parse(res)));
                })
                .catch(err => {
                  console.log('Error From getting from local storage: ', err);
                });
            })
            .catch(error => {
              console.log('error', error);
              setLoading(false);
            });
          setLoading(false);
          Navigation.navigate('Profile');
        })
        .catch(error => {
          console.log('error', error);
          setLoading(false);
        });
      onChangeError('');
    } else {
    }
  }

  function UpploadProfileImage(imgUrl) {
    console.log('imgUrl: ', imgUrl);

    var formdata = new FormData();
    formdata.append(`media_file`, {
      uri: imgUrl,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    formdata.append('title', 'big data');
    formdata.append('is_active', 'true');
    formdata.append('file_type', 'Profile Pictures');
    formdata.append('description', 'profile pictures details ...');

    console.log('formdata: ', formdata);

    setLoading(true);

    postRequestWithTokenAndCookie(
      `${BASE_URL}/users/upload/media-file/`,
      formdata,
      AuthReducer.userData.token,
    )
      .then(result => {
        console.log(result);

        setLoading(true);
        getRequestWithCookie(
          `${BASE_URL}/users/user-profile/`,
          AuthReducer.userData.token,
        )
          .then(result => {
            console.log(result);
            setLoading(false);

            setDataToAsync('user', JSON.stringify(result));

            getDataFromAsync('user')
              .then(res => {
                dispatch(userDataFromAsyncStorage(JSON.parse(res)));
              })
              .catch(err => {
                console.log('Error From getting from local storage: ', err);
              });
          })
          .catch(error => {
            console.log('error', error);
            setLoading(false);
          });
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
        Alert.alert('Error', 'Something went wrong please try again');
      });
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                        marginTop: Platform.OS === 'ios' ? '10%' : 6,
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
                            // source={require('../../Assets/Images/profileImage.png')}
                            source={{
                              uri: `https://nextgenbulliontool.com${AuthReducer?.userData?.user?.profile?.profile_pic}`,
                            }}
                            style={{
                              alignSelf: 'center',
                              justifyContent: 'center',
                              width: 110,
                              height: 112,
                              marginTop: 4,
                              borderRadius: 75,
                            }}
                            resizeMode={'cover'}
                          />
                          <Pressable
                            onPress={() => {
                              console.log('log');
                              // rbSheetRef.open();
                              rbSheetRef.current.open();
                            }}
                            style={{
                              position: 'absolute',
                              alignSelf: 'flex-end',
                            }}>
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
                          </Pressable>
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
                          placeholder={'(123) 456-7890'}
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
                        <InputWithCalenderWithDropdownList
                          title={'Date of Birth'}
                          urlImg={require('../../Assets/Images/calender.png')}
                          placeholder={'MM/DD/YYYY'}
                          // value={valuePhoneNumber}
                          // onChangeText={onChangePhoneNumber}
                          // disabled={true}
                        />
                      </View>

                      <View style={{marginVertical: '2%'}}>
                        <Input
                          title={'Email ID'}
                          urlImg={require('../../Assets/Images/emailIcon.png')}
                          // placeholder={dataFromOtpScreenOfSignUp.Email}
                          placeholder={'email@domain.com'}
                          pass={false}
                          value={AuthReducer?.userData?.user?.email}
                          onChangeText={onChangeEmail}
                          // value={userAuth.userData.user.email}
                          disabled={true}
                          dob={false}
                        />
                      </View>

                      <View style={{marginVertical: '2%'}}>
                        <Input
                          title={'Address'}
                          urlImg={require('../../Assets/Images/location.png')}
                          placeholder={
                            '1901 Thornridge Cir. Shiloh, Hawaii 81063'
                          }
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
                            EditProfile();
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

          <RBSheet
            ref={rbSheetRef}
            height={100}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: 'center',
                alignItems: 'center',
                borderTopEndRadius: 25,
                borderTopStartRadius: 25,
              },
            }}>
            <View
              style={{
                alignItems: 'flex-start',
                margin: '8%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable
                  style={{
                    width: 45,
                    height: 45,
                    // backgroundColor: COLORS.primary,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={openCamera}>
                  <Icons
                    name="photo-camera"
                    color={'rgba(11, 16, 92, 1)'}
                    size={30}
                  />
                </Pressable>
                <InteractParagraph p={'Camera'} />
              </View>
              <View
                style={{
                  marginLeft: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable
                  style={{
                    width: 45,
                    height: 45,
                    // backgroundColor: COLORS.primary,
                    borderRadius: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={openGallery}>
                  <Icons
                    name="photo-library"
                    color={'rgba(11, 16, 92, 1)'}
                    size={30}
                  />
                </Pressable>
                <InteractParagraph p={' Gallery'} />
              </View>
            </View>
          </RBSheet>
        </>
      )}
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