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
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SuccessModal} from '../../Components/ReusableComponent/SuccessModal';
import {useSelector} from 'react-redux';

export const Home = () => {
  const data = [
    {
      id: 1,
      type: 'Credit Card',
      cardNo: '****** ****** ****** 23456',
      holder: 'Billy Kane',
      day: '25',
      match: true,
    },
    {
      id: 2,
      type: 'Credit Card',
      cardNo: '****** ****** ****** 23456',
      holder: 'Billy Kane',
      day: '25',
      match: false,
    },
  ];
  const [lostCard, setLostCard] = useState(false);
  const Navigation = useNavigation();
  const [secondModal, setSecondModal] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);

  const FoundCards = () => {
    setLostCard(false);
  };
  const CardsLost = () => {
    setLostCard(true);
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <View
          style={{
            borderColor: 'rgba(11, 16, 92, 0.1)',
            borderRadius: 7,
            borderWidth: 1,
            height: 138,
            // width: 342,
            marginTop: 20,
          }}>
          <Pressable
            onPress={() => {
              item.match
                ? Navigation.navigate('ChatScreen', {
                    backName: 'Home',
                  })
                : setSecondModal(true);
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
                    txtAlign={'center'}
                    // p={10}
                    lh={18}
                    Heading={item.type}
                    color={'rgba(102, 112, 128, 1)'}
                    ml={Platform.OS === 'ios' ? -77 : -73}
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
                    Heading={item.cardNo}
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
                    Heading={item.holder}
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
                    Heading={item.day}
                    color={'rgba(102, 112, 128, 1)'}
                    // ml={20}
                    mt={5}
                  />
                </View>
              </View>
            </View>
          </Pressable>
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
            marginBottom: '0%',
          }}>
          <Header header={'Home'} />

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 40,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Heading
                Stylefont={'normal'}
                Fontweight={'bold'}
                Fontsize={23}
                txtAlign={'center'}
                p={10}
                lh={31}
                Heading={'Hello,'}
                color={'rgba(11, 16, 92, 1)'}
                ml={-10}
              />
              <Heading
                Stylefont={'normal'}
                Fontweight={'bold'}
                Fontsize={23}
                txtAlign={'center'}
                p={10}
                lh={31}
                Heading={AuthReducer?.userData?.user?.profile?.display_name}
                color={'rgba(249, 180, 1, 1)'}
                ml={-17}
              />
            </View>
            <View>
              <Image
                source={require('../../Assets/Images/homeImg.png')}
                style={{
                  width: 44,
                  height: 44,
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 14,
            }}>
            <View
              style={{
                borderColor: 'rgba(11, 16, 92, 0.1)',
                borderRadius: 10,
                borderWidth: 1,
                height: 249,
                // width: 171,
                flex: 1,
                marginRight: 2,
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 15,
                }}>
                <Image
                  source={require('../../Assets/Images/atmcard.png')}
                  style={{
                    // width: 44,
                    // height: 44,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                />
                <View
                  style={{
                    width: 31,
                    height: 31,
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    backgroundColor: 'rgba(220, 0, 0, 1)',
                    borderWidth: 3,
                    borderColor: 'white',
                    borderRadius: 75,
                    marginTop: 42,
                    // padding: 2
                  }}>
                  <Entypo name="cross" size={26} color={'white'} />
                </View>
              </View>
              <View style={{alignSelf: 'center'}}>
                <Heading
                  Stylefont={'normal'}
                  // Fontweight={'bold'}
                  Fontsize={18}
                  txtAlign={'center'}
                  //   p={10}
                  lh={23}
                  Heading={'Report Lost Card'}
                  color={'rgba(11, 16, 92, 1)'}
                  mt={20}
                  width={118}
                />
              </View>
              <Heading
                Stylefont={'normal'}
                // Fontweight={'bold'}
                Fontsize={11}
                txtAlign={'center'}
                // p={10}
                lh={15}
                Heading={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                }
                color={'rgba(102, 112, 128, 1)'}
                ml={-3}
                mb={20}
                // width={170}
              />
              {/* <View style={{alignSelf: 'center'}} */}
              <Pressable
                onPress={() => {
                  Navigation.navigate('LostNewCard');
                }}>
                <LinearGradient
                  colors={['#FCDD8E', '#F9B401']}
                  start={{x: 0.5, y: -5}}
                  end={{x: 0.4, y: 4}}
                  style={{
                    // flex: 1,
                    height: 30,
                    marginHorizontal: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 100,
                    borderRadius: 7,
                  }}>
                  <Heading
                    color={'#0B105C'}
                    Fontsize={12}
                    Heading={'Submit Form'}
                    // width={60}
                    txtAlign={'center'}
                  />
                </LinearGradient>
              </Pressable>
            </View>
            <View
              style={{
                borderColor: 'rgba(11, 16, 92, 0.1)',
                borderRadius: 10,
                borderWidth: 1,
                height: 249,
                width: 171,
                flex: 1,
              }}>
              <View style={{alignSelf: 'center', marginTop: 15}}>
                <Image
                  source={require('../../Assets/Images/atmcard2.png')}
                  style={{
                    width: 69,
                    height: 72,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                />
              </View>
              <View style={{alignSelf: 'center'}}>
                <Heading
                  Stylefont={'normal'}
                  // Fontweight={'bold'}
                  Fontsize={18}
                  txtAlign={'center'}
                  //   p={10}
                  lh={23}
                  Heading={'Report Found Card'}
                  color={'rgba(11, 16, 92, 1)'}
                  mt={12}
                  width={118}
                />
              </View>
              <Heading
                Stylefont={'normal'}
                // Fontweight={'bold'}
                Fontsize={11}
                txtAlign={'center'}
                // p={10}
                lh={15}
                Heading={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                }
                color={'rgba(102, 112, 128, 1)'}
                ml={-3}
                mb={20}
                // width={170}
              />
              {/* <View style={{alignSelf: 'center'}} */}
              <Pressable
                onPress={() => {
                  Navigation.navigate('FoundCard');
                }}>
                <LinearGradient
                  colors={['#FCDD8E', '#F9B401']}
                  start={{x: 0.5, y: -5}}
                  end={{x: 0.4, y: 4}}
                  style={{
                    // flex: 1,
                    height: 30,
                    // marginLeft: 33,
                    marginHorizontal: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 100,
                    borderRadius: 7,
                  }}>
                  <Heading
                    color={'#0B105C'}
                    Fontsize={12}
                    Heading={'Submit Form'}
                    // width={60}
                    txtAlign={'center'}
                  />
                </LinearGradient>
              </Pressable>
            </View>
          </View>
          {lostCard ? (
            <View
              style={{
                borderColor: 'rgba(11, 16, 92, 0.1)',
                borderWidth: 2,
                borderRadius: 5,
                height: 56,
                width: '100%',
                marginTop: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  //   width: 190,
                  alignItems: 'center',
                  flex: 1,
                  // marginLeft: 40,
                  justifyContent: 'center',
                  width: '52%',
                  borderRadius: 7,
                  borderColor: 'white',
                  borderWidth: 3,
                }}
                onPress={FoundCards}>
                <Text
                  style={{
                    color: '#10234E',
                    fontSize: 14,
                    // fontWeight: 'bold',
                  }}>
                  Found Cards
                </Text>
              </TouchableOpacity>
              <LinearGradient
                colors={['#0B105C', '#407BFF']}
                start={{x: 2, y: 0}}
                end={{x: 0, y: 1}}
                style={{
                  flex: 1,
                  // marginLeft: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '52%',
                  borderRadius: 7,
                  borderColor: 'white',
                  borderWidth: 3,
                  // shadowColor: 'rgba(11, 16, 92, 0.3)',
                  // shadowOffset: {width: 0, height: 15},
                  // shadowOpacity: 1,
                  // shadowRadius: 40,
                }}>
                <TouchableOpacity
                  style={{
                    //   width: 190,
                    alignItems: 'center',
                  }}
                  // onPress={setLostCard(false)}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      // fontWeight: 'bold',
                    }}>
                    Lost Cards
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          ) : (
            <View
              style={{
                borderColor: 'rgba(11, 16, 92, 0.1)',
                borderWidth: 2,
                borderRadius: 5,
                height: 56,
                width: '100%',
                marginTop: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <LinearGradient
                colors={['#0B105C', '#407BFF']}
                start={{x: 2, y: 0}}
                end={{x: 0, y: 1}}
                style={{
                  flex: 1,
                  // marginLeft: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '52%',
                  borderRadius: 7,
                  borderColor: 'white',
                  borderWidth: 3,
                }}>
                <TouchableOpacity
                  style={{
                    //   width: 190,
                    alignItems: 'center',
                  }}
                  //   onPress={yes}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      // fontWeight: 'bold',
                    }}>
                    Found Cards
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              <TouchableOpacity
                style={{
                  //   width: 190,
                  alignItems: 'center',
                  flex: 1,
                  // marginLeft: 40,
                  justifyContent: 'center',
                  width: '52%',
                  borderRadius: 7,
                  borderColor: 'white',
                  borderWidth: 3,
                }}
                onPress={CardsLost}>
                <Text
                  style={{
                    color: '#10234E',
                    fontSize: 14,
                    // fontWeight: 'bold',
                  }}>
                  Lost Cards
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </>
    );
  };
  return (
    <>
      <SuccessModal
        set={setSecondModal}
        get={secondModal}
        txt={'Sorry, no match was found'}
        done={() => {
          setSecondModal(false);
        }}
        urlImg={require('../../Assets/Images/unsuccessful.png')}
        btntxt={'Go Back'}
      />
      <SafeArea>
        <View
          style={{
            marginHorizontal: '5%',
            marginVertical: '5%',
            marginBottom: Platform.OS === 'ios' ? '13.5%' : '22%',
            // borderBottomColor: 'rgba(0, 0, 0, 0.1)',
            // borderBottomWidth: 1,
          }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{flexDirection: 'column'}}
            ListHeaderComponent={ListHeaderComponent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeArea>
    </>
  );
};
