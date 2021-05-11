/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as yup from 'yup';

import Input from './App/Components/ReactNativeElements/Input';
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

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Input
          errorMessage={errors?.email?.message}
          onChangeText={text => setValue('email', text)}
          placeholder="Digite seu email"
          label="Email"
          keyboardType="email-address"
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
