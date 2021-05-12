/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Alert,
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {colors, Icon, SocialIcon, Text} from 'react-native-elements';
import {Button} from '../../Components/ReactNativeElements/Button';
import Input from '../../Components/ReactNativeElements/Input';

import {Divider, FormSignin, LineRow} from './styles';
import {fieldValidationSchema} from './utils';

interface DataFormProps {
  email: string;
  password: string;
}

interface FormSignInProps {
  modalSignInAnimated: any;
  DownModal: () => void;
}

export function FormSignIn({modalSignInAnimated, DownModal}: FormSignInProps) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(fieldValidationSchema),
  });
  const [submitLoadingButton, setSubmitLoadingButton] = useState(false);

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

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
