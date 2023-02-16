//? varibles
const generate = document.getElementById('generate');
const colors = document.querySelector('.colors');
const count = document.querySelector('.count');

//TODO: Random Number Function
function random() {
   return Math.floor(Math.random() * 255)
}

//? If Page has been downloaded
window.onload = () => {
   num = sessionStorage.getItem('counts');

   generateColors(num, 'get')

   ColorBlock()
}

//? when we click on generate 
generate.onclick = () => {
   sessionStorage.clear(); 

   let num = 3;

   //? do we get value from select
   if (count.value !== '' && count.value !== '  ') {
      num = count.value
   }

   sessionStorage.setItem('counts', num)

   //! clear
   colors.innerHTML = ''
   
   animation(generate, generateColors(num, 'set'))

   ColorBlock()
}

//? if user click on the button copy
function ClickCopy(block__colors) {
   if (block__colors) {
      for (const block__color of block__colors) {
         block__color.addEventListener( "click", () => {
            let color = block__color.style.backgroundColor

            animation(block__color,  copy(color))
         })
      }
   }
}

//? Animation Function
function animation(block, func) {
   //* Add More Effects and delete
   block.classList.add('animation')

   func

   setTimeout(() => {
      block.classList.remove('animation')
   }, 300)
}

//? Copy function
function copy(offer) {
   navigator.clipboard.writeText(offer)
}

//? Generate Colors Function
function generateColors(num, type) {
   for (let index = 1; index <= num; index++) {
      let color

      if (type === 'get') {
         color = sessionStorage.getItem(`count${index}`)
      } else if (type === 'set') {
         let colorMassive = [random(), random(), random()]
         color= `rgb(${colorMassive[0]}, ${colorMassive[1]}, ${colorMassive[2]})`

         sessionStorage.setItem(`count${index}`, color)
      }
      
      colors.innerHTML += `
      <div class="block__color">
         <div class="color" style="background-color: ${color}" ></div>
         <p>${color}</p>
      </div>
      `
   }
}

//? Color Block
function ColorBlock() {
   let block__colors = document.querySelectorAll('.color')

   setTimeout(() => {
      ClickCopy(block__colors)
   }, 200)
}