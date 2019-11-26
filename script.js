class Widget {
  constructor(){
    this.slides = [
      {
        "title": "Time to Share: 6 for $3.99*",
        "img": "https://res.cloudinary.com/dx4wkpab8/image/upload/v1573640170/comp_plate_promo1_wsmolg.png",
        "description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
        "note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
        "productUrl": "https://res.cloudinary.com/dx4wkpab8/image/upload/v1573640170/comp_plate_promo1_wsmolg.png"
      },
      {
        "title": "Rise 'n shine",
        "img": "https://res.cloudinary.com/dx4wkpab8/image/upload/v1573640171/comp_plate_promo2_nlqjfe.png",
        "description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
        "note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
        "productUrl": "https://res.cloudinary.com/dx4wkpab8/image/upload/v1573640171/comp_plate_promo2_nlqjfe.png"
      },
      {
        "title": "PM Snackers: Brownie Bites",
        "img": "https://res.cloudinary.com/dx4wkpab8/image/upload/v1573640171/comp_plate_promo4_f87x7g.png",
        "description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
        "note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
        "productUrl": "https://res.cloudinary.com/dx4wkpab8/image/upload/v1573640171/comp_plate_promo4_f87x7g.png"
      },
      {
        "title": "PM Snackers: Brownie Bites",
        "img": "https://res.cloudinary.com/dx4wkpab8/image/upload/v1573640171/comp_plate_promo3_wnp43x.png",
        "description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
        "note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
        "productUrl": "https://res.cloudinary.com/dx4wkpab8/image/upload/v1573640171/comp_plate_promo4_f87x7g.png"
      }
    ];
    this.currentSlide = 0;
  }

  createSlide() {
    const { title, img, description } = this.slides[this.currentSlide];
    const descText = this.slides[this.currentSlide].toggled ? description : `${description.slice(0, 20)}...`;
    const template = `<div class="container">
                      <img src=${img} />
                      <div class="title">${title}<div>
                      <div class="description">${descText}</div>
                      </div>`;

    return template
  }

  slideNextChange() {
    this.currentSlide === this.slides.length - 1
  ? (this.currentSlide = 0)
  : this.currentSlide++

    this.render();
  }

  slidePrevChange(){
    this.currentSlide === 0
  ? this.currentSlide = this.slides.length - 1
  : this.currentSlide--

    this.render();
  }

  toogleChange() {
    this.slides[this.currentSlide].toggled = !this.slides[this.currentSlide].toggled;

    this.render();
  }

  render(){
    const slideElem = document.getElementById('slide')
    const template = this.createSlide();
    slideElem.innerHTML = template;
  }

  init() {
    const root = document.getElementById('root');
    const slide = document.createElement('div');
    slide.setAttribute('id', 'slide');
    const slideTemplate = this.createSlide();
    slide.innerHTML = slideTemplate;
    root.appendChild(slide)
    const buttonNext = document.createElement('button');
    buttonNext.innerHTML = '>';
    buttonNext.addEventListener('click', (e) => {
      this.slideNextChange();
    })
    const buttonPrev = document.createElement('button');
    buttonPrev.innerHTML = '<';
    buttonPrev.addEventListener('click', (e) => {
      this.slidePrevChange();
    })
    const buttonToogle = document.createElement('button');
    buttonToogle.innerHTML = 'Toggle';
    buttonToogle.addEventListener('click', () => {
      this.toogleChange()
    })
    root.appendChild(buttonToogle)
    root.appendChild(buttonPrev);
    root.appendChild(buttonNext);

  }
}


const widget = new Widget();
widget.init();