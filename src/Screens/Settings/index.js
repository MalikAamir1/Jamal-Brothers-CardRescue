import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  View,
} from 'react-native';
import Head from '../../Components/ReusableComponent/Head';
import Heading from '../../Components/ReusableComponent/Heading';
import {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonComp from '../../Components/ReusableComponent/Button';
import ButtonWithIcon from '../../Components/ReusableComponent/ButtonWithIcon';
import {useNavigation} from '@react-navigation/native';
import {ModalView} from '../../Components/ReusableComponent/Modal';
import {removeDataToAsync} from '../../Utils/getAndSetAsyncStorage';
import {useDispatch} from 'react-redux';
import {removeUserDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';

export const Settings = ({route}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <ModalView
        set={setModalVisible}
        get={modalVisible}
        txt={'Are you sure you want to logout?'}
        no={() => {
          setModalVisible(false);
        }}
        yes={() => {
          setModalVisible(false);
          removeDataToAsync('token');
          removeDataToAsync('user');
          dispatch(removeUserDataFromAsyncStorage());
        }}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: Platform.OS === 'ios' ? 0 : '-5%',
        }}>
        <View
          style={{
            flexDirection: 'column',
            // justifyContent: 'space-between',
            flex: 1,
            marginVertical: '8%',
          }}>
          <View style={{marginBottom: 20}}>
            <Head head={'Settings'} screenName={true} />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              borderColor: 'rgba(11, 16, 92, 0.15)',
              // borderBottomColor: 'rgba(11, 16, 92, 0.3)',
              // borderBottomWidth: 0.2,
              borderWidth: 0.4,
              height: 52,
              // backgroundColor: '#FFFFFF',
              width: '93%',
              marginTop: 20,
              padding: Platform.OS === 'ios' ? 6 : 7,
              // paddingHorizontal: 20,
              marginLeft: 15,
            }}>
            <View style={{marginLeft: 10}}>
              {/* <View style={{paddingLeft: 10}}> */}
              <Heading
                Heading={'Notifications'}
                Fontsize={16}
                color={'rgba(16, 35, 78, 1)'}
                txtAlign={'center'}
                mt={Platform.OS === 'ios' ? 4 : 2}
                ml={2}
                Fontweight={'bold'}
              />
            </View>
            <View style={{marginRight: 10}}>
              <Switch
                trackColor={{false: 'black', true: 'rgba(30, 215, 0, 1)'}}
                thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                ios_backgroundColor="rgba(30, 215, 0, 1)"
                // ios_backgroundColor="black"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{
                  transform: [{scaleX: 0.7}, {scaleY: 0.7}],
                }}
              />
            </View>
          </View>

          <Pressable
            onPress={() => {
              Navigation.navigate('AboutApp');
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                borderColor: 'rgba(11, 16, 92, 0.15)',
                // borderBottomColor: 'rgba(11, 16, 92, 0.3)',
                // borderBottomWidth: 0.2,
                borderWidth: 0.4,
                height: 52,
                // backgroundColor: '#FFFFFF',
                width: '93%',
                marginTop: 20,
                padding: Platform.OS === 'ios' ? 6 : 7,
                // paddingHorizontal: 20,
                marginLeft: 15,
              }}>
              <View style={{paddingLeft: 10}}>
                <Heading
                  Heading={'About App'}
                  Fontsize={16}
                  color={'rgba(16, 35, 78, 1)'}
                  txtAlign={'center'}
                  Fontweight={'bold'}
                />
              </View>
              <View style={{paddingRight: 20}}>
                <MaterialIcons
                  name="navigate-next"
                  size={25}
                  color={'rgba(102, 112, 128, 1)'}
                />
              </View>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              Navigation.navigate('PrivacyPolicy');
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                borderColor: 'rgba(11, 16, 92, 0.15)',
                // borderBottomColor: 'rgba(11, 16, 92, 0.3)',
                // borderBottomWidth: 0.2,
                borderWidth: 0.4,
                height: 52,
                // backgroundColor: '#FFFFFF',
                width: '93%',
                marginTop: 20,
                padding: Platform.OS === 'ios' ? 6 : 7,
                // paddingHorizontal: 20,
                marginLeft: 15,
              }}>
              <View style={{paddingLeft: 10}}>
                <Heading
                  Heading={'Privacy Policy'}
                  Fontsize={16}
                  color={'rgba(16, 35, 78, 1)'}
                  txtAlign={'center'}
                  Fontweight={'bold'}
                />
              </View>
              <View style={{paddingRight: 20}}>
                <MaterialIcons
                  name="navigate-next"
                  size={25}
                  color={'rgba(102, 112, 128, 1)'}
                />
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              Navigation.navigate('TermsAndConditions');
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                borderColor: 'rgba(11, 16, 92, 0.15)',
                // borderBottomColor: 'rgba(11, 16, 92, 0.3)',
                // borderBottomWidth: 0.2,
                borderWidth: 0.4,
                height: 52,
                // backgroundColor: '#FFFFFF',
                width: '93%',
                marginTop: 20,
                padding: Platform.OS === 'ios' ? 6 : 7,
                // paddingHorizontal: 20,
                marginLeft: 15,
              }}>
              <View style={{paddingLeft: 10}}>
                <Heading
                  Heading={'Terms and Conditions'}
                  Fontsize={16}
                  color={'rgba(16, 35, 78, 1)'}
                  txtAlign={'center'}
                  Fontweight={'bold'}
                />
              </View>
              <View style={{paddingRight: 20}}>
                <MaterialIcons
                  name="navigate-next"
                  size={25}
                  color={'rgba(102, 112, 128, 1)'}
                />
              </View>
            </View>
          </Pressable>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              flexDirection: 'row',
              marginVertical: '5%',
              // marginLeft: '-2%',
              marginHorizontal: 10,
              // marginTop: '5%',
            }}>
            <ButtonWithIcon
              btnText={'Logout'}
              press={() => {
                // Navigation.navigate('SimpleBottomTab');
                // Login();
                // setSecondModal(true);
                setModalVisible(true);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
