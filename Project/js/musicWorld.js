const app = {
    songs: [
        {
            name: 'Jazzy Frenchy',
            composter: 'Benjamin Tissot',
            path: './Assets/Music/bensound-jazzyfrenchy.mp3',
            image: './Assets/img/jazzyfrenchy.jpg'
        }
    ],
    render: function (){
        const html = this.songs.map(song=>{
            return `
                <div class = "song">
                    <div class ="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 >${song.name}</h3>
                        <p>${song.composter}</p>
                    </div>
                    <div class="option">
                        <i class="fas-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
    },
    start: function (){
        this.render()
    }
}
app.start()



