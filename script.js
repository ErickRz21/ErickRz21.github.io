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
    downloadLink.href = 'files/ErickRuiz_EnglishCV.pdf'
    downloadLink.download = 'ErickRuiz_EnglishCV.pdf'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
}

const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let startTime;

track.addEventListener('mousedown', (e) => {
    e.preventDefault();  // Prevent default image drag behavior
    startDrag(e.pageX);
});

track.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const currentPosition = e.pageX;
        moveSlider(currentPosition);
    }
});

track.addEventListener('mouseup', () => {
    endDrag();
});

track.addEventListener('mouseleave', () => {
    if (isDragging) {
        endDrag();
    }
});

// Touch events for mobile
track.addEventListener('touchstart', (e) => {
    startDrag(e.touches[0].clientX);
});

track.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const currentPosition = e.touches[0].clientX;
        moveSlider(currentPosition);
    }
});

track.addEventListener('touchend', () => {
    endDrag();
});

function startDrag(position) {
    isDragging = true;
    startX = position;
    startTime = Date.now(); // Track the start time to differentiate between click and drag
    prevTranslate = currentTranslate;
    animationID = requestAnimationFrame(animation);
    track.style.cursor = 'grabbing'; // Change cursor to grabbing
    track.style.transition = 'none'; // Disable transition while dragging
}

function moveSlider(currentPosition) {
    if (!isDragging) return;
    const dragDistance = currentPosition - startX;
    currentTranslate = prevTranslate + dragDistance;
    setSliderPosition();
}

function endDrag() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    track.style.cursor = 'grab'; // Reset cursor

    const movedBy = currentTranslate - prevTranslate;
    const timeTaken = Date.now() - startTime; // Calculate the duration of the drag

    if (timeTaken < 150 && Math.abs(movedBy) < 5) {
        // If the movement was very quick and small, treat it as a click and not a drag
        return;
    }

    if (movedBy < -50 && currentIndex < items.length - 1) {
        currentIndex += 1;
    }

    if (movedBy > 50 && currentIndex > 0) {
        currentIndex -= 1;
    }

    setPositionByIndex();
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -items[0].clientWidth;
    prevTranslate = currentTranslate;
    track.style.transition = 'transform 0.3s ease-out';
    setSliderPosition();
    setTimeout(() => {
        track.style.transition = ''; // Remove transition after animation ends
    }, 300);
}
