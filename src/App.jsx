import { useState } from "react";
import "./App.css";

import { CreateEmployee } from "./components/CreateEmployee";
import { ListEmployee } from "./components/ListEmployee";
import { UpdateEmployee } from "./components/UpdateEmployee";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const addEmployee = async () => {
    const response = await fetch("http://localhost:8000/api/employees", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    setEmployees(data);
  };

  const handleUpdateSuccess = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
    setSelectedEmployeeId(null);
  };
  return (
    <>
      <main className="principal-container">
        {selectedEmployeeId ? (
          <UpdateEmployee
            employeeId={selectedEmployeeId}
            onUpdateSuccess={handleUpdateSuccess}
          />
        ) : (
          <CreateEmployee onEmployeeCreated={addEmployee} />
        )}
        <ListEmployee
          employees={employees}
          refreshEmployees={addEmployee}
          selectEmployee={setSelectedEmployeeId}
        />
      </main>
    </>
  );
}

export default App;
