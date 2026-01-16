const element = document.getElementById('hello')
const helloText = ['Xin chào, tôi là', "Hi, I'm"]

let helloTextIndex = 0

setInterval(() => {
  helloTextIndex = (helloTextIndex + 1) % 2
  element.innerText = helloText[helloTextIndex]
}, 2000)
