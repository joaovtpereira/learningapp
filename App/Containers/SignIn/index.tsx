/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Text} from 'react-native-elements';

import {Button} from '../../Components/ReactNativeElements/Button';

import colors from '../../Theme/colors';

import {Container, SafeAreaView, Logo, ButtonContainer} from './styles';
import {LearningAppLogo} from '../../Components/CustomComponents/LearningAppLogo';

function SignIn() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Container>
          <Logo>
            <LearningAppLogo width={200} heigth={200} />
          </Logo>
          <ButtonContainer>
            <Button
              title="Sign In"
              fullWidth
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
            <Text
              h4
              h4Style={{
                fontSize: 16,
                marginTop: 40,
                fontWeight: 'bold',
                color: colors.secondary,
              }}>
              Sign Up
            </Text>
          </ButtonContainer>
        </Container>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default SignIn;
