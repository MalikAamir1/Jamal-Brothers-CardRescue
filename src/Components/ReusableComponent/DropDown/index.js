import {Image, StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Heading from '../Heading';
import {useState} from 'react';

export default DropdownComponent = props => {
  const [isFocus, setIsFocus] = useState(false);

  let {data, defaultValue, setValue, value} = props;

  return (
    <View style={styles.container}>
      <Heading
        ml={'11%'}
        Fontsize={14}
        Heading={props.title}
        color="#7B869E"
        mb={-8}
      />
      <View style={styles.row}>
        <View style={styles.header}>
          {props.urlImg && (
            <Image
              source={props.urlImg}
              style={{width: 20, marginTop: 12, marginBottom: 14}}
              resizeMode={'contain'}
            />
          )}
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={styles.dropdown}
            itemTextStyle={{color: '#667080'}}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? defaultValue : defaultValue}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 5,
    // marginBottom: '10%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(77, 77, 77, 0.7)',
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContainer: {
    flex: 1, // This ensures the dropdown takes the remaining space
    marginLeft: 10, // Adjust this margin as needed
  },
  dropdown: {
    height: 50,
    borderRadius: 65,
    paddingHorizontal: 7,
    color: '#667080',
  },
  icon: {
    marginRight: 2,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'rgba(28, 28, 28, 1)',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'rgba(28, 28, 28, 1)',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'rgba(28, 28, 28, 1)',
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
    // borderRadius:10
  },
  // Other styles...
});
