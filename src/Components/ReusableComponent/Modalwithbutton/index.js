import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Image, ImageBackground, Pressable, View, Modal} from 'react-native';
import Heading from '../Heading';
// import COLORS from '../../../Assets/Style/Color';
import {Button, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

export const ModalWithButton = props => {
  const handleButtonPress = () => {
    console.log('Button pressed');
  };

  // const [modalVisible, setModalVisible] = useState(true);

  let {set, get, cross, txt, no, yes} = props;

  return (
    <Modal animationType="none" transparent={true} visible={get}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{marginHorizontal: 20, marginTop: 40}}>
            <Heading
              Heading={txt}
              Fontsize={20}
              //   color={COLORS.dark}
              Fontweight={'bold'}
              txtAlign={'center'}
              color={'rgba(11, 16, 92, 1)'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: 'absolute',
    right: 10,

    // opacity: 0.9,
  },
  modalView: {
    margin: 50,
    backgroundColor: 'white',
    // borderRadius: 20,
    paddingHorizontal: 20,
    width: 100, // Set the width of the oval
    height: 50, // Set the height of the oval
    borderRadius: 25,
    // paddingTop: 0,
    // paddingBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
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
