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

const currentDate = `${dayNow} ${thisMonth}, ${fullYear}`;
console.log(currentDate);
const titleTag = document.getElementsByTagName('title');
titleTag[0].innerHTML = currentDate;

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

function dateTimeCalculator2(ds) {

  let s = 1000;
  let m = s * 60;
  let h = m * 60;
  let d = h * 24;
  let mo = d * 30.41;
  let yr = (mo * 12);

  const days = Math.floor(ds / d);


  return `${days} days`;

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



let distanceResultsStore = [];

function dateRelustTable(sl, result, selectTable) {
  let slNumber;
  if(sl <= 9) {
    slNumber = `0${sl}`;
  }else if(sl > 9) {
    slNumber = `${sl}`;
  }
  let htmlRow = `
  <tr>
  <td> ${slNumber} </td>
  <td> <span id="sy-${slNumber}"> ${result} </span></td>
  <td><span id="deleteBtn${slNumber}">Delete</span></td>
  </tr>`;
  selectTable.innerHTML += htmlRow;
}

const dateSubmit = document.getElementsByClassName('dateSubmit')[0];

dateSubmit.onclick = function () {
  
  if(dayId.value === 'dd') {
    dayId.style.borderColor = 'red';
    dayId.style.borderWidth = '2px';
    setTimeout( () => {
      dayId.style.borderWidth = '1px';
      dayId.style.borderColor = 'white';
    }, 1000)
  }else if(dayId.value !== 'dd') {

  let startDate = new Date(`${dayId.value} ${monthId.value} ${yearId.value}`);
  let endtDate = new Date(`${dayIdT.value} ${monthIdT.value} ${yearIdT.value}`);
  let distance = endtDate.getTime() - startDate.getTime();

  let outPutDistance = document.getElementById('sy-1');
  //outPutDistance.innerHTML = `${dateTimeCalculator(distance)} </br> ${dateTimeCalculator2(distance)}`;

  let createDResults = `${dateTimeCalculator(distance)} : ${dateTimeCalculator2(distance)}`;
  
  distanceResultsStore.push(createDResults);

  const storeDistance = localStorage.setItem('dResults', distanceResultsStore);
  const getDistance = localStorage.getItem('dResults');
  const dRSArr = getDistance.split(',');
  // --------------
  
  const selectTable = document.querySelector('.dateOutputArea table');
  selectTable.innerHTML = '';
  let htmlRow = `
  <tr>
  <th>Sl</th>
  <th>Data</th>
  <th>Action</th>
  </tr>`;
  selectTable.innerHTML = htmlRow;

//  --------------
  for(i = dRSArr.length; i > 0; i--) {
    dateRelustTable(dRSArr.length-i+1, dRSArr[i-1], selectTable);
  }
  }
}




// Taydad Calculator Area
const sRow1 = document.getElementById('table');
sRow1.oninput = function percentA() {
  let data1 = document.getElementById('ts1').value;
  let per1 = document.getElementById('per1').value;
  let percent1 = (data1 * (per1 / 100));
  document.getElementById('eq1').value = percent1.toFixed(2);
  document.getElementById('ts2').value = percent1.toFixed(2);

  let data2 = document.getElementById('ts2').value;
  let per2 = document.getElementById('per2').value;
  let percent2 = (data2 * (per2 / 100));
  document.getElementById('eq2').value = percent2.toFixed(2);
  document.getElementById('ts3').value = (percent2 + percent1).toFixed(2);

  let data3 = document.getElementById('ts3').value;
  let per3 = document.getElementById('per3').value;
  let percent3 = (data3 * (per3 / 100));
  document.getElementById('eq3').value = percent3.toFixed(2);

  let total = percent1 + percent2 + percent3;
  console.log(typeof(total));
  document.getElementById('eq4').value = total.toFixed(2);
}


// Circle Area
const barSeconds = document.querySelector('.circleRows');
const barElement = [];

for (let i = 1; i <= 30; i++) {
  barElement.push(
    `<span style="--index:${i}"><p></p></span>`
  );
}
barSeconds.insertAdjacentHTML("afterbegin", barElement.join(""));



// whatsApp Message send Area
function send_handle() {
  const num = document.getElementById("number").value;
  const msg = document.getElementById("msg").value;
  const name = document.getElementById("name").value;
  //window.open(`https://wa.me/${num}?text=I%27m%20api%20msg%20hello%20${name}%20friend%20${msg}`, '_blank');
  
  const win = window.open(`https://wa.me/${num}?text=I%27m%20api%20${name}%20friend%20${msg}`, '_blank');
  win.focus();
}


// footer
if(copyrightStart.innerHTML == fullYear) {
  CopyrightNetxGen.style.display = 'none';
} else {
  copyrightCurrent.innerHTML = fullYear;
}
