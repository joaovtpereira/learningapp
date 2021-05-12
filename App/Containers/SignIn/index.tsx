/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';

import {
  Animated,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text as TextElement} from 'react-native-elements';

import {Button} from '../../Components/ReactNativeElements/Button';
import {LearningAppLogo} from '../../Components/CustomComponents/LearningAppLogo';
import {FormSignIn} from './formSignIn';
import colors from '../../Theme/colors';

import {Container, SafeAreaView, ButtonContainer} from './styles';

function SignIn() {
  const modalSignInAnimated = useRef(new Animated.Value(0)).current;
  const imageLogoAnimated = useRef(new Animated.Value(0)).current;

  const [signInActivated, setSignInActivated] = useState(false);

  function UpModal() {
    Animated.parallel([
      Animated.timing(modalSignInAnimated, {
        toValue: (Dimensions.get('screen').height / 5) * 3 * -1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(imageLogoAnimated, {
        toValue: (Dimensions.get('screen').height / 5 - 100) * -1,
        duration: 750,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function DownModal() {
    Animated.parallel([
      Animated.timing(modalSignInAnimated, {
        toValue: 0,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(imageLogoAnimated, {
        toValue: 0,
        duration: 750,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSignInActivated(false);
    });
  }

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Animated.View
            style={[
              {
                width: '100%',
                alignItems: 'center',
                top: Dimensions.get('screen').height / 5,
              },
              {
                transform: [
                  {
                    translateY: imageLogoAnimated,
                  },
                ],
              },
            ]}>
            <LearningAppLogo width={200} heigth={200} />
          </Animated.View>
          {signInActivated ? (
            <FormSignIn
              modalSignInAnimated={modalSignInAnimated}
              DownModal={DownModal}
            />
          ) : (
            <ButtonContainer>
              <Button
                title="Sign In"
                fullWidth
                onPress={() => {
                  setSignInActivated(true);
                  UpModal();
                }}
                titleStyle={{color: colors.primary, fontWeight: 'bold'}}
                buttonStyle={{
                  height: 60,
                  backgroundColor: colors.secondary,
                  borderRadius: 8,
                }}
                shadowStyle={{
                  shadowColor: '#fff',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}
              />
              <TextElement
                h4
                h4Style={{
                  fontSize: 16,
                  marginTop: 40,
                  fontWeight: 'bold',
                  color: colors.secondary,
                }}>
                Sign Up
              </TextElement>
            </ButtonContainer>
          )}
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default SignIn;
