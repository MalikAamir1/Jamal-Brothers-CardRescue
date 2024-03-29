import React, { useEffect, useState } from 'react';
// import {TextInput} from 'react-native-paper';
// import COLORS from '../../../Assets/Style/Color';
import { useSelector } from 'react-redux';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Heading from '../Heading';
import FONT from '../../../Assets/Style/Font';
import { Calendar } from 'react-native-calendars';
import Entypo from 'react-native-vector-icons/Entypo';
import { ActivityIndicator } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function InputWithCalender(props) {
  const emptyIcon = () => null;
  const [text, setText] = useState();
  console.log('props', props)
  console.log('Current Date:', new Date());

  // const [value, onChangeText] = useState('');
  const [notPressed, setNotPressed] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  // const [purchaseDate, setPurchaseDate] = useState();
  const [loader, setloader] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  console.log(selectedDate);
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('en-US', {
      month: '2-digit',
      year: '2-digit',
    }).replace('/', ' / ')
    : '';

  console.log('selectedMonth', selectedMonth);
  console.log('selectedYear', selectedYear);

  const toggleDatePicker = () => {
    // Check the condition before opening the calendar
    if (!props.calenderdisable) {
      setDatePickerVisible(!isDatePickerVisible);
    }
  };

  // const handleConfirm = date => {
  //   setSelectedDate(date);
  //   toggleDatePicker();
  // };

  const handleConfirm = date => {
    // Check if the selected date is today or earlier
    const currentDate = new Date();
    if (date <= currentDate) {
      // Display an alert message or perform any action
      alert('Card is expired. Please select a valid date.');
      return; // Don't proceed further if the date is invalid
    }
    setSelectedDate(date);
    // Extracting month and year from the selected date
    const selectedMonth = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
    const selectedYear = date.getFullYear();

    // Saving the extracted month and year to separate states
    setSelectedMonth(selectedMonth);
    setSelectedYear(selectedYear);

    // Call the callback function to send the values to the parent component
    props.onDateChange(selectedMonth, selectedYear);

    toggleDatePicker();
  };

  useEffect(() => {
    if (formattedDate) {
      const [year, month] = formattedDate.split('/');
      setSelectedYear(parseInt(year));
      setSelectedMonth(parseInt(month));
    }
  }, [formattedDate]);

  const openCalendar = () => {
    setModalVisible(true);
  };

  const closeCalendar = () => {
    setModalVisible(false);
  };

  const handleIconPress = () => {
    // You can set a state variable to control the modal visibility
    setModalVisible(true);
  };

  return (
    <>
      <View>
        <View>
          <Heading
            ml={props.ml ? props.ml : '11%'}
            Fontsize={14}
            Heading={props.title}
            color="#7B869E"
            mb={-6}
          // fontFamily={FONT.pop}
          />
        </View>
        <Pressable onPress={toggleDatePicker} style={{ width: '100%' }}>
          <View
            style={{
              // backgroundColor: value,
              borderBottomColor: 'rgba(77, 77, 77, 0.7)',
              borderBottomWidth: 1,
              flexDirection: 'row',
              // opacity: props.disabled ? 0.5 : 1,
            }}>
            {props.urlImg && (
              <Image
                source={props.urlImg}
                style={{ width: 20, marginTop: 12, marginBottom: 14 }}
                resizeMethod={'resize'}
                resizeMode={'contain'}
              />
            )}
            <Pressable onPress={toggleDatePicker} style={{ width: '80%' }}>
              <View pointerEvents="none">
                <TextInput
                  editable={!props.disabled}
                  // multiline
                  onChangeText={text => props.onChangeText(text)}
                  // value={purchaseDate ? purchaseDate : props.value}
                  value={!props.calenderdisable ? formattedDate : props.value}
                  style={{
                    width: props.pass ? '55%' : '55%',
                    color: '#1C1C1C',
                    marginBottom: -3,
                    // marginLeft: Platform.OS === 'ios' ? 5 : 40,
                    marginLeft: Platform.OS === 'ios' ? 19 : 15,
                    fontFamily: FONT.redhat,
                    fontSize: 16,
                    marginTop: Platform.OS === 'ios' ? 14 : 1,
                    opacity: props.calenderdisable ? 0.7 : 1
                  }}
                  placeholder={props.placeholder}
                  placeholderTextColor={'#A8A8A8'}
                  secureTextEntry={props.pass && !props.dob ? notPressed : false}
                />
              </View>
            </Pressable>
          </View>
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={toggleDatePicker}
          // Set minDate to restrict the selection to dates after today
          minDate={new Date()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  loaderContent: {
    // backgroundColor: 'white', // Loader background color
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
