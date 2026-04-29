const element1 = document.getElementById('hello')
const element2 = document.getElementById('NCT')
const helloText = ['Xin chào, tôi là', "Hi, I'm"]
const nameText = ['Nguyễn Cung Thành', 'Nguyen Cung Thanh']
let helloTextIndex = 0
let nameTextIndex = 0
setInterval(() => {
  helloTextIndex = (helloTextIndex + 1) % 2
  nameTextIndex  = (nameTextIndex + 1 ) % 2
  element1.innerText = helloText[helloTextIndex]
  element2.innerText = nameText[nameTextIndex]
}, 2000)
