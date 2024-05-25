export const findAllEmployees = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/employees", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data
  } catch (error) {
    return []
  }
}

export const createEmployee = async ({payload}) => {
  try {
    const response = await fetch("http://localhost:8000/api/employees", {
    body: JSON.stringify(payload),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.ok
  } catch (error) {
    return error.message
  }
}

export const updateEmployee = async({employeeId, payload}) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/employees/${employeeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    return response.ok
  } catch (error) {
    return error.message
  }
}

export const findOneEmployeeById = async ({employeeId}) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/employees/${employeeId}`
    );
    if (response.ok) {
      const data = await response.json();
      return data
    } else {
      console.log("Failed to fetch employee data.");
    }
  } catch (error) {
    return error.message
  } 
}

export const deleteOneEmployeeById = async ({employeeId}) => {
  try {
    const response = await fetch(`http://localhost:8000/api/employees/${employeeId}`, {
      method: "DELETE",
    });
    return response.ok
  } catch (error) {
    return false
  }
}