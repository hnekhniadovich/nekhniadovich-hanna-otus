//Написать алгоритм и функцию getPath(), находяющую уникальный 
//css-селектор для элемента в документе. Уникальный селектор 
//может быть использован document.querySelector() и 
//возвращать исходный элемент. Так чтобы document.querySelectorAll(), 
//вызванный с этим селектором, не должен находить никаких элементов, 
//кроме исходного.

let element = document.querySelector('#container');

const getPath = (el) => {
    let path = [], parent;
    while (parent = el.parentNode) {
      let tag = el.tagName, siblings;
      path.unshift(
        el.id ? `#${el.id}` : (
          siblings = parent.children,
          [].filter.call(siblings, sibling => sibling.tagName === tag).length === 1 ? tag :
          `${tag}:nth-child(${1+[].indexOf.call(siblings, el)})`
        )
      );
      el = parent;
    };
    return `${path.join(' > ')}`.toLowerCase();
};