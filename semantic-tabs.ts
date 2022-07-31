const SemanticTabs = (
  elements: string = 'semantic-tabs',
  componentClass: string = 'semantic-tabs-component',
  elementClass: string = 'semantic-tabs-element',
  head: string = 'h3',
  heads: string = 'semantic-tabs-heads'
) => {
  let htmlElements = document.getElementsByClassName(elements);
  let htmlElementIndex = 0;

  for (let htmlElement of htmlElements) {
    let componentClassIndex = `${componentClass}-${htmlElementIndex}`;
    let newHeads: HTMLUListElement = document.createElement('ul');

    newHeads.classList.add(heads);

    let children: HTMLCollection = htmlElement.children;
    let i: number = 0;

    for (let c of children) {
      if (c.tagName === head.toUpperCase()) {
        c.classList.add('screen-reader-text');

        let newHead = document.createElement('li');

        newHead.addEventListener('click', (e) => {
          let classes: DOMTokenList = (e.target as HTMLInputElement).classList;
          let allElements: string = `.${classes[0]}.${elementClass}`;
          let selectedElement: string = `.${classes[1]}.${elementClass}`;
          let allHeads: string = `li.${classes[0]}`;
          let selectedHead: string = `li.${classes[1]}`;

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

          document.querySelector(selectedHead)?.classList.add('active');
        })
        newHead.textContent = c.textContent;
        newHead.classList.add(componentClassIndex);
        newHead.classList.add(`${componentClassIndex}-${i}`);
        if (i <= 0) {
          newHead.classList.add('active');
        }
        newHeads.appendChild(newHead);

        i++;
      } else {
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
}