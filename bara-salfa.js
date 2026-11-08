/* لعبة برا السالفة - تعتمد على app.js (S, beep, vib, toast, modal, ic, esc, addPoints) */
(() => {
P.phone = '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>';
const WORDS = {
 'أماكن':[['مطار',['محطة قطار','ميناء','فندق']],['مستشفى',['صيدلية','عيادة','مدرسة']],['مدرسة',['جامعة','روضة','مكتبة']],['شاطئ',['مسبح','جزيرة','منتجع']],['سوق',['مول','متجر','بقالة']],['ملعب',['صالة رياضية','مضمار','حديقة']]],
 'مهن':[['طبيب',['ممرض','صيدلي','جراح']],['معلم',['مدرب','أستاذ','مربية']],['طيار',['مضيف','قبطان','سائق']],['طباخ',['خباز','نادل','جزار']],['شرطي',['حارس','قاضٍ','محقق']],['مهندس',['مقاول','فني','نجار']]],
 'أكل':[['بيتزا',['برغر','فطيرة','معكرونة']],['كسكسي',['أرز','برغل','شوربة']],['شاي',['قهوة','عصير','حليب']],['تمر',['زبيب','تين','عسل']],['آيس كريم',['حلوى','كيك','شوكولاتة']],['سمك',['دجاج','لحم','جمبري']]],
 'حيوانات':[['أسد',['نمر','فهد','ذئب']],['حصان',['حمار','جمل','بقرة']],['نسر',['صقر','حمامة','بومة']],['دلفين',['حوت','قرش','سلحفاة']],['قطة',['أرنب','كلب','هامستر']],['ثعبان',['سحلية','تمساح','ضفدع']]],
 'أشياء':[['مفتاح',['قفل','باب','سلسلة']],['ساعة',['منبه','هاتف','سوار']],['نظارة',['عدسة','قبعة','قلم']],['مظلة',['معطف','حذاء','قبعة']],['سرير',['وسادة','أريكة','بطانية']],['مرآة',['نافذة','صورة','لوحة']]],
 'عام':[['رمضان',['عيد','حج','مسجد']],['زواج',['خطوبة','عرس','حفلة']],['سفر',['رحلة','إجازة','سياحة']],['مطر',['ثلج','غيم','رعد']],['كرة القدم',['كرة السلة','تنس','سباحة']],['امتحان',['واجب','اختبار','مدرسة']]]
};
const CATS = Object.keys(WORDS), cfg = {cat:'أماكن', out:1, timer:0, prob:0};
let R, bs, tm, gcb, gch, tp = 0, tt;
const sh = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const rnd = a => a[Math.random() * a.length | 0];
const st = document.createElement('style');
st.textContent = `#bs{position:fixed;inset:0;z-index:15;background:var(--bg);overflow:auto;padding:calc(env(safe-area-inset-top,0px) + 14px) 16px 40px;display:none}
#bs .w{max-width:560px;margin:auto;animation:up .35s both}
.bt{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;font-size:1.3rem}
.xb{background:var(--card);border:2px solid var(--bd);color:var(--t);width:40px;height:40px;border-radius:14px;display:grid;place-items:center;cursor:pointer}
.sec{background:var(--card);border:2px solid var(--bd);border-radius:24px;padding:16px;margin-bottom:14px}.sec h4{margin:0 0 10px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{border:2px solid var(--bd);background:var(--card);color:var(--t);border-radius:30px;padding:8px 16px;font:700 .95rem Cairo,sans-serif;cursor:pointer}
.chip.on{background:var(--pbg);color:var(--on);border-color:transparent}
.big{text-align:center;background:var(--card);border:3px solid var(--ic);border-radius:26px;padding:26px 16px;margin:16px 0;font-size:2.3rem;font-weight:900}
.big .ic{width:56px;height:56px;color:var(--ic)}.big small{display:block;font-size:.95rem;font-weight:600;color:var(--mut)}
.dots{display:flex;justify-content:center;gap:8px;margin:6px 0}.dots i{width:10px;height:10px;border-radius:50%;background:var(--bd);transition:.3s}.dots .on{background:var(--ic);transform:scale(1.5)}
.mid{text-align:center;margin:30px 0}.mid .gi{margin:0 auto 14px;width:84px;height:84px}.mid .gi .ic{width:44px;height:44px}
.nm{font-size:2.6rem;font-weight:900;color:var(--ic)}
.opt{display:flex;justify-content:space-between;width:100%;border:2px solid var(--bd);background:var(--card);color:var(--t);border-radius:18px;padding:14px 16px;margin-bottom:10px;font:700 1.05rem Cairo,sans-serif;cursor:pointer;transition:.15s}
.opt.on{background:var(--pbg);color:var(--on);transform:scale(1.02)}
.tm{font-size:2.4rem;font-weight:900;text-align:center;margin:6px 0;font-variant-numeric:tabular-nums}
.ord{display:flex;align-items:center;gap:10px;padding:7px 0;font-weight:700}.ord span{width:30px;height:30px;border-radius:50%;background:var(--bd);display:grid;place-items:center}.ord em{margin-inline-start:auto;font-style:normal;color:var(--ic)}
#bs .btn{margin-top:10px}.btn:disabled{opacity:.5}
#bs input[type=range]{padding:0;border:0;width:100%;accent-color:var(--ic)}`;
document.head.appendChild(st);
const B = {};
const put = (t, b) => { clearInterval(tm); bs.innerHTML = `<div class="w"><div class="bt"><b>${t}</b><button class="xb" data-b="x" aria-label="خروج">${ic('x')}</button></div>${b}</div>`; bs.scrollTop = 0; };

// 1) إعداد الجولة
function setup() {
  const ch = (v, k, l) => `<button class="chip ${cfg[k] === v ? 'on' : ''}" data-b="cfg" data-v="${k}|${v}">${l}</button>`;
  put('برا السالفة', `<div class="sec"><h4>فئة الكلمات</h4><div class="chips">${CATS.map(c => ch(c, 'cat', c)).join('')}</div></div>
  <div class="sec"><h4>عدد من هم برا السالفة</h4><div class="chips">${ch(1, 'out', '1')}${ch(2, 'out', '2')}</div></div>
  <div class="sec"><h4>مؤقت الأسئلة</h4><div class="chips">${[[0,'بدون'],[2,'2 د'],[3,'3 د'],[5,'5 د'],[7,'7 د']].map(([v, l]) => ch(v, 'timer', l)).join('')}</div></div>
  <div class="sec"><h4>احتمال جولة بدون برا السالفة: <span id="pv">${cfg.prob}</span>%</h4><input type="range" min="0" max="50" step="5" value="${cfg.prob}" data-b="prob"></div>
  <button class="btn" data-b="go">ابدأ اللعبة</button>`);
}
B.cfg = (val, el) => { const [k, v] = val.split('|'); cfg[k] = k === 'cat' ? v : +v; el.parentNode.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c === el)); };
B.go = () => {
  const pl = [...S.names]; if (pl.length < 3) return toast('تحتاج 3 لاعبين على الأقل');
  const [word, close] = rnd(WORDS[cfg.cat]), vk = Math.min(cfg.out, pl.length - 2), none = Math.random() * 100 < cfg.prob;
  R = {pl, word, close, cat: cfg.cat, vk, none, outs: none ? [] : sh(pl).slice(0, vk), order: sh(pl), i: 0, votes: {}, vi: 0};
  deal();
};

// بوابة تمرير الجهاز (وفيها نافذة الغش للاعب "نضال" فقط: 3 ضغطات متتالية)
function gate(t, name, label, cb, cheatOn, d) {
  gcb = cb; gch = cheatOn && name === 'نضال'; tp = 0; clearTimeout(tt);
  put(t, `${d || ''}<div class="mid"><div class="gi">${ic('phone')}</div><p class="hint">مرّر الجهاز إلى</p><div class="nm">${esc(name)}</div></div><button class="btn" data-b="gate">${label}</button>`);
}
B.gate = () => {
  if (!gch) return gcb();
  tp++; clearTimeout(tt);
  if (tp >= 3) { tp = 0; return cheat(); }
  tt = setTimeout(() => { tp = 0; gcb(); }, 700);
};
function cheat() {
  modal(`<h3>غش</h3><p>${R.outs.includes('نضال') ? 'الكلمة السرية: <b>' + esc(R.word) + '</b>' : 'برا السالفة: <b>' + (R.outs.map(esc).join('، ') || 'لا أحد') + '</b>'}</p><button class="btn" data-a="close">إغلاق</button>`);
}

// 2) توزيع الأدوار
const dots = () => `<div class="dots">${R.pl.map((_, k) => `<i class="${k === R.i ? 'on' : ''}"></i>`).join('')}</div><p class="hint">اللاعب ${R.i + 1} من ${R.pl.length}</p>`;
function deal() { const p = R.pl[R.i]; gate('توزيع الأدوار', p, `أنا ${esc(p)} – اعرض الكلمة`, () => reveal(p), 1, dots()); }
function reveal(p) {
  const out = R.outs.includes(p), last = R.i === R.pl.length - 1;
  put('دورك', `${dots()}${out
    ? `<div class="big shake">${ic('eye')}<div>أنت برا السالفة!</div><small>حاول تكشف الموضوع من كلام الباقين</small></div>`
    : `<p class="hint">الكلمة السرية (لا تخلي أحد يشوف)</p><div class="big">${esc(R.word)}</div>`}
  <button class="btn" data-b="next">${last ? 'فهمت – ابدأ الأسئلة' : 'فهمت – مرّر للاعب التالي'}</button>`);
  if (out) vib([80, 60, 80]);
}
B.next = () => { if (R.i < R.pl.length - 1) { R.i++; deal(); } else questions(); };

// 3) الأسئلة
function questions() {
  put('الأسئلة', `${cfg.timer ? '<div class="tm" id="tm"></div>' : ''}
  <div class="sec"><h4>ترتيب الأسئلة</h4>${R.order.map((x, k) => `<div class="ord"><span>${k + 1}</span>${esc(x)}${k ? '' : '<em>يبدأ</em>'}</div>`).join('')}</div>
  <p class="hint">كل لاعب يسأل اللاعب الذي بعده، والأخير يسأل الأول. اسألوا عن الموضوع دون ذكر الكلمة!</p>
  <button class="btn" data-b="vote">انتهت الأسئلة – وقت التصويت</button>`);
  if (cfg.timer) {
    let s = cfg.timer * 60;
    const f = () => { const t = $('#tm'); if (t) t.textContent = `${s / 60 | 0}:${String(s % 60).padStart(2, '0')}`; };
    f(); tm = setInterval(() => { s--; f(); if (s <= 0) { clearInterval(tm); beep(300, .5); vib([200, 100, 200]); toast('انتهى الوقت! وقت التصويت'); } }, 1000);
  }
}

// 4) التصويت
B.vote = () => { R.vi = 0; vgate(); };
function vgate() { const v = R.pl[R.vi]; gate('التصويت', v, `أنا ${esc(v)} – صوّت`, vscreen, 0, `<p class="hint">المصوّت ${R.vi + 1} من ${R.pl.length}</p>`); }
function vscreen() {
  const v = R.pl[R.vi]; R.sel = [];
  put('التصويت', `<p class="hint">${esc(v)}، مين برا السالفة؟ اختر ${R.vk === 1 ? 'لاعباً واحداً' : 'لاعبين'}</p>
  <div class="chips" style="justify-content:center;margin-bottom:12px"><span class="chip on" id="cn">0 من ${R.vk}</span></div>
  ${R.pl.map(x => x === v ? `<div class="opt" style="opacity:.4">${esc(x)}<span>(أنت)</span></div>` : `<button class="opt" data-b="pick" data-v="${esc(x)}">${esc(x)}</button>`).join('')}
  <button class="btn" data-b="cv" id="cv" disabled>تأكيد تصويتي</button>`);
}
B.pick = x => {
  const i = R.sel.indexOf(x); if (i >= 0) R.sel.splice(i, 1); else { R.sel.push(x); if (R.sel.length > R.vk) R.sel.shift(); }
  bs.querySelectorAll('[data-b=pick]').forEach(b => b.classList.toggle('on', R.sel.includes(b.dataset.v)));
  $('#cn').textContent = `${R.sel.length} من ${R.vk}`; $('#cv').disabled = R.sel.length !== R.vk;
};
B.cv = () => { R.votes[R.pl[R.vi]] = [...R.sel]; ++R.vi < R.pl.length ? vgate() : tally(); };

// 5) احتساب الأصوات ثم التخمين الأخير
function tally() {
  const c = {}; R.pl.forEach(x => c[x] = 0); Object.values(R.votes).forEach(a => a.forEach(x => c[x]++));
  const s = [...R.pl].sort((a, b) => c[b] - c[a]), cut = c[s[R.vk - 1]];
  R.acc = cut > 0 && !(s[R.vk] !== undefined && c[s[R.vk]] === cut) ? s.slice(0, R.vk) : [];
  R.gs = R.outs.filter(o => R.acc.includes(o)); R.gi = 0; R.right = [];
  guessNext();
}
function guessNext() {
  if (R.gi >= R.gs.length) return result();
  const g = R.gs[R.gi];
  gate('التخمين الأخير', g, `أنا ${esc(g)} – أخمّن`, () => {
    const rest = WORDS[R.cat].map(w => w[0]).filter(w => w !== R.word && !R.close.includes(w));
    put('خمّن الكلمة', `<p class="hint">${esc(g)}، تم كشفك! ما الكلمة السرية؟</p>${sh([R.word, ...R.close, ...sh(rest).slice(0, 2)]).map(w => `<button class="opt" data-b="gs" data-v="${esc(w)}">${esc(w)}</button>`).join('')}<button class="btn ghost" data-b="gs" data-v="">تخطّى – ما أريد أخمن</button>`);
  }, 0, `<p class="hint">تم كشف ${esc(g)}</p>`);
}
B.gs = v => { if (v === R.word) R.right.push(R.gs[R.gi]); R.gi++; guessNext(); };

// 6) النتيجة والنقاط: برا السالفة غير المكشوف +2، المكشوف الذي خمّن صح +1، وإن فاز الباقون +1 لكل منهم
function result() {
  const out = R.outs, un = out.filter(o => !R.gs.includes(o)), win = !R.none && !un.length && !R.right.length, pts = {};
  if (!R.none) {
    out.forEach(o => { if (un.includes(o)) pts[o] = 2; else if (R.right.includes(o)) pts[o] = 1; });
    if (win) R.pl.filter(x => !out.includes(x)).forEach(x => pts[x] = 1);
  }
  Object.entries(pts).forEach(([n, k]) => addPoints(n, k));
  const rows = Object.entries(pts);
  put('النتيجة', `<h2>${R.none ? 'جولة بدون برا السالفة' : win ? 'تم كشفه!' : 'التمويه نجح!'}</h2>
  <div class="sec"><p class="hint">الكلمة السرية (${esc(R.cat)})</p><div class="big" style="margin:0">${esc(R.word)}</div></div>
  <div class="sec"><h4>برا السالفة فعلياً</h4>${R.none ? `لم يكن هناك أحد${R.acc.length ? ` (اتهمتم ${R.acc.map(esc).join('، ')} ظلماً)` : ''}` : out.map(o => `<span class="chip on">${esc(o)}</span>`).join(' ')}</div>
  <div class="sec"><h4>التصويت</h4><table>${R.pl.map(x => `<tr><td>${esc(x)}</td><td>${(R.votes[x] || []).map(esc).join('، ')}</td></tr>`).join('')}</table></div>
  ${rows.length ? `<div class="sec"><h4>النقاط</h4>${rows.map(([n, k]) => `<div class="ord">${esc(n)}<em>+${k}</em></div>`).join('')}</div>` : ''}
  <button class="btn" data-b="again">جولة جديدة</button><button class="btn ghost" data-b="x">الرئيسية</button>`);
  if (win) beep(880, .25);
}
B.again = setup;
B.x = () => { clearInterval(tm); R = null; bs.style.display = 'none'; };

// نقطة الدخول التي يستدعيها app.js
window.openGame = id => {
  if (id !== 'bara') return toast('قريباً');
  if (!bs) {
    bs = document.createElement('div'); bs.id = 'bs'; document.body.appendChild(bs);
    bs.addEventListener('click', e => { const el = e.target.closest('[data-b]'); if (!el) return; beep(600); vib(10); if (B[el.dataset.b]) B[el.dataset.b](el.dataset.v, el); });
    bs.addEventListener('input', e => { if (e.target.dataset.b === 'prob') { cfg.prob = +e.target.value; $('#pv').textContent = cfg.prob; } });
  }
  bs.style.display = 'block'; setup();
};
})();
