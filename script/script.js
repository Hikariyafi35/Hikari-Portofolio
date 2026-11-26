/* ==========================================================================
   HIKARI AUFA — PORTFOLIO INTERACTIVITY
   Projects Explorer, Spotlight, Experience Workbench & Certificate Inspector
   ========================================================================== */

const projects = [
    {
        id: "natureration",
        title: "Natureration",
        genre: "Narrative 2D",
        category: "Arcade & Narrative",
        role: "Gameplay Programmer",
        platform: "Itch.io",
        studio: "Tim Garde · ICW Sayembara Gim 2026",
        award: "2nd Place · ICW Sayembara Gim 2026",
        desc: "2nd Place Winner at ICW Sayembara Game Competition — review reports and resolve climate corruption conflicts in Indonesia.",
        details: "Awarded 2nd Place (Tim Garde — \"Nature's Ration\") at the ICW Sayembara Game Development End Climate Corruption 2026. Developed a 2D narrative game centered on corruption and environmental issues set in Indonesia — implementing Scriptable Objects to manage reports and dialogue alongside a multiple-ending system driven by the player's cumulative choice score.",
        tags: ["Scriptable Objects", "Multiple Endings", "Dialogue System", "Unity 2D"],
        architecture: [
            { label: "Data Architecture", text: "Scriptable Objects structured to store modular environmental reports, case metadata, and branching dialogue data cleanly." },
            { label: "Outcome Engine", text: "Cumulative choice-score tracker evaluating player decisions across cases to resolve multiple narrative endings." },
            { label: "UI & Flow", text: "2D inspection interface for reviewing incoming official reports and resolving climate-corruption conflicts." },
            { label: "Recognition", text: "2nd Place Winner (Tim Garde — \"Nature's Ration\") at ICW × The Lazy Monday Sayembara Game Development." }
        ],
        image: "img/natureration.png",
        link: "https://hikariyafi35.itch.io/government-simulator",
        itchEmbedId: "4524462",
        featured: true,
        squareFit: false
    },
    {
        id: "dreamify",
        title: "Dreamify",
        genre: "Puzzle 2D",
        category: "Puzzle",
        role: "Game Programmer",
        platform: "Itch.io",
        studio: "Gameseed 2026 · Tim Garde",
        award: null,
        desc: "2D top-down puzzle game featuring a Dual-World dimension-switching mechanic.",
        details: "Developed for Gameseed 2026 — a 2D top-down puzzle game in Unity (C#) featuring a Dual-World dimension-switching mechanic. Responsible for core gameplay programming, enemy AI (FSM), 2D physics optimization, Fungus dialogue integration, Singleton-based audio architecture, and WebGL deployment.",
        tags: ["Dual-World Mechanic", "FSM Enemy AI", "Fungus Dialogue", "WebGL"],
        architecture: [
            { label: "Core Mechanic", text: "Dual-World dimension-switching system toggling interactive puzzle states and traversal rules in top-down 2D." },
            { label: "Enemy AI & Physics", text: "Finite State Machine (FSM) enemy behavior paired with optimized 2D Rigidbody physics and collision handling." },
            { label: "Narrative & Audio", text: "Fungus dialogue integration for story beats alongside a Singleton-based audio manager across scenes." },
            { label: "Deployment", text: "Built and optimized in Unity (C#) for browser-ready WebGL deployment (Gameseed 2026)." }
        ],
        image: "img/dreamify.png",
        link: "https://timgarde.itch.io/dreamify",
        itchEmbedId: "4742559",
        featured: true,
        squareFit: false
    },
    {
        id: "bladenspell",
        title: "BladeNSpell",
        genre: "Bullet Heaven",
        category: "Action & Combat",
        role: "Game Developer",
        platform: "Itch.io",
        studio: "Oraple Studio · Intsys Lab Udinus",
        award: null,
        desc: "2D musou hack-and-slash survival game — strategically select spells, survive enemy waves, and defeat bosses.",
        details: "Internship project at Intsys Lab, Universitas Dian Nuswantoro. Developed a 2D musou hack-and-slash survival game where players strategically pick spells to survive escalating waves and achieve high scores. Built core gameplay mechanics, enemy AI, wave spawning systems, UI/UX, and itch.io asset integration.",
        tags: ["Musou Survival", "Wave Spawner", "Enemy AI", "Spell Progression"],
        architecture: [
            { label: "Combat & Spells", text: "2D musou hack-and-slash combat loop with strategic spell selection and level-up build progression." },
            { label: "Wave & Enemy AI", text: "Escalating enemy wave spawner coordinated with autonomous enemy AI and boss encounter pacing." },
            { label: "UI & Scoring", text: "Real-time gameplay HUD, spell picker UI/UX, and high-score tracking systems." },
            { label: "Asset Pipeline", text: "Integrated sprite animations, combat effects, and audio assets from itch.io into Unity." }
        ],
        image: "img/BladeNSpel.png",
        link: "https://oraple-studio.itch.io/bladenspell",
        itchEmbedId: "3184176",
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
        studio: "Global Game Jam 2026",
        award: null,
        desc: "Use magical masks with unique abilities to solve 3D platforming challenges.",
        details: "Built for Global Game Jam 2026 — a 3D platformer where switching between magical masks unlocks distinct traversal and puzzle-solving abilities.",
        tags: ["Unity 3D", "Ability Switching", "Global Game Jam"],
        architecture: [
            { label: "Mask Ability System", text: "Modular mask-switching mechanic granting distinct movement and puzzle-solving abilities on demand." },
            { label: "3D Platforming", text: "Responsive 3D character movement, jump feel, and spatial platform challenge flow in Unity." },
            { label: "Jam Production", text: "Rapidly prototyped, integrated, and shipped under Global Game Jam 2026 time constraints." }
        ],
        image: "img/TheUnworn.png",
        link: "https://globalgamejam.org/games/2026/unworn-8",
        featured: true,
        squareFit: true
    },
    {
        id: "bob-the-knight",
        title: "Bob The Knight",
        genre: "Turn-Based",
        category: "Action & Combat",
        role: "Game Programmer",
        platform: "Itch.io",
        studio: "Solo Prototype",
        award: null,
        desc: "2D turn-based RPG prototype with state-driven combat, world exploration, and keyboard UI navigation.",
        details: "Developed a 2D turn-based RPG prototype in Unity and C#. Implemented a state machine-based battle system, enemy AI, world map exploration, scene transitions, NPC movement, and full keyboard navigation using Unity's Event System.",
        tags: ["Turn-Based FSM", "World Exploration", "Unity Event System"],
        architecture: [
            { label: "Battle State Machine", text: "State-machine driven turn-based combat managing player turns, enemy AI actions, and win/loss flow." },
            { label: "World & NPCs", text: "2D world map exploration, autonomous NPC movement routines, and lightweight dialog interactions." },
            { label: "Input & UI Flow", text: "Keyboard-first menu navigation wired through Unity's Event System alongside clean scene transitions." }
        ],
        image: "img/bob.png",
        link: "https://hikariyafi35.itch.io/bob-the-knight",
        itchEmbedId: "4912489",
        featured: true,
        squareFit: false
    },
    {
        id: "echoes-of-vengeance",
        title: "Echoes Of Vengeance",
        genre: "Action",
        category: "Action & Combat",
        role: "Game Programmer",
        platform: "Itch.io",
        studio: "MSIB Celerates Capstone",
        award: null,
        desc: "Action combat game featuring melee & ranged attacks, enemy AI, and parallax environments.",
        details: "Final Capstone Project for Studi Independen at PT Mitra Talenta Group (Celerates). Developed core gameplay systems including player movement, melee and ranged combat, health management, enemy AI, sprite and parallax background integration, and full scene transitions across menus, options, gameplay, and credits.",
        tags: ["Melee & Ranged Combat", "Enemy AI", "Parallax 2D", "Scene Flow"],
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
        studio: "Selasar Gamejam · Oraple Studio",
        award: null,
        desc: "One-shot physics puzzle strategy — eliminate every enemy in a level using a single magical projectile.",
        details: "Built for Selasar Gamejam. Designed around a one-shot gameplay mechanic where players have only one bullet to clear each level, enhanced by strategic power-ups including Clone, Upsize, and Magnet to create varied tactical solutions.",
        tags: ["One-Shot Physics", "Clone / Upsize / Magnet", "Puzzle Strategy"],
        image: "img/MortemRegia.png",
        link: "https://oraple-studio.itch.io/mortem-regia",
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
        award: null,
        desc: "Thriller puzzle game where players find keys and collect energy buffs to outplay FSM & NavMesh enemies.",
        details: "Developed during the Agate AI Game Programming Course. Players search for keys to escape while collecting energy buffs to defeat patrolling threats — powered by Finite State Machine (FSM) enemy AI and Unity NavMesh pathfinding.",
        tags: ["FSM Enemy AI", "NavMesh Navigation", "Energy Buffs"],
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
        studio: "Compfest 2024 · Oraple Studio",
        award: null,
        desc: "Underwater puzzle-thriller combining 2D and 3D artist-crafted assets in Unity.",
        details: "Built for Compfest 2024. Developed an underwater-themed puzzle-thriller in Unity, integrating custom 2D and 3D assets created by the game artist team seamlessly into gameplay interactions and level flow.",
        tags: ["2D/3D Hybrid", "Puzzle-Thriller", "Compfest 2024"],
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
        desc: "Help Budi catch the last train home in a snappy arcade rush.",
        details: "Fast-paced arcade runner where split-second timing and obstacle navigation decide whether Budi catches the last commuter train.",
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
        id: "lentera-nusantara",
        period: "Present",
        type: "Current Role",
        role: "Game Programmer",
        org: "Lentera Nusantara",
        summary: "Currently contributing as a Game Programmer at Lentera Nusantara — engineering core gameplay systems, interactive mechanics, and responsive player experiences in Unity & C#.",
        highlights: [
            "Developing and maintaining modular gameplay systems and feature pipelines in Unity & C#.",
            "Collaborating closely with designers, artists, and engineers to ship polished interactive builds.",
            "Applying structured gameplay architecture, AI behaviors, and optimization best practices in studio production."
        ],
        tags: ["Unity", "C#", "Gameplay Systems", "Studio Production"]
    },
    {
        id: "nouverior",
        period: "Jan 2026 – Apr 2026",
        type: "Internship",
        role: "Game Programmer Intern",
        org: "Nouverior",
        summary: "Contributed to core character mechanics, active skill systems, enemy AI behaviors, and synchronized FMOD audio integration.",
        highlights: [
            "Contributed to character movement mechanics using Unity and C# for smooth, responsive controls.",
            "Implemented a skill selection system allowing players to trigger and switch abilities during gameplay.",
            "Assisted in developing enemy AI including state behaviors and combat reactions.",
            "Integrated audio using FMOD with sound events synchronized directly to gameplay actions."
        ],
        tags: ["Unity", "C#", "Skill Selection", "Enemy AI", "FMOD"]
    },
    {
        id: "google-unity",
        period: "Jul 2025 – Dec 2025",
        type: "Industry Training Program",
        role: "Unity Game Developer Trainee",
        org: "Google Play × Unity Program",
        summary: "Comprehensive game development program spanning concept prototyping, NPC AI, lighting/VFX polish, and mobile porting.",
        highlights: [
            "Designed and developed game concepts and complete gameplay systems.",
            "Managed project workflows, game assets, animations, scripts, and scene lighting.",
            "Developed AI behaviors for NPC enemies and implemented particle-based visual effects (VFX).",
            "Ported desktop Unity builds cleanly to Android."
        ],
        tags: ["Unity", "NPC AI", "Particle VFX", "Lighting", "Android Porting"]
    },
    {
        id: "agate",
        period: "Mar 2025 – Apr 2025",
        type: "Specialized Course",
        role: "AI Game Programming Course",
        org: "Agate Academy (Batch 7)",
        summary: "Focused game AI course mastering Finite State Machines, NavMesh navigation, combat mechanics, and gameplay polish.",
        highlights: [
            "Developed gameplay mechanics including character movement, melee & ranged combat, and buff systems.",
            "Implemented enemy AI using the Finite State Machine (FSM) pattern and NavMesh navigation.",
            "Built a leaderboard system with save functionality and structured scene management.",
            "Edited pixel assets in Aseprite and integrated synchronized audio and VFX."
        ],
        tags: ["FSM AI", "NavMesh", "Save & Leaderboard", "Aseprite", "VFX"]
    },
    {
        id: "intsys",
        period: "Sep 2024 – Dec 2024",
        type: "Lab Internship",
        role: "Gameplay Programmer Intern",
        org: "Intsys Lab — Universitas Dian Nuswantoro",
        summary: "Built combat, progression, and AI systems for lab game projects including the musou survival title BladeNSpell.",
        highlights: [
            "Developed character movement, melee and ranged combat, and modular buff systems.",
            "Implemented enemy AI behaviors using the Finite State Machine (FSM) approach.",
            "Built a leaderboard and save system with multi-scene management.",
            "Edited game assets using Aseprite and integrated audio and visual effects (VFX)."
        ],
        tags: ["Combat Systems", "FSM AI", "Save System", "BladeNSpell"]
    },
    {
        id: "celerates",
        period: "Feb 2024 – Jun 2024",
        type: "MSIB Batch 6 · Grade A (85.41)",
        role: "Studi Independen — Game Design & Development",
        org: "Celerates (PT Mitra Talenta Grup)",
        summary: "Kampus Merdeka Studi Independen acceleration program covering full-cycle Unity game development, monetization, playtesting, and capstone delivery.",
        highlights: [
            "Studied game design fundamentals, GDD authoring, and game development principles.",
            "Developed games using Unity & C#, managing and integrating assets, UI/UX, and game audio.",
            "Conducted playtesting sessions, Agile (Scrum) project management, and monetization strategy.",
            "Delivered Echoes Of Vengeance as the final capstone build with an overall average grade of 85.41 (A)."
        ],
        tags: ["Unity", "C#", "GDD", "UI/UX & Audio", "Scrum", "Capstone"]
    },
    {
        id: "udemy-3d",
        period: "2023",
        type: "Certification Course",
        role: "Complete C# Unity Game Developer 3D",
        org: "Udemy",
        summary: "Hands-on 3D Unity & C# curriculum building multiple mini-game projects from core scripting to post-processing.",
        highlights: [
            "Mastered core C# concepts including variables, methods, conditionals, and serialization.",
            "Implemented player movement, input systems, Rigidbody physics, and collision detection.",
            "Applied Cinemachine camera systems, lighting, post-processing, prefabs, particles, audio, and UI.",
            "Developed several playable mini-game projects to solidify fundamentals."
        ],
        tags: ["Unity 3D", "C#", "Rigidbody Physics", "Cinemachine", "Post-Processing"]
    },
    {
        id: "dncc-btng",
        period: "Sep 2023 – Oct 2023",
        type: "Bootcamp",
        role: "BTNG Bootcamp Game Developer",
        org: "DNCC — Universitas Dian Nuswantoro",
        summary: "Basic Training for Next Generation (Game Division) introducing C# scripting and Unity fundamentals.",
        highlights: [
            "Learned C# programming fundamentals tailored for game scripting.",
            "Developed foundational Unity game prototypes.",
            "Implemented scene management workflows in Unity."
        ],
        tags: ["C# Fundamentals", "Unity", "Scene Management"]
    }
];

const certificates = [
    {
        id: "unity-certified-associate",
        title: "Unity Certified Associate: Game Developer",
        issuer: "Unity Technologies",
        category: "Game Dev & Unity",
        date: "Oct 2025 – Oct 2028",
        badge: "FLAGSHIP CERT",
        flagship: true,
        credentialId: "bc3d48a275754ee3b4990d7068417b50",
        note: "Official industry certification from Unity Technologies validating professional proficiency in Unity game development, C# programming, asset pipelines, and gameplay systems.",
        image: "img/certs/unity-certified-associate.png",
        pdf: "certs/unity-certified-associate.pdf",
        verifyUrl: "https://cp.certmetrics.com/Unity/en/public/verify/credential"
    },
    {
        id: "icw-sayembara-2026",
        title: "Juara 2 — Sayembara Game Development End Climate Corruption",
        issuer: "Indonesia Corruption Watch (ICW) × The Lazy Monday",
        category: "Awards & Events",
        date: "2026",
        badge: "2ND PLACE AWARD",
        flagship: true,
        credentialId: "Tim Garde · \"Nature's Ration\"",
        note: "Piagam Penghargaan Juara 2 diberikan kepada Tim Garde untuk karya game \"Nature's Ration\" (Natureration) pada Sayembara Game Development End Climate Corruption.",
        image: "img/certs/icw-sayembara-2026.jpg",
        pdf: null,
        verifyUrl: "https://hikariyafi35.itch.io/government-simulator"
    },
    {
        id: "agate-ai-2025",
        title: "AI Game Programming — Agate Game Course Batch 7",
        issuer: "Agate Academy",
        category: "Game Dev & Unity",
        date: "Feb – Mar 2025",
        badge: "GAME AI",
        flagship: false,
        credentialId: "118/APR/ACM.00/IV/2025",
        note: "Completed specialized training in Finite State Machine (FSM) enemy AI, NavMesh pathfinding, gameplay systems, and polish at Agate Academy.",
        image: "img/certs/agate-ai-game-programming.png",
        pdf: "certs/agate-ai-game-programming.pdf",
        verifyUrl: null
    },
    {
        id: "gameseed-2025",
        title: "Gameseed 2025 Participant Certificate",
        issuer: "EKRAF × Asosiasi Game Indonesia (AGI)",
        category: "Awards & Events",
        date: "2025",
        badge: "NATIONAL EVENT",
        flagship: false,
        credentialId: "Sponsored by Tencent, Nuon & Google",
        note: "Official recognition from Kementerian Ekonomi Kreatif (EKRAF) and Asosiasi Game Indonesia (AGI) for participating in Gameseed 2025.",
        image: "img/certs/gameseed-2025.jpg",
        pdf: null,
        verifyUrl: null
    },
    {
        id: "celerates-msib-2024",
        title: "MSIB Batch 6 — Game Design & Development (Grade A · 85.41)",
        issuer: "Celerates · PT Mitra Talenta Grup (Kampus Merdeka)",
        category: "Game Dev & Unity",
        date: "Feb – Jun 2024",
        badge: "GRADE A · 85.41",
        flagship: false,
        credentialId: "ID Kegiatan: 8429543",
        note: "Completed Kampus Merdeka Studi Independen covering Game Theory (94), Coding Foundation (90.5), Advanced Mechanics & Monetization (100), and Capstone production.",
        image: "img/certs/celerates-msib-transcript.png",
        pdf: "certs/celerates-msib-transcript.pdf",
        secondaryPdf: "certs/celerates-completion.pdf",
        verifyUrl: null
    },
    {
        id: "dncc-btng-2023",
        title: "Basic Training for Next Generation (BTNG) — Game Division",
        issuer: "DNCC · Universitas Dian Nuswantoro",
        category: "Game Dev & Unity",
        date: "Sep – Oct 2023",
        badge: "BOOTCAMP",
        flagship: false,
        credentialId: "Divisi Game · Time to Level Up!",
        note: "Completed intensive introductory training in C# fundamentals, Unity workflows, and scene management with Dian Nuswantoro Computer Club.",
        image: "img/certs/dncc-btng-2023.jpg",
        pdf: null,
        verifyUrl: null
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
    activeCertCategory: "All",
    modalOpen: false,
    modalMode: "project", // "project" | "certificate"
    modalTab: "overview", // "overview" | "architecture"
    modalList: projects,
    modalIndex: 0
};

const featuredProjects = projects.filter((p) => p.featured);
const categories = ["All", "Puzzle", "Action & Combat", "Platformer", "Arcade & Narrative"];
const certCategories = ["All", "Game Dev & Unity", "Awards & Events"];

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

const certFilterGroupEl = document.getElementById("cert-filter-group");
const certCountEl = document.getElementById("cert-count");
const certGridEl = document.getElementById("cert-grid");

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
            project.details,
            project.studio,
            project.award || "",
            ...project.tags
        ]
            .join(" ")
            .toLowerCase();
        return haystack.includes(q);
    });
}

function getFilteredCertificates() {
    if (state.activeCertCategory === "All") return certificates;
    return certificates.filter((c) => c.category === state.activeCertCategory);
}

/* --------------------------------------------------------------------------
   FEATURED SPOTLIGHT
   -------------------------------------------------------------------------- */
function renderSpotlightTabs() {
    spotlightTabsEl.innerHTML = featuredProjects
        .map((project, idx) => {
            const isActive = idx === state.spotlightIndex;
            const eyebrow = project.award ? `★ 2ND PLACE // 0${idx + 1}` : `FEATURED // 0${idx + 1}`;
            return `
                <button
                    type="button"
                    class="spotlight-tab ${isActive ? "active" : ""}"
                    role="tab"
                    aria-selected="${isActive}"
                    data-spotlight="${idx}"
                >
                    <span class="tab-left">
                        <span class="tab-num">${eyebrow}</span>
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
            if (window.GameSFX) window.GameSFX.tab();
        });
    });
}

function renderSpotlightStage() {
    const project = featuredProjects[state.spotlightIndex];
    const projectGlobalIndex = projects.findIndex((p) => p.id === project.id);
    const badgeText = project.award
        ? `🏆 ${project.award}`
        : `★ Spotlight · ${project.studio}`;

    spotlightStageEl.innerHTML = `
        <div class="spotlight-media ${project.squareFit ? "square-fit" : ""}">
            ${project.squareFit ? `<div class="spotlight-media-bg" style="background-image:url('${encodeURI(project.image)}')"></div>` : ""}
            <span class="spotlight-badge">${badgeText}</span>
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
        openModal("project", projects, projectGlobalIndex);
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
            if (window.GameSFX) window.GameSFX.click();
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
                    class="project-card ${project.award ? "is-award" : ""}"
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
                        ${project.award ? `<span class="card-award-ribbon">🏆 2nd Place ICW</span>` : ""}
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
        const openCurrent = () => openModal("project", filtered, listIdx);

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

        attachCardFeel(card);
    });
}

/* --------------------------------------------------------------------------
   CERTIFICATES & AWARDS SECTION
   -------------------------------------------------------------------------- */
function renderCertFilters() {
    certFilterGroupEl.innerHTML = certCategories
        .map((cat) => {
            const count =
                cat === "All"
                    ? certificates.length
                    : certificates.filter((c) => c.category === cat).length;
            const active = state.activeCertCategory === cat;
            return `
                <button type="button" class="filter-btn ${active ? "active" : ""}" data-cert-cat="${cat}">
                    <span>${cat}</span>
                    <span class="filter-count">${count}</span>
                </button>
            `;
        })
        .join("");

    certFilterGroupEl.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            state.activeCertCategory = btn.dataset.certCat;
            renderCertFilters();
            renderCertificates();
            if (window.GameSFX) window.GameSFX.click();
        });
    });
}

function renderCertificates() {
    const filtered = getFilteredCertificates();
    const previewable = filtered.filter((c) => c.image);
    certCountEl.textContent = `${filtered.length} of ${certificates.length} credentials`;

    certGridEl.innerHTML = filtered
        .map((cert, idx) => {
            const delay = Math.min(idx * 35, 260);
            const hasPreview = Boolean(cert.image);
            const previewIdx = previewable.findIndex((c) => c.id === cert.id);
            return `
                <article
                    class="cert-card ${hasPreview ? "has-preview" : ""} ${cert.flagship ? "featured-cert" : ""}"
                    ${hasPreview ? `data-cert-preview-idx="${previewIdx}" tabindex="0" role="button" aria-label="View certificate: ${cert.title}"` : ""}
                    style="animation-delay: ${delay}ms"
                >
                    ${
                        hasPreview
                            ? `
                        <div class="cert-thumb">
                            <img src="${cert.image}" alt="${cert.title}" loading="lazy" />
                            <span class="cert-thumb-badge ${cert.flagship ? "flagship" : ""}">${cert.badge}</span>
                            <span class="card-hover-hint">View Scan ↗</span>
                        </div>
                    `
                            : ""
                    }
                    <div class="cert-card-body">
                        <div class="cert-meta-row">
                            <span class="cert-cat">${cert.category}</span>
                            <span>${cert.date}</span>
                        </div>
                        <h3>${cert.title}</h3>
                        <div class="cert-issuer">${cert.issuer}</div>
                        <p class="cert-note">${cert.note}</p>
                        <div class="cert-card-footer">
                            <span class="cert-id-chip" title="${escapeHtml(cert.credentialId)}">${cert.credentialId}</span>
                            <div class="cert-actions-inline">
                                ${
                                    cert.verifyUrl
                                        ? `<a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="cert-mini-btn">Verify ↗</a>`
                                        : ""
                                }
                                ${
                                    cert.pdf
                                        ? `<a href="${cert.pdf}" target="_blank" rel="noopener noreferrer" class="cert-mini-btn">PDF ↗</a>`
                                        : ""
                                }
                                ${
                                    hasPreview && !cert.pdf && !cert.verifyUrl
                                        ? `<span class="cert-mini-btn">Inspect</span>`
                                        : ""
                                }
                            </div>
                        </div>
                    </div>
                </article>
            `;
        })
        .join("");

    certGridEl.querySelectorAll(".cert-card.has-preview").forEach((card) => {
        const previewIdx = Number(card.dataset.certPreviewIdx);
        const openCert = () => openModal("certificate", previewable, previewIdx);

        card.addEventListener("click", (e) => {
            if (e.target.closest("a")) return;
            openCert();
        });

        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                if (e.target.closest("a")) return;
                e.preventDefault();
                openCert();
            }
        });

        attachCardFeel(card);
    });
}

/* --------------------------------------------------------------------------
   SHARED INSPECTOR MODAL (PROJECTS + CERTIFICATES)
   -------------------------------------------------------------------------- */
function renderProjectModal(project) {
    const globalIdx = projects.findIndex((p) => p.id === project.id);
    const hasArch = Array.isArray(project.architecture) && project.architecture.length > 0;
    const activeTab = hasArch ? state.modalTab : "overview";

    modalIndexEl.textContent = `PROJECT // #${padIndex(globalIdx)} (${state.modalIndex + 1} of ${state.modalList.length})`;

    const itchWidgetHtml = project.itchEmbedId
        ? `
            <div class="itch-embed-shell">
                <div class="itch-embed-head">
                    <span>ITCH.IO LIVE WIDGET</span>
                    <span class="accent">PLAY / DOWNLOAD ↗</span>
                </div>
                <div class="itch-embed-frame-wrap">
                    <iframe
                        src="https://itch.io/embed/${project.itchEmbedId}?bg_color=14161a&amp;fg_color=f2efe9&amp;link_color=e5a93b&amp;border_color=272b33"
                        title="${escapeHtml(project.title)} on itch.io"
                        loading="lazy"
                    >
                        <a href="${project.link}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.title)} on itch.io</a>
                    </iframe>
                </div>
            </div>
        `
        : "";

    const tabsHtml = hasArch
        ? `
            <div class="modal-tabs" role="tablist" aria-label="Project details view">
                <button type="button" class="modal-tab-btn ${activeTab === "overview" ? "active" : ""}" data-modal-tab="overview" role="tab" aria-selected="${activeTab === "overview"}">Overview</button>
                <button type="button" class="modal-tab-btn ${activeTab === "architecture" ? "active" : ""}" data-modal-tab="architecture" role="tab" aria-selected="${activeTab === "architecture"}">Systems &amp; Architecture</button>
            </div>
        `
        : "";

    const tabContentHtml =
        activeTab === "architecture" && hasArch
            ? `
                <div class="arch-list">
                    ${project.architecture
                        .map(
                            (item) => `
                        <div class="arch-card">
                            <span class="arch-card-label">${item.label}</span>
                            <p>${item.text}</p>
                        </div>
                    `
                        )
                        .join("")}
                </div>
            `
            : `
                <p class="modal-desc">${project.details}</p>

                <div class="modal-specs">
                    <div class="modal-spec-box">
                        <span>Role</span>
                        <strong>${project.role}</strong>
                    </div>
                    <div class="modal-spec-box">
                        <span>Event / Studio</span>
                        <strong>${project.studio}</strong>
                    </div>
                    <div class="modal-spec-box">
                        <span>Core System</span>
                        <strong>${project.tags[0]}</strong>
                    </div>
                </div>

                ${itchWidgetHtml}
            `;

    modalBodyEl.innerHTML = `
        <div class="modal-hero-media ${project.squareFit ? "square-fit" : ""}">
            ${project.squareFit ? `<div class="modal-hero-media-bg" style="background-image:url('${encodeURI(project.image)}')"></div>` : ""}
            <img src="${project.image}" alt="${project.title} preview" />
        </div>

        ${project.award ? `<div class="award-pill">🏆 ${project.award}</div>` : ""}

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

        ${tabsHtml}
        ${tabContentHtml}

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

    modalBodyEl.querySelectorAll(".modal-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            state.modalTab = btn.dataset.modalTab;
            renderProjectModal(project);
            if (window.GameSFX) window.GameSFX.tab();
        });
    });
}

function renderCertificateModal(cert) {
    modalIndexEl.textContent = `CREDENTIAL // ${String(state.modalIndex + 1).padStart(2, "0")} OF ${String(state.modalList.length).padStart(2, "0")}`;

    modalBodyEl.innerHTML = `
        <div class="modal-cert-media">
            <img src="${cert.image}" alt="${cert.title}" />
        </div>

        <div class="modal-header-row">
            <div>
                <h2 id="modal-title">${cert.title}</h2>
                <div class="modal-badges">
                    <span class="modal-badge accent">${cert.badge}</span>
                    <span class="modal-badge">${cert.category}</span>
                    <span class="modal-badge">${cert.date}</span>
                </div>
            </div>
        </div>

        <p class="modal-desc">${cert.note}</p>

        <div class="modal-specs">
            <div class="modal-spec-box">
                <span>Issued By</span>
                <strong>${cert.issuer}</strong>
            </div>
            <div class="modal-spec-box">
                <span>Period / Validity</span>
                <strong>${cert.date}</strong>
            </div>
            <div class="modal-spec-box">
                <span>Credential ID / Info</span>
                <strong style="word-break: break-all;">${cert.credentialId}</strong>
            </div>
        </div>

        <div class="modal-footer">
            <span class="modal-kbd-hint">Navigate: <kbd>←</kbd> <kbd>→</kbd> · Close: <kbd>Esc</kbd></span>
            <div class="modal-footer-actions">
                ${
                    cert.verifyUrl
                        ? `<a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                            <span>Verify Credential</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                           </a>`
                        : ""
                }
                ${
                    cert.pdf
                        ? `<a href="${cert.pdf}" target="_blank" rel="noopener noreferrer" class="btn ${cert.verifyUrl ? "btn-secondary" : "btn-primary"}">
                            <span>Open Full PDF</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                           </a>`
                        : ""
                }
                ${
                    cert.secondaryPdf
                        ? `<a href="${cert.secondaryPdf}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                            <span>Completion Cert PDF ↗</span>
                           </a>`
                        : ""
                }
            </div>
        </div>
    `;
}

function renderModalContent() {
    const item = state.modalList[state.modalIndex];
    if (state.modalMode === "certificate") {
        renderCertificateModal(item);
    } else {
        renderProjectModal(item);
    }

    const hasMultiple = state.modalList.length > 1;
    modalPrevBtn.disabled = !hasMultiple;
    modalNextBtn.disabled = !hasMultiple;
}

function openModal(mode, list, index) {
    lastFocusedBeforeModal = document.activeElement;
    state.modalMode = mode;
    state.modalTab = "overview";
    state.modalList = list;
    state.modalIndex = index;
    state.modalOpen = true;

    renderModalContent();
    modalEl.classList.add("open");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalPanelEl.focus();
    if (window.GameSFX) window.GameSFX.modalOpen();
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
    if (window.GameSFX) window.GameSFX.modalClose();
}

function stepModal(delta) {
    if (!state.modalOpen || state.modalList.length <= 1) return;
    const len = state.modalList.length;
    state.modalIndex = (state.modalIndex + delta + len) % len;
    state.modalTab = "overview";
    renderModalContent();
    modalBodyEl.scrollTop = 0;
    if (window.GameSFX) window.GameSFX.tab();
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
            if (window.GameSFX) window.GameSFX.tab();
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
   TACTILE CARTRIDGE GLARE & SUBTLE 3D TILT (DESKTOP POINTER ONLY)
   -------------------------------------------------------------------------- */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

function attachCardFeel(card) {
    if (prefersReducedMotion || !finePointer) return;
    card.addEventListener("mousemove", (e) => {
        if (projectGridEl.dataset.view === "list" && card.classList.contains("project-card")) return;
        const rect = card.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", `${px.toFixed(1)}%`);
        card.style.setProperty("--my", `${py.toFixed(1)}%`);
        const rx = ((py - 50) / 50) * -2.6;
        const ry = ((px - 50) / 50) * 2.6;
        card.style.transform = `perspective(900px) translateY(-4px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
}

/* --------------------------------------------------------------------------
   PROCEDURAL SFX TOGGLE + SKILL CROSS-LINKING + PIXEL COMPANION + HOTKEYS
   -------------------------------------------------------------------------- */
const sfxToggleBtn = document.getElementById("sfx-toggle");
if (sfxToggleBtn && window.GameSFX) {
    const sfxLabel = sfxToggleBtn.querySelector(".sfx-label");
    sfxToggleBtn.addEventListener("click", () => {
        const on = window.GameSFX.toggle();
        sfxToggleBtn.classList.toggle("is-on", on);
        sfxToggleBtn.setAttribute("aria-pressed", String(on));
        if (sfxLabel) sfxLabel.textContent = on ? "SFX: ON" : "SFX: OFF";
    });
}

// Interactive Skill Tags -> Filter Projects & Scroll
document.querySelectorAll(".interactive-skill").forEach((btn) => {
    btn.addEventListener("click", () => {
        const query = btn.dataset.skillQuery || "";
        state.activeCategory = "All";
        state.searchQuery = query;
        searchInputEl.value = query;
        renderFilters();
        renderProjects();
        if (window.GameSFX) window.GameSFX.tab();
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    });
});

// Pixel Companion Easter Egg
const companionBtn = document.getElementById("companion-btn");
const companionText = document.getElementById("companion-text");
if (companionBtn && companionText) {
    const companionLines = [
        "Try pressing WASD or clicking inside the Hero arena to play with the FSM enemies!",
        "Toggle Gizmos ON/OFF and tweak GameJuice in the Hero viewport to feel hitstop & screen shake!",
        "Natureration (Tim Garde) won 2nd Place at ICW Sayembara Game Development 2026!",
        "Click any highlighted subsystem in Technical Stack to filter matching games automatically.",
        "Pro tip: Enable SFX in the top bar for live synthesized Web Audio game sounds!"
    ];
    let lineIdx = 0;
    companionBtn.addEventListener("click", () => {
        lineIdx = (lineIdx + 1) % companionLines.length;
        companionText.textContent = companionLines[lineIdx];
        if (window.GameSFX) {
            if (!window.GameSFX.isEnabled()) {
                window.GameSFX.setEnabled(true);
                sfxToggleBtn?.classList.add("is-on");
                sfxToggleBtn?.setAttribute("aria-pressed", "true");
                const lbl = sfxToggleBtn?.querySelector(".sfx-label");
                if (lbl) lbl.textContent = "SFX: ON";
            } else {
                window.GameSFX.chime();
            }
        }
    });
}

// Keyboard Quick Section Jump (Keys 1 - 5)
const sectionHotkeys = {
    "1": "projects",
    "2": "experience",
    "3": "certificates",
    "4": "biodata",
    "5": "skills"
};
document.addEventListener("keydown", (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || state.modalOpen) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const targetId = sectionHotkeys[e.key];
    if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        if (window.GameSFX) window.GameSFX.tick();
    }
});

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
renderCertFilters();
renderCertificates();
