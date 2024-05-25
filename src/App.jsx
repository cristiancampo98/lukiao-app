import { useState } from "react";
import "./App.css";

import { CreateEmployee } from "./components/CreateEmployee";
import { ListEmployee } from "./components/ListEmployee";
import { UpdateEmployee } from "./components/UpdateEmployee";
import { findAllEmployees } from "./services/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const addEmployee = async () => {
    const data = await findAllEmployees();
    setEmployees(data);
  };

  const handleUpdateSuccess = () => {
    addEmployee();
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
          employeeId={selectedEmployeeId}
          selectEmployee={setSelectedEmployeeId}
        />
      </main>
    </>
  );
}

export default App;
