import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Heading from '../Heading';
import FONT from '../../../Assets/Style/Font';

const InputWithCalenderWithDropdownList = props => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  console.log(selectedDate);
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';
  console.log(formattedDate);

  const toggleDatePicker = () => {
    setDatePickerVisible(!isDatePickerVisible);
  };

  const handleConfirm = date => {
    setSelectedDate(date);
    toggleDatePicker();
  };

  return (
    <View style={styles.container}>
      <Heading
        ml={props.ml ? props.ml : '11%'}
        Fontsize={14}
        Heading={props.title}
        color="#7B869E"
        mb={-8}
      />
      <View style={styles.inputContainer}>
        {props.urlImg && (
          <Image
            source={props.urlImg}
            style={styles.icon}
            resizeMode="contain"
          />
        )}
        <Pressable
          style={styles.inputWrapper}
          onPress={toggleDatePicker}
          disabled={props.disabled}>
          <TextInput
            editable={false}
            value={formattedDate}
            style={styles.input}
            placeholder={props.placeholder}
            placeholderTextColor="#A8A8A8"
          />
          <Icon
            name={'keyboard-arrow-down'}
            style={styles.arrowIcon}
            color={'rgba(123, 134, 158, 1)'}
            size={30}
          />
        </Pressable>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={toggleDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // margin: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    borderBottomColor: 'rgba(77, 77, 77, 0.7)',
    borderBottomWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 20,
    marginTop: 12,
    marginBottom: 13,
  },
  input: {
    width: '85%',
    color: '#1C1C1C',
    marginBottom: -1,
    marginLeft: Platform.OS === 'ios' ? 19 : 14,
    fontFamily: FONT.redhat,
    fontSize: 16,
  },
  arrowIcon: {
    fontWeight: '900',
  },
});

export default InputWithCalenderWithDropdownList;
