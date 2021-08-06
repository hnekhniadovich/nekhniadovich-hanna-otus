//Написать алгоритм и функцию getPath(), находяющую уникальный 
//css-селектор для элемента в документе. Уникальный селектор 
//может быть использован document.querySelector() и 
//возвращать исходный элемент. Так чтобы document.querySelectorAll(), 
//вызванный с этим селектором, не должен находить никаких элементов, 
//кроме исходного.

let element = document.querySelector('.bar');

const getPath = (el) => {
    let path = [];
    let parent;
    
    while (el.parentNode && el.tagName !== 'HTML') {
      parent = el.parentNode;
      let tag = el.tagName;
      let siblings = parent.children;
      path.unshift(
        el.id ? `#${el.id}` : 
        (
          [...siblings].filter(sibling => sibling.tagName === tag).length === 1 
            ? 
          tag 
            :
          `${tag}:nth-child(${ 1 + [...siblings].indexOf(el) })`
        )
      );
      el = parent;
    };
    return `${path.join(' > ')}`.toLowerCase();
};

console.log('result', getPath(element))