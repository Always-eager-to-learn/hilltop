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
const sliderLeftButtons = document.querySelectorAll('.slider-left')
const sliderRightButtons = document.querySelectorAll('.slider-right')
const dictSliders = {
    'image': 0,
    'testimonial': 1
}

let location = 0
let sliderList, sliderLength, sliderLocation;

function toggle(location = 0){
    navigationIcons[location].classList.toggle('active')
}

function setSvg(){
    const svgL = document.createElement('i')
    svgL.setAttribute('data-lucide', 'arrow-big-left-dash')
    svgL.setAttribute('aria-hidden', true)
    sliderLeftButtons[0].append(svgL)

    const svgR = document.createElement('i')
    svgR.setAttribute('data-lucide', 'arrow-big-right-dash')
    svgR.setAttribute('aria-hidden', true)
    sliderRightButtons[0].append(svgR)

    createIcons({ icons })
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

function setLength(){
    let length = Object.keys(sliderList).length
    let lengthArray = []
    for(let i = 0; i < length; i++){
        lengthArray.push(sliderList[i].length)
    }

    return lengthArray
}

function randomPosition(){
    sliderLength.forEach((element, index) => {
        const randNum = Math.floor(Math.random() * element)
        sliderLocation[index] = randNum
        sliderList[index][randNum].classList.add('active')
    })
}

function slideImages(){
    const updateSlider = (left, targetName) => {
        const targetNum = dictSliders[targetName]
        let locationS = sliderLocation[targetNum]
        const item = sliderList[targetNum]
        item[locationS].classList.remove('active')

        if(!left){
            locationS = (locationS + 1) % sliderLength[targetNum]
            item[locationS].classList.add('active')
        }

        else{
            locationS = (locationS - 1)
            if(locationS < 0)
                locationS = sliderLength[targetNum] - 1
            item[locationS].classList.add('active')
        }

        sliderLocation[targetNum] = locationS
    }

    sliderLeftButtons.forEach((sliderLeft) => {
        sliderLeft.addEventListener('click', (event) => {
            updateSlider(true, event.currentTarget.dataset.item)
        })
    })

    sliderRightButtons.forEach((sliderRight) => {
        sliderRight.addEventListener('click', (event) => {
            updateSlider(false, event.currentTarget.dataset.item)
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    sliderList = {
        0: document.querySelectorAll('.slider-image'), 
        1: document.querySelectorAll('.testimonial')
    }
    sliderLength = setLength()
    sliderLocation = sliderLength.map(() => 0)

    navigationIcons[0].classList.toggle('active')
    randomPosition()

    setSvg()
    navigationBarSettings()
    escapeKeyNavigation()
    navigationColor()
    searchBar()
    slideImages()
})
