// Elements
const toggleBtn = document.querySelector('.toggle-btn');
const line1 = document.querySelector('.line-menu:nth-child(1)')
const line2 = document.querySelector('.line-menu:nth-child(2)')
const navLinks = document.querySelectorAll('.nav-links a')
const navLinksParent = document.querySelector('.nav-links')
const mouseCursor = document.querySelector('.cursor')
const projects = document.querySelectorAll('.project-thumb a')
const preloader = document.querySelector('.preload')
const btnForm = document.querySelector('.btn-submit')
const alertSuccess = document.querySelector('.alert.success')
const alertError = document.querySelector('.alert.error')
const closeAlert = document.querySelectorAll('.close-alert')

// document onload
window.addEventListener('load', ()=> {
    console.log("halo");
    preloader.style.transform = 'translateY(-100%)';
    heroAnim.play()
})

// Navbar animation GSAP
const navAnim = gsap.timeline({paused: true}); 
navAnim.to('.nav-links', {y : 0, duration: .7})
    .to(line1, {y: 6, rotate: 45, duration: .4}, "-=.5")
    .to(line2, {y: -5, rotate: -45, duration: .4}, '<')
    .from('.nav-links a', {x: '-100%', stagger: 0.3, duration: .5}, '-=.5')

navAnim.reverse()
toggleBtn.addEventListener('click', ()=> {
    navAnim.reversed() ? navAnim.play() : navAnim.reverse()
})

navLinks.forEach(link => {
    link.addEventListener('click', ()=>{
        navAnim.reverse()
    })
    link.addEventListener('mouseover', () => {
        mouseCursor.style.transition = "all 0.3s ease"
    })
    link.parentElement.addEventListener('mouseleave', () => {
        setTimeout(() => {
            mouseCursor.style.transition = "transform 0.3s ease"
        }, 500);
    })
})

// cursor
window.addEventListener('mousemove', function(e){
    if(e.target.classList.contains('nav-links-item')){
        navOnHover(mouseCursor, e.target)
    }
    else {
        followCursor(mouseCursor, e)
    }
})

function followCursor(cursor, coordinate){
    cursor.style.top = coordinate.clientY + "px";
    cursor.style.left = coordinate.clientX + "px";
    cursor.style.width = '2rem';
    cursor.style.height = '2rem';
    cursor.style.opacity = '1';
    cursor.classList.remove('on-focus');
}

function navOnHover(cursor, elem){
    const rect = elem.getBoundingClientRect();
    cursor.classList.add('on-focus')
    cursor.style.top = rect.top + "px";
    cursor.style.left = rect.left + "px";
    cursor.style.width = rect.width + "px";
    cursor.style.height = rect.height + "px";
}

// Hero animation GSAP
const heroAnim = gsap.timeline( {defaults: {duration: .7}, delay: .8, paused: true } );
const videoMask = CSSRulePlugin.getRule(".video-wrapper::after")
heroAnim.from(videoMask, {cssRule:{scaleX: 1, duration: 2}})
        .from('.intro-text h1 span', {y: '100%', stagger: .3})

// Project animation GSAP
const projectsThumb = gsap.utils.toArray('.project-thumb a');
projectsThumb.forEach(project => {
gsap.to(project, { 
    y: '-30%',
    scrollTrigger: {
        start: 'top center',
        trigger: project.parentElement,
        scrub: true
        }
    })
});

projects.forEach( project => {
    project.addEventListener('mouseover', ()=> mouseCursor.classList.add('active'))
    project.addEventListener('mouseleave', ()=> mouseCursor.classList.remove('active'))
})

// About animation GSAP
const aboutAnim = gsap.timeline({
    scrollTrigger: {
        trigger: '#about',
        start: "top center",
        scrub: true
    }
})

aboutAnim.from('#about .sub-header', {x: 50})
            .to('.profile-pic', {y: -100}, '<')

// Smooth scroll
const scroll = new SmoothScroll('a[href*="#"]');

// Progress bar page
window.addEventListener("scroll", ()=> {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.height = scrolled + "%";
})

const scriptURL = 'https://script.google.com/macros/s/AKfycbxhrkivyuC8I20Ydvxqj2yULO7mAIBkStXsaxkwfy9CHAKzY96-2WMyCBLe8CVzEs8F/exec'
const form = document.forms['inquiry-form']
const btnOnload = '<div class="btn-spinner"></div>SENDING...'

form.addEventListener('submit', e => {
e.preventDefault()
btnForm.innerHTML = btnOnload
fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        console.log('Success!', response)
        btnForm.innerHTML = 'SEND MESSAGE!'
        form.reset()

        // alert when email succes sent
        alertSuccess.classList.add('active')
        alertError.classList.remove('active')
    })
    .catch(error => {
        console.error('Error!', error.message)
        btnForm.innerHTML = 'SEND MESSAGE!'
        // alert when email failed sent
        alertError.classList.add('active')
        alertSuccess.classList.remove('active')
    })
})

closeAlert.forEach(btn => {
    btn.addEventListener('click',()=> {
        btn.parentElement.classList.remove('active')
    })
})