import * as yup from "yup";

const HelpEventBasicValidation = yup.object().shape({

    title: yup.string()
        .min(1,'Title too short')
        .required('Enter Title'),
    description: yup.string()
        .min(1,'Description too short')
        .required('Enter Description'),
  });

export default HelpEventBasicValidation;