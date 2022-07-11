//Импортируем Плеер
import Player from '@vimeo/player';

//Добавляем метод троттл
const throttle = require('lodash.throttle');

//Импортируем конструктор Плеер
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

//Время воспроизведения (ключь)
const timePlay = 'videoplayer-current-time';

//Сохраненное время
const savedTime = localStorage.getItem(timePlay) || 0;

//Метод on

const onPlay = function (data) {
  localStorage.setItem(timePlay, data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

//Используем метод setCurrentTime() при перезагрузке страницы

addEventListener('DOMContentLoaded', player.setCurrentTime(savedTime));
