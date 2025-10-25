// Playlist Data
const playlist = [
    {
        title: "VAI VAI TRAIR - DJ Asul",
        src: "https://cdn.discordapp.com/attachments/1395881786617364540/1431486901252128858/VAI_VAI_TRAIR_-_DJ_Asul_youtube.mp3?ex=68fd9790&is=68fc4610&hm=2b8ea78c556c79a4680c6a2c8114026c7fa95c86f08cddbc074721c1ae153f2d&"
    },
    {
        title: "MONTAGEM RUGADA - cape",
        src: "https://cdn.discordapp.com/attachments/1395881786617364540/1431487094550827139/MONTAGEM_RUGADA_-_cape_youtube.mp3?ex=68fd97bf&is=68fc463f&hm=0d9c559daac2b9b90f677c1460b35ae5bb6b50bb5658ff99e72069c11b274f62&"
    },
    {
        title: "AL NACER - Sayfalse",
        src: "https://cdn.discordapp.com/attachments/1395881786617364540/1431487340668260422/AL_NACER_-_Sayfalse_youtube.mp3?ex=68fd97f9&is=68fc4679&hm=7729617f33420c9556e5c9dc831e984d0a0d517d7cac667df40fbb85d5ce3e7e&"
    },
    {
        title: "MONTAGEM XONADA - MXZI",
        src: "https://cdn.discordapp.com/attachments/1395881786617364540/1431487449200328806/MONTAGEM_XONADA_-_MXZI_youtube.mp3?ex=68fd9813&is=68fc4693&hm=6673aa8e55f073a8d63898178f5fc79dcaa24ff1a59a5259996422b1a629945e&"
    },
    {
        title: "ECOS DO BAILAO - JXNDRO",
        src: "https://cdn.discordapp.com/attachments/1395881786617364540/1431487599062548490/ECOS_DO_BAILAO_-_JXNDRO_youtube.mp3?ex=68fd9837&is=68fc46b7&hm=f0f6c7f37eb82bc3bcaf5ca09e3f355ff638890d2658d2cfab56faad38d8a814&"
    },
    {
        title: "BOLADA RINHA - Scythermane",
        src: "https://cdn.discordapp.com/attachments/1395881786617364540/1431487682416083065/BOLADA_RINHA_-_Scythermane_youtube.mp3?ex=68fd984b&is=68fc46cb&hm=faf72ebd94081247de97a604ae4c07603425cb0b7b239a8bb10d8c1913174fca&"
    },
    {
        title: "VAGO SOLO - KVRXD",
        src: "https://cdn.discordapp.com/attachments/1395881786617364540/1431487804629717052/VAGO_SOLO_-_KVRXD_youtube.mp3?ex=68fd9868&is=68fc46e8&hm=b6036e619c63d61f34718340f397b7d7f8010904f231939c4e19e76ab30efbb6&"
    },
    {
        title: "MONTAGEM MUERVE - KVRXD",
        src: "https://cdn.discordapp.com/attachments/1395881786617364540/1431487992681463920/MONTAGEM_MUERVE_-_KVRXD_youtube.mp3?ex=68fd9895&is=68fc4715&hm=b4ec87f028893f258d18fb37f50bd15cb3693f34e39dbec98d9794e8fe2a835e&"
    }
];

// Global Variables
let currentTrackIndex = 0;
let isPlaying = false;
let userInteracted = false;
const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const currentTrackTitle = document.querySelector('.current-track-title');
const trackList = document.getElementById('trackList');

// Splash Screen Handler
function initSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    const enterBtn = document.getElementById('enterBtn');
    const mainContainer = document.querySelector('.main-container');
    
    enterBtn.addEventListener('click', () => {
        userInteracted = true;
        
        // Fade out splash
        splashScreen.classList.add('hidden');
        
        // Fade in main content
        setTimeout(() => {
            mainContainer.classList.add('visible');
        }, 300);
        
        // Start music automatically
        setTimeout(() => {
            playTrack(0);
        }, 1000);
    });
}

// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ff0000'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.4,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.3,
                sync: false
            }
        },
        size: {
            value: 4,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 1,
                sync: false
            }
        },
        line_linked: {
            enable: false
        },
        move: {
            enable: true,
            speed: 3,
            direction: 'bottom',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Initialize Playlist UI
function initPlaylist() {
    trackList.innerHTML = '';
    playlist.forEach((track, index) => {
        const trackItem = document.createElement('div');
        trackItem.className = 'track-item';
        trackItem.innerHTML = `
            <span class="track-number">${index + 1}</span>
            <span class="track-title">${track.title}</span>
        `;
        trackItem.addEventListener('click', () => playTrack(index));
        trackList.appendChild(trackItem);
    });
}

// Load Track
function loadTrack(index) {
    if (index >= 0 && index < playlist.length) {
        currentTrackIndex = index;
        audio.src = playlist[index].src;
        currentTrackTitle.textContent = playlist[index].title;
        updateActiveTrack();
    }
}

// Play Track
function playTrack(index) {
    loadTrack(index);
    audio.play().then(() => {
        isPlaying = true;
        updatePlayPauseButton();
    }).catch(error => {
        console.log('Playback failed:', error);
        alert('Click the play button to start the music!');
    });
}

// Toggle Play/Pause
function togglePlayPause() {
    if (!audio.src) {
        playTrack(0);
        return;
    }
    
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play().then(() => {
            isPlaying = true;
        }).catch(error => {
            console.log('Playback failed:', error);
        });
    }
    updatePlayPauseButton();
}

// Next Track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    playTrack(currentTrackIndex);
}

// Update Play/Pause Button
function updatePlayPauseButton() {
    const icon = playPauseBtn.querySelector('i');
    if (isPlaying) {
        icon.className = 'fas fa-pause';
    } else {
        icon.className = 'fas fa-play';
    }
}

// Update Active Track in Playlist
function updateActiveTrack() {
    const tracks = document.querySelectorAll('.track-item');
    tracks.forEach((track, index) => {
        if (index === currentTrackIndex) {
            track.classList.add('active');
        } else {
            track.classList.remove('active');
        }
    });
}

// Format Time
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update Progress Bar
function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = progress + '%';
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    durationDisplay.textContent = formatTime(audio.duration);
}

// Seek in Track
function seek(e) {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
}

// Event Listeners
playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextTrack);
progressBar.addEventListener('click', seek);

// Volume Control
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// Auto-advance to next track when current finishes
audio.addEventListener('ended', () => {
    if (userInteracted) {
        nextTrack();
    }
});

// Audio Events
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

// Set initial volume
audio.volume = 0.7;

// Security Features
// Disable Right Click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showSecurityAlert();
});

// Disable Developer Tools Shortcuts
document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
        e.preventDefault();
        showSecurityAlert();
        return false;
    }
    
    // Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        showSecurityAlert();
        return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        showSecurityAlert();
        return false;
    }
    
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        showSecurityAlert();
        return false;
    }
    
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        showSecurityAlert();
        return false;
    }
});

// Show Security Alert
function showSecurityAlert() {
    alert('Security Alert: NEGANOX Alpha Protocol is Active');
}

// Initialize on Load
window.addEventListener('load', () => {
    initSplashScreen();
    initPlaylist();
    loadTrack(0);
});
