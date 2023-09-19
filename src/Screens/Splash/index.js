import React, {useState} from 'react';
import {Image, ImageBackground} from 'react-native';
import {View} from 'react-native';

export const Splash = () => {
  return (
    <ImageBackground
      source={require('../../Assets/Images/splashbg.png')}
      style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          alignContent: 'center',
          flex: 1,
        }}>
        <Image
          style={{width: 300, height: 300}}
          resizeMode={'contain'}
          // source={require('../../Assets/Images/SplashIcon.png')}
          source={require('../../Assets/Images/splashicon2.png')}
        />
      </View>
    </ImageBackground>
  );
};
