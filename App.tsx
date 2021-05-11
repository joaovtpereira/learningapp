/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {TextInputMask} from 'react-native-masked-text';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';

interface DataFormProps {
  email: string;
  number: string;
}

const fieldValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('O email não pode ser vazio')
    .email('Digite um email válido'),
  number: yup.string().required('A senha não pode ser vazia'),
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

  useEffect(() => {
    register('email');
    register('number');
  }, [register]);

  function onSubmit({email, number}: DataFormProps) {
    Alert.alert(email, number);
  }

  return (
    <SafeAreaView>
      <Text>Hello World Eslint</Text>
      <TextInput
        placeholder={'Digite seu email'}
        onChangeText={text => setValue('email', text)}
        keyboardType="email-address"
        style={{
          height: 60,
          width: '90%',
          backgroundColor: '#c1c1c1',
          marginHorizontal: '5%',
          marginTop: 16,
        }}
      />

      {errors?.email && <Text>Deu ruim Email</Text>}

      <TextInputMask
        placeholder={'Digite seu telefone'}
        keyboardType="numeric"
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
        }}
        onChangeText={text => setValue('number', text)}
        type="cel-phone"
        style={{
          height: 60,
          width: '90%',
          backgroundColor: '#c1c1c1',
          marginHorizontal: '5%',
          marginTop: 16,
        }}
      />

      {errors?.number && <Text>Número inválido</Text>}

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Continuar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default App;
