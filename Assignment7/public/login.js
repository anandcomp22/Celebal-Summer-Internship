window.onload = function () {
  document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault();

    const email = e.target.loginEmail.value;
    const password = e.target.loginPassword.value;

    try {
      const res = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        return document.getElementById('message').innerHTML =
          `<p class="error">${data.error}</p>`;
      }

      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      document.getElementById('message').innerHTML =
        `<p class="error">Something went wrong</p>`;
    }
  });
};
