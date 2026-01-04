// @ts-nocheck
'use client';

import React, { useEffect, useRef } from "react";

interface SplashCursorProps {
    // Fluid simulation params - tuned for subtle water effect
    SIM_RESOLUTION?: number;
    DYE_RESOLUTION?: number;
    DENSITY_DISSIPATION?: number;
    VELOCITY_DISSIPATION?: number;
    PRESSURE?: number;
    CURL?: number;
    SPLAT_RADIUS?: number;
    SPLAT_FORCE?: number;
    TRANSPARENT?: boolean;
}

export default function SplashCursor({
    SIM_RESOLUTION = 128,
    DYE_RESOLUTION = 1024,
    DENSITY_DISSIPATION = 3.5,      // Higher = faster fade (subtle trails)
    VELOCITY_DISSIPATION = 2.0,
    PRESSURE = 0.1,
    CURL = 3,
    SPLAT_RADIUS = 0.15,            // Smaller radius for subtle effect
    SPLAT_FORCE = 4000,             // Lower force for gentler splats
    TRANSPARENT = true,
}: SplashCursorProps = {}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const config = {
            SIM_RESOLUTION,
            DYE_RESOLUTION,
            DENSITY_DISSIPATION,
            VELOCITY_DISSIPATION,
            PRESSURE,
            PRESSURE_ITERATIONS: 20,
            CURL,
            SPLAT_RADIUS,
            SPLAT_FORCE,
            SHADING: true,
            COLOR_UPDATE_SPEED: 10,
            PAUSED: false,
            TRANSPARENT,
        };

        const pointers = [{
            id: -1, texcoordX: 0, texcoordY: 0, prevTexcoordX: 0, prevTexcoordY: 0,
            deltaX: 0, deltaY: 0, down: false, moved: false, color: { r: 0, g: 0, b: 0 },
        }];

        function getWebGLContext(canvasEl) {
            const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
            let gl = canvasEl.getContext("webgl2", params);
            const isWebGL2 = !!gl;
            if (!isWebGL2) gl = canvasEl.getContext("webgl", params) || canvasEl.getContext("experimental-webgl", params);
            if (!gl) return null;

            let halfFloat, supportLinearFiltering;
            if (isWebGL2) {
                gl.getExtension("EXT_color_buffer_float");
                supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
            } else {
                halfFloat = gl.getExtension("OES_texture_half_float");
                supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
            }
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat?.HALF_FLOAT_OES;
            if (!halfFloatTexType) return null;

            const formatRGBA = getSupportedFormat(gl, isWebGL2 ? gl.RGBA16F : gl.RGBA, gl.RGBA, halfFloatTexType);
            const formatRG = getSupportedFormat(gl, isWebGL2 ? gl.RG16F : gl.RGBA, isWebGL2 ? gl.RG : gl.RGBA, halfFloatTexType);
            const formatR = getSupportedFormat(gl, isWebGL2 ? gl.R16F : gl.RGBA, isWebGL2 ? gl.RED : gl.RGBA, halfFloatTexType);

            return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
        }

        function getSupportedFormat(gl, internalFormat, format, type) {
            if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
                if (internalFormat === gl.R16F) return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
                if (internalFormat === gl.RG16F) return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
                return null;
            }
            return { internalFormat, format };
        }

        function supportRenderTextureFormat(gl, internalFormat, format, type) {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
        }

        const context = getWebGLContext(canvas);
        if (!context) return;
        const { gl, ext } = context;

        function compileShader(type, source, keywords = []) {
            const keywordsStr = keywords.map(k => `#define ${k}\n`).join('');
            const shader = gl.createShader(type);
            gl.shaderSource(shader, keywordsStr + source);
            gl.compileShader(shader);
            return shader;
        }

        function createProgram(vs, fs) {
            const prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            return prog;
        }

        function getUniforms(prog) {
            const uniforms = {};
            const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < count; i++) {
                const info = gl.getActiveUniform(prog, i);
                if (info) uniforms[info.name] = gl.getUniformLocation(prog, info.name);
            }
            return uniforms;
        }

        class Program {
            constructor(vs, fs) {
                this.program = createProgram(vs, fs);
                this.uniforms = getUniforms(this.program);
            }
            bind() { gl.useProgram(this.program); }
        }

        const baseVert = compileShader(gl.VERTEX_SHADER, `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform vec2 texelSize;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `);

        const copyFrag = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main() { gl_FragColor = texture2D(uTexture, vUv); }
    `);

        const clearFrag = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;
      void main() { gl_FragColor = value * texture2D(uTexture, vUv); }
    `);

        const displayFrag = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform sampler2D uTexture;
      uniform vec2 texelSize;
      void main() {
        vec3 c = texture2D(uTexture, vUv).rgb;
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;
        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);
        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        float diffuse = clamp(dot(n, vec3(0.0, 0.0, 1.0)) + 0.7, 0.7, 1.0);
        c *= diffuse;
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a * 0.6);
      }
    `);

        const splatFrag = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main() {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `);

        const advectionFrag = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uVelocity, uSource;
      uniform vec2 texelSize, dyeTexelSize;
      uniform float dt, dissipation;
      void main() {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
        gl_FragColor = result / (1.0 + dissipation * dt);
      }
    `);

        const divergenceFrag = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform sampler2D uVelocity;
      void main() {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) L = -C.x;
        if (vR.x > 1.0) R = -C.x;
        if (vT.y > 1.0) T = -C.y;
        if (vB.y < 0.0) B = -C.y;
        gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
      }
    `);

        const curlFrag = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform sampler2D uVelocity;
      void main() {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
      }
    `);

        const vorticityFrag = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform sampler2D uVelocity, uCurl;
      uniform float curl, dt;
      void main() {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 velocity = texture2D(uVelocity, vUv).xy + force * dt;
        gl_FragColor = vec4(clamp(velocity, -1000.0, 1000.0), 0.0, 1.0);
      }
    `);

        const pressureFrag = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform sampler2D uPressure, uDivergence;
      void main() {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float div = texture2D(uDivergence, vUv).x;
        gl_FragColor = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
      }
    `);

        const gradSubFrag = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform sampler2D uPressure, uVelocity;
      void main() {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy - vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `);

        // Setup buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);

        const blit = (target) => {
            if (!target) {
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            } else {
                gl.viewport(0, 0, target.width, target.height);
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
            }
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        };

        const copyProg = new Program(baseVert, copyFrag);
        const clearProg = new Program(baseVert, clearFrag);
        const splatProg = new Program(baseVert, splatFrag);
        const advProg = new Program(baseVert, advectionFrag);
        const divProg = new Program(baseVert, divergenceFrag);
        const curlProg = new Program(baseVert, curlFrag);
        const vortProg = new Program(baseVert, vorticityFrag);
        const pressProg = new Program(baseVert, pressureFrag);
        const gradProg = new Program(baseVert, gradSubFrag);
        const dispProg = new Program(baseVert, displayFrag);

        function createFBO(w, h, internalFormat, format, type, param) {
            gl.activeTexture(gl.TEXTURE0);
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            gl.viewport(0, 0, w, h);
            gl.clear(gl.COLOR_BUFFER_BIT);
            return { texture, fbo, width: w, height: h, texelSizeX: 1 / w, texelSizeY: 1 / h, attach: (id) => { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; } };
        }

        function createDoubleFBO(w, h, internalFormat, format, type, param) {
            let fbo1 = createFBO(w, h, internalFormat, format, type, param);
            let fbo2 = createFBO(w, h, internalFormat, format, type, param);
            return {
                width: w, height: h, texelSizeX: fbo1.texelSizeX, texelSizeY: fbo1.texelSizeY,
                get read() { return fbo1; }, set read(v) { fbo1 = v; },
                get write() { return fbo2; }, set write(v) { fbo2 = v; },
                swap() { const t = fbo1; fbo1 = fbo2; fbo2 = t; }
            };
        }

        function getRes(resolution) {
            let ar = gl.drawingBufferWidth / gl.drawingBufferHeight;
            if (ar < 1) ar = 1 / ar;
            const min = Math.round(resolution), max = Math.round(resolution * ar);
            return gl.drawingBufferWidth > gl.drawingBufferHeight ? { width: max, height: min } : { width: min, height: max };
        }

        const simRes = getRes(config.SIM_RESOLUTION);
        const dyeRes = getRes(config.DYE_RESOLUTION);
        const texType = ext.halfFloatTexType;
        const rgba = ext.formatRGBA, rg = ext.formatRG, r = ext.formatR;
        const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

        let dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
        let velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
        let divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
        let curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
        let pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);

        let lastTime = Date.now();

        // Generate subtle cyan/teal water colors
        function generateColor() {
            const hue = 0.5 + Math.random() * 0.1; // Cyan range
            const sat = 0.3 + Math.random() * 0.3;
            const val = 0.08 + Math.random() * 0.12; // Very subtle/transparent
            const c = Math.cos, s = Math.sin;
            const h = hue * 6, i = Math.floor(h), f = h - i, p = val * (1 - sat), q = val * (1 - f * sat), t = val * (1 - (1 - f) * sat);
            let r, g, b;
            switch (i % 6) {
                case 0: r = val; g = t; b = p; break;
                case 1: r = q; g = val; b = p; break;
                case 2: r = p; g = val; b = t; break;
                case 3: r = p; g = q; b = val; break;
                case 4: r = t; g = p; b = val; break;
                default: r = val; g = p; b = q;
            }
            return { r, g, b };
        }

        function correctRadius(radius) {
            const ar = canvas.width / canvas.height;
            return ar > 1 ? radius * ar : radius;
        }

        function splat(x, y, dx, dy, color) {
            splatProg.bind();
            gl.uniform1i(splatProg.uniforms.uTarget, velocity.read.attach(0));
            gl.uniform1f(splatProg.uniforms.aspectRatio, canvas.width / canvas.height);
            gl.uniform2f(splatProg.uniforms.point, x, y);
            gl.uniform3f(splatProg.uniforms.color, dx, dy, 0);
            gl.uniform1f(splatProg.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100));
            blit(velocity.write);
            velocity.swap();
            gl.uniform1i(splatProg.uniforms.uTarget, dye.read.attach(0));
            gl.uniform3f(splatProg.uniforms.color, color.r, color.g, color.b);
            blit(dye.write);
            dye.swap();
        }

        function step(dt) {
            gl.disable(gl.BLEND);
            curlProg.bind();
            gl.uniform2f(curlProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(curlProg.uniforms.uVelocity, velocity.read.attach(0));
            blit(curl);

            vortProg.bind();
            gl.uniform2f(vortProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(vortProg.uniforms.uVelocity, velocity.read.attach(0));
            gl.uniform1i(vortProg.uniforms.uCurl, curl.attach(1));
            gl.uniform1f(vortProg.uniforms.curl, config.CURL);
            gl.uniform1f(vortProg.uniforms.dt, dt);
            blit(velocity.write);
            velocity.swap();

            divProg.bind();
            gl.uniform2f(divProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(divProg.uniforms.uVelocity, velocity.read.attach(0));
            blit(divergence);

            clearProg.bind();
            gl.uniform1i(clearProg.uniforms.uTexture, pressure.read.attach(0));
            gl.uniform1f(clearProg.uniforms.value, config.PRESSURE);
            blit(pressure.write);
            pressure.swap();

            pressProg.bind();
            gl.uniform2f(pressProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(pressProg.uniforms.uDivergence, divergence.attach(0));
            for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
                gl.uniform1i(pressProg.uniforms.uPressure, pressure.read.attach(1));
                blit(pressure.write);
                pressure.swap();
            }

            gradProg.bind();
            gl.uniform2f(gradProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(gradProg.uniforms.uPressure, pressure.read.attach(0));
            gl.uniform1i(gradProg.uniforms.uVelocity, velocity.read.attach(1));
            blit(velocity.write);
            velocity.swap();

            advProg.bind();
            gl.uniform2f(advProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(advProg.uniforms.uVelocity, velocity.read.attach(0));
            gl.uniform1i(advProg.uniforms.uSource, velocity.read.attach(0));
            gl.uniform1f(advProg.uniforms.dt, dt);
            gl.uniform1f(advProg.uniforms.dissipation, config.VELOCITY_DISSIPATION);
            blit(velocity.write);
            velocity.swap();

            gl.uniform1i(advProg.uniforms.uVelocity, velocity.read.attach(0));
            gl.uniform1i(advProg.uniforms.uSource, dye.read.attach(1));
            gl.uniform1f(advProg.uniforms.dissipation, config.DENSITY_DISSIPATION);
            blit(dye.write);
            dye.swap();
        }

        function render() {
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.BLEND);
            dispProg.bind();
            gl.uniform2f(dispProg.uniforms.texelSize, 1 / gl.drawingBufferWidth, 1 / gl.drawingBufferHeight);
            gl.uniform1i(dispProg.uniforms.uTexture, dye.read.attach(0));
            blit(null);
        }

        let animId, running = false;
        function update() {
            const now = Date.now();
            let dt = Math.min((now - lastTime) / 1000, 0.016);
            lastTime = now;
            pointers.forEach(p => {
                if (p.moved) { p.moved = false; splat(p.texcoordX, p.texcoordY, p.deltaX * config.SPLAT_FORCE, p.deltaY * config.SPLAT_FORCE, p.color); }
            });
            step(dt);
            render();
            if (running) animId = requestAnimationFrame(update);
        }

        function start() { if (!running) { running = true; animId = requestAnimationFrame(update); } }

        function resize() {
            const w = Math.floor(canvas.clientWidth * (window.devicePixelRatio || 1));
            const h = Math.floor(canvas.clientHeight * (window.devicePixelRatio || 1));
            if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
        }
        resize();

        const correctDelta = (dx, dy) => {
            const ar = canvas.width / canvas.height;
            return [ar < 1 ? dx * ar : dx, ar > 1 ? dy / ar : dy];
        };

        const onMove = (e: MouseEvent) => {
            const p = pointers[0];
            // Get canvas bounds for proper coordinate mapping
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1 - (e.clientY - rect.top) / rect.height;
            // Only track if within canvas bounds
            if (x < 0 || x > 1 || y < 0 || y > 1) return;
            const [dx, dy] = correctDelta(x - p.texcoordX, y - p.texcoordY);
            p.prevTexcoordX = p.texcoordX; p.prevTexcoordY = p.texcoordY;
            p.texcoordX = x; p.texcoordY = y;
            p.deltaX = dx; p.deltaY = dy;
            p.moved = Math.abs(dx) > 0 || Math.abs(dy) > 0;
            if (!p.color.r) p.color = generateColor();
            start();
        };

        const onDown = () => {
            const p = pointers[0];
            p.down = true;
            p.color = generateColor();
        };

        const onUp = () => { pointers[0].down = false; };

        // Use window events instead of canvas events (because canvas has pointerEvents: none)
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);

        return () => {
            running = false;
            if (animId) cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
        };
    }, [SIM_RESOLUTION, DYE_RESOLUTION, DENSITY_DISSIPATION, VELOCITY_DISSIPATION, PRESSURE, CURL, SPLAT_RADIUS, SPLAT_FORCE, TRANSPARENT]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 5,
                opacity: 0.5,
            }}
        />
    );
}
