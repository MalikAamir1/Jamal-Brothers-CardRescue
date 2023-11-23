import {Platform, ScrollView, View} from 'react-native';
import {Header} from '../../Components/ReusableComponent/Header';
import Heading from '../../Components/ReusableComponent/Heading';
import {TextInput} from 'react-native-paper';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {SuccessModal} from '../../Components/ReusableComponent/SuccessModal';
import {useState} from 'react';
import SafeArea from '../../Components/ReusableComponent/Safearea';

export const Feedback = ({route}) => {
  const [secondModal, setSecondModal] = useState(false);
  return (
    <>
      <SuccessModal
        set={setSecondModal}
        get={secondModal}
        txt={'Congratulations'}
        done={() => {
          setSecondModal(false);
        }}
        urlImg={require('../../Assets/Images/successIcon.png')}
        btntxt={'Go Back'}
        paratxt={'Your message has been submitted'}
      />
      <SafeArea
        style={{
          marginVertical: '5%',
          marginBottom: Platform.OS === 'ios' ? '13.5%' : '29%',
        }}>
        <ScrollView>
          <View
            style={{
              marginHorizontal: '5%',
              marginVertical: '5%',
              marginBottom: Platform.OS === 'ios' ? '13.5%' : '22%',
            }}>
            <Header header={'Feedback'} screenName={true} />
            <View style={{marginHorizontal: '0', marginTop: '10%'}}>
              <Heading
                Stylefont={'normal'}
                Fontsize={14}
                Heading={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl. Curabitur aliquam felis et ullamcorper ultrices. Mauris iaculis sapien fermentum eros finibus, id interdum nulla scelerisque. Nulla lacinia volutpat consectetur. Nunc hendrerit odio at felis porttitor, vel ornare erat elementum. Aliquam nec massa neque. Donec dignissim libero ac metus maximus, a accumsan diam bibendum.'
                }
                color={'#7B869E'}
                mt={'4%'}
                ln={15}
                width={332}
              />
            </View>
            <View style={{marginTop: 20}}>
              <View>
                <Heading
                  // ml={props.ml ? props.ml : '11%'}
                  Fontsize={14}
                  Heading={'Name'}
                  color="rgba(123, 134, 158, 1)"
                  // mb={-8}
                  // fontFamily={FONT.pop}
                />
              </View>
              <View
                style={{
                  // backgroundColor: value,
                  borderColor: 'rgba(11, 16, 92, 0.15)',
                  // borderBottomColor: 'rgba(11, 16, 92, 0.3)',
                  // borderBottomWidth: 0.2,
                  borderWidth: 0.4,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 6,
                  // opacity: props.disabled ? 0.5 : 1,
                }}>
                <TextInput
                  editable={false}
                  // multiline
                  style={{
                    width: '85%',
                    color: '#1C1C1C',
                    backgroundColor: 'transparent',
                    marginBottom: -3,
                    marginLeft: 3,
                    fontSize: 16,
                    height: 52,
                  }}
                  placeholder="Billy Kane"
                  placeholderTextColor={'#A8A8A8'}
                  activeUnderlineColor={'transparent'}
                  underlineColorAndroid={'transparent'}
                  underlineColor={'transparent'}
                  // secureTextEntry={props.pass && !props.dob ? notPressed : false}
                />
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <View>
                <Heading
                  // ml={props.ml ? props.ml : '11%'}
                  Fontsize={14}
                  Heading={'Email ID'}
                  color="rgba(123, 134, 158, 1)"
                  // mb={-8}
                  // fontFamily={FONT.pop}
                />
              </View>
              <View
                style={{
                  // backgroundColor: value,
                  borderColor: 'rgba(11, 16, 92, 0.15)',
                  // borderBottomColor: 'rgba(11, 16, 92, 0.3)',
                  // borderBottomWidth: 0.2,
                  borderWidth: 0.4,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // opacity: props.disabled ? 0.5 : 1,
                  marginTop: 6,
                }}>
                <TextInput
                  editable={false}
                  // multiline
                  style={{
                    width: '85%',
                    color: '#1C1C1C',
                    backgroundColor: 'transparent',
                    marginBottom: -3,
                    marginLeft: 3,
                    fontSize: 16,
                    height: 52,
                  }}
                  placeholder="email@domain.com"
                  placeholderTextColor={'#A8A8A8'}
                  activeUnderlineColor={'transparent'}
                  underlineColorAndroid={'transparent'}
                  underlineColor={'transparent'}
                  // secureTextEntry={props.pass && !props.dob ? notPressed : false}
                />
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <View>
                <Heading
                  // ml={props.ml ? props.ml : '11%'}
                  Fontsize={14}
                  Heading={'Message'}
                  color="rgba(123, 134, 158, 1)"
                  // mb={-8}
                  // fontFamily={FONT.pop}
                />
              </View>
              <View
                style={{
                  // backgroundColor: value,
                  borderColor: 'rgba(11, 16, 92, 0.15)',
                  // borderBottomColor: 'rgba(11, 16, 92, 0.3)',
                  // borderBottomWidth: 0.2,
                  borderWidth: 0.4,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // opacity: props.disabled ? 0.5 : 1,
                  marginTop: 6,
                }}>
                <TextInput
                  editable={false}
                  multiline={true}
                  style={{
                    width: '85%',
                    color: '#1C1C1C',
                    backgroundColor: 'transparent',
                    marginBottom: -3,
                    marginLeft: 3,
                    fontSize: 16,
                    height: 156,
                    marginTop: -45,
                  }}
                  placeholder="Lorem Ipsum"
                  placeholderTextColor={'#A8A8A8'}
                  activeUnderlineColor={'transparent'}
                  underlineColorAndroid={'transparent'}
                  underlineColor={'transparent'}
                  // secureTextEntry={props.pass && !props.dob ? notPressed : false}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                marginVertical: '5%',
                marginLeft: '-2%',
                marginBottom: 30,
                // marginTop: '5%',
              }}>
              <ButtonComp
                btnText={'Submit'}
                press={() => {
                  // Navigation.navigate('SimpleBottomTab');
                  // Login();
                  setSecondModal(true);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeArea>
    </>
  );
};
