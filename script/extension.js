// === DARK / LIGHT MODE ===
const body = document.body;
const switchMode = document.querySelector('#switch-mode i');

let mode = localStorage.getItem('darkmode');
if (mode === 'true') {
  body.classList.add('dark');
  switchMode.className = "bx bx-sun";
}

switchMode.addEventListener('click', () => {
  switchMode.classList.toggle('bx-moon');
  switchMode.classList.toggle('bx-sun');
  let isDark = body.classList.toggle('dark');
  localStorage.setItem('darkmode', isDark);
});


// === BACK TO TOP ===
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $('#backtop').fadeIn();
    }
  });
  $("#backtop").click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1000); // 1000ms là đủ
  });
});


// === FLOATING NOTIFICATION TOGGLE ===
const nav = document.querySelector(".noti_choose"),
      toggleBtn = nav.querySelector(".toggle-btn");

toggleBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// === DRAG NAV ===
function onDrag({ movementY }) {
  const navStyle = window.getComputedStyle(nav),
        navTop = parseInt(navStyle.top),
        navHeight = parseInt(navStyle.height),
        windHeight = window.innerHeight;

  nav.style.top = navTop > 0 ? `${navTop + movementY}px` : "1px";
  if (navTop > windHeight - navHeight) {
    nav.style.top = `${windHeight - navHeight}px`;
  }
}

nav.addEventListener("mousedown", () => {
  nav.addEventListener("mousemove", onDrag);
});
nav.addEventListener("mouseup", () => {
  nav.removeEventListener("mousemove", onDrag);
});
nav.addEventListener("mouseleave", () => {
  nav.removeEventListener("mousemove", onDrag);
});
