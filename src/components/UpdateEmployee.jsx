import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputGroup } from "../components/InputGroup";
import { employeeSchema } from "../schemas/employeeSchema";
import { findOneEmployeeById, updateEmployee } from "../services/employees";

export function UpdateEmployee({ employeeId, onUpdateSuccess }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(employeeSchema),
  });

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const employee = await findOneEmployeeById({ employeeId });
        if (Object.keys(employee).length) {
          setValue("firstname", employee.firstname);
          setValue("lastname", employee.lastname);
          setValue("document_number", employee.document_number);
          setValue("cellphone_number", employee.cellphone_number);
          setValue("country", employee.country);
          setValue("city", employee.city);
        } else {
          console.log("Failed to fetch employee data.");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    getEmployee();
  }, [employeeId, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const response = await updateEmployee({ employeeId, payload: data });
    setLoading(false);

    if (!response) return;

    onUpdateSuccess(updatedEmployee); // Notificar éxito en la actualización
  });

  return (
    <>
      <form className="form-create" onSubmit={onSubmit}>
        <InputGroup
          register={register}
          name="firstname"
          errors={errors}
          placeholder="First Name"
        />
        <InputGroup
          register={register}
          name="lastname"
          errors={errors}
          placeholder="Last Name"
        />
        <InputGroup
          register={register}
          name="document_number"
          errors={errors}
          placeholder="Document Number"
        />
        <InputGroup
          register={register}
          name="cellphone_number"
          errors={errors}
          placeholder="Cellphone Number"
        />
        <InputGroup
          register={register}
          name="country"
          errors={errors}
          placeholder="Country"
        />
        <InputGroup
          register={register}
          name="city"
          errors={errors}
          placeholder="City"
        />
        {(loading && <button disabled> Actualizando ...</button>) || (
          <button>Actualizar</button>
        )}
      </form>
    </>
  );
}
