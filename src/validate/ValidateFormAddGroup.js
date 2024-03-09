import * as Yup from 'yup';


const AddGroupSchema = Yup.object().shape({
    group_name: Yup.string()
    .max(20, "Validate_Form_AddGroup_Name_Max_Lenght")
    .required("Validate_Form_AddGroup_NameGroup").nullable(),
})
export default AddGroupSchema;