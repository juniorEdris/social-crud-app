// export const imgdestination = `../../../jwt-auth-practice/build/images/`;
export const imgdestination = `./images/`;

export const placeHolderImage = `important/profileplaceholder.jpg`;

export const Auth = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// uppercase_lowercase_number_special
export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
