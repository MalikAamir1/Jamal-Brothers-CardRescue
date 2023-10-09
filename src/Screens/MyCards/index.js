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
import {useEffect, useState} from 'react';
import Head from '../../Components/ReusableComponent/Head';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {useNavigation} from '@react-navigation/native';
import {ModalView} from '../../Components/ReusableComponent/Modal';
import CheckBox from '../../Components/ReusableComponent/Checkbox';
import {SuccessModal} from '../../Components/ReusableComponent/SuccessModal';

export const MyCards = ({route}) => {
  const Navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [cardSelect, setCardSelect] = useState(false);
  const [screenName, setScreenName] = useState(
    route.params.screenName ? route.params.screenName : false,
  );
  const [selectedCard, setSelectedCard] = useState();
  console.log('screenName', screenName);
  // console.log(route.params);
  useEffect(() => {
    // Access prevName from route.params and check its value
    const prevName = route.params.prevName;
    console.log('prevName', prevName);

    if (prevName === 'Profile') {
      console.log('yes');
      setModalVisible(true); // Set modalVisible to true
      setScreenName(true);
    } else {
      console.log('No');
    }
  }, [route.params.prevName]);

  const data = [
    {
      id: 1,
      type: 'Credit Card',
      cardNo: '****** ****** ****** 23456',
      holder: 'Billy Kane',
      day: '25',
      match: false,
    },
    {
      id: 2,
      type: 'Credit Card',
      cardNo: '****** ****** ****** 23456',
      holder: 'Billy Kane',
      day: '25',
      match: true,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <>
        {cardSelect ? (
          <View style={{flexDirection: 'row'}}>
            <View>
              <CheckBox isChecked={item.match} />
            </View>
            <View
              style={{
                borderColor: 'rgba(11, 16, 92, 0.1)',
                // marginHorizontal: '2%',
                borderRadius: 7,
                borderWidth: 1,
                height: 138,
                //   width: 332,
                marginTop: 10,
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
            </View>
          </View>
        ) : (
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
            <Pressable
              onPress={() => {
                setModalVisible(true);
                setSelectedCard(item.id);
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
        )}
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
            marginBottom: 10,
          }}>
          {/* <Head head={'My Cards'} screenName={true} /> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '2%',
              justifyContent: 'space-between',
              // marginTop: Platform.OS === 'ios' ? '10%' : 0,
              //   margin: '8%',
              //   marginBottom: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                margin: Platform.OS === 'ios' ? '6%' : '6%',
                marginBottom: 0,
              }}>
              <Pressable
                onPress={() => {
                  screenName
                    ? Navigation.navigate('Home')
                    : cardSelect
                    ? setCardSelect(false)
                    : Navigation.goBack();
                  // setScreenName(false);
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
            <View style={{marginTop: '6%'}}>
              <Heading
                Stylefont={'normal'}
                Fontweight={'bold'}
                Fontsize={18}
                Heading={'My Cards'}
                color={'#0B105C'}
              />
            </View>
            <View>
              <Heading
                Stylefont={'normal'}
                Fontweight={'bold'}
                Fontsize={18}
                Heading={'             '}
                color={'black'}
              />
            </View>
          </View>
        </View>
      </>
    );
  };

  // const ListFooterComponent = () => {
  //   return (
  //     <>
  //       <View
  //         style={{
  //           flexGrow: 1,
  //           marginHorizontal: '3%',
  //           padding: 15,
  //           borderRadius: 15,
  //           marginTop: 100,
  //         }}>
  //         <View
  //           style={{
  //             justifyContent: 'center',
  //             alignContent: 'center',
  //             flexDirection: 'row',
  //             //   marginVertical: '5%',
  //             marginLeft: '-2%',
  //             // marginTop: '5%',
  //           }}>
  //           {cardSelect ? (
  //             <ButtonComp
  //               btnText={'Submit'}
  //               press={() => {
  //                 setSecondModal(true);
  //                 console.log('ssss');
  //                 //   Login();
  //               }}
  //             />
  //           ) : (
  //             <ButtonComp
  //               btnText={'Add Card'}
  //               press={() => {
  //                 Navigation.navigate('AddCard', {
  //                   screenName: 'MyCards',
  //                 });
  //                 //   Login();
  //               }}
  //             />
  //           )}
  //         </View>
  //       </View>
  //     </>
  //   );
  // };

  return (
    <>
      <ModalView
        set={setModalVisible}
        get={modalVisible}
        cross={() => setModalVisible(false)}
        txt={'Have you lost this card?'}
        no={() => {
          setModalVisible(false);
        }}
        yes={() => {
          setModalVisible(!modalVisible);
          setCardSelect(true);
        }}
      />

      <SuccessModal
        set={setSecondModal}
        get={secondModal}
        txt={'Card Add Successfully'}
        done={() => {
          setSecondModal(false);
          setCardSelect(false);
          Navigation.navigate('LostCards');
        }}
        urlImg={require('../../Assets/Images/successIcon.png')}
        btntxt={'Done'}
        paratxt={
          "You should freeze your card with your bank until it's recovered or matched"
        }
      />

      <SafeArea>
        <View
          style={{
            //   marginVertical: '5%',
            // marginBottom: Platform.OS === 'ios' ? '18%' : '28%',
            marginBottom: Platform.OS === 'ios' ? 0 : '6%',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.metal_id}
              contentContainerStyle={{flexDirection: 'column'}}
              ListHeaderComponent={ListHeaderComponent}
              // ListFooterComponent={ListFooterComponent}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        <View
          style={{
            // flexGrow: 1,
            // marginHorizontal: '3%',
            // padding: 15,
            // borderRadius: 15,
            // marginTop: 100,
            marginBottom: 50,
            margin: '5%',
            // position: 'absolute',
            bottom: 0,
          }}>
          <View
            style={{
              // justifyContent: 'center',
              // alignContent: 'center',
              // flexDirection: 'row',
              // //   marginVertical: '5%',
              // marginLeft: '-2%',
              // marginTop: '5%',
              justifyContent: 'center',
              alignContent: 'center',
              flexDirection: 'row',
              marginVertical: '8%',
              height: 45,
            }}>
            {cardSelect ? (
              <ButtonComp
                btnText={'Submit'}
                press={() => {
                  setSecondModal(true);
                  console.log('ssss');
                  //   Login();
                }}
              />
            ) : (
              <ButtonComp
                btnText={'Add Card'}
                press={() => {
                  Navigation.navigate('AddCard', {
                    screenName: 'MyCards',
                  });
                  //   Login();
                }}
              />
            )}
          </View>
        </View>
      </SafeArea>
    </>
  );
};
