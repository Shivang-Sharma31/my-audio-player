console.log("lets write js");
let currentSong =new Audio;
let songs;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs(folder){
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href);
        }
    }
    return songs;
}

const playMusic = (track,pause=false)=>{
    currentSong.src="/songs/"+track
    if(!pause){
        currentSong.play();
        play.src="pause.svg";
    }
    
    document.querySelector(".songinfo").innerHTML= decodeURI(track);
    document.querySelector(".songtime").innerHTML="00:00 / 00:00"
}
async function main(){
    
    // got songs list
    songs = await getSongs();
    playMusic(decodeURIComponent(songs[0]).split(/[/\\]/).pop(),true);      
    // console.log(songs);
    // show all songs in playlist 
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML+ `<li> <img class="invert" src="music.svg" alt="">
                    <div class="info">
                        <div>${song.replaceAll("http://127.0.0.1:3000/%5Csongs%5C"," ")}</div>
                        <div>shivang</div>
                    </div>
                    <div class="playnow">
                        <span>Play Now</span>
                        <img class="invert" src="play.svg" alt="">
                    </div> </li>`;
    }
    // attach a eventlistener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    })
    // attack event listener to play , next and previous
    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play();
            play.src="pause.svg";
        }
        else {
            currentSong.pause();
            play.src="play.svg";
        }
    })

    currentSong.addEventListener("timeupdate",()=>{
        console.log(currentSong.currentTime,currentSong.duration);
        document.querySelector(".songtime").innerHTML= `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%";
    })
    //add event to seekbar
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left=percent+"%";
        currentSong.currentTime = (currentSong. duration*percent)/100;
    })
    //add event to hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0";
    })
    //add event to close button
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-120%";
    })

    

    // add eventlistener to prev and next
    previous.addEventListener("click", () => {
        currentSong.pause();
    
        let currentFile =
            decodeURIComponent(currentSong.src).split(/[/\\]/).pop();
    
        let index = songs.findIndex(song =>
            decodeURIComponent(song).split(/[/\\]/).pop() === currentFile
        );
    
        if (index > 0) {
            playMusic(
                decodeURIComponent(songs[index - 1]).split(/[/\\]/).pop()
            );
        }
    });
    
    
    next.addEventListener("click", () => {
        currentSong.pause();
    
        let currentFile =
            decodeURIComponent(currentSong.src).split(/[/\\]/).pop();
    
        let index = songs.findIndex(song =>
            decodeURIComponent(song).split(/[/\\]/).pop() === currentFile
        );
    
        if (index + 1 < songs.length) {
            playMusic(
                decodeURIComponent(songs[index + 1]).split(/[/\\]/).pop()
            );
        }
    });
    
    // add event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        currentSong.volume=parseInt(e.target.value)/100;
    })
    let cardContainer = document.querySelector(".cardContainer");

const cardImage =
  "https://i.scdn.co/image/ab67616d00001e02c53e5adf9f81693d62f98019";

for (const song of songs) {
    let songName = decodeURIComponent(song).split(/[/\\]/).pop();

    let card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="play">
            <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24">
                <circle cx="12" cy="12" r="11" fill="#1fdf64" />
                <path
                    d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 
                    13.5257 17.0361C10.296 18.8709 8.6812 19.7884 
                    7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 
                    5.95624 18.5787C5 17.6139 5 15.7426 
                    5 12C5 8.2574 5 6.3861 
                    5.95624 5.42132C6.35159 5.02245 
                    6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 
                    10.296 5.12907 13.5257 6.96393C16.8667 8.86197 
                    18.5371 9.811 18.8906 11.154C19.0365 11.7084 
                    19.0365 12.2916 18.8906 12.846Z"
                    fill="white"
                />
            </svg>
        </div>

        <img src="${cardImage}" alt="">
        <h2>${songName.replace(".mp3", "")}</h2>
        <p>Click to play this song</p>
    `;

    card.querySelector(".play").addEventListener("click", (e) => {
        e.stopPropagation();
        playMusic(songName);
    });

    cardContainer.appendChild(card);
}

}
main();
