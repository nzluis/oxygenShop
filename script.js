console.log('working')

//////////////////NAVBAR - DROPDOWN//////////////////

const dropDownMenu = document.querySelector('.navbar__list__menu--mobile')
const buttonCloseMenu = document.querySelector('.close')
const buttonOpenMenu = document.querySelector('.open')

buttonOpenMenu.addEventListener('click', (e) => {
    console.log('clicking')
    e.stopPropagation()
    dropDownMenu.classList.toggle('opened')
    buttonCloseMenu.classList.toggle('hidden')
    buttonOpenMenu.classList.toggle('hidden')
})

buttonCloseMenu.addEventListener('click', () => {
    dropDownMenu.classList.toggle('opened')
    buttonCloseMenu.classList.toggle('hidden')
    buttonOpenMenu.classList.toggle('hidden')
})

document.addEventListener('click', () => {
    if (Object.values(dropDownMenu.classList).some(element => element === 'opened')) {
        dropDownMenu.classList.toggle('opened')
        buttonCloseMenu.classList.toggle('hidden')
        buttonOpenMenu.classList.toggle('hidden')
    }
})

const navbar = document.querySelector('.navbar')
navbar.addEventListener('click', (e) => {
    e.stopPropagation()
})

//---------------------------------------------------

//////////////////SCROLL %//////////////////

window.addEventListener('scroll', handleScroll);

function handleScroll() {
    const windowScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;  
    const scrolled = (windowScroll / height) * 100;
  
    document.querySelector(".navbar__scrollBar").style.width = scrolled + "%";
    console.log(scrolled)
}

//---------------------------------------------------

