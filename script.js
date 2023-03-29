'use strict';
const recParent = document.querySelectorAll('.rec-style');
const recDays = document.querySelectorAll('.rec');
const currentDayInWeek = new Date().getDay();

const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

// get today day
const getDay = days[currentDayInWeek];

const today = document.querySelector(`.rectangles .${getDay} .rec`);
//set rec color for today
today.style.backgroundColor = 'var(--cyan-primary)';

// Set rectangle height based on Json files;
const amounts = [];
async function getAmounts() {
  try {
    const res = await fetch('./data.json');
    const data = await res.json();

    data.forEach((data) => {
      document.querySelector(`.rectangles .${data.day} .rec`).style.height = `${
        data.amount * 2.5
      }px`;
      // get the amount data for the after task.
      amounts.push(data.amount);
    });
  } catch (err) {
    console.error(err);
  }
}

// Diplay amount of every day when hover on rec .
// how to do that ?

// 1.select event listeners on hevering on rec .
// 2.create a div and add to it a class and style the class in css.
// 3.get the amount in array .
// 4.loop on every rec to hover on each of them .
// 5.loop over the arr and add evey amount to the innerhtml of the div .

recDays.forEach((rec) => {
  rec.addEventListener('mouseenter', (e) => {
    const curRec = e.target;
    const amountDiv = document.createElement('div');
    amountDiv.classList.add('amount');
    // console.log(amountDiv);
    amountDiv.style.display = 'flex';
    amountDiv.style.transition = 'all 0.2s ease-in-out';
    amountDiv.style.opacity = 1;

    const parentDiv = e.target.closest('.rec-style');
    parentDiv.insertBefore(amountDiv, parentDiv.firstChild);

    amounts.forEach((amount, i) => {
      if (e.target === recDays[i]) amountDiv.innerHTML = `$${amount}`;
    });
    if (curRec.style.backgroundColor === 'var(--cyan-primary)') {
      curRec.style.backgroundColor = 'hsl(186, 34%, 80%)';
    } else {
      curRec.style.backgroundColor = 'hsl(10, 79%, 80%)';
    }
  });

  // when mouse out the rec reset everything.
  rec.addEventListener('mouseout', (e) => {
    const curRec = e.target;
    const curRecParent = curRec.parentNode;
    console.log(curRec.style.backgroundColor);
    if (curRecParent.firstChild.className === 'amount') {
      if (curRec.style.backgroundColor === 'rgb(187, 218, 221)') {
        curRec.style.backgroundColor = 'var(--cyan-primary)';
        curRecParent.firstChild.style.display = 'none';
      } else {
        curRecParent.firstChild.style.display = 'none';
        curRec.style.backgroundColor = 'var(--soft-red-primary)';
      }
    }
  });
});
getAmounts();
