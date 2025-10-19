async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    // No refresh token, redirect to login
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
      return data.jwt;
    } else {
      // Refresh failed, clear tokens and redirect to login
      console.log('Refresh token expired or invalid');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokenIssuedAt');
      window.location.href = '/login.html';
      return null;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenIssuedAt');
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

// Get a valid access token (refresh if needed)
async function getValidAccessToken() {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    window.location.href = '/login.html';
    return null;
  }
  
  if (isAccessTokenExpired()) {
    console.log('Access token expired, refreshing...');
    return await refreshAccessToken();
  }
  
  return accessToken;
}