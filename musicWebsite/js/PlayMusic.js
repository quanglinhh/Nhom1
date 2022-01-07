
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

const app ={
    currentIndex:0,
    isPlaying: false,
    isRandom:false,
    isRepeat:false,
    songs:[
            {
                name: "All that",
                singer: "unknow",
                path: "Assets/Music/bensound-allthat.mp3",
                image: "Assets/img/allthat.jpg"
            },
            {
                name: "Jazz Comedy",
                singer: "unknow",
                path: "Assets/Music/bensound-jazzcomedy.mp3",
                image: "Assets/img/jazzcomedy.jpg"
            },
            {
                name: "Jazzy Frenchy",
                singer: "unknow",
                path: "Assets/Music/bensound-jazzyfrenchy.mp3",
                image: "Assets/img/jazzyfrenchy.jpg"
            },
            {
                name: "love",
                singer: "unknow",
                path: "Assets/Music/bensound-love.mp3",
                image: "Assets/img/love.jpg"
            },
            {
                name: "The Jazz piano",
                singer: "unknow",
                path: "Assets/Music/bensound-thejazzpiano.mp3",
                image: "Assets/img/thejazzpiano.jpg"
            },
        ],
    render: function (){
        const htmls = this.songs.map((song , index) =>{
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
        })
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
        //Xử lí khi play
        playBtn.onclick = function (){
            if(_this.isPlaying){
               audio.pause()
            }else{
                audio.play()
            }
        }
        //Khi play bài hát
        audio.onplay = function (){
            _this.isPlaying =true
            player.classList.add('playing')
        }
        //Khi dừng bai hat
        audio.onpause = function (){
            _this.isPlaying=false
            player.classList.remove('playing')
        }
        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function (){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime/audio.duration*100)
                progress.value = progressPercent;
            }
        }
        //Xử lí tua bài hát
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
        //Khi bấm prev
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
        //Khi bấm bật bài random
        randomBtn.onclick= function (){
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active',_this.isRandom)

        }
        //Xử kí next song khi audio ended
        audio.onended = function (){
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.click()
            }
        }
        //Xử lí lặp lai 1 bài hát
        repeatBtn.onclick= function (){
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active',_this.isRepeat)
        }
        //Lắng nghe hành vi click vào playlist
        playList.onclick = function (e){
            //Xử lí khi click vào song
            const songNode = e.target.closest('.song:not(.active)')


            if(songNode|| e.target.closest('.option'))
            {
                //Xử lí khi click vào song
                if(songNode && !e.target.closest('.option')){
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()

                }

                //Xủ lí khi click vào song option
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
        //Định nghĩa các thuộc tính cho Object
        this.defineProperties()

        //Lắng nghe / xử lí cá sự kiện (DOM events)
        this.handleEvent()

        //Tải thông tin bài hát đầu tiên vào giao diện
        this.loadCurrentSong()

        //Render playlist
        this.render()
    }
}
app.start()