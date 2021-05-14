/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  Alert,
  Animated,
  BackHandler,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {Icon, SocialIcon, Text} from 'react-native-elements';

import {Button} from '../../Components/ReactNativeElements/Button';
import Input from '../../Components/ReactNativeElements/Input';
import colors from '../../Theme/colors';

import {Divider, FormSignin, LineRow} from './styles';
import {fieldValidationSchema} from './utils';

interface DataFormProps {
  email: string;
  password: string;
}

interface FormSignInProps {
  modalSignInAnimated: any;
  animationFinished: boolean;
  hasOpen: boolean;
  DownModal: () => void;
}

export function FormSignIn({
  modalSignInAnimated,
  animationFinished,
  hasOpen,
  DownModal,
}: FormSignInProps) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(fieldValidationSchema),
  });
  const emailInputRef = useRef<TextInput>();
  const passwordInputRef = useRef<TextInput>();

  const [submitLoadingButton, setSubmitLoadingButton] = useState(false);
  const [emailInputOnFocus, setEmailInputOnFocus] = useState(false);
  const [passwordInputOnFocus, setPasswordInputOnFocus] = useState(false);

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  useEffect(() => {
    if (animationFinished === true && hasOpen === false) {
      if (emailInputRef.current !== (null || undefined)) {
        emailInputRef.current.focus();
      }
    }
  }, [animationFinished, hasOpen]);

  Keyboard.addListener('keyboardDidHide', () => {
    setEmailInputOnFocus(false);
    setPasswordInputOnFocus(false);
  });

  BackHandler.addEventListener('hardwareBackPress', () => {
    DownModal();
    return true;
  });

  function onSubmit({email, password}: DataFormProps) {
    setSubmitLoadingButton(true);
    Keyboard.dismiss();
    setTimeout(() => {
      setSubmitLoadingButton(false);
      Alert.alert(email, password);
    }, 3000);
  }

  return (
    <FormSignin>
      <KeyboardAvoidingView
        enabled
        style={{
          flexGrow: 1,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: (Dimensions.get('screen').height / 5) * 3 * -1,
              height: (Dimensions.get('screen').height / 5) * 3,
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
            ref={emailInputRef}
            containerStyle={{
              marginTop: 24,
              width: '100%',
            }}
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="default"
            blurOnSubmit={false}
            errorMessage={errors?.email?.message}
            onChangeText={text => setValue('email', text.trimRight())}
            placeholder="Digite seu email"
            label="Email"
            leftIcon={{
              type: 'font-awesome',
              name: 'envelope-o',
            }}
            focus={emailInputOnFocus}
            onBlur={() => setEmailInputOnFocus(false)}
            onFocus={() => setEmailInputOnFocus(true)}
            returnKeyType="next"
            onSubmitEditing={() => {
              setEmailInputOnFocus(false);
              setPasswordInputOnFocus(true);
              passwordInputRef.current?.focus();
            }}
          />
          <Input
            ref={passwordInputRef}
            errorMessage={errors?.password?.message}
            onChangeText={text => setValue('password', text.trimRight())}
            placeholder="Digite sua senha"
            label="Senha"
            focus={passwordInputOnFocus}
            onBlur={() => setPasswordInputOnFocus(false)}
            onFocus={() => setPasswordInputOnFocus(true)}
            returnKeyType="send"
            securityField
            onSubmitEditing={handleSubmit(onSubmit)}
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
          <Text
            h4
            h4Style={{
              alignSelf: 'center',
              fontSize: 16,
              marginTop: 40,
              fontWeight: 'bold',
              color: colors.primary,
            }}>
            forgot password?
          </Text>
          <LineRow>
            <Divider />
            <Text
              h4
              h4Style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: colors.primary,
              }}>
              or
            </Text>
            <Divider />
          </LineRow>

          <LineRow>
            <SocialIcon
              type="facebook"
              raised={true}
              light
              iconType="font-awesome"
              button={false}
              iconColor="#fff"
              iconSize={24}
            />

            <SocialIcon
              type="github"
              raised={true}
              light
              iconType="font-awesome"
              button={false}
              iconColor="#fff"
              iconSize={24}
            />

            <SocialIcon
              type="google"
              raised={true}
              light
              iconType="font-awesome"
              button={false}
              iconColor="#fff"
              iconSize={24}
            />
          </LineRow>
        </Animated.View>
      </KeyboardAvoidingView>
    </FormSignin>
  );
}
