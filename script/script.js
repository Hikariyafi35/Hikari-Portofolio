/* ==========================================================================
   HIKARI AUFA — PORTFOLIO INTERACTIVITY
   Interactive Project Explorer, Spotlight, Inspector Modal & Experience Log
   ========================================================================== */

const projects = [
    {
        id: "dreamify",
        title: "Dreamify",
        genre: "Puzzle 2D",
        category: "Puzzle",
        role: "Game Programmer",
        platform: "Itch.io",
        studio: "Tim Garde",
        desc: "Alone at home, a child turns isolation into a playground of imagination.",
        details: "A 2D atmospheric puzzle game centered on imaginative environmental interactions, scene flow, and tactile puzzle mechanics built in Unity.",
        tags: ["Unity 2D", "Puzzle Systems", "Interactive Objects"],
        image: "img/dreamify.png",
        link: "https://timgarde.itch.io/dreamify",
        featured: true,
        squareFit: false
    },
    {
        id: "the-unworn",
        title: "The Unworn",
        genre: "3D Platformer",
        category: "Platformer",
        role: "Game Programmer",
        platform: "Global Game Jam 2026",
        studio: "GGJ 2026 Entry",
        desc: "Use magical masks with unique abilities to solve challenges.",
        details: "Built for Global Game Jam 2026 — a 3D platformer where switching between magical masks unlocks distinct traversal and puzzle-solving abilities.",
        tags: ["Unity 3D", "Ability Switching", "Global Game Jam"],
        image: "img/TheUnworn.png",
        link: "https://globalgamejam.org/games/2026/unworn-8",
        featured: true,
        squareFit: true
    },
    {
        id: "bladenspell",
        title: "BladeNSpell",
        genre: "Bullet Heaven",
        category: "Action & Combat",
        role: "Game Developer",
        platform: "Itch.io",
        studio: "Geniuscion Studio",
        desc: "Survive enemy waves, level up, and defeat bosses.",
        details: "Fast-paced 2D bullet-heaven survival game featuring wave spawning, combat progression, upgrade loops, and multi-phase boss encounters.",
        tags: ["Wave Spawner", "Combat Loop", "Boss Encounters"],
        image: "img/BladeNSpel.png",
        link: "https://geniuscion-studio.itch.io/bladenspell",
        featured: true,
        squareFit: false
    },
    {
        id: "natureration",
        title: "Natureration",
        genre: "Narrative 2D",
        category: "Arcade & Narrative",
        role: "Gameplay Programmer",
        platform: "Itch.io",
        studio: "Solo / Indie",
        desc: "Review reports and resolve conflicts as a government official.",
        details: "A narrative decision-making simulator where players evaluate incoming reports, balance competing priorities, and navigate systemic consequences.",
        tags: ["Decision System", "UI Flow", "Narrative 2D"],
        image: "img/natureration.png",
        link: "https://hikariyafi35.itch.io/government-simulator",
        featured: false,
        squareFit: false
    },
    {
        id: "echoes-of-vengeance",
        title: "Echoes Of Vengeance",
        genre: "Action",
        category: "Action & Combat",
        role: "Game Programmer",
        platform: "Itch.io",
        studio: "Limitless Forge Studio",
        desc: "Battle through enemies to save family and restore peace.",
        details: "Action-driven combat experience featuring responsive player attacks, enemy behavior routines, and encounter pacing.",
        tags: ["Action Combat", "Enemy AI", "Unity"],
        image: "img/Echoes Of Vengeance.png",
        link: "https://limitless-forge-studio.itch.io/echoes-of-vengeance-the-shadow-reckoning",
        featured: false,
        squareFit: true
    },
    {
        id: "mortem-regia",
        title: "Mortem Regia",
        genre: "Puzzle Strategy",
        category: "Puzzle",
        role: "Game Programmer",
        platform: "Itch.io",
        studio: "Oraple Studio",
        desc: "Solve physics puzzles using one magical projectile.",
        details: "Physics-based puzzle strategy title built around trajectory planning, rebounding interactions, and deterministic projectile mechanics.",
        tags: ["Rigidbody Physics", "Projectile Logic", "Strategy"],
        image: "img/MortemRegia.png",
        link: "https://oraple-studio.itch.io/mortem-regia",
        featured: false,
        squareFit: false
    },
    {
        id: "bob-the-knight",
        title: "Bob The Knight",
        genre: "Turn-Based",
        category: "Action & Combat",
        role: "Game Programmer",
        platform: "Itch.io",
        studio: "Solo Build",
        desc: "2D turn-based game with simple dialog.",
        details: "A compact 2D turn-based RPG prototype pairing state-driven combat turns with lightweight dialog sequencing.",
        tags: ["Turn-Based FSM", "Dialog System", "Unity 2D"],
        image: "img/bob.png",
        link: "https://hikariyafi35.itch.io/bob-the-knight",
        featured: false,
        squareFit: false
    },
    {
        id: "escape-warehouse",
        title: "Escape : Warehouse Edition",
        genre: "Puzzle",
        category: "Puzzle",
        role: "Game Programmer",
        platform: "Itch.io",
        studio: "Agate AI Course",
        desc: "Thriller puzzle game created during Agate course.",
        details: "A tense thriller puzzle project built during the Agate AI Game Programming Course, incorporating FSM enemy AI, scene management, and audio/VFX polish.",
        tags: ["FSM Enemy AI", "Agate Course", "Thriller Puzzle"],
        image: "img/EscapeWarehouseEdition.jpg",
        link: "https://geniuscion-studio.itch.io/escape",
        featured: false,
        squareFit: false
    },
    {
        id: "luminara-trench",
        title: "Luminara Trench",
        genre: "Puzzle",
        category: "Puzzle",
        role: "Game Programmer",
        platform: "Itch.io",
        studio: "Oraple Studio",
        desc: "Help Mermei find her way home.",
        details: "Deep-sea atmospheric puzzle journey guiding Mermei through subterranean hazards and environmental challenges.",
        tags: ["Puzzle Design", "Level Flow", "Unity"],
        image: "img/luminara.png",
        link: "https://oraple-studio.itch.io/luminara-trench",
        featured: false,
        squareFit: false
    },
    {
        id: "afterwork",
        title: "Afterwork",
        genre: "Arcade",
        category: "Arcade & Narrative",
        role: "Game Programmer",
        platform: "Itch.io",
        studio: "Oraple Studio",
        desc: "Help Budi catch the last train home.",
        details: "Snappy arcade rush where quick timing and obstacle navigation decide whether Budi catches the last commuter train.",
        tags: ["Arcade Loop", "Timing Mechanics", "Unity"],
        image: "img/afterwirk.jpg",
        link: "https://oraple-studio.itch.io/afterwork",
        featured: false,
        squareFit: false
    },
    {
        id: "playgod",
        title: "Playgod",
        genre: "Clicker",
        category: "Arcade & Narrative",
        role: "Game Programmer",
        platform: "Itch.io",
        studio: "Cukurukukuk",
        desc: "Protect your people as a guardian deity.",
        details: "Incremental clicker and defense hybrid where players channel divine actions to safeguard followers and balance resources.",
        tags: ["Clicker Mechanics", "Game Balancing", "UI Systems"],
        image: "img/playgod.jpg",
        link: "https://cukurukukuk.itch.io/playgod",
        featured: false,
        squareFit: false
    },
    {
        id: "ufo-escape",
        title: "Ufo Escape",
        genre: "Platformer",
        category: "Platformer",
        role: "Game Programmer",
        platform: "Itch.io",
        studio: "Solo Build",
        desc: "Simple platformer with smooth scene flow.",
        details: "Focused 2D platforming prototype emphasizing crisp character movement, level transitions, and clean scene management.",
        tags: ["2D Platformer", "Scene Management", "Movement"],
        image: "img/ufoescape.jpg",
        link: "https://hikariyafi35.itch.io/ufo-escape",
        featured: false,
        squareFit: false
    },
    {
        id: "flap-fish",
        title: "Flap Fish",
        genre: "Platformer",
        category: "Platformer",
        role: "Game Programmer",
        platform: "Itch.io",
        studio: "Solo Build",
        desc: "Jump and dodge the pipes.",
        details: "Lightweight physics-driven arcade platformer exploring impulse-based movement, obstacle pooling, and instant-restart loops.",
        tags: ["2D Physics", "Score Loop", "Rapid Prototype"],
        image: "img/flapfish.jpg",
        link: "https://hikariyafi35.itch.io/flappy-fish",
        featured: false,
        squareFit: false
    }
];

const experiences = [
    {
        id: "nouverior",
        period: "Jan 2026 – Apr 2026",
        type: "Internship",
        role: "Game Programmer Intern",
        org: "Nouverior",
        summary: "Worked directly on core gameplay systems and audio synchronization within a collaborative production pipeline.",
        highlights: [
            "Implemented and refined responsive character movement systems.",
            "Built modular skill selection mechanics for player customization.",
            "Developed enemy AI behavior routines for dynamic combat pacing.",
            "Integrated FMOD middleware for synchronized, event-driven gameplay sound effects."
        ],
        tags: ["Unity", "C#", "Character Movement", "Enemy AI", "FMOD"]
    },
    {
        id: "google-unity",
        period: "Jul 2025 – Dec 2025",
        type: "Industry Program",
        role: "Unity Game Developer Trainee",
        org: "Google Play × Unity Program",
        summary: "End-to-end game production training spanning desktop prototyping, visual polish, and mobile deployment.",
        highlights: [
            "Designed and developed complete Unity game projects while managing assets and team workflows.",
            "Integrated character animations, gameplay scripts, and scene lighting setups.",
            "Created enemy NPC AI behaviors and custom particle VFX systems.",
            "Ported desktop builds cleanly to Android for mobile playability."
        ],
        tags: ["Unity", "NPC AI", "Particle VFX", "Lighting", "Android Porting"]
    },
    {
        id: "agate",
        period: "Mar 2025 – Apr 2025",
        type: "Specialized Course",
        role: "AI Game Programming Course",
        org: "Agate",
        summary: "Intensive program centered on gameplay architecture and Finite State Machine (FSM) enemy AI design.",
        highlights: [
            "Architected gameplay systems and enemy AI state transitions using FSM patterns.",
            "Implemented score tracking systems and clean multi-scene management.",
            "Edited 2D pixel assets in Aseprite and polished gameplay feel with audio and VFX."
        ],
        tags: ["FSM AI", "Scene Management", "Aseprite", "Audio & VFX"]
    },
    {
        id: "intsys",
        period: "Sep 2024 – Dec 2024",
        type: "Lab Internship",
        role: "Gameplay Programmer Intern",
        org: "Intsys Lab - Udinus",
        summary: "Built core combat, progression, and competitive systems inside the university's Intelligent Systems Lab.",
        highlights: [
            "Developed player movement, combat actions, and modular buff systems.",
            "Built FSM-driven enemy AI behaviors for varied encounter loops.",
            "Implemented leaderboard tracking alongside VFX and audio integration."
        ],
        tags: ["Combat Systems", "Buff Architecture", "FSM AI", "Leaderboards"]
    },
    {
        id: "celerates",
        period: "Feb 2024 – Jun 2024",
        type: "Bootcamp / Training",
        role: "Game Development Trainee",
        org: "Celerates",
        summary: "Foundational game development program covering full-cycle Unity & C# production through a final capstone build.",
        highlights: [
            "Mastered game design fundamentals and core Unity & C# scripting patterns.",
            "Handled asset integration, gameplay UI/UX layout, and sound design.",
            "Collaborated to build and deliver a playable final game project."
        ],
        tags: ["Unity", "C#", "Game Design", "UI/UX", "Sound Design"]
    }
];

/* --------------------------------------------------------------------------
   STATE
   -------------------------------------------------------------------------- */
const state = {
    activeCategory: "All",
    searchQuery: "",
    viewMode: "grid",
    spotlightIndex: 0,
    activeExpId: experiences[0].id,
    modalOpen: false,
    modalList: projects,
    modalIndex: 0
};

const featuredProjects = projects.filter((p) => p.featured);
const categories = ["All", "Puzzle", "Action & Combat", "Platformer", "Arcade & Narrative"];

/* --------------------------------------------------------------------------
   DOM REFERENCES
   -------------------------------------------------------------------------- */
const spotlightTabsEl = document.getElementById("spotlight-tabs");
const spotlightStageEl = document.getElementById("spotlight-stage");
const filterGroupEl = document.getElementById("filter-group");
const searchInputEl = document.getElementById("project-search");
const viewButtons = document.querySelectorAll(".view-btn");
const projectCountEl = document.getElementById("project-count");
const projectGridEl = document.getElementById("project-grid");

const expListEl = document.getElementById("exp-list");
const expDetailEl = document.getElementById("exp-detail");

const modalEl = document.getElementById("project-modal");
const modalPanelEl = modalEl.querySelector(".modal-panel");
const modalBodyEl = document.getElementById("modal-body");
const modalIndexEl = document.getElementById("modal-index");
const modalPrevBtn = document.getElementById("modal-prev");
const modalNextBtn = document.getElementById("modal-next");
const modalCloseBtn = document.getElementById("modal-close");

let lastFocusedBeforeModal = null;

/* --------------------------------------------------------------------------
   HELPERS
   -------------------------------------------------------------------------- */
function padIndex(n) {
    return String(n + 1).padStart(2, "0");
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getFilteredProjects() {
    const q = state.searchQuery.trim().toLowerCase();
    return projects.filter((project) => {
        const matchCategory =
            state.activeCategory === "All" || project.category === state.activeCategory;
        if (!matchCategory) return false;
        if (!q) return true;
        const haystack = [
            project.title,
            project.genre,
            project.category,
            project.role,
            project.desc,
            project.studio,
            ...project.tags
        ]
            .join(" ")
            .toLowerCase();
        return haystack.includes(q);
    });
}

/* --------------------------------------------------------------------------
   FEATURED SPOTLIGHT
   -------------------------------------------------------------------------- */
function renderSpotlightTabs() {
    spotlightTabsEl.innerHTML = featuredProjects
        .map((project, idx) => {
            const isActive = idx === state.spotlightIndex;
            return `
                <button
                    type="button"
                    class="spotlight-tab ${isActive ? "active" : ""}"
                    role="tab"
                    aria-selected="${isActive}"
                    data-spotlight="${idx}"
                >
                    <span class="tab-left">
                        <span class="tab-num">FEATURED // 0${idx + 1}</span>
                        <span class="tab-title">${project.title}</span>
                    </span>
                    <span class="tab-genre">${project.genre}</span>
                </button>
            `;
        })
        .join("");

    spotlightTabsEl.querySelectorAll(".spotlight-tab").forEach((btn) => {
        btn.addEventListener("click", () => {
            state.spotlightIndex = Number(btn.dataset.spotlight);
            renderSpotlight();
        });
    });
}

function renderSpotlightStage() {
    const project = featuredProjects[state.spotlightIndex];
    const projectGlobalIndex = projects.findIndex((p) => p.id === project.id);

    spotlightStageEl.innerHTML = `
        <div class="spotlight-media ${project.squareFit ? "square-fit" : ""}">
            ${project.squareFit ? `<div class="spotlight-media-bg" style="background-image:url('${encodeURI(project.image)}')"></div>` : ""}
            <span class="spotlight-badge">★ Spotlight · ${project.platform}</span>
            <img src="${project.image}" alt="${project.title} game cover" />
        </div>
        <div class="spotlight-info">
            <div>
                <div class="spotlight-meta">
                    <span>#${padIndex(projectGlobalIndex)}</span>
                    <span class="sep">/</span>
                    <span>${project.genre}</span>
                    <span class="sep">/</span>
                    <span>${project.role}</span>
                </div>
                <h3>${project.title}</h3>
                <p>${project.details}</p>
                <div class="chip-row">
                    ${project.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}
                </div>
            </div>

            <div class="spotlight-actions">
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    <span>Play on ${project.platform}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                </a>
                <button type="button" class="btn btn-secondary" id="spotlight-inspect-btn">
                    <span>Inspect Details</span>
                </button>
            </div>
        </div>
    `;

    document.getElementById("spotlight-inspect-btn").addEventListener("click", () => {
        openModal(projects, projectGlobalIndex);
    });
}

function renderSpotlight() {
    renderSpotlightTabs();
    renderSpotlightStage();
}

/* --------------------------------------------------------------------------
   PROJECT EXPLORER (FILTERS + GRID / LIST)
   -------------------------------------------------------------------------- */
function renderFilters() {
    filterGroupEl.innerHTML = categories
        .map((cat) => {
            const count =
                cat === "All"
                    ? projects.length
                    : projects.filter((p) => p.category === cat).length;
            const active = state.activeCategory === cat;
            return `
                <button type="button" class="filter-btn ${active ? "active" : ""}" data-cat="${cat}">
                    <span>${cat}</span>
                    <span class="filter-count">${count}</span>
                </button>
            `;
        })
        .join("");

    filterGroupEl.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            state.activeCategory = btn.dataset.cat;
            renderFilters();
            renderProjects();
        });
    });
}

function renderProjects() {
    const filtered = getFilteredProjects();
    projectGridEl.dataset.view = state.viewMode;
    projectCountEl.textContent = `Showing ${filtered.length} of ${projects.length} titles`;

    if (filtered.length === 0) {
        projectGridEl.innerHTML = `
            <div class="empty-state">
                <p>No projects match "<strong>${escapeHtml(state.searchQuery)}</strong>" in <strong>${escapeHtml(state.activeCategory)}</strong>.</p>
                <button type="button" class="btn btn-secondary" id="reset-filters-btn">Reset Filters</button>
            </div>
        `;
        document.getElementById("reset-filters-btn").addEventListener("click", () => {
            state.activeCategory = "All";
            state.searchQuery = "";
            searchInputEl.value = "";
            renderFilters();
            renderProjects();
        });
        return;
    }

    projectGridEl.innerHTML = filtered
        .map((project, listIdx) => {
            const globalIdx = projects.findIndex((p) => p.id === project.id);
            const delay = Math.min(listIdx * 35, 280);
            return `
                <article
                    class="project-card"
                    data-list-idx="${listIdx}"
                    tabindex="0"
                    role="button"
                    aria-label="Inspect ${project.title} (${project.genre})"
                    style="animation-delay: ${delay}ms"
                >
                    <div class="card-media">
                        <img src="${project.image}" alt="${project.title}" loading="lazy" />
                        <span class="card-index">#${padIndex(globalIdx)}</span>
                        <span class="card-genre">${project.genre}</span>
                        <span class="card-hover-hint">Inspect ↗</span>
                    </div>

                    <div class="card-body">
                        <div class="card-main-info">
                            <div class="card-title-row">
                                <h3>${project.title}</h3>
                            </div>
                            <div class="card-role">${project.role} · ${project.studio}</div>
                            <p class="card-desc">${project.desc}</p>
                        </div>

                        <div class="card-footer">
                            <div class="card-tags">
                                ${project.tags
                                    .slice(0, 2)
                                    .map((t) => `<span class="card-tag">${t}</span>`)
                                    .join("")}
                            </div>
                            <a
                                href="${project.link}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="card-play-link"
                                aria-label="Play ${project.title} on ${project.platform}"
                            >
                                Play ↗
                            </a>
                        </div>
                    </div>
                </article>
            `;
        })
        .join("");

    projectGridEl.querySelectorAll(".project-card").forEach((card) => {
        const listIdx = Number(card.dataset.listIdx);
        const openCurrent = () => openModal(filtered, listIdx);

        card.addEventListener("click", (e) => {
            if (e.target.closest(".card-play-link")) return;
            openCurrent();
        });

        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                if (e.target.closest(".card-play-link")) return;
                e.preventDefault();
                openCurrent();
            }
        });
    });
}

/* --------------------------------------------------------------------------
   PROJECT INSPECTOR MODAL
   -------------------------------------------------------------------------- */
function renderModalContent() {
    const project = state.modalList[state.modalIndex];
    const globalIdx = projects.findIndex((p) => p.id === project.id);

    modalIndexEl.textContent = `INSPECTOR // #${padIndex(globalIdx)} (${state.modalIndex + 1} of ${state.modalList.length})`;

    modalBodyEl.innerHTML = `
        <div class="modal-hero-media ${project.squareFit ? "square-fit" : ""}">
            ${project.squareFit ? `<div class="modal-hero-media-bg" style="background-image:url('${encodeURI(project.image)}')"></div>` : ""}
            <img src="${project.image}" alt="${project.title} preview" />
        </div>

        <div class="modal-header-row">
            <div>
                <h2 id="modal-title">${project.title}</h2>
                <div class="modal-badges">
                    <span class="modal-badge accent">${project.genre}</span>
                    <span class="modal-badge">${project.category}</span>
                    <span class="modal-badge">${project.platform}</span>
                </div>
            </div>
        </div>

        <p class="modal-desc">${project.details}</p>

        <div class="modal-specs">
            <div class="modal-spec-box">
                <span>Role</span>
                <strong>${project.role}</strong>
            </div>
            <div class="modal-spec-box">
                <span>Release / Origin</span>
                <strong>${project.studio}</strong>
            </div>
            <div class="modal-spec-box">
                <span>Core Focus</span>
                <strong>${project.tags[0]}</strong>
            </div>
        </div>

        <div class="chip-row" style="margin-bottom: 22px;">
            ${project.tags.map((t) => `<span class="chip">${t}</span>`).join("")}
        </div>

        <div class="modal-footer">
            <span class="modal-kbd-hint">Navigate: <kbd>←</kbd> <kbd>→</kbd> · Close: <kbd>Esc</kbd></span>
            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <span>Open on ${project.platform}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
            </a>
        </div>
    `;

    const hasMultiple = state.modalList.length > 1;
    modalPrevBtn.disabled = !hasMultiple;
    modalNextBtn.disabled = !hasMultiple;
}

function openModal(list, index) {
    lastFocusedBeforeModal = document.activeElement;
    state.modalList = list;
    state.modalIndex = index;
    state.modalOpen = true;

    renderModalContent();
    modalEl.classList.add("open");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalPanelEl.focus();
}

function closeModal() {
    if (!state.modalOpen) return;
    state.modalOpen = false;
    modalEl.classList.remove("open");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") {
        lastFocusedBeforeModal.focus();
    }
}

function stepModal(delta) {
    if (!state.modalOpen || state.modalList.length <= 1) return;
    const len = state.modalList.length;
    state.modalIndex = (state.modalIndex + delta + len) % len;
    renderModalContent();
    modalBodyEl.scrollTop = 0;
}

modalCloseBtn.addEventListener("click", closeModal);
modalPrevBtn.addEventListener("click", () => stepModal(-1));
modalNextBtn.addEventListener("click", () => stepModal(1));
modalEl.addEventListener("click", (e) => {
    if (e.target === modalEl) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (!state.modalOpen) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") stepModal(-1);
    if (e.key === "ArrowRight") stepModal(1);
});

/* --------------------------------------------------------------------------
   INTERACTIVE EXPERIENCE WORKBENCH
   -------------------------------------------------------------------------- */
function renderExperience() {
    expListEl.innerHTML = experiences
        .map((exp) => {
            const active = exp.id === state.activeExpId;
            return `
                <button
                    type="button"
                    class="exp-item ${active ? "active" : ""}"
                    role="tab"
                    aria-selected="${active}"
                    data-exp-id="${exp.id}"
                >
                    <span class="exp-item-date">${exp.period}</span>
                    <span class="exp-item-role">${exp.role}</span>
                    <span class="exp-item-org">${exp.org}</span>
                </button>
            `;
        })
        .join("");

    expListEl.querySelectorAll(".exp-item").forEach((btn) => {
        btn.addEventListener("click", () => {
            state.activeExpId = btn.dataset.expId;
            renderExperience();
        });
    });

    const activeExp = experiences.find((e) => e.id === state.activeExpId) || experiences[0];
    expDetailEl.innerHTML = `
        <div class="exp-detail-inner">
            <div class="exp-detail-top">
                <span class="exp-detail-period">${activeExp.period}</span>
                <span class="exp-detail-type">${activeExp.type}</span>
            </div>

            <h3>${activeExp.role}</h3>
            <div class="exp-detail-org">${activeExp.org}</div>

            <p class="exp-detail-summary">${activeExp.summary}</p>

            <ul class="exp-bullets">
                ${activeExp.highlights.map((item) => `<li>${item}</li>`).join("")}
            </ul>

            <div>
                <span class="exp-tags-label">Systems &amp; Tools</span>
                <div class="chip-row">
                    ${activeExp.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}
                </div>
            </div>
        </div>
    `;
}

/* --------------------------------------------------------------------------
   TOOLBAR EVENTS (SEARCH + VIEW MODE)
   -------------------------------------------------------------------------- */
searchInputEl.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderProjects();
});

viewButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const mode = btn.dataset.view;
        if (state.viewMode === mode) return;
        state.viewMode = mode;
        viewButtons.forEach((b) => b.classList.toggle("active", b.dataset.view === mode));
        renderProjects();
    });
});

/* --------------------------------------------------------------------------
   COPY EMAIL INTERACTION
   -------------------------------------------------------------------------- */
const copyEmailBtn = document.getElementById("copy-email-btn");
if (copyEmailBtn) {
    let copyTimer;
    copyEmailBtn.addEventListener("click", async () => {
        const email = copyEmailBtn.dataset.email;
        const label = copyEmailBtn.querySelector(".copy-label");
        try {
            await navigator.clipboard.writeText(email);
        } catch {
            const temp = document.createElement("textarea");
            temp.value = email;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand("copy");
            temp.remove();
        }
        copyEmailBtn.classList.add("copied");
        label.textContent = "Copied!";
        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => {
            copyEmailBtn.classList.remove("copied");
            label.textContent = "Copy Email";
        }, 2000);
    });
}

/* --------------------------------------------------------------------------
   SUBTLE INSPECTOR CARD POINTER TILT (DESKTOP ONLY)
   -------------------------------------------------------------------------- */
const inspectorCard = document.getElementById("hero-inspector");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (inspectorCard && !prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    inspectorCard.addEventListener("mousemove", (e) => {
        const rect = inspectorCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        inspectorCard.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
    });

    inspectorCard.addEventListener("mouseleave", () => {
        inspectorCard.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
}

/* --------------------------------------------------------------------------
   SCROLL PROGRESS, STICKY NAV, SCROLL SPY & REVEAL
   -------------------------------------------------------------------------- */
const navbarEl = document.getElementById("navbar");
const scrollProgressEl = document.getElementById("scroll-progress");
const navLinks = document.querySelectorAll(".nav-links a[data-section]");
const sections = document.querySelectorAll("main section[id]");

function updateScrollUI() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
    scrollProgressEl.style.width = `${pct}%`;
    navbarEl.classList.toggle("scrolled", scrollTop > 20);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

// Scroll-spy for active nav links
const spyObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach((link) => {
                    link.classList.toggle("active", link.dataset.section === id);
                });
            }
        });
    },
    { rootMargin: "-35% 0px -55% 0px" }
);
sections.forEach((sec) => spyObserver.observe(sec));

// Scroll Reveal Observer
const revealEls = document.querySelectorAll(".reveal");
if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
} else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
}

/* --------------------------------------------------------------------------
   MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
const menuToggleBtn = document.getElementById("menu-toggle");
const mobileDrawerEl = document.getElementById("mobile-drawer");

function setDrawerOpen(open) {
    menuToggleBtn.setAttribute("aria-expanded", String(open));
    mobileDrawerEl.setAttribute("aria-hidden", String(!open));
    mobileDrawerEl.classList.toggle("open", open);
    document.body.classList.toggle("modal-open", open || state.modalOpen);
}

menuToggleBtn.addEventListener("click", () => {
    const isOpen = mobileDrawerEl.classList.contains("open");
    setDrawerOpen(!isOpen);
});

mobileDrawerEl.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setDrawerOpen(false));
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawerEl.classList.contains("open")) {
        setDrawerOpen(false);
    }
});

/* --------------------------------------------------------------------------
   INIT
   -------------------------------------------------------------------------- */
renderSpotlight();
renderFilters();
renderProjects();
renderExperience();
