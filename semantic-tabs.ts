const SemanticTabs = (
  elementId: string,
  componentClass: string = 'semantic-tabs-component',
  elementClass: string = 'semantic-tabs-element',
  head: string = 'h3',
  headsID: string = 'semantic-tabs-heads'
) => {
  if (elementId === '') {
    elementId = '#semantic-tabs';
  }
  elementId = elementId.substring(1);
  const newHeads: HTMLUListElement = document.createElement('ul');

  newHeads.setAttribute('id', headsID);

  let element: HTMLElement = document.getElementById(elementId)!;
  let children: HTMLCollection = element.children;

  let i: number = 0;
  for (let c of children) {
    if (c.tagName === head.toUpperCase()) {
      let newHead = document.createElement('li');
      let wrapper = document.createElement('div');
  
      c.classList.add('screen-reader-text');

      newHead.addEventListener('click', (e) => {
        let classes: DOMTokenList = (e.target as HTMLInputElement).classList;
        
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

        document.querySelector(`li.${classes[0]}.${componentClass}`)?.classList.add('active');
      })
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
    } else {
      c.classList.add(`${componentClass}-${i - 1}`);
      c.classList.add(componentClass);
      c.classList.add(elementClass);
      if (i >= 2) {
        c.setAttribute('style', 'display: none');
      }
    }
  }
  element.prepend(newHeads);
}