// Sticky Navigation Menu JS Code
let nav = document.querySelector('nav')
let scrollBtn = document.querySelector('.scroll-button a')
console.log(scrollBtn)
let val
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add('sticky')
    scrollBtn.style.display = 'block'
  } else {
    nav.classList.remove('sticky')
    scrollBtn.style.display = 'none'
  }
}
// Side NavIgation Menu JS Code
let body = document.querySelector('body')
let navBar = document.querySelector('.navbar')
let menuBtn = document.querySelector('.menu-btn')
let cancelBtn = document.querySelector('.cancel-btn')
menuBtn.onclick = function () {
  navBar.classList.add('active')
  menuBtn.style.opacity = '0'
  menuBtn.style.pointerEvents = 'none'
  body.style.overflow = 'hidden'
  scrollBtn.style.pointerEvents = 'none'
}
cancelBtn.onclick = function () {
  navBar.classList.remove('active')
  menuBtn.style.opacity = '1'
  menuBtn.style.pointerEvents = 'auto'
  body.style.overflow = 'auto'
  scrollBtn.style.pointerEvents = 'auto'
}
// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll('.menu li a')
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', function () {
    navBar.classList.remove('active')
    menuBtn.style.opacity = '1'
    menuBtn.style.pointerEvents = 'auto'
  })
}

function confirmDownload () {
  // Display a confirmation dialog
  var downloadConfirmed = confirm('Are you sure you want to download the CV?')

  // If the user confirms, initiate the download
  if (downloadConfirmed) {
    var downloadLink = document.createElement('a')
    downloadLink.href = 'files/EnglishCV_ErickRuiz.pdf'
    downloadLink.download = 'EnglishCV_ErickRuiz.pdf'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
}
