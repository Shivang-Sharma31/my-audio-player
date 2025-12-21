console.log("lets write js");

let currentSong = new Audio();
let songs = [
    "Chak De India.mp3",
    "Apt.mp3",
    "DTMF.mp3",
    "fairytale.mp3",
    "ring.mp3",
    "wakawaka.mp3",
    "Wavin flag.mp3"
];

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );
}

const playMusic = (track, pause = false) => {
    currentSong.src = "songs/" + encodeURIComponent(track);

    if (!pause) {
        currentSong.play();
        play.src = "pause.svg";
    }

    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};



async function main() {

    // play first song silently
    playMusic(songs[0], true);

    // ================= PLAYLIST =================
    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    for (const song of songs) {
        songUL.innerHTML += `
        <li>
            <img class="invert" src="music.svg" alt="">
            <div class="info">
                <div>${song}</div>
                <div>shivang</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="play.svg" alt="">
            </div>
        </li>`;
    }

    Array.from(songUL.getElementsByTagName("li")).forEach((e, index) => {
        e.addEventListener("click", () => {
            playMusic(songs[index]);
        });
    });

    // ================= PLAY / PAUSE =================
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        } else {
            currentSong.pause();
            play.src = "play.svg";
        }
    });

    // ================= TIME UPDATE =================
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;

        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // ================= SEEK BAR =================
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent =
            (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    // ================= HAMBURGER =================
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // ================= PREV / NEXT =================
    previous.addEventListener("click", () => {
    let currentFile = decodeURIComponent(currentSong.src.split("/").pop());
    let index = songs.indexOf(currentFile);
    if (index > 0) playMusic(songs[index - 1]);
});


    next.addEventListener("click", () => {
    let currentFile = decodeURIComponent(currentSong.src.split("/").pop());
    let index = songs.indexOf(currentFile);
    if (index + 1 < songs.length) playMusic(songs[index + 1]);
});


    // ================= VOLUME =================
    document.querySelector(".range input").addEventListener("change", e => {
        currentSong.volume = e.target.value / 100;
    });

    // ================= CARDS =================
    let cardContainer = document.querySelector(".cardContainer");
    const cardImage =
        "https://i.scdn.co/image/ab67616d00001e02c53e5adf9f81693d62f98019";

    cardContainer.innerHTML = "";

    for (const song of songs) {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <div class="play">
            ▶
        </div>
        <img src="${cardImage}" alt="">
        <h2>${song.replace(".mp3", "")}</h2>
        <p>Click to play</p>
        `;

        card.querySelector(".play").addEventListener("click", (e) => {
            e.stopPropagation();
            playMusic(song);
        });

        cardContainer.appendChild(card);
    }
}

main();


