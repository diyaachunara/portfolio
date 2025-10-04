console.log("Diya Chunara portfolio with navbar loaded!");

// Smooth scrolling for nav links
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
  const href = link.getAttribute("href");

  if (href === "#") {
    link.addEventListener("click", e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  } else if (href.startsWith("#")) {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    });
  }
});

// Back to Top Button
const mybutton = document.getElementById("btn-back-to-top");
window.onscroll = () => {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};
mybutton.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// Tabs Logic
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(tab => tab.classList.add('hidden'));
    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    document.getElementById(tabId).classList.remove('hidden');
  });
});

// Intersection Observer for general animations
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      entry.target.classList.add('animate');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll(
  '.project-box, .animate-left, .animate-right, [data-animate], \
   .slide-img-left, .slide-img-right, .certificate-card'
).forEach(el => io.observe(el));

// Tech Stack Animation by Row
function assignStackDirections() {
  const cards = document.querySelectorAll('.tech-card');
  if (!cards.length) return;
  const firstRowTop = cards[0].offsetTop;
  cards.forEach(card => {
    const percent = card.dataset.percent || 0;
    const border = card.querySelector('.circle-border');
    border.style.setProperty('--percent', `${percent}%`);
    border.style.background = `conic-gradient(#e75480 ${percent}%, #2e2e2e 0%)`;
    if (card.offsetTop === firstRowTop) {
      card.classList.add('slide-right');
    } else {
      card.classList.add('slide-left');
    }
    io.observe(card);
  });
}

window.addEventListener('DOMContentLoaded', assignStackDirections);
window.addEventListener('resize', () => {
  document.querySelectorAll('.tech-card')
    .forEach(c => c.classList.remove('slide-right','slide-left','in-view'));
  assignStackDirections();
});

// Navbar link active on scroll
const headerHeight = document.querySelector('.navbar').offsetHeight || 80;
const sections = document.querySelectorAll("#home, #About, #portfolio, #contact");

function setActiveLink(id) {
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveLink(entry.target.id);
    }
  });
}, {
  rootMargin: `-${headerHeight}px 0px 0px 0px`,
  threshold: 0.15
});

sections.forEach(sec => sectionObserver.observe(sec));
navLinks.forEach(link => {
  if (link.getAttribute("href").startsWith("#")) {
    link.addEventListener("click", () => {
      setActiveLink(link.getAttribute("href").substring(1));
    });
  }
});
