class Widget {
  constructor(mountPoint = 'root') {
    this.slides = [];
    this.currentSlide = 0;
    this.mountPoint = mountPoint;
    this.apiURL = 'https://my-json-server.typicode.com/ilyalytvynov/ads-box-server/ads';
  }

  createSlide() {
    const { title, img, description } = this.slides[this.currentSlide];
    const descText = this.slides[this.currentSlide].toggled ? description : `${description.slice(0, 70)}...`;
    const template = `<div class="container">
                        <img src=${img} id="image" />
                        <div id="toggle" class="${this.slides[this.currentSlide].toggled ? 'info toggle' : 'toggle'}">
                          <div class="title">${title}</div>
                          <div class="description">${descText}</div>
                        </div>
                      </div>`;

    return template
  }

  createControlPanel() {
    const root = document.getElementById(this.mountPoint);
    const buttonStart = document.createElement('button');
    const buttonEnd = document.createElement('button');
    const buttonNext = document.createElement('button');
    const buttonPrev = document.createElement('button');
    const buttonToogle = document.createElement('button');
    const controlPanelContainer = document.createElement('div');
    const controlButtons = document.createElement('div');

    buttonToogle.classList.add('toggle-btn');
    controlPanelContainer.classList.add('control');

    buttonStart.innerHTML = '<<<';
    buttonStart.addEventListener('click',this.slideStartChange())

    buttonEnd.innerHTML = '>>>';
    buttonEnd.addEventListener('click',this.slideEndChange())

    buttonNext.innerHTML = '>';
    buttonNext.addEventListener('click',this.slideNextChange())

    buttonPrev.innerHTML = '<';
    buttonPrev.addEventListener('click', this.slidePrevChange())

    buttonToogle.innerHTML = 'Toggle';
    buttonToogle.addEventListener('click', this.toogleChange())

    controlPanelContainer.appendChild(buttonToogle)
    controlButtons.appendChild(buttonStart);
    controlButtons.appendChild(buttonPrev);
    controlButtons.appendChild(buttonNext);
    controlButtons.appendChild(buttonEnd);
    controlPanelContainer.appendChild(controlButtons);
    root.appendChild(controlPanelContainer);
  }

  slideStartChange() {
    this.currentSlide = 0;
    this.renderSlide();
  }

  slideEndChange() {
    this.currentSlide = this.slides.length - 1;
    this.renderSlide();
  }

  slideNextChange() {
    this.currentSlide === this.slides.length - 1 ?
      (this.currentSlide = 0) :
      this.currentSlide++;
    this.renderSlide();
  }

  slidePrevChange() {
    this.currentSlide === 0 ?
      (this.currentSlide = this.slides.length - 1) :
      this.currentSlide--
    this.renderSlide();
  }

  toogleChange() {
    const { description } = this.slides[this.currentSlide];
    const toggleElem = document.getElementById('toggle');

    this.slides[this.currentSlide].toggled = !this.slides[this.currentSlide].toggled;

    if (this.slides[this.currentSlide].toggled) {
      toggleElem.classList.add('info');
      toggleElem.children[1].innerHTML = description;
    } else {
      toggleElem.classList.remove('info');
      toggleElem.children[1].innerHTML = description.slice(0, 70);
    }
  }

  fetchData() {
    return fetch(this.apiURL)
      .then(res=> res.json())
      .then(data => {
        this.slides = [...data];
      })
  }

  renderSlide() {
    const slideElem = document.getElementById('slide');
    const template = this.createSlide();
    slideElem.innerHTML = template;
  }

  renderLoading() {
    const root = document.getElementById(this.mountPoint);
    root.setAttribute('id', 'root');
    const loadingTemplate = document.createElement('div');
    loadingTemplate.classList.add('loader');
    loadingTemplate.innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
    root.appendChild(loadingTemplate);
  }

  initWidget() {
    const root = document.getElementById(this.mountPoint);
    root.setAttribute('id', 'root');
    root.innerHTML = '';
    const slide = document.createElement('div');
    const slideTemplate = this.createSlide();
    slide.setAttribute('id', 'slide');
    slide.classList.add('slide');
    slide.innerHTML = slideTemplate;
    root.appendChild(slide);
    this.createControlPanel()
  }

  init() {
    this.renderLoading();
    this.fetchData()
      .then(() => {
        if(this.slides.length > 0){
          this.initWidget();
        }
      })
  }
}

const widget = new Widget('root');
widget.init();

