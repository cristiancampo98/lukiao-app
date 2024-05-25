import { useState } from "react";
import "./App.css";

import { CreateEmployee } from "./components/CreateEmployee";
import { ListEmployee } from "./components/ListEmployee";

function App() {
  const [employees, setEmployees] = useState([]);

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
  return (
    <>
      <main className="principal-container">
        <CreateEmployee onEmployeeCreated={addEmployee} />
        <ListEmployee employees={employees} refreshEmployees={addEmployee} />
      </main>
    </>
  );
}

export default App;
