
function login(){

  document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    try {
      // Skicka POST request till serverns users-endpoint
      const response = await fetch('https://wo-m-project-1-login-api-webbtjanster-och-molnteknologi.2.rahtiapp.fi/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ email, password })
      });

      // granskar att användaren är legitim
      if (response.status === 401) {
        wrongcredentials();
      } 

      //granskar att response är ok
      if (response.ok) {
        const data = await response.json();
    
        //användbar JWT kod till projekt 2:
        //console.log('Login successful:', data);
        //console.log("data.jwt = " + data.jwt)
        
        //spara JWT token i webbläsarens Storage
        localStorage.setItem('jwtToken', data.jwt);

        // redirect till huvudsidan
        window.location.href = "/mainpage/index.html", "blank";
      } else {
        console.error('Login failed:', response.statusText);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }

  });
}

// Redirect till att skapa en ny användare
function signupRedirect(){
  window.location.href = "/signup/index.html";
}

// Felmeddelande vid felaktiga inloggningsuppgifter
function wrongcredentials() {
  alert("Unauthorized: Incorrect email or password.");
}
