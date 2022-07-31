"use strict";
const SemanticTabs = (elements = 'semantic-tabs', componentClass = 'semantic-tabs-component', elementClass = 'semantic-tabs-element', head = 'h3', heads = 'semantic-tabs-heads') => {
    let htmlElements = document.getElementsByClassName(elements);
    let htmlElementIndex = 0;
    for (let htmlElement of htmlElements) {
        let componentClassIndex = `${componentClass}-${htmlElementIndex}`;
        let newHeads = document.createElement('ul');
        newHeads.classList.add(heads);
        let children = htmlElement.children;
        let i = 0;
        for (let c of children) {
            if (c.tagName === head.toUpperCase()) {
                c.classList.add('screen-reader-text');
                let newHead = document.createElement('li');
                newHead.addEventListener('click', (e) => {
                    var _a;
                    let classes = e.target.classList;
                    let allElements = `.${classes[0]}.${elementClass}`;
                    let selectedElement = `.${classes[1]}.${elementClass}`;
                    let allHeads = `li.${classes[0]}`;
                    let selectedHead = `li.${classes[1]}`;
                    let elements = document.querySelectorAll(allElements);
                    for (let element of elements) {
                        element.setAttribute('style', 'display: none');
                    }
                    elements = document.querySelectorAll(selectedElement);
                    for (let element of elements) {
                        element.removeAttribute('style');
                    }
                    elements = document.querySelectorAll(allHeads);
                    for (let element of elements) {
                        element.classList.remove('active');
                    }
                    (_a = document.querySelector(selectedHead)) === null || _a === void 0 ? void 0 : _a.classList.add('active');
                });
                newHead.textContent = c.textContent;
                newHead.classList.add(componentClassIndex);
                newHead.classList.add(`${componentClassIndex}-${i}`);
                if (i <= 0) {
                    newHead.classList.add('active');
                }
                newHeads.appendChild(newHead);
                i++;
            }
            else {
                c.classList.add(componentClassIndex);
                c.classList.add(`${componentClassIndex}-${i - 1}`);
                c.classList.add(elementClass);
                if (i >= 2) {
                    c.setAttribute('style', 'display: none');
                }
            }
        }
        htmlElement.prepend(newHeads);
        htmlElementIndex++;
    }
};
