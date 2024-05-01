import * as Yup from "yup";

const emailRegex = /^[a-zA-Z0-9\.]+@([\w]+\.)+[\w]{2,4}$/;

const AddContactSchema = Yup.object().shape({
  name: Yup.string()
    .max(255, "Name must be less than 255 characters")
    .required("Name is required")
    .nullable(),
  company: Yup.string().required("Company is required").nullable(),
  phone: Yup.string().required("Phone is required").nullable(),
  email: Yup.string().matches(emailRegex, "Email is invalid").nullable(),
  fax: Yup.string().nullable(),
});

export default AddContactSchema;
