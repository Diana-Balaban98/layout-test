const articleList = document.getElementById('cards__list');
const articles = articleList.getElementsByClassName('cards__item');
const moreArticlesBtn = document.getElementById('more__articles');

export const showAllCards = () => {
    for (let i = 0; i < 3; i++) {
        articles[i].classList.add('show');
    }
};

export const showMoreArticles = () => {
    moreArticlesBtn.addEventListener('click', () => {
        for (let i = 3; i < articles.length; i++) {
            articles[i] && articles[i].classList.toggle('show');
        }
    });
};