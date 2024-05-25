import { useEffect } from "react";
import { IconEdit } from "../icons/edit";
import { IconTrash } from "../icons/trash";

export function ListEmployee({ employees, refreshEmployees }) {
  const deleteEmployee = async ({ employeeId }) => {
    await fetch(`http://localhost:8000/api/employees/${employeeId}`, {
      method: "DELETE",
    });

    refreshEmployees();
  };
  useEffect(() => {
    refreshEmployees();
  }, []);

  return (
    <div>
      {employees.length > 0 ? (
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              {employee.firstname} {employee.lastname} -{" "}
              {employee.document_number}
              <IconEdit />
              <i onClick={() => deleteEmployee({ employeeId: employee.id })}>
                <IconTrash />
              </i>
            </li>
          ))}
        </ul>
      ) : (
        <p>No employees found</p>
      )}
    </div>
  );
}
