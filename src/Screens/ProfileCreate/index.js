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
  KeyboardAvoidingView,
} from 'react-native';
import Heading from '../../Components/ReusableComponent/Heading';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
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
  postRequestWithToken,
  postRequestWithTokenAndCookie,
} from '../../App/fetch';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { BASE_URL } from '../../App/api';
import { removeDataToAsync } from '../../Utils/getAndSetAsyncStorage';
import { removeUserDataFromAsyncStorage } from '../../Store/Reducers/AuthReducer';
import InputWithCalenderWithDropdownList from '../../Components/ReusableComponent/DropdownCalender';
import app from '../../Firebase/firebaseConfig';
import { signupScreen } from '../../Store/Reducers/SignupReducer';

export const ProfileCreate = ({ route }) => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [modalVisible, setModalVisible] = useState(false);

  const [userData, setUserData] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [valueFullName, onChangeFullName] = useState('');
  const [errorFullName, setErrorFullName] = useState('');
  const [valueEmail, onChangeEmail] = useState('');
  const [valuePhoneNumber, onChangePhoneNumber] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  // const [valuePhoneNumber, onChangePhoneNumber] = useState('');
  const [valueAddress, onChangeAddress] = useState('');
  const [errorAddress, setErrorAddress] = useState('');
  const [profileImage, onChangeProfileImage] = useState('');
  const [error, onChangeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorDOB, setErrorDOB] = useState('');
  // console.log('profileImage', profileImage);
  // console.log('AuthReducer on edit profile', AuthReducer);
  // console.log('AuthReducer.userData: ', AuthReducer.userData.user.email);
  console.log('AuthReducer?.userData?.user?.email: ', AuthReducer?.userData?.user?.email);
  console.log('valueFullName: ', valueAddress);
  console.log('profileImage: ', profileImage);

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

  React.useEffect(() => {
    if (AuthReducer.userData?.user?.id) {
      setUserData(AuthReducer.userData.user.email);
    } else {
      setUserData(null);
    }
  }, [AuthReducer.userData]);

  useEffect(() => {
    console.log('userData in profile create screen:', userData);
  }, [userData]);

  const rbSheetRef = useRef();

  const handleDateSelect = (date) => {
    // Update the state in the parent screen with the selected date
    setSelectedDate(date);
  };

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
        onChangeProfileImage(res.assets[0].uri);
        UpploadProfileImage(res.assets[0].uri);
        rbSheetRef.current.close();
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
        console.log('lCamera Img');
        console.log(res.assets[0].uri);
        onChangeProfileImage(res.assets[0].uri);
        UpploadProfileImage(res.assets[0].uri);
        rbSheetRef.current.close();
        // setIsImageUpload(true);
      } else if (res.didCancel) {
        console.log('cancel');
        console.log(res.didCancel);
      }
    });
  };

  const validateFields = (
    valueFullName,
    // valueEmail,
    valuePhoneNumber,
    selectedDate, // Add date of birth to the function parameters
    valueAddress,
    // profileImage,
  ) => {
    let isValid = true;

    // Validation for Full Name
    if (!valueFullName.trim()) {
      // onChangeError('Full Name Should not be empty.');
      setErrorFullName('Full name should not be empty.');
      isValid = false;
      // return false;
    } else {
      setErrorFullName(''); // Clear error if the field is not empty
    }

    // Validation for Phone Number
    // const phoneNumberPattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!valuePhoneNumber.trim()) {
      // onChangeError('Phone Number Should not be empty.');
      setErrorPhoneNumber('Phone number should not be empty.');
      isValid = false;
      // setErrorFullName('')
      // return false;
    } else if (valuePhoneNumber.length < 8) {
      // onChangeError('Invalid Phone Number.');
      setErrorPhoneNumber('Invalid phone number.');
      isValid = false;
      // return false;
    } else {
      setErrorPhoneNumber(''); // Clear error if the field is not empty
    }

    // Validation for Date of Birth
    if (!selectedDate) {
      setErrorDOB('Date of birth should be selected.');
      isValid = false;
    } else {
      setErrorDOB('');
    }

    // Validation for Address
    if (!valueAddress.trim()) {
      // onChangeError('Address Should not be empty.');
      setErrorAddress('Address should not be empty.');
      isValid = false;
      // return false;
    } else {
      setErrorAddress(''); // Clear error if the field is not empty
    }

    // Validation for Profile Image
    if (!profileImage) {
      // onChangeError('Please upload a profile picture.');
      onChangeError('Profile image should be uploaded.');
      // return false;
      isValid = false;
    }

    // All fields are valid
    return isValid;
  };

  console.log('AuthReducer?.userData?.user?.profile', AuthReducer?.userData?.user?.profile)

  function CreateProfile() {
    // dispatch(removeOtpScreen());
    // Navigation.navigate('AddCard', {
    //   // screenName: 'ProfileCreate',
    // });
    const isValid = validateFields(
      valueFullName,
      // valueEmail,
      valuePhoneNumber,
      selectedDate,
      valueAddress,
      // profileImage,
    );
    console.log('isValid: ', isValid);
    if (isValid) {
      onChangeError('');
      // Perform the necessary actions when all fields are valid

      var formdataProfile = new FormData();

      formdataProfile.append('display_name', valueFullName);
      formdataProfile.append('telephone', valuePhoneNumber);
      formdataProfile.append('street', valueAddress);
      formdataProfile.append('email', AuthReducer?.userData?.user?.email);
      formdataProfile.append('dob', selectedDate);
      console.log('formdataProfile', formdataProfile)

      setLoading(true);
      postRequestWithToken(
        `${BASE_URL}/users/update-user-profile/`,
        formdataProfile,
        AuthReducer.userData.token,
      )
        .then(result => {
          console.log('result of update profile', result);
          // app
          //   .database()
          //   .ref(`users/${AuthReducer.userData.token}`)
          //   .update({
          //     display_name: valueFullName,
          //     profileImage: `http://23.26.137.178:8000${AuthReducer?.userData?.user?.profile?.profile_pic}`,
          //   })
          //   .then(() =>
          //     console.log('User data created successfully in database'),
          //   );
          Navigation.navigate('AddFirstCard', {
            screenName: 'ProfileCreate',
          });
          setLoading(false);
        })
        .catch(error => {
          console.log('error333333', error);
          setLoading(false);
        });
    } else {
      // Handle the case when some fields are empty or invalid
      // onChangeError('Invalid fields')
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

    // setLoading(true);
    setUploadingImage(true); // Show loader only for the image section
    postRequestWithTokenAndCookie(
      `${BASE_URL}/users/upload/media-file/`,
      formdata,
      AuthReducer.userData.token,
    )
      .then(result => {
        console.log(result);
        // setLoading(false);
        setUploadingImage(false); // Hide the loader
      })
      .catch(error => {
        console.log('error0000000', error);
        // setLoading(false);
        setUploadingImage(false); // Hide the loader
        Alert.alert('Error', 'Something went wrong please try again');
      });
  }

  // function acceptModal() {
  //   setModalVisible(false);
  //   setLoading(true);
  // }

  return (
    <>
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
              // <KeyboardAvoidingView
              //   style={{flex: 1}}
              //   behavior={Platform.OS === 'ios' ? 'padding' : null}
              //   // keyboardVerticalOffset={65}
              // >
              <ScrollView>
                <View
                  style={{
                    marginHorizontal: '5%',
                    marginTop: Platform.OS === 'ios' ? '10%' : 6,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      margin: '8%',
                      marginBottom: 0,
                    }}>
                    <Pressable
                      onPress={() => {
                        dispatch(removeOtpScreen());
                        dispatch(signupScreen(true));
                        removeDataToAsync('token');
                        removeDataToAsync('user');
                        dispatch(removeUserDataFromAsyncStorage());
                        // Navigation.navigate('SignUp');
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
                      Heading={'Create Profile'}
                      color={'rgba(11, 16, 92, 1)'}
                    />
                  </View>
                  <View style={{ marginBottom: '11%' }}>
                    <Heading
                      Fontsize={15}
                      txtAlign={'center'}
                      Heading={'Enter your personal information below'}
                      color={'#7B869E'}
                      lh={20}
                    />
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 130,
                        height: 130,
                        alignSelf: 'center',
                        // marginTop: '8%',
                        // marginBottom: '8%',
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: 'rgba(11, 16, 92, 0.3)',
                        borderRadius: 75,
                      }}>
                      {/* Conditionally render loader for image upload */}
                      {uploadingImage && (
                        <View style={{ ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' }}>
                          <ActivityIndicator size="small" color="rgba(11, 16, 92, 1)" />
                        </View>
                      )}
                      <Image
                        source={
                          !profileImage
                            ? require('../../Assets/Images/profile.png')
                            : { uri: profileImage }
                        }
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          width: !profileImage ? 126 : 110,
                          height: !profileImage ? 126 : 112,
                          marginTop: !profileImage ? 0 : 7,
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
                        {/* </View> */}
                      </Pressable>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      // alignItemss: 'center',
                      // marginLeft: 20,
                      marginTop: 20,
                      textAlign: 'center',
                    }}>
                    {error && (
                      <>
                        <InteractParagraph
                          p={error}
                          color={'red'}
                          txtAlign={'center'}
                        />
                      </>
                    )}
                  </View>

                  <View style={{ marginVertical: '2%', marginTop: '10%' }}>
                    <Input
                      title={'Full Name'}
                      urlImg={require('../../Assets/Images/frame.png')}
                      placeholder={'Enter your name'}
                      value={valueFullName}
                      onChangeText={onChangeFullName}
                      dob={false}
                      th={true}
                    />
                    {!!errorFullName && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'red',
                          marginTop: 5,
                          // marginBottom: 15,
                          marginLeft: 41,
                        }}>
                        {errorFullName}
                      </Text>
                    )}
                    {/* {errors.fullName && touched.fullName && (
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
                      )} */}
                  </View>

                  <View style={{ marginVertical: '2%' }}>
                    <Input
                      title={'Phone Number'}
                      urlImg={require('../../Assets/Images/phone.png')}
                      placeholder={'123 456 7890'}
                      pass={false}
                      value={valuePhoneNumber}
                      onChangeText={onChangePhoneNumber}
                      dob={false}
                      keyboardType={'numeric'}
                      maxLength={15}
                    />
                    {/* {errors.phoneNumber && touched.phoneNumber && (
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
                      )} */}
                    {!!errorPhoneNumber && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'red',
                          marginTop: 5,
                          // marginBottom: 15,
                          marginLeft: 41,
                        }}>
                        {errorPhoneNumber}
                      </Text>
                    )}
                  </View>
                  <View style={{ marginVertical: '2%' }}>
                    <InputWithCalenderWithDropdownList
                      title={'Date of Birth'}
                      urlImg={require('../../Assets/Images/calender.png')}
                      placeholder={'MM/DD/YYYY'}
                      onDateSelect={handleDateSelect} // Pass the callback function
                      initialDate={selectedDate} // Pass the initial date
                      // value={valuePhoneNumber}
                    // onChangeText={onChangePhoneNumber}
                    // disabled={true}
                    />
                    {!!errorDOB && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'red',
                          marginTop: 5,
                          // marginBottom: 15,
                          marginLeft: 41,
                        }}>
                        {errorDOB}
                      </Text>
                    )}
                  </View>

                  <View style={{ marginVertical: '2%' }}>
                    <Input
                      title={'Email ID'}
                      urlImg={require('../../Assets/Images/emailIcon.png')}
                      // placeholder={dataFromOtpScreenOfSignUp.Email}
                      placeholder={'email@domain.com'}
                      pass={false}
                      value={AuthReducer?.userData?.user?.email}
                      // value={userAuth.userData.user.email}
                      disabled={true}
                      onChangeText={onChangeEmail}
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

                  <View style={{ marginVertical: '2%' }}>
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
                      th={true}
                    />
                    {!!errorAddress && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'red',
                          marginTop: 5,
                          // marginBottom: 15,
                          marginLeft: 41,
                        }}>
                        {errorAddress}
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      flexDirection: 'row',
                      marginVertical: '4%',
                      marginBottom: 40,
                    }}>
                    <ButtonComp
                      btnwidth={'97%'}
                      btnHeight={56}
                      btnText={'Create Profile'}
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
                </View>
              </ScrollView>
              // </KeyboardAvoidingView>
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
