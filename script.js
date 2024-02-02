console.log('working')

const dropDownMenu = document.querySelector('.navbar__list__menu--mobile')
const buttonCloseMenu = document.querySelector('.close')
const buttonOpenMenu = document.querySelector('.open')
buttonOpenMenu.addEventListener('click', () => {
    console.log('clicking')
    dropDownMenu.classList.add('opened')
    buttonCloseMenu.classList.remove('hidden')
    buttonOpenMenu.classList.add('hidden')
})
buttonCloseMenu.addEventListener('click', () => {
    dropDownMenu.classList.remove('opened')
    buttonCloseMenu.classList.add('hidden')
    buttonOpenMenu.classList.remove('hidden')
})