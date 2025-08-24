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
const searchOpen = document.querySelector('.open-search')
const searchClose = document.querySelector('.search-close')
const searchDrawer = document.querySelector('.search-drawer')

function toggle(location = 0){
    navigationIcons[location].classList.toggle('active')
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

document.addEventListener('DOMContentLoaded', () => {
    navigationIcons[0].classList.toggle('active')

    navigationBarSettings()
    escapeKeyNavigation()
    navigationColor()
    searchBar()
})