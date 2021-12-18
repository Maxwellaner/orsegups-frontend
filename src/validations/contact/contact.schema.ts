import * as Yup from 'yup';

const create = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório').matches(/^[aA-zZ\s]+$/, 'Apenas letras'),
  contactType: Yup.string().required('Campo obrigatório'),
  email: Yup.string().email('Deve ser um e-mail válido').required('Campo obrigatório'),
  phone: Yup.string().min(15, 'Este campo deve conter 11 dígitos').required('Campo obrigatório')
});

export default { create }