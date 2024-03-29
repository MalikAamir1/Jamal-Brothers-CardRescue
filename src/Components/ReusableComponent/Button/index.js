import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {ImageBackground, Pressable, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function ButtonComp(props) {
  let {btnText, press} = props;

  return (
    <TouchableOpacity onPress={press} style={{width: '100%'}}>
      <LinearGradient
        colors={['#FCDD8E', '#F9B401']}
        start={{x: 0.5, y: -5}}
        end={{x: 0.4, y: 4}}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7,
          width: '100%', // Full width of the parent TouchableOpacity
          height: 56,
          padding: 12, // Padding added here
        }}>
        <Text style={{color: '#0B105C', fontSize: 16, fontWeight: 'bold'}}>
          {btnText}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
    // </View>
  );
}

export default ButtonComp;
