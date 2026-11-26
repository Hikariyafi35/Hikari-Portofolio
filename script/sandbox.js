/* ==========================================================================
   LIVE PLAYABLE 2D GAMEPLAY & FSM ENEMY AI SANDBOX
   Real-time Canvas engine: Smooth controller, Dash, Projectiles, Hitstop,
   Screen Shake, Particle Juice, and Unity-style FSM Debug Gizmos.
   ========================================================================== */

(function initGameplaySandbox() {
    const canvas = document.getElementById("sandbox-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // HUD & Inspector Controls
    const fpsEl = document.getElementById("sb-fps");
    const modeBadgeEl = document.getElementById("sb-mode-badge");
    const scoreEl = document.getElementById("sb-score");
    const consoleEl = document.getElementById("sb-console");

    const playPauseBtn = document.getElementById("sb-play-pause");
    const autoBtn = document.getElementById("sb-auto-toggle");
    const gizmoBtn = document.getElementById("sb-gizmo-toggle");
    const spawnBtn = document.getElementById("sb-spawn");
    const resetBtn = document.getElementById("sb-reset");
    const speedSlider = document.getElementById("sb-speed");
    const speedValEl = document.getElementById("sb-speed-val");
    const juiceSlider = document.getElementById("sb-juice");
    const juiceValEl = document.getElementById("sb-juice-val");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const config = {
        paused: false,
        autoMode: true,
        showGizmos: true,
        playerSpeed: 235,
        juice: 0.85,
        inViewport: true
    };

    let width = 560;
    let height = 360;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const keys = new Set();
    const pointer = { x: 280, y: 180, inside: false, down: false };

    let score = 0;
    let combo = 0;
    let comboTimer = 0;
    let hitstopTimer = 0;
    let shakeTime = 0;
    let shakeMag = 0;
    let enemyCounter = 0;
    let autoFireTimer = 0;
    let autoDashTimer = 0;

    let player;
    let enemies = [];
    let bullets = [];
    let particles = [];
    let ghosts = [];
    let popups = [];

    const STATE_COLORS = {
        PATROL: "#4ade80",
        CHASE: "#e5a93b",
        WINDUP: "#f97316",
        LUNGE: "#ef4444",
        STUN: "#94a3b8"
    };

    function logConsole(msg) {
        if (!consoleEl) return;
        const now = new Date();
        const ts = now.toTimeString().slice(0, 8);
        consoleEl.textContent = `[${ts}] ${msg}`;
    }

    function updateHUD() {
        if (scoreEl) {
            scoreEl.textContent = combo > 1 ? `KO: ${score} · x${combo}` : `KO: ${score}`;
        }
        if (modeBadgeEl) {
            modeBadgeEl.textContent = config.autoMode ? "AUTO_DEMO" : "PLAYER_CTRL";
            modeBadgeEl.classList.toggle("is-manual", !config.autoMode);
        }
        if (autoBtn) {
            autoBtn.textContent = config.autoMode ? "Take Control" : "Auto Demo";
            autoBtn.classList.toggle("active", !config.autoMode);
        }
        if (gizmoBtn) {
            gizmoBtn.classList.toggle("active", config.showGizmos);
            gizmoBtn.textContent = config.showGizmos ? "Gizmos: ON" : "Gizmos: OFF";
        }
        if (playPauseBtn) {
            playPauseBtn.textContent = config.paused ? "▶ Play" : "⏸ Pause";
        }
    }

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = Math.max(300, Math.floor(rect.width));
        height = Math.max(250, Math.floor(rect.height));
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    function clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
    }

    function createPlayer() {
        return {
            x: width * 0.35,
            y: height * 0.52,
            vx: 0,
            vy: 0,
            radius: 12,
            angle: 0,
            fireCd: 0,
            dashCd: 0,
            dashTime: 0,
            dashDx: 1,
            dashDy: 0,
            flashTime: 0
        };
    }

    function createEnemy(x, y) {
        enemyCounter += 1;
        const margin = 46;
        const ex = x ?? rand(width * 0.5, width - margin);
        const ey = y ?? rand(margin, height - margin);

        const waypoints = [
            { x: clamp(ex + rand(-90, 90), margin, width - margin), y: clamp(ey + rand(-70, 70), margin, height - margin) },
            { x: clamp(ex + rand(-110, 110), margin, width - margin), y: clamp(ey + rand(-85, 85), margin, height - margin) },
            { x: clamp(ex + rand(-90, 90), margin, width - margin), y: clamp(ey + rand(-70, 70), margin, height - margin) }
        ];

        return {
            id: `Enemy_${String(enemyCounter).padStart(2, "0")}`,
            x: clamp(ex, margin, width - margin),
            y: clamp(ey, margin, height - margin),
            vx: 0,
            vy: 0,
            radius: 13,
            hp: 3,
            maxHp: 3,
            state: "PATROL",
            stateTimer: 0,
            detectRadius: 145,
            attackRadius: 56,
            waypoints,
            wpIndex: 0,
            lungeDx: 0,
            lungeDy: 0,
            flashTime: 0
        };
    }

    function spawnParticles(x, y, color, count = 10, speed = 130) {
        const scaled = Math.max(2, Math.round(count * (0.35 + config.juice * 0.95)));
        for (let i = 0; i < scaled; i++) {
            const ang = Math.random() * Math.PI * 2;
            const spd = rand(speed * 0.3, speed);
            particles.push({
                x,
                y,
                vx: Math.cos(ang) * spd,
                vy: Math.sin(ang) * spd,
                life: rand(0.18, 0.45),
                maxLife: 0.45,
                size: rand(2, 4.2),
                color
            });
        }
    }

    function addPopup(x, y, text, color = "#f2efe9") {
        popups.push({ x, y, text, color, life: 0.65, maxLife: 0.65 });
    }

    function triggerShake(magnitude, duration = 0.14) {
        if (prefersReducedMotion || config.juice <= 0.02) return;
        shakeMag = Math.max(shakeMag, magnitude * config.juice);
        shakeTime = Math.max(shakeTime, duration);
    }

    function triggerHitstop(seconds) {
        if (prefersReducedMotion || config.juice <= 0.02) return;
        hitstopTimer = Math.max(hitstopTimer, seconds * config.juice);
    }

    function resetArena() {
        enemyCounter = 0;
        score = 0;
        combo = 0;
        comboTimer = 0;
        bullets = [];
        particles = [];
        ghosts = [];
        popups = [];
        player = createPlayer();
        enemies = [
            createEnemy(width * 0.72, height * 0.28),
            createEnemy(width * 0.78, height * 0.68),
            createEnemy(width * 0.56, height * 0.76)
        ];
        logConsole("Scene loaded · 3 FSM agents initialized");
        updateHUD();
    }

    function fireProjectile(targetX, targetY) {
        if (player.fireCd > 0) return;
        const ang = Math.atan2(targetY - player.y, targetX - player.x);
        player.angle = ang;
        player.fireCd = 0.21;

        const speed = 470;
        bullets.push({
            x: player.x + Math.cos(ang) * 14,
            y: player.y + Math.sin(ang) * 14,
            vx: Math.cos(ang) * speed,
            vy: Math.sin(ang) * speed,
            radius: 4.5,
            life: 1.15,
            trail: []
        });

        // Subtle recoil
        player.vx -= Math.cos(ang) * 45 * config.juice;
        player.vy -= Math.sin(ang) * 45 * config.juice;
        spawnParticles(player.x + Math.cos(ang) * 14, player.y + Math.sin(ang) * 14, "#f2be5c", 5, 95);

        if (window.GameSFX) window.GameSFX.shoot();
    }

    function triggerDash(dx, dy) {
        if (player.dashCd > 0) return;
        const len = Math.hypot(dx, dy);
        if (len > 0.01) {
            player.dashDx = dx / len;
            player.dashDy = dy / len;
        } else {
            player.dashDx = Math.cos(player.angle);
            player.dashDy = Math.sin(player.angle);
        }
        player.dashTime = 0.14;
        player.dashCd = 0.75;
        triggerShake(3.2, 0.09);
        spawnParticles(player.x, player.y, "#e5a93b", 9, 120);
        logConsole("PlayerController: Dash() · i-frames 140ms");
        if (window.GameSFX) window.GameSFX.dash();
    }

    function setEnemyState(enemy, nextState, reason) {
        if (enemy.state === nextState) return;
        const prev = enemy.state;
        enemy.state = nextState;
        enemy.stateTimer = 0;
        if (reason) {
            logConsole(`${enemy.id}: ${prev} -> ${nextState} (${reason})`);
        }
    }

    function updateAutoPilot(dt) {
        if (enemies.length === 0) return;
        // Find nearest enemy
        let nearest = enemies[0];
        let minDist = Infinity;
        for (const e of enemies) {
            const d = Math.hypot(e.x - player.x, e.y - player.y);
            if (d < minDist) {
                minDist = d;
                nearest = e;
            }
        }

        const dx = nearest.x - player.x;
        const dy = nearest.y - player.y;
        const dist = Math.max(1, minDist);
        player.angle = Math.atan2(dy, dx);

        // Maintain tactical strafe distance (115px - 175px)
        let moveX = 0;
        let moveY = 0;
        const strafeDir = Math.sin(performance.now() * 0.0012) >= 0 ? 1 : -1;

        if (dist < 105) {
            moveX -= dx / dist;
            moveY -= dy / dist;
        } else if (dist > 185) {
            moveX += (dx / dist) * 0.85;
            moveY += (dy / dist) * 0.85;
        }
        // Add perpendicular strafe
        moveX += (-dy / dist) * 0.75 * strafeDir;
        moveY += (dx / dist) * 0.75 * strafeDir;

        // Soft arena center pull so demo stays nicely framed
        moveX += ((width * 0.5 - player.x) / width) * 0.9;
        moveY += ((height * 0.5 - player.y) / height) * 0.9;

        const mLen = Math.hypot(moveX, moveY) || 1;
        const accel = config.playerSpeed * 7.5;
        player.vx += (moveX / mLen) * accel * dt;
        player.vy += (moveY / mLen) * accel * dt;

        // Auto dash if an enemy winds up or lunges close
        autoDashTimer -= dt;
        if (autoDashTimer <= 0 && dist < 82 && (nearest.state === "WINDUP" || nearest.state === "LUNGE")) {
            triggerDash(-dy / dist, dx / dist);
            autoDashTimer = 1.1;
        }

        // Auto fire
        autoFireTimer -= dt;
        if (autoFireTimer <= 0) {
            fireProjectile(nearest.x + nearest.vx * 0.14, nearest.y + nearest.vy * 0.14);
            autoFireTimer = rand(0.32, 0.52);
        }
    }

    function updatePlayer(dt) {
        player.fireCd = Math.max(0, player.fireCd - dt);
        player.dashCd = Math.max(0, player.dashCd - dt);
        player.flashTime = Math.max(0, player.flashTime - dt);

        if (player.dashTime > 0) {
            player.dashTime -= dt;
            const dashSpeed = config.playerSpeed * 2.65;
            player.vx = player.dashDx * dashSpeed;
            player.vy = player.dashDy * dashSpeed;
            ghosts.push({
                x: player.x,
                y: player.y,
                angle: player.angle,
                life: 0.18,
                maxLife: 0.18
            });
        } else if (config.autoMode) {
            updateAutoPilot(dt);
        } else {
            let ix = 0;
            let iy = 0;
            if (keys.has("KeyW") || keys.has("ArrowUp")) iy -= 1;
            if (keys.has("KeyS") || keys.has("ArrowDown")) iy += 1;
            if (keys.has("KeyA") || keys.has("ArrowLeft")) ix -= 1;
            if (keys.has("KeyD") || keys.has("ArrowRight")) ix += 1;

            if (ix !== 0 || iy !== 0) {
                const len = Math.hypot(ix, iy);
                const accel = config.playerSpeed * 9.5;
                player.vx += (ix / len) * accel * dt;
                player.vy += (iy / len) * accel * dt;
            }

            if (pointer.inside) {
                player.angle = Math.atan2(pointer.y - player.y, pointer.x - player.x);
                if (pointer.down) {
                    fireProjectile(pointer.x, pointer.y);
                }
            }
        }

        // Apply damping and clamp max speed
        const damping = Math.exp(-8.5 * dt);
        player.vx *= damping;
        player.vy *= damping;

        const maxSpd = player.dashTime > 0 ? config.playerSpeed * 2.8 : config.playerSpeed;
        const spd = Math.hypot(player.vx, player.vy);
        if (spd > maxSpd) {
            player.vx = (player.vx / spd) * maxSpd;
            player.vy = (player.vy / spd) * maxSpd;
        }

        player.x = clamp(player.x + player.vx * dt, 22, width - 22);
        player.y = clamp(player.y + player.vy * dt, 22, height - 22);
    }

    function updateEnemies(dt) {
        for (let i = enemies.length - 1; i >= 0; i--) {
            const e = enemies[i];
            e.stateTimer += dt;
            e.flashTime = Math.max(0, e.flashTime - dt);

            const dx = player.x - e.x;
            const dy = player.y - e.y;
            const dist = Math.hypot(dx, dy) || 1;

            switch (e.state) {
                case "PATROL": {
                    const wp = e.waypoints[e.wpIndex];
                    const wdx = wp.x - e.x;
                    const wdy = wp.y - e.y;
                    const wDist = Math.hypot(wdx, wdy);
                    if (wDist < 12) {
                        e.wpIndex = (e.wpIndex + 1) % e.waypoints.length;
                    } else {
                        e.vx += ((wdx / wDist) * 75 - e.vx) * Math.min(1, dt * 6);
                        e.vy += ((wdy / wDist) * 75 - e.vy) * Math.min(1, dt * 6);
                    }
                    if (dist < e.detectRadius) {
                        setEnemyState(e, "CHASE", `dist:${Math.round(dist)}px`);
                    }
                    break;
                }
                case "CHASE": {
                    const chaseSpeed = 112;
                    e.vx += ((dx / dist) * chaseSpeed - e.vx) * Math.min(1, dt * 6);
                    e.vy += ((dy / dist) * chaseSpeed - e.vy) * Math.min(1, dt * 6);

                    if (dist < e.attackRadius) {
                        e.lungeDx = dx / dist;
                        e.lungeDy = dy / dist;
                        setEnemyState(e, "WINDUP", "in range");
                    } else if (dist > e.detectRadius * 1.45) {
                        setEnemyState(e, "PATROL", "lost target");
                    }
                    break;
                }
                case "WINDUP": {
                    e.vx *= Math.exp(-10 * dt);
                    e.vy *= Math.exp(-10 * dt);
                    if (e.stateTimer >= 0.42) {
                        e.vx = e.lungeDx * 290;
                        e.vy = e.lungeDy * 290;
                        setEnemyState(e, "LUNGE", "strike");
                    }
                    break;
                }
                case "LUNGE": {
                    e.vx *= Math.exp(-4.5 * dt);
                    e.vy *= Math.exp(-4.5 * dt);
                    if (e.stateTimer >= 0.28) {
                        setEnemyState(e, "CHASE");
                    }
                    break;
                }
                case "STUN": {
                    e.vx *= Math.exp(-7 * dt);
                    e.vy *= Math.exp(-7 * dt);
                    if (e.stateTimer >= 0.26) {
                        setEnemyState(e, "CHASE");
                    }
                    break;
                }
            }

            // Soft separation between enemies
            for (let j = 0; j < enemies.length; j++) {
                if (i === j) continue;
                const o = enemies[j];
                const sdx = e.x - o.x;
                const sdy = e.y - o.y;
                const sd = Math.hypot(sdx, sdy);
                if (sd > 0 && sd < 34) {
                    e.vx += (sdx / sd) * 90 * dt;
                    e.vy += (sdy / sd) * 90 * dt;
                }
            }

            e.x = clamp(e.x + e.vx * dt, 24, width - 24);
            e.y = clamp(e.y + e.vy * dt, 24, height - 24);

            // Player knockback on lunge collision (non-lethal fun sandbox)
            if (e.state === "LUNGE" && player.dashTime <= 0 && dist < e.radius + player.radius) {
                player.vx += (dx / dist) * 210;
                player.vy += (dy / dist) * 210;
                player.flashTime = 0.16;
                combo = 0;
                triggerShake(5, 0.12);
                spawnParticles(player.x, player.y, "#ef4444", 10, 140);
                addPopup(player.x, player.y - 16, "PARRY!", "#ef4444");
                setEnemyState(e, "STUN");
                updateHUD();
            }
        }

        // Maintain at least 2 active FSM agents
        if (enemies.length < 2) {
            const sideX = player.x < width * 0.5 ? rand(width * 0.65, width - 40) : rand(40, width * 0.35);
            const spawned = createEnemy(sideX, rand(45, height - 45));
            enemies.push(spawned);
            spawnParticles(spawned.x, spawned.y, "#4ade80", 12, 100);
            logConsole(`WaveSpawner: Spawned ${spawned.id}`);
        }
    }

    function updateBullets(dt) {
        for (let i = bullets.length - 1; i >= 0; i--) {
            const b = bullets[i];
            b.trail.push({ x: b.x, y: b.y });
            if (b.trail.length > 6) b.trail.shift();

            b.x += b.vx * dt;
            b.y += b.vy * dt;
            b.life -= dt;

            if (b.life <= 0 || b.x < -10 || b.x > width + 10 || b.y < -10 || b.y > height + 10) {
                bullets.splice(i, 1);
                continue;
            }

            // Check enemy collisions
            let hit = false;
            for (let j = enemies.length - 1; j >= 0; j--) {
                const e = enemies[j];
                const d = Math.hypot(b.x - e.x, b.y - e.y);
                if (d < b.radius + e.radius + 2) {
                    hit = true;
                    e.hp -= 1;
                    e.flashTime = 0.14;

                    const bLen = Math.hypot(b.vx, b.vy) || 1;
                    e.vx = (b.vx / bLen) * 190;
                    e.vy = (b.vy / bLen) * 190;
                    setEnemyState(e, "STUN");

                    if (e.hp <= 0) {
                        score += 1;
                        combo += 1;
                        comboTimer = 3.0;
                        triggerHitstop(0.052);
                        triggerShake(7.5, 0.18);
                        spawnParticles(e.x, e.y, "#e5a93b", 22, 210);
                        spawnParticles(e.x, e.y, "#f2efe9", 10, 140);
                        addPopup(e.x, e.y - 12, combo > 1 ? `KO ×${combo}` : "KO!", "#f2be5c");
                        logConsole(`CombatSystem: ${e.id} defeated · Hitstop(${Math.round(52 * config.juice)}ms)`);
                        enemies.splice(j, 1);
                        if (window.GameSFX) window.GameSFX.enemyDown();
                    } else {
                        triggerHitstop(0.028);
                        triggerShake(3.8, 0.1);
                        spawnParticles(b.x, b.y, "#f2be5c", 11, 150);
                        addPopup(e.x, e.y - 14, "-1", "#f2efe9");
                        if (window.GameSFX) window.GameSFX.hit();
                    }
                    updateHUD();
                    break;
                }
            }
            if (hit) bullets.splice(i, 1);
        }
    }

    function updateFX(dt) {
        if (comboTimer > 0) {
            comboTimer -= dt;
            if (comboTimer <= 0) {
                combo = 0;
                updateHUD();
            }
        }
        if (shakeTime > 0) {
            shakeTime -= dt;
            if (shakeTime <= 0) shakeMag = 0;
        }
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vx *= Math.exp(-5 * dt);
            p.vy *= Math.exp(-5 * dt);
            p.life -= dt;
            if (p.life <= 0) particles.splice(i, 1);
        }
        for (let i = ghosts.length - 1; i >= 0; i--) {
            ghosts[i].life -= dt;
            if (ghosts[i].life <= 0) ghosts.splice(i, 1);
        }
        for (let i = popups.length - 1; i >= 0; i--) {
            const pop = popups[i];
            pop.y -= 28 * dt;
            pop.life -= dt;
            if (pop.life <= 0) popups.splice(i, 1);
        }
    }

    /* ----------------------------------------------------------------------
       RENDERER
       ---------------------------------------------------------------------- */
    function drawGrid() {
        ctx.fillStyle = "#0b0c0f";
        ctx.fillRect(0, 0, width, height);

        // Tactical Unity Scene grid
        const step = 32;
        ctx.strokeStyle = "rgba(242, 239, 233, 0.045)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = step; x < width; x += step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        for (let y = step; y < height; y += step) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        ctx.stroke();

        // Subtle center axis crosshair
        ctx.strokeStyle = "rgba(229, 169, 59, 0.08)";
        ctx.beginPath();
        ctx.moveTo(width * 0.5, 0);
        ctx.lineTo(width * 0.5, height);
        ctx.moveTo(0, height * 0.5);
        ctx.lineTo(width, height * 0.5);
        ctx.stroke();
    }

    function drawGizmos() {
        if (!config.showGizmos) return;

        for (const e of enemies) {
            const col = STATE_COLORS[e.state] || "#e5a93b";

            // Patrol waypoints & path
            ctx.save();
            ctx.strokeStyle = "rgba(74, 222, 128, 0.16)";
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            e.waypoints.forEach((wp, idx) => {
                if (idx === 0) ctx.moveTo(wp.x, wp.y);
                else ctx.lineTo(wp.x, wp.y);
            });
            ctx.closePath();
            ctx.stroke();

            ctx.fillStyle = "rgba(74, 222, 128, 0.32)";
            for (const wp of e.waypoints) {
                ctx.fillRect(wp.x - 2, wp.y - 2, 4, 4);
            }

            // Detection radius
            ctx.strokeStyle = e.state === "PATROL" ? "rgba(74, 222, 128, 0.16)" : "rgba(229, 169, 59, 0.24)";
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.detectRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            // Velocity vector
            if (Math.hypot(e.vx, e.vy) > 8) {
                ctx.strokeStyle = col;
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(e.x, e.y);
                ctx.lineTo(e.x + e.vx * 0.22, e.y + e.vy * 0.22);
                ctx.stroke();
            }

            // FSM State label pill
            ctx.font = "600 9px 'JetBrains Mono', monospace";
            ctx.textAlign = "center";
            const label = e.state;
            const tw = ctx.measureText(label).width + 8;
            ctx.fillStyle = "rgba(11, 12, 15, 0.85)";
            ctx.fillRect(e.x - tw / 2, e.y - e.radius - 19, tw, 13);
            ctx.strokeStyle = col;
            ctx.lineWidth = 0.8;
            ctx.strokeRect(e.x - tw / 2, e.y - e.radius - 19, tw, 13);
            ctx.fillStyle = col;
            ctx.fillText(label, e.x, e.y - e.radius - 9.5);
            ctx.restore();
        }

        // Player aim line
        ctx.save();
        ctx.strokeStyle = "rgba(229, 169, 59, 0.26)";
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(player.x + Math.cos(player.angle) * 68, player.y + Math.sin(player.angle) * 68);
        ctx.stroke();
        ctx.restore();
    }

    function drawEntities() {
        // Dash ghosts
        for (const g of ghosts) {
            const alpha = (g.life / g.maxLife) * 0.35;
            ctx.save();
            ctx.translate(g.x, g.y);
            ctx.rotate(g.angle);
            ctx.fillStyle = `rgba(229, 169, 59, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(13, 0);
            ctx.lineTo(-9, -8);
            ctx.lineTo(-5, 0);
            ctx.lineTo(-9, 8);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        // Enemies
        for (const e of enemies) {
            const col = e.flashTime > 0 ? "#ffffff" : STATE_COLORS[e.state] || "#e5a93b";

            // Windup attack telegraph ring
            if (e.state === "WINDUP") {
                const prog = clamp(e.stateTimer / 0.42, 0, 1);
                ctx.save();
                ctx.strokeStyle = `rgba(239, 68, 68, ${0.35 + prog * 0.55})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.radius + 4 + (1 - prog) * 16, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // Diamond enemy chassis
            ctx.save();
            ctx.translate(e.x, e.y);
            ctx.fillStyle = "rgba(20, 22, 26, 0.95)";
            ctx.strokeStyle = col;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, -e.radius);
            ctx.lineTo(e.radius, 0);
            ctx.lineTo(0, e.radius);
            ctx.lineTo(-e.radius, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Inner eye core
            ctx.fillStyle = col;
            ctx.fillRect(-3, -3, 6, 6);
            ctx.restore();

            // Mini HP pips below enemy
            const pipW = 7;
            const gap = 3;
            const totalW = e.maxHp * pipW + (e.maxHp - 1) * gap;
            for (let h = 0; h < e.maxHp; h++) {
                ctx.fillStyle = h < e.hp ? col : "rgba(242, 239, 233, 0.14)";
                ctx.fillRect(e.x - totalW / 2 + h * (pipW + gap), e.y + e.radius + 5, pipW, 3);
            }
        }

        // Bullets
        for (const b of bullets) {
            if (b.trail.length > 1) {
                ctx.strokeStyle = "rgba(229, 169, 59, 0.45)";
                ctx.lineWidth = 3;
                ctx.beginPath();
                b.trail.forEach((pt, idx) => {
                    if (idx === 0) ctx.moveTo(pt.x, pt.y);
                    else ctx.lineTo(pt.x, pt.y);
                });
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
            ctx.fillStyle = "#f2efe9";
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#e5a93b";
            ctx.lineWidth = 1.6;
            ctx.stroke();
        }

        // Player
        ctx.save();
        ctx.translate(player.x, player.y);

        // Dash cooldown ring
        if (player.dashCd > 0) {
            const pct = 1 - player.dashCd / 0.75;
            ctx.strokeStyle = "rgba(229, 169, 59, 0.45)";
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.arc(0, 0, player.radius + 6, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pct);
            ctx.stroke();
        }

        ctx.rotate(player.angle);
        ctx.fillStyle = player.flashTime > 0 ? "#ef4444" : "#e5a93b";
        ctx.strokeStyle = "#f2efe9";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(14, 0);
        ctx.lineTo(-9, -9);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-9, 9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Particles
        for (const p of particles) {
            ctx.globalAlpha = clamp(p.life / p.maxLife, 0, 1);
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        }
        ctx.globalAlpha = 1;

        // Floating popups
        ctx.font = "700 11px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        for (const pop of popups) {
            ctx.globalAlpha = clamp(pop.life / pop.maxLife, 0, 1);
            ctx.fillStyle = pop.color;
            ctx.fillText(pop.text, pop.x, pop.y);
        }
        ctx.globalAlpha = 1;

        // Manual cursor reticle inside canvas
        if (!config.autoMode && pointer.inside) {
            ctx.save();
            ctx.strokeStyle = "rgba(229, 169, 59, 0.85)";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(pointer.x, pointer.y, 8, 0, Math.PI * 2);
            ctx.moveTo(pointer.x - 13, pointer.y);
            ctx.lineTo(pointer.x - 5, pointer.y);
            ctx.moveTo(pointer.x + 5, pointer.y);
            ctx.lineTo(pointer.x + 13, pointer.y);
            ctx.moveTo(pointer.x, pointer.y - 13);
            ctx.lineTo(pointer.x, pointer.y - 5);
            ctx.moveTo(pointer.x, pointer.y + 5);
            ctx.lineTo(pointer.x, pointer.y + 13);
            ctx.stroke();
            ctx.restore();
        }
    }

    function render() {
        ctx.save();
        if (shakeTime > 0 && shakeMag > 0) {
            const ox = rand(-shakeMag, shakeMag);
            const oy = rand(-shakeMag, shakeMag);
            ctx.translate(ox, oy);
        }
        drawGrid();
        drawGizmos();
        drawEntities();
        ctx.restore();
    }

    /* ----------------------------------------------------------------------
       MAIN LOOP & FPS METER
       ---------------------------------------------------------------------- */
    let lastTime = performance.now();
    let fpsFrames = 0;
    let fpsAccum = 0;

    function loop(now) {
        requestAnimationFrame(loop);
        if (!config.inViewport) {
            lastTime = now;
            return;
        }

        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        fpsFrames += 1;
        fpsAccum += dt;
        if (fpsAccum >= 0.5) {
            if (fpsEl) fpsEl.textContent = `${Math.round(fpsFrames / fpsAccum)} FPS`;
            fpsFrames = 0;
            fpsAccum = 0;
        }

        if (!config.paused) {
            if (hitstopTimer > 0) {
                hitstopTimer -= dt;
                updateFX(dt * 0.25);
            } else {
                updatePlayer(dt);
                updateEnemies(dt);
                updateBullets(dt);
                updateFX(dt);
            }
        }

        render();
    }

    /* ----------------------------------------------------------------------
       INPUT & UI WIRING
       ---------------------------------------------------------------------- */
    function takeManualControl() {
        if (config.autoMode) {
            config.autoMode = false;
            config.paused = false;
            updateHUD();
            logConsole("InputManager: Switched to PLAYER_CTRL (WASD + Click + Space)");
        }
    }

    function getCanvasCoords(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    canvas.addEventListener("pointermove", (e) => {
        const pt = getCanvasCoords(e.clientX, e.clientY);
        pointer.x = pt.x;
        pointer.y = pt.y;
        pointer.inside = true;
    });

    canvas.addEventListener("pointerleave", () => {
        pointer.inside = false;
        pointer.down = false;
    });

    canvas.addEventListener("pointerdown", (e) => {
        const pt = getCanvasCoords(e.clientX, e.clientY);
        pointer.x = pt.x;
        pointer.y = pt.y;
        pointer.inside = true;
        pointer.down = true;
        takeManualControl();
        fireProjectile(pt.x, pt.y);
    });

    window.addEventListener("pointerup", () => {
        pointer.down = false;
    });

    window.addEventListener("keydown", (e) => {
        const tag = document.activeElement?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || document.body.classList.contains("modal-open")) return;

        const moveKeys = ["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        if (moveKeys.includes(e.code)) {
            // Only intercept arrow scrolling if user is actively in manual mode or scrolled near hero
            if (e.code.startsWith("Arrow") && window.scrollY < 350) {
                e.preventDefault();
            }
            keys.add(e.code);
            if (window.scrollY < 450) takeManualControl();
        }

        if ((e.code === "Space" || e.code === "ShiftLeft") && !config.autoMode && window.scrollY < 450) {
            if (e.code === "Space") e.preventDefault();
            let dx = 0;
            let dy = 0;
            if (keys.has("KeyW") || keys.has("ArrowUp")) dy -= 1;
            if (keys.has("KeyS") || keys.has("ArrowDown")) dy += 1;
            if (keys.has("KeyA") || keys.has("ArrowLeft")) dx -= 1;
            if (keys.has("KeyD") || keys.has("ArrowRight")) dx += 1;
            triggerDash(dx, dy);
        }
    });

    window.addEventListener("keyup", (e) => {
        keys.delete(e.code);
    });

    playPauseBtn?.addEventListener("click", () => {
        config.paused = !config.paused;
        updateHUD();
        if (window.GameSFX) window.GameSFX.click();
    });

    autoBtn?.addEventListener("click", () => {
        config.autoMode = !config.autoMode;
        config.paused = false;
        updateHUD();
        logConsole(config.autoMode ? "AI Autopilot enabled" : "Manual Control: WASD move · Click shoot · Space dash");
        if (window.GameSFX) window.GameSFX.tab();
    });

    gizmoBtn?.addEventListener("click", () => {
        config.showGizmos = !config.showGizmos;
        updateHUD();
        logConsole(`SceneGizmos: ${config.showGizmos ? "VISIBLE (FSM + Patrol + Vectors)" : "HIDDEN"}`);
        if (window.GameSFX) window.GameSFX.click();
    });

    spawnBtn?.addEventListener("click", () => {
        if (enemies.length >= 7) {
            logConsole("WaveSpawner: Max agent cap (7) reached");
            return;
        }
        const e = createEnemy(rand(45, width - 45), rand(45, height - 45));
        enemies.push(e);
        spawnParticles(e.x, e.y, "#4ade80", 14, 110);
        logConsole(`WaveSpawner: Spawned ${e.id} (PATROL)`);
        if (window.GameSFX) window.GameSFX.tab();
    });

    resetBtn?.addEventListener("click", () => {
        resetArena();
        if (window.GameSFX) window.GameSFX.click();
    });

    speedSlider?.addEventListener("input", (e) => {
        config.playerSpeed = Number(e.target.value);
        if (speedValEl) speedValEl.textContent = `${config.playerSpeed}`;
    });

    juiceSlider?.addEventListener("input", (e) => {
        config.juice = Number(e.target.value) / 100;
        if (juiceValEl) juiceValEl.textContent = `${e.target.value}%`;
    });

    // Pause simulation when Hero is off-screen
    if ("IntersectionObserver" in window) {
        const visObs = new IntersectionObserver(
            (entries) => {
                config.inViewport = entries[0]?.isIntersecting ?? true;
            },
            { threshold: 0.05 }
        );
        visObs.observe(canvas);
    }

    if ("ResizeObserver" in window) {
        new ResizeObserver(() => {
            resize();
        }).observe(canvas.parentElement);
    } else {
        window.addEventListener("resize", resize);
    }

    resize();
    resetArena();
    requestAnimationFrame(loop);
})();
