import * as yup from "yup";

const UserSignupValidation = yup.object().shape({
    email: yup.string()
        .email('Invalid email')
        .required('Enter your Email'),
    password: yup.string()
        .min(4,'Password too short')
        .required('Enter your Password'),
    firstName: yup.string()
        .required('Enter your First name'),
    secondName: yup.string()
        .required('Enter your Second name'),
    telephone: yup.string()
        .required('Enter your Phone number'),

    address: yup.object().shape({
        city: yup.string().required("Enter your City"),
        district: yup.string().required("Enter your District"),
        region: yup.string().required("Enter your Region"),
        homeLocation: yup.string().required("Enter your Street"),
        })
  });

export default UserSignupValidation;