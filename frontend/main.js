import { getData, deleteData, editData, sendData } from "./modules/fetch.js";
import { validator } from "./modules/validator.js";

const tBody = document.querySelector("#tBody");
const modal = document.querySelector(".modal");

const cancelBtn = document.querySelector(".cancel-btn");
const addUserBtn = document.querySelector(".addUser-btn");
const saveBtn = document.querySelector(".save-btn");

const modalInputs = document.querySelectorAll(".editUsers input");

const header = document.querySelector(".header");
const alert = document.querySelector(".alert");

let delBtn;
let editBtn;
let modifiedUser = {};
let newUser = {};

const userData = await getData();

const generateTable = () => {
  userData.forEach((user, i) => {
    const tr = document.createElement("tr");
    tr.classList.add("user");
    tBody.appendChild(tr);

    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.emailAddress}</td>
      <td>${user.address}</td>
      <td>
      <button class="edit-btn"><i class="fa fa-pencil" aria-hidden="true"></i></button>
      <button class="del-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
      </td>`;

    delBtn = document.querySelectorAll(".del-btn");
    delBtn[i].addEventListener("click", () => {
      deleteData(user.id);
      tBody.children[i].remove();
    });

    editBtn = document.querySelectorAll(".edit-btn");

    editBtn[i].addEventListener("click", () => {
      modal.style.display = "flex";
      header.innerHTML = "Edit User";
      modalInputs[0].value = user.name;
      modalInputs[1].value = user.emailAddress;
      modalInputs[2].value = user.address;

      saveBtn.addEventListener("click", () => {
        modifiedUser.name = modalInputs[0].value;
        modifiedUser.emailAddress = modalInputs[1].value;
        modifiedUser.address = modalInputs[2].value;

        if (
          validator(
            modifiedUser.name,
            modifiedUser.emailAddress,
            modifiedUser.address
          )
        ) {
          editData(user.id, modifiedUser);
          modalInputs.forEach((input) => {
            input.value = "";
            input.disabled = true;
          });
          saveBtn.disabled = true;
          alert.innerHTML = "User successfully edited!";
          alert.style.color = "limegreen";
          setTimeout(() => {
            clearTimeout();
            modal.style.display = "none";
            alert.innerHTML = "";
            location.reload();
          }, 5000);
        }
      });
    });
  });
};

generateTable();

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
  alert.innerHTML = "";
});

addUserBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  header.innerHTML = "Add New User";

  saveBtn.addEventListener("click", () => {
    newUser.name = modalInputs[0].value;
    newUser.emailAddress = modalInputs[1].value;
    newUser.address = modalInputs[2].value;

    if (validator(newUser.name, newUser.emailAddress, newUser.address)) {
      sendData(newUser);
      modalInputs.forEach((input) => {
        input.value = "";
        input.disabled = true;
      });
      saveBtn.disabled = true;
      alert.innerHTML = "User successfully added!";
      alert.style.color = "limegreen";
      setTimeout(() => {
        clearTimeout();
        modal.style.display = "none";
        location.reload();
        alert.innerHTML = "";
      }, 5000);
    }
  });
});
