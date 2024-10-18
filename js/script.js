const songList = [
    { name: "Fade", artist: "Alan Walker", imageSrc: "bild1.jpg", soundSrc: "Alan Walker - Fade.mp3" },
    { name: "Ark", artist: "Ship Wrek", imageSrc: "bild2.jpg", soundSrc: "NCS - Ark.mp3" },
    { name: "Weapon", artist: "M4SONIC", imageSrc: "bild3.jpg", soundSrc: "M4SONIC - Weapon.mp3" },
    { name: "Mortals", artist: "Warriyo", imageSrc: "bild4.jpg", soundSrc: "Warriyo - Mortals.mp3" },
    { name: "Blank", artist: "Disfigure", imageSrc: "bild5.jpg", soundSrc: "Disfigure - Blank.mp3" },
];


let currentSong = 0;
let shuffle = 0; // Shuffle status (0: off, 1: on)
let repeat = 0;  // Repeat status (0: off, 1: on)
let audio = null;
let isPlaying = false;

// DOM elements for volume control, time display, and progress bar
const volumeControl = document.getElementById("volume-control");
const timerDisplay = document.getElementById("timer-now");
const progressBar = document.getElementById("progress-bar");

// Function to set up and play the selected song
function beforeSong(index) {
    // Pause and reset the current song if one is playing
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    }
    audio = null;

    // Update album cover
    const albumCover = document.getElementById("album-cover");
    albumCover.src = songList[index].imageSrc;

    // Update artist and song name
    const songInfo = document.querySelector(".playlist-item");
    songInfo.innerText = `${songList[index].artist} - ${songList[index].name}`;

    // Highlight the currently selected song in the playlist
    highlightCurrentSong(index);

    // Play the selected song
    togglePlayPause(index);
}

// Function to highlight the selected song in the playlist and update the total duration
function highlightCurrentSong(index) {
    const songItems = [
        "song-item-fade", "song-item-ark", "song-item-weapon", 
        "song-item-mortals", "song-item-blank"
    ];

    // Reset borders for all songs, and highlight the selected one
    songItems.forEach((id, i) => {
        document.getElementById(id).style.border = (i === index) ? "5px solid #999" : "2px solid #ccc";
    });

    // Set the total time of the song
    const songDurations = ["4:20", "2:58", "3:55", "3:50", "3:29"];
    document.getElementById("timer-total").innerText = songDurations[index];

    currentSong = index; // Set the current song index
}

// Play/Pause function
function togglePlayPause(index) {
    if (!audio) {
        const song = songList[index];
        audio = new Audio(song.soundSrc);  
        audio.volume = volumeControl.value; 

        // When the song ends, move to the next song 
        audio.addEventListener('ended', nextSongShuffle);

        // Set the max value of the progress bar to the song's duration
        audio.addEventListener('loadedmetadata', () => {
            progressBar.max = audio.duration;
        });

        // Update the progress bar as the song plays
        setInterval(() => {
            if (!audio.paused) {
                progressBar.value = audio.currentTime;
            }
        }, 1000);
    }

    // Toggle between play and pause
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        updatePlayButton("fa-solid fa-play");
    } else {
        audio.play();
        isPlaying = true;
        updatePlayButton("fa-solid fa-pause");
    }
}

// Function to update the play/pause button icon
function updatePlayButton(iconClass) {
    const playButton = document.getElementById("playButton");
    playButton.className = iconClass;
}

// Volume control functionality (also updates volume icon)
volumeControl.addEventListener('input', (event) => {
    if (audio) {
        audio.muted = false;
        audio.volume = event.target.value;
    }
    updateVolumeIcon(audio.volume);
});

// Function to update the volume icon based on volume level
function updateVolumeIcon(volume) {
    const muteIcon = document.getElementById("muteVolume");
    if (volume === 0) {
        muteIcon.classList.remove('fa-volume-high', 'fa-volume-low');
        muteIcon.classList.add('fa-volume-xmark');
    } else if (volume < 0.5) {
        muteIcon.classList.remove('fa-volume-xmark', 'fa-volume-high');
        muteIcon.classList.add('fa-volume-low');
    } else {
        muteIcon.classList.remove('fa-volume-xmark', 'fa-volume-low');
        muteIcon.classList.add('fa-volume-high');
    }
}

// Show/Hide playlist button
function showPlaylist() {
    document.getElementById("playlist").style.display = "flex";
    document.getElementById("playlisthoworhide").onclick = hidePlaylist;
    document.getElementById("playlisthoworhide").innerText = "Hide playlist";
}

function hidePlaylist() {
    document.getElementById("playlist").style.display = "none";
    document.getElementById("playlisthoworhide").onclick = showPlaylist;
    document.getElementById("playlisthoworhide").innerText = "Show playlist";
}

// Stop button
function stopSong() {
    currentSong = 0;
    beforeSong(currentSong);
    audio.pause();
    updatePlayButton("fa-solid fa-play");
}

// Mute/Unmute button
function audioMute() {
    const muteIcon = document.getElementById("muteVolume");
    if (audio.muted) {
        audio.muted = false;
        updateVolumeIcon(audio.volume);
    } else {
        audio.muted = true;
        muteIcon.classList.remove('fa-volume-high', 'fa-volume-low');
        muteIcon.classList.add('fa-volume-xmark');
    }
}

// Timer display, updating every second
setInterval(() => {
    if (audio && !audio.paused) {
        timerDisplay.innerText = formatTime(audio.currentTime);
    }
}, 1000);

// Format time from seconds to mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Function to handle progress bar input and update current song time
progressBar.addEventListener('input', (event) => {
    if (audio) {
        setAudioCurrentTime(event.target.value);
    }
});

function setAudioCurrentTime(value) {
    audio.currentTime = value;
}

// Function to move to the next song, checks for shuffle or repeat
function nextSong() {
    if (shuffle === 1) {
        let randomSong;
        do {
            randomSong = Math.floor(Math.random() * songList.length);
        } while (randomSong === currentSong);
        beforeSong(randomSong);
    } else {
        currentSong = (currentSong + 1) % songList.length; // Loop to first song if at the end
        beforeSong(currentSong);
    }
}

// Previous song button
function prevSong() {
	if(repeat === 0){
    currentSong = (currentSong - 1 + songList.length) % songList.length; // Loop to last song if at the beginning
    beforeSong(currentSong);
	}
	else{
		beforeSong(currentSong);
	}
}

// Changes the color of shuffle button and value if activated
function shuffleSong() {
    shuffle = 1 - shuffle; // Toggle shuffle
    document.getElementById("shuffleIcon").style.color = shuffle ? "#999" : "#000";
    if (shuffle) {
        repeat = 0; // Disable repeat when shuffle is on
        document.getElementById("repeatIcon").style.color = "#000";
    }
}

// Changes the color of repeat button and value if activated
function repeatSong() {
    repeat = 1 - repeat; // Toggle repeat
    document.getElementById("repeatIcon").style.color = repeat ? "#999" : "#000";
    if (repeat) {
        shuffle = 0; // Disable shuffle when repeat is on
        document.getElementById("shuffleIcon").style.color = "#000";
    }
}

// Function to decide what to do with next song (shuffle/repeat checked)
function nextSongShuffle() {
    if (repeat === 1) {
        beforeSong(currentSong); // Repeat the same song
    } else {
        nextSong(); // Proceed to the next song
    }
}
