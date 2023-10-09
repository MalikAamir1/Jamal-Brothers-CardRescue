import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function ButtonWithIcon(props) {
  let {btnText, press} = props;

  return (
    <LinearGradient
      colors={['#FCDD8E', '#F9B401']}
      start={{x: 0.5, y: -5}}
      end={{x: 0.4, y: 4}}
      style={{
        flex: 1,
        // padding: 13,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        // boxShadow: '0px 18px 40px -12px rgba(249, 180, 1, 0.35)',
      }}>
      <TouchableOpacity
        onPress={press}
        style={{
          flex: 1,
          width: '100%',
          padding: 15,
          //   alignItems: 'center',
          justifyContent: 'space-between',
          height: '50%',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: '#0B105C',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 5,
          }}>
          {btnText}
        </Text>
        <Image
          source={require('../../../Assets/Images/logout.png')}
          style={{marginRight: 10}}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </LinearGradient>
    // </View>
  );
}

export default ButtonWithIcon;
