import * as yup from 'yup';

export const schema = yup.object().shape({
  username: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/^\S*$/, 'Password must not contain spaces')
    .matches(/\d/, 'Password must contain at least 1 number')
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
    .required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please repeat password again'),
});
