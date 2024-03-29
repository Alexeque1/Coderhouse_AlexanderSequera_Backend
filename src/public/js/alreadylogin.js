//ALREADY LOG IN
 let userLogged = '';

fetch("/api/sessions/getUserName", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
    .then(response => response.json())
    .then(data => {
        userLogged = data.username;
        
        let welcomeDivMain = document.getElementById("welcomeDivMain");
        welcomeDivMain.innerHTML = `<p> Bienvenido, ${userLogged} </p>`;

    })
    .catch(error => {
        // Registra un mensaje de log de nivel 'error'
        console.log("Error al enviar los datos:", error);
    });

let logOutIcon = document.getElementById("logOutIcon");

logOutIcon.onclick = () => {
    fetch("/api/sessions/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.state == 'error') {             
                Swal.fire({
                    icon: "error",
                    title: data.message,
                    text: "Ha ocurrido un error mientras te deslogueabas",
                    timer: 3000
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: data.message,
                    timer: 2000
                });

                setTimeout(function () {
                    window.location.href = 'http://localhost:8080/realtimeproducts';
                }, 1500);
            }
        })
        .catch(error => {
            console.log("Error al enviar los datos:", error);
        });
};