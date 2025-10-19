       
       //WS_TOKEN = localStorage.getItem('ws_token') || 'my-secret-token';
WS_TOKEN = localStorage.getItem('accessToken')
        //WS_TOKEN = localStorage.getItem('jwtToken') || localStorage.getItem('authToken');
console.log(WS_TOKEN);
    if (!WS_TOKEN) {
    console.error('No JWT token found - user needs to login');
    document.querySelector('#err').innerHTML = 'Please login first';
}
        // Create a WebSocket connection
        //
const socket = new WebSocket(`ws://localhost:5000?token=${WS_TOKEN}`); 
        // Connection established 
socket.onopen = function (event) {
    console.log('Connected to WebSocket server');
};

        // Message listener
socket.onmessage = function (event) {
    //console.log('Received message:', event.data);
    const data = JSON.parse(event.data);

            switch (data.status) {
                case 0:
                    document.querySelector('#out').innerHTML = data.msg;
                    document.querySelector('#err').innerHTML = '';
                    document.querySelector('#wsUser').innerHTML = "Användare: " +data.user;
                    const reconnectBtn = document.querySelector('#reconnect-btn');
                    if (reconnectBtn) {
                        reconnectBtn.style.display = 'none';
                    }
                    break;
                case 1:
                    document.querySelector('#err').innerHTML = data.msg;
                    document.querySelector('#err').style.display = 'block';
                    showReconnectButton();
                    break;
                case 2:
                    document.querySelector('#good').innerHTML = data.msg;
                    document.querySelector('#good').style.display = 'block';
                    break;  
            }
        // Connection closed 
        socket.onclose = function (event) {
            console.log('Connection closed');
        };

        document.querySelector('#in').addEventListener('input', (evt) => {
            socket.send(evt.target.value);
        });

        document.querySelector('#reconnect-btn').addEventListener('click', async (evt) => {
            await refreshAccessToken();
        });

    async function showReconnectButton() {
    const reconnectBtn = document.querySelector('#reconnect-btn');
    if (reconnectBtn) {
        reconnectBtn.style.display = 'inline-block';
        reconnectBtn.onclick = function() {
            refreshAccessToken();
        };
    }
}}