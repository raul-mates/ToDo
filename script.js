const renderList = () => {
    const input = document.querySelector('.section__todo__inputs-container__input-wrapper--input');
    const list = document.querySelector('.section__todo__list');
    const form = document.querySelector('.js-form');
    const sort = document.querySelector('.js-sort');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let myArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []

        if (input.value) {
            list.innerHTML = '';
            myArr.push({todo: input.value, isFinished: false});
            localStorage.setItem('todos', JSON.stringify(myArr));
            input.value = '';
        }

        sort.dispatchEvent(new Event('change'));
    })
}

function populateDOM(arr) {
    const list = document.querySelector('.section__todo__list');
    arr.forEach((todo, index) => {
        list.insertAdjacentHTML('beforeend', `
                <li class="section__todo__list--item ${todo.isFinished ? 'finished' : ''}">
                    <p class="section__todo__list--item--value">${todo.todo}</p>
                    <button type="button" data-index="${index}" class="section__todo__list--item--complete button">
                        <ion-icon name="checkmark"></ion-icon>
                    </button>
                    <button type="button" data-index="${index}" class="section__todo__list--item--delete button">
                        <ion-icon name="trash"></ion-icon>
                    </button>
                </li>
            `)
    })
}

const markFinishedOrDelete = () => {
    const list = document.querySelector('.section__todo__list');
    const sort = document.querySelector('.js-sort');

    document.addEventListener('click', (e) => {
        const myArr = JSON.parse(localStorage.getItem('todos'));
        if (e.target.classList.contains('section__todo__list--item--complete')) {
            myArr[e.target.dataset.index].isFinished = true;
            localStorage.setItem('todos', JSON.stringify(myArr));
            list.innerHTML = '';
            sort.dispatchEvent(new Event('change'));
        }

        if (e.target.classList.contains('section__todo__list--item--delete')) {
            myArr.splice(+e.target.dataset.index, 1);
            localStorage.setItem('todos', JSON.stringify(myArr));
            list.innerHTML = '';
            sort.dispatchEvent(new Event('change'));
        }
    })
}

const sortOnChange = () => {
    const sort = document.querySelector('.js-sort');
    const list = document.querySelector('.section__todo__list');

    sort.addEventListener('change', (e) => {
        let myArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
        const sortValue = e.target.value;

        if(sortValue !== 'All') {
            const finishedState = sortValue === 'Finished';
            myArr = myArr.filter((todo) => todo.isFinished === finishedState);
        }
        list.innerHTML = '';
        populateDOM(myArr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let myArr = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
    renderList();
    markFinishedOrDelete();
    sortOnChange();
    populateDOM(myArr);
})

