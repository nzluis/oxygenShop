console.log('working')

//////////////////NAVBAR - DROPDOWN//////////////////

const dropDownMenu = document.querySelector('.navbar__list__menu--mobile')
const buttonCloseMenu = document.querySelector('.close')
const buttonOpenMenu = document.querySelector('.open')

buttonOpenMenu.addEventListener('click', (e) => {
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
}

//---------------------------------------------------

//////////////////RETURN TO TOP//////////////////

const returnTopButton = document.querySelector('.returnTop')

returnTopButton.addEventListener('click', handleReturnTop)

function handleReturnTop() {
    document.documentElement.scrollTop = 0
}

//---------------------------------------------------

//////////////////FORM VALIDATION//////////////////
const form = document.querySelector(".contactForm__form")
let email = document.querySelector(".contactForm__form__email")
const form_name = document.querySelector(".contactForm__form__name")
const checkbox = document.querySelector(".contactForm__form__consent__checkbox")
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

form_name.addEventListener('input', () => {

    if (form_name.value.length < 2 || form_name.value.length > 100) {
        form_name.classList.add("input-invalid")
        form_name.setCustomValidity("Name must contain at least 2 characters")
    } else {
        form_name.setCustomValidity("")
        form_name.classList.remove("input-invalid")
    }
})

checkbox.addEventListener("input", () => {

    if (checkbox.checked) {
        checkbox.classList.remove("invalid")
        checkbox.setCustomValidity("")
    } else {
        checkbox.setCustomValidity("Please click here")
        checkbox.classList.add("invalid")
    }
});

email.addEventListener('input', () => {

    if(emailRegex.test(email.value)) {
        email.setCustomValidity("");
        email.classList.remove("input-invalid")
    } else {
        email.setCustomValidity("A proper email name, please");
        email.classList.add("input-invalid")
    }
})

form.addEventListener('submit', (event) => {
    const checkboxOk = checkbox.checked
    const nameOk = form_name.value.length >= 2 && form_name.value.length <= 100
    const emailOk = emailRegex.test(email.value)
    event.preventDefault()

    if (!checkboxOk) {
        checkbox.classList.add("invalid")
    }

    if (!nameOk) {
        form_name.classList.add("input-invalid")
    }

    if (!emailOk){
        email.classList.add("input-invalid")
    }

    if (checkboxOk && nameOk && emailOk) {
        fetchData()
    }
})

document.addEventListener("DOMContentLoaded", function() {
    form.reset()
});

//---------------------------------------------------

//////////////////FETCH JSON//////////////////

async function fetchData() {
    try {  
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
            name: form_name.value,
            email: email.value,
            consent: checkbox.checked,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        const data = await response.json()
        alert(`Form successfully completed for ${data.name} and email account: ${data.email}`)
        form.reset()
    } catch (error) {
            console.log(error.message)
    }
 } 

//---------------------------------------------------

//////////////////POPUP MODAL//////////////////

const modal = document.querySelector(".modal__section")
if (!localStorage.getItem('modal_memory')) {
    localStorage.setItem('modal_memory', JSON.stringify(true));
    setTimeout(() => {
        modal.classList.add("modal--active")
    },1000)
}

const modalExit = document.querySelector(".modalExit")
modalExit.addEventListener( 'click', () => {
    modal.classList.remove("modal--active")
})

document.addEventListener('click', () => {
    if (Object.values(modal.classList).some(element => element === 'modal--active')) {
        modal.classList.remove('modal--active')
    }
})

const modalContainer = document.querySelector('.modal__section__container')
modalContainer.addEventListener('click', (e) => {
    e.stopPropagation()
})

document.addEventListener('keydown', (e) => {
    if (Object.values(modal.classList).some(element => element === 'modal--active')) {
        if (e.key === "Escape") {
            modal.classList.remove('modal--active')
        }
    }
})

//---------------------------------------------------

//////////////////CURRENCY SELECTOR//////////////////
//---------------------------------------------------
//////////////////SLIDER//////////////////
//---------------------------------------------------