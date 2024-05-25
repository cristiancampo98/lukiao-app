import { useState } from "react";
import "./App.css";

import { CreateEmployee } from "./components/CreateEmployee";
import { ListEmployee } from "./components/ListEmployee";
import { UpdateEmployee } from "./components/UpdateEmployee";
import { findAllEmployees } from "./services/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
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
      {error && (
        <header className="alert-container">
          <h3>Oops! Something went wrong.</h3>
          <p>{error}</p>
        </header>
      )}
      <main className="principal-container">
        {selectedEmployeeId ? (
          <UpdateEmployee
            employeeId={selectedEmployeeId}
            onUpdateSuccess={handleUpdateSuccess}
            onError={setError}
          />
        ) : (
          <CreateEmployee onEmployeeCreated={addEmployee} onError={setError} />
        )}
        <ListEmployee
          employees={employees}
          refreshEmployees={addEmployee}
          employeeId={selectedEmployeeId}
          selectEmployee={setSelectedEmployeeId}
          onError={setError}
        />
      </main>
    </>
  );
}

export default App;
