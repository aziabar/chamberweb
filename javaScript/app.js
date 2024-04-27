// const dateId = document.getElementById('date');
const dateField = document.getElementsByClassName('datefield')[0];
const dayId = document.getElementById('dayF');
const monthId = document.getElementById('monthF');
const yearId = document.getElementById('yearF');

const dayIdT = document.getElementById('dayT');
const monthIdT = document.getElementById('monthT');
const yearIdT = document.getElementById('yearT');

const copyrightStart = document.getElementById('copyrightStart');
const copyrightCurrent = document.getElementById('copyrightCurrent');
const CopyrightNetxGen = document.getElementById('CopyrightNetxGen');


const now = new Date();
const fullYear = now.getFullYear();
const monthNow = now.getMonth();
const dayNow = now.getDate();
const hoursNow = now.getHours();
const monthArr = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const thisMonth = monthArr[monthNow];


function dateTimeCalculator(ds) {

  let s = 1000;
  let m = s * 60;
  let h = m * 60;
  let d = h * 24;
  let mo = d * 30.41;
  let yr = (mo * 12);

  const years = Math.floor(ds / yr);
  const months = Math.floor((ds % yr) / mo);
  const days = Math.floor((ds % mo) / d);
  const hours = Math.floor((ds % d) / h);
  const minutes = Math.floor((ds % h) / m);
  const seconds = Math.floor((ds % m) / s);

  return `${years} years ${months} months ${days} days`;

}



function setDate(id, data) {
  let options = id.options;
  for(i = 0; i <= options.length; i++) {
    if(options[i].value == data) {
      options[i].selected = 'true';
      break;
    }
  }
}

function optionCreator(list) {
  let option = document.createElement('option');
  option.value = list;
  option.innerText = list;
  return option;
}

function yearCreator() {
  // dayId.disabled = 'true';
  let yL = 100;
  let thisYear = now.getFullYear();
  for(let i = 0; i <= yL; i++) {
    yearId.appendChild(optionCreator(thisYear - i));
    yearIdT.appendChild(optionCreator(thisYear - i));
  }
}
yearCreator();

function monthCreator() {
  monthArr.forEach(element => {
    monthId.appendChild(optionCreator(element));
    monthIdT.appendChild(optionCreator(element));
  });
}
monthCreator();

monthId.onclick = function () {
  let yearValue = document.getElementById('yearF').value;
  let monthValue = document.getElementById('monthF').value;
  daySearching(yearValue, monthValue,'dayF',dayId)
}

monthIdT.onclick = function () {
  let yearValue = document.getElementById('yearT').value;
  let monthValue = document.getElementById('monthT').value;
  daySearching(yearValue, monthValue,'dayT',dayIdT);
  setDate(dayIdT, dayNow);
}

function daySearching(year, month, day2,day3) {
  let day;
  if(month == 'february') {
    if((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
      day = 29;
    } else {
      day = 28;
    }
  } else if ((month == ('january')) || (month == ('march')) || (month == ('may')) || (month == ('july')) || (month == ('august')) || (month == ('october')) || (month == ('december'))) {
    day = 31;
  } else if (month == ('april') || (month == ('june')) || (month == ('september')) || (month == ('november'))) {
    day = 30;
  }
  dayCreator(day,day2,day3);
}


function dayCreator(el,idget,id) {
  document.getElementById(idget).innerHTML = '';
  id.appendChild(optionCreator('dd'));
  for(i = 1; i <= el; i++) {
    id.appendChild(optionCreator(i));
  }
}



setDate(yearIdT, fullYear);
setDate(monthIdT, thisMonth);


if(monthIdT.options.value !== 'mm') {
  let yearValue = document.getElementById('yearT').value;
  let monthValue = document.getElementById('monthT').value;
  daySearching(yearValue, monthValue,'dayT',dayIdT);
}


setDate(dayIdT, dayNow);





const dateSubmit = document.getElementsByClassName('dateSubmit')[0];
dateSubmit.onclick = function () {
  let startDate = new Date(`${dayId.value} ${monthId.value} ${yearId.value}`);
  let endtDate = new Date(`${dayIdT.value} ${monthIdT.value} ${yearIdT.value}`);
  let distance = endtDate.getTime() - startDate.getTime();

  let outPutDistance = document.getElementById('sy-1');
  outPutDistance.innerHTML = `${dateTimeCalculator(distance)}`;

console.log(distance);

console.log(dateTimeCalculator(distance));
}





// footer
if(copyrightStart.innerHTML == fullYear) {
  CopyrightNetxGen.style.display = 'none';
} else {
  copyrightCurrent.innerHTML = fullYear;
}