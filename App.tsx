/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import * as yup from 'yup';

import {Input} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {Alert, SafeAreaView} from 'react-native';

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

function App() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(fieldValidationSchema),
  });

  const [submitLoadingButton, setSubmitLoadingButton] = useState(false);
  const [enableSecurityText, setEnableSecurityText] = useState(true);

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

  function handleEnableSecurityText() {
    setEnableSecurityText(!enableSecurityText);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Input
          placeholder="Digite seu email"
          label="Email"
          keyboardType="email-address"
          onChangeText={text => setValue('email', text)}
          errorMessage={errors?.email?.message}
          leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
          inputContainerStyle={{
            marginHorizontal: '5%',
            width: '90%',
          }}
          labelStyle={{
            marginHorizontal: '5%',
            marginTop: 16,
            width: '90%',
          }}
        />

        <Input
          placeholder="Digite sua senha"
          label="Senha"
          secureTextEntry={enableSecurityText}
          errorMessage={errors?.password?.message}
          leftIcon={{type: 'ionicon', name: 'key-outline'}}
          rightIcon={
            <Icon
              name={
                enableSecurityText ? 'ios-eye-outline' : 'ios-eye-off-outline'
              }
              onPress={handleEnableSecurityText}
              size={24}
            />
          }
          onChangeText={text => setValue('password', text)}
          inputContainerStyle={{
            marginHorizontal: '5%',
            width: '90%',
          }}
          labelStyle={{
            marginHorizontal: '5%',
            marginTop: 16,
            width: '90%',
          }}
        />

        <Button
          title="Continuar"
          disabled={submitLoadingButton}
          loading={submitLoadingButton}
          loadingProps={{
            size: 24,
          }}
          containerStyle={{width: '90%', marginHorizontal: '5%'}}
          buttonStyle={{height: 56}}
          onPress={handleSubmit(onSubmit)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
