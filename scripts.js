
(function(){
  let currentElement;
  let nextElement;
  let previousElement;
  let parentElement;
  let childrenElement;

  let offsetX;
  let offsetY;
  

  function markElement(element) {
    if(!element){
      return;
    }
    element.style.border = '5px solid red';
  }
  function clearElement(element) {
    if(!element){
      return;
    }
    element.style.border = '';
  }
  
  function setCurrent(element) {
    currentElement = element;
  }
  
  function moveToElement(nextElement, currentElement) {
    return function (event) {
      clearElement(currentElement);
      markElement(nextElement);
      setCurrent(nextElement);
      setRelatives(nextElement);
    }
  }

  function setBtnActivity(btn, active, onclick_function) {
    btn.className = `btn ${active}`;
    btn.onclick = onclick_function;
  }

  function closeForm() {
    const form = document.getElementsByClassName('domExplorer')[0];
    document.body.removeChild(form);
  }
  
  function setRelatives(element) {
    if(!element){
      return;
    }
    previousElement = element.previousElementSibling && element.previousElementSibling.nodeName !== 'SCRIPT' ? element.previousElementSibling : null;
    nextElement = element.nextElementSibling && element.nextElementSibling.nodeName !== 'SCRIPT' ? element.nextElementSibling : null;
    parentElement = element.parentElement && element.parentElement.nodeName !== 'BODY'? element.parentElement : null;
    childrenElement = element.firstElementChild;
  
    const prevBtn = document.getElementsByClassName('prevBtn')[0];
    const nextBtn = document.getElementsByClassName('nextBtn')[0];
    const parentBtn = document.getElementsByClassName('parentBtn')[0];
    const childrenBtn = document.getElementsByClassName('childrenBtn')[0];
    
    if (previousElement) {
      setBtnActivity(prevBtn, 'prevBtn btn_active', moveToElement(previousElement, element));
    } else {
      setBtnActivity(prevBtn, 'prevBtn btn_not_active', null);
    }
  
    if (nextElement) {
      setBtnActivity(nextBtn, 'nextBtn btn_active', moveToElement(nextElement, element));
    } else {
      setBtnActivity(nextBtn, 'nextBtn btn_not_active', null);
    }
  
    if (parentElement) {
      setBtnActivity(parentBtn, 'parentBtn btn_active', moveToElement(parentElement, element));
    }else {
      setBtnActivity(parentBtn, 'parentBtn btn_not_active', null);
    }
  
    if (childrenElement) {
      setBtnActivity(childrenBtn, 'childrenBtn btn_active', moveToElement(childrenElement, element));
    } else {
      setBtnActivity(childrenBtn, 'childrenBtn btn_not_active', null);
    }
  }
  
  function searchElement() {
    const selector = document.getElementsByClassName('textInput')[0].value;
    document.getElementsByClassName('textInput')[0].value = '';
    const element = document.querySelector(selector);
  
    markElement(element);
    setCurrent(element);
    setRelatives(element);
  }

  function dragListener(e) {
    moveAt(e);
    form.style.zIndex = 1000000;

    document.onmousemove = function(e) {
      moveAt(e);
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    }

    form.onmouseup = function() {
      document.onmousemove = null;
      form.onmouseup = null;
    }

    form.ondragstart = function() {
      return false;
    };
  }

  function moveAt(e) {
    const panel_top = document.getElementsByClassName('panel_top')[0];
    form.style.left = e.clientX - panel_top.offsetWidth/2  + 'px';
    form.style.top = e.clientY - panel_top.offsetHeight/2  + 'px';
    
  }

  (function explorerInit() {
    
    const style = document.createElement('style');
    style.innerText = `.domExplorer {
      background-color: #f4c9ff;
      width: 400px;
      padding: 50px 10px 10px 10px;
    
      position: fixed;
      top: 50px;
      left: 50px;
    }
    .panel_top {
      height: 40px;
      width: 100%;
      background-color: grey;
      position: absolute;
      top: 0;
      left: 0;
    }
    .exitBtn {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    .textInput {
      width: 70%;
    }
    .searchBtn {
      width: 25%;
    }
    .btn {
      border: none;
      border-radius: 3px;
      width: 24%;
    }
    .btn_not_active {
      background-color: #f9e9fd;
    }
    .btn_active {
      background-color: white;
      cursor: pointer;
    }
    .buttonWrapper {
      display: flex;
      justify-content: space-between;
    }`;
    document.head.append(style);


    const container = document.createElement('div');
    container.className = 'domExplorer';
  
    const fragment = document.createDocumentFragment();

    const panel_top = document.createElement('div');
    panel_top.className = 'panel_top';
    panel_top.addEventListener('mousedown', dragListener, false);
    fragment.append(panel_top);
  
    const h1 = document.createElement('h1');
    h1.innerText = 'Search node element';
    fragment.append(h1);
  
    const exit = document.createElement('i');
    exit.className = 'fas fa-times exitBtn';
    exit.addEventListener('click', closeForm);
    fragment.append(exit);
  
    const input = document.createElement('input');
    input.className = 'textInput';
    fragment.append(input);
  
    const search = document.createElement('button');
    search.innerText = 'Search';
    search.className = 'searchBtn btn btn_active';
    search.addEventListener('click', searchElement);
    fragment.append(search);
  
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'buttonWrapper';
    fragment.append(buttonWrapper);
  
    const prev = document.createElement('button');
    prev.innerText = 'Prev';
    prev.className = 'prevBtn btn btn_not_active';
    buttonWrapper.append(prev);
  
    const next = document.createElement('button');
    next.innerText = 'Next';
    next.className = 'nextBtn btn btn_not_active';
    buttonWrapper.append(next);
  
    const parentEl = document.createElement('button');
    parentEl.innerText = 'Parent';
    parentEl.className = 'parentBtn btn btn_not_active';
    buttonWrapper.append(parentEl);
  
    const childrenEl = document.createElement('button');
    childrenEl.innerText = 'Children';
    childrenEl.className = 'childrenBtn btn btn_not_active';
    buttonWrapper.append(childrenEl);
  
    container.append(fragment);
    document.body.append(container);
  }) ();

  let form = document.getElementsByClassName('domExplorer')[0];
})()
