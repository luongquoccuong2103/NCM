import * as Yup from "yup";

const StatusSchema = Yup.object().shape({
  reason: Yup.string().required("Reason is required").nullable(),
});

export default StatusSchema;
