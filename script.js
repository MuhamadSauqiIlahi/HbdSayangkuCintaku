/* =========================================================
   KONFIGURASI — edit bagian ini saja untuk personalisasi
   ========================================================= */
const CONFIG = {
  partnerName: "Sayangku Cinta Pelisa",           // ganti dengan nama pasangan
  subtitle: "Thank you so much, my love, for keeping my spirits up every single day.",
  surpriseMessages: [
    "Kamu adalah hadiah terindah dalam hidupku 💗",
    "Selamat ulang tahun, sayang. Aku sayang kamu 🌸",
    "Semoga semua doa baikmu dipeluk semesta ✨"
  ],
  wish: "Semoga semua harapanmu terkabul. Aku akan selalu ada di sampingmu. 💖",
  // Foto galeri: tiap foto punya path sendiri (taruh file di assets/images/)
  photos: [
    { src: "assets/images/foto1.jpg", caption: "Pertama kali kita Bertemu" },
    { src: "assets/images/foto2.jpg", caption: "Selalu Cantik Setiap Hari" },
    { src: "assets/images/foto3.jpg", caption: "First Photobooth Kita" },
    { src: "assets/images/foto4.jpg", caption: "Nonton konser Pertama Bareng Kamu" },
    { src: "assets/images/foto5.jpg", caption: "Pelukan Ternyaman" },
    { src: "assets/images/foto6.jpg", caption: "Selamanya" }
  ],
  // Timeline: ganti tanggal, judul, cerita, dan foto
  timeline: [
    { date: "11 April 2026", title: "Awal Cerita Kita", text: "Hari saat semuanya dimulai dan hidupku terasa lebih hangat.", img: "assets/images/foto5.jpg" },
    { date: "08 Mei 2026", title: "Kencan Pertama", text: "Gugup, canggung, tapi aku tahu itu istimewa.", img: "assets/images/foto1.jpg" },
    { date: "07 Juni 2026", title: "Resmi Bersama", text: "Hari saat aku memilih kamu, dan akan terus memilih kamu.", img: "assets/images/foto3.jpg" },
    { date: "Hari Ini", title: "Ulang Tahunmu", text: "Satu tahun lagi bersamamu, satu alasan lagi untuk bersyukur.", img: "assets/images/foto2.jpg" }
  ],
  letter:
`Untuk kamu, yang paling aku sayang,

Selamat ulang tahun. Hari ini aku ingin berhenti sejenak dan berterima kasih, karena kamu hadir dan membuat hari-hariku terasa lebih tenang dan lebih berwarna.

Aku tidak butuh hal yang besar untuk bahagia. Cukup mendengar suaramu, melihat senyummu, dan tahu bahwa kamu ada di sana.

Terima kasih sudah sabar, sudah mau bertumbuh bersamaku, dan sudah menjadi rumah untuk hatiku.

Semoga tahun ini membawa lebih banyak tawa, lebih banyak damai, dan semua hal baik yang kamu pantas dapatkan. Aku akan selalu ada, merayakan semuanya bersamamu.

Dengan segenap cinta,
Aku 💗`
};

/* ===== Helper ===== */
const $ = (id) => document.getElementById(id);
const fx = $("fx");
const bgm = $("bgm");

/* ===== Isi nama & sub ===== */
$("partnerName").textContent = CONFIG.partnerName;
$("heroName").textContent = CONFIG.partnerName;
$("heroSub").textContent = CONFIG.subtitle;

/* ===== Efek melayang: hati, kelopak, sparkle ===== */
const floaters = ["💗", "🌸", "🩷", "🌷", "✨"];
function spawnFloat() {
  const el = document.createElement("span");
  el.className = "float";
  el.textContent = floaters[Math.floor(Math.random() * floaters.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = 12 + Math.random() * 18 + "px";
  el.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
  el.style.animationDuration = 8 + Math.random() * 8 + "s";
  fx.appendChild(el);
  setTimeout(() => el.remove(), 17000);
}
function spawnSparkle() {
  const el = document.createElement("span");
  el.className = "sparkle";
  el.textContent = "✦";
  el.style.left = Math.random() * 100 + "vw";
  el.style.top = Math.random() * 100 + "vh";
  el.style.color = "#f4a7bf";
  el.style.fontSize = 10 + Math.random() * 14 + "px";
  fx.appendChild(el);
  setTimeout(() => el.remove(), 1700);
}
setInterval(spawnFloat, 900);
setInterval(spawnSparkle, 500);

/* ===== Confetti (canvas) ===== */
const cv = $("confetti"), ctx = cv.getContext("2d");
let pieces = [], running = false;
function resize() { cv.width = innerWidth; cv.height = innerHeight; }
resize(); addEventListener("resize", resize);

function confetti(count = 140) {
  const colors = ["#f8c8d8", "#f4a7bf", "#e0708f", "#fff", "#ffd6e3", "#ffb3c8"];
  for (let i = 0; i < count; i++) {
    pieces.push({
      x: innerWidth / 2, y: innerHeight * 0.6,
      vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 16 - 4,
      s: 5 + Math.random() * 8, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
      c: colors[Math.floor(Math.random() * colors.length)],
      heart: Math.random() < 0.3, life: 1
    });
  }
  if (!running) { running = true; requestAnimationFrame(tick); }
}
function tick() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  pieces.forEach((p) => {
    p.vy += 0.25; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vx *= 0.99; p.life -= 0.004;
    ctx.save(); ctx.globalAlpha = Math.max(p.life, 0); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
    if (p.heart) { ctx.font = p.s * 2 + "px serif"; ctx.fillText("♥", 0, 0); }
    else ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
    ctx.restore();
  });
  pieces = pieces.filter((p) => p.life > 0 && p.y < cv.height + 40);
  if (pieces.length) requestAnimationFrame(tick);
  else { running = false; ctx.clearRect(0, 0, cv.width, cv.height); }
}

/* ===== Musik ===== */
const musicBtn = $("musicBtn"), musicIcon = $("musicIcon");
function setPlaying(on) {
  musicBtn.classList.toggle("playing", on);
  musicIcon.textContent = on ? "❚❚" : "▶";
}
/* Notifikasi kecil di bawah layar */
function toast(msg) {
  const t = $("toast"); t.textContent = msg; t.hidden = false;
  clearTimeout(toast.id); toast.id = setTimeout(() => (t.hidden = true), 4000);
}
function playMusic() {
  // Hanya dipanggil setelah klik pengguna, jadi tidak autoplay
  bgm.play().then(() => setPlaying(true)).catch(() => {
    setPlaying(false);
    toast("Musik belum bisa diputar. Cek file assets/music/happy-birthday.mp3");
  });
}
musicBtn.addEventListener("click", () => {
  if (bgm.paused) playMusic(); else { bgm.pause(); setPlaying(false); }
});

/* ===== Intro: amplop & tombol buka ===== */
const envelope = $("envelope"), intro = $("intro");
let entered = false;
function openEnvelope() { envelope.classList.add("open"); }
envelope.addEventListener("click", openEnvelope);
envelope.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") openEnvelope(); });

$("openBtn").addEventListener("click", () => {
  if (entered) return;
  entered = true;
  openEnvelope();
  playMusic();
  confetti(90);
  setTimeout(() => {
    intro.classList.add("leave");
    $("main").classList.remove("hidden");
    document.body.classList.remove("locked");
    window.scrollTo(0, 0);
    observe();
    setTimeout(() => intro.remove(), 1300);
  }, 1300);
});

/* ===== Galeri polaroid + lightbox ===== */
const board = $("board");
CONFIG.photos.forEach((p, i) => {
  const fig = document.createElement("figure");
  fig.className = "polaroid reveal";
  fig.style.setProperty("--r", (i % 2 ? 1 : -1) * (1 + (i % 3)) + "deg");
  fig.style.transitionDelay = (i % 3) * 0.12 + "s";
  fig.innerHTML = `<div class="ph"><img src="${p.src}" alt="${p.caption}" loading="lazy"><span class="miss-txt"></span></div><figcaption>${p.caption}</figcaption>`;
  const img = fig.querySelector("img");
  // Jika file belum ada, tampilkan kotak placeholder berisi nama file
  img.addEventListener("error", () => {
    fig.classList.add("missing");
    fig.querySelector(".miss-txt").textContent = "📷 " + p.src.split("/").pop();
  });
  fig.addEventListener("click", () => {
    if (fig.classList.contains("missing")) return;
    $("lbImg").src = p.src; $("lbCap").textContent = p.caption; $("lightbox").hidden = false;
  });
  board.appendChild(fig);
});
const lb = $("lightbox");
lb.addEventListener("click", (e) => { if (e.target !== $("lbImg")) lb.hidden = true; });
addEventListener("keydown", (e) => { if (e.key === "Escape") lb.hidden = true; });

/* ===== Surat dengan efek mengetik ===== */
let typed = false;
$("readBtn").addEventListener("click", () => {
  if (typed) return;
  typed = true;
  $("paperCover").classList.add("gone");
  const target = $("typeTarget");
  target.classList.add("typing");
  let i = 0;
  (function type() {
    target.textContent = CONFIG.letter.slice(0, ++i);
    if (i < CONFIG.letter.length) {
      const ch = CONFIG.letter[i - 1];
      setTimeout(type, ch === "\n" ? 280 : ch === "," || ch === "." ? 140 : 32);
    } else { target.classList.remove("typing"); confetti(40); }
  })();
});

/* ===== Timeline ===== */
const tl = $("timeline");
CONFIG.timeline.forEach((t) => {
  const item = document.createElement("div");
  item.className = "tl-item";
  item.innerHTML = `<div class="tl-card glass"><span class="tl-date">${t.date}</span><h3>${t.title}</h3><p>${t.text}</p><div class="ph"><img src="${t.img}" alt="${t.title}" loading="lazy"></div></div>`;
  // Sembunyikan kotak foto jika file belum ada
  item.querySelector("img").addEventListener("error", (e) => { e.target.style.display = "none"; });
  tl.appendChild(item);
});

/* ===== Scroll reveal ===== */
function observe() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("show"); io.unobserve(en.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal, .tl-item").forEach((el) => io.observe(el));
}

/* ===== Surprise button ===== */
let msgIndex = 0;
$("surpriseBtn").addEventListener("click", () => {
  confetti(180);
  for (let i = 0; i < 14; i++) setTimeout(spawnFloat, i * 90);
  const m = $("surpriseMsg");
  m.style.opacity = 0;
  setTimeout(() => {
    m.textContent = CONFIG.surpriseMessages[msgIndex++ % CONFIG.surpriseMessages.length];
    m.style.transition = "opacity .8s"; m.style.opacity = 1;
  }, 250);
});

/* ===== Kue & lilin ===== */
const candles = $("candles"), cakeEl = document.querySelector(".cake");
for (let i = 0; i < 3; i++) candles.innerHTML += '<div class="candle"><div class="flame"></div></div>';
let blown = false;
$("blowBtn").addEventListener("click", (e) => {
  blown = !blown;
  cakeEl.classList.toggle("out", blown);
  $("wishMsg").textContent = blown ? CONFIG.wish : "";
  e.target.textContent = blown ? "Nyalakan Lagi 🕯️" : "Tiup Lilin 🌬️";
  if (blown) confetti(120);
});

/* ===== Sparkle & hati kecil saat layar disentuh / diklik ===== */
addEventListener("pointerdown", (e) => {
  if (e.target.closest("button, .lightbox")) return;
  for (let i = 0; i < 4; i++) {
    const el = document.createElement("span");
    el.className = "sparkle";
    el.textContent = ["✦", "♥", "✧"][i % 3];
    el.style.left = e.clientX + (Math.random() * 40 - 20) + "px";
    el.style.top = e.clientY + (Math.random() * 40 - 20) + "px";
    el.style.color = "#e0708f";
    fx.appendChild(el);
    setTimeout(() => el.remove(), 1700);
  }
});

/* ===== Pause musik otomatis saat tab disembunyikan ===== */
document.addEventListener("visibilitychange", () => {
  if (document.hidden && !bgm.paused) { bgm.pause(); setPlaying(false); }
});