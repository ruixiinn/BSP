window.addEventListener('load', function () {
    suggest();
    DarkMode();
    optionSave();
    setTime();
    backgroundBlur();
    setWallpaper();
    
});
function setTime() {
    var timeValue = localStorage.getItem('time');
    var time = document.querySelector('.timeBar');
    if (window.innerWidth <= 1200){
        return;
    }
    else if (timeValue === 'ON') {
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
    if (WallpaperValue !== 'NO') {
        var background = document.querySelector('.mainContain');
        var selectedWallpaper = wallpaperUrl[WallpaperValue];
        background.style.backgroundImage = `url(${selectedWallpaper})`;
    }
}
function backgroundBlur() {
    var backgroundBlur = localStorage.getItem('backgroundBlur');
    if (backgroundBlur === 'ON') {
        document.querySelector('.backgroundBlur').style.display = 'block';
    } else {
        document.querySelector('.backgroundBlur').style.display = 'none';
    }
}
function Time() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();

    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;

    var timeString = hours + ":" + minutes;
    document.getElementById("timeDisplay").innerHTML = timeString;
}

function DarkMode() {
    var darkModeValue = localStorage.getItem('darkmode');
    if (darkModeValue === 'ON') {
        document.body.classList.add('dark');
    } else if (darkModeValue === 'OFF') {
        document.body.classList.remove('dark');
    } else if (darkModeValue === 'System') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }
};
function toggleTheme(){
    document.body.classList.toggle('dark');
    var newMessage = 'Temporary switch successful.';
    showTip(newMessage);
}
function toggleSetting() {
    document.querySelector('.setting').classList.toggle('down');
};
function toggleSearch() {
    document.querySelector('.searchlist').classList.toggle('up');
};

function saveSettings() {
    var searchEngineValue = document.getElementById('searchEngine').value;
    var searchSuggestionValue = document.getElementById('searchSuggestion').value;
    var darkModeValue = document.getElementById('theme').value;
    var timeValue = document.getElementById('time').value;
    var backgroundValue = document.getElementById('wallpaper').value;
    var backgroundBlurValue = document.getElementById('BgBlur').value;

    localStorage.setItem('searchEngine', searchEngineValue);
    localStorage.setItem('searchSuggestion', searchSuggestionValue);
    localStorage.setItem('darkmode', darkModeValue);
    localStorage.setItem('time', timeValue);
    localStorage.setItem('wallpaper', backgroundValue);
    localStorage.setItem('backgroundBlur', backgroundBlurValue);

    suggest();
    DarkMode();
    toggleSetting();
    setTime();
    setWallpaper();
    backgroundBlur()

    if (backgroundValue == "NO" || searchSuggestionValue == "OFF") {
        var newMessage = "Some settings need a page refresh.";
    } else {
        var newMessage = "Sucessfully saved.";
    }
    showTip(newMessage);
}

function optionSave() {
    var savedSearchEngine = localStorage.getItem('searchEngine');
    var savedSearchSuggestion = localStorage.getItem('searchSuggestion');
    var savedTheme = localStorage.getItem('darkmode');
    var savedTime = localStorage.getItem('time');
    var savedwallpaper = localStorage.getItem('wallpaper');
    var savedBackgroundBlur = localStorage.getItem('backgroundBlur');
    if (savedSearchEngine) {
        document.getElementById('searchEngine').value = savedSearchEngine;
    }
    if (savedSearchSuggestion) {
        document.getElementById('searchSuggestion').value = savedSearchSuggestion;
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
    var tipBox = document.createElement('div');
    tipBox.className = 'tipbox';

    var tip = document.createElement('div');
    tip.className = 'tip';

    var icon = document.createElement('i');
    icon.className = 'fa-solid fa-circle-exclamation';

    var tipMessage = document.createElement('p');
    tipMessage.className = 'tipmessage';
    tipMessage.textContent =  newMessage;

    tip.appendChild(icon);
    tip.appendChild(tipMessage);
    tipBox.appendChild(tip);

    document.body.appendChild(tipBox);

    setTimeout(function () {
        tipBox.style.display = "none";
        document.body.removeChild(tipBox);
    }, 4000);
}

function changeSearchEngine(clickedElement){
    var searchEngineValue = clickedElement.textContent;
    localStorage.setItem('searchEngine', searchEngineValue);
    var newMessage = `Successfully saved as ${searchEngineValue}.`;
    showTip(newMessage);
    document.querySelector('.searchlist').classList.remove('up');
}

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
    } else {
        var searchValue = searchInput.value;
        var engineValue = localStorage.getItem('searchEngine') || 'Baidu';
        var url = searchEngines[engineValue] + encodeURIComponent(searchValue);
        searchInput.value = '';
        window.open(url, '_blank');
    }
}
function keydownEnter(event) {
    if (event.keyCode === 13) {
        search();
    }
}

function checkFocus() {
    var inputElement = document.querySelector('.searchInput');
    if (document.activeElement !== inputElement) {
        var sug = document.querySelector('.searchSuggestion');
        setTimeout(function () {
            sug.style.display = 'none';
        }, 100);
    }
  }

function suggest() {
    var sugItem = localStorage.getItem('searchSuggestion');
    if(sugItem === 'OFF'){
        return;
    }else{
    var input = document.querySelector('.searchInput');
    var sugContainer = document.querySelector('.suggestionList');
    var sug = document.querySelector('.searchSuggestion');
    var scriptElement = null;
    var timeout = null;
    input.addEventListener('input', function (event) {
        clearTimeout(timeout);
        if (input.value === '') {
            sug.style.display = 'none';
        } else {
            if (document.activeElement === input) {
                sug.style.display = 'flex';
                timeout = setTimeout(function ()  {
                    sug.style.display = 'none';
                }, 9000);
            }
        }
        var inputValue = event.target.value;
        if (scriptElement) {
            document.getElementsByTagName("head")[0].removeChild(scriptElement);
        }
        scriptElement = document.createElement("script");
        scriptElement.src = "https://suggestion.baidu.com/su?wd=" + inputValue;
        scriptElement.setAttribute('data-script-id', 'search-suggestion');
        document.getElementsByTagName("head")[0].appendChild(scriptElement);
    });
    window.baidu = {
        sug: function (json) {
            var suggestions = json.s;
            updateSuggestions(suggestions);
        }
    }
    function updateSuggestions(suggestions) {
        var liElements = sugContainer.querySelectorAll('li');
        for (var i = 0; i < liElements.length; i++) {
            liElements[i].textContent = suggestions[i];
        }
    }
}
}

function getcontain(clickedElement) {
    var content = clickedElement.textContent;
    document.querySelector('.searchInput').value = content;
    console.log("Clicked on:", content);
    search();
  }