import * as Yup from "yup";

const TransferSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required")
    .nullable(),
});

export default TransferSchema;
