window.addEventListener('load', function () {
    DarkMode();
    optionSave();
    setTime();
    setWallpaper();
    backgroundBlur();
});
function setTime() {
    var timeValue = localStorage.getItem('time');
    var time = document.querySelector('.timeBar');
 
    if (timeValue === 'ON') {
        Time();
        time.style.display = 'flex';
    } else if (timeValue === 'OFF') {
        time.style.display = 'none';
    }
}

function setWallpaper() {
    const wallpaperUrl = {
        LoremPicsum: "https://picsum.photos/1920/1080/?Mountain",
        Unsplash: "https://source.unsplash.com/1920x1080/?Mountain&dark"
    };
    var WallpaperValue = localStorage.getItem('wallpaper') || 'LoremPicsum';
    if(WallpaperValue !== 'NO'){
    var background = document.querySelector('.mainContain');
    var selectedWallpaper = wallpaperUrl[WallpaperValue];
    background.style.backgroundImage = `url(${selectedWallpaper})`;
    }
}
function backgroundBlur(){
    var backgroundBlur = localStorage.getItem('backgroundBlur');
    if(backgroundBlur === 'ON'){
        document.querySelector('.backgroundBlur').style.display = 'block';
    }else{
        document.querySelector('.backgroundBlur').style.display = 'none';
    }
}
function Time() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();

    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;

    var timeString = hours + ":" + minutes ;
    document.getElementById("timeDisplay").innerHTML = timeString;
}

function DarkMode() {
    var darkModeValue = localStorage.getItem('darkmode');
    if (darkModeValue === 'ON') {
        document.body.classList.add('dark');
    }else if(darkModeValue === 'OFF') {
        document.body.classList.remove('dark');
    } else if (darkModeValue === 'System') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }
};
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    var darkModeValue = localStorage.getItem('darkmode');
    if(darkModeValue==='ON'){
        localStorage.setItem('darkmode', "OFF");
        var newMessage = "Turn off dark mode."; 
        showTip(newMessage);
    }else{
        localStorage.setItem('darkmode', "ON");
        var newMessage = "Turn on dark mode."; 
        showTip(newMessage);
    }
};
function toggleSetting() {
    document.querySelector('.setting').classList.toggle('down');
};
function search() {
    const searchEngines = {
        Baidu: 'https://www.baidu.com/s?ie=UTF-8&wd=',
        Bing: 'https://www.bing.com/search?q=',
        Google: 'https://www.google.com/search?q='
    };
    var searchInput = document.querySelector('.searchInput');
    if (searchInput.value === '') {
        var newMessage = "Please enter value."; 
    showTip(newMessage);
    }else{
    var searchValue = searchInput.value;
    var engineValue = localStorage.getItem('searchEngine') || 'Baidu';
    var url = searchEngines[engineValue] + encodeURIComponent(searchValue);
    searchInput.value = '';
    window.open(url, '_blank');
    }
}
function keydownEnter(event){
    if (event.keyCode === 13) {
        search();
    }
}

function saveSettings() {
    var searchEngineValue = document.getElementById('searchEngine').value;
    var darkModeValue = document.getElementById('theme').value;
    var timeValue = document.getElementById('time').value;
    var backgroundValue = document.getElementById('wallpaper').value;
    var backgroundBlurValue = document.getElementById('BgBlur').value;

    localStorage.setItem('searchEngine', searchEngineValue);
    localStorage.setItem('darkmode', darkModeValue);
    localStorage.setItem('time', timeValue);
    localStorage.setItem('wallpaper', backgroundValue);
    localStorage.setItem('backgroundBlur', backgroundBlurValue);

    DarkMode();
    toggleSetting();
    setTime();
    setWallpaper();
    backgroundBlur()
    
    if(backgroundValue=="NO"){
        var newMessage = "Some settings need a page refresh."; 
    }else{
        var newMessage = "Sucessfully saved."; 
    }
    showTip(newMessage);
}

function optionSave(){
    var savedSearchEngine = localStorage.getItem('searchEngine');
    var savedTheme = localStorage.getItem('darkmode');
    var savedTime = localStorage.getItem('time');
    var savedwallpaper = localStorage.getItem('wallpaper');
    var savedBackgroundBlur = localStorage.getItem('backgroundBlur');


    if (savedSearchEngine) {
        document.getElementById('searchEngine').value = savedSearchEngine;
    }
    if (savedTheme) {
        document.getElementById('theme').value = savedTheme;
    }
    if (savedTime) {
        document.getElementById('time').value = savedTime;
    }
    if (savedwallpaper) {
        document.getElementById('wallpaper').value = savedwallpaper;
    }
    if (savedBackgroundBlur) {
        document.getElementById('BgBlur').value = savedBackgroundBlur;
    }
}
function showTip(newMessage) {
    var tip = document.querySelector(".tipbox");
    var tipMessage = document.querySelector('.tipmessage');
    tipMessage.textContent = newMessage;
    tip.style.display = "block";
    setTimeout(function(){
        tip.style.display = "none";
    }, 3000);
}




