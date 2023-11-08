const loginFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (name && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dash');
    } else {
      console.error(`Request failed with status: ${response.status} - ${response.statusText}`);
      alert('Login failed. Please check your credentials and try again.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);