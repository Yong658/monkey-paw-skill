// Monkey's Paw stage. The game folder's index.html loads this file; it builds the page,
// then re-reads state.js (next to index.html) every 1.5 s and redraws when the revision goes up.
(function () {
  document.title = "Monkey's Paw";
  document.head.insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=IBM+Plex+Mono:wght@400;600&display=swap">' + "<style>" + `
:root {
  --bg: #120c0a;
  --bg-2: #1c1310;
  --panel: #221815;
  --line: #3a2a23;
  --ink: #efe3d3;
  --muted: #a8968a;
  --fur: #6e4b33;
  --fur-dark: #3b281c;
  --nail: #d9c7a8;
  --ember: #e0893a;
  --blood: #b8352b;
  --paper: #efe0bf;
  --paper-ink: #3a2a1a;
  --serif: "Gowun Batang", "Batang", "Georgia", serif;
  --mono: "IBM Plex Mono", "Consolas", monospace;
}
* { box-sizing: border-box; }
html, body { margin: 0; }
body {
  background: radial-gradient(1200px 600px at 20% -10%, #3a1d14 0%, transparent 60%), var(--bg);
  color: var(--ink);
  font-family: var(--serif);
  line-height: 1.6;
  min-height: 100vh;
}
.wrap { max-width: 980px; margin: 0 auto; padding: 24px 16px 64px; }
header { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.brand { font-size: 22px; font-weight: 700; letter-spacing: .02em; }
.brand small { color: var(--muted); font-weight: 400; font-size: 14px; margin-left: 8px; }
.pill { font-family: var(--mono); font-size: 12px; padding: 4px 10px; border: 1px solid var(--line); border-radius: 999px; color: var(--muted); }
.pill.live::before { content: "● "; color: var(--ember); }
.pill.off::before { content: "● "; color: var(--blood); }

.hero { display: grid; grid-template-columns: 220px 1fr; gap: 28px; align-items: center; margin-top: 28px; }
@media (max-width: 640px) { .hero { grid-template-columns: 1fr; justify-items: center; text-align: center; } }
.paw svg { width: 200px; height: auto; filter: drop-shadow(0 12px 30px rgba(224,137,58,.18)); }
.finger rect { transition: transform .9s cubic-bezier(.6,-0.3,.3,1.4), fill .9s; transform-box: fill-box; transform-origin: 50% 100%; fill: var(--fur); }
.finger .nail { transition: transform .9s cubic-bezier(.6,-0.3,.3,1.4), opacity .6s; transform-box: view-box; fill: var(--nail); }
.finger.curled rect { transform: scaleY(.3); fill: var(--fur-dark); }
.finger.curled .nail { opacity: 0; }
.paw.shake svg { animation: shake .6s; }
@keyframes shake { 20%{transform:rotate(-4deg)} 40%{transform:rotate(3deg)} 60%{transform:rotate(-2deg)} 80%{transform:rotate(1deg)} }

.label { font-family: var(--mono); font-size: 12px; color: var(--muted); letter-spacing: .04em; }
.wish { font-size: clamp(22px, 4vw, 34px); font-weight: 700; margin: 6px 0 12px; word-break: keep-all; }
.wish.empty { color: var(--muted); font-weight: 400; }
.dots { font-size: 22px; letter-spacing: 6px; color: var(--ember); }
.hint { margin-top: 10px; color: var(--muted); font-size: 15px; }
.hint b { color: var(--ink); }

section { margin-top: 36px; }
h2 { font-size: 15px; font-family: var(--mono); color: var(--muted); font-weight: 400; letter-spacing: .04em; border-bottom: 1px solid var(--line); padding-bottom: 8px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 6px 12px; font-size: 15px; }
.chip i { font-style: normal; font-family: var(--mono); color: var(--ember); margin-right: 6px; }
.none { color: var(--muted); font-size: 15px; }

.rounds { display: grid; gap: 16px; }
.round { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 18px 20px; position: relative; }
.round.fresh { animation: rise .7s ease-out; }
@keyframes rise { from { opacity: 0; transform: translateY(14px); } }
.round .no { position: absolute; top: 14px; right: 16px; font-family: var(--mono); font-size: 12px; color: var(--muted); }
.round .ask { color: var(--muted); font-size: 15px; padding-right: 60px; }
.round .ask::before { content: "🙏 "; }
.round .granted { font-size: 18px; margin: 10px 0; }
.round .loop { border-left: 3px solid var(--blood); padding: 4px 0 4px 12px; color: #f0c2b8; font-size: 15px; }
mark { background: rgba(184,53,43,.35); color: #fff; padding: 0 3px; border-radius: 3px; }
.final { margin-top: 10px; color: var(--paper); font-size: 15px; }
.defeat { text-align: center; font-size: 20px; padding: 18px; color: var(--ember); }

.contract { background: var(--paper); color: var(--paper-ink); border-radius: 6px; padding: 32px 28px 28px; position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,.5), inset 0 0 80px rgba(120,80,30,.25); }
.contract.fresh { animation: unroll .9s ease-out; }
@keyframes unroll { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); } }
.contract h3 { margin: 0 0 4px; font-size: 26px; text-align: center; }
.contract .sub { text-align: center; font-size: 13px; opacity: .7; margin-bottom: 20px; }
.contract .row { margin: 14px 0; }
.contract .row b { display: block; font-size: 13px; opacity: .7; }
.contract ol, .contract ul { margin: 4px 0 0; padding-left: 22px; }
.stamp { position: absolute; top: 22px; right: 22px; transform: rotate(-12deg); border: 4px double var(--blood); color: var(--blood);
  padding: 6px 12px; font-weight: 700; font-size: 18px; border-radius: 6px; opacity: .85; background: rgba(239,224,191,.6); }
.contract.fresh .stamp { animation: stamp .5s .9s both cubic-bezier(.2,1.6,.4,1); }
@keyframes stamp { from { transform: rotate(-12deg) scale(2.4); opacity: 0; } }
@media (max-width: 640px) { .stamp { position: static; display: inline-block; margin-bottom: 12px; } }
.note { margin-top: 18px; font-size: 14px; border-top: 1px dashed rgba(58,42,26,.4); padding-top: 12px; }
.actions { display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap; }
button { font-family: var(--serif); font-size: 15px; padding: 8px 16px; border-radius: 8px; border: 1px solid var(--line); background: var(--panel); color: var(--ink); cursor: pointer; }
button:hover { border-color: var(--ember); }
footer { margin-top: 48px; color: var(--muted); font-size: 13px; text-align: center; }
[hidden] { display: none !important; }
` + "</style>");
  document.body.insertAdjacentHTML("afterbegin", `
<div class="wrap">
  <header>
    <div class="brand">🐒 <span data-t="title"></span><small data-t="tag"></small></div>
    <span class="pill" id="status"></span>
  </header>

  <div class="hero">
    <div class="paw" id="paw">
      <svg viewBox="0 0 200 250" aria-hidden="true">
        <g class="finger" data-i="0"><rect x="42" y="30" width="34" height="110" rx="17"/><ellipse class="nail" cx="59" cy="38" rx="9" ry="7"/></g>
        <g class="finger" data-i="1"><rect x="83" y="12" width="34" height="128" rx="17"/><ellipse class="nail" cx="100" cy="20" rx="9" ry="7"/></g>
        <g class="finger" data-i="2"><rect x="124" y="30" width="34" height="110" rx="17"/><ellipse class="nail" cx="141" cy="38" rx="9" ry="7"/></g>
        <path d="M30 130 Q 26 210 70 236 L 130 236 Q 176 210 172 130 Z" fill="#5a3d2a"/>
        <path d="M30 150 Q 4 140 8 112 Q 14 100 26 112 L 40 140 Z" fill="#5a3d2a"/>
        <path d="M60 236 L 140 236 L 136 250 L 64 250 Z" fill="#3b281c"/>
      </svg>
    </div>
    <div>
      <div class="label" data-t="yourWish"></div>
      <div class="wish empty" id="wish"></div>
      <div class="dots" id="dots"></div>
      <div class="hint" id="hint"></div>
    </div>
  </div>

  <section>
    <h2 data-t="conditions"></h2>
    <div class="chips" id="conds"></div>
  </section>

  <section>
    <h2 data-t="rounds"></h2>
    <div class="rounds" id="rounds"></div>
  </section>

  <section id="contractSec" hidden>
    <h2 data-t="contract"></h2>
    <div class="contract" id="contract"></div>
    <div class="actions">
      <button id="copyBtn" data-t="copy"></button>
      <button id="saveBtn" data-t="save"></button>
    </div>
  </section>

  <footer data-t="footer"></footer>
</div>

`);

  var T = {
    ko: {
      title: "원숭이 손", tag: "소원은 이루어진다. 글자 그대로.", yourWish: "당신의 소원",
      noWish: "Claude 채팅에 소원을 말하세요", conditions: "덧붙인 조건", noConds: "아직 없음",
      rounds: "소원 기록", contract: "소원 계약서", copy: "계약서 복사", save: "결과 HTML 저장",
      copied: "복사했습니다", footer: "이 화면은 표시판입니다. 입력은 Claude 채팅에서 합니다.",
      hintPlay: "조건을 덧붙여 <b>Claude 채팅</b>에 다시 빌어라.", hintLast: "마지막 기회. <b>Claude 채팅</b>에 최종 수정을 한 번만.",
      hintWait: "<b>Claude 채팅</b>에 소원을 말하세요.", hintEnd: "게임 끝. 아래 계약서를 확인하세요.",
      live: "실시간", off: "연결 끊김 · 새로고침", ended: "종료", round: "라운드",
      granted: "소원 성취", loophole: "빈틈", final: "최종 수정. 손가락이 남지 않아 계약서로 넘어갑니다.", defeat: "원숭이 손이 떨린다... 그러나 접히지 않는다.",
      cWish: "소원", cConds: "조건", cClosed: "막아낸 빈틈", cOpen: "남은 빈틈", none: "없음", sub: "이 계약서는 이제 요구사항 명세서입니다",
      v: { paw_defeated: "원숭이 손 패배", draw: "무승부", paw_wins: "원숭이 손 승리" }
    },
    en: {
      title: "Monkey's Paw", tag: "Wishes come true. Word for word.", yourWish: "Your wish",
      noWish: "Make a wish in the Claude chat", conditions: "Conditions", noConds: "None yet",
      rounds: "Wish log", contract: "Wish Contract", copy: "Copy contract", save: "Save as HTML",
      copied: "Copied", footer: "This page is a scoreboard. You play in the Claude chat.",
      hintPlay: "Add conditions and wish again in the <b>Claude chat</b>.", hintLast: "Last chance: one final amendment in the <b>Claude chat</b>.",
      hintWait: "Make a wish in the <b>Claude chat</b>.", hintEnd: "Game over. See the contract below.",
      live: "live", off: "disconnected · refresh", ended: "ended", round: "Round",
      granted: "Granted", loophole: "Loophole", final: "Final amendment. No fingers left, on to the contract.", defeat: "The paw trembles... and cannot curl.",
      cWish: "Wish", cConds: "Conditions", cClosed: "Loopholes closed", cOpen: "Still open", none: "none", sub: "This contract is now a requirements spec",
      v: { paw_defeated: "Paw defeated", draw: "Draw", paw_wins: "Paw wins" }
    }
  };
  var lastRev = -1, lastRounds = 0, lastEnded = false, L = T.ko, state = null;
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = String(text);
    return e;
  }
  // 사용자 문자열은 textContent로만 넣는다. 강조할 인용구만 <mark>로 감싼다.
  function withMark(parent, text, quote) {
    text = String(text || "");
    var i = quote ? text.indexOf(quote) : -1;
    if (i < 0) { parent.appendChild(document.createTextNode(text)); return parent; }
    parent.appendChild(document.createTextNode(text.slice(0, i)));
    parent.appendChild(el("mark", null, quote));
    parent.appendChild(document.createTextNode(text.slice(i + quote.length)));
    return parent;
  }
  function labels() {
    document.querySelectorAll("[data-t]").forEach(function (n) { n.textContent = L[n.getAttribute("data-t")]; });
    document.documentElement.lang = L === T.en ? "en" : "ko";
  }

  function render(s) {
    var fresh = s.rounds.length > lastRounds;
    var ended = s.status === "ended";
    L = T[s.lang] || T.ko;
    labels();

    var w = $("wish");
    w.textContent = s.wish || L.noWish;
    w.classList.toggle("empty", !s.wish);

    var curled = Math.min(3, s.curled || 0);
    document.querySelectorAll(".finger").forEach(function (f, i) { f.classList.toggle("curled", i < curled); });
    $("dots").textContent = "●●●".slice(0, 3 - curled) + "○○○".slice(0, curled);
    if (fresh) { var p = $("paw"); p.classList.remove("shake"); void p.offsetWidth; p.classList.add("shake"); }

    $("hint").innerHTML = ended ? L.hintEnd : !s.wish ? L.hintWait : curled >= 3 ? L.hintLast : L.hintPlay;

    var c = $("conds"); c.textContent = "";
    if (!s.conditions || !s.conditions.length) c.appendChild(el("span", "none", L.noConds));
    (s.conditions || []).forEach(function (t, i) {
      var chip = el("span", "chip"); chip.appendChild(el("i", null, i + 1)); chip.appendChild(document.createTextNode(t)); c.appendChild(chip);
    });

    var r = $("rounds"); r.textContent = "";
    s.rounds.slice().reverse().forEach(function (rd, idx) {
      var n = s.rounds.length - idx;
      var card = el("div", "round" + (fresh && idx === 0 ? " fresh" : ""));
      card.appendChild(el("span", "no", L.round + " " + n));
      card.appendChild(el("div", "ask", rd.input));
      if (rd.defeat) { card.appendChild(el("div", "defeat", "🐒 " + L.defeat)); r.appendChild(card); return; }
      if (!rd.granted) { card.appendChild(el("div", "final", "📜 " + L.final)); r.appendChild(card); return; }
      var g = el("div", "granted"); g.appendChild(el("b", null, L.granted + " · ")); withMark(g, rd.granted, ""); card.appendChild(g);
      var lp = el("div", "loop"); lp.appendChild(el("b", null, L.loophole + " · ")); withMark(lp, rd.loophole, rd.quote); card.appendChild(lp);
      r.appendChild(card);
    });

    var sec = $("contractSec");
    sec.hidden = !s.contract;
    if (s.contract) {
      var k = s.contract, box = $("contract");
      box.textContent = "";
      box.className = "contract" + (ended && !lastEnded ? " fresh" : "");
      box.appendChild(el("div", "stamp", L.v[k.verdict] || k.verdict));
      box.appendChild(el("h3", null, "📜 " + L.contract));
      box.appendChild(el("div", "sub", L.sub));
      function row(title, items, ordered) {
        var d = el("div", "row"); d.appendChild(el("b", null, title));
        if (typeof items === "string") { d.appendChild(el("div", null, items)); }
        else if (!items || !items.length) { d.appendChild(el("div", null, L.none)); }
        else { var list = el(ordered ? "ol" : "ul"); items.forEach(function (t) { list.appendChild(el("li", null, t)); }); d.appendChild(list); }
        box.appendChild(d);
      }
      row(L.cWish, k.wish);
      row(L.cConds, k.conditions, true);
      row(L.cClosed, k.closed);
      row(L.cOpen, k.open);
      if (k.note) box.appendChild(el("div", "note", k.note));
    }

    var st = $("status");
    st.className = "pill" + (ended ? "" : " live");
    st.textContent = ended ? L.ended : L.live;
    lastRounds = s.rounds.length; lastEnded = ended;
  }

  function contractText() {
    var k = state && state.contract; if (!k) return "";
    var out = ["📜 " + L.contract, "", L.cWish + ": " + k.wish, "", L.cConds + ":"];
    (k.conditions || []).forEach(function (t, i) { out.push((i + 1) + ". " + t); });
    out.push("", L.cClosed + ": " + ((k.closed || []).join(", ") || L.none));
    out.push(L.cOpen + ": " + ((k.open || []).join(", ") || L.none));
    out.push("", (L.v[k.verdict] || k.verdict) + " · " + $("dots").textContent);
    return out.join("\n");
  }
  $("copyBtn").onclick = function () {
    var b = this, txt = contractText();
    var done = function () { var o = L.copy; b.textContent = L.copied; setTimeout(function () { b.textContent = o; }, 1500); };
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function () { prompt("", txt); });
    else prompt("", txt);
  };
  // 지금 화면을 스크립트 없는 HTML 파일 하나로 저장한다.
  $("saveBtn").onclick = function () {
    var doc = document.documentElement.cloneNode(true);
    doc.querySelectorAll("script, .actions, #status").forEach(function (n) { n.remove(); });
    doc.querySelectorAll(".fresh").forEach(function (n) { n.classList.remove("fresh"); });
    var blob = new Blob(["<!doctype html>\n" + doc.outerHTML], { type: "text/html" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "monkey-paw-contract.html";
    a.click();
  };

  // state.js를 주기적으로 다시 읽는다. 한 번에 한 요청만, 새 revision일 때만 다시 그린다.
  function poll() {
    var s = document.createElement("script");
    s.src = "state.js?r=" + Date.now();
    s.onload = function () {
      s.remove();
      var ns = window.PAW_STATE;
      if (ns && Array.isArray(ns.rounds) && ns.revision > lastRev) {
        lastRev = ns.revision; state = ns;
        try { render(ns); } catch (e) { console.error(e); }
      }
      if (state && state.status !== "ended") $("status").className = "pill live";
      setTimeout(poll, 1500);
    };
    s.onerror = function () {
      s.remove();
      var st = $("status"); st.className = "pill off"; st.textContent = L.off;
      setTimeout(poll, 3000);
    };
    document.head.appendChild(s);
  }
  labels();
  $("wish").textContent = L.noWish;
  $("hint").innerHTML = L.hintWait;
  $("conds").appendChild(el("span", "none", L.noConds));
  poll();
})();
