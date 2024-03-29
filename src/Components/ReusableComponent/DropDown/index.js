import { Image, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Heading from '../Heading';
import { useState } from 'react';
import { Text } from 'react-native-paper';

export default DropdownComponent = props => {
  const [isFocus, setIsFocus] = useState(false);

  let { data, defaultValue, setValue, value, disabled } = props;

  if (disabled) {
    // Return a disabled state view with default value
    return (
      <View style={styles.container}>
        <Heading
          ml={'11%'}
          Fontsize={14}
          Heading={props.title}
          color="#7B869E"
          mb={-7}
          Fontweight={400}
          lh={18.52}
          opacity={0.7}
        />
        <View style={styles.row}>
          <View style={styles.header}>
            {props.urlImg && (
              <Image
                source={props.urlImg}
                style={{ width: 20, marginTop: 12, marginBottom: 14, opacity: 0.7 }}
                resizeMode={'contain'}
              />
            )}
          </View>
          <View style={styles.dropdownContainer}>
            <View style={{
              borderRadius: 65,
              paddingHorizontal: 7,
              color: '#667080',
              opacity: 0.7
            }}>
              <Text style={{
                marginBottom: 1,
                marginLeft: 3.5,
                fontSize: 16,
                color: 'rgba(28, 28, 28, 0.7)',
              }}>{defaultValue}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Heading
        ml={'11%'}
        Fontsize={14}
        Heading={props.title}
        color="#7B869E"
        mb={-7}
        Fontweight={400}
        lh={18.52}
      />
      <View style={styles.row}>
        <View style={styles.header}>
          {props.urlImg && (
            <Image
              source={props.urlImg}
              style={{ width: 20, marginTop: 12, marginBottom: 14 }}
              resizeMode={'contain'}
            />
          )}
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={styles.dropdown}
            itemTextStyle={{ color: '#667080' }}
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
              setValue(item);
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
    marginLeft: 8, // Adjust this margin as needed
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
    fontSize: 16,
    color: 'rgba(28, 28, 28, 1)',
    lineHeight: '21.17px',
    fontWeight: 400,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#A8A8A8',
    // lineHeight: '21.17px',
    marginLeft: 3.5,
    marginBottom: 1,
  },
  selectedTextStyle: {
    marginBottom: 1,
    marginLeft: 3.5,
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
