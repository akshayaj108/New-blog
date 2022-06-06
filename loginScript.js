const login = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

login.addEventListener("submit", (e) => {
  e.preventDefault();
  validateLogIn();
});

email.addEventListener("keypress", (e) => {
  if (e.target.value === "") {
    setError(email, "Email is required");
    cnt++;
  } else if (!isValidEmail(e.target.value)) {
    setError(email, " Enter valid Email");
    cnt++;
  } else {
    setSuccess(email);
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
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const validateLogIn = () => {
  const emailvalue = email.value.trim();
  const passwordValue = password.value.trim();

  let cnt = 0;
  if (emailvalue === "") {
    setError(email, "Email is required");
    cnt++;
  } else if (!isValidEmail(emailvalue)) {
    setError(email, " Enter valid Email");
    cnt++;
  } else {
    setSuccess(email);
  }
  if (passwordValue === "") {
    setError(password, "Enter Password");
    cnt++;
  } else {
    setSuccess(password);
  }

  let user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  if (
    user_records.some((v) => {
      return v.email === emailvalue && v.password === passwordValue;
    })
  ) {
    console.log("Authenticated Successfully");
  } else {
    cnt++;
    setError(password, "Incorrect Email Id or Password");
  }
  if (cnt === 0) {
    location.href = "homeBlog.html";
    return true;
  } else {
    return false;
  }
};
