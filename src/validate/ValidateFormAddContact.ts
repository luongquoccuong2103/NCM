import * as Yup from "yup";

const phoneRegex =
  /^((0[2|3|4|5|7|8|9])+([0-9]{8,9})|(84[3|4|5|7|8|9])+([0-9]{8,9}))$/;

// const websiteRegex = /^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[‌​a-z]{3}\.([a-z]+)?$/

const faxRegex =
  /^(\d{1,}(\s?|\-?)\d*(\s?|\-?)\(?\d{2,}\)?(\s?|\-?)\d{3,}\s?\d{3,})$/;

const emailRegex = /^[a-zA-Z0-9\.]+@([\w]+\.)+[\w]{2,4}$/;

const AddContactSchema = Yup.object().shape({
  name: Yup.string()
    .max(255, "Name must be less than 255 characters")
    .required("Name is required")
    .nullable(),
  company: Yup.string().required("Company is required").nullable(),
  phone: Yup.string()
    .matches(phoneRegex, "Phone is invalid")
    .required("Phone is required")
    .nullable(),
  email: Yup.string()
    .matches(emailRegex, "Email is invalid")
    .required("Email is required")
    .nullable(),
  fax: Yup.string().matches(phoneRegex, "Fax is invalid").nullable(),
});

export default AddContactSchema;
