
  //Hämtar JWT token från webbläsarens storage
  const jwttoken = localStorage.getItem('jwtToken');
  
  //Visa textare för ny anteckning
  function newNote() {
    document.getElementById('noteForm').style.display = 'block';
  };

  //Hämtar anteckningar från backend, körs när sidan laddas
  async function fetchNotes() {
    
    //initsierar api varablen fån server
    const api = "https://wo-m-project-1-notes-api-webbtjanster-och-molnteknologi.2.rahtiapp.fi/notes";
  
    //kollar efter JWT token  
    if (jwttoken) {
      //console.log('jwtToken retrieved:', jwttoken);
          } else {
            console.log('No token found. User might need to log in.');
            prompt("No token found. Please log in.");
            window.location.href = "../login.html";
              }
              
    try {
      //GET request för att hämta anteckningar
        const response = await fetch(api, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',  
              //'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKYWNrZSIsIm5hbWUiOiJKYWNrZSIsImlhdCI6MTUxNjIzOTAyMn0.hJYMheEFpgsVdmfZBWlMoSJlYf1H8RGxzX23-B9YsWk`    
              'Authorization': `Bearer ${jwttoken}` // Bearer token för autentisering
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        //hanterar notes data från server api'n
        const fetchedNotes = await response.json();
        const myNote = fetchedNotes.notes; 
        const date = new Date();

        //skapar loopvarabel för att ge anteckningarna sitt egna lokala id
        const numberOfArrays = Object.keys(myNote).length;
      
        //array av möjliga färger som anteckningarna kan få
        const colors = ["#6699ff", "#ffccff","#ffcc66","#99cc00","#669999","#cc6699","#999966",]
        
        for (let i = 0; i < numberOfArrays; i++) {
        //ger anteckningen en backgroundColor
          const bgclr = Math.floor(Math.random() * colors.length);
          const postDiv = document.createElement('div'); 
          
          postDiv.setAttribute("id", `postDiv_${myNote[i].id}`);
          
          //aktiverar drag & drop mha JqueryUI's 'draggable' class
          postDiv.setAttribute("class", "draggable-note");
         
         //Skriver ut anteckningarna i noteContainer
          postDiv.innerHTML = `
         <div id="noteContainer">
         <div id="postitnote"  style="background-color:${colors[bgclr]}; " >
        <!-- <button id="deleteButton" onclick="deleteNote()"><b>X</b></button>-->
         <button id="deleteButton" onclick="deleteNote('${myNote[i].id}')"><b>X</b></button>
        <h3>Skribent: ${myNote[i].authorId}</h3>
        <p><strong>Note: </strong> ${myNote[i].note}</p>
        <p><strong>Skapad:</strong> ${myNote[i].createdAt}</p>
        <!--<p>id: ${myNote[i].id}</p>-->
        </div>
        </div>
        
    `;
    
      //Lägger till anteckningen i container div:en en efter en
      container.appendChild(postDiv);       

      //jquery UI draggable aktivering för varje enskild anteckning
  $(`#postDiv_${myNote[i].id}`).draggable(); 
  
  }

    } catch (error) {
        console.error('Error fetching notes:', error);
    }
}
// Funktion som POSTar en ny anteckning till servern
  async function Notepost(notetext){
    
    // Hämta texten från HTML-textarean
    const noteContent = document.getElementById('noteContent').value;
 
    
    //dev console.log("notetext = " + notetext);

      //.trim() tar bort onödiga mellanrum i början och slutet av texten
    if (noteContent.trim()) { 
      try {
        // POST request för att skicka ny anteckning
        const response = await fetch('https://wo-m-project-1-notes-api-webbtjanster-och-molnteknologi.2.rahtiapp.fi/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //dev 'Authorization': `Bearer eyJhbGciO***********************XVCJ9.eyJz*******************************************TAyMn0.hJYMheEFpgsVdmfZBWlMoSJlYf1H8RGxzX23-B9YsWk` // Add JWT token if required
            'Authorization': `Bearer ${jwttoken}`
            
                   },
          body: JSON.stringify({ note: noteContent })
        });
        
        // granksar att response är ok
        if (response.ok) {
          console.log('New note added succesfully');
          document.getElementById('noteContent').value = ''; // Clear input field
          document.getElementById('noteForm').style.display = 'none'; 
          showTemporaryBlock();
          
        } else {
          console.error('Failed to post note:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert("Empty note HALOOO.");
    }
  };

 // Vi har haft problem med messages. Här visas #goodNode i 2 sek
function showTemporaryBlock() {
    const element = document.getElementById('goodNote');
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.display = 'none';
        
    }, 2000); 
    
}


//Radera en anteckning
async function deleteNote(noteId) {

 
    try {
        // DELETE Request för $noteId
        const response = await fetch('https://wo-m-project-1-notes-api-webbtjanster-och-molnteknologi.2.rahtiapp.fi/notes/${noteId}', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwttoken}`
            }
        });
        
        // Granska att saker gick rätt till
        if (response.ok) {
            console.log('Note deleted successfully');
            
            document.getElementById('container').innerHTML = '';
          
            //Hämtar notes igen
            fetchNotes();
        } else {
            console.error('Failed to delete note:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Logga ut användaren, raderar jwt token från webbläsarens storage
  function logOut(){
    localStorage.removeItem('jwtToken');
    window.location.href = "../login.html";
  }

 