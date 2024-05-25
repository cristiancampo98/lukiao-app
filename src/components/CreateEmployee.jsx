import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputGroup } from "../components/InputGroup";
import { employeeSchema } from "../schemas/employeeSchema";

import { createEmployee } from "../services/employees";

export function CreateEmployee({ onEmployeeCreated, onError }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setLoading(true);
      onError("");
      await createEmployee({ payload: values });
      onEmployeeCreated();
      reset();
    } catch (error) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
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
        {(loading && <button disabled> Guardando ...</button>) || (
          <button>Guardar</button>
        )}
      </form>
    </>
  );
}
