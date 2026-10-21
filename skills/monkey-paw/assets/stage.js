// Monkey's Paw stage. The game folder's index.html loads this file; it builds the page,
// then re-reads state.js (next to index.html) every 1.5 s and redraws when the revision goes up.
(function () {
  document.title = "Monkey's Paw";
  document.head.insertAdjacentHTML("beforeend",
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Song+Myung&family=IBM+Plex+Sans+KR:wght@400;600&display=swap">' +
    "<style>" + `
:root {
  --baize: #1f3a30;
  --baize-deep: #152a22;
  --brass: #b8955a;
  --bone: #e8dfca;
  --manila: #d9c79a;
  --oxblood: #7d1f24;
  --ink: #2a221a;
  --fur: #5e4631;
  --fur-light: #7a5d42;
  --claw: #d6c8a6;
  --display: "Song Myung", "Batang", serif;
  --body: "IBM Plex Sans KR", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif;
}
* { box-sizing: border-box; }
html, body { margin: 0; }
body {
  background-color: var(--baize);
  background-image: radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.06), transparent 60%),
    radial-gradient(ellipse at 50% 120%, rgba(0,0,0,.45), transparent 60%);
  color: var(--bone);
  font-family: var(--body);
  font-size: 16px;
  line-height: 1.7;
  min-height: 100vh;
}
.wrap { max-width: 920px; margin: 0 auto; padding: 28px 16px 72px; }
header { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.brand { font-family: var(--display); font-size: 26px; color: var(--brass); }
.status { font-size: 13px; color: rgba(232,223,202,.65); }
.status.off { color: #f0a8a0; }

.cabinet { display: grid; grid-template-columns: minmax(220px, 300px) 1fr; gap: 8px 36px; align-items: start; margin-top: 20px; }
@media (max-width: 680px) { .cabinet { grid-template-columns: 1fr; } }
.paw { position: relative; }
.paw svg { width: 100%; max-width: 300px; display: block; margin: 0 auto; overflow: visible; }
.seg { transition: transform 1.1s cubic-bezier(.5,-0.4,.3,1.3); transform-box: view-box; }
.paw.still .seg { transition: none; }
.paw.twitch svg { animation: twitch .7s; }
@keyframes twitch { 25% { transform: rotate(-3deg); } 55% { transform: rotate(2deg); } 80% { transform: rotate(-1deg); } }

.tag { position: relative; background: var(--manila); color: var(--ink); padding: 26px 26px 22px 34px; margin-top: 34px;
  clip-path: polygon(18px 0, 100% 0, 100% 100%, 18px 100%, 0 50%); box-shadow: 0 10px 24px rgba(0,0,0,.35); }
.tag::before { content: ""; position: absolute; left: 12px; top: 50%; width: 10px; height: 10px; margin-top: -5px; border-radius: 50%;
  background: var(--baize); box-shadow: inset 0 0 0 2px var(--brass); }
.tag .wish { font-family: var(--display); font-size: clamp(24px, 3.6vw, 34px); line-height: 1.35; margin: 0; word-break: keep-all; }
.tag .wish.empty { color: rgba(42,34,26,.55); }
.tag .left { margin-top: 14px; font-size: 15px; }
.tag .left b { font-weight: 600; }
.next { margin-top: 16px; font-size: 15px; color: rgba(232,223,202,.8); }
.next b { color: var(--bone); font-weight: 600; }
.conds { margin: 18px 0 0; padding: 0; list-style: none; }
.conds li { position: relative; padding-left: 20px; margin: 4px 0; }
.conds li::before { content: ""; position: absolute; left: 2px; top: .7em; width: 8px; height: 8px; border-radius: 50%; background: var(--brass); }

h2 { font-family: var(--display); font-weight: 400; font-size: 24px; color: var(--brass); margin: 56px 0 8px; }
.ledger { list-style: none; margin: 0; padding: 0; }
.entry { display: grid; grid-template-columns: 112px 1fr; gap: 20px; padding: 22px 0; border-top: 1px solid rgba(184,149,90,.35); }
@media (max-width: 560px) { .entry { grid-template-columns: 1fr; gap: 6px; } }
.entry .ord { font-family: var(--display); font-size: 19px; color: var(--brass); line-height: 1.4; }
.entry .said { font-family: var(--display); font-size: 21px; line-height: 1.5; margin: 0 0 10px; max-width: 34em; }
.entry .said::before { content: "\\201C"; } .entry .said::after { content: "\\201D"; }
.entry .granted { margin: 0; max-width: 40em; }
.entry .gap { margin: 10px 0 0; max-width: 40em; color: rgba(232,223,202,.8); font-size: 15px; }
.entry .gap span { color: #e9a39b; font-weight: 600; margin-right: 6px; }
.entry .gap em { font-style: normal; color: var(--bone); text-decoration: underline wavy #d0453c; text-decoration-thickness: 1.5px; text-underline-offset: 5px; }
.entry .quiet { margin: 0; color: rgba(232,223,202,.75); }
.entry.new { animation: ink 1.2s .6s both; }
@keyframes ink { from { opacity: 0; } }

.deed { position: relative; background: var(--bone); color: var(--ink); padding: 40px 36px 32px; margin-top: 12px;
  background-image: linear-gradient(rgba(125,31,36,.05) 1px, transparent 1px); background-size: 100% 2.2em;
  box-shadow: 0 18px 40px rgba(0,0,0,.4); border-left: 6px double rgba(125,31,36,.35); }
@media (max-width: 560px) { .deed { padding: 28px 20px; } }
.deed h3 { font-family: var(--display); font-weight: 400; font-size: 32px; margin: 0 0 4px; }
.deed .sub { font-size: 14px; color: rgba(42,34,26,.7); margin: 0 0 22px; max-width: 26em; }
.deed .wish { font-family: var(--display); font-size: 22px; line-height: 1.5; margin: 0 0 20px; max-width: 30em; }
.deed h4 { font-size: 14px; font-weight: 600; margin: 20px 0 4px; color: var(--oxblood); }
.deed ol, .deed ul { margin: 0; padding-left: 22px; max-width: 40em; }
.deed .none { margin: 0; color: rgba(42,34,26,.6); }
.deed .note { margin: 26px 0 0; padding-top: 14px; border-top: 1px solid rgba(42,34,26,.25); font-size: 15px; max-width: 40em; }
.seal { position: absolute; top: 26px; right: 28px; width: 112px; height: 112px; border-radius: 50%;
  background: radial-gradient(circle at 38% 34%, #a7383c, var(--oxblood) 55%, #571317);
  box-shadow: 0 4px 10px rgba(0,0,0,.35), inset 0 0 0 7px rgba(0,0,0,.12), inset 0 0 0 9px rgba(255,255,255,.08);
  display: grid; place-items: center; text-align: center; color: #f3d9cf; font-family: var(--display); font-size: 17px; line-height: 1.2; padding: 14px;
  transform: rotate(-9deg); }
.deed.new .seal { animation: press .55s 1s both cubic-bezier(.2,1.5,.4,1); }
@keyframes press { from { transform: rotate(-9deg) scale(1.9); opacity: 0; } }
@media (max-width: 560px) { .seal { position: static; margin: 0 0 18px auto; width: 92px; height: 92px; font-size: 15px; } }
.deed.has-seal h3, .deed.has-seal .sub { padding-right: 130px; }
@media (max-width: 560px) { .deed.has-seal h3, .deed.has-seal .sub { padding-right: 0; } }

.actions { display: flex; gap: 12px; margin-top: 18px; flex-wrap: wrap; }
button { font-family: var(--body); font-size: 15px; padding: 9px 18px; border: 1px solid var(--brass); background: transparent; color: var(--bone); cursor: pointer; border-radius: 2px; }
button:hover { background: rgba(184,149,90,.15); }
button:focus-visible { outline: 2px solid var(--bone); outline-offset: 3px; }
footer { margin-top: 56px; font-size: 13px; color: rgba(232,223,202,.55); }
[hidden] { display: none !important; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }
` + "</style>");

  // 손가락은 마디 두 개로 그린다. 접히면 첫 마디가 짧아지고 끝 마디가 아래로 뒤집혀 손바닥 쪽으로 접힌다.
  function finger(i, x, base, l1, l2) {
    var j = base - l1, tip = j - l2;
    return '<g class="finger" data-i="' + i + '">' +
      '<g class="seg p" style="transform-origin:' + x + 'px ' + base + 'px">' +
        '<line x1="' + x + '" y1="' + base + '" x2="' + x + '" y2="' + j + '" stroke="var(--fur)" stroke-width="25" stroke-linecap="round"/>' +
        '<line x1="' + (x - 4) + '" y1="' + (base - 6) + '" x2="' + (x - 4) + '" y2="' + (j + 4) + '" stroke="var(--fur-light)" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="M' + (x - 9) + ' ' + (j + 2) + ' q9 -5 18 0" stroke="#45331f" stroke-width="2" fill="none"/>' +
        '<g class="seg d" style="transform-origin:' + x + 'px ' + j + 'px">' +
          '<line x1="' + x + '" y1="' + j + '" x2="' + x + '" y2="' + tip + '" stroke="var(--fur)" stroke-width="21" stroke-linecap="round"/>' +
          '<line x1="' + (x - 3) + '" y1="' + (j - 4) + '" x2="' + (x - 3) + '" y2="' + (tip + 4) + '" stroke="var(--fur-light)" stroke-width="6" stroke-linecap="round"/>' +
          '<path d="M' + (x - 7) + ' ' + (tip - 2) + ' Q' + x + ' ' + (tip - 20) + ' ' + (x + 7) + ' ' + (tip - 2) + ' Z" fill="var(--claw)"/>' +
        '</g>' +
      '</g></g>';
  }
  var pawSvg = '<svg viewBox="0 0 240 320" aria-hidden="true">' +
    '<path d="M70 300 L170 300 L176 320 L64 320 Z" fill="#3b2a1b"/>' +
    '<path d="M52 176 Q40 128 70 118 L172 118 Q200 128 190 180 Q186 250 162 300 L78 300 Q56 250 52 176 Z" fill="var(--fur)"/>' +
    '<path d="M78 150 Q110 170 160 150 M84 214 Q120 232 158 210 M96 262 Q120 272 146 260" stroke="#45331f" stroke-width="2.2" fill="none" opacity=".7"/>' +
    '<g transform="rotate(-38 58 186)"><line x1="58" y1="186" x2="58" y2="128" stroke="var(--fur)" stroke-width="24" stroke-linecap="round"/>' +
      '<path d="M51 124 Q58 106 65 124 Z" fill="var(--claw)"/></g>' +
    finger(0, 88, 128, 50, 40) + finger(1, 122, 122, 56, 44) + finger(2, 156, 128, 50, 40) +
    '</svg>';

  document.body.insertAdjacentHTML("afterbegin", `
<div class="wrap">
  <header>
    <div class="brand" data-t="title"></div>
    <div class="status" id="status" role="status"></div>
  </header>
  <div class="cabinet">
    <div class="paw still" id="paw">` + pawSvg + `</div>
    <div>
      <div class="tag">
        <p class="wish empty" id="wish"></p>
        <div class="left" id="left"></div>
      </div>
      <p class="next" id="next"></p>
      <ul class="conds" id="conds"></ul>
    </div>
  </div>
  <section id="ledgerSec" hidden>
    <h2 data-t="ledger"></h2>
    <ol class="ledger" id="ledger"></ol>
  </section>
  <section id="deedSec" hidden>
    <h2 data-t="contract"></h2>
    <div class="deed" id="deed"></div>
    <div class="actions">
      <button id="copyBtn" data-t="copy"></button>
      <button id="saveBtn" data-t="save"></button>
    </div>
  </section>
  <footer data-t="footer"></footer>
</div>`);

  var T = {
    ko: {
      title: "원숭이 손", ledger: "소원 기록", contract: "소원 계약서", copy: "계약서 복사", save: "HTML로 저장",
      copied: "복사했습니다", footer: "이 화면은 게임 진행을 보여 줍니다. 소원과 조건은 Claude 채팅에 입력하세요.",
      noWish: "아직 소원이 없습니다", left: function (n) { return "남은 소원 <b>" + n + "번</b>"; },
      nextWait: "<b>Claude 채팅</b>에 소원을 말하세요.", nextPlay: "조건을 덧붙여 <b>Claude 채팅</b>에 다시 빌어 보세요.",
      nextLast: "손가락이 다 접혔습니다. <b>Claude 채팅</b>에 마지막 수정을 한 번 할 수 있습니다.", nextEnd: "게임이 끝났습니다. 아래 계약서를 확인하세요.",
      live: "Claude 채팅과 연결됨", off: "연결이 끊겼습니다. 페이지를 새로고침하세요.", ended: "게임 끝",
      ord: function (n) { return ["첫 번째 소원", "두 번째 소원", "세 번째 소원"][n] || (n + 1) + "번째 소원"; },
      final: "마지막 수정", gap: "빈틈", finalNote: "남은 손가락이 없어 이 수정으로 계약서를 썼습니다.",
      defeat: "손이 떨리기만 하고 손가락이 접히지 않았습니다. 빈틈이 없는 소원입니다.",
      sub: "이번 게임에서 찾은 빈틈을 반영한 요구사항입니다.", cConds: "조건", cClosed: "막아낸 빈틈", cOpen: "남은 빈틈", none: "없음",
      v: { paw_defeated: "원숭이 손 패배", draw: "무승부", paw_wins: "원숭이 손 승리" }
    },
    en: {
      title: "Monkey's Paw", ledger: "Wish log", contract: "Wish contract", copy: "Copy contract", save: "Save as HTML",
      copied: "Copied", footer: "This page shows the game. Type wishes and conditions in the Claude chat.",
      noWish: "No wish yet", left: function (n) { return "Wishes left: <b>" + n + "</b>"; },
      nextWait: "Make a wish in the <b>Claude chat</b>.", nextPlay: "Add conditions and wish again in the <b>Claude chat</b>.",
      nextLast: "All fingers are curled. You get one final amendment in the <b>Claude chat</b>.", nextEnd: "Game over. Read the contract below.",
      live: "Connected to the Claude chat", off: "Connection lost. Refresh the page.", ended: "Game over",
      ord: function (n) { return ["First wish", "Second wish", "Third wish"][n] || "Wish " + (n + 1); },
      final: "Final amendment", gap: "Loophole", finalNote: "No fingers left, so this amendment went into the contract.",
      defeat: "The paw trembled, but no finger curled. This wish has no loophole.",
      sub: "Requirements, with the loopholes found in this game patched.", cConds: "Conditions", cClosed: "Loopholes closed", cOpen: "Still open", none: "None",
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
  // 사용자 문자열은 textContent로만 넣는다. 빈틈 단어만 <em>으로 감싸 밑줄을 긋는다.
  function withMark(parent, text, quote) {
    text = String(text || "");
    var i = quote ? text.indexOf(quote) : -1;
    if (i < 0) { parent.appendChild(document.createTextNode(text)); return parent; }
    parent.appendChild(document.createTextNode(text.slice(0, i)));
    parent.appendChild(el("em", null, quote));
    parent.appendChild(document.createTextNode(text.slice(i + quote.length)));
    return parent;
  }
  function labels() {
    document.querySelectorAll("[data-t]").forEach(function (n) { n.textContent = L[n.getAttribute("data-t")]; });
    document.documentElement.lang = L === T.en ? "en" : "ko";
  }
  function setFingers(curled) {
    document.querySelectorAll(".finger").forEach(function (f, i) {
      var c = i < curled;
      f.querySelector(".p").style.transform = c ? "scaleY(.5)" : "";
      f.querySelector(".d").style.transform = c ? "rotate(" + (i === 0 ? -180 : 180) + "deg)" : "";
    });
  }

  function render(s) {
    var fresh = s.rounds.length > lastRounds;
    var ended = s.status === "ended";
    var curled = Math.min(3, s.curled || 0);
    L = T[s.lang] || T.ko;
    labels();

    var w = $("wish");
    w.textContent = s.wish || L.noWish;
    w.classList.toggle("empty", !s.wish);
    $("left").innerHTML = L.left(3 - curled);
    setFingers(curled);
    if (fresh && lastRev > 0) { var p = $("paw"); p.classList.remove("twitch"); void p.offsetWidth; p.classList.add("twitch"); }
    $("next").innerHTML = ended ? L.nextEnd : !s.wish ? L.nextWait : curled >= 3 ? L.nextLast : L.nextPlay;

    var c = $("conds"); c.textContent = "";
    (s.conditions || []).forEach(function (t) { c.appendChild(el("li", null, t)); });

    var lg = $("ledger"); lg.textContent = "";
    $("ledgerSec").hidden = !s.rounds.length;
    var newest = null;
    s.rounds.forEach(function (rd, n) {
      var li = el("li", "entry" + (fresh && n === s.rounds.length - 1 && lastRev > 0 ? " new" : ""));
      var isFinal = !rd.defeat && !rd.granted;
      li.appendChild(el("div", "ord", isFinal ? L.final : L.ord(n)));
      var body = el("div");
      body.appendChild(el("p", "said", rd.input));
      if (rd.defeat) body.appendChild(el("p", "quiet", L.defeat));
      else if (isFinal) body.appendChild(el("p", "quiet", L.finalNote));
      else {
        body.appendChild(el("p", "granted", rd.granted));
        var g = el("p", "gap"); g.appendChild(el("span", null, L.gap)); withMark(g, rd.loophole, rd.quote); body.appendChild(g);
      }
      li.appendChild(body);
      lg.appendChild(li);
      newest = li;
    });

    $("deedSec").hidden = !s.contract;
    if (s.contract) {
      var k = s.contract, d = $("deed");
      d.textContent = "";
      d.className = "deed has-seal" + (ended && !lastEnded && lastRev > 0 ? " new" : "");
      d.appendChild(el("div", "seal", L.v[k.verdict] || k.verdict));
      d.appendChild(el("h3", null, L.contract));
      d.appendChild(el("p", "sub", L.sub));
      d.appendChild(el("p", "wish", k.wish));
      function block(title, items, ordered) {
        d.appendChild(el("h4", null, title));
        if (!items || !items.length) { d.appendChild(el("p", "none", L.none)); return; }
        var list = el(ordered ? "ol" : "ul"); items.forEach(function (t) { list.appendChild(el("li", null, t)); }); d.appendChild(list);
      }
      block(L.cConds, k.conditions, true);
      block(L.cClosed, k.closed);
      block(L.cOpen, k.open);
      if (k.note) d.appendChild(el("p", "note", k.note));
    }

    var st = $("status"); st.className = "status"; st.textContent = ended ? L.ended : L.live;
    if (lastRev > 0 && fresh) {
      var target = ended && !lastEnded ? $("deedSec") : newest;
      if (target) setTimeout(function () { target.scrollIntoView({ behavior: "smooth", block: "start" }); }, 900);
    }
    lastRounds = s.rounds.length; lastEnded = ended;
  }

  function contractText() {
    var k = state && state.contract; if (!k) return "";
    var out = [L.contract, "", k.wish, "", L.cConds + ":"];
    (k.conditions || []).forEach(function (t, i) { out.push((i + 1) + ". " + t); });
    out.push("", L.cClosed + ": " + ((k.closed || []).join(", ") || L.none));
    out.push(L.cOpen + ": " + ((k.open || []).join(", ") || L.none));
    out.push("", L.v[k.verdict] || k.verdict);
    return out.join("\n");
  }
  $("copyBtn").onclick = function () {
    var b = this, txt = contractText();
    var done = function () { b.textContent = L.copied; setTimeout(function () { b.textContent = L.copy; }, 1500); };
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function () { prompt("", txt); });
    else prompt("", txt);
  };
  // 지금 화면을 스크립트 없는 HTML 파일 하나로 저장한다.
  $("saveBtn").onclick = function () {
    var doc = document.documentElement.cloneNode(true);
    doc.querySelectorAll("script, .actions, #status").forEach(function (n) { n.remove(); });
    doc.querySelectorAll(".new").forEach(function (n) { n.classList.remove("new"); });
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
        try { render(ns); } catch (e) { console.error(e); }
        // 처음 그릴 때는 손가락을 애니메이션 없이 현재 상태로 둔다.
        if (lastRev < 0) setTimeout(function () { $("paw").classList.remove("still"); }, 50);
        lastRev = ns.revision; state = ns;
      }
      if (state && state.status !== "ended") { var st = $("status"); st.className = "status"; st.textContent = L.live; }
      setTimeout(poll, 1500);
    };
    s.onerror = function () {
      s.remove();
      var st = $("status"); st.className = "status off"; st.textContent = L.off;
      setTimeout(poll, 3000);
    };
    document.head.appendChild(s);
  }
  labels();
  $("wish").textContent = L.noWish;
  $("left").innerHTML = L.left(3);
  $("next").innerHTML = L.nextWait;
  poll();
})();
