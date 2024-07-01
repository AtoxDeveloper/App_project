import gsap from "gsap";

// Define a general timeline to use in all the animation functions.
const tl = gsap.timeline();

//login transparent
export const showLogin = (): void => {
  tl.to(
    "#app-login",
    { opacity:1, duration: 1, delay: 1 }
  )
};

// Preloader Animation
export const preLoaderAnim = (navigate: (path: string) => void): void => {
  tl.to("body", {
    duration: 0.1,
    css: { overflowY: "hidden" },
  })
    .to(".landing", {
      duration: 0.05,
      css: { overflowY: "hidden", height: "90vh" },
    })
    .to(".texts-container", {
      duration: 0,
      opacity: 1,
    })
    .from(".texts-container span", {
      duration: 1.5,
      delay: 1,
      y: 100,
      skewY: 10,
      stagger: 0.4,
    })
    .to(".texts-container span", {
      duration: 1,
      y: 70,
      skewY: -20,
      stagger: 0.2,
    })
    .to(".landing", {
      duration: 0.05,
      css: { overflowY: "hidden", height: "unset" },
    })
    .to("body", {
      duration: 0.1,
      css: { overflowY: "scroll" },
    })
    .from(".landing__top .sub", {
      duration: 1,
      opacity: 0,
      x: 100,
    })
    .to(
      ".preloader",
      {
        duration: 1.5,
        height: "0vh",
        onComplete: () => {
          navigate('/login'); // Redirige a la pantalla de login
        },
      },
      "-=2"
    )
    .from(".landing__main .text", {
      duration: 2,
      y: 10,
      opacity: 0,
      stagger: {
        amount: 2,
      },
    })
    .from(".links .item", {
      duration: 0.5,
      opacity: 0,
      delay: window.innerWidth < 763 ? -3 : -0.6,
      stagger: {
        amount: 0.5,
      },
      onComplete: animateMainShape,
    })
    .from(".main-circle", {
      duration: 1,
      opacity: 0,
      onComplete: animateShapes,
    })
    .from(".shapes .shape", {
      duration: 1,
      opacity: 0,
      delay: -1,
      stagger: 1,
    })
    .to(".preloader", {
      duration: 0,
      css: { display: "none" },
    });
};

export const openMenu = (): void => {
  const tl = gsap.timeline();
  tl.to("body", {
    duration: 0.1,
    css: { overflowY: "hidden" },
    ease: "power3.out",
  })
    .to(".hamburger-menu", {
      duration: 0.1,
      css: { display: "block" },
    })
    .to(".header-item", {
      duration: 0.1,
      css: { background: "none" },
    })
    .to(".cls-1", {
      duration: 0.1,
      delay: 0.3,
      css: { fill: "#ffffff" },
    })
    .to(
      [".nav-secondary", ".nav-primary"],
      {
        duration: 0.8,
        height: "100%",
        transformOrigin: "right top",
        stagger: {
          amount: 0.1,
        },
        ease: "power3.inOut",
      },
      "-=.5"
    )
    .from(
      ".nav-link",
      {
        duration: 0.5,
        x: -80,
        opacity: 0,
        stagger: {
          amount: 0.5,
        },
        ease: "Power3.in",
      },
      "-=.3"
    );

  // Change cursor color when nav is open
  // tl.to(".cursor", {
  //   delay: -1,
  //   css: { className: "+=cursor-active" },
  // }).to(".cursor2", { delay: -1, css: { className: "+=cursor2-active" } });
};

export const closeMenu = (): void => {
  const tl = gsap.timeline();
  tl.to("body", {
    duration: 0.05,
    css: { overflowY: "scroll" },
    ease: "power3.inOut",
  })
    .to([".nav-primary", ".nav-secondary"], {
      duration: 0.8,
      height: "0",
      transformOrigin: "right top",
      stagger: {
        amount: 0.1,
      },
      ease: "power3.inOut",
    })
    .to(".cls-1", {
      duration: 0.1,
      delay: -0.3,
      css: { fill: "#08e7f3" },
    })
    .to(".header-item", {
      duration: 0.5,
      css: { background: "rgba(11,11,15,.8)" },
    })
    .to(".hamburger-menu", {
      duration: 0.05,
      css: { display: "none" },
    });

  // tl.to(".cursor-active", {
  //   css: { className: "+=cursor" },
  // }).to(".cursor2-active", { css: { className: "+=cursor2" } });
};

// Recurrent animations
export const fadeUp = (el: string | Element, delay: number = 0): void => {
  tl.from(el, {
    y: 150,
    duration: 1,
    delay,
    opacity: 0,
    ease: "power3.Out",
  });
};

export const mobileLanding = (): void => {
  if (window.innerWidth < 763) {
    tl.from(".landing__main2", {
      duration: 1,
      delay: 0,
      opacity: 0,
      y: 80,
      ease: "expo.easeOut",
    });
  }
};

const animateShapes = (): void => {
  const infiniteTl = gsap.timeline({
    repeat: -1,
  });
  infiniteTl
    .to(".shapes .shape", {
      duration: 4,
      rotate: 360,
      delay: -1,
      ease: "power3.easeInOut",
      stagger: 2,
    })
    .to(".shapes .shape-3", {
      duration: 1,
      rotate: 360,
      delay: -2,
      ease: "power3.easeInOut",
    })
    .to(".shapes .shape", {
      duration: 3,
      rotate: 0,
      ease: "power3.easeInOut",
      stagger: 1,
    })
    .to(".shapes .shape", {
      duration: 1,
      opacity: 0,
      delay: -1,
      ease: "power3.easeInOut",
      stagger: 1,
    })
    .to(".shapes .shape", {
      duration: 1.5,
      opacity: 1,
      ease: "power3.easeInOut",
      stagger: 1,
    });
};

const animateMainShape = (): void => {
  const infiniteTl = gsap.timeline({
    repeat: -1,
  });
  infiniteTl
    .to(".shapes .main-circle", {
      duration: 6,
      x: -30,
      y: -50,
      ease: "expo.easeOut",
    })
    .to(".shapes .main-circle", {
      duration: 6,
      x: -30,
      y: 50,
      ease: "expo.easeOut",
    })
    .to(".shapes .main-circle", {
      duration: 4,
      x: 0,
      y: 0,
      ease: "expo.easeOut",
    });
};

export const boxHover = (e: MouseEvent): void => {
  const tl = gsap.timeline();
  if (window.innerWidth >= 986) {
    const target = e.target as HTMLElement;
    tl.to(target.querySelector(".link"), {
      duration: 0,
      opacity: 1,
    }).from(target.querySelectorAll(".box-anim"), {
      duration: 0.3,
      opacity: 0,
      y: 30,
      stagger: 0.1,
      ease: "Power3.easeOut",
    });
  }
};

export const boxExit = (e: MouseEvent): void => {
  if (window.innerWidth >= 986) {
    const target = e.target as HTMLElement;
    gsap.to(target.querySelector(".link"), {
      duration: 0,
      opacity: 0,
    });
  }
};

export const fadeIn = (el: string | Element): void => {
  gsap.to(el, {
    duration: 2,
    opacity: 1,
    y: -60,
    ease: "power4.out",
  });
};

export const fadeOut = (el: string | Element): void => {
  gsap.to(el, {
    duration: 1,
    opacity: 0,
    y: -20,
    ease: "power4.out",
  });
};
