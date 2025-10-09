  function logOut(){
    localStorage.removeItem('jwtToken');
    window.location.href = "../login.html";
  }