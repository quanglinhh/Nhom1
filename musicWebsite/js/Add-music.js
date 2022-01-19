const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var musicAPI = "https://music-world-g1.herokuapp.com/songs"

const listMusic = $('.music-list')


function start(){
    getMusic(renderMusic);
}
start();

function getMusic(callback){
    fetch(musicAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}

function renderMusic(musics){
        var htmls = musics.map(function(music){
            return `
            <li>
                <h4>${music.name}</h4>
                <p>${music.singer}</p>
            </li>
            `
        })
        listMusic.innerHTML = htmls.join(' ')
}