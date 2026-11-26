/* ==========================================================================
   GAME SFX — PROCEDURAL WEB AUDIO SYNTHESIZER
   Zero external audio assets. Works offline and on static GitHub Pages.
   ========================================================================== */

const GameSFX = (() => {
    let ctx = null;
    let enabled = false;

    function ensureContext() {
        if (!ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return null;
            ctx = new AudioCtx();
        }
        if (ctx.state === "suspended") {
            ctx.resume().catch(() => {});
        }
        return ctx;
    }

    function playTone({
        freq = 440,
        endFreq = freq,
        duration = 0.08,
        type = "triangle",
        gain = 0.08,
        delay = 0
    }) {
        if (!enabled) return;
        const audio = ensureContext();
        if (!audio) return;

        const now = audio.currentTime + delay;
        const osc = audio.createOscillator();
        const amp = audio.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        if (endFreq !== freq) {
            osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 20), now + duration);
        }

        amp.gain.setValueAtTime(0.0001, now);
        amp.gain.linearRampToValueAtTime(gain, now + 0.008);
        amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(amp);
        amp.connect(audio.destination);

        osc.start(now);
        osc.stop(now + duration + 0.02);
    }

    function playNoise({ duration = 0.07, gain = 0.05, highpass = 1200 }) {
        if (!enabled) return;
        const audio = ensureContext();
        if (!audio) return;

        const bufferSize = Math.floor(audio.sampleRate * duration);
        const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
        }

        const src = audio.createBufferSource();
        src.buffer = buffer;

        const filter = audio.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = highpass;

        const amp = audio.createGain();
        const now = audio.currentTime;
        amp.gain.setValueAtTime(gain, now);
        amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        src.connect(filter);
        filter.connect(amp);
        amp.connect(audio.destination);
        src.start(now);
    }

    return {
        isEnabled() {
            return enabled;
        },
        setEnabled(val) {
            enabled = Boolean(val);
            if (enabled) {
                ensureContext();
                this.chime();
            }
            return enabled;
        },
        toggle() {
            return this.setEnabled(!enabled);
        },
        // UI micro-feedback
        tick() {
            playTone({ freq: 620, endFreq: 520, duration: 0.032, type: "triangle", gain: 0.035 });
        },
        click() {
            playTone({ freq: 520, endFreq: 760, duration: 0.055, type: "square", gain: 0.04 });
        },
        tab() {
            playTone({ freq: 440, endFreq: 660, duration: 0.06, type: "triangle", gain: 0.05 });
        },
        modalOpen() {
            playTone({ freq: 340, endFreq: 540, duration: 0.09, type: "triangle", gain: 0.055 });
            playTone({ freq: 540, endFreq: 720, duration: 0.09, type: "sine", gain: 0.045, delay: 0.05 });
        },
        modalClose() {
            playTone({ freq: 500, endFreq: 280, duration: 0.09, type: "triangle", gain: 0.05 });
        },
        chime() {
            // Little bell chime inspired by Sherma
            playTone({ freq: 784, endFreq: 784, duration: 0.14, type: "sine", gain: 0.06 });
            playTone({ freq: 1175, endFreq: 1175, duration: 0.18, type: "sine", gain: 0.05, delay: 0.08 });
        },
        // Gameplay sandbox SFX
        shoot() {
            playTone({ freq: 640, endFreq: 220, duration: 0.09, type: "sawtooth", gain: 0.055 });
        },
        dash() {
            playNoise({ duration: 0.11, gain: 0.055, highpass: 900 });
            playTone({ freq: 300, endFreq: 640, duration: 0.09, type: "triangle", gain: 0.045 });
        },
        hit() {
            playTone({ freq: 190, endFreq: 75, duration: 0.08, type: "square", gain: 0.07 });
            playNoise({ duration: 0.05, gain: 0.05, highpass: 1800 });
        },
        enemyDown() {
            playTone({ freq: 260, endFreq: 110, duration: 0.12, type: "sawtooth", gain: 0.065 });
            playTone({ freq: 520, endFreq: 880, duration: 0.12, type: "triangle", gain: 0.05, delay: 0.06 });
        }
    };
})();

window.GameSFX = GameSFX;
