const form = document.querySelector('form');
const newEmailInput = document.getElementById('new-email');
const confirmEmailInput = document.getElementById('confirm-email');
const errorMessage = 'Email addresses do not match';

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (newEmailInput.value !== confirmEmailInput.value) {
    confirmEmailInput.setCustomValidity(errorMessage);
  } else {
    confirmEmailInput.setCustomValidity('');
    form.submit();
  }
});

newEmailInput.addEventListener('input', () => {
  confirmEmailInput.setCustomValidity('');
});
