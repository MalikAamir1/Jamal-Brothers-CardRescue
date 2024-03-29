import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CheckBox = props => {
  const [isChecked, setIsChecked] = useState(
    props.isChecked ? props.isChecked : false,
  );

  const handleCheckBoxClick = () => {
    setIsChecked(!isChecked);
    // Call the onPress function if it exists
    if (props.onPress) {
      props.onPress(!isChecked);
    }  };

  return (
    <TouchableOpacity
      style={{flex: 1, padding: 10}}
      onPress={handleCheckBoxClick}>
      <View
        style={{
          width: 30,
          height: 30,
          borderColor: 'rgba(11, 16, 92, 0.3)',
          borderWidth: 1,
          borderRadius: 7,
          // marginTop: 15,
          // marginLeft: 24,
          backgroundColor: isChecked ? 'rgba(51, 190, 2, 1)' : 'white',
        }}>
        <AntDesign
          name="check"
          size={20}
          color={'#FFFFFF'}
          style={{alignSelf: 'center', marginTop: 4}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;
