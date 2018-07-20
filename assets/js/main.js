window.addEventListener("load", e => {
  const t = $("#loader");
  setTimeout(() => {
    t.style.opacity = "0";
    typingEffect();
  }, 4000)
  setTimeout(() => {
    t.style.display = "none"
  }, 4300)
});
const modalLinks = $(".works__link");

function typingEffect() {
  const e = document.querySelectorAll("[data-typed]");
  setTyped(e[0], {
    strings: ["Deebov", "Dilshod", "Deebov"],
    typeSpeed: 80,
    backSpeed: 20,
    cursorChar: "_",
    startDelay: 0,
    backDelay: 3e3,
    loop: !0
  }), setTyped(e[1], {
    strings: ["Younger", "Faster", "Motivated"],
    typeSpeed: 40,
    backSpeed: 20,
    cursorChar: "_",
    backDelay: 3e3,
    loop: !0
  }), setTyped(e[2], {
    strings: ["Enthusiast", "Responsible"],
    typeSpeed: 40,
    backSpeed: 20,
    cursorChar: "_",
    backDelay: 4e3,
    loop: !0
  })
}

function navScroll() {
  const e = $(".header__nav-link");
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    n.addEventListener("click", function (e) {
      e.preventDefault();
      const t = getPosition($(n.getAttribute("href")));
      scrollFor(t.x, t.y)
    })
  }
}

function modalInit() {
  const e = $(".modal__close");
  for (let t = 0; t < e.length; t++) {
    e[t].addEventListener("click", function (e) {
      e.preventDefault(), closeModal(this.parentElement.parentElement.parentElement)
    })
  }
  for (let e = 0; e < modalLinks.length; e++) {
    const t = modalLinks[e];
    t.addEventListener("click", function (e) {
      e.preventDefault();
      const n = getModal(t),
        o = n.children[0];
      o.style.top = "50%", o.style.left = "50%", openModal(n)
    })
  }
}

function openModal(e) {
  e.classList.add("modal--active")
}

function closeModal(e, t, n) {
  const o = e,
    s = o.children[0],
    l = t || getPosition(o.parentElement).x,
    i = n || getPosition(o.parentElement).y;
  o.classList.remove("modal--active"), setPositionModal(l, i, s)
}

function $(e) {
  const t = e[0],
    n = e.slice(1);
  switch (t) {
    case "#":
      return document.getElementById(n);
    case ".":
      return document.getElementsByClassName(n)
  }
}

function getSiblings(e) {
  return [...e.parentElement.children].filter(t => 1 == t.nodeType && t != e)
}

function getClassList(e) {
  return e.className.split(" ")
}

function getParentOfParent(e) {
  return e.parentElement.parentElement
}

function getPosition(e) {
  let t = 0,
    n = 0;
  for (; e;) {
    if ("BODY" == e.tagName) {
      let o = e.scrollLeft || document.documentElement.scrollLeft,
        s = e.scrollTop || document.documentElement.scrollTop;
      t += e.offsetLeft - o + e.clientLeft, n += e.offsetTop - s + e.clientTop
    } else t += e.offsetLeft - e.scrollLeft + e.clientLeft, n += e.offsetTop - e.scrollTop + e.clientTop;
    e = e.offsetParent
  }
  return {
    x: t,
    y: n
  }
}

function updatePosition() {
  for (let e = 0; e < modalLinks.length; e++) {
    const t = modalLinks[e],
      n = getModal(t);
    if (!n.classList.contains("modal--active")) {
      const e = n.children[0];
      setPositionModal(getPosition(t).x, getPosition(t).y, e)
    }
  }
}

function getModal(e) {
  return getSiblings(e).filter(e => getClassList(e).indexOf("modal") + 1)[0]
}

function setPositionModal(e, t, n) {
  const o = n;
  o.style.top = t + "px", o.style.left = e + "px"
}

function scrollFor(e, t) {
  window.scrollTo({
    behavior: "smooth",
    top: t,
    left: e || 0
  })
}

function setTyped(e, t = {}) {
  const n = new Typed(e, t);
  e.addEventListener("mouseover", function (e) {
    n.stop()
  }), e.addEventListener("mouseout", function (e) {
    n.start()
  })
}
window.addEventListener("scroll", updatePosition, !1), window.addEventListener("resize", updatePosition, !1), modalInit(), navScroll();