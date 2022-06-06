const form = document.getElementById("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const description = document.getElementById("details");
const postDate = document.getElementById("uploadDate");
const file = document.getElementById("image");
let userBlog_records = new Array();

var regexp = /\s/g;
var nameString = /^[a-zA-Z .]*$/;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateBlogData();
});

title.addEventListener("mouseleave", (e) => {
  if (e.target.value === "") {
    setError(title, "Title Must be required");
  } else {
    setSuccess(title);
  }
});
title.addEventListener("keypress", (e) => {
  if (e.target.value.match(regexp)) {
    setError(title, "Space should not be allow");
  } else if (e.target.value.length < 5) {
    setError(title, "Title must be above 4 letters");
  } else if (!e.target.value.match(nameString)) {
    setError(title, "Title shuld not contains special character or numbers");
  } else {
    setSuccess(title);
  }
});

author.addEventListener("mouseleave", (e) => {
  if (e.target.value === "") {
    setError(author, "Author name Must be required");
  } else {
    setSuccess(author);
  }
});
author.addEventListener("keypress", (e) => {
  if (e.target.value.length < 5) {
    setError(author, "Author name must be above 4 letters");
  } else if (!e.target.value.match(nameString)) {
    setError(
      author,
      "Author field should not contains special character or numbers"
    );
  } else {
    setSuccess(author);
  }
});

description.addEventListener("mouseleave", (e) => {
  if (e.target.value === "") {
    setError(description, "Decription Must be required");
  } else {
    setSuccess(description);
  }
});
description.addEventListener("keypress", (e) => {
  if (e.target.value.length < 10) {
    setError(description, "description must be above 10 letters");
  } else if (!e.target.value.match(nameString)) {
    setError(
      description,
      "Description should not contains special character or numbers"
    );
  } else {
    setSuccess(description);
  }
});

postDate.addEventListener("mouseleave", (e) => {
  if (e.target.value === "") {
    setError(postDate, " Post upload date must be required");
  } else {
    setSuccess(postDate);
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

const validateBlogData = () => {
  let cnt = 0;
  const titleValue = title.value;
  const authorValue = author.value;
  const descriptions = description.value;
  const datePost = postDate.value;
  const fileValue = file.value;

  if (titleValue === "") {
    setError(title, "Title Must be required");
    cnt++;
  } else if (titleValue.match(regexp)) {
    setError(title, "Space should not be allow");
    cnt++;
  } else if (titleValue.length < 5) {
    setError(title, "Title must be above 4 letters");
    cnt++;
  } else if (!titleValue.match(nameString)) {
    setError(title, "Title shuld not contains special character or numbers");
    cnt++;
  } else {
    setSuccess(title);
  }

  if (authorValue === "") {
    setError(author, "Author name Must be required");
    cnt++;
  } else if (authorValue.length < 5) {
    setError(author, "Author name must be above 4 letters");
    cnt++;
  } else if (!authorValue.match(nameString)) {
    setError(
      author,
      "Author field should not contains special character or numbers"
    );
    cnt++;
  } else {
    setSuccess(author);
  }

  if (descriptions === "") {
    setError(description, "Some Description should write");
    cnt++;
  } else if (descriptions.length < 6) {
    setError(
      description,
      "Description is too short It must be above 15 character"
    );
    cnt++;
  } else if (descriptions < 15) {
    setError(description, "Description should above 15 chracters");
    cnt++;
  } else {
    setSuccess(description);
  }

  if (datePost === "") {
    setError(postDate, "Date must be Required");
    cnt++;
  } else {
    setSuccess(postDate);
  }

  userBlog_records = JSON.parse(localStorage.getItem("usersPosts"))
    ? JSON.parse(localStorage.getItem("usersPosts"))
    : [];

  if (cnt === 0) {
    userBlog_records.push({
      title: titleValue,
      author: authorValue,
      details: descriptions,
      date: datePost,
      file: fileValue,
    });
    localStorage.setItem("usersPosts", JSON.stringify(userBlog_records));
    return true;
  } else {
    console.log("Data not Added");
    return false;
  }
};
