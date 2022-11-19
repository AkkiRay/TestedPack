const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl

function onTimesUp() { // функция остановки таймера
  clearInterval(timerInterval);
}

function formatTime(time) { // Функция форматировании времени
  var hours   = Math.floor(time / 3600); // получившуюся переменную преобразуем в часы
  var minutes = Math.floor((time - (hours * 3600)) / 60); // в минуты
  var seconds = time - (hours * 3600) - (minutes * 60); // в минуты
  // время формируется относительно секунд с учетом формата времени

  if (hours   < 10) {hours   = "0"+hours;} //преобразовываем время в нужный формат
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}

  return hours+':'+minutes+':'+seconds; // возвращаем ответ
}

var timerInterval = false // создаем переменную через которую будем проверять создан ли таймер

function createTimerAnimator() { // функция с созданием таймера
  var timePassed = 0; // задаем переменную через которую будем фиксировать сколько прошло секунд внутри таймера
  return (seconds) => {
    if (timerInterval !== false) { // задаем проверку на случай если захотим изменить ход таймера
      onTimesUp() // запускаем функцию остановки таймера
      timerInterval = false // задаем false для того, чтобы в будущем таймер не отключался
      timePassed = 0; // обнуляем пройденое время
      timeLeft = 0; // обнуляем конечный счетчик
    }
    if (seconds !== 0){ // задаем проверку, что функция запуститься только в том случае если поле не равно 0
        timerInterval = setInterval(() => { //запускаем функцию интервала, чтобы мы могли каждую секнду производить действия над таймером
        timePassed = timePassed += 1; // фиксируем сколько времени прошло внутри функции
        timeLeft = seconds - timePassed; // от общего кол-ва секунд минусуем прошедшее время внутри функции
        timerEl.innerHTML = formatTime( // выставляем конечное время с форматированием
          timeLeft
        );
        if (timeLeft === 0) { // если таймер закончился
          onTimesUp(); // запускаем функцию по его остановке
        }
      }, 1000);// интервал через который повторяются эти действия
    }

  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (table) => { // для наглядности задаю названии переменной которая хранит в себе inputEvent - информацию о вводимых символах
  table.target.value = event.target.value.replace(/[^0-9+]/g, '') // дальше обращаюсь к самому input'у (inputEvent) и заменяю все кроме цифр
  // Очистите input так, чтобы в значении
  // оставались только числа
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);

  inputEl.value = '';
});
