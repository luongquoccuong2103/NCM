import * as Yup from 'yup';


const phoneRegex = /^((0[2|3|4|5|7|8|9])+([0-9]{8,9})|(84[3|4|5|7|8|9])+([0-9]{8,9}))$/;

// const websiteRegex = /^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[‌​a-z]{3}\.([a-z]+)?$/

const faxRegex = /^(\d{1,}(\s?|\-?)\d*(\s?|\-?)\(?\d{2,}\)?(\s?|\-?)\d{3,}\s?\d{3,})$/

const emailRegex = /^[a-zA-Z0-9\.]+@([\w]+\.)+[\w]{2,4}$/;

const AddContactSchema = Yup.object().shape({
    name: Yup.string()
        .max(255, "Validate_Form_AddContact_Name_Max_Lenght")
        .required("Validate_Form_AddContact_Name").nullable(),
    company: Yup.string()
        .required("Validate_Form_AddContact_Company").nullable(),
    phone: Yup.string()
        .matches(phoneRegex, "Validate_Form_AddContact_Phone_Invalid")
        .required("Validate_Form_AddContact_Phone").nullable(),
    email: Yup.string()
        .matches(emailRegex, "Validate_Form_AddContact_Email_Invalid")
        .required("Validate_Form_AddContact_Email").nullable(),
    fax: Yup.string()
        .matches(phoneRegex, "Validate_Form_AddContact_Fax_Invalid")
        .nullable(),
});

export default AddContactSchema;