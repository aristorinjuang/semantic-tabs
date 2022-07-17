"use strict";
const SemanticTabs = (elementId, componentClass = 'semantic-tabs-component', elementClass = 'semantic-tabs-element', head = 'h3', headsID = 'semantic-tabs-heads') => {
    if (elementId === '') {
        elementId = '#semantic-tabs';
    }
    elementId = elementId.substring(1);
    const newHeads = document.createElement('ul');
    newHeads.setAttribute('id', headsID);
    let element = document.getElementById(elementId);
    let children = element.children;
    let i = 0;
    for (let c of children) {
        if (c.tagName === head.toUpperCase()) {
            let newHead = document.createElement('li');
            let wrapper = document.createElement('div');
            c.classList.add('screen-reader-text');
            newHead.addEventListener('click', (e) => {
                var _a;
                let classes = e.target.classList;
                let elements = document.querySelectorAll(`.${componentClass}.${elementClass}`);
                for (let element of elements) {
                    element.setAttribute('style', 'display: none');
                }
                elements = document.querySelectorAll(`.${classes[0]}.${componentClass}.${elementClass}`);
                for (let element of elements) {
                    element.removeAttribute('style');
                }
                elements = document.querySelectorAll(`li.${componentClass}`);
                for (let element of elements) {
                    element.classList.remove('active');
                }
                (_a = document.querySelector(`li.${classes[0]}.${componentClass}`)) === null || _a === void 0 ? void 0 : _a.classList.add('active');
            });
            newHead.textContent = c.textContent;
            newHead.classList.add(`${componentClass}-${i}`);
            newHead.classList.add(componentClass);
            if (i <= 0) {
                newHead.classList.add('active');
            }
            newHeads.appendChild(newHead);
            wrapper.classList.add(`${componentClass}-${i}`);
            wrapper.classList.add(componentClass);
            i++;
        }
        else {
            c.classList.add(`${componentClass}-${i - 1}`);
            c.classList.add(componentClass);
            c.classList.add(elementClass);
            if (i >= 2) {
                c.setAttribute('style', 'display: none');
            }
        }
    }
    element.prepend(newHeads);
};
