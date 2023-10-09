import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';

function SafeArea(props) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        marginTop: Platform.OS === 'ios' ? -23 : 0,
      }}>
      {props.children}
    </SafeAreaView>
  );
}

export default SafeArea;
