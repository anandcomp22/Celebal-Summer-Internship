window.onload = function () {
  document.getElementById('registerForm').addEventListener('submit', async e => {
    e.preventDefault();

    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      age: Number(form.age.value),
      status: form.status.value
    };

    try {
      const res = await fetch('/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      const msg = document.getElementById('message');

      if (!res.ok) {
        return msg.innerHTML = `<p class="error">${data.error}</p>`;
      }

      localStorage.setItem('token', data.token);
      msg.innerHTML = `<p class="success">Registered successfully! Redirecting...</p>`;
      setTimeout(() => window.location.href = '/dashboard', 1000);
    } catch (err) {
      console.error(err);
      document.getElementById('message').innerHTML = `<p class="error">Something went wrong</p>`;
    }
  });
};
