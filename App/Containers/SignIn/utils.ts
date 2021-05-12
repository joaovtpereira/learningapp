import * as yup from 'yup';

export const fieldValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('O email não pode ser vazio')
    .email('Digite um email válido'),
  password: yup.string().required('Campo senha obrigatório'),
});
