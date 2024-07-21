    // THIS JAVA MADE BY PR CHAPAGAIN//
let currentStationIndex = 0;
let currentlyPlayingButton = null;
const stations = [
    { name: "Radio Nepal", streamUrl: "https://stream1.radionepal.gov.np/live/" },
    { name: "Kantipur FM", streamUrl: "https://radio-broadcast.ekantipur.com/stream/" },
    { name: "Ujyalo 90 Network", streamUrl: "https://stream.zeno.fm/h527zwd11uquv" },
    { name: "Kalika FM", streamUrl: "http://kalika-stream.softnep.com:7740/;" },
    { name: "Galyang FM", streamUrl: "https://live.itech.host:9107/stream" },
    { name: "Radio Audio", streamUrl: "https://stream.zeno.fm/fvrx47wpg0quv" },
    { name: "Shreenagar FM", streamUrl: "https://live.itech.host:9598/stream" },
    { name: "Radio Bhorukawa", streamUrl: "https://live.itech.host:8379/stream" },
    { name: "Hits FM", streamUrl: "https://usa15.fastcast4u.com/proxy/hitsfm912?mp=/1" },
    { name: "Radio Annapurna Nepal", streamUrl: "https://shoutcast.prixa.live/annapurna" },
    { name: "BFBS Gurkha Radio", streamUrl: "https://listen-ssvcbfbs.sharp-stream.com/ssvcbfbs3.aac" },
    { name: "Radio Tufan", streamUrl: "https://stream.zeno.fm/60tx8fw9dd0uv" },
    { name: "Capital FM", streamUrl: "https://streaming.softnep.net:10982/;stream.nsv&type:mp3&volume:10" },
    { name: "Radio Amargadhi", streamUrl: "https://live.itech.host:8927/stream" },
    { name: "Barahathawa FM 101.1Mhz", streamUrl: "https://stream.zeno.fm/gubb557z4k8uv" },
    { name: "Sky FM 106.6", streamUrl: "https://onlineradio.websoftitnepal.com/8002/stream" },
    { name: "Shuklaphanta FM", streamUrl: "https://streaming.webhostnepal.com/8010/stream" },
    { name: "Good News FM", streamUrl: "https://live.itech.host:8167/stream?1611505122592" },
    { name: "Radio Resunga", streamUrl: "https://live.itech.host:3260/stream" },
    { name: "Radio Rudraksha", streamUrl: "https://streaming.softnep.net:10874/;stream.nsv&type:mp3&volume:50" },
    { name: "Classic FM", streamUrl: "https://stream.hamropatro.com/8783" },
    { name: "Times FM", streamUrl: "https://astream.nepalipatro.com.np:8119/index.html" },
    { name: "Pathibhara FM", streamUrl: "https://live.itech.host:8749/stream" },
    { name: "Krishnasar FM", streamUrl: "https://live.itech.host:8434/stream" },
    { name: "Synergy FM", streamUrl: "https://live.itech.host:3880/stream" },
    { name: "Radio Prakriti", streamUrl: "https://live.itech.host:8939/stream" },
    { name: "Radio Nepalbani", streamUrl: "https://live.itech.host:8681/stream" },
    { name: "Radio Marsyangdi", streamUrl: "https://streaming.webhostnepal.com:7032/;stream.nsv&type:mp3&volume:30" }
];

let audio = new Audio(stations[currentStationIndex].streamUrl);

audio.addEventListener('canplay', function() {
    console.log('Audio can play:', stations[currentStationIndex].name);
    document.getElementById('streaming-indicator').style.display = 'inline-block'; // Show indicator
});

audio.addEventListener('error', function(e) {
    console.error('Audio error:', e);
    document.getElementById('streaming-indicator').style.display = 'none'; // Hide indicator
});

document.addEventListener('DOMContentLoaded', () => {
    const fmListUl = document.getElementById('fm-list-ul');
    stations.forEach((station, index) => {
        const li = document.createElement('li');
        li.setAttribute('onclick', `selectStation(${index})`);

        const span = document.createElement('span');
        span.textContent = station.name;

        const button = document.createElement('button');
        button.className = 'like-button';
        button.textContent = 'Play';
        button.setAttribute('onclick', 'likeStation(this); event.stopPropagation();');

        li.appendChild(span);
        li.appendChild(button);
        fmListUl.appendChild(li);
    });

    // Attempt to autoplay the first station
    audio.play().then(() => {
        console.log('Autoplaying:', stations[currentStationIndex].name);
        document.getElementById('current-station').innerText = stations[currentStationIndex].name;
        document.getElementById('play-pause').innerText = 'Pause';
        updateStationButton(currentStationIndex);
        document.getElementById('streaming-indicator').style.display = 'inline-block'; // Show indicator
    }).catch(e => {
        console.error('Autoplay blocked:', e);
        document.getElementById('play-pause').innerText = 'Play';
        document.getElementById('streaming-indicator').style.display = 'none'; // Hide indicator
    });

    // Block right-click context menu
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, and Ctrl+U
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
            (e.ctrlKey && e.keyCode === 85)) { // Ctrl+U
            e.preventDefault();
        }
    });
});

function toggleFMList() {
    const fmList = document.getElementById('fm-list');
    fmList.style.display = fmList.style.display === 'none' || fmList.style.display === '' ? 'block' : 'none';
}

function likeStation(button) {
    // Stop the currently playing station, if any
    if (currentlyPlayingButton && currentlyPlayingButton !== button) {
        currentlyPlayingButton.innerText = 'Play';
        currentlyPlayingButton.style.backgroundColor = ''; // Reset to default color
    }

    // Update the clicked button to show it's playing
    button.innerText = 'playing';
    button.style.backgroundColor = '#ff3b30';

    // Update the reference to the currently playing button
    currentlyPlayingButton = button;

    // Play the selected station
    const index = Array.from(button.parentElement.parentElement.children).indexOf(button.parentElement);
    selectStation(index);
}

function playPause() {
    const playPauseButton = document.getElementById('play-pause');
    if (audio.paused) {
        audio.play().then(() => {
            playPauseButton.innerText = 'Pause';
            console.log('Playing:', stations[currentStationIndex].name);
            document.getElementById('streaming-indicator').style.display = 'inline-block'; // Show indicator
        }).catch(e => {
            console.error('Error playing audio:', e);
        });
    } else {
        audio.pause();
        playPauseButton.innerText = 'Play';
        document.getElementById('streaming-indicator').style.display = 'none'; // Hide indicator
    }
}

function prevStation() {
    currentStationIndex = (currentStationIndex - 1 + stations.length) % stations.length;
    updateStation();
}

function nextStation() {
    currentStationIndex = (currentStationIndex + 1) % stations.length;
    updateStation();
}

function selectStation(index) {
    currentStationIndex = index;
    updateStation();
}

function updateStation() {
    // Stop the current audio before changing the source
    audio.pause();
    document.getElementById('streaming-indicator').style.display = 'none'; // Hide indicator during transition
    audio.src = stations[currentStationIndex].streamUrl;
    audio.play().then(() => {
        console.log('Now playing:', stations[currentStationIndex].name);
        document.getElementById('streaming-indicator').style.display = 'inline-block'; // Show indicator
    }).catch(e => {
        console.error('Error playing audio:', e);
        document.getElementById('streaming-indicator').style.display = 'none'; // Hide indicator
    });
    document.getElementById('current-station').innerText = stations[currentStationIndex].name;
    document.getElementById('play-pause').innerText = 'Pause';
    
    // Update the button text and color for the currently playing station
    updateStationButton(currentStationIndex);
}

function updateStationButton(index) {
    const buttons = document.querySelectorAll('.like-button');
    buttons.forEach((button, i) => {
        if (i === index) {
            button.innerText = 'playing';
            button.style.backgroundColor = '#ff3b30';
            currentlyPlayingButton = button;
        } else {
            button.innerText = 'Play';
            button.style.backgroundColor = ''; // Reset to default color
        }
    });
}
