import * as Yup from "yup";

const AddGroupSchema = Yup.object().shape({
  group_name: Yup.string()
    .max(20, "Name must be less than 20 characters")
    .required("Group name is required")
    .nullable(),
});
export default AddGroupSchema;
