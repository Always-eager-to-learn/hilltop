import './styles/variables.css'
import './styles/base.css'
import './styles/header.css'
import './styles/main.css'
import './styles/footer.css'
import './styles/responsive.css'
import { createIcons, icons } from 'lucide'

const navigationBar = document.getElementById('mainNavigation')
const openButton = document.querySelector('.mobile-nav')
const closeButton = document.querySelector('.mobile-close-nav')
const navigationIcons = document.querySelectorAll('.nav-item a')
const searchOpen = document.querySelector('.open-search')
const searchClose = document.querySelector('.search-close')
const searchDrawer = document.querySelector('.search-drawer')
const sliderLeft = document.querySelector('.slider-left')
const sliderRight = document.querySelector('.slider-right')
const slider = document.querySelector('.slider')
const sliderItems = document.querySelectorAll('.slider-image')
const totSlides = sliderItems.length

let currentLocation = Math.floor(Math.random() * 3)
let location = 0

function toggle(location = 0){
    navigationIcons[location].classList.toggle('active')
}

function setSvg(){
    const svgL = document.createElement('i')
    svgL.setAttribute('data-lucide', 'arrow-big-left-dash')
    svgL.setAttribute('aria-hidden', true)
    sliderLeft.append(svgL)

    const svgR = document.createElement('i')
    svgR.setAttribute('data-lucide', 'arrow-big-right-dash')
    svgR.setAttribute('aria-hidden', true)
    sliderRight.append(svgR)

    createIcons({icons})
}

function toggleNavigation(element){
    element.classList.toggle('active');
}

function navigationBarSettings(){
    openButton.addEventListener('click', () => {
        toggleNavigation(navigationBar)
    })

    closeButton.addEventListener('click', () => {
        toggleNavigation(navigationBar)
    })
}

function escapeKeyNavigation(){
    document.addEventListener('keydown', (event) => {
        if(navigationBar.classList.contains('active')){
            if(event.key === 'Escape')
                toggleNavigation(navigationBar)
        }
        else if(searchDrawer.classList.contains('active')){
            if(event.key == 'Escape')
                toggleNavigation(searchDrawer)
        }
    })
}

function navigationColor(){
    navigationIcons.forEach((item, index) => {
        item.addEventListener('click', () => {
            toggle(location)
            location = index
            toggle(location)
        })
    })
}

function searchBar(){
    searchOpen.addEventListener('click', () => {
        toggleNavigation(searchDrawer)
    })

    searchClose.addEventListener('click', () => {
        toggleNavigation(searchDrawer)
    })
}

function slideImages(){
    
    if(slider && sliderItems.length > 0){
        const updateSlider = (left) => {
            sliderItems[currentLocation].classList.remove('active')

            if(!left){
                currentLocation = (currentLocation + 1) % totSlides
                sliderItems[currentLocation].classList.add('active')
            }

            else{
                currentLocation = (currentLocation - 1)
                if(currentLocation < 0)
                    currentLocation = totSlides - 1
                sliderItems[currentLocation].classList.add('active')
            }
        }

        sliderLeft.addEventListener('click', () => {
            updateSlider(true)
        })

        sliderRight.addEventListener('click', () => {
            updateSlider(false)
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    navigationIcons[0].classList.toggle('active')
    sliderItems[currentLocation].classList.toggle('active')

    setSvg()
    navigationBarSettings()
    escapeKeyNavigation()
    navigationColor()
    searchBar()
    slideImages()
})