async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    // ingen refreshtoken, tillbaka til login
    window.location.href = '/login.html';
    return null;
  }

  try {
    // Use your exact backend endpoint structure
    const refreshResponse = await fetch('http://127.0.0.1:3001/users/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken: refreshToken })
    });

    if (refreshResponse.ok) {
      console.log("refreshtoken OK")
      const data = await refreshResponse.json();
      
      // Store the new access token (backend returns it as 'jwt')
      localStorage.setItem('accessToken', data.jwt);
      localStorage.setItem('tokenIssuedAt', Date.now().toString());

      
      console.log('Token refreshed successfully');
      console.log("Accesstoken = " + data.jwt)
      return data.jwt;
    } 

  } catch (error) {
    console.error('Token refresh failed:', error);
    localStorage.removeItem('accessToken');

    window.location.href = '/login.html';
    return null;
  }
}

function isAccessTokenExpired() {
  const tokenIssuedAt = localStorage.getItem('tokenIssuedAt');
  if (!tokenIssuedAt) return true;
  
  const fifteenMinutes = 15 * 60 * 1000; // 15 minutes in milliseconds
  return (Date.now() - parseInt(tokenIssuedAt)) > fifteenMinutes;
}


