import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputGroup } from "../components/InputGroup";
import { storeEmployeeSchema } from "../schemas/storeEmployeeSchema";

export function CreateEmployee({ onEmployeeCreated }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(storeEmployeeSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    const response = await fetch("http://localhost:8000/api/employees", {
      body: JSON.stringify(values),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    setLoading(false);
    if (!response.ok) {
      const errorData = await response.json();
      console.log("Validation errors:", errorData);
    } else {
      onEmployeeCreated();
      reset();
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
        {(loading && <button disabled> Enviando ...</button>) || (
          <button>Enviar</button>
        )}
      </form>
    </>
  );
}
