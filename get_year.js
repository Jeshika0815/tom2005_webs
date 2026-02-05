// get_year.js
document.addEventListener('amica:rendered', () => {
dat = new Date();
const year = dat.getFullYear();
let disp = document.querySelector('#year');
disp.innerHTML = year;
console.log(year);
});
