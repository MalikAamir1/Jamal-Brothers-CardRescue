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
import Head from '../../Components/ReusableComponent/Head';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {useNavigation} from '@react-navigation/native';
import {ModalView} from '../../Components/ReusableComponent/Modal';
import CheckBox from '../../Components/ReusableComponent/Checkbox';
import {SuccessModal} from '../../Components/ReusableComponent/SuccessModal';

export const Chats = () => {
  const Navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [cardSelect, setCardSelect] = useState(false);
  const [selectedCard, setSelectedCard] = useState();

  const data = [
    {
      id: 1,
      head: 'Mia William',
      description: 'great idea',
      time: '12:30',
      image: require('../../Assets/Images/chatuser1.png'),
    },
    {
      id: 2,
      head: 'Marvin',
      description: 'great idea',
      time: '12:30',
      image: require('../../Assets/Images/chatuser2.png'),
    },
    {
      id: 3,
      head: 'Esther Wade',
      description: 'great idea',
      time: '12:30',
      image: require('../../Assets/Images/chatuser3.png'),
    },
    {
      id: 4,
      head: 'Kristin',
      description: 'great idea',
      time: '12:30',
      image: require('../../Assets/Images/chatuser4.png'),
    },
    {
      id: 5,
      head: 'Annette',
      description: 'great idea',
      time: '12:30',
      image: require('../../Assets/Images/chatuser5.png'),
    },
    {
      id: 6,
      head: 'Brooklyn',
      description: 'great idea',
      time: '12:30',
      image: require('../../Assets/Images/chatuser6.png'),
    },
    {
      id: 7,
      head: 'Wade',
      description: 'great idea',
      time: '12:30',
      image: require('../../Assets/Images/chatuser7.png'),
    },
  ];

  const renderItem = ({item}) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            // marginHorizontal: '%',
            width: '100%',
            // marginBottom: 10,
          }}>
          <View
            style={{
              flex: 1,
              borderBottomColor: 'rgba(156, 156, 156, 0.7)',
              borderRadius: 7,
              borderBottomWidth: 0.5,
              height: 69,
              //   width: 332,
              marginTop: 10,
              marginHorizontal: '2%',
            }}>
            <View
              style={{
                // justifyContent: 'space-between',
                flexDirection: 'row',
                // marginTop: 40,
              }}>
              <View>
                <Image
                  source={item.image}
                  style={{
                    width: 57,
                    height: 57,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <View style={{marginLeft: 2}}>
                  <View
                    style={{
                      // flexDirection: 'row',
                      marginTop: 3,
                    }}>
                    <Heading
                      Heading={item.head}
                      Fontsize={18}
                      //   color={COLORS.dark}
                      color={'rgba(16, 35, 78, 1)'}
                      // Fontweight={'bold'}
                      // txtAlign={'center'}
                    />
                  </View>
                  <Heading
                    Heading={item.description}
                    Fontsize={14}
                    color={'rgba(156, 156, 156, 1)'}
                    // txtAlign={'center'}
                    mt={5}
                  />
                </View>
                <View
                  style={{
                    marginLeft: 20,
                    flexDirection: 'column',
                  }}>
                  <View>
                    <Image
                      source={require('../../Assets/Images/notificationquantity.png')}
                    />
                  </View>
                  <View>
                    <Heading
                      Heading={'12:30'}
                      Fontsize={11}
                      //   color={COLORS.dark}
                      txtAlign={'center'}
                      color={'rgba(156, 156, 156, 1)'}
                      mt={40}
                      // ml={10}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
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
            // marginVertical: '5%',
            marginBottom: '7%',
          }}>
          <Header header={'Chats'} />
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

            marginVertical: '5%',
            marginBottom: Platform.OS === 'ios' ? '13.5%' : '12%',
            // borderBottomColor: 'rgba(0, 0, 0, 0.1)',
            // borderBottomWidth: 1,
          }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.metal_id}
            contentContainerStyle={{flexDirection: 'column'}}
            ListHeaderComponent={ListHeaderComponent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeArea>
    </>
  );
};
