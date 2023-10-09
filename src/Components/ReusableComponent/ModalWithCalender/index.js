import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Image, ImageBackground, Pressable, View, Modal} from 'react-native';
import Heading from '../Heading';
// import COLORS from '../../../Assets/Style/Color';
import {Button, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../Input';

export const ModalWithCalender = props => {
  const handleButtonPress = () => {
    console.log('Button pressed');
  };

  // const [modalVisible, setModalVisible] = useState(true);

  let {set, get, urlImg, txt, done, btntxt, yes, no} = props;

  return (
    <Modal animationType="none" transparent={true} visible={get}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }}>
        <View style={styles.modalView}>
          <View style={{margin: 5}}>
            <Heading
              Heading={props.txt}
              Fontsize={18}
              color={'rgba(11, 16, 92, 1)'}
              Fontweight={'bold'}
              txtAlign={'left'}
              mt={30}
              width={290}
            />
          </View>
          <View
            style={{
              marginVertical: '2%',
              marginTop: '5%',
              width: 285,
              marginBottom: 30,
            }}>
            <Input
              title={'Number Of Days'}
              urlImg={require('../../../Assets/Images/calender.png')}
              placeholder={'30 Days'}
              //   value={cardHolder}
              // value={dataFromOtpScreenOfSignUp.email}
              //   onChangeText={setCardHolder}
              dob={false}
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#E1E1E1',
                borderWidth: 1,
                borderColor: 'rgba(11, 16, 92, 0.2)',
                // borderColor: '#0B105C',
                // padding: 5,
                marginRight: 5,
                marginLeft: -20,
                justifyContent: 'center',
                alignItems: 'center',
                width: 111,
                height: 32,
                borderRadius: 7,
              }}
              onPress={no}>
              <Text
                style={{
                  color: '#0B105C',
                  fontSize: 14,
                  // fontWeight: 'bold',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <LinearGradient
              colors={['#FCDD8E', '#F9B401']}
              start={{x: 0.5, y: -5}}
              end={{x: 0.4, y: 4}}
              style={{
                flex: 1,
                marginLeft: 5,
                justifyContent: 'center',
                alignItems: 'center',
                width: 111,
                borderRadius: 7,
                marginRight: -20,
              }}>
              <TouchableOpacity
                style={{
                  width: 190,
                  alignItems: 'center',
                }}
                onPress={yes}>
                <Text
                  style={{
                    color: '#0B105C',
                    fontSize: 14,
                    // fontWeight: 'bold',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          {/* </View> */}
        </View>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    // opacity: 0.9,
  },
  modalView: {
    margin: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    // paddingTop: 0,
    // paddingBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 200,
    opacity: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  // buttonClose: {
  //   backgroundColor: 'red',
  // },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    borderColor: 'black',
    // borderWidth: 1,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius:100
    // backgroundColor: 'pink',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 35,
    backgroundColor: 'transparent',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  buttonShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
    // backgroundColor: 'red',
    width: '100%',
  },
});
