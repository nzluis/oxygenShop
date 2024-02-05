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
form.addEventListener('submit', (event) => {
    
    if (!checkbox.checked) {
        checkbox.classList.add("invalid")
        event.preventDefault()
    }

    if (form_name.value.length < 2 || form_name.value.length > 100) {
        form_name.classList.add("input-invalid")
        event.preventDefault()
    }

    if (!emailRegex.test(email.value) ){
        console.log(emailRegex.test(email.value))
        email.classList.add("input-invalid")
        event.preventDefault()
    } else {
        email.classList.remove("input-invalid")
    }
})

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
//---------------------------------------------------

//////////////////FETCH JSON//////////////////
//---------------------------------------------------
//////////////////POPUP MODAL//////////////////
//---------------------------------------------------
//////////////////CURRENCY SELECTOR//////////////////
//---------------------------------------------------
//////////////////SLIDER//////////////////
//---------------------------------------------------