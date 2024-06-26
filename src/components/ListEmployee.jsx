import { useEffect, useState } from "react";
import { IconEdit } from "../icons/edit";
import { IconTrash } from "../icons/trash";
import { IconClock } from "../icons/clock";
import { IconCancel } from "../icons/cancel";

import { deleteOneEmployeeById } from "../services/employees";

export function ListEmployee({
  employees,
  refreshEmployees,
  employeeId,
  selectEmployee,
  onError,
}) {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const deleteEmployee = async ({ employeeId }) => {
    try {
      if (loadingDelete) return;
      onError("");
      setLoadingDelete(true);
      await deleteOneEmployeeById({ employeeId });
    } catch (error) {
      onError(error.message);
    } finally {
      setLoadingDelete(false);
      refreshEmployees();
    }
  };

  useEffect(() => {
    refreshEmployees();
  }, []);

  return (
    <div>
      {employees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Document Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.document_number}</td>
                <td>
                  {employeeId && employeeId === employee.id ? (
                    <button onClick={() => selectEmployee(null)}>
                      <IconCancel />
                    </button>
                  ) : (
                    <button onClick={() => selectEmployee(employee.id)}>
                      <IconEdit />
                    </button>
                  )}

                  <button
                    disabled={loadingDelete}
                    onClick={() => deleteEmployee({ employeeId: employee.id })}
                  >
                    {loadingDelete ? <IconClock /> : <IconTrash />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found</p>
      )}
    </div>
  );
}
