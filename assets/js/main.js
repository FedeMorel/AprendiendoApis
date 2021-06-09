let sectionCards = document.getElementById("cards");
let page = 2;

const getStatuses = (status) =>{
    if(status === 'Dead'){
        return 'circulo__rojo';
    }
    else if(status === 'unknown'){
        return 'circulo__naranja';
    }
    else{
        return 'circulo__verde';
    }
}

const renderCards = ({image, name, status, species, url}) =>{
    let estado = getStatuses(status);
    status === 'unknown' ?  status = 'Missing': status;
    //console.log(sectionCards);
    sectionCards.innerHTML += `<div class="card text-white bg-dark mb-3 width">
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

const requestsToApi = (url, callback)=>{
    let xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let objeto = JSON.parse(this.responseText);
            callback(objeto);
            
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

const getCharacterList = ({results}) =>{
    results.forEach(renderCards);
}

const scroll = () =>{
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    let windowsHeight = scrollHeight - clientHeight;
    let porcentaje = scrollTop / windowsHeight * 100;
    
        if(porcentaje >= 85 && page<=34){
            requestsToApi(`https://rickandmortyapi.com/api/character/?page=${page}`, getCharacterList);
            page++;
        }
}

requestsToApi('https://rickandmortyapi.com/api/character', getCharacterList);



    window.addEventListener('scroll',scroll);



