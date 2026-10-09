document.addEventListener("DOMContentLoaded", () => {
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
const nav = $("#navbar"), bar = $("#progress");
const onScroll = () => {
nav.classList.toggle("scrolled", window.scrollY > 24);
const h = document.documentElement.scrollHeight - innerHeight;
bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
};
addEventListener("scroll", onScroll, { passive: true }); onScroll();
const btn = $("#menuBtn"), links = $("#navLinks");
btn.addEventListener("click", () => {
const open = links.classList.toggle("open");
btn.setAttribute("aria-expanded", open);
});
$$("a", links).forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
const io = new IntersectionObserver(es => {
es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
$$(".rev").forEach(el => io.observe(el));
const cio = new IntersectionObserver(es => {
es.forEach(e => {
if (!e.isIntersecting) return; cio.unobserve(e.target);
const el = e.target, end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0);
const t0 = performance.now(), dur = 1600;
const tick = t => {
const p = Math.min((t - t0) / dur, 1), ease = 1 - Math.pow(1 - p, 3);
el.textContent = (end * ease).toFixed(dec);
if (p < 1) requestAnimationFrame(tick);
};
requestAnimationFrame(tick);
});
}, { threshold: 0.5 });
$$("[data-count]").forEach(el => cio.observe(el));
$$(".tg button").forEach(b => b.addEventListener("click", () => {
$$(".tg button").forEach(x => { x.classList.remove("on"); x.setAttribute("aria-selected", "false"); });
b.classList.add("on"); b.setAttribute("aria-selected", "true");
const yearly = b.dataset.per === "yr";
$$(".price .amt").forEach(a => { a.textContent = yearly ? a.dataset.y : a.dataset.m; });
}));
$$(".qa").forEach(qa => {
$(".qa__q", qa).addEventListener("click", () => {
const was = qa.classList.contains("open");
$$(".qa").forEach(x => x.classList.remove("open"));
if (!was) qa.classList.add("open");
});
});
$$(".card").forEach(c => c.addEventListener("pointermove", e => {
const r = c.getBoundingClientRect();
c.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
}));
const toast = $("#toast");
$$("[data-plan]").forEach(a => a.addEventListener("click", e => {
e.preventDefault();
toast.textContent = "Welcome to Vertex " + a.dataset.plan + " - trial started!";
toast.classList.add("show");
clearTimeout(toast._t); toast._t = setTimeout(() => toast.classList.remove("show"), 2600);
}));
});
