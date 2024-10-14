


let currentSong = 0;
let shuffle = 0;
let repeat = 0;
const songList = [
    {
        name: "Fade",
        artist: "Alan Walker",
        imageSrc: "bild1.jpg",
        soundSrc: "Alan Walker - Fade.mp3"
    },
    {
        name: "Ark",
        artist: "Ship Wrek",
        imageSrc: "bild2.jpg",
        soundSrc: "NCS - Ark.mp3"
    },
    {
        name: "Weapon",
        artist: "M4SONIC",
        imageSrc: "bild3.jpg",
        soundSrc: "M4SONIC - Weapon.mp3"
    },
	    {
        name: "Mortals",
        artist: "Warriyo",
        imageSrc: "bild4.jpg",
        soundSrc: "Warriyo - Mortals.mp3"
    },
	    {
        name: "Blank",
        artist: "Disfigure",
        imageSrc: "bild5.jpg",
        soundSrc: "Disfigure - Blank.mp3"
    },
];

let audio = null;
let isPlaying = false; 
const volumeControl = document.getElementById("volume-control");


//ändra bild, låtnamn och spela upp vald låt
function beforeSong(i)
{

if(isPlaying){
	audio.pause();
	isPlaying = false; 
}
audio = null;
 togglePlayPause(i);
 const albumCover = document.getElementById("album-cover");
 const firstSongImage = songList[i].imageSrc;
 albumCover.src = firstSongImage;
 
    const songInfo = document.querySelector(".playlist-item");
    const songArtist = songList[i].artist;
    const songName = songList[i].name;


    songInfo.innerText = `${songArtist} - ${songName}`;
	
	//för att få border tjockare på vald song
    if (i == 0) {

        document.getElementById("song-item-fade").style.border = "5px solid #999";
		document.getElementById("song-item-ark").style.border = "2px solid #ccc";
		document.getElementById("song-item-weapon").style.border = "2px solid #ccc";
		document.getElementById("song-item-mortals").style.border = "2px solid #ccc";
		document.getElementById("song-item-blank").style.border = "2px solid #ccc";
		document.getElementById("timer-total").innerText = "4:20";
		currentSong = 0;
    }
	
	    if (i == 1) {

        document.getElementById("song-item-fade").style.border = "2px solid #ccc";
		document.getElementById("song-item-ark").style.border = "5px solid #999";
		document.getElementById("song-item-weapon").style.border = "2px solid #ccc";
		document.getElementById("song-item-mortals").style.border = "2px solid #ccc";
		document.getElementById("song-item-blank").style.border = "2px solid #ccc";
		document.getElementById("timer-total").innerText = "2:58";
		currentSong = 1;
    }
	    if (i == 2) {

        document.getElementById("song-item-fade").style.border = "2px solid #ccc";
		document.getElementById("song-item-ark").style.border = "2px solid #ccc";
		document.getElementById("song-item-weapon").style.border = "5px solid #999";
		document.getElementById("song-item-mortals").style.border = "2px solid #ccc";
		document.getElementById("song-item-blank").style.border = "2px solid #ccc";
		document.getElementById("timer-total").innerText = "3:55";
		currentSong = 2;
    }
	    if (i == 3) {

        document.getElementById("song-item-fade").style.border = "2px solid #ccc";
		document.getElementById("song-item-ark").style.border = "2px solid #ccc";
		document.getElementById("song-item-weapon").style.border = "2px solid #ccc";
		document.getElementById("song-item-mortals").style.border = "5px solid #999";
		document.getElementById("song-item-blank").style.border = "2px solid #ccc";
		document.getElementById("timer-total").innerText = "3:50";
		currentSong = 3;
    }
	    if (i == 4) {

        document.getElementById("song-item-fade").style.border = "2px solid #ccc";
		document.getElementById("song-item-ark").style.border = "2px solid #ccc";
		document.getElementById("song-item-weapon").style.border = "2px solid #ccc";
		document.getElementById("song-item-mortals").style.border = "2px solid #ccc";
		document.getElementById("song-item-blank").style.border = "5px solid #999";
		document.getElementById("timer-total").innerText = "3:29";
		currentSong = 4;
    }


}

//pause och play knappen
function togglePlayPause(index) {
	

    if (!audio) {
      
        const song = songList[index];
        audio = new Audio(song.soundSrc);
		audio.volume = volumeControl.value;
	
		        audio.addEventListener('ended', () => {
            nextSongShuffle();			// Gå till nästa låt när den nuvarande låten är slut
        });
        audio.addEventListener('loadedmetadata', () => {
            progressBar.max = audio.duration; // Sätt max till låtens längd
        });
        // Uppdatera reglaget varje sekund
        setInterval(() => {
            if (!audio.paused) { // Kontrollera om ljudet spelas
                progressBar.value = audio.currentTime; // Ställ in reglets värde till currentTime
            }
        }, 1000);
    }
    
    if (isPlaying) {
        
        audio.pause();
        isPlaying = false;

		//ändra knappen till play
        const playButton = document.getElementById("playButton");
        playButton.className = "fa-solid fa-play"; 
    } else {

        audio.play();
        isPlaying = true;

		//ändra knappen till pause
        const playButton = document.getElementById("playButton");
        playButton.className = "fa-solid fa-pause";  
    }

	
}
volumeControl.addEventListener('input', (event) => {
    if (audio) {
		audio.muted = false;
        audio.volume = event.target.value; // Ställ in ljudvolymen till reglets aktuella värde
    }
	if (audio.volume === 0) {
		var muteIcon = document.getElementById("muteVolume");
			muteIcon.classList.remove('fa-volume-high'); 
    muteIcon.classList.add('fa-volume-xmark');
	}
		if (audio.volume < 0.5 && audio.volume > 0 ) {
		var muteIcon = document.getElementById("muteVolume");
			muteIcon.classList.remove('fa-volume-xmark'); 
			muteIcon.classList.remove('fa-volume-high'); 
			muteIcon.classList.add('fa-volume-low');
	}
			if (audio.volume > 0.5) {
		var muteIcon = document.getElementById("muteVolume");
			muteIcon.classList.remove('fa-volume-xmark'); 
			muteIcon.classList.remove('fa-volume-low'); 			
			muteIcon.classList.add('fa-volume-high');
	}	
});


function showPlaylistt()
{

//visa spellistan
    document.getElementById("playlist").style.display = "flex";
	document.getElementById("playlisthoworhide").onclick = hidePlaylist;
	document.getElementById("playlisthoworhide").innerText = "Hide playlist";
	

}
function hidePlaylist()
{
	//dölj spellistan
document.getElementById("playlist").style.display = "none";	
	document.getElementById("playlisthoworhide").onclick = showPlaylistt;
	document.getElementById("playlisthoworhide").innerText = "Show playlist";
	console.log(audio);
}
//stoppknappen
function stopSong(){
	currentSong = 0;
	console.log("stop");
	beforeSong(currentSong);
	audio.pause();
	const playButton = document.getElementById("playButton");
    playButton.className = "fa-solid fa-play";
}

function audioMute()
{
	var muteIcon = document.getElementById("muteVolume");
	if (audio.muted === false){
	audio.muted = true;
	muteIcon.classList.remove('fa-volume-high'); 
    muteIcon.classList.add('fa-volume-xmark');
	}
	
	else {
	audio.muted = false;
	muteIcon.classList.remove('fa-volume-xmark'); 
    muteIcon.classList.add('fa-volume-high');
	}
	
	console.log(audio.muted);
};

    const timerDisplay = document.getElementById("timer-now");
	 const progressBar = document.getElementById("progress-bar");

    // Funktion för att formatera tiden
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // Uppdatera timern varje sekund
    setInterval(() => {
        if (audio && !audio.paused) { // Kontrollera om ljudet spelas
            timerDisplay.innerText = formatTime(audio.currentTime); // Uppdatera texten med currentTime
        }
    },1000);
	
function nextSong() 
{

  currentSong++
  if (currentSong > 4){
	  currentSong = 0;
	
  }
  beforeSong(currentSong);
  
}
function prevSong()
{
	  currentSong--;
	  console.log(currentSong);
  if (currentSong < 0){
	  currentSong = 4;
	
  }
  beforeSong(currentSong);
   console.log(currentSong);
}
function setAudioCurrentTime(value) {
    audio.currentTime = value; // Ställ in ljudets currentTime till reglets värde
}
function shuffleSong()
{
	if (shuffle === 0) {
	shuffle = 1;
	repeat = 0;
	document.getElementById("repeatIcon").style.color = "#000";
	document.getElementById("shuffleIcon").style.color = "#999";
	}
	else {
		shuffle = 0;
	document.getElementById("shuffleIcon").style.color = "#000";	
	}
	
}

function repeatSong(){
		if (repeat === 0) {
	repeat = 1;
	shuffle = 0;
	document.getElementById("shuffleIcon").style.color = "#000";	
	document.getElementById("repeatIcon").style.color = "#999";
	}
	else {
		repeat = 0;
	document.getElementById("repeatIcon").style.color = "#000";	
	}
	
}
function nextSongShuffle()  {

	if (repeat === 1)
	{
		console.log("repeating song")
		beforeSong(currentSong);
	}
    else {
    if (shuffle === 1) {
        let randomSong;

   
        do {
            randomSong = Math.floor(Math.random() * 5); 
        } while (randomSong === currentSong); 

        console.log("Shuffle to song nr", randomSong);
        beforeSong(randomSong); 
    } else {
        nextSong(); 
    }
	}
}