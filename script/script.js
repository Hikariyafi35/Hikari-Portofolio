const projects = [
  {
    title: "Natureration",
    genre: "Narrative 2D",
    role: "Gameplay Programmer",
    desc: "Review reports and resolve conflicts as a government official.",
    image: "img/natureration.png",
    link: "https://hikariyafi35.itch.io/government-simulator",
  },
  {
    title: "BladeNSpell",
    genre: "Bullet Heaven",
    role: "Game Developer",
    desc: "Survive enemy waves, level up, and defeat bosses.",
    image: "img/BladeNSpel.png",
    link: "https://geniuscion-studio.itch.io/bladenspell",
  },
  {
    title: "The Unworn",
    genre: "3D Platformer",
    role: "Game Programmer",
    desc: "Use magical masks with unique abilities to solve challenges.",
    image: "img/TheUnworn.png",
    link: "https://globalgamejam.org/games/2026/unworn-8",
  },
  {
    title: "Echoes Of Vengeance",
    genre: "Action",
    role: "Game Programmer",
    desc: "Battle through enemies to save family and restore peace.",
    image: "img/Echoes Of Vengeance.png",
    link: "https://limitless-forge-studio.itch.io/echoes-of-vengeance-the-shadow-reckoning",
  },
  {
    title: "Mortem Regia",
    genre: "Puzzle Strategy",
    role: "Game Programmer",
    desc: "Solve physics puzzles using one magical projectile.",
    image: "img/MortemRegia.png",
    link: "https://oraple-studio.itch.io/mortem-regia",
  },
  {
    title: "Escape : Warehouse Edition",
    genre: "Puzzle",
    role: "Game Programmer",
    desc: "Thriller puzzle game created during Agate course.",
    image: "img/EscapeWarehouseEdition.jpg",
    link: "https://geniuscion-studio.itch.io/escape",
  },
  {
    title: "Afterwork",
    genre: "Arcade",
    role: "Game Programmer",
    desc: "Help Budi catch the last train home.",
    image: "img/afterwirk.jpg",
    link: "https://oraple-studio.itch.io/afterwork",
  },
  {
    title: "Playgod",
    genre: "Clicker",
    role: "Game Programmer",
    desc: "Protect your people as a guardian deity.",
    image: "img/playgod.jpg",
    link: "https://cukurukukuk.itch.io/playgod",
  },
  {
    title: "Luminara Trench",
    genre: "Puzzle",
    role: "Game Programmer",
    desc: "Help Mermei find her way home.",
    image: "img/luminara.png",
    link: "https://oraple-studio.itch.io/luminara-trench",
  },
  {
    title: "Ufo Escape",
    genre: "Platformer",
    role: "Game Programmer",
    desc: "Simple platformer with smooth scene flow.",
    image: "img/ufoescape.jpg",
    link: "https://hikariyafi35.itch.io/ufo-escape",
  },
  {
    title: "Flap Fish",
    genre: "Platformer",
    role: "Game Programmer",
    desc: "Jump and dodge the pipes.",
    image: "img/flapfish.jpg",
    link: "https://hikariyafi35.itch.io/flappy-fish",
  },
];

const projectGrid = document.getElementById("project-grid");

function renderProjects() {
  projectGrid.innerHTML = "";

  projects.forEach((project) => {
    projectGrid.innerHTML += `
      <a href="${project.link}" target="_blank" class="project-card">
        <img src="${project.image}" alt="${project.title}">
        <div class="project-content">
          <h3>${project.title}</h3>
          <span class="project-tag">${project.genre}</span>
          <p>Role: ${project.role}</p>
          <small>${project.desc}</small>
        </div>
      </a>
    `;
  });
}

renderProjects();

let autoScroll;
let isHovering = false;
let scrollSpeed = 0.8; // kecepatan auto scroll idle

// Wheel scroll horizontal
projectGrid.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();

    // pause auto scroll saat user interact
    stopAutoScroll();

    // scroll lebih cepat
    projectGrid.scrollLeft += e.deltaY * 2.8;

    // setelah 1 detik idle, auto jalan lagi
    clearTimeout(projectGrid.resumeTimer);
    projectGrid.resumeTimer = setTimeout(() => {
      if (!isHovering) startAutoScroll();
    }, 1000);
  },
  { passive: false },
);

// Auto scroll pakai requestAnimationFrame (lebih smooth dari setInterval)
function autoMove() {
  if (!isHovering) {
    projectGrid.scrollLeft += scrollSpeed;

    // loop ke awal
    if (
      projectGrid.scrollLeft >=
      projectGrid.scrollWidth - projectGrid.clientWidth
    ) {
      projectGrid.scrollLeft = 0;
    }
  }

  autoScroll = requestAnimationFrame(autoMove);
}

function startAutoScroll() {
  cancelAnimationFrame(autoScroll);
  autoMove();
}

function stopAutoScroll() {
  cancelAnimationFrame(autoScroll);
}

projectGrid.addEventListener("mouseenter", () => {
  isHovering = true;
  stopAutoScroll();
});

projectGrid.addEventListener("mouseleave", () => {
  isHovering = false;
  startAutoScroll();
});

startAutoScroll();
