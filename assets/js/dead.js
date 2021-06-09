let cardDead = document.getElementById("cardDead");
page = 2;

const renderCardsDead = ({image, name, status, species, url}) =>{
    let estado = getStatuses(status);
    status === 'unknown' ?  status = 'Missing': status;
    //console.log(sectionCards);
    cardDead.innerHTML += `<div class="card text-white bg-dark mb-3 width">
    <img src="${image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h6 class="card-title"><div class=${estado}></div>${name}</h6>
        <p class="card-text">Status: ${status}</p>
        <p class="card-text">Species: ${species}</p>
        <p hidden class="card-text">${url}</p>
        <div class="btn__Style"><button class="btn btn-success btn__cards">More info</button></div>
    </div>
    </div>`
}

const getCharacterListDead = ({results}) =>{
    results.forEach(renderCardsDead);
}

const scrollDead = () =>{
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    let windowsHeight = scrollHeight - clientHeight;
    let porcentaje = scrollTop / windowsHeight * 100;
    
    if(porcentaje >= 85 && page <= 13){
        requestsToApi(`https://rickandmortyapi.com/api/character/?status=dead&&page=${page}`, getCharacterListDead);
        page++;
    }
    
}

requestsToApi('https://rickandmortyapi.com/api/character/?status=dead',getCharacterListDead);

window.addEventListener('scroll',scrollDead);
