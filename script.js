function createFloatingHearts() {
  const container = document.getElementById('heartsContainer');
  const hearts = ['❤️','💕','💖','💗','💓','💝','💘','💞'];
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = hearts[Math.floor(Math.random()*hearts.length)];
    heart.style.left = Math.random()*100 + '%';
    heart.style.animationDelay = Math.random()*10 + 's';
    heart.style.fontSize = (Math.random()*20 + 15) + 'px';
    container.appendChild(heart);
  }
}

function createSparkles() {
  const container = document.getElementById('sparklesContainer');
  for (let i = 0; i < 50; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random()*100 + '%';
    sparkle.style.top = Math.random()*100 + '%';
    sparkle.style.animationDelay = Math.random()*3 + 's';
    container.appendChild(sparkle);
  }
}

const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');
const musicText = musicControl.querySelector('.music-text');
let musicPlaying = false;

musicControl.addEventListener('click', () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicText.textContent = 'Music Off';
    musicControl.classList.add('paused');
    musicPlaying = false;
  } else {
    bgMusic.play().catch(e => console.log('Audio play failed:', e));
    musicText.textContent = 'Music On';
    musicControl.classList.remove('paused');
    musicPlaying = true;
  }
});

document.body.addEventListener('click', function playOnce() {
  if (!musicPlaying) {
    bgMusic.play().catch(e => console.log('Audio play failed:', e));
    musicText.textContent = 'Music On';
    musicControl.classList.remove('paused');
    musicPlaying = true;
  }
  document.body.removeEventListener('click', playOnce);
}, { once: true });

window.addEventListener('load', () => {
  createFloatingHearts();
  createSparkles();

  function splitText(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const text = el.textContent.trim();
    el.innerHTML = text.split("").map(char =>
      `<span style="display:inline-block">${char === " " ? "&nbsp;" : char}</span>`
    ).join("");
  }

  splitText(".hbd-chatbox");
  splitText(".wish-hbd");

  const chatSpans = document.querySelectorAll(".hbd-chatbox span");
  const wishSpans = document.querySelectorAll(".wish-hbd span");

  gsap.set(chatSpans, { opacity: 0 });
  gsap.set(wishSpans, { opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl
    .from(".one", { yPercent: 40, opacity: 0, duration: 1.1 })
    .to(".one", { yPercent: -40, opacity: 0, duration: 1.1 }, "+=3")

    .from(".three", { scale: 0.7, opacity: 0, duration: 1.1, ease: "back.out(1.3)" })
    .to(".three", { yPercent: -50, opacity: 0, duration: 1 }, "+=3")

    .from(".four", { scale: 0.45, opacity: 0, duration: 1.2, ease: "back.out(1.4)" })
    .from(".fake-btn", { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(1.6)" }, "-=0.6")
    .to(chatSpans, { opacity: 1, duration: 0.04, stagger: 0.035, ease: "none" }, "-=0.3")
    .to(".fake-btn", { backgroundColor: "#64b5f6", duration: 0.5 })
    .to(".four", { scale: 0.3, opacity: 0, yPercent: -120, duration: 1.1 }, "+=2")

    // All .five messages appear one by one in the exact center
    .from(".idea-1", { y: "30%", opacity: 0, duration: 1.1 }, "-=1")
    .to(".idea-1",   { y: "-30%", opacity: 0, duration: 1.1 }, "+=3.2")

    .from(".idea-2", { y: "30%", opacity: 0, duration: 1.1 }, "-=0.8")
    .to(".idea-2",   { y: "-30%", opacity: 0, duration: 1.1 }, "+=3.2")

    .from(".idea-3", { y: "30%", opacity: 0, duration: 1.1 }, "-=0.8")
    .to(".idea-3 strong", { scale: 1.35, rotation: 6, duration: 1, yoyo: true, repeat: 1 }, "-=0.9")
    .to(".idea-3",   { y: "-30%", opacity: 0, duration: 1.1 }, "+=3.4")

    .from(".idea-4", { y: "30%", opacity: 0, duration: 1.1 }, "-=0.8")
    .to(".idea-4",   { y: "-30%", opacity: 0, duration: 1.1 }, "+=3.0")

    .from(".idea-5", { scale: 0.6, y: "40%", opacity: 0, rotationX: 25, duration: 1.5, ease: "back.out(1.4)" }, "-=1")
    .to(".idea-5 span", { rotation: 90, x: 18, duration: 1 }, "+=0.7")
    .to(".idea-5",   { scale: 0.25, opacity: 0, duration: 1.3 }, "+=2.5")

    .fromTo(".idea-6 span",
      { scale: 0.35, opacity: 0, y: "50%" },
      { scale: 1, opacity: 1, y: 0, stagger: 0.18, duration: 1.5, ease: "back.out(1.7)" }, "-=1.8")
    .to(".idea-6 span", { scale: 3, opacity: 0, y: "-80%", stagger: 0.18, duration: 1.4, ease: "power3.in" }, "+=1.8")

    .fromTo(".baloons img",
      { yPercent: 100, opacity: 0.65, rotation: () => Math.random()*40-20 },
      { yPercent: -120, opacity: 1, rotation: () => Math.random()*40-20, duration: 7, stagger: {each:0.4, from:"random"}, ease: "none" },
      "-=6"
    )
    .from(".girl-dp", { scale: 2, opacity: 0, yPercent: -30, duration: 1.6, ease: "power3.out" }, "-=5")
    .fromTo(wishSpans,
      { yPercent: -70, opacity: 0, rotation: 70 },
      { yPercent: 0, opacity: 1, rotation: 0, stagger: 0.07, duration: 1.3, ease: "elastic.out(1.1,0.48)" },
      "-=1.4"
    )
    .to(wishSpans, { color: "#ff69b4", duration: 0.9, stagger: 0.06 }, "-=1")
    .from(".wish h5", { yPercent: 40, opacity: 0, duration: 1.1 }, "-=1.3")
    .to(".six", { opacity: 0, yPercent: 70, duration: 1.3 })

    .from(".nine", { opacity: 0, scale: 0.8, duration: 1 })
    .from(".nine p", { yPercent: 30, opacity: 0, stagger: 0.4, duration: 1 }, "-=0.7")
    .to(".last-smile", { rotation: 360, duration: 1.8, ease: "elastic.out(1,0.35)" }, "+=0.8");

  document.getElementById("replay")?.addEventListener("click", () => tl.restart());
});