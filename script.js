console.log("Welcome to Spotify!!!");

let audioElement = new Audio('songs/1.mp3');
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');  // play button
let myProgressBar = document.getElementById('myProgressBar');  // progress bar
myProgressBar.value=0;
let playingGif = document.getElementById('playingGif');  //    gif

let playPrevious = document.getElementById('playPrevious');
let playNext = document.getElementById('playNext');
let songItems = Array.from( document.getElementsByClassName('songItem'));
let songInfo = document.getElementsByClassName('songInfo');
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    {name: '1', path: 'songs/1.mp3', artist: 'Artist 1', coverpath: 'covers/1.jpg'},
    {name: '2', path: 'songs/2.mp3', artist: 'Artist 2', coverpath: 'covers/2.jpg'},
    {name: '3', path: 'songs/3.mp3', artist: 'Artist 3', coverpath: 'covers/3.jpg'},
    {name: '4', path: 'songs/4.mp3', artist: 'Artist 4', coverpath: 'covers/4.jpg'},
    {name: '5', path: 'songs/5.mp3', artist: 'Artist 5', coverpath: 'covers/5.jpg'},
    {name: '6', path: 'songs/6.mp3', artist: 'Artist 6', coverpath: 'covers/6.jpg'},
    {name: '7', path: 'songs/7.mp3', artist: 'Artist 7', coverpath: 'covers/7.jpg'},
    {name: '8', path: 'songs/8.mp3', artist: 'Artist 8', coverpath: 'covers/8.jpg'},
    {name: '9', path: 'songs/9.mp3', artist: 'Artist 9', coverpath: 'covers/9.jpg'},
    {name: '10', path: 'songs/10.mp3', artist: 'Artist 10', coverpath: 'covers/10.jpg'}
]


songItems.forEach((element, i)=> {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].name;
    // element.getElementsByClassName("songArtist")[0].innerText = songs[i].artist;
    // element.getElementsByClassName("timestamp")[0].innerText = calculateDuration(songs[i].path);
});

const makeAllPlays = ()=> {
    songItemPlay.forEach((element, i)=> {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    }
    )
}

songItemPlay.forEach((element, i)=> {
    element.addEventListener('click', (e)=> {
        // console.log(e.target);

        makeAllPlays();

        songItemPlayelement = e.target;
        songItemPlayelement.classList.remove('fa-play-circle');
        songItemPlayelement.classList.add('fa-pause-circle');

        songIndex = parseInt(e.target.id)-1;
        audioElement.src = `${songs[songIndex].path}`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        playingGif.style.opacity = 1;
        songInfo[0].innerText = songs[songIndex].name + " by " + songs[songIndex].artist;
    }
    )
}
)

masterPlay.addEventListener('click', ()=>{

   

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        playingGif.style.opacity = 1;
        songInfo[0].innerText = songs[songIndex].name + " by " + songs[songIndex].artist;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        playingGif.style.opacity = 0;

    }
}
)

playPrevious.addEventListener('click', ()=>{    

    
    if(songIndex <= 0){
        songIndex = songs.length - 1;
    } else {
        songIndex = songIndex - 1;
    }
    audioElement.src = `${songs[songIndex].path}`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    playingGif.style.opacity = 1;
    songInfo[0].innerText = songs[songIndex].name + " by " + songs[songIndex].artist;
}
)

playNext.addEventListener('click', ()=>{    
    if(songIndex >= songs.length - 1){
        songIndex = 0;
    } else {
        songIndex = songIndex + 1;
    }
    audioElement.src = `${songs[songIndex].path}`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    playingGif.style.opacity = 1;
    songInfo[0].innerText = songs[songIndex].name + " by " + songs[songIndex].artist;
}
)

audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate', audioElement.currentTime, audioElement.duration);
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})  // timeupdate event             

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
    audioElement.play();
})  // change event of progress bar         

audioElement.addEventListener('ended', ()=>{    
    songIndex = songIndex + 1;
    if(songIndex >= songs.length){
        songIndex = 0;
    }
    audioElement.src = `${songs[songIndex].path}`;
    audioElement.currentTime = 0;
    audioElement.play();
}
)  // ended event of audio element 