const toggleBtn = document.querySelector('.toggle-btn');
const line1 = document.querySelector('.line-menu:nth-child(1)')
const line2 = document.querySelector('.line-menu:nth-child(2)')
const navLinks = document.querySelectorAll('.nav-links a')


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

// Hero animation GSAP
const heroAnim = gsap.timeline( {defaults: {duration: .7}, delay: .8 } );
const videoMask = CSSRulePlugin.getRule(".video-wrapper::after")
heroAnim.from(videoMask, {cssRule:{scaleX: 1, duration: 2}})
        .from('.intro-text h1 span', {y: '100%', stagger: .3})

// Project animation
const boxes = gsap.utils.toArray('.project-img img');
boxes.forEach(box => {
gsap.to(box, { 
    y: '-30%',
    scrollTrigger: {
        start: 'top center',
        trigger: box.parentElement,
        scrub: true
        }
    })
});

navLinks.forEach(link => {
    link.addEventListener('click', ()=>{
        navAnim.reverse()
    })
})

const scroll = new SmoothScroll('a[href*="#"]');