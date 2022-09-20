export const url = "http://localhost:3000/users";

const getOptions = {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
};

const deleteOptions = {
  method: "DELETE",
};

export const getData = async () => {
  const response = await fetch(url, getOptions);
  const userData = await response.json();
  return userData;
};
export const deleteData = async (id) => {
  const response = await fetch(`${url}/${id}`, deleteOptions);
  const userData = await response.json();
  return userData;
};
export const editData = async (id, modifiedUser) => {
  const response = await fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(modifiedUser),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const userData = await response.json();
  return userData;
};

export const sendData = async (newUser) => {
  const response = await fetch(`${url}`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const userData = await response.json();
  return userData;
};
