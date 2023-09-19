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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
import { BASE_URL } from '../../App/api';
import { getDataFromAsync, setDataToAsync } from '../../Utils/getAndSetAsyncStorage';
import { userDataFromAsyncStorage } from '../../Store/Reducers/AuthReducer';

export const AddCard = ({route}) => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  // const userAuth = useSelector(state => state.AuthReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const DefaultObject = {id: 1};

  const [modalVisible, setModalVisible] = useState(false);
  const [secondModal, setSecondModal] = useState(false);

  const [screenName, setScreenName] = useState('ProfileCreate');
  const [cardType, setCardtype] = useState({});
  const [bank, setBank] = useState({});
  const [error, onChangeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardHolder, setCardHolder] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [addCardPress, setAddCardPress] = useState(false);
  const [arrayOfCard, setArrayOfCard] = useState([DefaultObject]);

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

  const updateArrayOfCard = () => {
    const newObj = {id: 'random'};
    setArrayOfCard([...arrayOfCard, newObj]);
  };

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

  const ListHeaderComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            margin: '8%',
            marginBottom: 0,
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
        <View style={{alignItems: 'center', marginTop: 20}}>
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
        <View style={{marginBottom: '11%', marginTop: 10}}>
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
        <Pressable
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
        </Pressable>

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
              setModalVisible(true);
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

  const renderItem = ({item, index}) => {
    return (
      <>
        {index > 0 && ( // Check if it's not the first item in the array
          <View
            style={{
              borderTopWidth: 0.5,
              borderTopColor: 'rgba(156, 156, 156, 0.6)',
              marginTop: 20,
              paddingTop: 40,
            }}
          />
        )}
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
            {/* {errors.confirmPassword && touched.confirmPassword && (
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
            )} */}
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
            {/* {errors.confirmPassword && touched.confirmPassword && (
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
            )} */}
          </View>
        </View>
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
            : setSecondModal(true);
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
                AuthReducer.userData.token,
              )
                .then(result => {
                  console.log(result);
                  setLoading(false);

                  setDataToAsync('user', JSON.stringify(result));

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
              <View style={{marginTop: 25, marginHorizontal: 20}}>
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
              // <ScrollView>
              <View
                style={{
                  marginHorizontal: '5%',
                  marginTop: Platform.OS === 'ios' ? '15%' : 6,
                }}>
                <FlatList
                  data={arrayOfCard}
                  renderItem={renderItem}
                  keyExtractor={item => item.metal_id}
                  contentContainerStyle={{flexDirection: 'column'}}
                  ListHeaderComponent={ListHeaderComponent}
                  ListFooterComponent={ListFooterComponent}
                  showsVerticalScrollIndicator={false}
                />
              </View>
              // </ScrollView>
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
