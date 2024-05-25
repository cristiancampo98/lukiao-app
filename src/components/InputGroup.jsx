import { useEffect, useRef, useState } from "react";

export function InputGroup({
  register,
  watch,
  name,
  errors,
  type = "text",
  placeholder = "",
}) {
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    watch(name) ? setShowLabel(true) : setShowLabel(false);
  }, [watch(name)]);

  return (
    <div className="input-group">
      {showLabel && <label>{placeholder}</label>}
      <input type={type} {...register(name)} placeholder={placeholder} />
      {errors[name] && <span>{errors[name]?.message}</span>}
    </div>
  );
}
