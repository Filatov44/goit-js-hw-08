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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  if (!formData[input.name] || !formData[textarea.name]) {
    window.alert('Для отправки формы заполните все поля!');
    // console.log('Все поля не были заполнены!');
  } else {
    form.reset();
    console.log(localStorage.getItem(STORAGE_KEY));
    localStorage.removeItem(STORAGE_KEY);
  }
}

function startLoading() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const savedMessage = JSON.parse(savedData);

  if (savedData) {
    if (savedMessage.email) {
      input.value = savedMessage.email;
      formData[input.name] = savedMessage.email;
    }

    if (savedMessage.message) {
      textarea.value = savedMessage.message;
      formData[textarea.name] = savedMessage.message;
    }
  }
}
