const listaUsers = document.querySelector('#usuarios');
const userInfoDiv = document.getElementById('usuarios');
const buscarBtn = document.getElementById('buscar');
const userInput = document.getElementById('buscarUsuario')

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar los usuarios');
        }
        return response.json();
    })
    .then(data => mostrarDatosUsuarios(data))
    .catch(error => mostrarError(error.message));

function mostrarDatosUsuarios (data){
    listaUsers.innerHTML = '';

    data.forEach(user => {
        const userId = user.id;
        const userName = user.name;
        const userUsername = user.username;
        const userEmail = user.email;
        const userStreet = user.address.street;
        const userSuite = user.address.suite;
        const userCity = user.city;
        const userZipcode = user.zipcode;
        const userLat = user.address.geo.lat;
        const userLng = user.address.geo.lng;
        const userPhone = user.phone;
        const userWebsite = user.website;
        const userCompanyName = user.company.name;
        const userCompanyCatchPhrase = user.company.catchPhrase;
        const userCompanyBs = user.company.bs;

        const div = document.createElement("div");
        div.classList.add("usuario");
        div.innerHTML = `
        <div class = user-card>
        <p class = "user-id">#${userId}</p>
        <div class="user-name"><strong>Nombre:</strong> ${userName}</div>
        <div class="user-username"><strong>Username:</strong> ${userUsername} </div>
        <div class="user-email"><strong>Email:</strong> ${userEmail} </div>
        <div class="user-adress"><details>
            <summary> Direccion </summary>
            <ul>
                <li><div class="user-street"><strong>Calle:</strong> ${userStreet} </div>
                <li><div class="user-suite"><strong> Suite:</strong> ${userSuite}</div>
                <li><div class="user-city"><strong>Ciudad:</strong> ${userCity} </div>
                <li><div class="user-zipcode"><strong>Zipcode:</strong> ${userZipcode}
                <li><div class="user-geo"><details><summary><strong> Geo </summary>
                    <ul>
                        <li><div class="user-lat"><strong>Latitud:</strong> ${userLat} </div>
                        <li><div class="user-lng"><strong>Longitud:</strong> ${userLng}</div></details></ul>
                    </div></details>
            </ul>
        <div class="user-phone"><strong>Telefono:</strong> ${userPhone}</div>
        <div class="user-website"><strong>Sitio web:</strong> ${userWebsite} </div>
        <div class="user-company"><details><summary><strong>Empresa </summary>
            <ul>
                <li><div class="user-company-name"><strong>Nombre de la empresa:</strong> ${userCompanyName} </div>
                <li><div class="user-company-catchPhrase"><strong>Frase Catch:</strong> ${userCompanyCatchPhrase} </div>
                <li><div class="user-company-bs"><strong>Bs:</strong> ${userCompanyBs} </div>
            </ul>
            </details>
        </div>
        </div>
        `;
    listaUsers.appendChild(div);
    })
}

function mostrarError(mensaje) {
    userInfoDiv.innerHTML = `<p style="color: red;">${mensaje}</p>`;
}

buscarBtn.addEventListener('click',()=>{
    const userName = userInput.value.trim().toLowerCase();

    listaUsers.innerHTML = "";

    if (userName){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se encontro ningun usuario');
                }
                return response.json();
            })
            .then(data => {
                const usuarioEncontrado = data.find(user => user.name.toLowerCase() === userName);
                if (usuarioEncontrado) {
                    mostrarDatosUsuarios([usuarioEncontrado]); 
                } else {
                    mostrarError(`No se encontró ningún usuario con el nombre "${userName}"`);
                }
            })
            .catch(error => mostrarError(error.message));
    } else {
        mostrarError('Por favor, escribe un nombre de usuario');
    }
});