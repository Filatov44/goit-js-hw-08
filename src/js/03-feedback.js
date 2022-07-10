const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const input = document.querySelector('[name ="email"]');
const textarea = document.querySelector('[name="message"]');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

form.addEventListener('input', throttle(onTextInput, 500));
form.addEventListener('submit', onFormSubmit);

startLoading();

function onTextInput(e) {
  formData[e.target.name] = e.target.value;
  console.log(formData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  form.reset();
  console.log(localStorage.getItem(STORAGE_KEY));
  localStorage.removeItem(STORAGE_KEY);
}

function startLoading() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    input.value = savedMessage.email;
    textarea.value = savedMessage.message;
  } else {
    input.value = '';
    textarea.value = '';
  }
}
