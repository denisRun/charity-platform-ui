import * as yup from "yup";

const ProposalEventBasicValidation = yup.object().shape({

    title: yup.string()
        .min(1,'Title too short')
        .required('Enter Title'),
    description: yup.string()
        .min(1,'Title too short')
        .required('Enter Description'),
    maxConcurrentRequests: yup.number()
        .min(1,'Minimum 1 active request')
        .required('Enter count of max active requests'),
  });

export default ProposalEventBasicValidation;