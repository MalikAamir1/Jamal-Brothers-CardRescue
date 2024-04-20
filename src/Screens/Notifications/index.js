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
import { Header } from '../../Components/ReusableComponent/Header';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { useCallback, useEffect, useState } from 'react';
import Head from '../../Components/ReusableComponent/Head';
import ButtonComp from '../../Components/ReusableComponent/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ModalView } from '../../Components/ReusableComponent/Modal';
import CheckBox from '../../Components/ReusableComponent/Checkbox';
import { SuccessModal } from '../../Components/ReusableComponent/SuccessModal';
import { useSelector } from 'react-redux';
import { getRequestWithOutBody } from '../../App/fetch';
import { BASE_URL } from '../../App/api';
import moment from 'moment';
import { Loader } from '../../Components/ReusableComponent/Loader';

export const Notifications = () => {
  const Navigation = useNavigation();
  const AuthReducer = useSelector(state => state.AuthReducer?.userData);
  const [notificationDetails, setNotificationDetails] = useState();
  const [loader, setloader] = useState(false);
  console.log('notificationDetails', notificationDetails)

  const data = [
    {
      id: 1,
      title: 'Report Lost Card',
      body: 'Lorem ipsum dolor sit amet, cons',
      time: '02 min ago',
    },
    {
      id: 2,
      title: 'Report Lost Card',
      body: 'Lorem ipsum dolor sit amet, cons',
      time: '03 min ago',
    },
    {
      id: 3,
      title: 'Report Lost Card',
      body: 'Lorem ipsum dolor sit amet, cons',
      time: '05 min ago',
    },
    {
      id: 4,
      title: 'Report Lost Card',
      body: 'Lorem ipsum dolor sit amet, cons',
      time: '05 min ago',
    },
    {
      id: 5,
      title: 'Report Lost Card',
      body: 'Lorem ipsum dolor sit amet, cons',
      time: '05 min ago',
    },
    {
      id: 6,
      title: 'Report Lost Card',
      body: 'Lorem ipsum dolor sit amet, cons',
      time: '05 min ago',
    },
    {
      id: 7,
      title: 'Report Lost Card',
      body: 'Lorem ipsum dolor sit amet, cons',
      time: '05 min ago',
    },
    {
      id: 8,
      title: 'Report Lost Card',
      body: 'Lorem ipsum dolor sit amet, cons',
      time: '05 min ago',
    },
  ];

  const fetchData2 = () => {
    setloader(true)
    getRequestWithOutBody(
      `${BASE_URL}/notifications/`,
      AuthReducer.token,
    )
      .then(result => {
        setloader(false)
        // console.log('result at notification', result)
        setNotificationDetails(result.results)
      })
      .catch(error => {
        setloader(false)
        console.log('error', error);
      });
  }

  useEffect(() => {
    fetchData2()
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData2();
    }, []),
  );


  const renderItem = ({ item }) => {
    const maxLength = 14; // Maximum length before truncating and adding "..."
    const title = item.title.length > maxLength ? `${item.title.substring(0, maxLength)}...` : item.title;

    // Calculate the time difference in seconds
    const diffInSeconds = moment().diff(moment(item.updated), 'seconds');

    // Function to format the time difference dynamically
    const formatTimeDifference = (diffInSeconds) => {
      if (diffInSeconds < 60) {
        return `${diffInSeconds} sec ago`;
      } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        return `${diffInMinutes} min${diffInMinutes !== 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 86400) {
        const diffInHours = Math.floor(diffInSeconds / 3600);
        return `${diffInHours} hr${diffInHours !== 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 2592000) {
        const diffInDays = Math.floor(diffInSeconds / 86400);
        return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
      } else {
        const diffInMonths = Math.floor(diffInSeconds / 2592000);
        return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
      }
    };

    console.log(formatTimeDifference(diffInSeconds));


    return (
      <>
        <Pressable onPress={() => {
          Navigation.navigate('NotificationDetails', item);
          // console.log('dsfdsfaf')
        }}>
          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
            <View
              style={{
                // borderBottomColor: 'rgba(156, 156, 156, 0.7)',
                // borderRadius: 7,
                // borderBottomWidth: 0.5,
                height: 69,
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
                  <Image
                    source={require('../../Assets/Images/notificationIcon.png')}
                    style={{
                      // width: 25,
                      // height: 27,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginTop: -12,
                      marginLeft: -5,
                    }}
                  />
                </View>
                <View style={{ marginLeft: -10, width: 200 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      // marginTop: 40,
                    }}>
                    <Heading
                      Heading={title}
                      Fontsize={16}
                      //   color={COLORS.dark}
                      Fontweight={item.is_read ? 'bold' : 800}
                      txtAlign={'center'}
                    />
                    <Heading
                      Heading={formatTimeDifference(diffInSeconds)}
                      Fontsize={11}
                      //   color={COLORS.dark}
                      txtAlign={'center'}
                      color={'rgba(156, 156, 156, 1)'}
                      Fontweight={item.is_read ? 500 : 800}
                      // Fontweight={500}
                      mt={5}
                      ml={10}
                    />
                  </View>
                  <Heading
                    Heading={`${item.body.substring(0, 25)}...`}
                    Fontsize={14}
                    color={'rgba(156, 156, 156, 1)'}
                    txtAlign={'left'}
                    Fontweight={item.is_read ? 400 : 800}
                    mt={5}
                  />
                </View>
                {!item.is_read ?
                  (<View>
                    <Image
                      source={require('../../Assets/Images/notificationquantity.png')}
                      style={{
                        // width: 25,
                        // height: 27,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                  ) : null}
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'rgba(156, 156, 156, 1)',
              borderRadius: 7,
              borderBottomWidth: 0.5,
              // height: 69,
              width: '90%',
              marginHorizontal: '5%',
              // marginTop: 10,
            }}></View>
        </Pressable>
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
            marginBottom: 30,
          }}>
          <Head head={'Notifications'} />
        </View>
      </>
    );
  };

  return (
    <>
      <SafeArea>
        {loader ? (
          <Loader />
        ) : (
          <View
            style={{
              //   marginVertical: '5%',
              marginBottom: Platform.OS === 'ios' ? '10%' : '5%',
            }}>
            <FlatList
              data={notificationDetails}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{ flexDirection: 'column' }}
              ListHeaderComponent={ListHeaderComponent}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </SafeArea>
    </>
  );
};
