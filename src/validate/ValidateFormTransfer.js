import * as Yup from 'yup';

const TransferSchema = Yup.object().shape({
    email: Yup.string()
    .email("Validate_Form_AddContact_Email_Invalid")
    .required("Validate_Form_AddContact_Email").nullable(),
})

export default TransferSchema;