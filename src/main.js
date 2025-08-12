import './styles/variables.css'
import './styles/base.css'
import './styles/header.css'
import './styles/main.css'
import './styles/footer.css'
import './styles/responsive.css'

const navigationBar = document.getElementById('mainNavigation')
const openButton = document.querySelector('.mobile-nav')
const closeButton = document.querySelector('.mobile-close-nav')
const navigationIcons = document.querySelectorAll('.nav-item a')
let location = 0

function toggle(location = 0){
    navigationIcons[location].classList.toggle('active')
}

function openNavigation(){
    openButton.addEventListener('click', () => {
        navigationBar.classList.toggle('active')
    })
}

function closeNavigation(){
    closeButton.addEventListener('click', () => {
        navigationBar.classList.toggle('active')
    })
}

function escapeKeyNavigation(){
    document.addEventListener('keydown', (event) => {
        if(navigationBar.classList.contains('active')){
            if(event.key === 'Escape')
                navigationBar.classList.toggle('active')
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

document.addEventListener('DOMContentLoaded', () => {
    navigationIcons[0].classList.toggle('active')

    openNavigation()
    closeNavigation()
    escapeKeyNavigation()
    navigationColor()
})