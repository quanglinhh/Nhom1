
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.cover')
const songName = $('h1')
const singerName = $('h2')
const audio = $('#audio')
const coverImage = $('#coverImage')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')
//Addmusic
var songsApi = "https://music-world-g1.herokuapp.com/songs";

//Function
function starts(){
    getSongs(renderSongs)
};
starts();
function getSongs(callback){
    fetch(songsApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)   
    }
 
function renderSongs(songss){
    var songs =[]
    for( var i =0; i < songss.length; i++){
        songs.push(songss[i]) 
    }      

const app ={
    currentIndex:0,
    isPlaying: false,
    isRandom:false,
    isRepeat:false,
    songs,
   
    render: function (){
        const htmls = this.songs.map((song , index) =>{
            if(song.Genres === "jazz"){
            return`
            <div class="song ${index === this.currentIndex? 'active':''}" data-index ="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        }})
        playList.innerHTML = htmls.join('')
    },
    defineProperties: function (){
        Object.defineProperty(this,'currentSong', {
            get: function (){
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function () {
        songName.textContent = this.currentSong.name
        singerName.textContent = this.currentSong.singer
        coverImage.src = this.currentSong.image
        audio.src = this.currentSong.path
    },
    handleEvent: function (){
        const _this = this
        //X??? l?? khi play
        playBtn.onclick = function (){
            if(_this.isPlaying){
               audio.pause()
            }else{
                audio.play()
            }
        }
        //Khi play b??i h??t
        audio.onplay = function (){
            _this.isPlaying =true
            player.classList.add('playing')
        }
        //Khi d???ng bai hat
        audio.onpause = function (){
            _this.isPlaying=false
            player.classList.remove('playing')
        }
        //Khi ti???n ????? b??i h??t thay ?????i
        audio.ontimeupdate = function (){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime/audio.duration*100)
                progress.value = progressPercent;
            }
        }
        //X??? l?? tua b??i h??t
        progress.onchange = function (e){
            const seekTime = audio.duration/100*e.target.value
            audio.currentTime =seekTime
        }

        //Khi next
        nextBtn.onclick = function (){
            if(_this.isRandom){
                _this.playRandomSong()
            }else {
                _this.nextSong()
            }
            audio.play()
            _this.render();
            _this.scrollToActiveSong()
        }
        //Khi b???m prev
        prevBtn.onclick = function (){
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.prevSong()
            }
            audio.play()
            _this.render();
            _this.scrollToActiveSong()
        }
        //Khi b???m b???t b??i random
        randomBtn.onclick= function (){
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active',_this.isRandom)

        }
        //X??? k?? next song khi audio ended
        audio.onended = function (){
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.click()
            }
        }
        //X??? l?? l???p lai 1 b??i h??t
        repeatBtn.onclick= function (){
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active',_this.isRepeat)
        }
        //L???ng nghe h??nh vi click v??o playlist
        playList.onclick = function (e){
            //X??? l?? khi click v??o song
            const songNode = e.target.closest('.song:not(.active)')


            if(songNode|| e.target.closest('.option'))
            {
                //X??? l?? khi click v??o song
                if(songNode && !e.target.closest('.option')){
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()

                }

                //X??? l?? khi click v??o song option
                if(e.target.closest('.option')){
                        
                }
            }
        }
    },
    scrollToActiveSong: function (){
        setTimeout(()=>{
            //https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block:'end'
            })
        },300)
    },
    nextSong:function (){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong:function (){
        this.currentIndex--
        if(this.currentIndex<0){
            this.currentIndex = this.songs.length-1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function (){
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while (newIndex === this.currentIndex)
       this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function (){
        console.log(this.songs);
        //?????nh ngh??a c??c thu???c t??nh cho Object
        this.defineProperties()

        //L???ng nghe / x??? l?? c?? s??? ki???n (DOM events)
        this.handleEvent()

        //T???i th??ng tin b??i h??t ?????u ti??n v??o giao di???n
        this.loadCurrentSong()

        //Render playlist
        this.render()
    }
}
app.start() 
}

