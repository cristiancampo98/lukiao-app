export const findAllEmployees = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/employees", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching employees: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to fetch employees");
  }
};

export const createEmployee = async ({ payload }) => {
  try {
    const response = await fetch("http://localhost:8000/api/employees", {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error creating employee: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to create employee");
  }
};

export const updateEmployee = async ({ employeeId, payload }) => {
  try {
    const response = await fetch(`http://localhost:8000/api/employees/${employeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error updating employee: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to update employee");
  }
};

export const findOneEmployeeById = async ({ employeeId }) => {
  try {
    const response = await fetch(`http://localhost:8000/api/employees/${employeeId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching employee with ID ${employeeId}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(`Failed to fetch employee with ID ${employeeId}`);
  }
};

export const deleteOneEmployeeById = async ({ employeeId }) => {
  try {
    const response = await fetch(`http://localhost:8000/api/employees/${employeeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error deleting employee with ID ${employeeId}: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error(error.message);
    throw new Error(`Failed to delete employee with ID ${employeeId}`);
  }
};
