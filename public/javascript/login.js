async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#un-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#pass-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('Success');
            alert("Signup successful! You may now log in with your username and password.")
        } else {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#un-login').value.trim();
    const password = document.querySelector('#pass-login').value.trim();
  
    if (username && password) {
        const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
            username,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert(response.statusText);
        }
    }
}
  
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);  
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);