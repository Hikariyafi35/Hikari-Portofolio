/* ==========================================================================
   MULTI-SCENE INTERACTIVE ENGINE CONTROLLER
   Scene 01: FSM_Combat.scene (sandbox.js)
   Scene 02: Pathfinding_NavGrid.scene (Real-time A* Pathfinding Canvas)
   Scene 03: Narrative_Choice.scene (ScriptableObject Dialogue & Ending Demo)
   ========================================================================== */

(function initMultiSceneViewport() {
    const sceneTabs = document.querySelectorAll(".scene-tab-btn");
    if (!sceneTabs.length) return;

    const sceneTitleEl = document.getElementById("engine-scene-title");
    const consoleEl = document.getElementById("sb-console");
    const fsmTelemetryEl = document.getElementById("telemetry-fsm");
    const pathTelemetryEl = document.getElementById("telemetry-path");
    const narrativeTelemetryEl = document.getElementById("telemetry-narrative");

    const SCENE_NAMES = {
        fsm: "FSM_Combat.scene",
        pathfinding: "Pathfinding_NavGrid.scene",
        narrative: "Narrative_Choice.scene"
    };

    let currentScene = "fsm";

    function logScene(msg) {
        if (!consoleEl) return;
        const ts = new Date().toTimeString().slice(0, 8);
        consoleEl.textContent = `[${ts}] ${msg}`;
    }

    /* ======================================================================
       SCENE 02: REAL-TIME A* PATHFINDING & INTERACTIVE NAVGRID
       ====================================================================== */
    const PathfindingScene = (() => {
        const canvas = document.getElementById("path-canvas");
        if (!canvas) return { setActive() {} };
        const ctx = canvas.getContext("2d");

        const toolBtns = document.querySelectorAll("[data-pf-tool]");
        const diagBtn = document.getElementById("pf-diag-toggle");
        const mazeBtn = document.getElementById("pf-maze");
        const clearBtn = document.getElementById("pf-clear");
        const statVisitedEl = document.getElementById("pf-stat-visited");
        const statStepsEl = document.getElementById("pf-stat-steps");
        const statTimeEl = document.getElementById("pf-stat-time");
        const badgeStatusEl = document.getElementById("pf-status-badge");

        const COLS = 22;
        const ROWS = 13;

        let active = false;
        let inViewport = true;
        let width = 560;
        let height = 365;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        let tool = "wall"; // "wall" | "start" | "goal"
        let allowDiagonal = true;
        let walls = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
        let start = { c: 2, r: 6 };
        let goal = { c: 19, r: 6 };

        let path = [];
        let closedSet = new Set();
        let openSet = new Set();
        let isPainting = false;
        let paintValue = true;

        // Smooth NavAgent moving along computed A* path
        const agent = { x: 2, y: 6, pathIdx: 0, speed: 5.2, angle: 0 };

        function cellKey(c, r) {
            return `${c},${r}`;
        }

        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect();
            if (rect.width < 10 || rect.height < 10) return;
            width = Math.floor(rect.width);
            height = Math.floor(rect.height);
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function getLayout() {
            const padX = 16;
            const padY = 16;
            const cellSize = Math.floor(Math.min((width - padX * 2) / COLS, (height - padY * 2) / ROWS));
            const gridW = cellSize * COLS;
            const gridH = cellSize * ROWS;
            const offX = Math.floor((width - gridW) / 2);
            const offY = Math.floor((height - gridH) / 2);
            return { cellSize, offX, offY, gridW, gridH };
        }

        function seedPresetMaze() {
            walls = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
            start = { c: 2, r: 6 };
            goal = { c: 19, r: 6 };

            // Clean architectural barriers showcasing A* detour & cornering
            const coords = [
                [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8],
                [10, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10], [10, 11],
                [14, 1], [14, 2], [14, 3], [14, 4], [14, 5], [14, 6], [14, 7],
                [14, 9], [15, 9], [16, 9], [17, 9],
                [12, 3], [13, 3],
                [4, 9], [5, 9], [6, 9]
            ];
            for (const [c, r] of coords) {
                if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
                    walls[r][c] = true;
                }
            }
            agent.x = start.c;
            agent.y = start.r;
            agent.pathIdx = 0;
            solveAStar(true);
            logScene("NavGrid: Loaded tactical obstacle preset");
        }

        function heuristic(a, b) {
            const dx = Math.abs(a.c - b.c);
            const dy = Math.abs(a.r - b.r);
            if (!allowDiagonal) return dx + dy;
            // Octile distance
            return Math.max(dx, dy) + (Math.SQRT2 - 1) * Math.min(dx, dy);
        }

        function solveAStar(resetAgent = false) {
            const t0 = performance.now();
            closedSet = new Set();
            openSet = new Set();
            path = [];

            const startK = cellKey(start.c, start.r);
            const goalK = cellKey(goal.c, goal.r);

            const gScore = new Map([[startK, 0]]);
            const fScore = new Map([[startK, heuristic(start, goal)]]);
            const cameFrom = new Map();
            const openList = [{ c: start.c, r: start.r, k: startK }];
            openSet.add(startK);

            const dirs4 = [
                [1, 0, 1],
                [-1, 0, 1],
                [0, 1, 1],
                [0, -1, 1]
            ];
            const dirs8 = [
                ...dirs4,
                [1, 1, Math.SQRT2],
                [-1, 1, Math.SQRT2],
                [1, -1, Math.SQRT2],
                [-1, -1, Math.SQRT2]
            ];
            const dirs = allowDiagonal ? dirs8 : dirs4;

            let found = false;
            while (openList.length > 0) {
                // Find lowest fScore
                let bestIdx = 0;
                let bestF = fScore.get(openList[0].k) ?? Infinity;
                for (let i = 1; i < openList.length; i++) {
                    const f = fScore.get(openList[i].k) ?? Infinity;
                    if (f < bestF) {
                        bestF = f;
                        bestIdx = i;
                    }
                }

                const cur = openList.splice(bestIdx, 1)[0];
                openSet.delete(cur.k);
                closedSet.add(cur.k);

                if (cur.k === goalK) {
                    found = true;
                    let trace = cur;
                    while (trace) {
                        path.push({ c: trace.c, r: trace.r });
                        trace = cameFrom.get(trace.k);
                    }
                    path.reverse();
                    break;
                }

                for (const [dc, dr, cost] of dirs) {
                    const nc = cur.c + dc;
                    const nr = cur.r + dr;
                    if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) continue;
                    if (walls[nr][nc]) continue;

                    // Prevent diagonal corner clipping through adjacent walls
                    if (dc !== 0 && dr !== 0) {
                        if (walls[cur.r][nc] || walls[nr][cur.c]) continue;
                    }

                    const nk = cellKey(nc, nr);
                    if (closedSet.has(nk)) continue;

                    const tentativeG = (gScore.get(cur.k) ?? Infinity) + cost;
                    if (tentativeG < (gScore.get(nk) ?? Infinity)) {
                        cameFrom.set(nk, cur);
                        gScore.set(nk, tentativeG);
                        fScore.set(nk, tentativeG + heuristic({ c: nc, r: nr }, goal));
                        if (!openSet.has(nk)) {
                            openSet.add(nk);
                            openList.push({ c: nc, r: nr, k: nk });
                        }
                    }
                }
            }

            const elapsed = (performance.now() - t0).toFixed(2);
            if (statVisitedEl) statVisitedEl.textContent = String(closedSet.size);
            if (statStepsEl) statStepsEl.textContent = found ? String(path.length - 1) : "∞";
            if (statTimeEl) statTimeEl.textContent = `${elapsed}ms`;
            if (badgeStatusEl) {
                badgeStatusEl.textContent = found ? `PATH: ${path.length - 1} STEPS` : "BLOCKED";
                badgeStatusEl.classList.toggle("is-blocked", !found);
            }

            if (resetAgent || !found) {
                agent.x = start.c;
                agent.y = start.r;
                agent.pathIdx = 0;
            } else {
                agent.pathIdx = Math.min(agent.pathIdx, Math.max(0, path.length - 1));
            }

            return found;
        }

        function updateAgent(dt) {
            if (path.length < 2) return;
            const target = path[agent.pathIdx + 1];
            if (!target) {
                agent.x = start.c;
                agent.y = start.r;
                agent.pathIdx = 0;
                return;
            }
            const dx = target.c - agent.x;
            const dy = target.r - agent.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 0.08) {
                agent.x = target.c;
                agent.y = target.r;
                agent.pathIdx += 1;
                if (agent.pathIdx >= path.length - 1) {
                    agent.x = start.c;
                    agent.y = start.r;
                    agent.pathIdx = 0;
                }
            } else {
                agent.angle = Math.atan2(dy, dx);
                agent.x += (dx / dist) * agent.speed * dt;
                agent.y += (dy / dist) * agent.speed * dt;
            }
        }

        function render() {
            ctx.fillStyle = "#0b0c0f";
            ctx.fillRect(0, 0, width, height);

            const { cellSize, offX, offY } = getLayout();

            // Draw cells
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    const x = offX + c * cellSize;
                    const y = offY + r * cellSize;
                    const k = cellKey(c, r);

                    if (walls[r][c]) {
                        ctx.fillStyle = "#262a34";
                        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
                        ctx.strokeStyle = "rgba(242, 239, 233, 0.14)";
                        ctx.lineWidth = 1;
                        ctx.strokeRect(x + 1.5, y + 1.5, cellSize - 3, cellSize - 3);
                    } else if (closedSet.has(k)) {
                        ctx.fillStyle = "rgba(229, 169, 59, 0.10)";
                        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
                    } else if (openSet.has(k)) {
                        ctx.fillStyle = "rgba(74, 222, 128, 0.12)";
                        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
                    }

                    ctx.strokeStyle = "rgba(242, 239, 233, 0.055)";
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x, y, cellSize, cellSize);
                }
            }

            // Shortest Path Polyline
            if (path.length > 1) {
                ctx.save();
                ctx.strokeStyle = "#e5a93b";
                ctx.lineWidth = 3;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.shadowColor = "rgba(229, 169, 59, 0.5)";
                ctx.shadowBlur = 10;
                ctx.beginPath();
                path.forEach((pt, idx) => {
                    const px = offX + (pt.c + 0.5) * cellSize;
                    const py = offY + (pt.r + 0.5) * cellSize;
                    if (idx === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                });
                ctx.stroke();
                ctx.restore();

                // Waypoint dots
                ctx.fillStyle = "#f2be5c";
                for (let i = 1; i < path.length - 1; i++) {
                    const px = offX + (path[i].c + 0.5) * cellSize;
                    const py = offY + (path[i].r + 0.5) * cellSize;
                    ctx.beginPath();
                    ctx.arc(px, py, 2.3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Start & Goal Markers
            const drawMarker = (cell, fill, label) => {
                const x = offX + cell.c * cellSize;
                const y = offY + cell.r * cellSize;
                ctx.fillStyle = fill;
                ctx.fillRect(x + 3, y + 3, cellSize - 6, cellSize - 6);
                ctx.fillStyle = "#0e0f12";
                ctx.font = `700 ${Math.max(10, Math.floor(cellSize * 0.45))}px 'JetBrains Mono', monospace`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(label, x + cellSize / 2, y + cellSize / 2 + 0.5);
            };
            drawMarker(start, "#4ade80", "S");
            drawMarker(goal, "#d97248", "G");

            // Moving NavAgent
            if (path.length > 1) {
                const ax = offX + (agent.x + 0.5) * cellSize;
                const ay = offY + (agent.y + 0.5) * cellSize;
                ctx.save();
                ctx.translate(ax, ay);
                ctx.rotate(agent.angle);
                ctx.fillStyle = "#f2efe9";
                ctx.strokeStyle = "#e5a93b";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(cellSize * 0.34, 0);
                ctx.lineTo(-cellSize * 0.24, -cellSize * 0.24);
                ctx.lineTo(-cellSize * 0.12, 0);
                ctx.lineTo(-cellSize * 0.24, cellSize * 0.24);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }
        }

        function getCellFromPointer(e) {
            const rect = canvas.getBoundingClientRect();
            const px = e.clientX - rect.left;
            const py = e.clientY - rect.top;
            const { cellSize, offX, offY } = getLayout();
            const c = Math.floor((px - offX) / cellSize);
            const r = Math.floor((py - offY) / cellSize);
            if (c < 0 || c >= COLS || r < 0 || r >= ROWS) return null;
            return { c, r };
        }

        function applyToolAt(cell, isStartClick) {
            if (!cell) return;
            const isStart = cell.c === start.c && cell.r === start.r;
            const isGoal = cell.c === goal.c && cell.r === goal.r;

            if (tool === "start") {
                if (!isGoal && !walls[cell.r][cell.c]) {
                    start = { ...cell };
                    const ok = solveAStar(true);
                    logScene(`NavAgent: Start moved -> (${cell.c},${cell.r}) · ${ok ? "Path updated" : "BLOCKED"}`);
                }
                return;
            }
            if (tool === "goal") {
                if (!isStart && !walls[cell.r][cell.c]) {
                    goal = { ...cell };
                    const ok = solveAStar(false);
                    logScene(`NavAgent: Goal moved -> (${cell.c},${cell.r}) · ${ok ? "Path updated" : "BLOCKED"}`);
                }
                return;
            }

            // Wall brush
            if (isStart || isGoal) return;
            if (isStartClick) {
                paintValue = !walls[cell.r][cell.c];
            }
            if (walls[cell.r][cell.c] !== paintValue) {
                walls[cell.r][cell.c] = paintValue;
                const ok = solveAStar(false);
                if (!ok) {
                    logScene("AStarPathfinder: NO_PATH_FOUND — erase a wall to reopen route");
                }
            }
        }

        canvas.addEventListener("pointerdown", (e) => {
            isPainting = true;
            const cell = getCellFromPointer(e);
            applyToolAt(cell, true);
            if (window.GameSFX) window.GameSFX.tick();
        });

        canvas.addEventListener("pointermove", (e) => {
            if (!isPainting) return;
            const cell = getCellFromPointer(e);
            applyToolAt(cell, false);
        });

        window.addEventListener("pointerup", () => {
            isPainting = false;
        });

        toolBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                tool = btn.dataset.pfTool;
                toolBtns.forEach((b) => b.classList.toggle("active", b.dataset.pfTool === tool));
                logScene(`NavGrid Tool: ${tool.toUpperCase()}`);
                if (window.GameSFX) window.GameSFX.click();
            });
        });

        diagBtn?.addEventListener("click", () => {
            allowDiagonal = !allowDiagonal;
            diagBtn.classList.toggle("active", allowDiagonal);
            diagBtn.textContent = allowDiagonal ? "Diag: ON" : "Diag: OFF";
            solveAStar(false);
            logScene(`AStar Heuristic: ${allowDiagonal ? "Octile (8-Dir)" : "Manhattan (4-Dir)"}`);
            if (window.GameSFX) window.GameSFX.click();
        });

        mazeBtn?.addEventListener("click", () => {
            seedPresetMaze();
            if (window.GameSFX) window.GameSFX.tab();
        });

        clearBtn?.addEventListener("click", () => {
            walls = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
            solveAStar(true);
            logScene("NavGrid: Cleared all obstacles");
            if (window.GameSFX) window.GameSFX.click();
        });

        if ("IntersectionObserver" in window) {
            new IntersectionObserver(
                (entries) => {
                    inViewport = entries[0]?.isIntersecting ?? true;
                },
                { threshold: 0.05 }
            ).observe(canvas);
        }

        if ("ResizeObserver" in window) {
            new ResizeObserver(() => {
                if (active) resize();
            }).observe(canvas.parentElement);
        }

        let lastT = performance.now();
        function loop(now) {
            requestAnimationFrame(loop);
            if (!active || !inViewport) {
                lastT = now;
                return;
            }
            const dt = Math.min((now - lastT) / 1000, 0.05);
            lastT = now;
            updateAgent(dt);
            render();
        }

        seedPresetMaze();
        requestAnimationFrame(loop);

        return {
            setActive(val) {
                active = Boolean(val);
                if (active) {
                    resize();
                    solveAStar(false);
                    logScene("Pathfinding_NavGrid.scene loaded · Draw or erase walls to test A*");
                }
            }
        };
    })();

    /* ======================================================================
       SCENE 03: NARRATIVE CHOICE & SCRIPTABLE OBJECT INSPECTOR (NATURERATION)
       ====================================================================== */
    const NarrativeScene = (() => {
        const stageEl = document.getElementById("narrative-stage");
        const replayBtn = document.getElementById("nar-replay");
        const stepBadgeEl = document.getElementById("nar-step-badge");
        const stateEcoEl = document.getElementById("nar-stat-eco");
        const stateIntEl = document.getElementById("nar-stat-int");
        const statePrsEl = document.getElementById("nar-stat-prs");

        if (!stageEl) return { setActive() {} };

        const cases = [
            {
                asset: "Case_01_PermitAudit.asset",
                dept: "MINISTRY OF FORESTRY · REPORT #01",
                prompt: "A timber conglomerate submits an urgent fast-track permit overlapping a protected peatland buffer. An anonymous lobbyist offers 'infrastructure funding' for quick sign-off.",
                choices: [
                    {
                        label: "Reject Permit & Launch Audit",
                        delta: { eco: +25, integrity: +25, pressure: +20 },
                        tag: "Eco +25 · Int +25"
                    },
                    {
                        label: "Approve With Environmental Fine",
                        delta: { eco: -10, integrity: +5, pressure: -5 },
                        tag: "Eco -10 · Int +5"
                    },
                    {
                        label: "Fast-Track & Accept Funding",
                        delta: { eco: -30, integrity: -30, pressure: -20 },
                        tag: "Eco -30 · Int -30"
                    }
                ]
            },
            {
                asset: "Case_02_WatershedLeak.asset",
                dept: "ENVIRONMENTAL MONITORING · REPORT #02",
                prompt: "Local villagers report toxic runoff downstream from a coal-processing site. Senior officials urge you to classify the lab results until after regional elections.",
                choices: [
                    {
                        label: "Publish Lab Data & Halt Operations",
                        delta: { eco: +25, integrity: +20, pressure: +25 },
                        tag: "Eco +25 · Int +20"
                    },
                    {
                        label: "Issue Quiet Warning to Operator",
                        delta: { eco: -5, integrity: -10, pressure: -5 },
                        tag: "Eco -5 · Int -10"
                    },
                    {
                        label: "Seal Report Under Executive Order",
                        delta: { eco: -25, integrity: -25, pressure: -15 },
                        tag: "Eco -25 · Int -25"
                    }
                ]
            },
            {
                asset: "Case_03_PublicTribunal.asset",
                dept: "ANTI-CORRUPTION TRIBUNAL · FINAL REPORT",
                prompt: "Investigative journalists subpoena your department's land-use ledger. Your cumulative record is now under public scrutiny — choose your final testimony.",
                choices: [
                    {
                        label: "Release Full Unredacted Ledger",
                        delta: { eco: +20, integrity: +25, pressure: +15 },
                        tag: "Eco +20 · Int +25"
                    },
                    {
                        label: "Submit Partial Summary Only",
                        delta: { eco: 0, integrity: -5, pressure: -10 },
                        tag: "Int -5 · Prs -10"
                    },
                    {
                        label: "Shred Records & Blame Contractors",
                        delta: { eco: -20, integrity: -30, pressure: -20 },
                        tag: "Eco -20 · Int -30"
                    }
                ]
            }
        ];

        let step = 0;
        let vars = { eco: 50, integrity: 50, pressure: 30 };

        function clamp100(v) {
            return Math.max(0, Math.min(100, v));
        }

        function resolveEnding() {
            const combined = vars.eco + vars.integrity;
            if (combined >= 135 && vars.integrity >= 65) {
                return {
                    id: "GREEN_REFORM",
                    title: "Ending A · Systemic Green Reform",
                    color: "#4ade80",
                    desc: "Whistleblowers and environmental safeguards prevail. Transparent ScriptableObject audit logs trigger lasting policy reform."
                };
            }
            if (combined <= 75 || vars.eco <= 25) {
                return {
                    id: "ECOLOGICAL_COLLAPSE",
                    title: "Ending C · Ecological Collapse",
                    color: "#ef4444",
                    desc: "Unchecked permits and buried reports devastate the watershed. Public trust collapses as climate corruption goes unchallenged."
                };
            }
            return {
                id: "COMPROMISED_STATUS_QUO",
                title: "Ending B · Compromised Status Quo",
                color: "#e5a93b",
                desc: "Half-measures delay the worst damage, but political pressure keeps deeper climate-corruption networks intact."
            };
        }

        function updateInspectorStats() {
            if (stateEcoEl) stateEcoEl.textContent = `${vars.eco}`;
            if (stateIntEl) stateIntEl.textContent = `${vars.integrity}`;
            if (statePrsEl) statePrsEl.textContent = `${vars.pressure}`;
            if (stepBadgeEl) {
                stepBadgeEl.textContent = step < cases.length ? `CASE ${step + 1} / ${cases.length}` : "ENDING RESOLVED";
            }
        }

        function render() {
            updateInspectorStats();
            const predicted = resolveEnding();

            const inspectorHtml = `
                <div class="nar-inspector">
                    <div class="nar-insp-head">NarrativeState.asset</div>
                    <div class="nar-stat-row">
                        <div class="nar-stat-lbl"><span>EcoHealth</span><strong>${vars.eco}</strong></div>
                        <div class="nar-bar"><span style="width:${vars.eco}%; background:#4ade80"></span></div>
                    </div>
                    <div class="nar-stat-row">
                        <div class="nar-stat-lbl"><span>Integrity</span><strong>${vars.integrity}</strong></div>
                        <div class="nar-bar"><span style="width:${vars.integrity}%; background:#e5a93b"></span></div>
                    </div>
                    <div class="nar-stat-row">
                        <div class="nar-stat-lbl"><span>Pressure</span><strong>${vars.pressure}</strong></div>
                        <div class="nar-bar"><span style="width:${vars.pressure}%; background:#d97248"></span></div>
                    </div>
                    <div class="nar-branch-box">
                        <span class="nar-branch-lbl">${step < cases.length ? "LIVE ENDING FORECAST" : "LOCKED ENDING"}</span>
                        <strong style="color:${predicted.color}">${predicted.id}</strong>
                    </div>
                </div>
            `;

            if (step >= cases.length) {
                stageEl.innerHTML = `
                    <div class="nar-main nar-ending">
                        <span class="nar-dept" style="color:${predicted.color}">ENDING_RESOLVER.CS // COMPLETE</span>
                        <h4>${predicted.title}</h4>
                        <p>${predicted.desc}</p>
                        <div class="nar-ending-meta">
                            <span>Cumulative Score: <strong>${vars.eco + vars.integrity}</strong> / 200</span>
                        </div>
                        <button type="button" class="eng-btn active" id="nar-inline-replay">↻ Replay Different Branch</button>
                    </div>
                    ${inspectorHtml}
                `;
                document.getElementById("nar-inline-replay")?.addEventListener("click", reset);
                return;
            }

            const cur = cases[step];
            stageEl.innerHTML = `
                <div class="nar-main">
                    <div class="nar-head-row">
                        <span class="nar-dept">${cur.dept}</span>
                        <span class="nar-asset">${cur.asset}</span>
                    </div>
                    <p class="nar-prompt">${cur.prompt}</p>
                    <div class="nar-choices">
                        ${cur.choices
                            .map(
                                (ch, i) => `
                            <button type="button" class="nar-choice-btn" data-choice="${i}">
                                <span class="nar-choice-label">${ch.label}</span>
                                <span class="nar-choice-delta">${ch.tag}</span>
                            </button>
                        `
                            )
                            .join("")}
                    </div>
                </div>
                ${inspectorHtml}
            `;

            stageEl.querySelectorAll(".nar-choice-btn").forEach((btn) => {
                btn.addEventListener("click", () => {
                    const ch = cur.choices[Number(btn.dataset.choice)];
                    vars.eco = clamp100(vars.eco + ch.delta.eco);
                    vars.integrity = clamp100(vars.integrity + ch.delta.integrity);
                    vars.pressure = clamp100(vars.pressure + ch.delta.pressure);
                    step += 1;

                    if (step >= cases.length) {
                        const fin = resolveEnding();
                        logScene(`EndingResolver: Branch locked -> ${fin.id} (Score ${vars.eco + vars.integrity})`);
                        if (window.GameSFX) window.GameSFX.chime();
                    } else {
                        logScene(`${cur.asset} -> ${ch.tag}`);
                        if (window.GameSFX) window.GameSFX.tab();
                    }
                    render();
                });
            });
        }

        function reset() {
            step = 0;
            vars = { eco: 50, integrity: 50, pressure: 30 };
            render();
            logScene("NarrativeState.asset reset · Case_01_PermitAudit loaded");
            if (window.GameSFX) window.GameSFX.click();
        }

        replayBtn?.addEventListener("click", reset);
        render();

        return {
            setActive(val) {
                if (val) {
                    render();
                    logScene("Narrative_Choice.scene loaded · ScriptableObject choice & ending inspector");
                }
            }
        };
    })();

    /* ======================================================================
       SCENE SWITCHER ORCHESTRATOR
       ====================================================================== */
    function switchScene(sceneId) {
        if (currentScene === sceneId) return;
        currentScene = sceneId;

        sceneTabs.forEach((btn) => {
            const isActive = btn.dataset.scene === sceneId;
            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-selected", String(isActive));
        });

        if (sceneTitleEl) sceneTitleEl.textContent = SCENE_NAMES[sceneId] || sceneId;

        document.querySelectorAll("[data-scene-panel]").forEach((el) => {
            el.hidden = el.dataset.scenePanel !== sceneId;
        });

        if (fsmTelemetryEl) fsmTelemetryEl.hidden = sceneId !== "fsm";
        if (pathTelemetryEl) pathTelemetryEl.hidden = sceneId !== "pathfinding";
        if (narrativeTelemetryEl) narrativeTelemetryEl.hidden = sceneId !== "narrative";

        window.FSMSandbox?.setActive(sceneId === "fsm");
        PathfindingScene.setActive(sceneId === "pathfinding");
        NarrativeScene.setActive(sceneId === "narrative");

        if (window.GameSFX) window.GameSFX.tab();
    }

    sceneTabs.forEach((btn) => {
        btn.addEventListener("click", () => {
            switchScene(btn.dataset.scene);
        });
    });
})();
