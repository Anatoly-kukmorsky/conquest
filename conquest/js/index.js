'use strict'

// элементы взаимодействия
const elements = {
    // элементы меню desctop
    navMenuLinks: document.querySelectorAll(".nav-menu--link"),
    navMenu: document.querySelector(".nav-row"),
    menuActiveClass: `active`,

    // элементы ссылок меню mobail
    navMobaiLinks: document.querySelectorAll(".nav-mobail--link"),
    navMenuMobail: document.querySelector(".nav-menu--mobail"),

    // элементы для переключения между разделами в бургер-меню
    navMenuMobailBlock: document.querySelector(".nav-menu--mobail_block"),
    menuMobailSection: document.querySelectorAll(".menu--mobail_section"),
    menuMobailSectionClass: `emphasis`,

    // элементы взаимодействия для поисовика
    search: document.querySelector("#search"),
    searchBox: document.querySelector(".search-box"),

    // меню-бургер
    menuMobailLinks: document.querySelectorAll(".nav-mobail--link"),
    menuMobail: document.querySelector(".nav-menu--mobail"),
    menuBurger: document.querySelector(".menu-burger"),
    body: document.querySelector(".body"),

    // элементы слайдера
    btnPrev: document.querySelector("#btn-prev"),
    btnNext: document.querySelector("#btn-next"),
    slider: document.querySelector(".slider"),
    sliderCounter: document.querySelector(".slider-counter"),
    sliderItems: Array.from(document.querySelectorAll(".slider-item")),
}

// плавный скролл до якоря
{
    // якоря
    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
        anchor.addEventListener("click", (e) => {
            e.preventDefault()
            const blockID = anchor.getAttribute("href")
            document.querySelector("" + blockID).scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        })
    }
}

// активный/неактивный поисковик
{
    elements.search.addEventListener("focusin", () => {
        elements.searchBox.classList.add("active")
    })

    elements.search.addEventListener("focusout", () => {
        elements.searchBox.classList.remove("active")
    })
}

// активный элемент
{
    const activeLink = (links, menu, className) => {
        links.forEach((link) =>
            link.addEventListener("click", () =>
                menu.querySelector(`.${className}`)
                    ?.classList.remove(className)
                    & link.classList.add(className)
            ))}
    
    activeLink(
        elements.navMenuLinks,
        elements.navMenu,
        elements.menuActiveClass
    )

    activeLink(
        elements.navMobaiLinks,
        elements.navMenuMobail,
        elements.menuActiveClass
    )
    

    activeLink(
        elements.menuMobailSection,
        elements.navMenuMobail,
        elements.menuMobailSectionClass
    )
}

// меню-бургер
{
    // открытие-закрытие меню-бургер
    elements.menuBurger.addEventListener('click', () =>
        elements.menuMobail.classList.toggle('active') &
        elements.menuBurger.classList.toggle('active') &
        elements.body.classList.toggle("scroll-hidden")
    )

    // закрытие меню-бургер после выбора ссылки
    elements.menuMobailLinks.forEach(link =>
        link.addEventListener('click', () =>
            elements.menuMobail.classList.remove("active") &
            elements.menuBurger.classList.remove("active") &
            elements.body.classList.remove("scroll-hidden")
        )
    )

    // переключение по разделам в меню-бургер
    elements.menuMobailSection.forEach(section => 
        section.addEventListener('click', () => 
            elements.navMenuMobailBlock.querySelector('.block')
                ?.classList.remove('block')
                & section.lastElementChild.classList.add('block')
        )
    )
}

// слайдер
{   
    elements.sliderItems.forEach((slide, index) => {
        if (index !== 0) slide.classList.add("none")
        slide.dataset.index = index
        elements.sliderItems[0].setAttribute("data-active", "")
    })

    const showNextSlide = (direction) => {
    
        const currentSlide = elements.slider.querySelector("[data-active]")
        const currentSlideIndex = +currentSlide.dataset.index;

        currentSlide.classList.add("none")
        currentSlide.removeAttribute("data-active")

        const length = elements.sliderItems.length
        let nextSlideIndex

        if (direction === "next") {
            currentSlideIndex + 1 === length
                ? (nextSlideIndex = 0)
                : (nextSlideIndex = currentSlideIndex + 1)
        } else if (direction === "prev") {
            currentSlideIndex === 0
                ? (nextSlideIndex = length - 1)
                : (nextSlideIndex = currentSlideIndex - 1)
        }
    
        const nextSlide = elements.slider.querySelector(`[data-index='${nextSlideIndex}']`)
        nextSlide.classList.remove("none");
        nextSlide.setAttribute("data-active", "");
        elements.sliderCounter.textContent
            = (+nextSlide.dataset.index + 1).toString().padStart(2, '0')
    }

    elements.btnNext.addEventListener("click", () => showNextSlide("next"))
    elements.btnPrev.addEventListener("click", () => showNextSlide("prev"))
}

