import playList from "./playList.js";
// календарь и чсаы
const timeBlock = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
// приветствие
const greetingBlock = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
// смена фона
const body = document.querySelector('body');
const prevBtn = document.querySelector('.slide-prev');
const nextBtn = document.querySelector('.slide-next');
let randomNum = getRandomNum(1, 20);
// погода
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const userCity = document.querySelector('.city');
let city;
// цитата дня
const quoteBlock = document.querySelector('.quote');
const authorBlock = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote');
const quotesLength = 7;
let quotRandomNumber = getRandomNum(0, (quotesLength - 1));
let quotesNumbers = []; 
// аудио плеер
const toggleAudioBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playlistContainer = document.querySelector('.play-list');
const audioName = document.querySelector('.audio-name-text');
const audio = new Audio();
let playNum = 0;
let isPlay = false;
let currTime;
// продвинутый аудио плеер
const volumeBtn = document.querySelector('.volume-button');
const volumeLine = document.querySelector('.volume-slider');
let mousedown = false;
const timeLine = document.querySelector(".timeline");
// links
const linksTitle = document.querySelector('.links-title');
const linksBoard = document.querySelector('.links-board');
const addBtnWrapper = document.querySelector('.add-button-wrapper')
const addLinkBtn = document.querySelector('.add-link');
const newLinkBoard = document.querySelector('.new-link-board');
const createLinkBtn = document.querySelector('.create-new');
const linkNameInput = document.querySelector('.link-name-input');
const linkUrlInput = document.querySelector('.link-url-input');
const backBtn = document.querySelector('.back');
const linkName = document.querySelector('.new-link-name');
const linkUrl = document.querySelector('.new-link-url');
// перевод приложения
const ruBtn = document.querySelector('.ru-btn');
const enBtn = document.querySelector('.en-btn');

let language = 'en';
const dateLang = {
    ru : 'ru-Ru',
    en : 'en-Us'
};
const timeOfDayLang = {
    ru: {'Night' : 'Доброй Ночи', 'Morning' : 'Доброе Утро', 'Afternoon' : 'Добрый День', 'Evening' : 'Добрый Вечер'},
    en: {'Night' : 'Good Night', 'Morning' : 'Good Morning', 'Afternoon' : 'Good Afternoon', 'Evening' : 'Good Evening'}
}
const weatherLang = {
    ru : {
        humidity: 'Влажность',
        windSpeed: 'Скорость ветра',
        error: 'Город не найден',
        placeholder: 'Пожалуйста, введите город'
    },
    en : {
        humidity: 'Humidity',
        windSpeed: 'Wind speed',
        error: 'City not found',
        placeholder: 'Please, enter city'
    }
};
const ms = {
    ru : 'м/с',
    en : 'm/s'
};
const placeholderLang = {
    ru : '[Введите имя]',
    en : '[Enter name]'
};
const settingsLang = {
    ru: {
        time: 'Время',
        date: 'Дата',
        greeting: 'Приветствие',
        quote: 'Цитата',
        weather: 'Погода',
        player: 'Плеер',
        links: 'Links',
        title: 'Отображать эти компоненты:',
        background: 'Фон',
        settingsTitle: 'Настройки'
    },
    en: {
        time: 'Time',
        date: 'Date',
        greeting: 'Greeting',
        quote: 'Quote',
        weather: 'Weather',
        player: 'Player',
        links: 'Links',
        title: 'Show this components:',
        background: 'Background',
        settingsTitle: 'Settings'
    }
};
const linksLang = {
    ru: {
        title: 'Ссылки',
        add: 'Добавить ссылку',
        name: 'Название',
        url: 'Ссылка',
        create: 'Создать'
    },
    en: {
        title: 'Links',
        add: 'Add New Link',
        name: 'Name',
        url: 'Link',
        create: 'Create'
    }
}
// валидация URL в links
const myRegExp =/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
// фон от api
const apiRadios = Array.from(document.querySelectorAll('.api-radio'));
let currentApi = 'GitHub';
const apiUrls = {
    GitHub: `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay().toLocaleLowerCase()}/${randomNum.toString().padStart(2, 0)}.jpg`,
    Unsplash: `https://api.unsplash.com/photos/random?orientation=landscape&query=nature+${timeOfDayLang['en'][getTimeOfDay()].toLowerCase()}&client_id=gOMGlf8xCGTGtHeINwLRpIabG1_xQKPHt5Uv42VCybU`,
    Flickr: `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d4c905a9f52e4e7c35ef12ed95069c7d&tags=nature&extras=url_l&format=json&nojsoncallback=1`
}
// настройки приложения
const settingsBtn = document.querySelector('.settings');
const settingsWrap = document.querySelector('.settings-board');
const settingsChecks = Array.from(document.querySelectorAll('.components-input'));
const componentsTitle = document.querySelector('.components-title');
const apiTitle = document.querySelector('.api-title');

// 1 часы и календарь
function showTime() { // показать время
    const date = new Date();
    const currentTime = date.toLocaleTimeString();

    timeBlock.textContent = currentTime;
    showDate();

    getTimeOfDay()
    showGreeting(timeOfDayLang[language][getTimeOfDay()]);

    setTimeout(showTime, 1000);
}

showTime();

function showDate() { // дни недели
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(dateLang[language], options);

    dateBlock.textContent = currentDate;
}

// 2 приветствие 
function getTimeOfDay() { // время суток
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;

    if (hours >= 0 && hours < 6) {
        timeOfDay = 'Night';
    } else if (hours >= 6 && hours < 12) {
        timeOfDay = 'Morning';
    } else if (hours >= 12 && hours < 18) {
        timeOfDay = 'Afternoon';
    } else if (hours >= 18 ) {
        timeOfDay = 'Evening';
    }

    return timeOfDay;
}

function showGreeting(lang) {
    greetingBlock.textContent = `${lang},`;
}

function setLocalStorage() { // имя пользователя
    localStorage.setItem('name', nameInput.value);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    } 
}

window.addEventListener('load', getLocalStorage);

// 9 получение фонового изображения от API
apiRadios.forEach(radio => {
    radio.addEventListener('change', (event) => {
        currentApi = event.target.value;
        setBG();
    });
});

async function getLinkToImage() {
    const url = apiUrls[currentApi];
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

// 3 смена фона
function getRandomNum(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function setBG() { 
    const img = new Image();

    if (currentApi === 'GitHub') {
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay().toLocaleLowerCase()}/${randomNum.toString().padStart(2, 0)}.jpg`;
    } else if (currentApi === 'Unsplash') {
        getLinkToImage().then(data => img.src = data.urls.regular);
    } else if (currentApi === 'Flickr') {
        getLinkToImage().then(data => img.src = data.photos.photo[getRandomNum(0, data.photos.photo.length - 1)].url_l);
    }
    
    img.onload = () => {      
      body.style.backgroundImage = `url(${img.src})`;
    };
}

setBG();

function getSlideNext() { // слайдер изображений 
    if (randomNum < 20) {
        randomNum++;
        setBG();
    } else {
        randomNum = 1;
        setBG();
    }
}

function getSlidePrev() {
    if (randomNum > 1) {
        randomNum--;
        setBG();
    } else {
        randomNum = 20;
        setBG();
    }
}

nextBtn.addEventListener('click', getSlideNext);
prevBtn.addEventListener('click', getSlidePrev);

// 4 погода
if (localStorage.getItem('userCity')) {
    city = localStorage.getItem('userCity');
    userCity.value = localStorage.getItem('userCity');
} else {
    city = 'Minsk';
    userCity.value = 'Minsk';
}

const weaterError = document.querySelector('.weather-error');

async function getWeather(c, l, m) { 
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${c}&lang=${l}&appid=d678403322adcf141be71adc7ef315dc&units=metric`;
        const res = await fetch(url);
        const data = await res.json(); 

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        
        temperature.textContent = `${Math.round(Number(data.main.temp))}°C`;
        weatherDescription.textContent = data.weather[0].description;

        wind.textContent = `${weatherLang[l].windSpeed}: ${Math.round(Number(data.wind.speed))}${m}`;
        
        humidity.textContent = `${weatherLang[l].humidity}: ${Math.round(Number(data.main.humidity))}%`;      
        
        localStorage.setItem('userCity', userCity.value);
        userCity.value = data.name;
        weaterError.textContent = '';
        userCity.placeholder = weatherLang[l].placeholder;
    } catch (e) {
        userCity.placeholder = weatherLang[l].placeholder;
        weaterError.textContent = weatherLang[l].error;
        console.log(`Error! ${e}`);
    }
}

getWeather(city, language, ms[language]);

userCity.addEventListener('change', function() {
    getWeather(userCity.value, language, ms[language]);
});

// 5 цитата дня
async function getQuotes(lang) {  
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 

    quoteBlock.textContent = data[quotRandomNumber][lang].text;
    authorBlock.textContent = data[quotRandomNumber][lang].author;

    quotesNumbers.push(quotRandomNumber);
}

getQuotes(language);

changeQuoteBtn.addEventListener('click', function() {
    quotRandomNumber = getRandomNum(0, (quotesLength - 1));
    getQuotes(language);
});

// 6 аудио-плеер
playList.forEach(el => { // создаем плейлист в html
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    li.setAttribute('data-src', el.src);
    playlistContainer.append(li);
});

const playItems = document.querySelectorAll('.play-item');

function playAudio() { // играть / стоп
    if (!isPlay) {
        audio.src = playList[playNum].src;

        if (currTime) {
            audio.currentTime = currTime;
        } else {
            audio.currentTime = 0; 
        }
       
        audio.play();
        
        audioName.textContent = playList[playNum].title;

        isPlay = true;
    } else {
        audio.pause();
        currTime = audio.currentTime;

        isPlay = false;
    }

    toggleAudioIcon();

    changeActiveAudio();
}

function changeActiveAudio() { // меняем стиль иконки активного аудио
    let currentAudio = document.querySelector(`[data-src="${playList[playNum].src}"]`);
    playItems.forEach(item => item.classList.remove('item-active'));
    currentAudio.classList.add('item-active');
}

function toggleAudioIcon() { // меняем иконку play
    if (isPlay) {
        toggleAudioBtn.classList.add('pause');
    } else {
        toggleAudioBtn.classList.remove('pause');
    }
}

function prevAudio() { // предыдущий / следующий трек
    isPlay = false;
    currTime = 0;

    if (playNum > 0) {
        playNum--;
    } else {
        playNum = playList.length - 1;
    }

    playAudio();
    toggleAudioIcon();
}

function nextAudio() {
    isPlay = false;
    currTime = 0;

    if (playNum < playList.length - 1) {
        playNum++;
    } else {
        playNum = 0;
    }  

    playAudio();
    toggleAudioIcon();
}

toggleAudioBtn.addEventListener('click', playAudio);

playPrevBtn.addEventListener('click', prevAudio);
playNextBtn.addEventListener('click', nextAudio);

audio.addEventListener('ended', function() {
    nextAudio();
    changeActiveAudio();
});

// 7 продвинутый аудио-плеер 
function getTimeCodeFromNum(num) { // вычисляем длительность аудио
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    let hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) {
        return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    } else {
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }
}

audio.addEventListener("loadeddata", () => { // записали длительность аудио
    document.querySelector('.length').textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = 1;
});

function updateProgress() { // заполнение прогресс-бара
    timeLine.value = (audio.currentTime / audio.duration) * 100;
    timeLine.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${(audio.currentTime / audio.duration) * 100}%, #C4C4C4 ${(audio.currentTime / audio.duration) * 100}%, #C4C4C4 100%)`;
    
    document.querySelector(".current").textContent = getTimeCodeFromNum(audio.currentTime); // записали текущее время аудио
}

audio.addEventListener('timeupdate', updateProgress);

function scrub(event) { // перемотка по прогрессбару
    const scrubTime = (event.offsetX / timeLine.offsetWidth) * audio.duration;
    audio.currentTime = scrubTime;

    const value = timeLine.value;
    timeLine.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

timeLine.addEventListener('click', scrub);
timeLine.addEventListener('mousemove', (event) => mousedown && scrub(event));
timeLine.addEventListener('mousedown', () => mousedown = true);
timeLine.addEventListener('mouseup', () => mousedown = false);

function handleRangeUpdate() { // громкость 
    audio.volume = volumeLine.value;

    volumeLine.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${volumeLine.value * 100}%, #C4C4C4 ${volumeLine.value * 100}%, #C4C4C4 100%)`;

    if (volumeLine.value === '0') {
        volumeBtn.classList.add('volume-mute');
    } else {
        volumeBtn.classList.remove('volume-mute')
    }
}

function toggleVolume() {
    volumeBtn.classList.toggle('volume-mute');
    
    if (volumeBtn.classList.contains('volume-mute')) {
        volumeLine.value = 0;
    } else {
        volumeLine.value = 1;
    }

    handleRangeUpdate();
}

volumeLine.addEventListener('change', handleRangeUpdate);
volumeLine.addEventListener('mousemove', handleRangeUpdate);

volumeBtn.addEventListener('click', toggleVolume);

// 8 перевод приложения
function translate() {
    getWeather(userCity.value, language, ms[language]);
    nameInput.placeholder = placeholderLang[language];
    showTime();
    quotRandomNumber = quotesNumbers[quotesNumbers.length - 1];
    getQuotes(language);

    settingsChecks.forEach(check => {
        check.nextElementSibling.textContent = settingsLang[language][check.value];
    });

    componentsTitle.textContent = settingsLang[language].title;
    apiTitle.textContent = settingsLang[language].background;
    settingsBtn.textContent = settingsLang[language].settingsTitle;
    linksTitle.textContent = linksLang[language].title;
    addLinkBtn.textContent = linksLang[language].add;
    linkName.textContent = linksLang[language].name;
    linkUrl.textContent = linksLang[language].url;
    createLinkBtn.textContent = linksLang[language].create;
}
ruBtn.addEventListener('click', function() {
    language = 'ru';
    translate();
});

enBtn.addEventListener('click', function() {
    language = 'en';
    translate();
});

// дополнительный функционал на выбор - links
function toggleLinksBoard() {
    linksBoard.classList.toggle('links-board-visible');
}

function toggleNewLinksBoard() {
    newLinkBoard.classList.toggle('new-link-board-visible');
}

function showError(inp) {
    inp.classList.add('link-input-error');
}

function hideError(inp) {
    inp.classList.remove('link-input-error');
}

function clearInputs() {
    hideError(linkNameInput);
    hideError(linkUrlInput);

    linkNameInput.value = '';
    linkUrlInput.value = '';
}

function createLink() {
    if (linkNameInput.value && linkUrlInput.value && (myRegExp.test(linkUrlInput.value))) {
        const newLinkItem = document.createElement('div');

        newLinkItem.classList.add('links-item');
        newLinkItem.innerHTML = `
            <a href="${linkUrlInput.value}" class="link" target="_blank">
                <img src="assets/svg/link.svg" alt="icon: link-icon" class="link-icon">
                <span class="link-name">${linkNameInput.value}</span>
            </a>
            <img src="assets/svg/delete-link.svg" alt="icon: link-icon" class="link-icon delete-icon">`;
    
        linksBoard.insertBefore(newLinkItem, addBtnWrapper);
        hideError(linkNameInput);
        hideError(linkUrlInput);
        toggleLinksBoard();
        toggleNewLinksBoard();
    } else if (!linkNameInput.value) {
        showError(linkNameInput);
    } else if (!linkUrlInput.value || !(myRegExp.test(linkUrlInput.value))) {
        showError(linkUrlInput);
    } else if (!linkNameInput.value || !linkUrlInput.value) {
        showError(linkNameInput);
        showError(linkUrlInput);
    }
}

function deleteLink(event) {
    if (event.target.classList.contains('delete-icon')) {
        linksBoard.removeChild(event.target.parentNode);
    }
}

linksTitle.addEventListener('click', toggleLinksBoard);
addLinkBtn.addEventListener('click', toggleNewLinksBoard);
addLinkBtn.addEventListener('click', toggleLinksBoard);
addLinkBtn.addEventListener('click', clearInputs);
createLinkBtn.addEventListener('click', createLink);
backBtn.addEventListener('click', toggleNewLinksBoard);
backBtn.addEventListener('click', toggleLinksBoard);

linksBoard.addEventListener('click', deleteLink);

linkNameInput.addEventListener('input', function() {
    hideError(linkNameInput);
});

linkUrlInput.addEventListener('input', function() {
    hideError(linkUrlInput);
});

// 10 настройки приложения
settingsBtn.addEventListener('click', function() {
    settingsWrap.classList.toggle('settings-wrapper-visible')
});

settingsChecks.forEach(check => {
    check.addEventListener('change', function(event) {
        let chosenComponent = document.querySelector('[data-comp="'+event.target.value+'"]');
        
        if (event.target.checked === true) {
            chosenComponent.classList.remove('component-hidden');
        } else {
            chosenComponent.classList.add('component-hidden');
        }
    });
});

console.log(`
Score: 147 / 150:
1. Часы и календарь +15
2. Приветствие +10
3. Смена фонового изображения +20
4. Виджет погоды +15
5. Виджет цитата дня +10
6. Аудиоплеер +15
7. Продвинутый аудиоплеер +17 (не реализовала запуск/остановку проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте; небольшие баги с ползунком громкости и собственно громкостью - при переключении треков)
8. Перевод приложения на два языка (en/ru) +15
9. Получение фонового изображения от API +8 (для Flickr API не удалось получать изображения в зависимости от времени суток)
10. Настройки приложения +12 (не реализовала добавление тегов для API, сохранение настроек при перезагрузке страницы)
11. Дополнительный функционал на выбор - список ссылок +10
`);