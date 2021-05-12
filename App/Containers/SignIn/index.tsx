/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Alert, Animated, Dimensions} from 'react-native';
import {Text as TextElement} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {Button} from '../../Components/ReactNativeElements/Button';
import {LearningAppLogo} from '../../Components/CustomComponents/LearningAppLogo';

import colors from '../../Theme/colors';

import {Container, SafeAreaView, ButtonContainer, FormSignin} from './styles';
import Input from '../../Components/ReactNativeElements/Input';

interface DataFormProps {
  email: string;
  password: string;
}

const fieldValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('O email não pode ser vazio')
    .email('Digite um email válido'),
  password: yup.string().required('Campo senha obrigatório'),
});

function SignIn() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(fieldValidationSchema),
  });
  const modalSignInAnimated = useRef(new Animated.Value(0)).current;
  const imageLogoAnimated = useRef(new Animated.Value(0)).current;

  const [signInActivated, setSignInActivated] = useState(false);

  const [submitLoadingButton, setSubmitLoadingButton] = useState(false);

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  function onSubmit({email, password}: DataFormProps) {
    setSubmitLoadingButton(true);
    setTimeout(() => {
      setSubmitLoadingButton(false);
      Alert.alert(email, password);
    }, 3000);
  }

  function UpModal() {
    Animated.parallel([
      Animated.timing(modalSignInAnimated, {
        toValue: (Dimensions.get('screen').height / 4) * 3 * -1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(imageLogoAnimated, {
        toValue: -200,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSignInActivated(true);
    });
  }

  function DownModal() {
    Animated.parallel([
      Animated.timing(modalSignInAnimated, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(imageLogoAnimated, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSignInActivated(false);
    });
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Container>
          <Animated.View
            style={[
              {
                width: '100%',
                alignItems: 'center',
                marginTop: Dimensions.get('screen').height / 4,
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
            <FormSignin>
              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    bottom: (Dimensions.get('screen').height / 4) * 3 * -1,
                    height: (Dimensions.get('screen').height / 4) * 3,
                    backgroundColor: '#fff',
                    width: '100%',
                    paddingVertical: 16,
                    paddingHorizontal: 40,
                  },
                  {
                    transform: [
                      {
                        translateY: modalSignInAnimated,
                      },
                    ],
                  },
                ]}>
                <Icon
                  name="ios-arrow-back"
                  type="ionicon"
                  onPress={DownModal}
                  color={colors.primary}
                  containerStyle={{
                    alignSelf: 'flex-start',
                  }}
                />
                <Input
                  containerStyle={{
                    marginTop: 24,
                    width: '100%',
                  }}
                  errorMessage={errors?.email?.message}
                  onChangeText={text => setValue('email', text)}
                  placeholder="Digite seu email"
                  label="Email"
                  keyboardType="default"
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'envelope-o',
                  }}
                />

                <Input
                  errorMessage={errors?.password?.message}
                  onChangeText={text => setValue('password', text)}
                  placeholder="Digite sua senha"
                  label="Senha"
                  securityField
                />

                <Button
                  title="login"
                  disabled={submitLoadingButton}
                  loading={submitLoadingButton}
                  loadingProps={{
                    size: 24,
                  }}
                  containerStyle={{
                    marginTop: 40,
                  }}
                  fullWidth
                  buttonStyle={{height: 56}}
                  onPress={handleSubmit(onSubmit)}
                />
              </Animated.View>
            </FormSignin>
          ) : (
            <ButtonContainer>
              <Button
                title="Sign In"
                fullWidth
                onPress={() => {
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default SignIn;
