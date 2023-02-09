// 만든사람: 이상우
// 만든기간: 2022-10-25 ~ 2022-10-27

const container = document.querySelector('.container');
const insert__content = document.querySelector('#insert__content');
const list__all__check = document.querySelector('.list__all__check');
const footer = document.querySelector('.footer');
const item__all__btn = document.querySelector('.item__all__btn');
const item__active__btn = document.querySelector('.item__active__btn');
const item__completed__btn = document.querySelector('.item__completed__btn');
const item__clear__btn = document.querySelector('.item__clear__btn');

let content__list = [];

insert__content.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const content = insert__content.value;

        if (content === '') {
            alert('내용을 입력해주세요!');
        } else {
            AddToDoList(content);
            insert__content.value = '';
        }
    }
});

list__all__check.addEventListener('click', () => {
    ToDoListAllCheck();
    ToDoListCount();
});

item__all__btn.addEventListener('click', () => {
    ToDoListFooterBtn('all');
});

item__active__btn.addEventListener('click', () => {
    ToDoListFooterBtn('active');
});

item__completed__btn.addEventListener('click', () => {
    ToDoListFooterBtn('completed');
});

item__clear__btn.addEventListener('click', () => {
    ToDoListFooterBtn('clear');
});

function AddToDoList(content) {
    const content__div = document.createElement('div');
    content__div.setAttribute('class', 'content');
    content__div.setAttribute('data-checked', 'false');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('class', 'checkbox');
    checkbox.setAttribute('type', 'checkbox');

    const content__text = document.createElement('span');
    content__text.setAttribute('class', 'content__text');

    content__text.textContent = content;

    const delete__btn = document.createElement('i');
    delete__btn.setAttribute('class', 'fa-solid fa-x');

    content__div.appendChild(checkbox);
    content__div.appendChild(content__text);
    content__div.appendChild(delete__btn);

    container.insertBefore(content__div, footer);

    ToDoListCount();

    checkbox.addEventListener('click', (e) => {
        CheckBoxChecked(checkbox.checked, content__text, content__div);
        ToDoListCount();
    });

    content__text.addEventListener('dblclick', () => {
        UpdataToDoList(content__div);
    });

    delete__btn.addEventListener('click', (e) => {
        DeleteToDoList(content__div);
    });
}

function ToDoListAllCheck() {
    const content__div = document.querySelectorAll('.content');
    const content__div__checkbox = document.querySelectorAll(
        ".content input[type='checkbox']"
    );
    const content__span = document.querySelectorAll('.content span');
    const checkbox__value = [];

    content__div__checkbox.forEach((value, index) => {
        checkbox__value.push(content__div__checkbox[index].checked);
    });

    content__div__checkbox.forEach((value, index) => {
        if (checkbox__value.indexOf(false) === 0) {
            CheckBoxChecked(true, content__span[index], content__div[index]);
            content__div__checkbox[index].checked = true;
        } else {
            CheckBoxChecked(false, content__span[index], content__div[index]);
            content__div__checkbox[index].checked = false;
        }
    });
}

function UpdataToDoList(content__div) {
    let removed = false;
    const content__div__checkbox = content__div.childNodes;
    console.log();
    content__div__checkbox[0].style.display = 'none';
    content__div__checkbox[1].style.display = 'none';
    content__div__checkbox[2].style.display = 'none';

    const updateContent = document.createElement('input');
    updateContent.setAttribute('type', 'text');
    content__div.appendChild(updateContent);
    updateContent.focus();

    updateContent.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const content = updateContent.value;
            if (content === '') {
            } else {
                removed = true;
                content__div__checkbox[1].textContent = content;

                content__div__checkbox[0].style.display = 'inline-block';
                content__div__checkbox[1].style.display = 'inline-block';
                content__div__checkbox[2].style.display = 'inline-block';
                updateContent.remove();
            }
        }
    });

    updateContent.addEventListener('blur', () => {
        const content = updateContent.value;
        if (removed) {
            return;
        }

        if (content === '') {
            content__div__checkbox[0].style.display = 'inline-block';
            content__div__checkbox[1].style.display = 'inline-block';
            content__div__checkbox[2].style.display = 'inline-block';
            updateContent.remove();
            return;
        }

        content__div__checkbox[1].textContent = content;

        content__div__checkbox[0].style.display = 'inline-block';
        content__div__checkbox[1].style.display = 'inline-block';
        content__div__checkbox[2].style.display = 'inline-block';
        updateContent.remove();
    });
}

function DeleteToDoList(content__div) {
    container.removeChild(content__div);
    ToDoListCount();
}

function CheckBoxChecked(checked, content__text, content__div) {
    if (checked) {
        content__text.style.fontStyle = 'italic';
        content__text.style.textDecoration = 'line-through';
        content__text.style.color = '#dcdcdc';
        content__div.dataset.checked = 'true';
    } else {
        content__text.style.fontStyle = 'normal';
        content__text.style.textDecoration = 'none';
        content__text.style.color = '#000000';
        content__div.dataset.checked = 'false';
    }
}

function ToDoListCount() {
    const content__div = document.querySelectorAll(
        ".content input[type='checkbox']"
    );
    const item__count = document.querySelector('.item__count');

    let listCount = 0;

    content__div.forEach((value, index) => {
        if (!content__div[index].checked) {
            listCount++;
        }
    });

    item__count.innerHTML = `${listCount} items left`;
}

function ToDoListFooterBtn(type) {
    const content__div = document.querySelectorAll('.content');
    if (type === 'all') {
        content__div.forEach((value, index) => {
            content__div[index].style.display = 'block';
        });
    } else if (type === 'active') {
        content__div.forEach((value, index, a) => {
            if (value.dataset.checked === 'false') {
                content__div[index].style.display = 'block';
            } else {
                content__div[index].style.display = 'none';
            }
        });
    } else if (type === 'completed') {
        content__div.forEach((value, index, a) => {
            if (value.dataset.checked === 'true') {
                content__div[index].style.display = 'block';
            } else {
                content__div[index].style.display = 'none';
            }
        });
    } else {
        content__div.forEach((value, index, a) => {
            if (value.dataset.checked === 'true') {
                container.removeChild(content__div[index]);
            }
        });
    }
}
