# OrangutanJS - oView
### Interface-like class with a lot of implemented ready methods from which we can inherit
#### Quick start
```
npm i ojs-view
```
Package on [npm](https://www.npmjs.com/package/ojs-view)

This package works closely together with [ojs-core](https://www.npmjs.com/package/ojs-core) and [ojs-store](https://www.npmjs.com/package/ojs-store). So we recommend using it together.

### oView implements few methods:
- components
##### blank method that is called in init and render. In this method, we should declare the components to be rendered again when the state changes
- build
##### this is the main method in which we declare the body of our class. Example use:
```js
build() {
    return o('div').class('container').add([
        o('p').text('Hello World!').init(),
    ]).init()
}
```
- fetchData
##### simple method to fetch data. There are three arguments: url, method and responseType. Method and responseType has default values: GET and json. Example use:
```js
fetchData('https://randomuser.me/api/?results=5')
.then(resp => console.log(resp))

//same as
fetchData('https://randomuser.me/api/?results=5', 'GET', 'json')
.then(resp => console.log(resp))
```
- rerender
##### This method we can call to render again whole class. We can call it whenever we want. For example:
```js
exampleInput.addEventListener('change',(e) => {
    this.store.exampleValue = e.target.value;
    this.rerender()
})
```
This method works perfectly with [ojs-store](https://www.npmjs.com/package/ojs-store). Will be called every time when observable fields in oStore changes. Example:
```js
this.store = oStore({
    exampleValue: 0
}, this.rerender)
``` 
but in this case we can pass only this to oStore function. You can read more about it [here]((https://www.npmjs.com/package/ojs-store))
- init
##### this method just return the HTMLElement. All you have to do is appendChild to the desired location. 

##### Example use: 
class without oView:
```js
class Counter {
  constructor(startValue) {
    this.store = oStore({
        counter: startValue
      },
      this);

    this.html = o('div')
      .id('counter')
      .add([this.build()])
      .init();
  }

  rerender() {
    const container = document.getElementById('counter');
    if (counter) {
      container.innerHTML = '';
      container.appendChild(this.build());
    }
  }

  build() {
    return o('button')
      .text(`+${this.store.counter}`)
      .click(() => {
        this.store.counter++;
      })
      .init();
  }
  init() {
    return this.html;
  }
}

const counter = new Counter(0);
document.body.appendChild(counter.init());
```
and same class with oView:
```js
class Counter extends oView {
  constructor(startValue) {
    this.store = oStore({
        counter: startValue
      }, this);
  }
  
  build() {
    return o('button')
      .text(`+${this.store.counter}`)
      .click(() => {
        this.store.counter++;
      })
      .init();
  }
}

const counter = new Counter(0);
document.body.appendChild(counter.init());
```
Check example use on [Stackblitz](https://stackblitz.com/edit/js-hxwthw)
