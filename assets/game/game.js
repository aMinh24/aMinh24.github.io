
'use strict';
const $=id=>document.getElementById(id);
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const palette={ink:'#284b40',sky:'#c7e3d7',grass:'#7a9c58',soil:'#cbb691',red:'#c9775d',roof:'#ae5541'};
function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)}
function cloud(c,x,y,s=1){c.save();c.translate(Math.round(x),Math.round(y));c.scale(s,s);rect(c,0,8,48,12,'#f4f5e6');rect(c,8,0,20,25,'#f4f5e6');rect(c,29,5,12,16,'#f4f5e6');c.restore()}
function tree(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);rect(c,-3,-9,6,23,'#897457');rect(c,-17,-38,34,28,'#719956');rect(c,-23,-31,46,18,'#719956');rect(c,-11,-44,22,9,'#91ac61');rect(c,-17,-32,17,12,'#91ac61');rect(c,5,-22,14,9,'#5e854a');c.restore()}
function building(c,x,y,s=1,label=true){c.save();c.translate(x,y);c.scale(s,s);rect(c,-72,-100,144,100,palette.red);rect(c,-84,-108,168,10,palette.roof);rect(c,-29,-146,58,40,'#d68767');rect(c,-35,-151,70,7,palette.roof);rect(c,-22,-135,44,10,'#f0ba8a');rect(c,-51,-72,102,15,'#e1a183');rect(c,-59,-54,118,5,palette.roof);rect(c,-54,-49,10,49,'#e3a281');rect(c,-9,-49,18,49,'#e3a281');rect(c,44,-49,10,49,'#e3a281');rect(c,-42,-42,30,42,'#35584d');rect(c,12,-42,30,42,'#35584d');rect(c,-36,-38,18,25,'#5e8b76');rect(c,18,-38,18,25,'#5e8b76');rect(c,-8,-93,23,16,'#d84d3a');c.fillStyle='#f3d16c';c.font='12px sans-serif';c.textAlign='center';c.fillText('★',4,-81);rect(c,-84,0,168,7,'#d49b78');rect(c,-92,7,184,6,'#e7c39a');if(label){rect(c,-38,-171,76,20,palette.ink);c.font='bold 11px "Be Vietnam Pro",sans-serif';c.fillStyle='#fff2ce';c.fillText('SẢNH A',0,-157)}c.restore()}
function fallbackGraduate(c,x,y,s=1,walk=0,face=1){c.save();c.translate(Math.round(x),Math.round(y));c.scale(s*face,s);rect(c,-10,0,20,3,'#355b4433');rect(c,-7,-8,5,9,'#274b40');rect(c,3,-8,5,9,'#274b40');if(walk){rect(c,-8,-2+walk,6,3,'#203f36');rect(c,3,-2-walk,6,3,'#203f36')}rect(c,-10,-27,20,21,'#34564f');rect(c,-14,-25,5,14,'#34564f');rect(c,9,-25,5,14,'#34564f');rect(c,-13,-12,4,4,'#efbd90');rect(c,10,-12,4,4,'#efbd90');rect(c,-3,-28,6,16,'#edc66e');rect(c,-8,-43,16,15,'#efbd90');rect(c,-9,-45,18,6,'#354b42');rect(c,-15,-49,30,5,'#2a4940');rect(c,-8,-53,16,4,'#2a4940');rect(c,12,-47,2,15,'#edc66e');rect(c,11,-33,4,5,'#edc66e');rect(c,-5,-37,2,3,'#2a4940');rect(c,3,-37,2,3,'#2a4940');rect(c,-3,-31,6,2,'#ca8461');c.restore()}
// Atlas local: 36 × 48 px mỗi khung, 8 cột. Hoạt động trên GitHub Pages.
const spriteSheet = new Image();
spriteSheet.src = new URL('./graduate-sprites.svg', document.currentScript.src).href;
const spriteAnimations = {
  idle: { start: 0, frames: 4, fps: 4 },
  run: { start: 4, frames: 6, fps: 12 },
  jump: { start: 10, frames: 2, fps: 7 },
  fall: { start: 12, frames: 2, fps: 6 },
  hurt: { start: 14, frames: 2, fps: 9 },
  celebrate: { start: 16, frames: 4, fps: 8 }
};
function graduate(c, x, y, scale = 1, walk = 0, face = 1, animation = 'idle', clock = performance.now() / 1000) {
  if (!spriteSheet.complete || !spriteSheet.naturalWidth) {
    fallbackGraduate(c, x, y, scale, walk, face);
    return;
  }
  const clip = spriteAnimations[animation] || spriteAnimations.idle;
  const frame = clip.start + (reducedMotion && animation === 'idle' ? 0 : Math.floor(clock * clip.fps) % clip.frames);
  c.save();
  c.imageSmoothingEnabled = false;
  c.translate(Math.round(x), Math.round(y));
  c.scale(scale * face, scale);
  c.drawImage(spriteSheet, frame % 8 * 36, Math.floor(frame / 8) * 48, 36, 48, -18, -46, 36, 48);
  c.restore();
}

function gift(c,x,y,s=1){c.save();c.translate(Math.round(x),Math.round(y));c.scale(s,s);rect(c,-10,-15,20,17,'#d27b50');rect(c,-12,-19,24,6,'#e7905e');rect(c,-2,-19,5,21,'#f6d986');rect(c,-10,-8,20,4,'#f6d986');rect(c,-7,-25,5,6,'#edc671');rect(c,3,-25,5,6,'#edc671');rect(c,-4,-23,7,4,'#f6d986');rect(c,-9,-14,4,4,'#eda67a');c.restore()}
function flower(c,x,y,color='#e7c26b'){rect(c,x,y,2,7,'#5e854a');rect(c,x-2,y-3,6,5,color);rect(c,x,y-2,2,2,'#f7edb7')}
function drawHero(){const c=$('heroCanvas').getContext('2d');c.imageSmoothingEnabled=false;rect(c,0,0,480,315,'#c7e3d7');rect(c,0,142,480,95,'#b5ce9d');rect(c,0,167,480,74,'#a3bd88');cloud(c,30,37,1.1);cloud(c,336,30,.9);cloud(c,223,64,.6);rect(c,382,58,19,19,'#f7dfa0');rect(c,375,64,32,7,'#f7dfa0');rect(c,32,124,40,92,'#dba78b');rect(c,27,119,50,7,'#b47e69');rect(c,414,112,37,104,'#dba78b');rect(c,410,106,45,7,'#b47e69');for(let i=0;i<6;i++){rect(c,39,132+i*12,7,6,'#f0d7b2');rect(c,57,132+i*12,7,6,'#f0d7b2');rect(c,420,120+i*13,8,7,'#f0d7b2');rect(c,435,120+i*13,8,7,'#f0d7b2')}building(c,240,218,1.1);rect(c,0,236,480,79,'#8eac6a');rect(c,205,232,70,83,'#ded2ab');rect(c,193,270,94,45,'#ded2ab');tree(c,91,230,1.2);tree(c,387,225,1.35);tree(c,22,243,.65);tree(c,451,245,.7);rect(c,0,291,176,6,'#a6be7d');rect(c,310,281,170,6,'#a6be7d');[[39,269],[81,291],[131,264],[334,270],[401,294],[440,272]].forEach(([x,y],i)=>flower(c,x,y,i%2?'#f0b78e':'#f6dc8e'));graduate(c,240,302,1.45);gift(c,177,288,.9);gift(c,308,286,.75);c.fillStyle='#536f49';c.font='10px "Pixelify Sans",monospace';c.textAlign='left';c.fillText('TÔN ĐỨC THẮNG',18,20);rect(c,120,60,3,8,'#f1cf80');rect(c,117,63,9,3,'#f1cf80');rect(c,354,107,3,8,'#f5f0d6');rect(c,351,110,9,3,'#f5f0d6')}
drawHero();
document.fonts?.ready.then(()=>{drawHero();drawGame()});

// Tháp tốt nghiệp: lấy đà khi đứng, thả để nhảy, không chỉnh hướng trên không.
const canvas = $('gameCanvas'), ctx = canvas.getContext('2d');
const WORLD_WIDTH = 480, DURATION = 45, GRAVITY = 1300, MAX_CHARGE = 0.8;
const RESULT_KEY = 'minh-grad-jump-tower-v1';
const REWARD_HEIGHTS = [480, 1010, 2160];
const platforms = [
  { x: 24, y: 0, w: 432 },
  { x: 66, y: -110, w: 142 },
  { x: 270, y: -230, w: 122 },
  { x: 82, y: -355, w: 112 },
  { x: 280, y: -480, w: 98, reward: 4 },
  { x: 110, y: -610, w: 86 },
  { x: 302, y: -740, w: 76 },
  { x: 138, y: -875, w: 66 },
  { x: 320, y: -1010, w: 56, reward: 5 },
  { x: 170, y: -1150, w: 48 },
  { x: 44, y: -1290, w: 44 },
  { x: 226, y: -1435, w: 38 },
  { x: 386, y: -1580, w: 32 },
  { x: 228, y: -1725, w: 28 },
  { x: 62, y: -1870, w: 24 },
  { x: 218, y: -2015, w: 22 },
  { x: 374, y: -2160, w: 20, reward: 6 }
];
function newPlayer() {
  return { x: 230, y: -40, w: 20, h: 40, vx: 0, vy: 0, face: 1,
    grounded: true, platform: 0, charging: false, charge: 0, aim: 0, chargeSource: null,
    landedHeight: 0, bumped: 0 };
}
const state = {
  mode: 'idle', player: newPlayer(), elapsed: 0, time: DURATION,
  camera: -490, particles: [], height: 0, peak: 0, falls: 0,
  name: '', best: null, jumps: 0, reward: 3, shake: 0
};
const input = { left: false, right: false };
let viewWidth = 960, viewHeight = 560, lastTime = 0, lastArt = 0;
let soundOn = false, audioContext = null, toastTimer = null, activeResult = null;
function storageGet(key) { try { return localStorage.getItem(key); } catch { return null; } }
function storageSet(key, value) { try { localStorage.setItem(key, value); } catch {} }
function rewardAt(height) {
  return height >= REWARD_HEIGHTS[2] ? 6 : height >= REWARD_HEIGHTS[1] ? 5 : height >= REWARD_HEIGHTS[0] ? 4 : 3;
}
function validResult(r) {
  return r && r.version === 1 && typeof r.name === 'string' && r.name.length <= 28
    && Number.isFinite(r.height) && r.height >= 0 && r.height <= 2500
    && r.reward === rewardAt(r.height) && r.seconds === DURATION
    && Number.isInteger(r.falls) && r.falls >= 0 && Number.isFinite(r.peak) && r.peak >= r.height;
}
function toast(message) {
  $('toast').textContent = message; $('toast').hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').hidden = true, 2500);
}
function beep(freq = 600, length = 0.07, type = 'square', volume = 0.025) {
  if (!soundOn) return;
  try {
    audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
    const o = audioContext.createOscillator(), g = audioContext.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, audioContext.currentTime);
    g.gain.setValueAtTime(volume, audioContext.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + length);
    o.connect(g); g.connect(audioContext.destination); o.start(); o.stop(audioContext.currentTime + length);
  } catch {}
}
function clearInput() {
  input.left = false; input.right = false;
  state.player.charging = false; state.player.charge = 0; state.player.chargeSource = null;
  document.querySelectorAll('.touch-button').forEach(b => b.classList.remove('held'));
}
function resize() {
  const mobile = window.matchMedia('(max-width:540px)').matches;
  viewWidth = mobile ? 480 : 960; viewHeight = mobile ? 620 : 560;
  canvas.width = viewWidth; canvas.height = viewHeight; ctx.imageSmoothingEnabled = false;
  followCamera(true); drawGame();
}
const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe($('gameViewport'));
function updateHUD() {
  $('heightCount').textContent = Math.floor(state.height + 0.001);
  $('timeCount').textContent = Math.ceil(Math.max(0, state.time));
  $('rewardCount').textContent = state.reward;
  $('timePill').classList.toggle('urgent', state.time <= 10);
  const percent = Math.round(state.player.charge / MAX_CHARGE * 100);
  $('chargeFill').style.width = percent + '%';
  $('chargeLabel').textContent = state.player.charging ? percent === 100 ? 'ĐẦY LỰC!' : percent + '%' : 'GIỮ → THẢ';
  $('powerMeter').setAttribute('aria-valuenow', String(percent));
  $('jumpBtn').classList.toggle('charging', state.player.charging);
}
function start() {
  clearInput();
  Object.assign(state, {
    mode: 'playing', player: newPlayer(), elapsed: 0, time: DURATION,
    camera: -viewHeight + 70, particles: [], height: 0, peak: 0, falls: 0,
    name: $('playerName').value.trim().slice(0, 28), jumps: 0, reward: 3, shake: 0
  });
  storageSet('minh-grad-name', state.name);
  $('gameViewport').classList.remove('is-ready');
  $('startOverlay').hidden = true; $('pauseOverlay').hidden = true; $('result').hidden = true;
  $('pauseBtn').disabled = false; $('pauseBtn').textContent = 'Tạm dừng';
  $('gameStatus').textContent = 'Giữ hướng + giữ phím cách để lấy đà, rồi thả phím cách. Bay rồi là không sửa được đâu!';
  lastTime = performance.now(); updateHUD(); canvas.focus({ preventScroll: true }); beep(440);
}
function pause() {
  if (state.mode !== 'playing') return;
  state.mode = 'paused'; clearInput(); updateHUD();
  $('pauseOverlay').hidden = false; $('pauseBtn').textContent = 'Chơi tiếp';
  $('resumeBtn').focus({ preventScroll: true });
}
function resume() {
  if (state.mode !== 'paused') return;
  state.mode = 'playing'; clearInput(); $('pauseOverlay').hidden = true;
  $('pauseBtn').textContent = 'Tạm dừng'; lastTime = performance.now(); canvas.focus({ preventScroll: true });
}
function beginCharge(source = 'keyboard') {
  const p = state.player;
  if (state.mode !== 'playing' || !p.grounded || p.charging) return false;
  p.charging = true; p.charge = 0; p.chargeSource = source;
  p.aim = (input.right ? 1 : 0) - (input.left ? 1 : 0); p.vx = 0;
  return true;
}
function releaseCharge(source = 'keyboard') {
  const p = state.player;
  if (state.mode !== 'playing' || !p.charging || p.chargeSource !== source) return false;
  const power = Math.min(1, p.charge / MAX_CHARGE);
  const direction = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  if (direction) p.aim = direction;
  p.vy = -(250 + power * 440); p.vx = p.aim * (105 + power * 120);
  if (p.aim) p.face = p.aim;
  p.grounded = false; p.platform = -1; p.charging = false; p.chargeSource = null; p.charge = 0;
  state.jumps++; burst(p.x + 10, p.y + 40, '#c2b69b', 7); beep(280 + power * 280, 0.08, 'triangle');
  return true;
}
$('startBtn').addEventListener('click', start);
$('playerName').addEventListener('keydown', e => { if (e.key === 'Enter') start(); });
$('pauseBtn').addEventListener('click', () => state.mode === 'paused' ? resume() : pause());
$('resumeBtn').addEventListener('click', resume);
$('soundBtn').addEventListener('click', () => {
  soundOn = !soundOn; $('soundBtn').textContent = 'Âm thanh: ' + (soundOn ? 'bật' : 'tắt');
  $('soundBtn').setAttribute('aria-pressed', String(soundOn));
  if (state.mode === 'playing') canvas.focus({ preventScroll: true }); beep();
});
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
window.addEventListener('blur', () => { clearInput(); pause(); });
const movementCodes = ['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD'];
const jumpCodes = ['Space', 'ArrowUp', 'KeyW'];
document.addEventListener('keydown', e => {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
  if ((e.code === 'KeyP' || e.code === 'Escape') && (state.mode === 'playing' || state.mode === 'paused')) {
    e.preventDefault(); if (!e.repeat) (state.mode === 'paused' ? resume() : pause()); return;
  }
  const focused = $('gameViewport').contains(document.activeElement) || document.querySelector('.touch-controls').contains(document.activeElement);
  if (state.mode !== 'playing' || !focused) return;
  if (movementCodes.includes(e.code) || jumpCodes.includes(e.code)) e.preventDefault();
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') input.left = true;
  if (e.code === 'ArrowRight' || e.code === 'KeyD') input.right = true;
  if (jumpCodes.includes(e.code) && !e.repeat) beginCharge(e.code);
});
document.addEventListener('keyup', e => {
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') input.left = false;
  if (e.code === 'ArrowRight' || e.code === 'KeyD') input.right = false;
  if (jumpCodes.includes(e.code)) releaseCharge(e.code);
});
[['leftBtn', 'left'], ['rightBtn', 'right'], ['jumpBtn', 'jump']].forEach(([id, key]) => {
  const button = $(id);
  button.addEventListener('pointerdown', e => {
    e.preventDefault(); if (state.mode !== 'playing') return;
    button.setPointerCapture(e.pointerId); button.classList.add('held');
    if (key === 'jump') beginCharge('pointer-' + e.pointerId); else input[key] = true;
  });
  button.addEventListener('pointerup', e => {
    if (key === 'jump') releaseCharge('pointer-' + e.pointerId); else input[key] = false;
    button.classList.remove('held');
  });
  const cancel = () => {
    if (key === 'jump') { state.player.charging = false; state.player.charge = 0; state.player.chargeSource = null; }
    else input[key] = false;
    button.classList.remove('held');
  };
  button.addEventListener('pointercancel', cancel); button.addEventListener('lostpointercapture', cancel);
});
function burst(x, y, color, count = 10) {
  for (let i = 0; i < count; i++) state.particles.push({ x, y, vx: (Math.random() - 0.5) * 110, vy: -Math.random() * 130, life: 0.5, color });
}
function overlapsX(p, platform) { return p.x + p.w > platform.x + 1 && p.x < platform.x + platform.w - 1; }
function bump() {
  state.player.bumped = 0.2; state.shake = 0.12; beep(130, 0.07, 'triangle');
}
function followCamera(immediate = false, dt = 1 / 60) {
  const base = -viewHeight + 70;
  const target = Math.min(base, state.player.y - viewHeight * 0.45);
  // Theo cả chiều rơi; không khóa camera tại tầng cao nhất.
  state.camera = immediate || reducedMotion ? target : state.camera + (target - state.camera) * Math.min(1, dt * 11);
}
function update(dt) {
  if (state.mode !== 'playing') return;
  dt = Math.min(dt, Math.max(0, DURATION - state.elapsed));
  state.elapsed = Math.min(DURATION, state.elapsed + dt); state.time = Math.max(0, DURATION - state.elapsed);
  const p = state.player, oldX = p.x;
  const oldBottom = p.y + p.h, oldTop = p.y;
  const direction = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  p.bumped = Math.max(0, p.bumped - dt); state.shake = Math.max(0, state.shake - dt);
  if (p.grounded) {
    if (p.charging) {
      p.charge = Math.min(MAX_CHARGE, p.charge + dt); p.vx = 0;
      if (direction) { p.aim = direction; p.face = direction; }
    } else { p.vx = direction * 95; if (direction) p.face = direction; }
  }
  // Vận tốc ngang bị khóa khi cất cánh; phím trái/phải không cứu được cú nhảy hỏng.
  p.x += p.vx * dt;
  if (p.x < 24) { p.x = 24; if (!p.grounded) { p.vx = Math.abs(p.vx) * 0.65; bump(); } }
  if (p.x + p.w > WORLD_WIDTH - 24) { p.x = WORLD_WIDTH - 24 - p.w; if (!p.grounded) { p.vx = -Math.abs(p.vx) * 0.65; bump(); } }
  for (let i = 1; i < platforms.length; i++) {
    const pl = platforms[i];
    if (oldTop + p.h <= pl.y + 1 || oldTop >= pl.y + 16) continue;
    if (oldX + p.w <= pl.x && p.x + p.w > pl.x) { p.x = pl.x - p.w; p.vx = -Math.abs(p.vx) * 0.55; if (!p.grounded) bump(); }
    else if (oldX >= pl.x + pl.w && p.x < pl.x + pl.w) { p.x = pl.x + pl.w; p.vx = Math.abs(p.vx) * 0.55; if (!p.grounded) bump(); }
  }
  p.vy += GRAVITY * dt; p.y += p.vy * dt;
  p.grounded = false; p.platform = -1;
  if (p.vy >= 0) {
    let landing = null;
    platforms.forEach((pl, index) => {
      if (overlapsX(p, pl) && oldBottom <= pl.y + 0.1 && p.y + p.h >= pl.y && (!landing || pl.y < landing.pl.y)) landing = { pl, index };
    });
    if (landing) {
      const speed = p.vy;
      p.y = landing.pl.y - p.h; p.vy = 0; p.vx = 0; p.grounded = true; p.platform = landing.index;
      const height = Math.max(0, -landing.pl.y);
      if (height < p.landedHeight - 160) {
        state.falls++; state.shake = 0.2;
        $('gameStatus').textContent = ['Ối! Một cú trượt, vài tầng bay màu. Leo lại thôi!', 'Sảnh A vẫn đợi… còn bạn thì vừa về tầng dưới!', 'Đừng hoảng, ít nhất vẫn có 3 phần quà!'][state.falls % 3];
        beep(160, 0.12, 'triangle');
      }
      p.landedHeight = height;
      if (speed > 200) burst(p.x + 10, landing.pl.y, '#b4b3a1', 6);
    }
  } else {
    let ceiling = null;
    for (let i = 1; i < platforms.length; i++) {
      const pl = platforms[i], bottom = pl.y + 16;
      if (overlapsX(p, pl) && oldTop >= bottom - 0.1 && p.y <= bottom && (!ceiling || bottom > ceiling)) ceiling = bottom;
    }
    if (ceiling !== null) { p.y = ceiling; p.vy = 65; p.vx *= 0.6; bump(); }
  }
  // Bước khỏi mép khi đang lấy đà cũng mất điểm tựa, không cho nhảy trên không.
  if (!p.grounded && p.charging) { p.charging = false; p.charge = 0; p.chargeSource = null; }
  state.height = Math.max(0, -(p.y + p.h)); state.peak = Math.max(state.peak, state.height);
  state.reward = rewardAt(state.height);
  followCamera(false, dt);
  state.particles = state.particles.filter(a => { a.x += a.vx * dt; a.y += a.vy * dt; a.vy += 300 * dt; a.life -= dt; return a.life > 0; });
  // Chỉ đồng hồ kết thúc ván. Đến đỉnh cũng phải giữ độ cao đến tiếng chuông.
  if (state.time <= 0) finish();
}
function drawStone(x, y, w, reward) {
  rect(ctx, x, y, w, 5, reward === 6 ? '#e4c779' : '#b0b7ad');
  rect(ctx, x, y + 5, w, 11, reward ? '#9b765b' : '#66767d');
  rect(ctx, x + 3, y + 16, Math.max(4, w - 6), 4, '#354852');
  for (let k = x + 13; k < x + w; k += 26) rect(ctx, k, y + 6, 2, 8, '#465a62');
  if (reward) { rect(ctx, x + w / 2 - 3, y + 6, 6, 5, '#e4c779'); }
}
function drawGame() {
  if (!ctx) return;
  const offset = (viewWidth - WORLD_WIDTH) / 2, t = state.elapsed;
  rect(ctx, 0, 0, viewWidth, viewHeight, '#182b3d');
  // Cảnh riêng cho game: tháp đá, vòm cửa, mây đêm; màu ấm của tòa A làm điểm nhấn.
  for (let i = 0; i < 45; i++) {
    const x = (i * 157 + 47) % viewWidth, y = ((i * 73 + state.camera * 0.08) % viewHeight + viewHeight) % viewHeight;
    rect(ctx, x, y, i % 4 === 0 ? 3 : 2, 2, i % 3 ? '#718395' : '#ccb77d');
  }
  rect(ctx, viewWidth - 115, 77, 35, 35, '#e4d9ab'); rect(ctx, viewWidth - 122, 85, 49, 19, '#e4d9ab');
  rect(ctx, viewWidth - 104, 77, 28, 25, '#182b3d');
  for (let i = -1; i < viewWidth / 110 + 1; i++) {
    const y = viewHeight - 140 + i % 3 * 20 + Math.min(80, state.height * 0.035);
    rect(ctx, i * 110, y, 90, viewHeight, '#233e4b');
    rect(ctx, i * 110 + 15, y - 20, 60, 20, '#233e4b');
    for (let k = 0; k < 3; k++) rect(ctx, i * 110 + 18 + k * 23, y + 30, 5, 12, '#637b74');
  }
  ctx.save(); ctx.translate(offset, -Math.round(state.camera));
  if (state.shake > 0 && !reducedMotion) ctx.translate(Math.sin(t * 93) * state.shake * 9, 0);
  // Vòm cửa và tường đá trang trí không che các bục nhảy.
  for (let wallY = Math.floor((state.camera - 80) / 32) * 32; wallY < state.camera + viewHeight + 80; wallY += 32) {
    rect(ctx, 0, wallY, 24, 30, '#4a5d68'); rect(ctx, 456, wallY, 24, 30, '#4a5d68');
    rect(ctx, 3, wallY + 3, 18, 2, '#66757b'); rect(ctx, 459, wallY + 3, 18, 2, '#66757b');
    rect(ctx, wallY % 64 ? 10 : 18, wallY + 16, 2, 14, '#263f4e');
  }
  for (let archY = 60; archY > -2350; archY -= 330) {
    rect(ctx, 210, archY - 200, 60, 80, '#132333'); rect(ctx, 221, archY - 211, 38, 15, '#132333');
    rect(ctx, 207, archY - 196, 3, 80, '#3a505f'); rect(ctx, 270, archY - 196, 3, 80, '#3a505f');
    rect(ctx, 238, archY - 204, 4, 82, '#344b56');
  }
  const visible = pl => pl.y > state.camera - 80 && pl.y < state.camera + viewHeight + 50;
  platforms.forEach((pl, i) => {
    if (!visible(pl)) return;
    drawStone(pl.x, pl.y, pl.w, pl.reward);
    if (pl.reward) {
      const flagX = pl.reward === 4 ? pl.x + pl.w + 15 : pl.x - 30;
      rect(ctx, flagX, pl.y - 49, 3, 49, '#aeb5a5');
      rect(ctx, flagX + 3, pl.y - 47, 31, 22, pl.reward === 6 ? '#e0bf68' : '#a35f53');
      ctx.font = 'bold 16px Arial,sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = pl.reward === 6 ? '#493f2c' : '#fff0ce';
      ctx.fillText(String(pl.reward), flagX + 18, pl.y - 30);
      if (pl.reward === 6) { gift(ctx, pl.x + pl.w / 2, pl.y - 22, 0.75); }
    }
    if (i > 0 && i % 3 === 1) { rect(ctx, pl.x + 10, pl.y + 20, 2, 15, '#77866c'); rect(ctx, pl.x + 8, pl.y + 30, 6, 3, '#77866c'); }
  });
  if (state.camera > -viewHeight) {
    building(ctx, 380, 0, 0.7, false);
    ctx.fillStyle = '#d4ceac'; ctx.font = 'bold 10px Arial,sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('TỪ SÂN TRƯỜNG… LÊN MÂY!', 48, 39);
  }
  const p = state.player;
  const animation = state.mode === 'finished' ? 'celebrate' : p.bumped ? 'hurt'
    : !p.grounded ? p.vy < 0 ? 'jump' : 'fall' : Math.abs(p.vx) > 3 ? 'run' : 'idle';
  ctx.save(); ctx.translate(p.x + p.w / 2, p.y + p.h);
  if (p.charging) ctx.scale(1.08, 0.82);
  graduate(ctx, 0, 0, 0.95, 0, p.face, animation, state.mode === 'finished' ? performance.now() / 1000 : t);
  ctx.restore();
  if (p.charging) {
    const power = p.charge / MAX_CHARGE;
    rect(ctx, p.x - 7, p.y - 18, 34, 5, '#132333'); rect(ctx, p.x - 6, p.y - 17, Math.round(32 * power), 3, power === 1 ? '#f4cf78' : '#a9c99a');
    ctx.fillStyle = '#f3d68d'; ctx.font = 'bold 11px Arial,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(p.aim < 0 ? '←' : p.aim > 0 ? '→' : '↑', p.x + 10, p.y - 23);
  }
  for (const a of state.particles) rect(ctx, a.x, a.y, 3, 3, a.color);
  ctx.restore();
  // Dải độ cao và mốc quà luôn dùng chữ số thường để dễ đọc trên điện thoại.
  const scaleX = viewWidth - 15, scaleTop = 100, scaleH = viewHeight - 185;
  rect(ctx, scaleX, scaleTop, 3, scaleH, '#4a5d68');
  for (const h of [0, ...REWARD_HEIGHTS]) {
    const y = scaleTop + scaleH * (1 - h / 2250);
    rect(ctx, scaleX - 5, y, 8, 2, '#c3b782');
  }
  rect(ctx, scaleX - 4, scaleTop + scaleH * (1 - Math.min(2250, state.height) / 2250) - 2, 10, 5, '#f2d18a');
}
function frame(now) {
  const elapsed = Math.max(0, (now - lastTime) / 1000); lastTime = now;
  if (state.mode === 'playing') {
    const seconds = Math.min(elapsed, state.time), simulated = Math.min(seconds, 1);
    const steps = Math.max(1, Math.ceil(simulated * 120));
    for (let i = 0; i < steps && state.mode === 'playing'; i++) update(simulated / steps);
    if (seconds > simulated && state.mode === 'playing') {
      state.elapsed = Math.min(DURATION, state.elapsed + seconds - simulated); state.time = DURATION - state.elapsed;
      if (state.time <= 0) finish();
    }
    updateHUD(); drawGame();
  } else if ((state.mode === 'idle' || state.mode === 'finished') && now - lastArt > 120) drawGame();
  if (!document.hidden && now - lastArt > 120) { if (!reducedMotion) drawHero(); lastArt = now; }
  requestAnimationFrame(frame);
}
function finish() {
  if (state.mode !== 'playing' || state.time > 0) return;
  state.mode = 'finished'; state.elapsed = DURATION; state.time = 0; clearInput();
  $('pauseBtn').disabled = true; updateHUD();
  const result = { version: 1, name: state.name, reward: rewardAt(state.height),
    height: Math.floor(state.height + 0.001), peak: Math.ceil(state.peak), falls: state.falls, seconds: DURATION };
  // Độ cao dùng để chốt quà phải khớp đúng số hiển thị và số được lưu.
  result.reward = rewardAt(result.height);
  state.reward = result.reward; updateHUD();
  if (!state.best || result.name !== state.best.name || result.reward > state.best.reward
    || (result.reward === state.best.reward && result.height > state.best.height)) state.best = result;
  storageSet(RESULT_KEY, JSON.stringify(state.best));
  $('gameStatus').textContent = 'Hết 45 giây! Chốt ' + result.reward + ' phần quà ở độ cao ' + result.height + ' m. Nhớ lưu phiếu nhé!';
  renderResult(result, true); drawGame(); beep(740, 0.2, 'triangle'); if (!reducedMotion) confetti();
}
function renderResult(r, scroll) {
  activeResult = r; $('result').hidden = false;
  $('resultName').textContent = r.name ? r.name + ' ơi, có quà nè!' : 'Bạn ơi, có quà nè!';
  $('ticketCount').textContent = String(r.reward);
  $('ticketCount').setAttribute('aria-label', r.reward + ' phần quà');
  $('resultDetail').textContent = 'Chốt ở ' + r.height + ' m · Cao nhất ' + r.peak + ' m · ' + r.falls + ' lần trượt · 45 giây';
  $('ticketGifts').replaceChildren();
  for (let i = 0; i < r.reward; i++) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.classList.add('gift-icon');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use'); use.setAttribute('href', '#gift'); svg.append(use); $('ticketGifts').append(svg);
  }
  if (scroll) { $('result').scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'center' }); toast('Hết giờ! Chụp màn hình hoặc lưu ảnh phiếu nhận quà nhé.'); }
}
$('replayBtn').addEventListener('click', () => {
  clearInput(); Object.assign(state, { mode: 'idle', player: newPlayer(), elapsed: 0, time: DURATION,
    height: 0, peak: 0, falls: 0, particles: [], jumps: 0, reward: 3, shake: 0 });
  followCamera(true); updateHUD(); drawGame();
  $('gameViewport').classList.add('is-ready'); $('startOverlay').hidden = false; $('pauseOverlay').hidden = true;
  $('pauseBtn').textContent = 'Tạm dừng'; $('pauseBtn').disabled = true; $('result').hidden = true;
  $('tro-choi').scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' }); $('startBtn').focus({ preventScroll: true });
});
function confetti() {
  for (let i = 0; i < 32; i++) {
    const el = document.createElement('i'); el.className = 'confetti'; el.style.left = Math.random() * 100 + 'vw';
    el.style.background = ['#d78c59', '#b2c37d', '#edc96e', '#7eaa9a'][i % 4]; el.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.append(el); setTimeout(() => el.remove(), 3300);
  }
}
$('saveBtn').addEventListener('click', async () => {
  if (!activeResult) return;
  const button = $('saveBtn'); button.disabled = true;
  try {
    if (document.fonts?.ready) await document.fonts.ready;
    const r = activeResult, c = document.createElement('canvas'); c.width = 900; c.height = 1050;
    const g = c.getContext('2d'); rect(g, 0, 0, 900, 1050, '#e8ecd9'); rect(g, 30, 30, 840, 990, '#294f40');
    rect(g, 36, 36, 828, 978, '#fcf9e9'); rect(g, 36, 36, 828, 94, '#355e4c');
    g.textAlign = 'center'; g.fillStyle = '#fff5d8'; g.font = 'bold 27px "Be Vietnam Pro",Arial,sans-serif';
    g.fillText('PHIẾU NHẬN QUÀ · MINH 2026', 450, 96);
    g.fillStyle = '#6a805c'; g.font = 'bold 18px "Be Vietnam Pro",Arial,sans-serif'; g.fillText('HẾT GIỜ, CHỐT QUÀ NÀO!', 450, 200);
    g.fillStyle = '#294f40'; const title = r.name ? r.name + ' ơi, có quà nè!' : 'Bạn ơi, có quà nè!';
    let size = 38; do { g.font = 'bold ' + size + 'px "Be Vietnam Pro",Arial,sans-serif'; size--; } while (g.measureText(title).width > 730 && size > 16);
    g.fillText(title, 450, 266);
    // Số phần quà dùng sans-serif đậm, không dùng font pixel khó phân biệt 3/8.
    g.fillStyle = '#b85e34'; g.font = '900 185px "Be Vietnam Pro",Arial,sans-serif'; g.fillText(String(r.reward), 450, 482);
    g.fillStyle = '#48674d'; g.font = 'bold 24px "Be Vietnam Pro",Arial,sans-serif'; g.fillText('PHẦN QUÀ ĐANG CHỜ BẠN', 450, 548);
    for (let i = 0; i < r.reward; i++) gift(g, 450 + (i - (r.reward - 1) / 2) * 65, 625, 1.8);
    g.font = '19px "Be Vietnam Pro",Arial,sans-serif'; g.fillText('Chốt ở ' + r.height + ' m · Cao nhất ' + r.peak + ' m · 45 giây', 450, 692);
    rect(g, 85, 735, 730, 115, '#edf0dc'); g.fillStyle = '#294f40'; g.font = 'bold 23px "Be Vietnam Pro",Arial,sans-serif';
    g.fillText('Giữ ảnh này để gặp Minh nhận quà nhé!', 450, 783);
    g.font = '18px "Be Vietnam Pro",Arial,sans-serif'; g.fillText('Mỗi bạn nhận quà một lần theo kết quả tốt nhất.', 450, 818);
    g.fillStyle = '#4c6a4f'; g.font = 'bold 23px "Be Vietnam Pro",Arial,sans-serif'; g.fillText('23/10/2026 · 09:30–11:00', 450, 913);
    g.font = '21px "Be Vietnam Pro",Arial,sans-serif'; g.fillText('Sảnh A · Đại học Tôn Đức Thắng', 450, 960);
    const blob = await new Promise(resolve => c.toBlob(resolve, 'image/png')); if (!blob) throw new Error('Không tạo được ảnh');
    const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = 'Minh-tot-nghiep-phieu-nhan-qua.png';
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 10000);
    toast('Đã tạo ảnh! Nếu máy không tải xuống, chụp màn hình phiếu nhé.');
  } catch { toast('Chưa lưu được ảnh. Bạn chụp màn hình phiếu nhận quà nhé!'); }
  finally { button.disabled = false; }
});
const storedName = storageGet('minh-grad-name'); if (storedName) $('playerName').value = storedName.slice(0, 28);
try { const saved = JSON.parse(storageGet(RESULT_KEY)); if (validResult(saved)) { state.best = saved; renderResult(saved, false); } } catch {}
resize(); updateHUD(); requestAnimationFrame(frame);
