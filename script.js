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

const scroll_bar = document.querySelector(".navbar__scrollBar")

window.addEventListener('scroll', () => {
    scroll_bar.style.width = handleScroll() + "%";
});

function handleScroll() {
    const windowScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;  
    const scrolled = (windowScroll / height) * 100;
    return scrolled
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

function emailValidation(emailNode, test) {
    if(test.test(emailNode.value)) {
        emailNode.setCustomValidity("");
        emailNode.classList.remove("input-invalid")
    } else {
        emailNode.setCustomValidity("A proper email name, please");
        emailNode.classList.add("input-invalid")
    }
}

email.addEventListener('input', () => {
    emailValidation(email, emailRegex)
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
        fetchData(email, form_name, checkbox)
        form.reset()
    }
})

document.addEventListener("DOMContentLoaded", function() {
    form.reset()
});

//---------------------------------------------------

//////////////////FETCH JSON//////////////////

async function fetchData(emailNode, nameNode, checkboxNode) {
    try {  
        let response = {}
        if (emailNode && !nameNode) {
            response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify({
                    email: emailNode.value,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                })
        }
        if (emailNode && nameNode && checkboxNode) {
            response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify({
                    email: emailNode.value,
                    name: nameNode.value,
                    consent: checkboxNode.checked,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }
        
        const data = await response.json()
        if (data.name && data.email )alert(`Form successfully completed for ${data.name} and email account: ${data.email}`)
        if (data.email && !data.name)alert(`Successfully joined our newsletter ${data.email}`)
    } catch (error) {
            console.log(error.message)
    }
 } 

//---------------------------------------------------

//////////////////POPUP MODAL//////////////////

const modal = document.querySelector(".modal__section")

if (!localStorage.getItem('modal_memory')) {
    timer = setTimeout(() => {
        localStorage.setItem('modal_memory', JSON.stringify(true));
        modal.classList.add("modal--active")
    },5000)
    window.addEventListener('scroll', () => {
        if (!localStorage.getItem('modal_memory')) {
            if (handleScroll() >= 25) {
                clearTimeout(timer)
               localStorage.setItem('modal_memory', JSON.stringify(true));
               modal.classList.add("modal--active")
           }
        }
    });
}

const modalExit = document.querySelector(".modalExit")
// If press X button
modalExit.addEventListener( 'click', () => {
    modal.classList.remove("modal--active")
})
//If click outside modal
document.addEventListener('click', () => {
    if (Object.values(modal.classList).some(element => element === 'modal--active')) {
        modal.classList.remove('modal--active')
    }
})
const modalContainer = document.querySelector('.modal__section__container')
modalContainer.addEventListener('click', (e) => {
    e.stopPropagation()
})
//If press Esc
document.addEventListener('keydown', (e) => {
    if (Object.values(modal.classList).some(element => element === 'modal--active')) {
        if (e.key === "Escape") {
            modal.classList.remove('modal--active')
        }
    }
})

const modal_email = document.querySelector(".modal_email--input")
const newsletter = document.querySelector(".modal__section__container__content--form")

modal_email.addEventListener('input', () => {
    emailValidation(modal_email, emailRegex)
})

newsletter.addEventListener('submit', (event) => {
    const emailOk = emailRegex.test(modal_email.value)
    event.preventDefault()

    if (!emailOk){
        modal_email.classList.add("input-invalid")
    } else {
        fetchData(modal_email)
        newsletter.reset()
        modal.style.display = 'none'
    }
})

document.addEventListener("DOMContentLoaded", function() {
    newsletter.reset()
});

//---------------------------------------------------

//////////////////CURRENCY SELECTOR//////////////////

const usd_container = document.querySelector(".priceCards__buttonsCurrency__usd_container")
const gbp_container = document.querySelector(".priceCards__buttonsCurrency__gbp_container")
const eur_container = document.querySelector(".priceCards__buttonsCurrency__eur_container")
const currency = document.querySelectorAll(".currency")
const currencyValue = document.querySelectorAll(".currencyValue")
const defaultValues = [0,25,60];

function add_class(container) {
    container.classList.add("selected")
}
function remove_class(container) {
    container.classList.remove("selected")
}

usd_container.addEventListener('click', () => {
    add_class(usd_container)
    remove_class(eur_container)
    remove_class(gbp_container)
    currency.forEach(spanCurrencyNode => {
        spanCurrencyNode.textContent = "$"
    })
    currencyValue[1].textContent = defaultValues[1]
    currencyValue[2].textContent = defaultValues[2]
})

eur_container.addEventListener('click', () => {
    add_class(eur_container)
    remove_class(usd_container)
    remove_class(gbp_container)
    currency.forEach(spanCurrencyNode => {
        spanCurrencyNode.textContent = "€"
    })
    currencyValue.forEach((spanValueNode, i) => {
        spanValueNode.textContent = Math.round(defaultValues[i] * usdToEurExchange)
    })
})

gbp_container.addEventListener('click', () => {
    add_class(gbp_container)
    remove_class(eur_container)
    remove_class(usd_container)
    currency.forEach(spanCurrencyNode => {
        spanCurrencyNode.textContent = "£"
    })
    currencyValue.forEach((spanValueNode, i) => {
        spanValueNode.textContent = Math.round(defaultValues[i]* usdToGbpExchange)
    })
})

async function fetchCurrency() {
    const response = await fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json", {
        method: 'GET',
    })
    const data = await response.json()
    return data.usd
}
let usdToEurExchange
let usdToGbpExchange
fetchCurrency().then((data) => usdToEurExchange = data.eur)
fetchCurrency().then((data) => usdToGbpExchange = data.gbp)

//---------------------------------------------------

//////////////////SLIDER//////////////////

const slides = document.querySelectorAll(`.slider__container__slide`)
const dots = document.querySelectorAll('.slider__container__dots__dot')

class Slider {
    // id
    // constructor(id) {
    //     this.id = id
    // }
    
    currentSlide = 0;
    maxSlide = slides.length - 1;

    slidePosition = () => {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - this.currentSlide)}%)`;
        });
    }

    nextSlide = () => {
        this.currentSlide === this.maxSlide ? this.currentSlide = 0 : this.currentSlide++
    } 

    previousSlide = () => {
        this.currentSlide === 0 ? this.currentSlide = this.maxSlide : this.currentSlide--
    }
    
    updateDots = () => {
        dots.forEach( (dot, index) => {
            index === this.currentSlide ? dot.classList.add('selected') : dot.classList.remove('selected')
        })
    }

    setAutomatic = () =>  setTimeout(() => {
        this.nextSlide()
        this.slidePosition()
        this.updateDots()
        this.setAutomatic()
    },5000)

}

const slider = new Slider("slider")
slider.slidePosition()
slider.setAutomatic()

const nextButton = document.querySelector('.slider__container__next')
const prevButton = document.querySelector('.slider__container__prev')

nextButton.addEventListener('click', () => {
    slider.nextSlide()
    slider.slidePosition()
    slider.updateDots()
})

prevButton.addEventListener('click', () => {
    slider.previousSlide()
    slider.slidePosition()
    slider.updateDots()
})

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        slider.currentSlide = index
        slider.slidePosition()
        slider.updateDots()
    })
})
//---------------------------------------------------