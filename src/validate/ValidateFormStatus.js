import * as Yup from 'yup';

const StatusSchema = Yup.object().shape({
    reason: Yup.string().required("Validate_Form_Status_Reason").nullable(),
})

export default StatusSchema;