        WS_TOKEN = localStorage.getItem('ws_token') || 'my-secret-token';
        console.log(WS_TOKEN);

        // Create a WebSocket connection
        //
        const socket = new WebSocket(`ws://localhost:5000?token=${WS_TOKEN}`); 
        // Connection established 
        socket.onopen = function (event) {
            console.log('Connected to WebSocket server');
        };

        // Message listener
        socket.onmessage = function (event) {
            console.log('Received message:', event.data);
            const data = JSON.parse(event.data);

            if (data.status == 0) {
                document.querySelector('#out').innerHTML = data.msg;
                document.querySelector('#err').innerHTML = '';
            } else {
                document.querySelector('#err').innerHTML = data.msg;
            }
            
        };

        // Connection closed 
        socket.onclose = function (event) {
            console.log('Connection closed');
        };

        document.querySelector('#in').addEventListener('input', (evt) => {
            socket.send(evt.target.value);
        });