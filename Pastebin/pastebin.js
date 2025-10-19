  function logOut(){
    localStorage.removeItem('jwtToken');
    window.location.href = "../login.html";
  }

  function reconnect(){
    console.log("Reconnecting...");
    refreshAccessToken();
    //window.location.reload();
  }