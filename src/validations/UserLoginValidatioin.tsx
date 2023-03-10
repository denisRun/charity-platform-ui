import * as yup from "yup";

const UserLoginValidation = yup.object().shape({
    email: yup.string()
        .email('Invalid email')
        .required('Enter your Email'),
    password: yup.string()
        .min(4,'Password too short')
        .required('Enter your Password'),
  });

export default UserLoginValidation;