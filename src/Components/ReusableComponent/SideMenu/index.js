import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Switch,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Heading from '../Heading';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const SideMenu = ({callParentScreenFunction, cross}) => {
  //   let cross = props;
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../Assets/Images/drawerback.png')}
        style={{flex: 1, resizeMode: 'cover'}}>
        <Pressable onPress={cross}>
          <View
            style={{
              backgroundColor: 'rgba(251, 209, 101, 1)',
              borderBottomStartRadius: 20,
              padding: 4,
              alignContent: 'flex-end',
              alignItems: 'flex-end',
              width: '100%',
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              marginTop: 500,
            }}>
            <Entypo
              name="cross"
              size={35}
              color="rgba(16, 35, 78, 1)"
              style={{paddingLeft: 5}}
            />
          </View>
        </Pressable>
        {/* <View
            style={{
              alignItems: 'center',
              //   marginTop: Platform.OS === 'ios' ? '5%' : 45,
              marginBottom: 50,
              marginTop: -10,
            }}>
            <Image
              source={require('../../../Assets/Images/drawerLogIcon.png')}
              //   style={{width: 170, height: 150}}
              resizeMode={'contain'}
            />
          </View> */}
        {/* <View
            style={{
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 98,
                height: 98,
                alignSelf: 'center',
                // marginTop: '8%',
                // marginBottom: '8%',
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: 'rgba(11, 16, 92, 0.3)',
                borderRadius: 75,
              }}>
              <Image
                source={require('../../../Assets/Images/profileImage.png')}
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  width: 106,
                  height: 106,
                }}
                resizeMode={'cover'}
              />
            </View>
          </View> */}
        {/* <View>
            <Heading
              Stylefont={'normal'}
              Fontweight={'bold'}
              Fontsize={20}
              txtAlign={'center'}
              // p={10}
              lh={26}
              Heading={'Claire james'}
              color={'rgba(16, 35, 78, 1)'}
              // ml={-10}
              //   mb={20}
              //   width={170}
              mt={10}
            />
            <Heading
              Stylefont={'normal'}
              // Fontweight={'bold'}
              Fontsize={14}
              txtAlign={'center'}
              // p={10}
              lh={20}
              Heading={'clairejames@gmail.com'}
              color={'rgba(16, 35, 78, 1)'}
              mt={3}
              // ml={-10}
              mb={20}
              //   width={170}
            />
          </View> */}
        <View style={{flex: 1}}>{/* <DrawerItemList {...props} /> */}</View>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}>
          {/* <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                // marginTop: 30,
                height: 56,
                justifyContent: 'center',
                alignItems: 'center',
                // marginRight: 280,
                borderRadius: 10,
                width: 252,
                marginLeft: -10,
                // borderEndEndRadius: 10,
                // borderStartEndRadius: 10,
                marginBottom: Platform.OS === 'ios' ? 0 : 30,
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
            </View> */}
        </Pressable>
        {/* </ImageBackground> */}
      </ImageBackground>
    </View>
  );
};

export default SideMenu;
