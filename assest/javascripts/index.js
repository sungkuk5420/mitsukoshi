const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');
const scrollArea34 = document.querySelector('.scroll-area.page3-4');
const scrollArea67 = document.querySelector('.scroll-area.page6-7');
const scrollArea910 = document.querySelector('.scroll-area.page9-10');
const page5 = document.querySelector('.page5');
const page6 = document.querySelector('.page6');
const page7 = document.querySelector('.page7');
const page8 = document.querySelector('.page8');
const page9 = document.querySelector('.page9');
const page10 = document.querySelector('.page10');
const page11 = document.querySelector('.page11');
const page12 = document.querySelector('.page12');
const page13 = document.querySelector('.page13');
const page14 = document.querySelector('.page14');
const page15 = document.querySelector('.page15');
const page16 = document.querySelector('.page16');
const page17 = document.querySelector('.page17');

window.handleClickMenu = () => {
    page2.classList.add('show');
}
window.handleClickServiceBooking = () => {
    console.log('handleClickServiceBooking');
    page1.classList.add('hide');
    page2.classList.add('hide');
    scrollArea34.classList.remove('hide');
}
window.handleClickBooking = () => {
    console.log('handleClickBooking');
    scrollArea34.classList.add('hide');
    page5.classList.remove('hide');
}
window.handleClickAttendBooking = () => {
    console.log('handleClickAttendBooking');
    page5.classList.add('hide');
    scrollArea67.classList.remove('hide');
}
window.handleClick13Booking = () => {
    console.log('handleClickServiceBooking');
    scrollArea67.classList.add('hide');
    page8.classList.remove('hide');
}
window.handleClickNextOnPage8 = () => {
    console.log('handleClickServiceBooking');
    page8.classList.add('hide');
    scrollArea910.classList.remove('hide');
}
window.handleClickNextOnPage10 = () => {
    console.log('handleClickServiceBooking');
    scrollArea910.classList.add('hide');
    page11.classList.remove('hide');
}