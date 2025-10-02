  const form = document.getElementById('registerForm');
  const message = document.getElementById('message');
  
  // Event när användaren klickar på "Register"
    form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from submitting in the traditional way
  
  //variabler för namn, roll, epost och lösenord
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      // POST request för att skapa ny användare
      
        const response = await fetch('https://wo-m-project-1-login-api-webbtjanster-och-molnteknologi.2.rahtiapp.fi/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ name, role, email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        //meddelanden för användaren
        message.textContent = data.message;
        message.style.color = 'green';
        console.log("Ny användare skapad!");
      
        //visa JWT token för devvande
        //console.log('JWT Token:', data.token);
      } else {
        throw new Error(data.error || 'Något gick fel');
      }
    } catch (error) {
      message.textContent = error.message;
      message.style.color = 'red';
    }
  });

  //redirect till login
  function backToLogin(){
    window.location.href = "../login.html";
  }
  