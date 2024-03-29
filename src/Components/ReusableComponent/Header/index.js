import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Heading from '../Heading';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import COLORS from '../../../Assets/Style/Color';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-paper';
import Modal from 'react-native-modal';
import SideMenu from '../SideMenu';
import Entypo from 'react-native-vector-icons/Entypo';
import {ModalView} from '../Modal';
import {removeDataToAsync} from '../../../Utils/getAndSetAsyncStorage';
import {useDispatch, useSelector} from 'react-redux';
import {removeUserDataFromAsyncStorage} from '../../../Store/Reducers/AuthReducer';
import {ScrollView} from 'react-native-gesture-handler';
import {ModalWithButton} from '../Modalwithbutton';

const {width} = Dimensions.get('window');

export const Header = props => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const [screenName, setScreenName] = useState(
    props.screenName ? props.screenName : false,
  );
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [notificationCount, setNotificationCount] = useState(2);
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalButton, setModalButton] = useState(false);

  console.log('AuthReducer:', AuthReducer?.userData?.user?.profile?.profile_pic);
  console.log('modalButton:', modalButton);

  const callLogoutFunctionPopUP = () => {
    // setIsSideMenuVisible(false);
    setModalVisible(true);
    // removeDataToAsync('token');
    // removeDataToAsync('user');
    // dispatch(removeUserDataFromAsyncStorage());
  };

  return (
    <>
      <Modal
        isVisible={isSideMenuVisible}
        animationIn="slideInLeft" // Has others, we want slide in from the left
        animationOut="slideOutLeft" // When discarding the drawer
        swipeDirection="left" // Discard the drawer with swipe to left
        useNativeDriver // Faster animation
        hideModalContentWhileAnimating // Better performance, try with/without
        propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
        style={styles.sideMenuStyle} // Needs to contain the width, 75% of screen width in our case
        onBackdropPress={() => setIsSideMenuVisible(false)}>
        <ModalView
          set={setModalVisible}
          get={modalVisible}
          txt={'Are you sure you want to logout?'}
          no={() => {
            setModalVisible(false);
          }}
          yes={() => {
            setIsSideMenuVisible(false);
            setModalVisible(false);
            removeDataToAsync('token');
            removeDataToAsync('user');
            dispatch(removeUserDataFromAsyncStorage());
            // Navigation.navigate('login');
          }}
        />
        {/* <ModalWithButton
          set={setModalButton}
          get={modalButton}
          onBackdropPress={() => setIsSideMenuVisible(false)}
        /> */}
        {/* start */}
        <View style={{flex: 1, zIndex: 2}}>
          {Platform.OS === 'ios' ? (
            <StatusBar hidden={true} />
          ) : (
            <StatusBar hidden={false} />
          )}

          <ImageBackground
            source={require('../../../Assets/Images/drawerback.png')}
            style={{flex: 1, resizeMode: 'cover'}}>
            <ScrollView style={{flex: 1}}>
              <Pressable
                onPress={() => {
                  console.log('prtffrtfty');
                  setIsSideMenuVisible(false);
                }}>
                <View
                  style={{
                    backgroundColor: 'rgba(251, 209, 101, 1)',
                    borderBottomStartRadius: 20,
                    padding: 4,
                    alignContent: 'flex-end',
                    alignItems: 'flex-end',
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                    // flexDirection: 'row',
                    // marginTop: 50,
                  }}>
                  <Entypo
                    name="cross"
                    size={35}
                    color="rgba(16, 35, 78, 1)"
                    style={{paddingLeft: 5}}
                  />
                </View>
              </Pressable>
              {/* <Pressable onPress={yourButtonPressHandler}> */}
              {/* <Text style={styles.buttonInsideModal}>Button</Text> */}
              {/* </Pressable> */}
              <View
                style={{
                  alignItems: 'center',
                  // marginTop: Platform.OS === 'ios' ? '15%' : 45,
                  marginBottom: 50,
                  marginTop: 10,
                }}>
                <Image
                  // source={require('../../Assets/Images/drawerLogIcon.png')}
                  source={require('../../../Assets/Images/drawerLogIcon.png')}
                  //   style={{width: 170, height: 150}}
                  resizeMode={'contain'}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 98,
                    height: 98,
                    alignSelf: 'center',
                    marginTop: -10,
                    // marginBottom: '8%',
                    backgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: 'rgba(11, 16, 92, 0.3)',
                    borderRadius: 75,
                  }}>
                  <Image
                    // source={require('../../../Assets/Images/profileImage.png')}
                    source={{
                      uri: `http://23.26.137.178:8000//${AuthReducer?.userData?.user?.profile?.profile_pic}`,
                    }}
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      width: 87,
                      height: 89,
                      marginTop: 2,
                      borderRadius: 75,
                    }}
                    resizeMode={'cover'}
                  />
                </View>
              </View>
              <View>
                <Heading
                  Stylefont={'normal'}
                  Fontweight={'bold'}
                  Fontsize={20}
                  txtAlign={'center'}
                  // p={10}
                  lh={26}
                  Heading={AuthReducer?.userData?.user?.profile?.display_name}
                  color={'rgba(16, 35, 78, 1)'}
                  // ml={-10}
                  //   mb={20}
                  //   width={170}
                  mt={10}
                  mx={20}
                />
                <Heading
                  Stylefont={'normal'}
                  // Fontweight={'bold'}
                  Fontsize={14}
                  txtAlign={'center'}
                  // p={10}
                  lh={20}
                  Heading={AuthReducer?.userData?.user?.email}
                  color={'rgba(16, 35, 78, 1)'}
                  mt={3}
                  // ml={-10}
                  mb={20}
                  mx={25}
                />
              </View>
              <View style={{flex: 1, paddingTop: 10}}>
                <View style={{marginTop: '5%', marginLeft: '10%'}}>
                  <Pressable
                    onPress={() => {
                      setIsSideMenuVisible(false);
                      Navigation.navigate('Home');
                      // console.log('dsfdsfaf')
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../../Assets/Images/home.png')}
                        style={{
                          width: 24,
                          height: 24,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}
                      />
                      <Heading
                        Heading={'Home'}
                        Fontsize={18} // Adjust the font size as needed
                        fontWeight={'normal'}
                        height={20}
                        color={'rgba(16, 35, 78, 1)'}
                        ml={20}
                        // color={COLORS.dark}
                        // Fontweight={'bold'}
                        // txtAlign={'center'}
                      />
                    </View>
                  </Pressable>
                </View>
                <View style={{marginTop: '6%', marginLeft: '10%'}}>
                  <Pressable
                    onPress={() => {
                      setIsSideMenuVisible(false);
                      Navigation.navigate('LostCards');
                      // console.log('dsfdsfaf')
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../../Assets/Images/lostcards.png')}
                        style={{
                          width: 24,
                          height: 24,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}
                      />
                      <Heading
                        Heading={'Lost Cards'}
                        Fontsize={18} // Adjust the font size as needed
                        fontWeight={'normal'}
                        height={20}
                        color={'rgba(16, 35, 78, 1)'}
                        ml={20}
                        // txtAlign={'center'}
                      />
                    </View>
                  </Pressable>
                </View>
                <View style={{marginTop: '6%', marginLeft: '10%'}}>
                  <Pressable
                    onPress={() => {
                      setIsSideMenuVisible(false);
                      Navigation.navigate('FoundCardsList');
                      // console.log('dsfdsfaf')
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../../Assets/Images/foundcards.png')}
                        style={{
                          width: 24,
                          height: 24,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}
                      />
                      <Heading
                        Heading={'Found Cards'}
                        Fontsize={18} // Adjust the font size as needed
                        fontWeight={'normal'}
                        height={20}
                        color={'rgba(16, 35, 78, 1)'}
                        ml={20}
                        // txtAlign={'center'}
                      />
                    </View>
                  </Pressable>
                </View>
                <View style={{marginTop: '6%', marginLeft: '10%'}}>
                  <Pressable
                    onPress={() => {
                      setIsSideMenuVisible(false);
                      Navigation.navigate('Chats');
                      // console.log('dsfdsfaf')
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../../Assets/Images/chats.png')}
                        style={{
                          width: 24,
                          height: 24,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}
                      />
                      <Heading
                        Heading={'Chats'}
                        Fontsize={18} // Adjust the font size as needed
                        fontWeight={'normal'}
                        height={20}
                        color={'rgba(16, 35, 78, 1)'}
                        ml={20}
                        // txtAlign={'center'}
                      />
                    </View>
                  </Pressable>
                </View>
                <View style={{marginTop: '6%', marginLeft: '10%'}}>
                  <Pressable
                    onPress={() => {
                      setIsSideMenuVisible(false);
                      Navigation.navigate('ReturnedCards');
                      // console.log('dsfdsfaf')
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../../Assets/Images/returnedchats.png')}
                        style={{
                          width: 24,
                          height: 21.74,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}
                      />
                      <Heading
                        Heading={'Returned Cards'}
                        Fontsize={18} // Adjust the font size as needed
                        fontWeight={'normal'}
                        height={20}
                        color={'rgba(16, 35, 78, 1)'}
                        ml={20}
                        // txtAlign={'center'}
                      />
                    </View>
                  </Pressable>
                </View>
                <View style={{marginTop: '6%', marginLeft: '10%'}}>
                  <Pressable
                    onPress={() => {
                      setIsSideMenuVisible(false);
                      Navigation.navigate('MyCards', {
                        prevName: 'Header',
                        screenName: screenName,
                      });
                      // console.log('dsfdsfaf')
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../../Assets/Images/mycards.png')}
                        style={{
                          width: 24,
                          height: 24,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}
                      />
                      <Heading
                        Heading={'My Cards'}
                        Fontsize={18} // Adjust the font size as needed
                        fontWeight={'normal'}
                        height={20}
                        color={'rgba(16, 35, 78, 1)'}
                        ml={20}
                        // txtAlign={'center'}
                      />
                    </View>
                  </Pressable>
                </View>
                <View style={{marginTop: '6%', marginLeft: '10%'}}>
                  <Pressable
                    onPress={() => {
                      setIsSideMenuVisible(false);
                      Navigation.navigate('Profile');
                      // console.log('dsfdsfaf')
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../../Assets/Images/myprofile.png')}
                        style={{
                          width: 24,
                          height: 24,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}
                      />
                      <Heading
                        Heading={'My Profile'}
                        Fontsize={18} // Adjust the font size as needed
                        fontWeight={'normal'}
                        height={20}
                        color={'rgba(16, 35, 78, 1)'}
                        ml={20}
                        // txtAlign={'center'}
                      />
                    </View>
                  </Pressable>
                </View>
                <View style={{marginTop: '6%', marginLeft: '10%'}}>
                  <Pressable
                    onPress={() => {
                      setIsSideMenuVisible(false);
                      setModalButton(true);
                      Navigation.navigate('Feedback');
                      // console.log('dsfdsfaf')
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../../Assets/Images/feedback.png')}
                        style={{
                          width: 24,
                          height: 22.28,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}
                      />
                      <Heading
                        Heading={'Feedback'}
                        Fontsize={18} // Adjust the font size as needed
                        fontWeight={'normal'}
                        height={20}
                        color={'rgba(16, 35, 78, 1)'}
                        ml={20}
                        // txtAlign={'center'}
                      />
                    </View>
                  </Pressable>
                </View>
                <View style={{marginTop: '6%', marginLeft: '10%'}}>
                  <Pressable
                    onPress={() => {
                      setIsSideMenuVisible(false);
                      setModalButton(false);
                      Navigation.navigate('Settings');
                      // console.log('dsfdsfaf')
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../../Assets/Images/setting.png')}
                        style={{
                          width: 24,
                          height: 24,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}
                      />
                      <Heading
                        Heading={'Settings'}
                        Fontsize={18} // Adjust the font size as needed
                        fontWeight={'normal'}
                        height={20}
                        color={'rgba(16, 35, 78, 1)'}
                        ml={20}
                        // txtAlign={'center'}
                      />
                    </View>
                  </Pressable>
                </View>
              </View>
              <Pressable onPress={callLogoutFunctionPopUP}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    marginTop: 45,
                    height: 56,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginRight: 280,
                    borderRadius: 10,
                    width: 252,
                    marginLeft: -10,
                    // borderEndEndRadius: 10,
                    // borderStartEndRadius: 10,
                    marginBottom: Platform.OS === 'ios' ? 60 : 30,
                  }}>
                  <Image
                    source={require('../../../Assets/Images/logout.png')}
                    style={{marginLeft: -50}}
                    resizeMode={'contain'}
                  />
                  <Heading
                    Stylefont={'normal'}
                    // Fontweight={'bold'}
                    Fontsize={18}
                    // txtAlign={'center'}
                    // p={10}
                    lh={20}
                    Heading={'Logout'}
                    color={'rgba(16, 35, 78, 1)'}
                    // mt={3}
                    ml={30}
                    // mb={20}
                    //   width={170}
                  />
                </View>
              </Pressable>
            </ScrollView>
          </ImageBackground>
        </View>
        {/* End */}
      </Modal>

      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{alignSelf: 'center'}}>
          <Pressable
            onPress={() => {
              // Navigation.dispatch(DrawerActions.openDrawer());
              setIsSideMenuVisible(true);
              // setModalButton(true);
              // setModalVisible(true);
            }}>
            <Image
              source={require('../../../Assets/Images/menuIcon.png')}
              style={{
                width: 24,
                height: 24,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
            />
            {/* <MaterialIcons name="menu-open" size={30} color={'black'} /> */}
          </Pressable>
        </View>
        <View style={{alignSelf: 'center', width: 200, marginLeft: 20}}>
          <Heading
            Heading={props.header}
            Fontsize={18}
            //   color={COLORS.dark}
            Fontweight={'bold'}
            txtAlign={'center'}
            color={'rgba(11, 16, 92, 1)'}
          />
        </View>
        <View style={{alignSelf: 'center'}}>
          <Pressable
            onPress={() => {
              Navigation.navigate('MyCards', {
                prevName: 'Header',
                screenName: screenName,
              });
            }}
            style={{position: 'relative'}}>
            <Image
              source={require('../../../Assets/Images/allCards.png')}
              style={{
                width: 28,
                height: 24,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}
            />
          </Pressable>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Pressable
            onPress={() => {
              Navigation.navigate('Notifications');
            }}
            style={{position: 'relative'}}>
            <Image
              source={require('../../../Assets/Images/notification.png')}
              style={{
                width: 25,
                height: 27,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
            />
            {notificationCount > 0 && (
              <View
                style={{
                  position: 'absolute',
                  // top: -2,
                  right: -1,
                  backgroundColor: 'red',
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: 'white',
                  width: 16,
                  height: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 8,
                    fontWeight: 'bold',
                    padding: 0,
                    margin: 0,
                  }}>
                  {notificationCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sideMenuStyle: {
    margin: 0,
    width: width * 0.8, // SideMenu width,
  },
  buttonInsideModal: {
    backgroundColor: 'blue',
    overflow: 'visible',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    right: -20, // Adjust this value to position the button outside the modal
    top: 20, // Adjust this value to position the button vertically inside the modal
    zIndex: 1, // Ensure the button is above the modal content
  },
});
