import Swiper from "swiper";
import { Pagination } from 'swiper/modules';

Swiper.use([Pagination]);

const swiper = new Swiper('.mySwiper', {
    direction: 'horizontal',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        enabled: true,
        type: "bullets",
        el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
});

export const moveArrows = (el: Element, arrow: string) => {
    el.addEventListener("click", () => {
        arrow === 'prev' && swiper.slidePrev();
        arrow === 'next' && swiper.slideNext();
    })
}