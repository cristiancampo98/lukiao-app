export function InputGroup({
  register,
  name,
  errors,
  type = "text",
  placeholder = "",
}) {
  return (
    <div className="input-group">
      <input type={type} {...register(name)} placeholder={placeholder} />
      {errors[name] && <span>{errors[name]?.message}</span>}
    </div>
  );
}
