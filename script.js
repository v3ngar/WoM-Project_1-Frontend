
function login(){

  document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    try {
      // Skicka POST request till serverns users-endpoint
      //const response = await fetch('https://wo-m-project-1-login-api-webbtjanster-och-molnteknologi.2.rahtiapp.fi/users/login',
      //const response = await fetch('http://localhost:8080/users/login', {
      const response = await fetch('http://localhost:3001/users/login', {

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
       
        
        //spara JWT token i webbläsarens Storage (using tokenUtils.js naming convention)
        localStorage.setItem('accessToken', data.jwt);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('tokenIssuedAt', Date.now().toString());
        

        // redirect till huvudsidan
        refreshAccessToken()
        //window.location.href = "/mainpage/index.html", "blank";     Redirect till Notes sidan
        window.location.href = "/Pastebin/index.html";
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
