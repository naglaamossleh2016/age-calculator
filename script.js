const inputElement = document.querySelectorAll('.card__input');
const calculateButton = document.querySelector('.card__button');
const currentDate = new Date();
const validateDay = (day) => {
  if (day && day > 0 && day <= 31) return true;
};

const validateMonth = (month) => {
  if (month && month > 0 && month <= 12) return true;
};

const validateYear = (year) => {
  if (year && year > 0 && year < currentDate.getFullYear()) return true;
};

const isvalidBirthDay = (dayElement, monthElement, yearElement) => {
  const isValid = [false, false, false];
  if (!validateDay(dayElement.value)) {
    dayElement.classList.add('card__input--error');
  } else {
    isValid[0] = true;
    dayElement.classList.remove('card__input--error');
  }

  if (!validateMonth(monthElement.value)) {
    monthElement.classList.add('card__input--error');
  } else {
    isValid[1] = true;
    monthElement.classList.remove('card__input--error');
  }
  if (!validateYear(yearElement.value)) {
    yearElement.classList.add('card__input--error');
  } else {
    isValid[2] = true;
    yearElement.classList.remove('card__input--error');
  }
  return isValid.every((item) => item === true);
};

const calculateAge = (year, month, day) => {
  const birthDate = new Date(year, month - 1, day);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDay() < birthDate.getDay())) age--;
  return age;
};

const clickEventHandler = () => {
  const dayInput = document.querySelector('.card__input[name="day"]');
  const monthInput = document.querySelector('.card__input[name="month"]');
  const yearInput = document.querySelector('.card__input[name="year"]');
  const resultElement = document.querySelector('.card__resultValue');
  if (!isvalidBirthDay(dayInput, monthInput, yearInput)) {
    resultElement.textContent = '--';
    return;
  }
  resultElement.textContent = calculateAge(yearInput.value, monthInput.value, dayInput.value);
};
calculateButton.addEventListener('click', clickEventHandler);

inputElement.forEach((item) => {
  item.addEventListener('keydown', (event) => event.key === 'Enter' && clickEventHandler());
});
