import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {ImageBackground, Pressable, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function ButtonComp(props) {
  let {btnText, press} = props;

  return (
    // <Pressable
    //   style={{
    //     alignItems: props.align,
    //     justifyContent: props.justify,
    //     // backgroundColor: props.bgColor ? props.bgColor : 'transparent',
    //     // width: props.viewWidth,
    //   }}
    //   disabled={props.enable}
    //   onPress={props.press}>
    //   <ImageBackground
    //     source={require('../../../Assets/Images/CTA.png')}
    //     resizeMode={'contain'}
    //     style={{width: '100%', alignContent: 'center', alignItems: 'center'}}>
    //     <Button
    //       mode={props.mode ? props.mode : 'contained'}
    //       color={props.color}
    //       disabled={props.enable}
    //       labelStyle={{
    //         // textAlign: 'center',
    //         fontFamily: FONT.pop,
    //         fontSize: props.fontSize,
    //         fontWeight: props.fontStyle,
    //         marginTop: props.txtRightMargin,
    //         marginLeft: props.txtLeftMargin,
    //         marginRight: props.Rightmargin,
    //         color: props.txtColor,
    //         width: props.txtwidth,
    //       }}
    //       dark={true}
    //       uppercase={false}
    //       style={{
    //         height: props.btnHeight,
    //         width: props.btnwidth,
    //         borderRadius: props.radius,
    //         justifyContent: props.justify,
    //         alignItems: props.txtalign,
    //         marginRight: props.rightMargin,
    //         marginLeft: props.leftMargin,
    //         marginTop: props.topMargin,
    //         shadowColor: props.shadow,
    //         borderColor: reducerData?.isDark?.isdark
    //           ? COLORS.white
    //           : COLORS.border_color,
    //         borderWidth: props.Borderwidth,
    //         backgroundColor: props.bgcolor,
    //       }}
    //       // theme={}
    //       // onPress={props.press}
    //     >
    //       {props.icon && (
    //         <Icon
    //           name={props.icon}
    //           color={props.IconColor}
    //           size={props.iconSize ? props.iconSize : 28}
    //         />
    //       ) : (
    //         <></>
    //       )}
    //       {props.featherIcon ? (
    //         <Feather
    //           name={props.featherIcon}
    //           size={props.iconSize ? props.iconSize : 28}
    //         />
    //       ) : (
    //         <></>
    //       )}
    //       <Text
    //         style={{fontWeight: 'bold', fontSize: 18, color: props.txtColor}}>
    //         {btnText}
    //       </Text>
    //     </Button>
    //   </ImageBackground>
    // </Pressable>
    // <View
    //   style={{
    //     marginLeft: 5,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 7,
    //     width: '100%',
    //     boxShadow: '0px 18px 40px -12px rgba(249, 180, 1, 0.35)',
    //     // Apply elevation for Android or shadow for iOS
    //     // elevation: 18, // Android
    //     // shadowColor: 'rgba(249, 180, 1, 0.35)', // iOS
    //     // shadowOffset: {
    //     //   width: 0,
    //     //   height: 18, // Adjust this value for Y offset
    //     // },
    //     // shadowOpacity: 1,
    //     // shadowRadius: 40, // Adjust this value for blur
    //   }}>
    <LinearGradient
      colors={['#FCDD8E', '#F9B401']}
      // colors={['#F9B401', '#FCDD8E']}
      // colors={['rgba(249, 180, 1, 1)', 'rgba(252, 221, 142, 1)']}
      // colors={['rgba(252, 221, 142, 1)', 'rgba(249, 180, 1, 1)']}
      // box-shadow: 0px 18px 40px -12px rgba(249, 180, 1, 0.35);

      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.1}}
      style={{
        flex: 1,
        // padding: 13,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        // boxShadow: '0px 18px 40px -12px rgba(249, 180, 1, 0.35)',
      }}>
      <TouchableOpacity
        onPress={press}
        style={{
          flex: 1,
          width: '100%',
          padding: 12,
          alignItems: 'center',
          height: '50%',
        }}>
        <Text style={{color: '#0B105C', fontSize: 16, fontWeight: 'bold'}}>
          {btnText}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
    // </View>
  );
}

export default ButtonComp;
