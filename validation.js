const form = document.getElementById("form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
let user_records = new Array();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput();
});
var regexp = /\s/g;
// for Name validation
username.addEventListener("keyup", (e) => {
  let data = /^[a-zA-Z .]*$/;

  if (e.target.value === "") {
    setError(username, "Username is Required");
    cnt++;
  } else if (!e.target.value.match(data)) {
    setError(username, "Please Enter Valid Name");
    cnt++;
  } else if (e.target.value.match(regexp)) {
    setError(username, "Dont allow space between the name");
  } else if (e.target.value.length <= 3) {
    setError(username, "Name must be above 3 characters");
  } else {
    setSuccess(username);
  }
});

// Validation for email
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
email.addEventListener("keyup", (e) => {
  if (e.target.value === "") {
    setError(email, "Email Id is Required");
    cnt++;
  } else if (e.target.value.match(regexp)) {
    setError(email, "Dont allow any space");
  } else if (!isValidEmail(e.target.value)) {
    setError(email, "Inavlid Email Id");
    cnt++;
  } else {
    setSuccess(email);
  }
});

// Validation for Password
password.addEventListener("keyup", (e) => {
  if (e.target.value === "") {
    setError(password, "Password is Required");
    cnt++;
  } else if (e.target.value.match(regexp)) {
    setError(password, "Dont allow any space");
  } else if (e.target.value.length < 8) {
    setError(password, "Password must be any 10 character");
    cnt++;
  } else {
    setSuccess(password);
  }
});
password2.addEventListener("keyup", (e) => {
  if (e.target.value === "") {
    setError(password2, "Please Re enter Password");
    cnt++;
  } else if (e.target.value !== passwordValue) {
    setError(password2, "Password Didn't Match Please Enter same Password");
    cnt++;
  } else {
    setSuccess(password2);
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const validateInput = () => {
  const nameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  let cnt = 0;

  let data = /^[a-zA-Z .]*$/;
  if (nameValue === "") {
    setError(username, "Username is Required");
    cnt++;
  } else if (!nameValue.match(data)) {
    setError(username, "Please Enter Valid Name");
    cnt++;
  } else if (nameValue.length <= 3) {
    setError(username, "Name must be above 3 characters");
  } else {
    setSuccess(username);
  }

  //Email Validation
  if (emailValue === "") {
    setError(email, "Email Id is Required");
    cnt++;
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Inavlid Email Id");
    cnt++;
  } else {
    setSuccess(email);
  }
  //Password validation
  if (passwordValue === "") {
    setError(password, "Password is Required");
    cnt++;
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be any 10 character");
    cnt++;
  } else {
    setSuccess(password);
  }
  if (password2Value === "") {
    setError(password2, "Please Re enter Password");
    cnt++;
  } else if (password2Value !== passwordValue) {
    setError(password2, "Password Didn't Match Please Enter same Password");
    cnt++;
  } else {
    setSuccess(password2);
  }
  user_records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  if (
    user_records.some((duplicate) => {
      return duplicate.email === emailValue;
    })
  ) {
    setError(email, "Email Id is already Exist");
    cnt++;
  }

  if (cnt === 0) {
    user_records.push({
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    });

    localStorage.setItem("users", JSON.stringify(user_records));

    location.href = "login.html";
    return true;
  } else {
    return false;
  }
};
