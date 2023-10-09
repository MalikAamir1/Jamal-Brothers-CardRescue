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

export const FoundCardsList = ({route}) => {
  const Navigation = useNavigation();
  const [secondModal, setSecondModal] = useState(false);

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

  const renderItem = ({item}) => {
    return (
      <>
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
              item.match
                ? Navigation.navigate('ChatScreen', {
                    backName: 'Found Cards',
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
            marginHorizontal: '5%',
            marginTop: '5%',
            // marginBottom: Platform.OS === 'ios' ? '18%' : '28%',
          }}>
          <Header header={'Found Cards'} screenName={true} />
        </View>
      </>
    );
  };

  // const ListFooterComponent = () => {
  //   return (
  //     <>
  //       {/* <View
  //         style={{flexDirection: 'column', justifyContent: 'space-between'}}>
  //         <View></View> */}

  //       <View
  //         style={{
  //           // marginTop: 200,
  //           // marginBottom: -20,
  //           margin: '5%',
  //           // position: 'absolute',
  //           bottom: 0,
  //           // left: 0,
  //           // right: 0,
  //         }}>
  //         <View
  //           style={{
  //             justifyContent: 'center',
  //             alignContent: 'center',
  //             flexDirection: 'row',
  //             marginVertical: '8%',
  //           }}>
  //           <ButtonComp
  //             btnwidth={'97%'}
  //             btnHeight={56}
  //             btnText={'Report Found Card'}
  //             justify={'center'}
  //             align={'center'}
  //             fontSize={16}
  //             radius={15}
  //             txtwidth={'100%'}
  //             // bgcolor={'#BA7607'}
  //             press={() => {
  //               Navigation.navigate('FoundCard');
  //             }}
  //           />
  //         </View>
  //       </View>
  //       {/* </View> */}
  //     </>
  //   );
  // };

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
            //   marginVertical: '5%',
            marginBottom: Platform.OS === 'ios' ? 0 : '6%',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.metal_id}
              contentContainerStyle={{
                flexDirection: 'column',
              }}
              ListHeaderComponent={ListHeaderComponent}
              // ListFooterComponent={ListFooterComponent}
              showsVerticalScrollIndicator={false}
              // ListFooterComponentStyle={{
              //   alignContent: 'flex-end',
              // }}
            />
          </View>
          <View
            style={{
              // marginTop: 200,
              marginBottom: 50,
              margin: '5%',
              // position: 'absolute',
              bottom: 0,
              // left: 0,
              // right: 0,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                marginVertical: '8%',
                height: 45,
              }}>
              <ButtonComp
                btnwidth={'97%'}
                btnHeight={56}
                btnText={'Report Found Card'}
                justify={'center'}
                align={'center'}
                fontSize={16}
                radius={15}
                txtwidth={'100%'}
                // bgcolor={'#BA7607'}
                press={() => {
                  Navigation.navigate('FoundCard');
                }}
              />
            </View>
          </View>
        </View>
      </SafeArea>
    </>
  );
};
