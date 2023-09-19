import {FlatList, Image, ImageBackground, Platform, View} from 'react-native';
import Head from '../../Components/ReusableComponent/Head';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {SuccessModal} from '../../Components/ReusableComponent/SuccessModal';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Heading from '../../Components/ReusableComponent/Heading';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';

export const ChatScreen = ({route}) => {
  const Navigation = useNavigation();
  const [secondModal, setSecondModal] = useState(false);
  let backNames = route.params.backName;
  console.log(backNames);

  const data = [
    {
      id: 1,
      image: require('../../Assets/Images/profileImage2.png'),
      message:
        'Lorem Ipsum is simply a dummy text of the printing nad typesetting industry.',
      match: true,
    },
    {
      id: 2,
      image: require('../../Assets/Images/profileImage2.png'),
      message:
        'Lorem Ipsum is simply a dummy text of the printing nad typesetting industry.',
      match: true,
    },
    {
      id: 3,
      image: require('../../Assets/Images/profileImage3.png'),
      message:
        'Lorem Ipsum is simply a dummy text of the printing nad typesetting industry.',
      match: false,
    },
    {
      id: 4,
      image: require('../../Assets/Images/profileImage3.png'),
      message:
        'Lorem Ipsum is simply a dummy text of the printing nad typesetting industry.',
      match: false,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <>
        <View>
          {item.match ? (
            <View style={{marginBottom: 25}}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Image source={item.image} style={{marginTop: -30}} />
                <View>
                  <LinearGradient
                    colors={['#0B105C', '#407BFF']}
                    start={{x: 2, y: 0}}
                    end={{x: 0, y: 1}}
                    style={{
                      flex: 1,
                      // marginLeft: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 230,
                      borderRadius: 7,
                      borderColor: 'white',
                      borderWidth: 3,
                      // shadowColor: 'rgba(11, 16, 92, 0.3)',
                      // shadowOffset: {width: 0, height: 15},
                      // shadowOpacity: 1,
                      // shadowRadius: 40,
                    }}>
                    <Heading
                      Stylefont={'normal'}
                      Fontsize={13}
                      txtAlign={'left'}
                      p={10}
                      lh={18}
                      Heading={item.message}
                      color={'rgba(255, 255, 255, 1)'}
                      //   ml={-17}
                    />
                  </LinearGradient>
                </View>
              </View>
              <Heading
                Heading={'12:30'}
                color={'rgba(156, 156, 156, 1)'}
                Fontsize={12}
                txtAlign={'right'}
                mr={Platform.OS === 'ios' ? 95 : 70}
              />
            </View>
          ) : (
            <View style={{marginBottom: 25}}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(255, 255, 255, 5)',
                    // marginLeft: 40,
                    // justifyContent: 'right',
                    // alignItems: 'right',
                    borderRadius: 7,
                    borderColor: 'white',
                    borderWidth: 3,
                    marginLeft: 70,
                    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                  }}>
                  <Heading
                    Fontsize={13}
                    width={220}
                    txtAlign={'left'}
                    p={10}
                    lh={18}
                    Heading={item.message}
                    color={'rgba(156, 156, 156, 1)'}
                    // ml={-17}
                  />
                </View>
                <Image source={item.image} style={{marginTop: -30}} />
              </View>
              <Heading
                Heading={'12:30'}
                color={'rgba(156, 156, 156, 1)'}
                Fontsize={12}
                // txtAlign={'left'}
                ml={80}
                mt={2}
              />
            </View>
          )}
        </View>
      </>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <View
          style={
            {
              // marginHorizontal: '5%',
              // marginTop: '5%',
              // marginBottom: Platform.OS === 'ios' ? '18%' : '28%',
            }
          }>
          <Head
            head={'Mia William'}
            // backName={backNames == 'Profile' ? true : false}
            backName={backNames}
            // screenName={false}
            // screenName={false}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row',
            marginVertical: '12%',
            // marginLeft: '-2%',
            // marginTop: '5%',
            marginHorizontal: 20,
          }}>
          <ButtonComp
            btnText={'Mark As Return'}
            press={() => {
              setSecondModal(true);
            }}
          />
        </View>
      </>
    );
  };

  const ListFooterComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'rgba(11, 16, 92, 0.5)',
            borderWidth: 1,
            backgroundColor: 'white',
            width: '90%',
            borderRadius: 20,
            height: 48,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 5,
            marginLeft: 18,
            marginBottom: 20,
          }}>
          <TextInput
            placeholder="Type message"
            contextMenuHidden={true}
            style={{
              flex: 1,
              backgroundColor: 'transparent', // Make the TextInput background transparent
              color: 'black',
              fontSize: 12,
            }}
            placeholderTextColor={'rgba(102, 112, 128, 1)'}
            activeUnderlineColor={'transparent'}
            underlineColorAndroid={'transparent'}
            underlineColor={'transparent'}
          />
          <Image
            source={require('../../Assets/Images/sendLocation.png')}
            style={{marginRight: 10}}
          />
          <Image
            source={require('../../Assets/Images/sendmessage.png')}
            style={{width: 46, height: 76, marginRight: 1, marginTop: 2}}
          />
        </View>
      </>
    );
  };

  return (
    <>
      <SuccessModal
        set={setSecondModal}
        get={secondModal}
        txt={'Card Add Successfully'}
        done={() => {
          setSecondModal(false);
          Navigation.navigate('ReturnedCards');
        }}
        urlImg={require('../../Assets/Images/successIcon.png')}
        btntxt={'Go Back'}
        paratxt={'The card has been return to his rightful owner.'}
      />

      <SafeArea>
        <View
          style={
            {
              //   marginVertical: '5%',
              // marginBottom: Platform.OS === 'ios' ? '10%' : '28%',
            }
          }>
          <FlatList
            data={data}
            renderItem={renderItem}
            // keyExtractor={item => item.metal_id}
            contentContainerStyle={{flexDirection: 'column'}}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeArea>
    </>
  );
};
