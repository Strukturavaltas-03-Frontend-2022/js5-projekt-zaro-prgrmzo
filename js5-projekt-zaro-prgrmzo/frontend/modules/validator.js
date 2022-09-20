// name, email address, address

const patterns = {
  name: /^[A-ZÁÉÍÓÚÖŐÜŰ][a-záéíóúöőüű]+(\s[A-ZÁÉÍÓÚÖŐÜŰ][a-záéíóúöőüű]+)*$/,
  email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  address: /^([a-záéíóüűöőA-ZÁÉÍÓÜŰÖŐ0-9/\\''(),-\s]{2,255})$/,
};

export const validator = (name, email, address) => {
  const nameMatch = name.match(patterns.name);
  const emailMatch = email.match(patterns.email);
  const addressMatch = address.match(patterns.address);
  // console.log(nameMatch, emailMatch, addressMatch);
  const alert = document.querySelector(".alert");
  if (!nameMatch && !emailMatch && !addressMatch) {
    alert.innerHTML = "One or more inputs are not valid!";
    return false;
  }
  if (!nameMatch) {
    alert.innerHTML = "Username input is not valid!";
    return false;
  }
  if (!emailMatch) {
    alert.innerHTML = "User email input is not valid!";
    return false;
  }
  if (!addressMatch) {
    alert.innerHTML = "User address input is not valid!";
    return false;
  }
  if (nameMatch && emailMatch && addressMatch) {
    alert.style.color = "grey";
    alert.innerHTML = "User was successfully added!";
    return true;
  } else {
    alert.innerHTML = "One or more inputs are not valid!123123123";
    return false;
  }
};
