import * as yup from "yup";

export  const storeEmployeeSchema = yup
.object()
.shape({
  firstname: yup
    .string()
    .required("Firstname is required")
    .max(255, "Firstname must be at most 255 characters"),
  lastname: yup
    .string()
    .required("Lastname is required")
    .max(255, "Lastname must be at most 255 characters"),
  document_number: yup
    .string()
    .required("Document number is required")
    .length(10, "Document number must be exactly 10 characters"),
  cellphone_number: yup
    .string()
    .required("Cellphone number is required")
    .length(10, "Cellphone number must be exactly 10 characters"),
  country: yup
    .string()
    .required("Country is required")
    .max(255, "Country must be at most 255 characters"),
  city: yup
    .string()
    .required("City is required")
    .max(255, "City must be at most 255 characters"),
})
.required();