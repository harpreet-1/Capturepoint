let sildeshow_pic = [
  'https://www.adorama.com/images/cms/36471Hero-Sony-Lens-Desktop@2x_(1)_52724.jpg',
  'https://www.adorama.com/images/cms/36471Nikon-Z9-In-Stock-Hero-Desktop@2x_28627.jpg',
  'https://www.adorama.com/images/cms/36471Hero-Accessorize-Your-Gear-Desktop@2x_27069.jpg',
  'https://www.adorama.com/images/cms/36471Hero-New-Year-New-You-Desktop@2x_02759.jpg',
  'https://www.adorama.com/images/cms/36471New-MacBook-Pro-2023-Hero-Desktop@1.5x_87161.jpg',
]

window.addEventListener('load', () => {
  let sildeshow_el = document.getElementById('slideshow_image')
  let i = 1
  setInterval(() => {
    if (i == 5) {
      i = 0
    }
    sildeshow_el.setAttribute('src', sildeshow_pic[i])
    i++
  }, 4000)
})

const left_btn = document.querySelector('.l_btn')
const right_btn = document.querySelector('.r_btn')
console.log(right_btn)
right_btn.addEventListener('click', function (event) {
  // alert('ke')
  event.preventDefault()
  const connet = document.querySelector('#top_deal_cards')
  connet.scrollLeft += 1100
})
left_btn.addEventListener('click', function (event) {
  // alert('ke')
  event.preventDefault()
  const connet = document.querySelector('#top_deal_cards')
  connet.scrollLeft -= 1100
})
