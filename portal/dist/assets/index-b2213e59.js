(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const s of i)
      if (s.type === 'childList')
        for (const l of s.addedNodes)
          l.tagName === 'LINK' && l.rel === 'modulepreload' && r(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(i) {
    const s = {};
    return (
      i.integrity && (s.integrity = i.integrity),
      i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : i.crossOrigin === 'anonymous'
        ? (s.credentials = 'omit')
        : (s.credentials = 'same-origin'),
      s
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const s = t(i);
    fetch(i.href, s);
  }
})();
function j() {}
const Dt = (n) => n;
function Ve(n, e) {
  for (const t in e) n[t] = e[t];
  return n;
}
function ll(n) {
  return n();
}
function Qr() {
  return Object.create(null);
}
function ge(n) {
  n.forEach(ll);
}
function tt(n) {
  return typeof n == 'function';
}
function K(n, e) {
  return n != n
    ? e == e
    : n !== e || (n && typeof n == 'object') || typeof n == 'function';
}
let Ht;
function Ye(n, e) {
  return Ht || (Ht = document.createElement('a')), (Ht.href = e), n === Ht.href;
}
function Rl(n) {
  return Object.keys(n).length === 0;
}
function Mr(n, ...e) {
  if (n == null) return j;
  const t = n.subscribe(...e);
  return t.unsubscribe ? () => t.unsubscribe() : t;
}
function He(n) {
  let e;
  return Mr(n, (t) => (e = t))(), e;
}
function ze(n, e, t) {
  n.$$.on_destroy.push(Mr(e, t));
}
function rt(n, e, t, r) {
  if (n) {
    const i = sl(n, e, t, r);
    return n[0](i);
  }
}
function sl(n, e, t, r) {
  return n[1] && r ? Ve(t.ctx.slice(), n[1](r(e))) : t.ctx;
}
function nt(n, e, t, r) {
  if (n[2] && r) {
    const i = n[2](r(t));
    if (e.dirty === void 0) return i;
    if (typeof i == 'object') {
      const s = [],
        l = Math.max(e.dirty.length, i.length);
      for (let o = 0; o < l; o += 1) s[o] = e.dirty[o] | i[o];
      return s;
    }
    return e.dirty | i;
  }
  return e.dirty;
}
function it(n, e, t, r, i, s) {
  if (i) {
    const l = sl(e, t, r, s);
    n.p(l, i);
  }
}
function lt(n) {
  if (n.ctx.length > 32) {
    const e = [],
      t = n.ctx.length / 32;
    for (let r = 0; r < t; r++) e[r] = -1;
    return e;
  }
  return -1;
}
function St(n) {
  const e = {};
  for (const t in n) t[0] !== '$' && (e[t] = n[t]);
  return e;
}
function qe(n) {
  return n && tt(n.destroy) ? n.destroy : j;
}
const al = typeof window < 'u';
let Fr = al ? () => window.performance.now() : () => Date.now(),
  xr = al ? (n) => requestAnimationFrame(n) : j;
const dt = new Set();
function ol(n) {
  dt.forEach((e) => {
    e.c(n) || (dt.delete(e), e.f());
  }),
    dt.size !== 0 && xr(ol);
}
function Lr(n) {
  let e;
  return (
    dt.size === 0 && xr(ol),
    {
      promise: new Promise((t) => {
        dt.add((e = { c: n, f: t }));
      }),
      abort() {
        dt.delete(e);
      },
    }
  );
}
function b(n, e) {
  n.appendChild(e);
}
function cl(n) {
  if (!n) return document;
  const e = n.getRootNode ? n.getRootNode() : n.ownerDocument;
  return e && e.host ? e : n.ownerDocument;
}
function Dl(n) {
  const e = _('style');
  return Ul(cl(n), e), e.sheet;
}
function Ul(n, e) {
  return b(n.head || n, e), e.sheet;
}
function B(n, e, t) {
  n.insertBefore(e, t || null);
}
function v(n) {
  n.parentNode && n.parentNode.removeChild(n);
}
function _e(n, e) {
  for (let t = 0; t < n.length; t += 1) n[t] && n[t].d(e);
}
function _(n) {
  return document.createElement(n);
}
function ee(n) {
  return document.createElementNS('http://www.w3.org/2000/svg', n);
}
function E(n) {
  return document.createTextNode(n);
}
function $() {
  return E(' ');
}
function se() {
  return E('');
}
function te(n, e, t, r) {
  return n.addEventListener(e, t, r), () => n.removeEventListener(e, t, r);
}
function Wl(n) {
  return function (e) {
    return e.preventDefault(), n.call(this, e);
  };
}
function Zr(n) {
  return function (e) {
    return e.stopPropagation(), n.call(this, e);
  };
}
function h(n, e, t) {
  t == null
    ? n.removeAttribute(e)
    : n.getAttribute(e) !== t && n.setAttribute(e, t);
}
function en(n, e) {
  const t = Object.getOwnPropertyDescriptors(n.__proto__);
  for (const r in e)
    e[r] == null
      ? n.removeAttribute(r)
      : r === 'style'
      ? (n.style.cssText = e[r])
      : r === '__value'
      ? (n.value = n[r] = e[r])
      : t[r] && t[r].set
      ? (n[r] = e[r])
      : h(n, r, e[r]);
}
function tn(n, e) {
  for (const t in e) h(n, t, e[t]);
}
function rn(n, e, t) {
  const r = new Set();
  for (let i = 0; i < n.length; i += 1) n[i].checked && r.add(n[i].__value);
  return t || r.delete(e), Array.from(r);
}
function ul(n) {
  let e;
  return {
    p(...t) {
      (e = t), e.forEach((r) => n.push(r));
    },
    r() {
      e.forEach((t) => n.splice(n.indexOf(t), 1));
    },
  };
}
function Jl(n) {
  return Array.from(n.childNodes);
}
function ae(n, e) {
  (e = '' + e), n.data !== e && (n.data = e);
}
function pe(n, e) {
  n.value = e ?? '';
}
function jt(n, e, t, r) {
  t === null
    ? n.style.removeProperty(e)
    : n.style.setProperty(e, t, r ? 'important' : '');
}
function D(n, e, t) {
  n.classList[t ? 'add' : 'remove'](e);
}
function dl(n, e, { bubbles: t = !1, cancelable: r = !1 } = {}) {
  const i = document.createEvent('CustomEvent');
  return i.initCustomEvent(n, t, r, e), i;
}
class Yl {
  constructor(e = !1) {
    (this.is_svg = !1), (this.is_svg = e), (this.e = this.n = null);
  }
  c(e) {
    this.h(e);
  }
  m(e, t, r = null) {
    this.e ||
      (this.is_svg
        ? (this.e = ee(t.nodeName))
        : (this.e = _(t.nodeType === 11 ? 'TEMPLATE' : t.nodeName)),
      (this.t = t.tagName !== 'TEMPLATE' ? t : t.content),
      this.c(e)),
      this.i(r);
  }
  h(e) {
    (this.e.innerHTML = e),
      (this.n = Array.from(
        this.e.nodeName === 'TEMPLATE'
          ? this.e.content.childNodes
          : this.e.childNodes
      ));
  }
  i(e) {
    for (let t = 0; t < this.n.length; t += 1) B(this.t, this.n[t], e);
  }
  p(e) {
    this.d(), this.h(e), this.i(this.a);
  }
  d() {
    this.n.forEach(v);
  }
}
function Ne(n, e) {
  return new n(e);
}
const Vt = new Map();
let qt = 0;
function Kl(n) {
  let e = 5381,
    t = n.length;
  for (; t--; ) e = ((e << 5) - e) ^ n.charCodeAt(t);
  return e >>> 0;
}
function Xl(n, e) {
  const t = { stylesheet: Dl(e), rules: {} };
  return Vt.set(n, t), t;
}
function Et(n, e, t, r, i, s, l, o = 0) {
  const a = 16.666 / r;
  let c = `{
`;
  for (let y = 0; y <= 1; y += a) {
    const w = e + (t - e) * s(y);
    c +=
      y * 100 +
      `%{${l(w, 1 - w)}}
`;
  }
  const u =
      c +
      `100% {${l(t, 1 - t)}}
}`,
    d = `__svelte_${Kl(u)}_${o}`,
    f = cl(n),
    { stylesheet: p, rules: m } = Vt.get(f) || Xl(f, n);
  m[d] ||
    ((m[d] = !0), p.insertRule(`@keyframes ${d} ${u}`, p.cssRules.length));
  const k = n.style.animation || '';
  return (
    (n.style.animation = `${
      k ? `${k}, ` : ''
    }${d} ${r}ms linear ${i}ms 1 both`),
    (qt += 1),
    d
  );
}
function At(n, e) {
  const t = (n.style.animation || '').split(', '),
    r = t.filter(
      e ? (s) => s.indexOf(e) < 0 : (s) => s.indexOf('__svelte') === -1
    ),
    i = t.length - r.length;
  i && ((n.style.animation = r.join(', ')), (qt -= i), qt || Ql());
}
function Ql() {
  xr(() => {
    qt ||
      (Vt.forEach((n) => {
        const { ownerNode: e } = n.stylesheet;
        e && v(e);
      }),
      Vt.clear());
  });
}
function es(n, e, t, r) {
  if (!e) return j;
  const i = n.getBoundingClientRect();
  if (
    e.left === i.left &&
    e.right === i.right &&
    e.top === i.top &&
    e.bottom === i.bottom
  )
    return j;
  const {
    delay: s = 0,
    duration: l = 300,
    easing: o = Dt,
    start: a = Fr() + s,
    end: c = a + l,
    tick: u = j,
    css: d,
  } = t(n, { from: e, to: i }, r);
  let f = !0,
    p = !1,
    m;
  function k() {
    d && (m = Et(n, 0, 1, l, s, o, d)), s || (p = !0);
  }
  function y() {
    d && At(n, m), (f = !1);
  }
  return (
    Lr((w) => {
      if ((!p && w >= a && (p = !0), p && w >= c && (u(1, 0), y()), !f))
        return !1;
      if (p) {
        const M = w - a,
          C = 0 + 1 * o(M / l);
        u(C, 1 - C);
      }
      return !0;
    }),
    k(),
    u(0, 1),
    y
  );
}
function ts(n) {
  const e = getComputedStyle(n);
  if (e.position !== 'absolute' && e.position !== 'fixed') {
    const { width: t, height: r } = e,
      i = n.getBoundingClientRect();
    (n.style.position = 'absolute'),
      (n.style.width = t),
      (n.style.height = r),
      rs(n, i);
  }
}
function rs(n, e) {
  const t = n.getBoundingClientRect();
  if (e.left !== t.left || e.top !== t.top) {
    const r = getComputedStyle(n),
      i = r.transform === 'none' ? '' : r.transform;
    n.style.transform = `${i} translate(${e.left - t.left}px, ${
      e.top - t.top
    }px)`;
  }
}
let wt;
function vt(n) {
  wt = n;
}
function Ut() {
  if (!wt) throw new Error('Function called outside component initialization');
  return wt;
}
function ns(n) {
  Ut().$$.on_mount.push(n);
}
function is(n) {
  Ut().$$.after_update.push(n);
}
function ls(n) {
  Ut().$$.on_destroy.push(n);
}
function ht() {
  const n = Ut();
  return (e, t, { cancelable: r = !1 } = {}) => {
    const i = n.$$.callbacks[e];
    if (i) {
      const s = dl(e, t, { cancelable: r });
      return (
        i.slice().forEach((l) => {
          l.call(n, s);
        }),
        !s.defaultPrevented
      );
    }
    return !0;
  };
}
function Ke(n, e) {
  const t = n.$$.callbacks[e.type];
  t && t.slice().forEach((r) => r.call(this, e));
}
const ut = [],
  ce = [];
let ft = [];
const pr = [],
  fl = Promise.resolve();
let br = !1;
function hl() {
  br || ((br = !0), fl.then(ml));
}
function Wt() {
  return hl(), fl;
}
function Ce(n) {
  ft.push(n);
}
function fe(n) {
  pr.push(n);
}
const ar = new Set();
let ot = 0;
function ml() {
  if (ot !== 0) return;
  const n = wt;
  do {
    try {
      for (; ot < ut.length; ) {
        const e = ut[ot];
        ot++, vt(e), ss(e.$$);
      }
    } catch (e) {
      throw ((ut.length = 0), (ot = 0), e);
    }
    for (vt(null), ut.length = 0, ot = 0; ce.length; ) ce.pop()();
    for (let e = 0; e < ft.length; e += 1) {
      const t = ft[e];
      ar.has(t) || (ar.add(t), t());
    }
    ft.length = 0;
  } while (ut.length);
  for (; pr.length; ) pr.pop()();
  (br = !1), ar.clear(), vt(n);
}
function ss(n) {
  if (n.fragment !== null) {
    n.update(), ge(n.before_update);
    const e = n.dirty;
    (n.dirty = [-1]),
      n.fragment && n.fragment.p(n.ctx, e),
      n.after_update.forEach(Ce);
  }
}
function as(n) {
  const e = [],
    t = [];
  ft.forEach((r) => (n.indexOf(r) === -1 ? e.push(r) : t.push(r))),
    t.forEach((r) => r()),
    (ft = e);
}
let gt;
function pl() {
  return (
    gt ||
      ((gt = Promise.resolve()),
      gt.then(() => {
        gt = null;
      })),
    gt
  );
}
function Bt(n, e, t) {
  n.dispatchEvent(dl(`${e ? 'intro' : 'outro'}${t}`));
}
const Ot = new Set();
let Se;
function P() {
  Se = { r: 0, c: [], p: Se };
}
function N() {
  Se.r || ge(Se.c), (Se = Se.p);
}
function g(n, e) {
  n && n.i && (Ot.delete(n), n.i(e));
}
function G(n, e, t, r) {
  if (n && n.o) {
    if (Ot.has(n)) return;
    Ot.add(n),
      Se.c.push(() => {
        Ot.delete(n), r && (t && n.d(1), r());
      }),
      n.o(e);
  } else r && r();
}
const bl = { duration: 0 };
function Jt(n, e, t) {
  const r = { direction: 'in' };
  let i = e(n, t, r),
    s = !1,
    l,
    o,
    a = 0;
  function c() {
    l && At(n, l);
  }
  function u() {
    const {
      delay: f = 0,
      duration: p = 300,
      easing: m = Dt,
      tick: k = j,
      css: y,
    } = i || bl;
    y && (l = Et(n, 0, 1, p, f, m, y, a++)), k(0, 1);
    const w = Fr() + f,
      M = w + p;
    o && o.abort(),
      (s = !0),
      Ce(() => Bt(n, !0, 'start')),
      (o = Lr((C) => {
        if (s) {
          if (C >= M) return k(1, 0), Bt(n, !0, 'end'), c(), (s = !1);
          if (C >= w) {
            const S = m((C - w) / p);
            k(S, 1 - S);
          }
        }
        return s;
      }));
  }
  let d = !1;
  return {
    start() {
      d || ((d = !0), At(n), tt(i) ? ((i = i(r)), pl().then(u)) : u());
    },
    invalidate() {
      d = !1;
    },
    end() {
      s && (c(), (s = !1));
    },
  };
}
function nn(n, e, t, r) {
  const i = { direction: 'both' };
  let s = e(n, t, i),
    l = r ? 0 : 1,
    o = null,
    a = null,
    c = null;
  function u() {
    c && At(n, c);
  }
  function d(p, m) {
    const k = p.b - l;
    return (
      (m *= Math.abs(k)),
      {
        a: l,
        b: p.b,
        d: k,
        duration: m,
        start: p.start,
        end: p.start + m,
        group: p.group,
      }
    );
  }
  function f(p) {
    const {
        delay: m = 0,
        duration: k = 300,
        easing: y = Dt,
        tick: w = j,
        css: M,
      } = s || bl,
      C = { start: Fr() + m, b: p };
    p || ((C.group = Se), (Se.r += 1)),
      o || a
        ? (a = C)
        : (M && (u(), (c = Et(n, l, p, k, m, y, M))),
          p && w(0, 1),
          (o = d(C, k)),
          Ce(() => Bt(n, p, 'start')),
          Lr((S) => {
            if (
              (a &&
                S > a.start &&
                ((o = d(a, k)),
                (a = null),
                Bt(n, o.b, 'start'),
                M && (u(), (c = Et(n, l, o.b, o.duration, 0, y, s.css)))),
              o)
            ) {
              if (S >= o.end)
                w((l = o.b), 1 - l),
                  Bt(n, o.b, 'end'),
                  a || (o.b ? u() : --o.group.r || ge(o.group.c)),
                  (o = null);
              else if (S >= o.start) {
                const H = S - o.start;
                (l = o.a + o.d * y(H / o.duration)), w(l, 1 - l);
              }
            }
            return !!(o || a);
          }));
  }
  return {
    run(p) {
      tt(s)
        ? pl().then(() => {
            (s = s(i)), f(p);
          })
        : f(p);
    },
    end() {
      u(), (o = a = null);
    },
  };
}
function Yt(n, e) {
  G(n, 1, 1, () => {
    e.delete(n.key);
  });
}
function os(n, e) {
  n.f(), Yt(n, e);
}
function Kt(n, e, t, r, i, s, l, o, a, c, u, d) {
  let f = n.length,
    p = s.length,
    m = f;
  const k = {};
  for (; m--; ) k[n[m].key] = m;
  const y = [],
    w = new Map(),
    M = new Map(),
    C = [];
  for (m = p; m--; ) {
    const Z = d(i, s, m),
      V = t(Z);
    let A = l.get(V);
    A ? r && C.push(() => A.p(Z, e)) : ((A = c(V, Z)), A.c()),
      w.set(V, (y[m] = A)),
      V in k && M.set(V, Math.abs(m - k[V]));
  }
  const S = new Set(),
    H = new Set();
  function O(Z) {
    g(Z, 1), Z.m(o, u), l.set(Z.key, Z), (u = Z.first), p--;
  }
  for (; f && p; ) {
    const Z = y[p - 1],
      V = n[f - 1],
      A = Z.key,
      q = V.key;
    Z === V
      ? ((u = Z.first), f--, p--)
      : w.has(q)
      ? !l.has(A) || S.has(A)
        ? O(Z)
        : H.has(q)
        ? f--
        : M.get(A) > M.get(q)
        ? (H.add(A), O(Z))
        : (S.add(q), f--)
      : (a(V, l), f--);
  }
  for (; f--; ) {
    const Z = n[f];
    w.has(Z.key) || a(Z, l);
  }
  for (; p; ) O(y[p - 1]);
  return ge(C), y;
}
function Xt(n, e) {
  const t = {},
    r = {},
    i = { $$scope: 1 };
  let s = n.length;
  for (; s--; ) {
    const l = n[s],
      o = e[s];
    if (o) {
      for (const a in l) a in o || (r[a] = 1);
      for (const a in o) i[a] || ((t[a] = o[a]), (i[a] = 1));
      n[s] = o;
    } else for (const a in l) i[a] = 1;
  }
  for (const l in r) l in t || (t[l] = void 0);
  return t;
}
function kl(n) {
  return typeof n == 'object' && n !== null ? n : {};
}
function he(n, e, t) {
  const r = n.$$.props[e];
  r !== void 0 && ((n.$$.bound[r] = t), t(n.$$.ctx[r]));
}
function L(n) {
  n && n.c();
}
function F(n, e, t, r) {
  const { fragment: i, after_update: s } = n.$$;
  i && i.m(e, t),
    r ||
      Ce(() => {
        const l = n.$$.on_mount.map(ll).filter(tt);
        n.$$.on_destroy ? n.$$.on_destroy.push(...l) : ge(l),
          (n.$$.on_mount = []);
      }),
    s.forEach(Ce);
}
function x(n, e) {
  const t = n.$$;
  t.fragment !== null &&
    (as(t.after_update),
    ge(t.on_destroy),
    t.fragment && t.fragment.d(e),
    (t.on_destroy = t.fragment = null),
    (t.ctx = []));
}
function cs(n, e) {
  n.$$.dirty[0] === -1 && (ut.push(n), hl(), n.$$.dirty.fill(0)),
    (n.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function X(n, e, t, r, i, s, l, o = [-1]) {
  const a = wt;
  vt(n);
  const c = (n.$$ = {
    fragment: null,
    ctx: [],
    props: s,
    update: j,
    not_equal: i,
    bound: Qr(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    callbacks: Qr(),
    dirty: o,
    skip_bound: !1,
    root: e.target || a.$$.root,
  });
  l && l(c.root);
  let u = !1;
  if (
    ((c.ctx = t
      ? t(n, e.props || {}, (d, f, ...p) => {
          const m = p.length ? p[0] : f;
          return (
            c.ctx &&
              i(c.ctx[d], (c.ctx[d] = m)) &&
              (!c.skip_bound && c.bound[d] && c.bound[d](m), u && cs(n, d)),
            f
          );
        })
      : []),
    c.update(),
    (u = !0),
    ge(c.before_update),
    (c.fragment = r ? r(c.ctx) : !1),
    e.target)
  ) {
    if (e.hydrate) {
      const d = Jl(e.target);
      c.fragment && c.fragment.l(d), d.forEach(v);
    } else c.fragment && c.fragment.c();
    e.intro && g(n.$$.fragment),
      F(n, e.target, e.anchor, e.customElement),
      ml();
  }
  vt(a);
}
class Q {
  $destroy() {
    x(this, 1), (this.$destroy = j);
  }
  $on(e, t) {
    if (!tt(t)) return j;
    const r = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return (
      r.push(t),
      () => {
        const i = r.indexOf(t);
        i !== -1 && r.splice(i, 1);
      }
    );
  }
  $set(e) {
    this.$$set &&
      !Rl(e) &&
      ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
  }
}
const ct = [];
function gl(n, e) {
  return { subscribe: Qt(n, e).subscribe };
}
function Qt(n, e = j) {
  let t;
  const r = new Set();
  function i(o) {
    if (K(n, o) && ((n = o), t)) {
      const a = !ct.length;
      for (const c of r) c[1](), ct.push(c, n);
      if (a) {
        for (let c = 0; c < ct.length; c += 2) ct[c][0](ct[c + 1]);
        ct.length = 0;
      }
    }
  }
  function s(o) {
    i(o(n));
  }
  function l(o, a = j) {
    const c = [o, a];
    return (
      r.add(c),
      r.size === 1 && (t = e(i) || j),
      o(n),
      () => {
        r.delete(c), r.size === 0 && t && (t(), (t = null));
      }
    );
  }
  return { set: i, update: s, subscribe: l };
}
function Gl(n, e, t) {
  const r = !Array.isArray(n),
    i = r ? [n] : n,
    s = e.length < 2;
  return gl(t, (l) => {
    let o = !1;
    const a = [];
    let c = 0,
      u = j;
    const d = () => {
        if (c) return;
        u();
        const p = e(r ? a[0] : a, l);
        s ? l(p) : (u = tt(p) ? p : j);
      },
      f = i.map((p, m) =>
        Mr(
          p,
          (k) => {
            (a[m] = k), (c &= ~(1 << m)), o && d();
          },
          () => {
            c |= 1 << m;
          }
        )
      );
    return (
      (o = !0),
      d(),
      function () {
        ge(f), u(), (o = !1);
      }
    );
  });
}
function us(n, e) {
  if (n instanceof RegExp) return { keys: !1, pattern: n };
  var t,
    r,
    i,
    s,
    l = [],
    o = '',
    a = n.split('/');
  for (a[0] || a.shift(); (i = a.shift()); )
    (t = i[0]),
      t === '*'
        ? (l.push('wild'), (o += '/(.*)'))
        : t === ':'
        ? ((r = i.indexOf('?', 1)),
          (s = i.indexOf('.', 1)),
          l.push(i.substring(1, ~r ? r : ~s ? s : i.length)),
          (o += ~r && !~s ? '(?:/([^/]+?))?' : '/([^/]+?)'),
          ~s && (o += (~r ? '?' : '') + '\\' + i.substring(s)))
        : (o += '/' + i);
  return {
    keys: l,
    pattern: new RegExp('^' + o + (e ? '(?=$|/)' : '/?$'), 'i'),
  };
}
function ds(n) {
  let e, t, r;
  const i = [n[2]];
  var s = n[0];
  function l(o) {
    let a = {};
    for (let c = 0; c < i.length; c += 1) a = Ve(a, i[c]);
    return { props: a };
  }
  return (
    s && ((e = Ne(s, l())), e.$on('routeEvent', n[7])),
    {
      c() {
        e && L(e.$$.fragment), (t = se());
      },
      m(o, a) {
        e && F(e, o, a), B(o, t, a), (r = !0);
      },
      p(o, a) {
        const c = a & 4 ? Xt(i, [kl(o[2])]) : {};
        if (a & 1 && s !== (s = o[0])) {
          if (e) {
            P();
            const u = e;
            G(u.$$.fragment, 1, 0, () => {
              x(u, 1);
            }),
              N();
          }
          s
            ? ((e = Ne(s, l())),
              e.$on('routeEvent', o[7]),
              L(e.$$.fragment),
              g(e.$$.fragment, 1),
              F(e, t.parentNode, t))
            : (e = null);
        } else s && e.$set(c);
      },
      i(o) {
        r || (e && g(e.$$.fragment, o), (r = !0));
      },
      o(o) {
        e && G(e.$$.fragment, o), (r = !1);
      },
      d(o) {
        o && v(t), e && x(e, o);
      },
    }
  );
}
function fs(n) {
  let e, t, r;
  const i = [{ params: n[1] }, n[2]];
  var s = n[0];
  function l(o) {
    let a = {};
    for (let c = 0; c < i.length; c += 1) a = Ve(a, i[c]);
    return { props: a };
  }
  return (
    s && ((e = Ne(s, l())), e.$on('routeEvent', n[6])),
    {
      c() {
        e && L(e.$$.fragment), (t = se());
      },
      m(o, a) {
        e && F(e, o, a), B(o, t, a), (r = !0);
      },
      p(o, a) {
        const c =
          a & 6 ? Xt(i, [a & 2 && { params: o[1] }, a & 4 && kl(o[2])]) : {};
        if (a & 1 && s !== (s = o[0])) {
          if (e) {
            P();
            const u = e;
            G(u.$$.fragment, 1, 0, () => {
              x(u, 1);
            }),
              N();
          }
          s
            ? ((e = Ne(s, l())),
              e.$on('routeEvent', o[6]),
              L(e.$$.fragment),
              g(e.$$.fragment, 1),
              F(e, t.parentNode, t))
            : (e = null);
        } else s && e.$set(c);
      },
      i(o) {
        r || (e && g(e.$$.fragment, o), (r = !0));
      },
      o(o) {
        e && G(e.$$.fragment, o), (r = !1);
      },
      d(o) {
        o && v(t), e && x(e, o);
      },
    }
  );
}
function hs(n) {
  let e, t, r, i;
  const s = [fs, ds],
    l = [];
  function o(a, c) {
    return a[1] ? 0 : 1;
  }
  return (
    (e = o(n)),
    (t = l[e] = s[e](n)),
    {
      c() {
        t.c(), (r = se());
      },
      m(a, c) {
        l[e].m(a, c), B(a, r, c), (i = !0);
      },
      p(a, [c]) {
        let u = e;
        (e = o(a)),
          e === u
            ? l[e].p(a, c)
            : (P(),
              G(l[u], 1, 1, () => {
                l[u] = null;
              }),
              N(),
              (t = l[e]),
              t ? t.p(a, c) : ((t = l[e] = s[e](a)), t.c()),
              g(t, 1),
              t.m(r.parentNode, r));
      },
      i(a) {
        i || (g(t), (i = !0));
      },
      o(a) {
        G(t), (i = !1);
      },
      d(a) {
        l[e].d(a), a && v(r);
      },
    }
  );
}
function ln() {
  const n = window.location.href.indexOf('#/');
  let e = n > -1 ? window.location.href.substr(n + 1) : '/';
  const t = e.indexOf('?');
  let r = '';
  return (
    t > -1 && ((r = e.substr(t + 1)), (e = e.substr(0, t))),
    { location: e, querystring: r }
  );
}
const Hr = gl(null, function (e) {
    e(ln());
    const t = () => {
      e(ln());
    };
    return (
      window.addEventListener('hashchange', t, !1),
      function () {
        window.removeEventListener('hashchange', t, !1);
      }
    );
  }),
  _l = Gl(Hr, (n) => n.location);
Gl(Hr, (n) => n.querystring);
const sn = Qt(void 0);
async function Xe(n) {
  if (!n || n.length < 1 || (n.charAt(0) != '/' && n.indexOf('#/') !== 0))
    throw Error('Invalid parameter location');
  await Wt(),
    history.replaceState(
      {
        ...history.state,
        __svelte_spa_router_scrollX: window.scrollX,
        __svelte_spa_router_scrollY: window.scrollY,
      },
      void 0
    ),
    (window.location.hash = (n.charAt(0) == '#' ? '' : '#') + n);
}
async function Ct() {
  await Wt(), window.history.back();
}
function Ie(n, e) {
  if (((e = on(e)), !n || !n.tagName || n.tagName.toLowerCase() != 'a'))
    throw Error('Action "link" can only be used with <a> tags');
  return (
    an(n, e),
    {
      update(t) {
        (t = on(t)), an(n, t);
      },
    }
  );
}
function ms(n) {
  n
    ? window.scrollTo(
        n.__svelte_spa_router_scrollX,
        n.__svelte_spa_router_scrollY
      )
    : window.scrollTo(0, 0);
}
function an(n, e) {
  let t = e.href || n.getAttribute('href');
  if (t && t.charAt(0) == '/') t = '#' + t;
  else if (!t || t.length < 2 || t.slice(0, 2) != '#/')
    throw Error('Invalid value for "href" attribute: ' + t);
  n.setAttribute('href', t),
    n.addEventListener('click', (r) => {
      r.preventDefault(),
        e.disabled || ps(r.currentTarget.getAttribute('href'));
    });
}
function on(n) {
  return n && typeof n == 'string' ? { href: n } : n || {};
}
function ps(n) {
  history.replaceState(
    {
      ...history.state,
      __svelte_spa_router_scrollX: window.scrollX,
      __svelte_spa_router_scrollY: window.scrollY,
    },
    void 0
  ),
    (window.location.hash = n);
}
function bs(n, e, t) {
  let { routes: r = {} } = e,
    { prefix: i = '' } = e,
    { restoreScrollState: s = !1 } = e;
  class l {
    constructor(H, O) {
      if (
        !O ||
        (typeof O != 'function' &&
          (typeof O != 'object' || O._sveltesparouter !== !0))
      )
        throw Error('Invalid component object');
      if (
        !H ||
        (typeof H == 'string' &&
          (H.length < 1 || (H.charAt(0) != '/' && H.charAt(0) != '*'))) ||
        (typeof H == 'object' && !(H instanceof RegExp))
      )
        throw Error(
          'Invalid value for "path" argument - strings must start with / or *'
        );
      const { pattern: Z, keys: V } = us(H);
      (this.path = H),
        typeof O == 'object' && O._sveltesparouter === !0
          ? ((this.component = O.component),
            (this.conditions = O.conditions || []),
            (this.userData = O.userData),
            (this.props = O.props || {}))
          : ((this.component = () => Promise.resolve(O)),
            (this.conditions = []),
            (this.props = {})),
        (this._pattern = Z),
        (this._keys = V);
    }
    match(H) {
      if (i) {
        if (typeof i == 'string')
          if (H.startsWith(i)) H = H.substr(i.length) || '/';
          else return null;
        else if (i instanceof RegExp) {
          const A = H.match(i);
          if (A && A[0]) H = H.substr(A[0].length) || '/';
          else return null;
        }
      }
      const O = this._pattern.exec(H);
      if (O === null) return null;
      if (this._keys === !1) return O;
      const Z = {};
      let V = 0;
      for (; V < this._keys.length; ) {
        try {
          Z[this._keys[V]] = decodeURIComponent(O[V + 1] || '') || null;
        } catch {
          Z[this._keys[V]] = null;
        }
        V++;
      }
      return Z;
    }
    async checkConditions(H) {
      for (let O = 0; O < this.conditions.length; O++)
        if (!(await this.conditions[O](H))) return !1;
      return !0;
    }
  }
  const o = [];
  r instanceof Map
    ? r.forEach((S, H) => {
        o.push(new l(H, S));
      })
    : Object.keys(r).forEach((S) => {
        o.push(new l(S, r[S]));
      });
  let a = null,
    c = null,
    u = {};
  const d = ht();
  async function f(S, H) {
    await Wt(), d(S, H);
  }
  let p = null,
    m = null;
  s &&
    ((m = (S) => {
      S.state &&
      (S.state.__svelte_spa_router_scrollY ||
        S.state.__svelte_spa_router_scrollX)
        ? (p = S.state)
        : (p = null);
    }),
    window.addEventListener('popstate', m),
    is(() => {
      ms(p);
    }));
  let k = null,
    y = null;
  const w = Hr.subscribe(async (S) => {
    k = S;
    let H = 0;
    for (; H < o.length; ) {
      const O = o[H].match(S.location);
      if (!O) {
        H++;
        continue;
      }
      const Z = {
        route: o[H].path,
        location: S.location,
        querystring: S.querystring,
        userData: o[H].userData,
        params: O && typeof O == 'object' && Object.keys(O).length ? O : null,
      };
      if (!(await o[H].checkConditions(Z))) {
        t(0, (a = null)), (y = null), f('conditionsFailed', Z);
        return;
      }
      f('routeLoading', Object.assign({}, Z));
      const V = o[H].component;
      if (y != V) {
        V.loading
          ? (t(0, (a = V.loading)),
            (y = V),
            t(1, (c = V.loadingParams)),
            t(2, (u = {})),
            f(
              'routeLoaded',
              Object.assign({}, Z, { component: a, name: a.name, params: c })
            ))
          : (t(0, (a = null)), (y = null));
        const A = await V();
        if (S != k) return;
        t(0, (a = (A && A.default) || A)), (y = V);
      }
      O && typeof O == 'object' && Object.keys(O).length
        ? t(1, (c = O))
        : t(1, (c = null)),
        t(2, (u = o[H].props)),
        f(
          'routeLoaded',
          Object.assign({}, Z, { component: a, name: a.name, params: c })
        ).then(() => {
          sn.set(c);
        });
      return;
    }
    t(0, (a = null)), (y = null), sn.set(void 0);
  });
  ls(() => {
    w(), m && window.removeEventListener('popstate', m);
  });
  function M(S) {
    Ke.call(this, n, S);
  }
  function C(S) {
    Ke.call(this, n, S);
  }
  return (
    (n.$$set = (S) => {
      'routes' in S && t(3, (r = S.routes)),
        'prefix' in S && t(4, (i = S.prefix)),
        'restoreScrollState' in S && t(5, (s = S.restoreScrollState));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 32 && (history.scrollRestoration = s ? 'manual' : 'auto');
    }),
    [a, c, u, r, i, s, M, C]
  );
}
class ks extends Q {
  constructor(e) {
    super(),
      X(this, e, bs, hs, K, { routes: 3, prefix: 4, restoreScrollState: 5 });
  }
}
function gs(n, e, t) {
  let r = n.length;
  function i() {
    (r = --r), r < 1 && t();
  }
  if (e()) return t();
  for (const {
    type: s,
    url: l,
    content: o,
    options: a = { async: !0, defer: !0 },
  } of n) {
    const c = s === 'script',
      u = document.createElement(c ? 'script' : 'link'),
      d = c ? 'src' : 'href',
      f = (!!l).valueOf();
    c ? ((u.async = a.async), (u.defer = a.defer)) : (u.rel = 'stylesheet'),
      f ? (u[d] = l) : u.appendChild(document.createTextNode(o)),
      (u.onload = i),
      document.body.appendChild(u);
  }
}
const vl = Qt([]);
function Gs() {
  return (!!window.dataLayer).valueOf() && Array.isArray(window.dataLayer);
}
function or() {
  window.dataLayer.push(arguments);
}
function _s(n, e, t) {
  let { properties: r } = e,
    { configurations: i = {} } = e,
    { enabled: s = !0 } = e;
  ns(() => {
    s && l();
  });
  function l() {
    const a = r[0];
    gs(
      [{ type: 'script', url: `//www.googletagmanager.com/gtag/js?id=${a}` }],
      Gs,
      o
    );
  }
  function o() {
    return (
      (window.dataLayer = window.dataLayer || []),
      or('js', new Date()),
      r.forEach((a) => {
        or('config', a, i[a] || {});
      }),
      vl.subscribe((a) => {
        let c = a.length && a.shift();
        for (; c; ) {
          const { type: u, event: d, data: f } = c;
          or(u, d, f), (c = a.shift());
        }
      })
    );
  }
  return (
    (n.$$set = (a) => {
      'properties' in a && t(0, (r = a.properties)),
        'configurations' in a && t(1, (i = a.configurations)),
        'enabled' in a && t(2, (s = a.enabled));
    }),
    [r, i, s, l]
  );
}
class vs extends Q {
  constructor(e) {
    super(),
      X(this, e, _s, null, K, {
        properties: 0,
        configurations: 1,
        enabled: 2,
        init: 3,
      });
  }
  get init() {
    return this.$$.ctx[3];
  }
}
function Bs(n, e) {
  e.send_to || delete e.send_to,
    vl.update((t) => [...t, { type: 'event', event: n, data: e }]);
}
class ys extends Error {}
var $t = {};
Object.defineProperty($t, '__esModule', { value: !0 });
var ws =
    typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
      ? function (n) {
          return typeof n;
        }
      : function (n) {
          return n &&
            typeof Symbol == 'function' &&
            n.constructor === Symbol &&
            n !== Symbol.prototype
            ? 'symbol'
            : typeof n;
        },
  Cs = typeof window < 'u' && typeof window.document < 'u',
  $s =
    (typeof self > 'u' ? 'undefined' : ws(self)) === 'object' &&
    self.constructor &&
    self.constructor.name === 'DedicatedWorkerGlobalScope',
  Ms =
    typeof process < 'u' &&
    process.versions != null &&
    process.versions.node != null,
  Fs = function () {
    return (
      (typeof window < 'u' && window.name === 'nodejs') ||
      navigator.userAgent.includes('Node.js') ||
      navigator.userAgent.includes('jsdom')
    );
  },
  Gt = ($t.isBrowser = Cs);
$t.isWebWorker = $s;
$t.isNode = Ms;
$t.isJsDom = Fs;
async function xs(n, e) {
  const t = n.getReader();
  let r;
  for (; !(r = await t.read()).done; ) e(r.value);
}
function Ls(n) {
  let e,
    t,
    r,
    i = !1;
  return function (l) {
    e === void 0 ? ((e = l), (t = 0), (r = -1)) : (e = Hs(e, l));
    const o = e.length;
    let a = 0;
    for (; t < o; ) {
      i && (e[t] === 10 && (a = ++t), (i = !1));
      let c = -1;
      for (; t < o && c === -1; ++t)
        switch (e[t]) {
          case 58:
            r === -1 && (r = t - a);
            break;
          case 13:
            i = !0;
          case 10:
            c = t;
            break;
        }
      if (c === -1) break;
      n(e.subarray(a, c), r), (a = t), (r = -1);
    }
    a === o ? (e = void 0) : a !== 0 && ((e = e.subarray(a)), (t -= a));
  };
}
function Zs(n, e, t) {
  let r = cn();
  const i = new TextDecoder();
  return function (l, o) {
    if (l.length === 0) t == null || t(r), (r = cn());
    else if (o > 0) {
      const a = i.decode(l.subarray(0, o)),
        c = o + (l[o + 1] === 32 ? 2 : 1),
        u = i.decode(l.subarray(c));
      switch (a) {
        case 'data':
          r.data = r.data
            ? r.data +
              `
` +
              u
            : u;
          break;
        case 'event':
          r.event = u;
          break;
        case 'id':
          n((r.id = u));
          break;
        case 'retry':
          const d = parseInt(u, 10);
          isNaN(d) || e((r.retry = d));
          break;
      }
    }
  };
}
function Hs(n, e) {
  const t = new Uint8Array(n.length + e.length);
  return t.set(n), t.set(e, n.length), t;
}
function cn() {
  return { data: '', event: '', id: '', retry: void 0 };
}
var js = function (n, e) {
  var t = {};
  for (var r in n)
    Object.prototype.hasOwnProperty.call(n, r) &&
      e.indexOf(r) < 0 &&
      (t[r] = n[r]);
  if (n != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var i = 0, r = Object.getOwnPropertySymbols(n); i < r.length; i++)
      e.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(n, r[i]) &&
        (t[r[i]] = n[r[i]]);
  return t;
};
const kr = 'text/event-stream',
  Os = 1e3,
  un = 'last-event-id';
function Ss(n, e) {
  var {
      signal: t,
      headers: r,
      onopen: i,
      onmessage: s,
      onclose: l,
      onerror: o,
      openWhenHidden: a,
      fetch: c,
    } = e,
    u = js(e, [
      'signal',
      'headers',
      'onopen',
      'onmessage',
      'onclose',
      'onerror',
      'openWhenHidden',
      'fetch',
    ]);
  return new Promise((d, f) => {
    const p = Object.assign({}, r);
    p.accept || (p.accept = kr);
    let m;
    function k() {
      m.abort(), document.hidden || H();
    }
    a || document.addEventListener('visibilitychange', k);
    let y = Os,
      w = 0;
    function M() {
      document.removeEventListener('visibilitychange', k),
        window.clearTimeout(w),
        m.abort();
    }
    t == null ||
      t.addEventListener('abort', () => {
        M(), d();
      });
    const C = c ?? window.fetch,
      S = i ?? Vs;
    async function H() {
      var O;
      m = new AbortController();
      try {
        const Z = await C(
          n,
          Object.assign(Object.assign({}, u), { headers: p, signal: m.signal })
        );
        await S(Z),
          await xs(
            Z.body,
            Ls(
              Zs(
                (V) => {
                  V ? (p[un] = V) : delete p[un];
                },
                (V) => {
                  y = V;
                },
                s
              )
            )
          ),
          l == null || l(),
          M(),
          d();
      } catch (Z) {
        if (!m.signal.aborted)
          try {
            const V =
              (O = o == null ? void 0 : o(Z)) !== null && O !== void 0 ? O : y;
            window.clearTimeout(w), (w = window.setTimeout(H, V));
          } catch (V) {
            M(), f(V);
          }
      }
    }
    H();
  });
}
function Vs(n) {
  const e = n.headers.get('content-type');
  if (!(e != null && e.startsWith(kr)))
    throw new Error(`Expected content-type to be ${kr}, Actual: ${e}`);
}
function gr(n) {
  const t = Math.pow(16, Math.min(n, 8) - 1),
    r = Math.pow(16, Math.min(n, 8)) - 1;
  let s = (Math.floor(Math.random() * (r - t + 1)) + t).toString(16);
  for (; s.length < n; ) s = s + gr(n - 8);
  return s;
}
class Tt {
  constructor(e, t, r) {
    return (
      (this.url = e),
      (this.code = t),
      (this.desk = r),
      (this.uid = `${Math.floor(Date.now() / 1e3)}-${gr(6)}`),
      (this.lastEventId = 0),
      (this.lastHeardEventId = -1),
      (this.lastAcknowledgedEventId = -1),
      (this.sseClientInitialized = !1),
      (this.outstandingPokes = new Map()),
      (this.outstandingSubscriptions = new Map()),
      (this.abort = new AbortController()),
      (this.errorCount = 0),
      (this.onError = null),
      (this.onRetry = null),
      (this.onOpen = null),
      Gt && window.addEventListener('beforeunload', this.delete),
      this
    );
  }
  get channelUrl() {
    return `${this.url}/~/channel/${this.uid}`;
  }
  get fetchOptions() {
    const e = { 'Content-Type': 'application/json' };
    return (
      Gt || (e.Cookie = this.cookie),
      {
        credentials: 'include',
        accept: '*',
        headers: e,
        signal: this.abort.signal,
      }
    );
  }
  static async authenticate({ ship: e, url: t, code: r, verbose: i = !1 }) {
    const s = new Tt(t.startsWith('http') ? t : `http://${t}`, r);
    return (
      (s.verbose = i),
      (s.ship = e),
      await s.connect(),
      await s.poke({ app: 'hood', mark: 'helm-hi', json: 'opening airlock' }),
      await s.eventSource(),
      s
    );
  }
  async connect() {
    return (
      this.verbose &&
        console.log(
          `password=${this.code} `,
          Gt
            ? `Connecting in browser context at ${this.url}/~/login`
            : 'Connecting from node context'
        ),
      fetch(`${this.url}/~/login`, {
        method: 'post',
        body: `password=${this.code}`,
        credentials: 'include',
      }).then((e) => {
        this.verbose && console.log('Received authentication response', e);
        const t = e.headers.get('set-cookie');
        this.ship || (this.ship = new RegExp(/urbauth-~([\w-]+)/).exec(t)[1]),
          Gt || (this.cookie = t);
      })
    );
  }
  async eventSource() {
    if (this.sseClientInitialized) return Promise.resolve();
    if (this.lastEventId === 0) {
      await this.poke({
        app: 'hood',
        mark: 'helm-hi',
        json: 'Opening API channel',
      });
      return;
    }
    return (
      (this.sseClientInitialized = !0),
      new Promise((e, t) => {
        Ss(this.channelUrl, {
          ...this.fetchOptions,
          openWhenHidden: !0,
          onopen: async (r) => {
            if ((this.verbose && console.log('Opened eventsource', r), r.ok)) {
              (this.errorCount = 0), this.onOpen && this.onOpen(), e();
              return;
            } else {
              const i = new Error('failed to open eventsource');
              t(i);
            }
          },
          onmessage: (r) => {
            if ((this.verbose && console.log('Received SSE: ', r), !r.id))
              return;
            const i = parseInt(r.id, 10);
            if (i <= this.lastHeardEventId) {
              console.log('dropping old or out-of-order event', {
                eventId: i,
                lastHeard: this.lastHeardEventId,
              });
              return;
            }
            if (
              ((this.lastHeardEventId = i),
              i - this.lastAcknowledgedEventId > 20 && this.ack(i),
              r.data && JSON.parse(r.data))
            ) {
              const s = JSON.parse(r.data);
              if (s.response === 'poke' && this.outstandingPokes.has(s.id)) {
                const l = this.outstandingPokes.get(s.id);
                s.hasOwnProperty('ok')
                  ? l.onSuccess()
                  : s.hasOwnProperty('err')
                  ? (console.error(s.err), l.onError(s.err))
                  : console.error('Invalid poke response', s),
                  this.outstandingPokes.delete(s.id);
              } else if (
                s.response === 'subscribe' &&
                this.outstandingSubscriptions.has(s.id)
              ) {
                const l = this.outstandingSubscriptions.get(s.id);
                s.hasOwnProperty('err') &&
                  (console.error(s.err),
                  l.err(s.err, s.id),
                  this.outstandingSubscriptions.delete(s.id));
              } else if (
                s.response === 'diff' &&
                this.outstandingSubscriptions.has(s.id)
              ) {
                const l = this.outstandingSubscriptions.get(s.id);
                try {
                  l.event(s.json, s.mark ?? 'json');
                } catch (o) {
                  console.error(
                    'Failed to call subscription event callback',
                    o
                  );
                }
              } else
                s.response === 'quit' && this.outstandingSubscriptions.has(s.id)
                  ? (this.outstandingSubscriptions.get(s.id).quit(s),
                    this.outstandingSubscriptions.delete(s.id))
                  : (console.log([...this.outstandingSubscriptions.keys()]),
                    console.log('Unrecognized response', s));
            }
          },
          onerror: (r) => {
            if ((console.warn(r), !(r instanceof ys) && this.errorCount++ < 4))
              return (
                this.onRetry && this.onRetry(),
                Math.pow(2, this.errorCount - 1) * 750
              );
            throw (this.onError && this.onError(r), r);
          },
          onclose: () => {
            throw (
              (console.log('e'),
              new Error('Ship unexpectedly closed the connection'))
            );
          },
        });
      })
    );
  }
  reset() {
    this.verbose && console.log('resetting'),
      this.delete(),
      this.abort.abort(),
      (this.abort = new AbortController()),
      (this.uid = `${Math.floor(Date.now() / 1e3)}-${gr(6)}`),
      (this.lastEventId = 0),
      (this.lastHeardEventId = -1),
      (this.lastAcknowledgedEventId = -1),
      (this.outstandingSubscriptions = new Map()),
      (this.outstandingPokes = new Map()),
      (this.sseClientInitialized = !1);
  }
  getEventId() {
    return ++this.lastEventId;
  }
  async ack(e) {
    this.lastAcknowledgedEventId = e;
    const t = { action: 'ack', 'event-id': e };
    return await this.sendJSONtoChannel(t), e;
  }
  async sendJSONtoChannel(...e) {
    if (
      !(
        await fetch(this.channelUrl, {
          ...this.fetchOptions,
          method: 'PUT',
          body: JSON.stringify(e),
        })
      ).ok
    )
      throw new Error('Failed to PUT channel');
    this.sseClientInitialized || (await this.eventSource());
  }
  async subscribeOnce(e, t, r) {
    return new Promise(async (i, s) => {
      let l = !1,
        o = null;
      const u = {
        app: e,
        path: t,
        event: (d) => {
          l || (i(d), this.unsubscribe(o));
        },
        err: s,
        quit: () => {
          l || s('quit');
        },
      };
      (o = await this.subscribe(u)),
        r &&
          setTimeout(() => {
            l || ((l = !0), s('timeout'), this.unsubscribe(o));
          }, r);
    });
  }
  async poke(e) {
    const {
        app: t,
        mark: r,
        json: i,
        ship: s,
        onSuccess: l,
        onError: o,
      } = { onSuccess: () => {}, onError: () => {}, ship: this.ship, ...e },
      a = {
        id: this.getEventId(),
        action: 'poke',
        ship: s,
        app: t,
        mark: r,
        json: i,
      },
      [c, u] = await Promise.all([
        this.sendJSONtoChannel(a),
        new Promise((d, f) => {
          this.outstandingPokes.set(a.id, {
            onSuccess: () => {
              l(), d(a.id);
            },
            onError: (p) => {
              o(p), f(p.err);
            },
          });
        }),
      ]);
    return u;
  }
  async subscribe(e) {
    const {
        app: t,
        path: r,
        ship: i,
        err: s,
        event: l,
        quit: o,
      } = {
        err: () => {},
        event: () => {},
        quit: () => {},
        ship: this.ship,
        ...e,
      },
      a = {
        id: this.getEventId(),
        action: 'subscribe',
        ship: i,
        app: t,
        path: r,
      };
    return (
      this.outstandingSubscriptions.set(a.id, {
        app: t,
        path: r,
        err: s,
        event: l,
        quit: o,
      }),
      await this.sendJSONtoChannel(a),
      a.id
    );
  }
  async unsubscribe(e) {
    return this.sendJSONtoChannel({
      id: this.getEventId(),
      action: 'unsubscribe',
      subscription: e,
    }).then(() => {
      this.outstandingSubscriptions.delete(e);
    });
  }
  delete() {
    Gt &&
      navigator.sendBeacon(
        this.channelUrl,
        JSON.stringify([{ action: 'delete' }])
      );
  }
  async scry(e) {
    const { app: t, path: r } = e,
      i = await fetch(`${this.url}/~/scry/${t}${r}.json`, this.fetchOptions);
    return i.ok ? await i.json() : Promise.reject(i);
  }
  async thread(e) {
    const {
      inputMark: t,
      outputMark: r,
      threadName: i,
      body: s,
      desk: l = this.desk,
    } = e;
    if (!l) throw new Error('Must supply desk to run thread from');
    return (
      await fetch(`${this.url}/spider/${l}/${t}/${i}/${r}.json`, {
        ...this.fetchOptions,
        method: 'POST',
        body: JSON.stringify(s),
      })
    ).json();
  }
  static async onArvoNetwork(e, t) {
    const r = `https://${e}.arvo.network`;
    return await Tt.authenticate({ ship: e, url: r, code: t });
  }
}
const ue = new Tt('', '', 'portal');
ue.ship = window.ship;
const ve = (n) => ue.poke(n),
  Qe = (n) => ue.scry(n),
  Ge = `~${ue.ship}`,
  qs = () => Qe({ app: 'portal-store', path: '/items' }),
  Es = () => Qe({ app: 'portal-graph', path: '/app/portal-store' }),
  As = () => Qe({ app: 'contacts', path: '/all' }),
  Ts = () =>
    Promise.all([
      Qe({ app: 'docket', path: '/charges' }),
      Qe({ app: 'hood', path: '/kiln/pikes' }),
    ]),
  Ps = () => Qe({ app: 'groups', path: '/groups' }),
  Ns = () => Qe({ app: 'pals', path: '/json' }),
  Is = (n) =>
    ve({
      app: 'pals',
      mark: 'pals-command',
      json: { meet: { ship: n, in: [] } },
    }),
  zs = (n) =>
    ve({
      app: 'pals',
      mark: 'pals-command',
      json: { part: { ship: n, in: [] } },
    }),
  Rs = (n) =>
    ve({
      app: 'groups',
      mark: 'group-join',
      json: { flag: n, 'join-all': !0 },
    }),
  Ds = (n) => ve({ app: 'groups', mark: 'group-leave', json: n }),
  Us = () => ve({ app: 'tower', mark: 'greg-event', json: { request: null } }),
  Ws = (n) => Me({ struc: 'feed', ship: n, time: '~2000.1.1', cord: '' }),
  Js = (n) => Me({ struc: 'collection', ship: n, time: '~2000.1.1', cord: '' }),
  Ys = (n) => {
    Xs(n), Ws(n), Js(n);
  },
  Ks = (n) => {
    let e = n.split('/');
    return Me({ struc: 'group', ship: e[0], cord: e[1], time: '' });
  },
  Me = (n) => {
    ve({
      app: 'portal-manager',
      mark: 'portal-action',
      json: { sub: { key: n } },
    });
  },
  Xs = (n) => {
    ve({ app: 'contacts', mark: 'contact-action', json: { heed: [n] } });
  },
  Qs = (n) => {
    const e = ue.subscribe({
      app: 'portal-store',
      path: '/updates',
      ship: ue.ship,
      verbose: !0,
      event: n,
      err: console.error,
      quit: console.error,
    });
    return () => (ue == null ? void 0 : ue.unsubscribe(e));
  },
  ea = (n) => {
    const e = ue.subscribe({
      app: 'portal-graph',
      path: '/updates',
      ship: ue.ship,
      verbose: !0,
      event: n,
      err: console.error,
      quit: console.error,
    });
    return () => (ue == null ? void 0 : ue.unsubscribe(e));
  },
  ta = (n) => {
    const e = ue.subscribe({
      app: 'contacts',
      path: '/news',
      ship: ue.ship,
      verbose: !0,
      event: n,
      err: console.error,
      quit: console.error,
    });
    return () => (ue == null ? void 0 : ue.unsubscribe(e));
  },
  ra = (n) => {
    const e = ue.subscribe({
      app: 'groups',
      path: '/groups',
      ship: ue.ship,
      verbose: !0,
      event: n,
      err: console.error,
      quit: console.error,
    });
    return () => (ue == null ? void 0 : ue.unsubscribe(e));
  },
  na = (n) => {
    const e = ue.subscribe({
      app: 'docket',
      path: '/charges',
      ship: ue.ship,
      verbose: !0,
      event: n,
      err: console.error,
      quit: console.error,
    });
    return () => (ue == null ? void 0 : ue.unsubscribe(e));
  },
  ia = (n) => {
    const e = ue.subscribe({
      app: 'tower',
      path: '/greg/local',
      ship: ue.ship,
      verbose: !0,
      event: n,
      err: console.error,
      quit: console.error,
    });
    return () => (ue == null ? void 0 : ue.unsubscribe(e));
  },
  jr = {
    indexer: '~worpet-bildet',
    googleAnalyticsId: 'G-HC9S8FMZ6C',
  },
  $e = (n) => {
    var e;
    return {
      title:
        la(n) ||
        ((e = n == null ? void 0 : n.keyObj) == null ? void 0 : e.cord),
      description: sa(n),
      blurb: aa(n),
      image: oa(n),
      cover: ca(n),
      ship: da(n),
      link: ua(n),
      color: fa(n),
      version: ha(n),
      hash: ma(n),
      servedFrom: pa(n),
      createdAt: ba(n),
      struc: ka(n),
      ref: ga(n),
      keyStr: n == null ? void 0 : n.keyStr,
    };
  },
  la = (n) => {
    var e, t, r, i, s, l, o, a;
    switch ((e = n == null ? void 0 : n.keyObj) == null ? void 0 : e.struc) {
      case 'app':
        return (r =
          (t = n == null ? void 0 : n.bespoke) == null ? void 0 : t.treaty) ==
          null
          ? void 0
          : r.title;
      case 'ship':
        return (i = n == null ? void 0 : n.bespoke) != null && i.nickname
          ? `${
              (s = n == null ? void 0 : n.bespoke) == null ? void 0 : s.nickname
            } (${
              (l = n == null ? void 0 : n.keyObj) == null ? void 0 : l.ship
            })`
          : (o = n == null ? void 0 : n.keyObj) == null
          ? void 0
          : o.ship;
      default:
        return (a = n == null ? void 0 : n.bespoke) == null ? void 0 : a.title;
    }
  },
  sa = (n) => {
    var e, t, r, i, s;
    switch ((e = n == null ? void 0 : n.keyObj) == null ? void 0 : e.struc) {
      case 'app':
        return (r =
          (t = n == null ? void 0 : n.bespoke) == null ? void 0 : t.treaty) ==
          null
          ? void 0
          : r.info;
      case 'ship':
        return (i = n == null ? void 0 : n.bespoke) == null ? void 0 : i.bio;
      default:
        return (s = n == null ? void 0 : n.bespoke) == null
          ? void 0
          : s.description;
    }
  },
  aa = (n) => {
    var e, t, r, i, s;
    switch ((e = n == null ? void 0 : n.keyObj) == null ? void 0 : e.struc) {
      case 'app':
        return (r =
          (t = n == null ? void 0 : n.bespoke) == null ? void 0 : t.treaty) ==
          null
          ? void 0
          : r.info;
      case 'ship':
        return (i = n == null ? void 0 : n.bespoke) == null ? void 0 : i.bio;
      default:
        return (s = n == null ? void 0 : n.bespoke) == null ? void 0 : s.blurb;
    }
  },
  oa = (n) => {
    var e, t, r, i, s;
    switch ((e = n == null ? void 0 : n.keyObj) == null ? void 0 : e.struc) {
      case 'app':
        return (r =
          (t = n == null ? void 0 : n.bespoke) == null ? void 0 : t.treaty) ==
          null
          ? void 0
          : r.image;
      case 'ship':
        return (i = n == null ? void 0 : n.bespoke) == null ? void 0 : i.avatar;
      default:
        return (s = n == null ? void 0 : n.bespoke) == null ? void 0 : s.image;
    }
  },
  ca = (n) => {
    var e, t;
    switch ((e = n == null ? void 0 : n.keyObj) == null ? void 0 : e.struc) {
      case 'app':
        return '';
      default:
        return (t = n == null ? void 0 : n.bespoke) == null ? void 0 : t.cover;
    }
  },
  ua = (n) => {
    var e, t, r, i;
    switch ((e = n == null ? void 0 : n.keyObj) == null ? void 0 : e.struc) {
      case 'app':
        return (r =
          (t = n == null ? void 0 : n.bespoke) == null ? void 0 : t.treaty) ==
          null
          ? void 0
          : r.website;
      default:
        return (i = n == null ? void 0 : n.bespoke) == null ? void 0 : i.link;
    }
  },
  da = (n) => {
    var e, t, r, i;
    switch ((e = n == null ? void 0 : n.keyObj) == null ? void 0 : e.struc) {
      case 'app':
        return (r =
          (t = n == null ? void 0 : n.bespoke) == null ? void 0 : t.treaty) ==
          null
          ? void 0
          : r.ship;
      default:
        return (i = n == null ? void 0 : n.keyObj) == null ? void 0 : i.ship;
    }
  },
  fa = (n) => {
    var e, t, r, i;
    switch ((e = n == null ? void 0 : n.keyObj) == null ? void 0 : e.struc) {
      case 'app':
        return (r =
          (t = n == null ? void 0 : n.bespoke) == null ? void 0 : t.treaty) ==
          null
          ? void 0
          : r.color;
      default:
        return (i = n == null ? void 0 : n.bespoke) == null ? void 0 : i.color;
    }
  },
  ha = (n) => {
    var e, t, r;
    switch ((e = n == null ? void 0 : n.keyObj) == null ? void 0 : e.struc) {
      case 'app':
        return (r =
          (t = n == null ? void 0 : n.bespoke) == null ? void 0 : t.treaty) ==
          null
          ? void 0
          : r.version;
      default:
        return '';
    }
  },
  ma = (n) => {
    var e, t, r;
    switch ((e = n == null ? void 0 : n.keyObj) == null ? void 0 : e.struc) {
      case 'app':
        return (r =
          (t = n == null ? void 0 : n.bespoke) == null ? void 0 : t.treaty) ==
          null
          ? void 0
          : r.hash;
      default:
        return '';
    }
  },
  pa = (n) => {
    var e, t, r, i, s, l, o, a;
    switch ((e = n == null ? void 0 : n.keyObj) == null ? void 0 : e.struc) {
      case 'app':
        return (
          ((i =
            (r =
              (t = n == null ? void 0 : n.bespoke) == null
                ? void 0
                : t.treaty) == null
              ? void 0
              : r.href) == null
            ? void 0
            : i.site) ||
          `/apps/${
            (a =
              (o =
                (l =
                  (s = n == null ? void 0 : n.bespoke) == null
                    ? void 0
                    : s.treaty) == null
                  ? void 0
                  : l.href) == null
                ? void 0
                : o.glob) == null
              ? void 0
              : a.base
          }`
        );
      default:
        return '';
    }
  },
  ba = (n) => {
    var e;
    return Ee((e = n == null ? void 0 : n.meta) == null ? void 0 : e.createdAt);
  },
  ka = (n) => {
    var e;
    return (e = n == null ? void 0 : n.keyObj) == null ? void 0 : e.struc;
  },
  ga = (n) => {
    var e;
    return (e = n == null ? void 0 : n.bespoke) == null ? void 0 : e.ref;
  },
  Or = (n) =>
    !!/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=,]*)$/g.test(
      n
    ),
  Ga = (n) => (+`0x1${n}` ^ 16777215).toString(16).slice(1).toUpperCase(),
  _a = (n) => {
    const e = new Date(n);
    return `~${e.getUTCFullYear()}.${e.getUTCMonth() + 1}.${e.getUTCDate()}..${
      e.getUTCHours() < 10 ? '0' + e.getUTCHours() : e.getUTCHours()
    }.${e.getUTCMinutes() < 10 ? '0' + e.getUTCMinutes() : e.getUTCMinutes()}.${
      e.getUTCSeconds() < 10 ? '0' + e.getUTCSeconds() : e.getUTCSeconds()
    }`;
  },
  Ee = (n) => {
    if (!n) return;
    const e = new Date().getTimezoneOffset() * 60 * 1e3;
    let t = n.split('.');
    return (
      new Date(t[0].substring(1), t[1] - 1, t[2], t[4], t[5], t[6]).getTime() -
      e
    );
  },
  Bl = (n) =>
    !n || n === '0x0' ? '000000' : n.replace('.', '').replace('0x', ''),
  va = (n) => {
    let e = parseInt(n, 16),
      t = (e >> 16) & 255,
      r = (e >> 8) & 255,
      i = (e >> 0) & 255;
    return 0.2126 * t + 0.7152 * r + 0.0722 * i > 128;
  },
  Pt = (n) => {
    if (!n) return !1;
    let e = '';
    /(^[~|\w])/i.test(n) ? (e = n) : (e = `~${n}`);
    let t = e.replace(/([~^-])/g, '');
    const r = (s) => {
        if (cr.p.includes(s[0]) && cr.s.includes(s[1])) return !0;
      },
      i = (s) => {
        let o = s
          .join('')
          .match(/(.{6})/g)
          .map((a) => a.match(/(.{3})/g));
        for (let a of o) if (!r(a)) return !1;
        return !0;
      };
    if (t.length > 2 && t.length < 49 && t.length % 3 === 0) {
      let s = t.match(/(.{3})/g);
      if (
        (s.length === 1 && cr.p.includes(s[0])) ||
        (s.length === 2 && r(s)) ||
        (s.length % 2 === 0 && i(s))
      )
        return e;
    } else return !1;
  },
  cr = {
    p: [
      'doz',
      'mar',
      'bin',
      'wan',
      'sam',
      'lit',
      'sig',
      'hid',
      'fid',
      'lis',
      'sog',
      'dir',
      'wac',
      'sab',
      'wis',
      'sib',
      'rig',
      'sol',
      'dop',
      'mod',
      'fog',
      'lid',
      'hop',
      'dar',
      'dor',
      'lor',
      'hod',
      'fol',
      'rin',
      'tog',
      'sil',
      'mir',
      'hol',
      'pas',
      'lac',
      'rov',
      'liv',
      'dal',
      'sat',
      'lib',
      'tab',
      'han',
      'tic',
      'pid',
      'tor',
      'bol',
      'fos',
      'dot',
      'los',
      'dil',
      'for',
      'pil',
      'ram',
      'tir',
      'win',
      'tad',
      'bic',
      'dif',
      'roc',
      'wid',
      'bis',
      'das',
      'mid',
      'lop',
      'ril',
      'nar',
      'dap',
      'mol',
      'san',
      'loc',
      'nov',
      'sit',
      'nid',
      'tip',
      'sic',
      'rop',
      'wit',
      'nat',
      'pan',
      'min',
      'rit',
      'pod',
      'mot',
      'tam',
      'tol',
      'sav',
      'pos',
      'nap',
      'nop',
      'som',
      'fin',
      'fon',
      'ban',
      'mor',
      'wor',
      'sip',
      'ron',
      'nor',
      'bot',
      'wic',
      'soc',
      'wat',
      'dol',
      'mag',
      'pic',
      'dav',
      'bid',
      'bal',
      'tim',
      'tas',
      'mal',
      'lig',
      'siv',
      'tag',
      'pad',
      'sal',
      'div',
      'dac',
      'tan',
      'sid',
      'fab',
      'tar',
      'mon',
      'ran',
      'nis',
      'wol',
      'mis',
      'pal',
      'las',
      'dis',
      'map',
      'rab',
      'tob',
      'rol',
      'lat',
      'lon',
      'nod',
      'nav',
      'fig',
      'nom',
      'nib',
      'pag',
      'sop',
      'ral',
      'bil',
      'had',
      'doc',
      'rid',
      'moc',
      'pac',
      'rav',
      'rip',
      'fal',
      'tod',
      'til',
      'tin',
      'hap',
      'mic',
      'fan',
      'pat',
      'tac',
      'lab',
      'mog',
      'sim',
      'son',
      'pin',
      'lom',
      'ric',
      'tap',
      'fir',
      'has',
      'bos',
      'bat',
      'poc',
      'hac',
      'tid',
      'hav',
      'sap',
      'lin',
      'dib',
      'hos',
      'dab',
      'bit',
      'bar',
      'rac',
      'par',
      'lod',
      'dos',
      'bor',
      'toc',
      'hil',
      'mac',
      'tom',
      'dig',
      'fil',
      'fas',
      'mit',
      'hob',
      'har',
      'mig',
      'hin',
      'rad',
      'mas',
      'hal',
      'rag',
      'lag',
      'fad',
      'top',
      'mop',
      'hab',
      'nil',
      'nos',
      'mil',
      'fop',
      'fam',
      'dat',
      'nol',
      'din',
      'hat',
      'nac',
      'ris',
      'fot',
      'rib',
      'hoc',
      'nim',
      'lar',
      'fit',
      'wal',
      'rap',
      'sar',
      'nal',
      'mos',
      'lan',
      'don',
      'dan',
      'lad',
      'dov',
      'riv',
      'bac',
      'pol',
      'lap',
      'tal',
      'pit',
      'nam',
      'bon',
      'ros',
      'ton',
      'fod',
      'pon',
      'sov',
      'noc',
      'sor',
      'lav',
      'mat',
      'mip',
      'fip',
    ],
    s: [
      'zod',
      'nec',
      'bud',
      'wes',
      'sev',
      'per',
      'sut',
      'let',
      'ful',
      'pen',
      'syt',
      'dur',
      'wep',
      'ser',
      'wyl',
      'sun',
      'ryp',
      'syx',
      'dyr',
      'nup',
      'heb',
      'peg',
      'lup',
      'dep',
      'dys',
      'put',
      'lug',
      'hec',
      'ryt',
      'tyv',
      'syd',
      'nex',
      'lun',
      'mep',
      'lut',
      'sep',
      'pes',
      'del',
      'sul',
      'ped',
      'tem',
      'led',
      'tul',
      'met',
      'wen',
      'byn',
      'hex',
      'feb',
      'pyl',
      'dul',
      'het',
      'mev',
      'rut',
      'tyl',
      'wyd',
      'tep',
      'bes',
      'dex',
      'sef',
      'wyc',
      'bur',
      'der',
      'nep',
      'pur',
      'rys',
      'reb',
      'den',
      'nut',
      'sub',
      'pet',
      'rul',
      'syn',
      'reg',
      'tyd',
      'sup',
      'sem',
      'wyn',
      'rec',
      'meg',
      'net',
      'sec',
      'mul',
      'nym',
      'tev',
      'web',
      'sum',
      'mut',
      'nyx',
      'rex',
      'teb',
      'fus',
      'hep',
      'ben',
      'mus',
      'wyx',
      'sym',
      'sel',
      'ruc',
      'dec',
      'wex',
      'syr',
      'wet',
      'dyl',
      'myn',
      'mes',
      'det',
      'bet',
      'bel',
      'tux',
      'tug',
      'myr',
      'pel',
      'syp',
      'ter',
      'meb',
      'set',
      'dut',
      'deg',
      'tex',
      'sur',
      'fel',
      'tud',
      'nux',
      'rux',
      'ren',
      'wyt',
      'nub',
      'med',
      'lyt',
      'dus',
      'neb',
      'rum',
      'tyn',
      'seg',
      'lyx',
      'pun',
      'res',
      'red',
      'fun',
      'rev',
      'ref',
      'mec',
      'ted',
      'rus',
      'bex',
      'leb',
      'dux',
      'ryn',
      'num',
      'pyx',
      'ryg',
      'ryx',
      'fep',
      'tyr',
      'tus',
      'tyc',
      'leg',
      'nem',
      'fer',
      'mer',
      'ten',
      'lus',
      'nus',
      'syl',
      'tec',
      'mex',
      'pub',
      'rym',
      'tuc',
      'fyl',
      'lep',
      'deb',
      'ber',
      'mug',
      'hut',
      'tun',
      'byl',
      'sud',
      'pem',
      'dev',
      'lur',
      'def',
      'bus',
      'bep',
      'run',
      'mel',
      'pex',
      'dyt',
      'byt',
      'typ',
      'lev',
      'myl',
      'wed',
      'duc',
      'fur',
      'fex',
      'nul',
      'luc',
      'len',
      'ner',
      'lex',
      'rup',
      'ned',
      'lec',
      'ryd',
      'lyd',
      'fen',
      'wel',
      'nyd',
      'hus',
      'rel',
      'rud',
      'nes',
      'hes',
      'fet',
      'des',
      'ret',
      'dun',
      'ler',
      'nyr',
      'seb',
      'hul',
      'ryl',
      'lud',
      'rem',
      'lys',
      'fyn',
      'wer',
      'ryc',
      'sug',
      'nys',
      'nyl',
      'lyn',
      'dyn',
      'dem',
      'lux',
      'fed',
      'sed',
      'bec',
      'mun',
      'lyr',
      'tes',
      'mud',
      'nyt',
      'byr',
      'sen',
      'weg',
      'fyr',
      'mur',
      'tel',
      'rep',
      'teg',
      'pec',
      'nel',
      'nev',
      'fes',
    ],
  },
  ne = Qt({}),
  Ba = () => {
    qs().then(({ items: n }) => {
      ne.update(
        (e) => (
          n.forEach((t) => {
            e[t.keyStr] = t;
          }),
          (e.isLoaded = !0),
          e
        )
      );
    });
  },
  ya = () => {
    Es().then((n) => {
      console.log({ social: n.app }), ne.update((e) => ((e.social = n.app), e));
    });
  },
  wa = () => {
    As().then((n) => {
      ne.update((e) => ((e.profiles = n), e));
    });
  },
  Nt = () => {
    Ps().then((n) => {
      let e = {};
      ne.update(
        (t) => (
          Object.entries(n || {}).forEach((r) => {
            let [i, s] = r,
              {
                meta: { title: l },
              } = s;
            l || (r[1].joining = !0), t[`/group/${i}/`] || Ks(i), (e[i] = s);
          }),
          (t.groups = e),
          t
        )
      );
    });
  },
  It = () => {
    const n = ['base', 'garden', 'groups', 'kids', 'landscape', 'webterm'];
    Ts().then(([{ initial: e }, t]) => {
      let r = {};
      ne.update(
        (i) => (
          Object.entries(e).forEach(([s, l]) => {
            var o, a;
            n.includes(s) ||
              ((l.ship =
                (a = (o = t[s]) == null ? void 0 : o.sync) == null
                  ? void 0
                  : a.ship),
              l.ship && (r[s] = l));
          }),
          (i.apps = r),
          i
        )
      );
    });
  },
  Gr = async () => {
    try {
      const n = await Ns();
      ne.update((e) => ((e.pals = n.outgoing), (e.palsLoaded = !0), e));
    } catch {
      ne.update((e) => ((e.palsLoaded = !0), e));
    }
  },
  Ca = () => {
    Us();
  },
  Re = (n) => {
    var e, t;
    return {
      keyObj: { ship: n, struc: 'ship', cord: '', time: '' },
      bespoke: {
        ...((t = (e = He(ne)) == null ? void 0 : e.profiles) == null
          ? void 0
          : t[n]),
      },
    };
  },
  yl = (n) => {
    var e, t, r;
    return (r =
      (t = (e = He(ne)[Oa(n)]) == null ? void 0 : e.bespoke) == null
        ? void 0
        : t.feed) == null
      ? void 0
      : r.sort((i, s) => Ee(s.time) - Ee(i.time));
  },
  dn = () => {
    var n, e, t;
    return (t =
      (e = (n = He(ne)[Sa(jr.indexer)]) == null ? void 0 : n.bespoke) == null
        ? void 0
        : e.feed) == null
      ? void 0
      : t.sort((r, i) => Ee(i.time) - Ee(r.time));
  },
  _r = (n) => {
    var e, t, r, i, s, l;
    return (l =
      (s =
        (i =
          (r =
            (t = (e = He(ne)[Ha(n)]) == null ? void 0 : e.bespoke) == null
              ? void 0
              : t['key-list']) == null
            ? void 0
            : r.filter((o) => o.struc === 'collection')) == null
          ? void 0
          : i.filter((o) => o.time !== '~2000.1.1')) == null
        ? void 0
        : s.filter((o) => o.time !== 'index')) == null
      ? void 0
      : l.filter((o) => o.time !== 'all');
  },
  $a = (n) => Sr(ja(n)),
  Ma = (n) => He(ne)[`/group/${n}/`],
  ye = (n) => He(ne)[n],
  Sr = (n) => {
    var e, t;
    return (t = (e = He(ne)[n]) == null ? void 0 : e.bespoke) == null
      ? void 0
      : t['key-list'];
  },
  Fa = (n) => {
    var e;
    return (e = He(ne).groups) == null ? void 0 : e[n];
  },
  xa = (n, e) => {
    var t;
    return Object.entries(
      ((t = He(ne).social) == null ? void 0 : t[`/${n}/reply-to`]) || {}
    )
      .filter(([r, i]) => i.find((s) => ke(s) === ke(e)))
      .map(([r, i]) => we(r));
  },
  La = (n, e) => {
    var t, r;
    return (r = (t = He(ne).social) == null ? void 0 : t[`/${n}/reply-from`]) ==
      null
      ? void 0
      : r[ke(e)];
  },
  mt = (n, e) => {
    switch ((console.log({ event: n, type: e }), e)) {
      case 'portal-update':
        ne.update((t) => ((t[n.keyStr] = n), t));
        break;
      case 'social-graph-result':
        ne.update((t) => {
          for (let r in n.app)
            for (let i in n.app[r])
              t.social[r] || (t.social[r] = {}),
                t.social[r][i] || (t.social[r][i] = []),
                (t.social[r][i] = [...t.social[r][i], ...n.app[r][i]]);
          return t;
        });
        break;
      case 'contact-news':
        ne.update((t) => ((t.profiles[n.who] = n.con), t));
        break;
      case 'charge-update':
        It();
        break;
      case 'group-action-0':
        Nt();
        break;
      case 'greg-event':
        ne.update((t) => ((t.radioStations = n.response), t));
        break;
    }
  },
  Za = (n) => {
    const e = n.split('/');
    return `/group/${e[0]}/${e[1]}/`;
  },
  ke = ({ struc: n, ship: e, cord: t, time: r }) => `/${n}/${e}/${t}/${r}`,
  we = (n) => {
    const e = n.split('/');
    return { struc: e[1], ship: e[2], cord: e[3], time: e[4] };
  },
  Ha = (n) => `/collection/${n}//~2000.1.1`,
  ja = (n) => `/collection/${n}//all`,
  Oa = (n) => `/feed/${n}//~2000.1.1`,
  Sa = (n) => `/feed/${n}//global`,
  Va = () => {
    Ba(), ya(), wa(), It(), Nt(), Gr(), Ca();
  };
Va();
class qa extends Q {
  constructor(e) {
    super(), X(this, e, null, null, K, {});
  }
}
const wl = '/apps/portal/assets/placeholder-f136943d.svg';
function Ea(n) {
  let e,
    t =
      (n[1]
        ? n[1].toLowerCase().split('').filter(fn).join('').slice(0, 1)
        : '') + '',
    r;
  return {
    c() {
      (e = _('div')),
        (r = E(t)),
        h(
          e,
          'class',
          'absolute top-0 left-0 flex items-center justify-center text-xs md:text-2xl text-clip w-full h-full'
        ),
        jt(e, 'background-color', '#' + (n[2] || '000000')),
        jt(e, 'color', '#' + (n[3] || '000000'));
    },
    m(i, s) {
      B(i, e, s), b(e, r);
    },
    p(i, s) {
      s & 2 &&
        t !==
          (t =
            (i[1]
              ? i[1].toLowerCase().split('').filter(fn).join('').slice(0, 1)
              : '') + '') &&
        ae(r, t),
        s & 4 && jt(e, 'background-color', '#' + (i[2] || '000000')),
        s & 8 && jt(e, 'color', '#' + (i[3] || '000000'));
    },
    d(i) {
      i && v(e);
    },
  };
}
function Aa(n) {
  let e, t;
  return {
    c() {
      (e = _('img')),
        Ye(e.src, (t = n[0])) || h(e, 'src', t),
        h(e, 'class', 'w-full h-full object-cover absolute top-0 left-0'),
        h(e, 'alt', n[1]);
    },
    m(r, i) {
      B(r, e, i);
    },
    p(r, i) {
      i & 1 && !Ye(e.src, (t = r[0])) && h(e, 'src', t),
        i & 2 && h(e, 'alt', r[1]);
    },
    d(r) {
      r && v(e);
    },
  };
}
function Ta(n) {
  let e, t, r, i, s, l, o;
  function a(d, f) {
    return f & 1 && (s = null), s == null && (s = !!Or(d[0])), s ? Aa : Ea;
  }
  let c = a(n, -1),
    u = c(n);
  return {
    c() {
      (e = _('div')),
        (t = _('img')),
        (i = $()),
        u.c(),
        h(t, 'alt', 'n/a'),
        Ye(t.src, (r = wl)) || h(t, 'src', r),
        h(t, 'class', 'w-full h-full object-cover'),
        h(e, 'class', 'relative h-full');
    },
    m(d, f) {
      B(d, e, f),
        b(e, t),
        b(e, i),
        u.m(e, null),
        l || ((o = te(t, 'load', n[5])), (l = !0));
    },
    p(d, [f]) {
      c === (c = a(d, f)) && u
        ? u.p(d, f)
        : (u.d(1), (u = c(d)), u && (u.c(), u.m(e, null)));
    },
    i: j,
    o: j,
    d(d) {
      d && v(e), u.d(), (l = !1), o();
    },
  };
}
const fn = (n) => /^[a-z0-9]+$/i.test(n);
function Pa(n, e, t) {
  let { image: r, title: i, color: s } = e,
    l,
    o;
  function a(c) {
    Ke.call(this, n, c);
  }
  return (
    (n.$$set = (c) => {
      'image' in c && t(0, (r = c.image)),
        'title' in c && t(1, (i = c.title)),
        'color' in c && t(4, (s = c.color));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 20 && (t(2, (l = Bl(s))), t(3, (o = Ga(l))));
    }),
    [r, i, l, o, s, a]
  );
}
class je extends Q {
  constructor(e) {
    super(), X(this, e, Pa, Ta, K, { image: 0, title: 1, color: 4 });
  }
}
var yt = new Map();
function Na(n) {
  var e = yt.get(n);
  e && e.destroy();
}
function Ia(n) {
  var e = yt.get(n);
  e && e.update();
}
var _t = null;
typeof window > 'u'
  ? (((_t = function (n) {
      return n;
    }).destroy = function (n) {
      return n;
    }),
    (_t.update = function (n) {
      return n;
    }))
  : (((_t = function (n, e) {
      return (
        n &&
          Array.prototype.forEach.call(n.length ? n : [n], function (t) {
            return (function (r) {
              if (r && r.nodeName && r.nodeName === 'TEXTAREA' && !yt.has(r)) {
                var i,
                  s = null,
                  l = window.getComputedStyle(r),
                  o =
                    ((i = r.value),
                    function () {
                      c({
                        testForHeightReduction:
                          i === '' || !r.value.startsWith(i),
                        restoreTextAlign: null,
                      }),
                        (i = r.value);
                    }),
                  a = function (d) {
                    r.removeEventListener('autosize:destroy', a),
                      r.removeEventListener('autosize:update', u),
                      r.removeEventListener('input', o),
                      window.removeEventListener('resize', u),
                      Object.keys(d).forEach(function (f) {
                        return (r.style[f] = d[f]);
                      }),
                      yt.delete(r);
                  }.bind(r, {
                    height: r.style.height,
                    resize: r.style.resize,
                    textAlign: r.style.textAlign,
                    overflowY: r.style.overflowY,
                    overflowX: r.style.overflowX,
                    wordWrap: r.style.wordWrap,
                  });
                r.addEventListener('autosize:destroy', a),
                  r.addEventListener('autosize:update', u),
                  r.addEventListener('input', o),
                  window.addEventListener('resize', u),
                  (r.style.overflowX = 'hidden'),
                  (r.style.wordWrap = 'break-word'),
                  yt.set(r, { destroy: a, update: u }),
                  u();
              }
              function c(d) {
                var f,
                  p,
                  m = d.restoreTextAlign,
                  k = m === void 0 ? null : m,
                  y = d.testForHeightReduction,
                  w = y === void 0 || y,
                  M = l.overflowY;
                if (
                  r.scrollHeight !== 0 &&
                  (l.resize === 'vertical'
                    ? (r.style.resize = 'none')
                    : l.resize === 'both' && (r.style.resize = 'horizontal'),
                  w &&
                    ((f = (function (S) {
                      for (
                        var H = [];
                        S && S.parentNode && S.parentNode instanceof Element;

                      )
                        S.parentNode.scrollTop &&
                          H.push([S.parentNode, S.parentNode.scrollTop]),
                          (S = S.parentNode);
                      return function () {
                        return H.forEach(function (O) {
                          var Z = O[0],
                            V = O[1];
                          (Z.style.scrollBehavior = 'auto'),
                            (Z.scrollTop = V),
                            (Z.style.scrollBehavior = null);
                        });
                      };
                    })(r)),
                    (r.style.height = '')),
                  (p =
                    l.boxSizing === 'content-box'
                      ? r.scrollHeight -
                        (parseFloat(l.paddingTop) + parseFloat(l.paddingBottom))
                      : r.scrollHeight +
                        parseFloat(l.borderTopWidth) +
                        parseFloat(l.borderBottomWidth)),
                  l.maxHeight !== 'none' && p > parseFloat(l.maxHeight)
                    ? (l.overflowY === 'hidden' &&
                        (r.style.overflow = 'scroll'),
                      (p = parseFloat(l.maxHeight)))
                    : l.overflowY !== 'hidden' && (r.style.overflow = 'hidden'),
                  (r.style.height = p + 'px'),
                  k && (r.style.textAlign = k),
                  f && f(),
                  s !== p &&
                    (r.dispatchEvent(
                      new Event('autosize:resized', { bubbles: !0 })
                    ),
                    (s = p)),
                  M !== l.overflow && !k)
                ) {
                  var C = l.textAlign;
                  l.overflow === 'hidden' &&
                    (r.style.textAlign = C === 'start' ? 'end' : 'start'),
                    c({ restoreTextAlign: C, testForHeightReduction: !0 });
                }
              }
              function u() {
                c({ testForHeightReduction: !0, restoreTextAlign: null });
              }
            })(t);
          }),
        n
      );
    }).destroy = function (n) {
      return n && Array.prototype.forEach.call(n.length ? n : [n], Na), n;
    }),
    (_t.update = function (n) {
      return n && Array.prototype.forEach.call(n.length ? n : [n], Ia), n;
    }));
var zt = _t;
const er = (n) => (
  zt(n),
  {
    destroy() {
      zt.destroy(n);
    },
  }
);
er.update = zt.update;
er.destroy = zt.destroy;
function za(n) {
  let e,
    t,
    r,
    i,
    s = [
      n[2],
      {
        class:
          'p-2 w-full text-lg h-full placeholder-grey resize-none leading-tight box-border break-words border-b focus:outline-none',
      },
    ],
    l = {};
  for (let o = 0; o < s.length; o += 1) l = Ve(l, s[o]);
  return {
    c() {
      (e = _('div')),
        (t = _('textarea')),
        en(t, l),
        D(t, 'svelte-1bd7snw', !0),
        h(e, 'class', 'relative');
    },
    m(o, a) {
      B(o, e, a),
        b(e, t),
        t.autofocus && t.focus(),
        n[3](t),
        pe(t, n[0]),
        r || ((i = [qe(er.call(null, t)), te(t, 'input', n[4])]), (r = !0));
    },
    p(o, [a]) {
      en(
        t,
        (l = Xt(s, [
          a & 4 && o[2],
          {
            class:
              'p-2 w-full text-lg h-full placeholder-grey resize-none leading-tight box-border break-words border-b focus:outline-none',
          },
        ]))
      ),
        a & 1 && pe(t, o[0]),
        D(t, 'svelte-1bd7snw', !0);
    },
    i: j,
    o: j,
    d(o) {
      o && v(e), n[3](null), (r = !1), ge(i);
    },
  };
}
function Ra(n, e, t) {
  let { value: r = '' } = e,
    i;
  const s = async () => {
    await Wt(), er.update(i);
  };
  function l(a) {
    ce[a ? 'unshift' : 'push'](() => {
      (i = a), t(1, i);
    });
  }
  function o() {
    (r = this.value), t(0, r);
  }
  return (
    (n.$$set = (a) => {
      t(2, (e = Ve(Ve({}, e), St(a)))), 'value' in a && t(0, (r = a.value));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 1 && r === '' && s();
    }),
    (e = St(e)),
    [r, i, e, l, o]
  );
}
class pt extends Q {
  constructor(e) {
    super(), X(this, e, Ra, za, K, { value: 0 });
  }
}
function hn(n, e, t) {
  const r = n.slice();
  return (r[3] = e[t]), r;
}
function mn(n) {
  let e,
    t = n[3] + '',
    r,
    i,
    s,
    l;
  function o() {
    return n[2](n[3]);
  }
  return {
    c() {
      (e = _('button')),
        (r = E(t)),
        (i = $()),
        h(
          e,
          'class',
          'cursor-pointer text-lg hover:text-black font-saucebold hover:duration-500'
        ),
        D(e, 'border-b-black', n[0] === n[3]),
        D(e, 'border-b-2', n[0] === n[3]),
        D(e, 'text-black', n[0] === n[3]),
        D(e, 'text-grey', n[0] !== n[3]);
    },
    m(a, c) {
      B(a, e, c), b(e, r), b(e, i), s || ((l = te(e, 'click', o)), (s = !0));
    },
    p(a, c) {
      (n = a),
        c & 2 && t !== (t = n[3] + '') && ae(r, t),
        c & 3 && D(e, 'border-b-black', n[0] === n[3]),
        c & 3 && D(e, 'border-b-2', n[0] === n[3]),
        c & 3 && D(e, 'text-black', n[0] === n[3]),
        c & 3 && D(e, 'text-grey', n[0] !== n[3]);
    },
    d(a) {
      a && v(e), (s = !1), l();
    },
  };
}
function Da(n) {
  let e,
    t = n[1],
    r = [];
  for (let i = 0; i < t.length; i += 1) r[i] = mn(hn(n, t, i));
  return {
    c() {
      e = _('div');
      for (let i = 0; i < r.length; i += 1) r[i].c();
      h(e, 'class', 'flex gap-4 border-b');
    },
    m(i, s) {
      B(i, e, s);
      for (let l = 0; l < r.length; l += 1) r[l] && r[l].m(e, null);
    },
    p(i, [s]) {
      if (s & 3) {
        t = i[1];
        let l;
        for (l = 0; l < t.length; l += 1) {
          const o = hn(i, t, l);
          r[l] ? r[l].p(o, s) : ((r[l] = mn(o)), r[l].c(), r[l].m(e, null));
        }
        for (; l < r.length; l += 1) r[l].d(1);
        r.length = t.length;
      }
    },
    i: j,
    o: j,
    d(i) {
      i && v(e), _e(r, i);
    },
  };
}
function Ua(n, e, t) {
  let { tabs: r, activeTab: i } = e;
  const s = (l) => t(0, (i = l));
  return (
    (n.$$set = (l) => {
      'tabs' in l && t(1, (r = l.tabs)),
        'activeTab' in l && t(0, (i = l.activeTab));
    }),
    [i, r, s]
  );
}
class Cl extends Q {
  constructor(e) {
    super(), X(this, e, Ua, Da, K, { tabs: 1, activeTab: 0 });
  }
}
function pn(n) {
  let e, t, r, i, s, l, o, a;
  const c = n[2].default,
    u = rt(c, n, n[1], null);
  return {
    c() {
      (e = _('div')),
        (t = $()),
        (r = _('div')),
        (i = _('div')),
        (s = _('div')),
        u && u.c(),
        h(
          e,
          'class',
          'fixed top-0 left-0 h-screen w-screen z-20 bg-grey justify-center items-center opacity-70 backdrop-blur-xl'
        ),
        h(s, 'class', 'w-full h-full p-4 relative'),
        h(
          i,
          'class',
          'inline justify-center items-center min-w-full md:min-w-[45rem] max-w-screen-lg max-h-screen md:max-h-[40rem] overflow-y-auto opacity-100 bg-offwhite rounded-2xl'
        ),
        h(
          r,
          'class',
          'fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-30'
        );
    },
    m(d, f) {
      B(d, e, f),
        B(d, t, f),
        B(d, r, f),
        b(r, i),
        b(i, s),
        u && u.m(s, null),
        (l = !0),
        o || ((a = [te(i, 'click', Zr(n[3])), te(r, 'click', n[4])]), (o = !0));
    },
    p(d, f) {
      u &&
        u.p &&
        (!l || f & 2) &&
        it(u, c, d, d[1], l ? nt(c, d[1], f, null) : lt(d[1]), null);
    },
    i(d) {
      l || (g(u, d), (l = !0));
    },
    o(d) {
      G(u, d), (l = !1);
    },
    d(d) {
      d && v(e), d && v(t), d && v(r), u && u.d(d), (o = !1), ge(a);
    },
  };
}
function Wa(n) {
  let e,
    t,
    r = n[0] && pn(n);
  return {
    c() {
      r && r.c(), (e = se());
    },
    m(i, s) {
      r && r.m(i, s), B(i, e, s), (t = !0);
    },
    p(i, [s]) {
      i[0]
        ? r
          ? (r.p(i, s), s & 1 && g(r, 1))
          : ((r = pn(i)), r.c(), g(r, 1), r.m(e.parentNode, e))
        : r &&
          (P(),
          G(r, 1, 1, () => {
            r = null;
          }),
          N());
    },
    i(i) {
      t || (g(r), (t = !0));
    },
    o(i) {
      G(r), (t = !1);
    },
    d(i) {
      r && r.d(i), i && v(e);
    },
  };
}
function Ja(n, e, t) {
  let { $$slots: r = {}, $$scope: i } = e,
    { open: s = !1 } = e;
  function l(a) {
    Ke.call(this, n, a);
  }
  const o = () => t(0, (s = !1));
  return (
    (n.$$set = (a) => {
      'open' in a && t(0, (s = a.open)),
        '$$scope' in a && t(1, (i = a.$$scope));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 1 &&
        (s
          ? (document.body.classList.add('overflow-hidden'),
            document.getElementById('app').classList.add('overflow-hidden'))
          : (document.body.classList.remove('overflow-hidden'),
            document
              .getElementById('app')
              .classList.remove('overflow-hidden')));
    }),
    [s, i, r, l, o]
  );
}
class et extends Q {
  constructor(e) {
    super(), X(this, e, Ja, Wa, K, { open: 0 });
  }
}
function bn(n) {
  let e, t, r, i, s, l, o;
  const a = [Ka, Ya],
    c = [];
  function u(m, k) {
    return m[2] ? 1 : 0;
  }
  (t = u(n)), (r = c[t] = a[t](n));
  const d = [eo, Qa],
    f = [];
  function p(m, k) {
    return m[1] ? 1 : 0;
  }
  return (
    (s = p(n)),
    (l = f[s] = d[s](n)),
    {
      c() {
        (e = _('div')),
          r.c(),
          (i = $()),
          l.c(),
          h(e, 'class', 'flex justify-between w-full');
      },
      m(m, k) {
        B(m, e, k), c[t].m(e, null), b(e, i), f[s].m(e, null), (o = !0);
      },
      p(m, k) {
        let y = t;
        (t = u(m)),
          t === y
            ? c[t].p(m, k)
            : (P(),
              G(c[y], 1, 1, () => {
                c[y] = null;
              }),
              N(),
              (r = c[t]),
              r ? r.p(m, k) : ((r = c[t] = a[t](m)), r.c()),
              g(r, 1),
              r.m(e, i));
        let w = s;
        (s = p(m)),
          s === w
            ? f[s].p(m, k)
            : (P(),
              G(f[w], 1, 1, () => {
                f[w] = null;
              }),
              N(),
              (l = f[s]),
              l ? l.p(m, k) : ((l = f[s] = d[s](m)), l.c()),
              g(l, 1),
              l.m(e, null));
      },
      i(m) {
        o || (g(r), g(l), (o = !0));
      },
      o(m) {
        G(r), G(l), (o = !1);
      },
      d(m) {
        m && v(e), c[t].d(), f[s].d();
      },
    }
  );
}
function Ya(n) {
  let e;
  return {
    c() {
      e = _('div');
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    i: j,
    o: j,
    d(t) {
      t && v(e);
    },
  };
}
function Ka(n) {
  let e, t;
  return (
    (e = new le({
      props: { icon: Ue, $$slots: { default: [Xa] }, $$scope: { ctx: n } },
    })),
    e.$on('click', n[3]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 512 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function Xa(n) {
  let e;
  return {
    c() {
      e = E('Back');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function Qa(n) {
  let e, t;
  return (
    (e = new le({
      props: { icon: We, $$slots: { default: [to] }, $$scope: { ctx: n } },
    })),
    e.$on('click', n[5]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 512 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function eo(n) {
  let e, t;
  return (
    (e = new le({
      props: { icon: Ao, $$slots: { default: [ro] }, $$scope: { ctx: n } },
    })),
    e.$on('click', n[4]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 512 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function to(n) {
  let e;
  return {
    c() {
      e = E('Save');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function ro(n) {
  let e;
  return {
    c() {
      e = E('Next');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function no(n) {
  let e, t, r;
  const i = n[8].default,
    s = rt(i, n, n[9], null);
  let l = n[0] && bn(n);
  return {
    c() {
      (e = _('div')),
        s && s.c(),
        (t = $()),
        l && l.c(),
        h(e, 'class', 'flex flex-col h-full justify-between gap-4');
    },
    m(o, a) {
      B(o, e, a), s && s.m(e, null), b(e, t), l && l.m(e, null), (r = !0);
    },
    p(o, [a]) {
      s &&
        s.p &&
        (!r || a & 512) &&
        it(s, i, o, o[9], r ? nt(i, o[9], a, null) : lt(o[9]), null),
        o[0]
          ? l
            ? (l.p(o, a), a & 1 && g(l, 1))
            : ((l = bn(o)), l.c(), g(l, 1), l.m(e, null))
          : l &&
            (P(),
            G(l, 1, 1, () => {
              l = null;
            }),
            N());
    },
    i(o) {
      r || (g(s, o), g(l), (r = !0));
    },
    o(o) {
      G(s, o), G(l), (r = !1);
    },
    d(o) {
      o && v(e), s && s.d(o), l && l.d();
    },
  };
}
function io(n, e, t) {
  let { $$slots: r = {}, $$scope: i } = e;
  const s = ht();
  let { formstep: l } = e,
    { formsteps: o } = e,
    { navbuttons: a = !0 } = e,
    c,
    u;
  const d = () => {
      t(6, (l = o[o.indexOf(l) - 1]));
    },
    f = () => {
      t(6, (l = o[o.indexOf(l) + 1]));
    },
    p = () => {
      s('save');
    };
  return (
    (n.$$set = (m) => {
      'formstep' in m && t(6, (l = m.formstep)),
        'formsteps' in m && t(7, (o = m.formsteps)),
        'navbuttons' in m && t(0, (a = m.navbuttons)),
        '$$scope' in m && t(9, (i = m.$$scope));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 192 && t(1, (c = o.indexOf(l) === o.length - 1)),
        n.$$.dirty & 192 && t(2, (u = o.indexOf(l) === 0));
    }),
    [a, c, u, d, f, p, l, o, r, i]
  );
}
class Vr extends Q {
  constructor(e) {
    super(),
      X(this, e, io, no, K, { formstep: 6, formsteps: 7, navbuttons: 0 });
  }
}
function lo(n) {
  let e, t, r, i, s, l, o, a, c, u, d, f, p, m, k, y, w, M, C, S, H, O, Z, V;
  function A(z) {
    n[2](z);
  }
  let q = { type: 'text' };
  return (
    n[0].blurb !== void 0 && (q.value = n[0].blurb),
    (u = new pt({ props: q })),
    ce.push(() => he(u, 'value', A)),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          (r = _('div')),
          (r.textContent = 'Title'),
          (i = $()),
          (s = _('input')),
          (l = $()),
          (o = _('div')),
          (a = _('div')),
          (a.textContent = 'Description'),
          (c = $()),
          L(u.$$.fragment),
          (f = $()),
          (p = _('div')),
          (m = _('div')),
          (m.textContent = 'Image URL'),
          (k = $()),
          (y = _('input')),
          (w = $()),
          (M = _('div')),
          (C = _('div')),
          (C.textContent = 'Link URL'),
          (S = $()),
          (H = _('input')),
          h(s, 'type', 'text'),
          h(s, 'class', 'p-2 border-b'),
          h(t, 'class', 'col-span-12 flex flex-col gap-2'),
          h(o, 'class', 'col-span-6 flex flex-col gap-2'),
          h(y, 'type', 'text'),
          h(y, 'class', 'p-2 border-b'),
          h(p, 'class', 'col-span-12 flex flex-col gap-2'),
          h(H, 'type', 'text'),
          h(H, 'class', 'p-2 border-b'),
          h(M, 'class', 'col-span-12 flex flex-col gap-2'),
          h(e, 'class', 'grid grid-cols-12 gap-4');
      },
      m(z, U) {
        B(z, e, U),
          b(e, t),
          b(t, r),
          b(t, i),
          b(t, s),
          pe(s, n[0].title),
          b(e, l),
          b(e, o),
          b(o, a),
          b(o, c),
          F(u, o, null),
          b(e, f),
          b(e, p),
          b(p, m),
          b(p, k),
          b(p, y),
          pe(y, n[0].image),
          b(e, w),
          b(e, M),
          b(M, C),
          b(M, S),
          b(M, H),
          pe(H, n[0].link),
          (O = !0),
          Z ||
            ((V = [
              te(s, 'input', n[1]),
              te(y, 'input', n[3]),
              te(H, 'input', n[4]),
            ]),
            (Z = !0));
      },
      p(z, [U]) {
        U & 1 && s.value !== z[0].title && pe(s, z[0].title);
        const J = {};
        !d && U & 1 && ((d = !0), (J.value = z[0].blurb), fe(() => (d = !1))),
          u.$set(J),
          U & 1 && y.value !== z[0].image && pe(y, z[0].image),
          U & 1 && H.value !== z[0].link && pe(H, z[0].link);
      },
      i(z) {
        O || (g(u.$$.fragment, z), (O = !0));
      },
      o(z) {
        G(u.$$.fragment, z), (O = !1);
      },
      d(z) {
        z && v(e), x(u), (Z = !1), ge(V);
      },
    }
  );
}
function so(n, e, t) {
  let { item: r = { title: '', blurb: '', image: '', link: '' } } = e;
  function i() {
    (r.title = this.value), t(0, r);
  }
  function s(a) {
    n.$$.not_equal(r.blurb, a) && ((r.blurb = a), t(0, r));
  }
  function l() {
    (r.image = this.value), t(0, r);
  }
  function o() {
    (r.link = this.value), t(0, r);
  }
  return (
    (n.$$set = (a) => {
      'item' in a && t(0, (r = a.item));
    }),
    [r, i, s, l, o]
  );
}
class qr extends Q {
  constructor(e) {
    super(), X(this, e, so, lo, K, { item: 0 });
  }
}
function ao(n) {
  let e, t;
  const r = n[1].default,
    i = rt(r, n, n[0], null);
  return {
    c() {
      (e = _('div')),
        i && i.c(),
        h(e, 'class', 'hidden md:flex md:col-span-3 flex-col gap-8');
    },
    m(s, l) {
      B(s, e, l), i && i.m(e, null), (t = !0);
    },
    p(s, [l]) {
      i &&
        i.p &&
        (!t || l & 1) &&
        it(i, r, s, s[0], t ? nt(r, s[0], l, null) : lt(s[0]), null);
    },
    i(s) {
      t || (g(i, s), (t = !0));
    },
    o(s) {
      G(i, s), (t = !1);
    },
    d(s) {
      s && v(e), i && i.d(s);
    },
  };
}
function oo(n, e, t) {
  let { $$slots: r = {}, $$scope: i } = e;
  return (
    (n.$$set = (s) => {
      '$$scope' in s && t(0, (i = s.$$scope));
    }),
    [i, r]
  );
}
class De extends Q {
  constructor(e) {
    super(), X(this, e, oo, ao, K, {});
  }
}
function $l(n) {
  const e = n - 1;
  return e * e * e + 1;
}
function co(n, { from: e, to: t }, r = {}) {
  const i = getComputedStyle(n),
    s = i.transform === 'none' ? '' : i.transform,
    [l, o] = i.transformOrigin.split(' ').map(parseFloat),
    a = e.left + (e.width * l) / t.width - (t.left + l),
    c = e.top + (e.height * o) / t.height - (t.top + o),
    {
      delay: u = 0,
      duration: d = (p) => Math.sqrt(p) * 120,
      easing: f = $l,
    } = r;
  return {
    delay: u,
    duration: tt(d) ? d(Math.sqrt(a * a + c * c)) : d,
    easing: f,
    css: (p, m) => {
      const k = m * a,
        y = m * c,
        w = p + (m * e.width) / t.width,
        M = p + (m * e.height) / t.height;
      return `transform: ${s} translate(${k}px, ${y}px) scale(${w}, ${M});`;
    },
  };
}
function kn(n, e, t) {
  const r = n.slice();
  return (r[10] = e[t]), (r[12] = t), r;
}
const uo = (n) => ({ item: n & 1 }),
  gn = (n) => ({ item: n[10] });
function Gn(n, e) {
  let t,
    r,
    i,
    s = j,
    l,
    o,
    a;
  const c = e[6].default,
    u = rt(c, e, e[5], gn);
  function d(...m) {
    return e[7](e[12], ...m);
  }
  function f(...m) {
    return e[8](e[12], ...m);
  }
  function p() {
    return e[9](e[12]);
  }
  return {
    key: n,
    first: null,
    c() {
      (t = _('div')),
        u && u.c(),
        (r = $()),
        h(t, 'draggable', !0),
        h(t, 'ondragover', 'return false'),
        D(t, 'bg-grey', e[2] === e[12]),
        D(t, 'text-white', e[2] === e[12]),
        (this.first = t);
    },
    m(m, k) {
      B(m, t, k),
        u && u.m(t, null),
        b(t, r),
        (l = !0),
        o ||
          ((a = [
            te(t, 'dragstart', d),
            te(t, 'drop', Wl(f)),
            te(t, 'dragenter', p),
          ]),
          (o = !0));
    },
    p(m, k) {
      (e = m),
        u &&
          u.p &&
          (!l || k & 33) &&
          it(u, c, e, e[5], l ? nt(c, e[5], k, uo) : lt(e[5]), gn),
        (!l || k & 5) && D(t, 'bg-grey', e[2] === e[12]),
        (!l || k & 5) && D(t, 'text-white', e[2] === e[12]);
    },
    r() {
      i = t.getBoundingClientRect();
    },
    f() {
      ts(t), s();
    },
    a() {
      s(), (s = es(t, i, co, { duration: 400 }));
    },
    i(m) {
      l || (g(u, m), (l = !0));
    },
    o(m) {
      G(u, m), (l = !1);
    },
    d(m) {
      m && v(t), u && u.d(m), (o = !1), ge(a);
    },
  };
}
function fo(n) {
  let e = [],
    t = new Map(),
    r,
    i,
    s = n[0];
  const l = (o) => o[10][o[1]];
  for (let o = 0; o < s.length; o += 1) {
    let a = kn(n, s, o),
      c = l(a);
    t.set(c, (e[o] = Gn(c, a)));
  }
  return {
    c() {
      for (let o = 0; o < e.length; o += 1) e[o].c();
      r = se();
    },
    m(o, a) {
      for (let c = 0; c < e.length; c += 1) e[c] && e[c].m(o, a);
      B(o, r, a), (i = !0);
    },
    p(o, [a]) {
      if (a & 63) {
        (s = o[0]), P();
        for (let c = 0; c < e.length; c += 1) e[c].r();
        e = Kt(e, a, l, 1, o, s, t, r.parentNode, os, Gn, r, kn);
        for (let c = 0; c < e.length; c += 1) e[c].a();
        N();
      }
    },
    i(o) {
      if (!i) {
        for (let a = 0; a < s.length; a += 1) g(e[a]);
        i = !0;
      }
    },
    o(o) {
      for (let a = 0; a < e.length; a += 1) G(e[a]);
      i = !1;
    },
    d(o) {
      for (let a = 0; a < e.length; a += 1) e[a].d(o);
      o && v(r);
    },
  };
}
function ho(n, e, t) {
  let { $$slots: r = {}, $$scope: i } = e,
    { list: s } = e,
    { key: l } = e,
    o = !1;
  const a = (p, m) => {
      p.dataTransfer.dropEffect = 'move';
      const k = parseInt(p.dataTransfer.getData('text/plain')),
        y = s;
      k < m
        ? (y.splice(m + 1, 0, y[k]), y.splice(k, 1))
        : (y.splice(m, 0, y[k]), y.splice(k + 1, 1)),
        t(0, (s = y)),
        t(2, (o = null));
    },
    c = (p, m) => {
      (p.dataTransfer.effectAllowed = 'move'),
        (p.dataTransfer.dropEffect = 'move');
      const k = m;
      p.dataTransfer.setData('text/plain', k);
    },
    u = (p, m) => c(m, p),
    d = (p, m) => a(m, p),
    f = (p) => t(2, (o = p));
  return (
    (n.$$set = (p) => {
      'list' in p && t(0, (s = p.list)),
        'key' in p && t(1, (l = p.key)),
        '$$scope' in p && t(5, (i = p.$$scope));
    }),
    [s, l, o, a, c, i, r, u, d, f]
  );
}
class Ml extends Q {
  constructor(e) {
    super(), X(this, e, ho, fo, K, { list: 0, key: 1 });
  }
}
function tr(n, { delay: e = 0, duration: t = 400, easing: r = Dt } = {}) {
  const i = +getComputedStyle(n).opacity;
  return { delay: e, duration: t, easing: r, css: (s) => `opacity: ${s * i}` };
}
function _n(
  n,
  { delay: e = 0, duration: t = 400, easing: r = $l, axis: i = 'y' } = {}
) {
  const s = getComputedStyle(n),
    l = +s.opacity,
    o = i === 'y' ? 'height' : 'width',
    a = parseFloat(s[o]),
    c = i === 'y' ? ['top', 'bottom'] : ['left', 'right'],
    u = c.map((w) => `${w[0].toUpperCase()}${w.slice(1)}`),
    d = parseFloat(s[`padding${u[0]}`]),
    f = parseFloat(s[`padding${u[1]}`]),
    p = parseFloat(s[`margin${u[0]}`]),
    m = parseFloat(s[`margin${u[1]}`]),
    k = parseFloat(s[`border${u[0]}Width`]),
    y = parseFloat(s[`border${u[1]}Width`]);
  return {
    delay: e,
    duration: t,
    easing: r,
    css: (w) =>
      `overflow: hidden;opacity: ${Math.min(w * 20, 1) * l};${o}: ${
        w * a
      }px;padding-${c[0]}: ${w * d}px;padding-${c[1]}: ${w * f}px;margin-${
        c[0]
      }: ${w * p}px;margin-${c[1]}: ${w * m}px;border-${c[0]}-width: ${
        w * k
      }px;border-${c[1]}-width: ${w * y}px;`,
  };
}
function mo(n) {
  let e, t, r;
  const i = n[1].default,
    s = rt(i, n, n[0], null);
  return {
    c() {
      (e = _('div')),
        s && s.c(),
        h(
          e,
          'class',
          'flex flex-col gap-4 p-4 rounded-lg bg-panels overflow-hidden'
        );
    },
    m(l, o) {
      B(l, e, o), s && s.m(e, null), (r = !0);
    },
    p(l, [o]) {
      s &&
        s.p &&
        (!r || o & 1) &&
        it(s, i, l, l[0], r ? nt(i, l[0], o, null) : lt(l[0]), null);
    },
    i(l) {
      r ||
        (g(s, l),
        t ||
          Ce(() => {
            (t = Jt(e, tr, {})), t.start();
          }),
        (r = !0));
    },
    o(l) {
      G(s, l), (r = !1);
    },
    d(l) {
      l && v(e), s && s.d(l);
    },
  };
}
function po(n, e, t) {
  let { $$slots: r = {}, $$scope: i } = e;
  return (
    (n.$$set = (s) => {
      '$$scope' in s && t(0, (i = s.$$scope));
    }),
    [i, r]
  );
}
class Ze extends Q {
  constructor(e) {
    super(), X(this, e, po, mo, K, {});
  }
}
function bo(n) {
  let e, t, r;
  var i = n[5];
  function s(l) {
    return {};
  }
  return (
    i && (e = Ne(i, s())),
    {
      c() {
        e && L(e.$$.fragment), (t = se());
      },
      m(l, o) {
        e && F(e, l, o), B(l, t, o), (r = !0);
      },
      p(l, o) {
        if (o & 32 && i !== (i = l[5])) {
          if (e) {
            P();
            const a = e;
            G(a.$$.fragment, 1, 0, () => {
              x(a, 1);
            }),
              N();
          }
          i
            ? ((e = Ne(i, s())),
              L(e.$$.fragment),
              g(e.$$.fragment, 1),
              F(e, t.parentNode, t))
            : (e = null);
        }
      },
      i(l) {
        r || (e && g(e.$$.fragment, l), (r = !0));
      },
      o(l) {
        e && G(e.$$.fragment, l), (r = !1);
      },
      d(l) {
        l && v(t), e && x(e, l);
      },
    }
  );
}
function ko(n) {
  let e, t, r;
  var i = vr;
  function s(l) {
    return { props: { class: 'w-6' } };
  }
  return (
    i && (e = Ne(i, s())),
    {
      c() {
        e && L(e.$$.fragment), (t = se());
      },
      m(l, o) {
        e && F(e, l, o), B(l, t, o), (r = !0);
      },
      p(l, o) {
        if (i !== (i = vr)) {
          if (e) {
            P();
            const a = e;
            G(a.$$.fragment, 1, 0, () => {
              x(a, 1);
            }),
              N();
          }
          i
            ? ((e = Ne(i, s())),
              L(e.$$.fragment),
              g(e.$$.fragment, 1),
              F(e, t.parentNode, t))
            : (e = null);
        }
      },
      i(l) {
        r || (e && g(e.$$.fragment, l), (r = !0));
      },
      o(l) {
        e && G(e.$$.fragment, l), (r = !1);
      },
      d(l) {
        l && v(t), e && x(e, l);
      },
    }
  );
}
function go(n) {
  let e, t, r, i, s, l, o, a;
  const c = [ko, bo],
    u = [];
  function d(m, k) {
    return m[0] ? 0 : 1;
  }
  (r = d(n)), (i = u[r] = c[r](n));
  const f = n[7].default,
    p = rt(f, n, n[6], null);
  return {
    c() {
      (e = _('button')),
        (t = _('span')),
        i.c(),
        (s = $()),
        p && p.c(),
        h(t, 'class', 'w-6'),
        h(
          e,
          'class',
          'py-2 px-2 flex hover:bg-hover items-center gap-4 hover:duration-500 overflow-hidden rounded-lg'
        ),
        D(e, 'pointer-events-none', n[2]),
        D(e, 'opacity-50', n[2]),
        D(e, 'cursor-not-allowed', n[2]),
        D(e, 'bg-hover', n[4]),
        D(e, 'bg-panels', !n[3]);
    },
    m(m, k) {
      B(m, e, k),
        b(e, t),
        u[r].m(t, null),
        b(e, s),
        p && p.m(e, null),
        (l = !0),
        o || ((a = [te(e, 'click', n[8]), te(e, 'click', n[9])]), (o = !0));
    },
    p(m, [k]) {
      let y = r;
      (r = d(m)),
        r === y
          ? u[r].p(m, k)
          : (P(),
            G(u[y], 1, 1, () => {
              u[y] = null;
            }),
            N(),
            (i = u[r]),
            i ? i.p(m, k) : ((i = u[r] = c[r](m)), i.c()),
            g(i, 1),
            i.m(t, null)),
        p &&
          p.p &&
          (!l || k & 64) &&
          it(p, f, m, m[6], l ? nt(f, m[6], k, null) : lt(m[6]), null),
        (!l || k & 4) && D(e, 'pointer-events-none', m[2]),
        (!l || k & 4) && D(e, 'opacity-50', m[2]),
        (!l || k & 4) && D(e, 'cursor-not-allowed', m[2]),
        (!l || k & 16) && D(e, 'bg-hover', m[4]),
        (!l || k & 8) && D(e, 'bg-panels', !m[3]);
    },
    i(m) {
      l || (g(i), g(p, m), (l = !0));
    },
    o(m) {
      G(i), G(p, m), (l = !1);
    },
    d(m) {
      m && v(e), u[r].d(), p && p.d(m), (o = !1), ge(a);
    },
  };
}
function Go(n, e, t) {
  let { $$slots: r = {}, $$scope: i } = e,
    { loading: s = !1 } = e,
    { async: l = !1 } = e,
    { disabled: o = !1 } = e,
    { transparent: a = !1 } = e,
    { active: c } = e,
    { icon: u } = e;
  function d(p) {
    Ke.call(this, n, p);
  }
  const f = () => (l ? t(0, (s = !0)) : null);
  return (
    (n.$$set = (p) => {
      'loading' in p && t(0, (s = p.loading)),
        'async' in p && t(1, (l = p.async)),
        'disabled' in p && t(2, (o = p.disabled)),
        'transparent' in p && t(3, (a = p.transparent)),
        'active' in p && t(4, (c = p.active)),
        'icon' in p && t(5, (u = p.icon)),
        '$$scope' in p && t(6, (i = p.$$scope));
    }),
    [s, l, o, a, c, u, i, r, d, f]
  );
}
class le extends Q {
  constructor(e) {
    super(),
      X(this, e, Go, go, K, {
        loading: 0,
        async: 1,
        disabled: 2,
        transparent: 3,
        active: 4,
        icon: 5,
      });
  }
}
function _o(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(
          t,
          'd',
          'M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class Er extends Q {
  constructor(e) {
    super(), X(this, e, null, _o, K, {});
  }
}
function vo(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'fill-rule', 'evenodd'),
        h(t, 'clip-rule', 'evenodd'),
        h(
          t,
          'd',
          'M12 9.23077C12 11.6098 10.6569 12.4615 9 12.4615C7.34315 12.4615 6 11.6098 6 9.23077C6 6.8517 7.34315 6 9 6C10.6569 6 12 6.8517 12 9.23077ZM9 12.4615C5.68629 12.4615 3 13.9216 3 18H15C15 13.9216 12.3137 12.4615 9 12.4615ZM19 8C19 7.44772 18.5523 7 18 7C17.4477 7 17 7.44772 17 8V10H15C14.4477 10 14 10.4477 14 11C14 11.5523 14.4477 12 15 12H17V14C17 14.5523 17.4477 15 18 15C18.5523 15 19 14.5523 19 14V12H21C21.5523 12 22 11.5523 22 11C22 10.4477 21.5523 10 21 10H19V8Z'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'current'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '.1'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class Bo extends Q {
  constructor(e) {
    super(), X(this, e, null, vo, K, {});
  }
}
function yo(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(
          t,
          'd',
          'M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class wo extends Q {
  constructor(e) {
    super(), X(this, e, null, yo, K, {});
  }
}
function Co(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(
          t,
          'd',
          'm4.44444 14.636-.94419.3294.94419-.3294Zm14.68296 1.001-.9806.1961-.0683-.3414.1585-.31.8904.4553Zm.7255 3.6276.9806-.1962-.9806.1962Zm-.5883.5883-.1962.9806.1962-.9806Zm-3.6276-.7255-.4553-.8904.31-.1585.3414.0683-.1961.9806Zm-6.27299.4282.32938-.9442-.32938.9442ZM5 12c0 .8099.13714 1.5857.38864 2.3066l-1.88839.6588C3.17587 14.0355 3 13.0372 3 12h2Zm7-7c-3.86599 0-7 3.13401-7 7H3c0-4.97056 4.02944-9 9-9v2Zm7 7c0-3.86599-3.134-7-7-7V3c4.9706 0 9 4.02944 9 9h-2Zm-.763 3.1817c.4875-.9535.763-2.034.763-3.1817h2c0 1.4716-.3539 2.8634-.9822 4.0922l-1.7808-.9105Zm1.871.2591.7255 3.6276-1.9612.3923-.7255-3.6276 1.9612-.3923Zm.7255 3.6276c.2099 1.0496-.7155 1.975-1.7651 1.7651l.3923-1.9612c-.3499-.0699-.6583.2385-.5884.5884l1.9612-.3923Zm-1.7651 1.7651-3.6276-.7255.3923-1.9612 3.6276.7255-.3923 1.9612ZM12 19c1.1477 0 2.2282-.2755 3.1817-.763l.9105 1.7808C14.8634 20.6461 13.4716 21 12 21v-2Zm-2.30661-.3886C10.4143 18.8629 11.1901 19 12 19v2c-1.0372 0-2.03554-.1759-2.96538-.5002l.65877-1.8884Zm-4.30475-4.3048c.70113 2.0098 2.29492 3.6036 4.30475 4.3048l-.65877 1.8884c-2.58577-.9021-4.63233-2.9487-5.53437-5.5344l1.88839-.6588Z'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'current'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '.1'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class Ar extends Q {
  constructor(e) {
    super(), X(this, e, null, Co, K, {});
  }
}
function $o(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(
          t,
          'd',
          'M4 4V3H3V4H4ZM4 19H3V20H4V19ZM7 22C7 22.5523 7.44772 23 8 23C8.55228 23 9 22.5523 9 22H7ZM11.5 8.5C10.9477 8.5 10.5 8.94772 10.5 9.5C10.5 10.0523 10.9477 10.5 11.5 10.5V8.5ZM15.5 10.5C16.0523 10.5 16.5 10.0523 16.5 9.5C16.5 8.94772 16.0523 8.5 15.5 8.5V10.5ZM3 4V19H5V4H3ZM18 6V17H20V6H18ZM4 5H8V3H4V5ZM8 5H17V3H8V5ZM17 18H8V20H17V18ZM8 18H4V20H8V18ZM7 4V19H9V4H7ZM7 19V22H9V19H7ZM11.5 10.5H15.5V8.5H11.5V10.5ZM18 17C18 17.5523 17.5523 18 17 18V20C18.6569 20 20 18.6569 20 17H18ZM20 6C20 4.34315 18.6569 3 17 3V5C17.5523 5 18 5.44772 18 6H20Z'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'current'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '0.1'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class Mo extends Q {
  constructor(e) {
    super(), X(this, e, null, $o, K, {});
  }
}
function Fo(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'fill-rule', 'evenodd'),
        h(t, 'clip-rule', 'evenodd'),
        h(
          t,
          'd',
          'M5 3C3.89543 3 3 3.89543 3 5V13C3 14.1046 3.89543 15 5 15H8.01894C8.27426 18.3562 11.0784 21 14.5 21C18.0899 21 21 18.0899 21 14.5C21 11.0784 18.3562 8.27426 15 8.01894V5C15 3.89543 14.1046 3 13 3H5ZM13 8.17393V5L5 5V13H8.17393C8.73735 10.6148 10.6148 8.73735 13 8.17393ZM19 14.5C19 16.9853 16.9853 19 14.5 19C12.0147 19 10 16.9853 10 14.5C10 12.0147 12.0147 10 14.5 10C16.9853 10 19 12.0147 19 14.5Z'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'current'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '.1'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class xo extends Q {
  constructor(e) {
    super(), X(this, e, null, Fo, K, {});
  }
}
function Lo(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(
          t,
          'd',
          'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class Fl extends Q {
  constructor(e) {
    super(), X(this, e, null, Lo, K, {});
  }
}
function Zo(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(
          t,
          'd',
          'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
let Tr = class extends Q {
  constructor(e) {
    super(), X(this, e, null, Zo, K, {});
  }
};
function Ho(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'fill-rule', 'evenodd'),
        h(t, 'clip-rule', 'evenodd'),
        h(
          t,
          'd',
          'M12 5C11.4477 5 11 5.44772 11 6C11 6.55228 11.4477 7 12 7H15.5858L10.2929 12.2929C9.90237 12.6834 9.90237 13.3166 10.2929 13.7071C10.6834 14.0976 11.3166 14.0976 11.7071 13.7071L17 8.41421V12C17 12.5523 17.4477 13 18 13C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H12ZM7 8C7 7.44772 6.55228 7 6 7C5.44772 7 5 7.44772 5 8V16.4C5 17.8359 6.16406 19 7.6 19H16C16.5523 19 17 18.5523 17 18C17 17.4477 16.5523 17 16 17H7.6C7.26863 17 7 16.7314 7 16.4V8Z'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'current'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '.1'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class jo extends Q {
  constructor(e) {
    super(), X(this, e, null, Ho, K, {});
  }
}
function Oo(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(t, 'd', 'M12 4.5v15m7.5-7.5h-15'),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class Mt extends Q {
  constructor(e) {
    super(), X(this, e, null, Oo, K, {});
  }
}
function So(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(
          t,
          'd',
          'M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class Vo extends Q {
  constructor(e) {
    super(), X(this, e, null, So, K, {});
  }
}
function qo(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(t, 'd', 'M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class Ue extends Q {
  constructor(e) {
    super(), X(this, e, null, qo, K, {});
  }
}
function Eo(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(t, 'd', 'M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class Ao extends Q {
  constructor(e) {
    super(), X(this, e, null, Eo, K, {});
  }
}
function To(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(t, 'd', 'M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class Po extends Q {
  constructor(e) {
    super(), X(this, e, null, To, K, {});
  }
}
function No(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(t, 'd', 'M4.5 12.75l6 6 9-13.5'),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class We extends Q {
  constructor(e) {
    super(), X(this, e, null, No, K, {});
  }
}
function Io(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(
          t,
          'd',
          'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class zo extends Q {
  constructor(e) {
    super(), X(this, e, null, Io, K, {});
  }
}
function Ro(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(
          t,
          'd',
          'M4 6.9231C4 5.81853 4.89543 4.9231 6 4.9231C7.10457 4.9231 8 5.81853 8 6.9231C8 8.02767 7.10457 8.9231 6 8.9231C4.89543 8.9231 4 8.02767 4 6.9231ZM4 12.9231C4 11.8185 4.89543 10.9231 6 10.9231C7.10457 10.9231 8 11.8185 8 12.9231C8 14.0277 7.10457 14.9231 6 14.9231C4.89543 14.9231 4 14.0277 4 12.9231ZM6 16.9231C4.89543 16.9231 4 17.8185 4 18.9231C4 20.0277 4.89543 20.9231 6 20.9231C7.10457 20.9231 8 20.0277 8 18.9231C8 17.8185 7.10457 16.9231 6 16.9231ZM10 6.9231C10 5.81853 10.8954 4.9231 12 4.9231C13.1046 4.9231 14 5.81853 14 6.9231C14 8.02767 13.1046 8.9231 12 8.9231C10.8954 8.9231 10 8.02767 10 6.9231ZM12 10.9231C10.8954 10.9231 10 11.8185 10 12.9231C10 14.0277 10.8954 14.9231 12 14.9231C13.1046 14.9231 14 14.0277 14 12.9231C14 11.8185 13.1046 10.9231 12 10.9231ZM10 18.9231C10 17.8185 10.8954 16.9231 12 16.9231C13.1046 16.9231 14 17.8185 14 18.9231C14 20.0277 13.1046 20.9231 12 20.9231C10.8954 20.9231 10 20.0277 10 18.9231ZM18 4.9231C16.8954 4.9231 16 5.81853 16 6.9231C16 8.02767 16.8954 8.9231 18 8.9231C19.1046 8.9231 20 8.02767 20 6.9231C20 5.81853 19.1046 4.9231 18 4.9231ZM16 12.9231C16 11.8185 16.8954 10.9231 18 10.9231C19.1046 10.9231 20 11.8185 20 12.9231C20 14.0277 19.1046 14.9231 18 14.9231C16.8954 14.9231 16 14.0277 16 12.9231ZM18 16.9231C16.8954 16.9231 16 17.8185 16 18.9231C16 20.0277 16.8954 20.9231 18 20.9231C19.1046 20.9231 20 20.0277 20 18.9231C20 17.8185 19.1046 16.9231 18 16.9231Z'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'current'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '.1'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
let xl = class extends Q {
  constructor(e) {
    super(), X(this, e, null, Ro, K, {});
  }
};
function Do(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(t, 'd', 'M6 18L18 6M6 6l12 12'),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class Ft extends Q {
  constructor(e) {
    super(), X(this, e, null, Do, K, {});
  }
}
function Uo(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(
          t,
          'd',
          'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class Wo extends Q {
  constructor(e) {
    super(), X(this, e, null, Uo, K, {});
  }
}
function Jo(n) {
  let e,
    t,
    r,
    i,
    s,
    l,
    o,
    a,
    c = [
      { viewBox: '0 0 44 44' },
      { xmlns: 'http://www.w3.org/2000/svg' },
      n[0],
    ],
    u = {};
  for (let d = 0; d < c.length; d += 1) u = Ve(u, c[d]);
  return {
    c() {
      (e = ee('svg')),
        (t = ee('g')),
        (r = ee('circle')),
        (i = ee('animate')),
        (s = ee('animate')),
        (l = ee('circle')),
        (o = ee('animate')),
        (a = ee('animate')),
        h(i, 'attributeName', 'r'),
        h(i, 'begin', '0s'),
        h(i, 'dur', '1.8s'),
        h(i, 'values', '1; 20'),
        h(i, 'calcMode', 'spline'),
        h(i, 'keyTimes', '0; 1'),
        h(i, 'keySplines', '0.165, 0.84, 0.44, 1'),
        h(i, 'repeatCount', 'indefinite'),
        h(s, 'attributeName', 'stroke-opacity'),
        h(s, 'begin', '0s'),
        h(s, 'dur', '1.8s'),
        h(s, 'values', '1; 0'),
        h(s, 'calcMode', 'spline'),
        h(s, 'keyTimes', '0; 1'),
        h(s, 'keySplines', '0.3, 0.61, 0.355, 1'),
        h(s, 'repeatCount', 'indefinite'),
        h(r, 'cx', '22'),
        h(r, 'cy', '22'),
        h(r, 'r', '1'),
        h(o, 'attributeName', 'r'),
        h(o, 'begin', '-0.9s'),
        h(o, 'dur', '1.8s'),
        h(o, 'values', '1; 20'),
        h(o, 'calcMode', 'spline'),
        h(o, 'keyTimes', '0; 1'),
        h(o, 'keySplines', '0.165, 0.84, 0.44, 1'),
        h(o, 'repeatCount', 'indefinite'),
        h(a, 'attributeName', 'stroke-opacity'),
        h(a, 'begin', '-0.9s'),
        h(a, 'dur', '1.8s'),
        h(a, 'values', '1; 0'),
        h(a, 'calcMode', 'spline'),
        h(a, 'keyTimes', '0; 1'),
        h(a, 'keySplines', '0.3, 0.61, 0.355, 1'),
        h(a, 'repeatCount', 'indefinite'),
        h(l, 'cx', '22'),
        h(l, 'cy', '22'),
        h(l, 'r', '1'),
        h(t, 'fill', 'none'),
        h(t, 'fill-rule', 'evenodd'),
        h(t, 'stroke-width', '2'),
        h(t, 'stroke', '#000'),
        tn(e, u);
    },
    m(d, f) {
      B(d, e, f), b(e, t), b(t, r), b(r, i), b(r, s), b(t, l), b(l, o), b(l, a);
    },
    p(d, [f]) {
      tn(
        e,
        (u = Xt(c, [
          { viewBox: '0 0 44 44' },
          { xmlns: 'http://www.w3.org/2000/svg' },
          f & 1 && d[0],
        ]))
      );
    },
    i: j,
    o: j,
    d(d) {
      d && v(e);
    },
  };
}
function Yo(n, e, t) {
  return (
    (n.$$set = (r) => {
      t(0, (e = Ve(Ve({}, e), St(r))));
    }),
    (e = St(e)),
    [e]
  );
}
class vr extends Q {
  constructor(e) {
    super(), X(this, e, Yo, Jo, K, {});
  }
}
function Ko(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(
          t,
          'd',
          'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class Xo extends Q {
  constructor(e) {
    super(), X(this, e, null, Ko, K, {});
  }
}
function Qo(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(
          t,
          'd',
          'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
let Ll = class extends Q {
  constructor(e) {
    super(), X(this, e, null, Qo, K, {});
  }
};
function ec(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(t, 'd', 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class tc extends Q {
  constructor(e) {
    super(), X(this, e, null, ec, K, {});
  }
}
function rc(n) {
  let e, t;
  return {
    c() {
      (e = ee('svg')),
        (t = ee('path')),
        h(t, 'stroke-linecap', 'round'),
        h(t, 'stroke-linejoin', 'round'),
        h(
          t,
          'd',
          'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
        ),
        h(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        h(e, 'fill', 'none'),
        h(e, 'viewBox', '0 0 24 24'),
        h(e, 'stroke-width', '1.5'),
        h(e, 'stroke', 'currentColor');
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p: j,
    i: j,
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
class nc extends Q {
  constructor(e) {
    super(), X(this, e, null, rc, K, {});
  }
}
function ic(n) {
  let e;
  return {
    c() {
      (e = _('div')),
        h(
          e,
          'class',
          'absolute cover top-0 left-0 h-80 w-full z-0 bg-grey flex items-center justify-center text-8xl font-bold overflow-hidden text-white svelte-2hqgog'
        );
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    d(t) {
      t && v(e);
    },
  };
}
function lc(n) {
  let e, t, r, i;
  return {
    c() {
      (e = _('img')),
        (r = $()),
        (i = _('div')),
        Ye(e.src, (t = n[0])) || h(e, 'src', t),
        h(
          e,
          'class',
          'absolute top-0 left-0 object-cover cover h-80 w-full z-0 svelte-2hqgog'
        ),
        h(e, 'alt', 'Profile banner'),
        h(
          i,
          'class',
          'absolute top-0 left-0 object-cover cover h-80 w-full z-0 bg-gradient-to-t from-[#00000000] to-[#000000aa] svelte-2hqgog'
        );
    },
    m(s, l) {
      B(s, e, l), B(s, r, l), B(s, i, l);
    },
    p(s, l) {
      l & 1 && !Ye(e.src, (t = s[0])) && h(e, 'src', t);
    },
    d(s) {
      s && v(e), s && v(r), s && v(i);
    },
  };
}
function sc(n) {
  let e, t, r;
  return (
    (t = new Oe({ props: { patp: n[4] } })),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          h(e, 'class', 'rounded-md overflow-hidden w-full');
      },
      m(i, s) {
        B(i, e, s), F(t, e, null), (r = !0);
      },
      p(i, s) {
        const l = {};
        s & 16 && (l.patp = i[4]), t.$set(l);
      },
      i(i) {
        r || (g(t.$$.fragment, i), (r = !0));
      },
      o(i) {
        G(t.$$.fragment, i), (r = !1);
      },
      d(i) {
        i && v(e), x(t);
      },
    }
  );
}
function ac(n) {
  let e, t, r;
  return (
    (t = new je({ props: { title: n[2], color: n[5] } })),
    t.$on('load', n[10]),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          h(e, 'class', 'rounded-md overflow-hidden w-full');
      },
      m(i, s) {
        B(i, e, s), F(t, e, null), (r = !0);
      },
      p(i, s) {
        const l = {};
        s & 4 && (l.title = i[2]), s & 32 && (l.color = i[5]), t.$set(l);
      },
      i(i) {
        r || (g(t.$$.fragment, i), (r = !0));
      },
      o(i) {
        G(t.$$.fragment, i), (r = !1);
      },
      d(i) {
        i && v(e), x(t);
      },
    }
  );
}
function oc(n) {
  let e, t, r;
  return (
    (t = new je({ props: { title: n[2], color: n[5], image: n[1] } })),
    t.$on('load', n[10]),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          h(e, 'class', 'rounded-md overflow-hidden w-full');
      },
      m(i, s) {
        B(i, e, s), F(t, e, null), (r = !0);
      },
      p(i, s) {
        const l = {};
        s & 4 && (l.title = i[2]),
          s & 32 && (l.color = i[5]),
          s & 2 && (l.image = i[1]),
          t.$set(l);
      },
      i(i) {
        r || (g(t.$$.fragment, i), (r = !0));
      },
      o(i) {
        G(t.$$.fragment, i), (r = !1);
      },
      d(i) {
        i && v(e), x(t);
      },
    }
  );
}
function vn(n) {
  let e, t;
  return {
    c() {
      (e = _('div')), (t = E(n[3]));
    },
    m(r, i) {
      B(r, e, i), b(e, t);
    },
    p(r, i) {
      i & 8 && ae(t, r[3]);
    },
    d(r) {
      r && v(e);
    },
  };
}
function Bn(n) {
  let e, t, r, i, s, l;
  return {
    c() {
      (e = _('a')),
        (t = E('by ')),
        (r = E(n[4])),
        h(e, 'class', 'text-sm hover:text-grey hover:duration-500'),
        h(e, 'href', (i = `/${n[4]}`));
    },
    m(o, a) {
      B(o, e, a), b(e, t), b(e, r), s || ((l = qe(Ie.call(null, e))), (s = !0));
    },
    p(o, a) {
      a & 16 && ae(r, o[4]),
        a & 16 && i !== (i = `/${o[4]}`) && h(e, 'href', i);
    },
    d(o) {
      o && v(e), (s = !1), l();
    },
  };
}
function cc(n) {
  let e,
    t,
    r,
    i,
    s,
    l,
    o,
    a,
    c,
    u,
    d,
    f,
    p,
    m,
    k = (n[2] || '') + '',
    y,
    w,
    M,
    C,
    S,
    H,
    O,
    Z;
  Ce(n[13]);
  function V(I, oe) {
    return oe & 1 && (t = null), t == null && (t = !!Or(I[0])), t ? lc : ic;
  }
  let A = V(n, -1),
    q = A(n);
  const z = [oc, ac, sc],
    U = [];
  function J(I, oe) {
    return I[1] ? 0 : I[6] === 'app' ? 1 : 2;
  }
  (u = J(n)), (d = U[u] = z[u](n));
  let T = n[3] && vn(n),
    Y = (n[6] === 'collection' || n[6] === 'app') && Bn(n);
  const ie = n[12].default,
    R = rt(ie, n, n[11], null);
  return {
    c() {
      (e = _('div')),
        q.c(),
        (r = $()),
        (i = _('div')),
        (s = _('div')),
        (l = _('div')),
        (o = _('div')),
        (a = $()),
        (c = _('div')),
        d.c(),
        (f = $()),
        (p = _('div')),
        (m = _('div')),
        (y = E(k)),
        (w = $()),
        (M = _('div')),
        T && T.c(),
        (C = $()),
        Y && Y.c(),
        (S = $()),
        R && R.c(),
        h(e, 'class', 'col-span-12 w-full h-56'),
        h(c, 'class', 'absolute -top-12 w-full rounded-md'),
        h(l, 'class', 'relative col-span-3 md:col-span-2'),
        h(m, 'class', 'text-lg md:text-2xl font-bold'),
        h(M, 'class', 'gap-4'),
        h(
          p,
          'class',
          'flex flex-col justify-start gap-2 col-span-9 relative break-words'
        ),
        h(s, 'class', 'grid grid-cols-12 gap-4 w-full'),
        h(i, 'class', 'col-span-12 md:col-span-9 flex flex-col gap-4');
    },
    m(I, oe) {
      B(I, e, oe),
        q.m(e, null),
        B(I, r, oe),
        B(I, i, oe),
        b(i, s),
        b(s, l),
        b(l, o),
        n[14](o),
        b(l, a),
        b(l, c),
        U[u].m(c, null),
        n[15](c),
        b(s, f),
        b(s, p),
        b(p, m),
        b(m, y),
        b(p, w),
        b(p, M),
        T && T.m(M, null),
        b(M, C),
        Y && Y.m(M, null),
        b(i, S),
        R && R.m(i, null),
        (H = !0),
        O || ((Z = te(window, 'resize', n[13])), (O = !0));
    },
    p(I, [oe]) {
      A === (A = V(I, oe)) && q
        ? q.p(I, oe)
        : (q.d(1), (q = A(I)), q && (q.c(), q.m(e, null)));
      let Be = u;
      (u = J(I)),
        u === Be
          ? U[u].p(I, oe)
          : (P(),
            G(U[Be], 1, 1, () => {
              U[Be] = null;
            }),
            N(),
            (d = U[u]),
            d ? d.p(I, oe) : ((d = U[u] = z[u](I)), d.c()),
            g(d, 1),
            d.m(c, null)),
        (!H || oe & 4) && k !== (k = (I[2] || '') + '') && ae(y, k),
        I[3]
          ? T
            ? T.p(I, oe)
            : ((T = vn(I)), T.c(), T.m(M, C))
          : T && (T.d(1), (T = null)),
        I[6] === 'collection' || I[6] === 'app'
          ? Y
            ? Y.p(I, oe)
            : ((Y = Bn(I)), Y.c(), Y.m(M, null))
          : Y && (Y.d(1), (Y = null)),
        R &&
          R.p &&
          (!H || oe & 2048) &&
          it(R, ie, I, I[11], H ? nt(ie, I[11], oe, null) : lt(I[11]), null);
    },
    i(I) {
      H || (g(d), g(R, I), (H = !0));
    },
    o(I) {
      G(d), G(R, I), (H = !1);
    },
    d(I) {
      I && v(e),
        q.d(),
        I && v(r),
        I && v(i),
        n[14](null),
        U[u].d(),
        n[15](null),
        T && T.d(),
        Y && Y.d(),
        R && R.d(I),
        (O = !1),
        Z();
    },
  };
}
function uc(n, e, t) {
  let { $$slots: r = {}, $$scope: i } = e,
    {
      cover: s,
      avatar: l,
      title: o,
      description: a,
      patp: c,
      color: u,
      type: d,
    } = e,
    f,
    p,
    m;
  const k = () => {
    f && p && t(7, (f.style.height = `${p.clientHeight}px`), f);
  };
  function y() {
    t(9, (m = window.innerWidth));
  }
  function w(C) {
    ce[C ? 'unshift' : 'push'](() => {
      (f = C), t(7, f);
    });
  }
  function M(C) {
    ce[C ? 'unshift' : 'push'](() => {
      (p = C), t(8, p);
    });
  }
  return (
    (n.$$set = (C) => {
      'cover' in C && t(0, (s = C.cover)),
        'avatar' in C && t(1, (l = C.avatar)),
        'title' in C && t(2, (o = C.title)),
        'description' in C && t(3, (a = C.description)),
        'patp' in C && t(4, (c = C.patp)),
        'color' in C && t(5, (u = C.color)),
        'type' in C && t(6, (d = C.type)),
        '$$scope' in C && t(11, (i = C.$$scope));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 384 && f && p && k(),
        n.$$.dirty & 512 && m && k(),
        n.$$.dirty & 1 &&
          (!s || !Or(s)) &&
          t(
            0,
            (s =
              'https://images.unsplash.com/photo-1554921027-b91f0beeb07d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80')
          );
    }),
    [s, l, o, a, c, u, d, f, p, m, k, i, r, y, w, M]
  );
}
class xt extends Q {
  constructor(e) {
    super(),
      X(this, e, uc, cc, K, {
        cover: 0,
        avatar: 1,
        title: 2,
        description: 3,
        patp: 4,
        color: 5,
        type: 6,
      });
  }
}
const dc = '/apps/portal/assets/logo-c05eaa7b.svg';
function fc(n) {
  let e, t;
  return (
    (e = new Oe({ props: { patp: Ge } })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p: j,
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
class Pr extends Q {
  constructor(e) {
    super(), X(this, e, null, fc, K, {});
  }
}
function yn(n, e, t) {
  const r = n.slice();
  return (r[14] = e[t]), r;
}
function wn(n, e, t) {
  const r = n.slice();
  return (r[14] = e[t]), r;
}
function Cn(n) {
  let e,
    t = n[14].title + '',
    r,
    i,
    s;
  function l() {
    return n[6](n[14]);
  }
  return {
    c() {
      (e = _('button')),
        (r = E(t)),
        h(
          e,
          'class',
          'rounded-xl flex font-saucebold items-center px-4 hover:duration-500 py-2 md:py-0'
        ),
        D(e, 'text-[#000000]', n[1] === n[14].link),
        D(
          e,
          'text-grey',
          n[1] !== n[14].link && (n[2].some(n[7]) || n[1] === '/')
        ),
        D(
          e,
          'hover:text-black',
          n[1] !== n[14].link && (n[2].some(n[8]) || n[1] === '/')
        ),
        D(
          e,
          'text-white',
          n[1] !== n[14].link && !n[2].some(n[9]) && n[1] !== '/'
        ),
        D(
          e,
          'hover:text-offwhite',
          n[1] !== n[14].link && !n[2].some(n[10]) && n[1] !== '/'
        );
    },
    m(o, a) {
      B(o, e, a), b(e, r), i || ((s = te(e, 'click', l)), (i = !0));
    },
    p(o, a) {
      (n = o),
        a & 10 && D(e, 'text-[#000000]', n[1] === n[14].link),
        a & 14 &&
          D(
            e,
            'text-grey',
            n[1] !== n[14].link && (n[2].some(n[7]) || n[1] === '/')
          ),
        a & 14 &&
          D(
            e,
            'hover:text-black',
            n[1] !== n[14].link && (n[2].some(n[8]) || n[1] === '/')
          ),
        a & 14 &&
          D(
            e,
            'text-white',
            n[1] !== n[14].link && !n[2].some(n[9]) && n[1] !== '/'
          ),
        a & 14 &&
          D(
            e,
            'hover:text-offwhite',
            n[1] !== n[14].link && !n[2].some(n[10]) && n[1] !== '/'
          );
    },
    d(o) {
      o && v(e), (i = !1), s();
    },
  };
}
function $n(n) {
  let e, t, r, i, s, l, o, a, c, u, d, f, p;
  r = new Ft({});
  let m = n[3],
    k = [];
  for (let y = 0; y < m.length; y += 1) k[y] = Mn(yn(n, m, y));
  return (
    (u = new Pr({})),
    {
      c() {
        (e = _('div')), (t = _('button')), L(r.$$.fragment), (i = $());
        for (let y = 0; y < k.length; y += 1) k[y].c();
        (s = $()),
          (l = _('a')),
          (o = _('div')),
          (o.textContent = 'Profile'),
          (a = $()),
          (c = _('div')),
          L(u.$$.fragment),
          h(t, 'class', 'w-10 h-10'),
          h(o, 'class', 'text-grey'),
          h(c, 'class', 'w-10 h-10 rounded-md overflow-hidden'),
          h(l, 'href', `/${Ge}`),
          h(l, 'class', 'flex items-center gap-4 w-full justify-end'),
          h(
            e,
            'class',
            'absolute top-0 right-0 flex font-saucebold flex-col items-end gap-4 bg-white pt-2 pb-5 px-5 rounded-md md:hidden'
          );
      },
      m(y, w) {
        B(y, e, w), b(e, t), F(r, t, null), b(e, i);
        for (let M = 0; M < k.length; M += 1) k[M] && k[M].m(e, null);
        b(e, s),
          b(e, l),
          b(l, o),
          b(l, a),
          b(l, c),
          F(u, c, null),
          (d = !0),
          f || ((p = [te(t, 'click', n[11]), qe(Ie.call(null, l))]), (f = !0));
      },
      p(y, w) {
        if (w & 11) {
          m = y[3];
          let M;
          for (M = 0; M < m.length; M += 1) {
            const C = yn(y, m, M);
            k[M] ? k[M].p(C, w) : ((k[M] = Mn(C)), k[M].c(), k[M].m(e, s));
          }
          for (; M < k.length; M += 1) k[M].d(1);
          k.length = m.length;
        }
      },
      i(y) {
        d || (g(r.$$.fragment, y), g(u.$$.fragment, y), (d = !0));
      },
      o(y) {
        G(r.$$.fragment, y), G(u.$$.fragment, y), (d = !1);
      },
      d(y) {
        y && v(e), x(r), _e(k, y), x(u), (f = !1), ge(p);
      },
    }
  );
}
function Mn(n) {
  let e,
    t = n[14].title + '',
    r,
    i,
    s;
  function l() {
    return n[12](n[14]);
  }
  return {
    c() {
      (e = _('button')),
        (r = E(t)),
        h(
          e,
          'class',
          'flex items-center justify-center font-bold px-10 w-full py-2 md:py-0'
        ),
        D(e, 'text-grey', n[1] !== n[14].link),
        D(e, 'text-black', n[1] === n[14].link);
    },
    m(o, a) {
      B(o, e, a), b(e, r), i || ((s = te(e, 'click', l)), (i = !0));
    },
    p(o, a) {
      (n = o),
        a & 10 && D(e, 'text-grey', n[1] !== n[14].link),
        a & 10 && D(e, 'text-black', n[1] === n[14].link);
    },
    d(o) {
      o && v(e), (i = !1), s();
    },
  };
}
function hc(n) {
  let e,
    t,
    r,
    i,
    s,
    l,
    o,
    a,
    c,
    u,
    d,
    f,
    p,
    m,
    k,
    y,
    w,
    M,
    C,
    S,
    H = n[3],
    O = [];
  for (let V = 0; V < H.length; V += 1) O[V] = Cn(wn(n, H, V));
  d = new Pr({});
  let Z = n[0] && $n(n);
  return (
    (y = new tc({})),
    {
      c() {
        (e = _('div')),
          (t = _('a')),
          (r = _('img')),
          (s = $()),
          (l = _('div')),
          (l.textContent = 'PORTAL'),
          (o = $()),
          (a = _('div'));
        for (let V = 0; V < O.length; V += 1) O[V].c();
        (c = $()),
          (u = _('a')),
          L(d.$$.fragment),
          (f = $()),
          Z && Z.c(),
          (p = $()),
          (m = _('div')),
          (k = _('button')),
          L(y.$$.fragment),
          h(r, 'class', 'w-14 my-2'),
          Ye(r.src, (i = dc)) || h(r, 'src', i),
          h(r, 'alt', 'logo'),
          h(l, 'class', 'font-logo flex items-center px-2 rounded-xl'),
          D(l, 'text-grey', n[2].some(n[4]) || n[1] === '/'),
          D(l, 'text-white', !n[2].some(n[5]) && n[1] !== '/'),
          h(t, 'href', '/'),
          h(t, 'class', 'flex items-center text-2xl font-bold gap-2'),
          h(u, 'href', `/${Ge}`),
          h(u, 'class', 'w-10 h-10 ml-4 rounded-md overflow-hidden'),
          h(a, 'class', 'hidden flex-col md:flex gap-4 md:flex-row'),
          h(k, 'class', (w = 'w-10 h-10 ' + (n[0] ? 'hidden' : ''))),
          h(m, 'class', 'md:hidden'),
          h(
            e,
            'class',
            'relative flex justify-between items-center px-2 md:px-16 lg:px-32 2xl:px-56 mb-10'
          );
      },
      m(V, A) {
        B(V, e, A), b(e, t), b(t, r), b(t, s), b(t, l), b(e, o), b(e, a);
        for (let q = 0; q < O.length; q += 1) O[q] && O[q].m(a, null);
        b(a, c),
          b(a, u),
          F(d, u, null),
          b(e, f),
          Z && Z.m(e, null),
          b(e, p),
          b(e, m),
          b(m, k),
          F(y, k, null),
          (M = !0),
          C ||
            ((S = [
              qe(Ie.call(null, t)),
              qe(Ie.call(null, u)),
              te(k, 'click', n[13]),
            ]),
            (C = !0));
      },
      p(V, [A]) {
        if (
          ((!M || A & 6) && D(l, 'text-grey', V[2].some(V[4]) || V[1] === '/'),
          (!M || A & 6) && D(l, 'text-white', !V[2].some(V[5]) && V[1] !== '/'),
          A & 14)
        ) {
          H = V[3];
          let q;
          for (q = 0; q < H.length; q += 1) {
            const z = wn(V, H, q);
            O[q] ? O[q].p(z, A) : ((O[q] = Cn(z)), O[q].c(), O[q].m(a, c));
          }
          for (; q < O.length; q += 1) O[q].d(1);
          O.length = H.length;
        }
        V[0]
          ? Z
            ? (Z.p(V, A), A & 1 && g(Z, 1))
            : ((Z = $n(V)), Z.c(), g(Z, 1), Z.m(e, p))
          : Z &&
            (P(),
            G(Z, 1, 1, () => {
              Z = null;
            }),
            N()),
          (!M ||
            (A & 1 && w !== (w = 'w-10 h-10 ' + (V[0] ? 'hidden' : '')))) &&
            h(k, 'class', w);
      },
      i(V) {
        M || (g(d.$$.fragment, V), g(Z), g(y.$$.fragment, V), (M = !0));
      },
      o(V) {
        G(d.$$.fragment, V), G(Z), G(y.$$.fragment, V), (M = !1);
      },
      d(V) {
        V && v(e), _e(O, V), x(d), Z && Z.d(), x(y), (C = !1), ge(S);
      },
    }
  );
}
function mc(n, e, t) {
  let r;
  ze(n, _l, (w) => t(1, (r = w)));
  let i = !1;
  const s = ['/explore', '/edit', '-edit/'],
    l = [
      { title: 'Post', link: '/' },
      { title: 'Explore', link: '/explore' },
      {
        title: 'Feedback',
        action: () =>
          window.open(`${window.location.origin}/apps/talk/dm/~foddur-hodler`),
      },
    ],
    o = (w) => r.includes(w),
    a = (w) => r.includes(w),
    c = (w) => (w.action ? w.action() : Xe(w.link)),
    u = (w) => r.includes(w),
    d = (w) => r.includes(w),
    f = (w) => r.includes(w),
    p = (w) => r.includes(w),
    m = () => t(0, (i = !i)),
    k = (w) => {
      w.action && w.action(), Xe(w.link), t(0, (i = !1));
    },
    y = () => t(0, (i = !i));
  return (
    (n.$$.update = () => {
      n.$$.dirty & 1 && console.log({ isMobileNavOpen: i });
    }),
    [i, r, s, l, o, a, c, u, d, f, p, m, k, y]
  );
}
class pc extends Q {
  constructor(e) {
    super(), X(this, e, mc, hc, K, {});
  }
}
function Fn(n, e, t) {
  const r = n.slice();
  return (r[10] = e[t][0]), (r[11] = e[t][1].title), (r[12] = e[t][1].image), r;
}
function xn(n, e, t) {
  const r = n.slice();
  return (
    (r[10] = e[t][0]),
    (r[11] = e[t][1].meta.title),
    (r[12] = e[t][1].meta.image),
    r
  );
}
function bc(n) {
  let e;
  return {
    c() {
      (e = _('div')),
        (e.textContent = 'Share with the World'),
        h(e, 'class', 'text-2xl');
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    d(t) {
      t && v(e);
    },
  };
}
function kc(n) {
  let e,
    t = !n[3] && Ln();
  return {
    c() {
      t && t.c(), (e = se());
    },
    m(r, i) {
      t && t.m(r, i), B(r, e, i);
    },
    p(r, i) {
      r[3]
        ? t && (t.d(1), (t = null))
        : t || ((t = Ln()), t.c(), t.m(e.parentNode, e));
    },
    d(r) {
      t && t.d(r), r && v(e);
    },
  };
}
function gc(n) {
  let e,
    t,
    r,
    i = Object.entries(n[2]),
    s = [];
  for (let l = 0; l < i.length; l += 1) s[l] = Zn(Fn(n, i, l));
  return {
    c() {
      (e = _('div')), (e.textContent = 'Your Favourite Apps'), (t = $());
      for (let l = 0; l < s.length; l += 1) s[l].c();
      (r = se()), h(e, 'class', 'text-2xl');
    },
    m(l, o) {
      B(l, e, o), B(l, t, o);
      for (let a = 0; a < s.length; a += 1) s[a] && s[a].m(l, o);
      B(l, r, o);
    },
    p(l, o) {
      if (o & 20) {
        i = Object.entries(l[2]);
        let a;
        for (a = 0; a < i.length; a += 1) {
          const c = Fn(l, i, a);
          s[a]
            ? s[a].p(c, o)
            : ((s[a] = Zn(c)), s[a].c(), s[a].m(r.parentNode, r));
        }
        for (; a < s.length; a += 1) s[a].d(1);
        s.length = i.length;
      }
    },
    d(l) {
      l && v(e), l && v(t), _e(s, l), l && v(r);
    },
  };
}
function Gc(n) {
  let e,
    t,
    r,
    i = Object.entries(n[1]),
    s = [];
  for (let l = 0; l < i.length; l += 1) s[l] = Hn(xn(n, i, l));
  return {
    c() {
      (e = _('div')),
        (e.textContent = 'Recommend your Favourite Groups'),
        (t = $());
      for (let l = 0; l < s.length; l += 1) s[l].c();
      (r = se()), h(e, 'class', 'text-2xl');
    },
    m(l, o) {
      B(l, e, o), B(l, t, o);
      for (let a = 0; a < s.length; a += 1) s[a] && s[a].m(l, o);
      B(l, r, o);
    },
    p(l, o) {
      if (o & 18) {
        i = Object.entries(l[1]);
        let a;
        for (a = 0; a < i.length; a += 1) {
          const c = xn(l, i, a);
          s[a]
            ? s[a].p(c, o)
            : ((s[a] = Hn(c)), s[a].c(), s[a].m(r.parentNode, r));
        }
        for (; a < s.length; a += 1) s[a].d(1);
        s.length = i.length;
      }
    },
    d(l) {
      l && v(e), l && v(t), _e(s, l), l && v(r);
    },
  };
}
function _c(n) {
  let e, t, r;
  return {
    c() {
      (e = _('div')),
        (e.textContent = 'Welcome to Portal'),
        (t = $()),
        (r = _('p')),
        (r.textContent = `Portal is the front page of Urbit, a social network to help you find
          the things most interesting to you.`),
        h(e, 'class', 'text-2xl');
    },
    m(i, s) {
      B(i, e, s), B(i, t, s), B(i, r, s);
    },
    p: j,
    d(i) {
      i && v(e), i && v(t), i && v(r);
    },
  };
}
function Ln(n) {
  let e, t, r;
  return {
    c() {
      (e = _('div')),
        (e.textContent = 'Portal is better with %pals!'),
        (t = $()),
        (r = _('div')),
        (r.textContent = 'Install the app');
    },
    m(i, s) {
      B(i, e, s), B(i, t, s), B(i, r, s);
    },
    d(i) {
      i && v(e), i && v(t), i && v(r);
    },
  };
}
function Zn(n) {
  let e,
    t,
    r = n[11] + '',
    i,
    s,
    l,
    o,
    a = !1,
    c,
    u,
    d,
    f;
  return (
    (u = ul(n[7][0])),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          (i = E(r)),
          (s = $()),
          (l = _('input')),
          (c = $()),
          h(l, 'type', 'checkbox'),
          (l.__value = o = n[10]),
          (l.value = l.__value),
          h(e, 'class', 'flex justify-between'),
          u.p(l);
      },
      m(p, m) {
        B(p, e, m),
          b(e, t),
          b(t, i),
          b(e, s),
          b(e, l),
          (l.checked = ~(n[4].groups || []).indexOf(l.__value)),
          b(e, c),
          d || ((f = te(l, 'change', n[8])), (d = !0));
      },
      p(p, m) {
        m & 4 && r !== (r = p[11] + '') && ae(i, r),
          m & 4 &&
            o !== (o = p[10]) &&
            ((l.__value = o), (l.value = l.__value), (a = !0)),
          (a || m & 18) &&
            (l.checked = ~(p[4].groups || []).indexOf(l.__value));
      },
      d(p) {
        p && v(e), u.r(), (d = !1), f();
      },
    }
  );
}
function Hn(n) {
  let e,
    t,
    r = n[11] + '',
    i,
    s,
    l,
    o,
    a = !1,
    c,
    u,
    d,
    f;
  return (
    (u = ul(n[7][0])),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          (i = E(r)),
          (s = $()),
          (l = _('input')),
          (c = $()),
          h(l, 'type', 'checkbox'),
          (l.__value = o = n[10]),
          (l.value = l.__value),
          h(e, 'class', 'flex justify-between'),
          u.p(l);
      },
      m(p, m) {
        B(p, e, m),
          b(e, t),
          b(t, i),
          b(e, s),
          b(e, l),
          (l.checked = ~(n[4].groups || []).indexOf(l.__value)),
          b(e, c),
          d || ((f = te(l, 'change', n[6])), (d = !0));
      },
      p(p, m) {
        m & 2 && r !== (r = p[11] + '') && ae(i, r),
          m & 2 &&
            o !== (o = p[10]) &&
            ((l.__value = o), (l.value = l.__value), (a = !0)),
          (a || m & 18) &&
            (l.checked = ~(p[4].groups || []).indexOf(l.__value));
      },
      d(p) {
        p && v(e), u.r(), (d = !1), f();
      },
    }
  );
}
function vc(n) {
  let e;
  function t(s, l) {
    if (s[0] === 'welcome') return _c;
    if (s[0] === 'groups') return Gc;
    if (s[0] === 'apps') return gc;
    if (s[0] === 'pals') return kc;
    if (s[0] === 'share') return bc;
  }
  let r = t(n),
    i = r && r(n);
  return {
    c() {
      (e = _('div')), i && i.c(), h(e, 'class', 'flex flex-col gap-4');
    },
    m(s, l) {
      B(s, e, l), i && i.m(e, null);
    },
    p(s, l) {
      r === (r = t(s)) && i
        ? i.p(s, l)
        : (i && i.d(1), (i = r && r(s)), i && (i.c(), i.m(e, null)));
    },
    d(s) {
      s && v(e), i && i.d();
    },
  };
}
function Bc(n) {
  let e, t, r;
  function i(l) {
    n[9](l);
  }
  let s = { formsteps: n[5], $$slots: { default: [vc] }, $$scope: { ctx: n } };
  return (
    n[0] !== void 0 && (s.formstep = n[0]),
    (e = new Vr({ props: s })),
    ce.push(() => he(e, 'formstep', i)),
    {
      c() {
        L(e.$$.fragment);
      },
      m(l, o) {
        F(e, l, o), (r = !0);
      },
      p(l, o) {
        const a = {};
        o & 131103 && (a.$$scope = { dirty: o, ctx: l }),
          !t && o & 1 && ((t = !0), (a.formstep = l[0]), fe(() => (t = !1))),
          e.$set(a);
      },
      i(l) {
        r || (g(e.$$.fragment, l), (r = !0));
      },
      o(l) {
        G(e.$$.fragment, l), (r = !1);
      },
      d(l) {
        x(e, l);
      },
    }
  );
}
function yc(n) {
  let e, t;
  return (
    (e = new et({
      props: { open: !1, $$slots: { default: [Bc] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, [i]) {
        const s = {};
        i & 131103 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function wc(n, e, t) {
  let r = 'welcome',
    i = ['welcome', 'groups', 'apps', 'pals', 'share'],
    s,
    l,
    o;
  ne.subscribe((p) => {
    t(1, ({ groups: s, apps: l, pals: o } = p), s, t(2, l), t(3, o));
  });
  let a = { groups: [], apps: [], pals: [] };
  const c = [[]];
  function u() {
    (a.groups = rn(c[0], this.__value, this.checked)), t(4, a);
  }
  function d() {
    (a.groups = rn(c[0], this.__value, this.checked)), t(4, a);
  }
  function f(p) {
    (r = p), t(0, r);
  }
  return [r, s, l, o, a, i, u, c, d, f];
}
class Cc extends Q {
  constructor(e) {
    super(), X(this, e, wc, yc, K, {});
  }
}
function jn(n, e, t) {
  const r = n.slice();
  return (r[1] = e[t]), r;
}
function $c(n) {
  let e;
  return {
    c() {
      (e = _('div')), (e.textContent = 'Loading...');
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    i: j,
    o: j,
    d(t) {
      t && v(e);
    },
  };
}
function Mc(n) {
  let e = [],
    t = new Map(),
    r,
    i,
    s = n[0];
  const l = (o) => o[1].time;
  for (let o = 0; o < s.length; o += 1) {
    let a = jn(n, s, o),
      c = l(a);
    t.set(c, (e[o] = On(c, a)));
  }
  return {
    c() {
      for (let o = 0; o < e.length; o += 1) e[o].c();
      r = se();
    },
    m(o, a) {
      for (let c = 0; c < e.length; c += 1) e[c] && e[c].m(o, a);
      B(o, r, a), (i = !0);
    },
    p(o, a) {
      a & 1 &&
        ((s = o[0]),
        P(),
        (e = Kt(e, a, l, 1, o, s, t, r.parentNode, Yt, On, r, jn)),
        N());
    },
    i(o) {
      if (!i) {
        for (let a = 0; a < s.length; a += 1) g(e[a]);
        i = !0;
      }
    },
    o(o) {
      for (let a = 0; a < e.length; a += 1) G(e[a]);
      i = !1;
    },
    d(o) {
      for (let a = 0; a < e.length; a += 1) e[a].d(o);
      o && v(r);
    },
  };
}
function On(n, e) {
  let t, r, i;
  return (
    (r = new Nr({ props: { key: e[1].key } })),
    {
      key: n,
      first: null,
      c() {
        (t = se()), L(r.$$.fragment), (this.first = t);
      },
      m(s, l) {
        B(s, t, l), F(r, s, l), (i = !0);
      },
      p(s, l) {
        e = s;
        const o = {};
        l & 1 && (o.key = e[1].key), r.$set(o);
      },
      i(s) {
        i || (g(r.$$.fragment, s), (i = !0));
      },
      o(s) {
        G(r.$$.fragment, s), (i = !1);
      },
      d(s) {
        s && v(t), x(r, s);
      },
    }
  );
}
function Fc(n) {
  let e, t, r, i;
  const s = [Mc, $c],
    l = [];
  function o(a, c) {
    return a[0] && a[0].length > 0 ? 0 : 1;
  }
  return (
    (e = o(n)),
    (t = l[e] = s[e](n)),
    {
      c() {
        t.c(), (r = se());
      },
      m(a, c) {
        l[e].m(a, c), B(a, r, c), (i = !0);
      },
      p(a, [c]) {
        let u = e;
        (e = o(a)),
          e === u
            ? l[e].p(a, c)
            : (P(),
              G(l[u], 1, 1, () => {
                l[u] = null;
              }),
              N(),
              (t = l[e]),
              t ? t.p(a, c) : ((t = l[e] = s[e](a)), t.c()),
              g(t, 1),
              t.m(r.parentNode, r));
      },
      i(a) {
        i || (g(t), (i = !0));
      },
      o(a) {
        G(t), (i = !1);
      },
      d(a) {
        l[e].d(a), a && v(r);
      },
    }
  );
}
function xc(n, e, t) {
  let { feed: r } = e;
  return (
    (n.$$set = (i) => {
      'feed' in i && t(0, (r = i.feed));
    }),
    [r]
  );
}
class Zl extends Q {
  constructor(e) {
    super(), X(this, e, xc, Fc, K, { feed: 0 });
  }
}
var Lc = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];
function Zc(n, e) {
  if (e === 0) return ['just now', 'right now'];
  var t = Lc[Math.floor(e / 2)];
  return n > 1 && (t += 's'), [n + ' ' + t + ' ago', 'in ' + n + ' ' + t];
}
var Hc = ['秒', '分钟', '小时', '天', '周', '个月', '年'];
function jc(n, e) {
  if (e === 0) return ['刚刚', '片刻后'];
  var t = Hc[~~(e / 2)];
  return [n + ' ' + t + '前', n + ' ' + t + '后'];
}
var Br = {},
  Hl = function (n, e) {
    Br[n] = e;
  },
  Oc = function (n) {
    return Br[n] || Br.en_US;
  },
  ur = [60, 60, 24, 7, 365 / 7 / 12, 12];
function Sn(n) {
  return n instanceof Date
    ? n
    : !isNaN(n) || /^\d+$/.test(n)
    ? new Date(parseInt(n))
    : ((n = (n || '')
        .trim()
        .replace(/\.\d+/, '')
        .replace(/-/, '/')
        .replace(/-/, '/')
        .replace(/(\d)T(\d)/, '$1 $2')
        .replace(/Z/, ' UTC')
        .replace(/([+-]\d\d):?(\d\d)/, ' $1$2')),
      new Date(n));
}
function Sc(n, e) {
  var t = n < 0 ? 1 : 0;
  n = Math.abs(n);
  for (var r = n, i = 0; n >= ur[i] && i < ur.length; i++) n /= ur[i];
  return (
    (n = Math.floor(n)),
    (i *= 2),
    n > (i === 0 ? 9 : 1) && (i += 1),
    e(n, i, r)[t].replace('%s', n.toString())
  );
}
function Vc(n, e) {
  var t = e ? Sn(e) : new Date();
  return (+t - +Sn(n)) / 1e3;
}
var Vn = function (n, e, t) {
  var r = Vc(n, t && t.relativeDate);
  return Sc(r, Oc(e));
};
Hl('en_US', Zc);
Hl('zh_CN', jc);
function qn(n, e, t) {
  const r = n.slice();
  return (r[11] = e[t]), r;
}
function qc(n) {
  const e = n.slice(),
    t = $e(e[1]);
  (e[6] = t.blurb), (e[7] = t.ship), (e[8] = t.createdAt), (e[9] = t.ref);
  const r = Re(e[7]);
  return (e[10] = r.bespoke.nickname), e;
}
function Ec(n) {
  let e, t;
  return {
    c() {
      (e = _('div')),
        (e.textContent = 'Loading...'),
        h(e, 'class', 'rounded-lg p-5');
    },
    m(r, i) {
      B(r, e, i);
    },
    p: j,
    i(r) {
      t ||
        Ce(() => {
          (t = Jt(e, tr, {})), t.start();
        });
    },
    o: j,
    d(r) {
      r && v(e);
    },
  };
}
function Ac(n) {
  let e,
    t,
    r,
    i,
    s,
    l,
    o,
    a,
    c,
    u,
    d = (n[10] || n[7]) + '',
    f,
    p,
    m,
    k,
    y,
    w,
    M = Vn(n[8]) + '',
    C,
    S,
    H,
    O = n[6] + '',
    Z,
    V,
    A,
    q,
    z,
    U,
    J,
    T;
  s = new Oe({ props: { patp: n[7] } });
  let Y = n[9] && En(n),
    ie = n[0] && An(n),
    R = n[3] && Pn(n);
  return {
    c() {
      (e = _('div')),
        (t = _('div')),
        (r = _('div')),
        (i = _('a')),
        L(s.$$.fragment),
        (o = $()),
        (a = _('div')),
        (c = _('div')),
        (u = _('a')),
        (f = E(d)),
        (m = $()),
        (k = _('span')),
        (k.textContent = '·'),
        (y = $()),
        (w = _('span')),
        (C = E(M)),
        (S = $()),
        (H = _('div')),
        (Z = E(O)),
        (V = $()),
        Y && Y.c(),
        (A = $()),
        ie && ie.c(),
        (q = $()),
        R && R.c(),
        h(i, 'href', (l = `/${n[7]}`)),
        h(r, 'class', 'rounded-md overflow-hidden'),
        h(t, 'class', 'col-span-1'),
        h(u, 'href', (p = `/${n[7]}`)),
        h(c, 'class', 'flex gap-2 text-sm'),
        h(H, 'class', 'whitespace-pre-wrap line-clamp-50 break-words'),
        h(a, 'class', 'col-span-12 md:col-span-11 flex flex-col gap-2'),
        h(
          e,
          'class',
          'grid grid-cols-12 bg-panels rounded-lg p-5 gap-2 lg:gap-4'
        );
    },
    m(I, oe) {
      B(I, e, oe),
        b(e, t),
        b(t, r),
        b(r, i),
        F(s, i, null),
        b(e, o),
        b(e, a),
        b(a, c),
        b(c, u),
        b(u, f),
        b(c, m),
        b(c, k),
        b(c, y),
        b(c, w),
        b(w, C),
        b(a, S),
        b(a, H),
        b(H, Z),
        b(a, V),
        Y && Y.m(a, null),
        b(e, A),
        ie && ie.m(e, null),
        b(e, q),
        R && R.m(e, null),
        (U = !0),
        J || ((T = [qe(Ie.call(null, i)), qe(Ie.call(null, u))]), (J = !0));
    },
    p(I, oe) {
      const Be = {};
      oe & 2 && (Be.patp = I[7]),
        s.$set(Be),
        (!U || (oe & 2 && l !== (l = `/${I[7]}`))) && h(i, 'href', l),
        (!U || oe & 2) && d !== (d = (I[10] || I[7]) + '') && ae(f, d),
        (!U || (oe & 2 && p !== (p = `/${I[7]}`))) && h(u, 'href', p),
        (!U || oe & 2) && M !== (M = Vn(I[8]) + '') && ae(C, M),
        (!U || oe & 2) && O !== (O = I[6] + '') && ae(Z, O),
        I[9]
          ? Y
            ? (Y.p(I, oe), oe & 2 && g(Y, 1))
            : ((Y = En(I)), Y.c(), g(Y, 1), Y.m(a, null))
          : Y &&
            (P(),
            G(Y, 1, 1, () => {
              Y = null;
            }),
            N()),
        I[0]
          ? ie
            ? (ie.p(I, oe), oe & 1 && g(ie, 1))
            : ((ie = An(I)), ie.c(), g(ie, 1), ie.m(e, q))
          : ie &&
            (P(),
            G(ie, 1, 1, () => {
              ie = null;
            }),
            N()),
        I[3]
          ? R
            ? (R.p(I, oe), oe & 8 && g(R, 1))
            : ((R = Pn(I)), R.c(), g(R, 1), R.m(e, null))
          : R &&
            (P(),
            G(R, 1, 1, () => {
              R = null;
            }),
            N());
    },
    i(I) {
      U ||
        (g(s.$$.fragment, I),
        g(Y),
        g(ie),
        g(R),
        z ||
          Ce(() => {
            (z = Jt(e, tr, {})), z.start();
          }),
        (U = !0));
    },
    o(I) {
      G(s.$$.fragment, I), G(Y), G(ie), G(R), (U = !1);
    },
    d(I) {
      I && v(e), x(s), Y && Y.d(), ie && ie.d(), R && R.d(), (J = !1), ge(T);
    },
  };
}
function En(n) {
  let e, t, r;
  return (
    (t = new Fe({ props: { key: n[9] } })),
    {
      c() {
        (e = _('div')), L(t.$$.fragment), h(e, 'class', 'rounded-lg');
      },
      m(i, s) {
        B(i, e, s), F(t, e, null), (r = !0);
      },
      p(i, s) {
        const l = {};
        s & 2 && (l.key = i[9]), t.$set(l);
      },
      i(i) {
        r || (g(t.$$.fragment, i), (r = !0));
      },
      o(i) {
        G(t.$$.fragment, i), (r = !1);
      },
      d(i) {
        i && v(e), x(t);
      },
    }
  );
}
function An(n) {
  let e, t, r;
  return (
    (t = new le({
      props: {
        icon: Ar,
        active: n[3],
        $$slots: { default: [Tc] },
        $$scope: { ctx: n },
      },
    })),
    t.$on('click', n[5]),
    {
      c() {
        (e = _('div')), L(t.$$.fragment), h(e, 'class', 'pt-4');
      },
      m(i, s) {
        B(i, e, s), F(t, e, null), (r = !0);
      },
      p(i, s) {
        const l = {};
        s & 8 && (l.active = i[3]),
          s & 16388 && (l.$$scope = { dirty: s, ctx: i }),
          t.$set(l);
      },
      i(i) {
        r || (g(t.$$.fragment, i), (r = !0));
      },
      o(i) {
        G(t.$$.fragment, i), (r = !1);
      },
      d(i) {
        i && v(e), x(t);
      },
    }
  );
}
function Tn(n) {
  let e = n[2].length + '',
    t;
  return {
    c() {
      t = E(e);
    },
    m(r, i) {
      B(r, t, i);
    },
    p(r, i) {
      i & 4 && e !== (e = r[2].length + '') && ae(t, e);
    },
    d(r) {
      r && v(t);
    },
  };
}
function Tc(n) {
  let e,
    t = n[2].length > 0 && Tn(n);
  return {
    c() {
      t && t.c(), (e = se());
    },
    m(r, i) {
      t && t.m(r, i), B(r, e, i);
    },
    p(r, i) {
      r[2].length > 0
        ? t
          ? t.p(r, i)
          : ((t = Tn(r)), t.c(), t.m(e.parentNode, e))
        : t && (t.d(1), (t = null));
    },
    d(r) {
      t && t.d(r), r && v(e);
    },
  };
}
function Pn(n) {
  let e,
    t,
    r,
    i = [],
    s = new Map(),
    l,
    o;
  t = new nr({ props: { replyTo: n[1].keyObj, recommendButtons: !1 } });
  let a = n[2];
  const c = (u) => ke(u[11]);
  for (let u = 0; u < a.length; u += 1) {
    let d = qn(n, a, u),
      f = c(d);
    s.set(f, (i[u] = Nn(f, d)));
  }
  return {
    c() {
      (e = _('div')), L(t.$$.fragment), (r = $());
      for (let u = 0; u < i.length; u += 1) i[u].c();
      h(e, 'class', 'flex flex-col gap-4 col-span-12');
    },
    m(u, d) {
      B(u, e, d), F(t, e, null), b(e, r);
      for (let f = 0; f < i.length; f += 1) i[f] && i[f].m(e, null);
      o = !0;
    },
    p(u, d) {
      const f = {};
      d & 2 && (f.replyTo = u[1].keyObj),
        t.$set(f),
        d & 4 &&
          ((a = u[2]),
          P(),
          (i = Kt(i, d, c, 1, u, a, s, e, Yt, Nn, null, qn)),
          N());
    },
    i(u) {
      if (!o) {
        g(t.$$.fragment, u);
        for (let d = 0; d < a.length; d += 1) g(i[d]);
        Ce(() => {
          o && (l || (l = nn(e, _n, {}, !0)), l.run(1));
        }),
          (o = !0);
      }
    },
    o(u) {
      G(t.$$.fragment, u);
      for (let d = 0; d < i.length; d += 1) G(i[d]);
      l || (l = nn(e, _n, {}, !1)), l.run(0), (o = !1);
    },
    d(u) {
      u && v(e), x(t);
      for (let d = 0; d < i.length; d += 1) i[d].d();
      u && l && l.end();
    },
  };
}
function Nn(n, e) {
  let t, r, i;
  return (
    (r = new Nr({ props: { key: e[11], allowReplies: !1 } })),
    {
      key: n,
      first: null,
      c() {
        (t = se()), L(r.$$.fragment), (this.first = t);
      },
      m(s, l) {
        B(s, t, l), F(r, s, l), (i = !0);
      },
      p(s, l) {
        e = s;
        const o = {};
        l & 4 && (o.key = e[11]), r.$set(o);
      },
      i(s) {
        i || (g(r.$$.fragment, s), (i = !0));
      },
      o(s) {
        G(r.$$.fragment, s), (i = !1);
      },
      d(s) {
        s && v(t), x(r, s);
      },
    }
  );
}
function Pc(n) {
  let e, t, r, i;
  const s = [Ac, Ec],
    l = [];
  function o(c, u) {
    return c[1] ? 0 : 1;
  }
  function a(c, u) {
    return u === 0 ? qc(c) : c;
  }
  return (
    (e = o(n)),
    (t = l[e] = s[e](a(n, e))),
    {
      c() {
        t.c(), (r = se());
      },
      m(c, u) {
        l[e].m(c, u), B(c, r, u), (i = !0);
      },
      p(c, [u]) {
        let d = e;
        (e = o(c)),
          e === d
            ? l[e].p(a(c, e), u)
            : (P(),
              G(l[d], 1, 1, () => {
                l[d] = null;
              }),
              N(),
              (t = l[e]),
              t ? t.p(a(c, e), u) : ((t = l[e] = s[e](a(c, e))), t.c()),
              g(t, 1),
              t.m(r.parentNode, r));
      },
      i(c) {
        i || (g(t), (i = !0));
      },
      o(c) {
        G(t), (i = !1);
      },
      d(c) {
        l[e].d(c), c && v(r);
      },
    }
  );
}
function Nc(n, e, t) {
  let { key: r } = e,
    { allowReplies: i = !0 } = e,
    s,
    l = [];
  ne.subscribe((c) => {
    if ((t(1, (s = ye(ke(r)))), c.isLoaded && !s)) return Me(r);
    t(
      2,
      (l = [...(La(r.ship, r) || []), ...(xa(Ge, r) || [])]
        .filter((u, d, f) => d === f.findIndex((p) => ke(p) === ke(u)))
        .sort((u, d) => Ee(d.time) - Ee(u.time)))
    );
  });
  let o = !1;
  const a = () => t(3, (o = !o));
  return (
    (n.$$set = (c) => {
      'key' in c && t(4, (r = c.key)),
        'allowReplies' in c && t(0, (i = c.allowReplies));
    }),
    [i, s, l, o, r, a]
  );
}
class Nr extends Q {
  constructor(e) {
    super(), X(this, e, Nc, Pc, K, { key: 4, allowReplies: 0 });
  }
}
function Ic(n) {
  let e,
    t,
    r,
    i = (n[2] || 'this') + '',
    s,
    l,
    o,
    a,
    c,
    u,
    d,
    f,
    p,
    m,
    k,
    y,
    w,
    M,
    C,
    S,
    H;
  c = new Pr({});
  function O(V) {
    n[6](V);
  }
  let Z = {};
  return (
    n[3] !== void 0 && (Z.value = n[3]),
    (f = new pt({ props: Z })),
    ce.push(() => he(f, 'value', O)),
    (y = new Fe({ props: { key: n[1], clickable: !1 } })),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          (r = E('Say something about ')),
          (s = E(i)),
          (l = $()),
          (o = _('div')),
          (a = _('div')),
          L(c.$$.fragment),
          (u = $()),
          (d = _('div')),
          L(f.$$.fragment),
          (m = $()),
          (k = _('div')),
          L(y.$$.fragment),
          (w = $()),
          (M = _('button')),
          (M.textContent = 'Post'),
          h(t, 'class', 'text-xl'),
          h(a, 'class', 'col-span-1'),
          h(d, 'class', 'col-span-11'),
          h(k, 'class', 'col-span-11 col-start-2'),
          h(
            M,
            'class',
            'bg-hover text-grey hover:bg-mdark hover:duration-500 font-saucebold rounded-lg py-2 px-4 col-start-11 col-span-2 lg:col-start-12 lg:col-span-1'
          ),
          h(o, 'class', 'grid grid-cols-12 gap-4'),
          h(e, 'class', 'flex flex-col justify-center gap-4 p-4');
      },
      m(V, A) {
        B(V, e, A),
          b(e, t),
          b(t, r),
          b(t, s),
          b(e, l),
          b(e, o),
          b(o, a),
          F(c, a, null),
          b(o, u),
          b(o, d),
          F(f, d, null),
          b(o, m),
          b(o, k),
          F(y, k, null),
          b(o, w),
          b(o, M),
          (C = !0),
          S || ((H = te(M, 'click', n[4])), (S = !0));
      },
      p(V, A) {
        (!C || A & 4) && i !== (i = (V[2] || 'this') + '') && ae(s, i);
        const q = {};
        !p && A & 8 && ((p = !0), (q.value = V[3]), fe(() => (p = !1))),
          f.$set(q);
        const z = {};
        A & 2 && (z.key = V[1]), y.$set(z);
      },
      i(V) {
        C ||
          (g(c.$$.fragment, V),
          g(f.$$.fragment, V),
          g(y.$$.fragment, V),
          (C = !0));
      },
      o(V) {
        G(c.$$.fragment, V), G(f.$$.fragment, V), G(y.$$.fragment, V), (C = !1);
      },
      d(V) {
        V && v(e), x(c), x(f), x(y), (S = !1), H();
      },
    }
  );
}
function zc(n) {
  let e, t, r;
  function i(l) {
    n[7](l);
  }
  let s = { $$slots: { default: [Ic] }, $$scope: { ctx: n } };
  return (
    n[0] !== void 0 && (s.open = n[0]),
    (e = new et({ props: s })),
    ce.push(() => he(e, 'open', i)),
    {
      c() {
        L(e.$$.fragment);
      },
      m(l, o) {
        F(e, l, o), (r = !0);
      },
      p(l, [o]) {
        const a = {};
        o & 270 && (a.$$scope = { dirty: o, ctx: l }),
          !t && o & 1 && ((t = !0), (a.open = l[0]), fe(() => (t = !1))),
          e.$set(a);
      },
      i(l) {
        r || (g(e.$$.fragment, l), (r = !0));
      },
      o(l) {
        G(e.$$.fragment, l), (r = !1);
      },
      d(l) {
        x(e, l);
      },
    }
  );
}
function Rc(n, e, t) {
  let { open: r } = e,
    { key: i } = e,
    s = '',
    l,
    o;
  const a = () => {
    ve({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          'prepend-to-feed': [
            { ship: Ge, struc: 'feed', time: '~2000.1.1', cord: '' },
          ],
          bespoke: { retweet: { blurb: o, ref: i } },
        },
      },
    }),
      t(0, (r = !1)),
      t(3, (o = ''));
  };
  function c(d) {
    (o = d), t(3, o);
  }
  function u(d) {
    (r = d), t(0, r);
  }
  return (
    (n.$$set = (d) => {
      'open' in d && t(0, (r = d.open)), 'key' in d && t(1, (i = d.key));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 2 && t(5, (l = ye(ke(i || {})))),
        n.$$.dirty & 32 && t(2, ({ title: s } = $e(l)), s);
    }),
    [r, i, s, o, a, l, c, u]
  );
}
class rr extends Q {
  constructor(e) {
    super(), X(this, e, Rc, zc, K, { open: 0, key: 1 });
  }
}
function In(n, e, t) {
  const r = n.slice();
  return (
    (r[20] = e[t][0]),
    (r[21] = e[t][1].meta.title),
    (r[22] = e[t][1].meta.image),
    r
  );
}
function zn(n, e, t) {
  const r = n.slice();
  return (
    (r[20] = e[t][0]),
    (r[21] = e[t][1].title),
    (r[22] = e[t][1].image),
    (r[8] = e[t][1].color),
    r
  );
}
function Dc(n) {
  let e;
  return {
    c() {
      e = _('div');
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    i: j,
    o: j,
    d(t) {
      t && v(e);
    },
  };
}
function Uc(n) {
  let e, t, r, i, s, l, o;
  return (
    (r = new le({ props: { icon: xl, transparent: !0 } })),
    r.$on('click', n[12]),
    (l = new le({ props: { icon: Ll, transparent: !0 } })),
    l.$on('click', n[13]),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          L(r.$$.fragment),
          (i = $()),
          (s = _('div')),
          L(l.$$.fragment),
          h(t, 'class', 'rounded-full overflow-hidden'),
          h(s, 'class', 'rounded-full overflow-hidden'),
          h(e, 'class', 'flex gap-1');
      },
      m(a, c) {
        B(a, e, c),
          b(e, t),
          F(r, t, null),
          b(e, i),
          b(e, s),
          F(l, s, null),
          (o = !0);
      },
      p: j,
      i(a) {
        o || (g(r.$$.fragment, a), g(l.$$.fragment, a), (o = !0));
      },
      o(a) {
        G(r.$$.fragment, a), G(l.$$.fragment, a), (o = !1);
      },
      d(a) {
        a && v(e), x(r), x(l);
      },
    }
  );
}
function Rn(n) {
  let e;
  return {
    c() {
      (e = _('div')),
        (e.textContent = `You have not installed any apps yet. Install some to recommend them on
          Portal.`);
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function Dn(n) {
  let e,
    t,
    r,
    i,
    s,
    l = (n[21] || n[20]) + '',
    o,
    a,
    c,
    u,
    d;
  r = new je({ props: { image: n[22], title: n[21] || n[20], color: n[8] } });
  function f() {
    return n[14](n[20]);
  }
  return {
    c() {
      (e = _('button')),
        (t = _('div')),
        L(r.$$.fragment),
        (i = $()),
        (s = _('div')),
        (o = E(l)),
        (a = $()),
        h(t, 'class', 'col-span-1'),
        h(s, 'class', 'col-span-11 justify-self-start font-bold'),
        h(
          e,
          'class',
          'grid grid-cols-12 hover:bg-panels rounded-lg items-center gap-4 p-1'
        );
    },
    m(p, m) {
      B(p, e, m),
        b(e, t),
        F(r, t, null),
        b(e, i),
        b(e, s),
        b(s, o),
        b(e, a),
        (c = !0),
        u || ((d = te(e, 'click', f)), (u = !0));
    },
    p(p, m) {
      n = p;
      const k = {};
      m & 128 && (k.image = n[22]),
        m & 128 && (k.title = n[21] || n[20]),
        m & 128 && (k.color = n[8]),
        r.$set(k),
        (!c || m & 128) && l !== (l = (n[21] || n[20]) + '') && ae(o, l);
    },
    i(p) {
      c || (g(r.$$.fragment, p), (c = !0));
    },
    o(p) {
      G(r.$$.fragment, p), (c = !1);
    },
    d(p) {
      p && v(e), x(r), (u = !1), d();
    },
  };
}
function Wc(n) {
  let e,
    t,
    r,
    i = Object.values(n[7]).length === 0,
    s,
    l,
    o = i && Rn(),
    a = Object.entries(n[7]),
    c = [];
  for (let d = 0; d < a.length; d += 1) c[d] = Dn(zn(n, a, d));
  const u = (d) =>
    G(c[d], 1, 1, () => {
      c[d] = null;
    });
  return {
    c() {
      (e = _('div')),
        (t = _('div')),
        (t.textContent = 'Recommend an app'),
        (r = $()),
        o && o.c(),
        (s = $());
      for (let d = 0; d < c.length; d += 1) c[d].c();
      h(t, 'class', 'text-2xl font-bold'),
        h(e, 'class', 'flex flex-col gap-4 p-4');
    },
    m(d, f) {
      B(d, e, f), b(e, t), b(e, r), o && o.m(e, null), b(e, s);
      for (let p = 0; p < c.length; p += 1) c[p] && c[p].m(e, null);
      l = !0;
    },
    p(d, f) {
      if (
        (f & 128 && (i = Object.values(d[7]).length === 0),
        i ? o || ((o = Rn()), o.c(), o.m(e, s)) : o && (o.d(1), (o = null)),
        f & 184)
      ) {
        a = Object.entries(d[7]);
        let p;
        for (p = 0; p < a.length; p += 1) {
          const m = zn(d, a, p);
          c[p]
            ? (c[p].p(m, f), g(c[p], 1))
            : ((c[p] = Dn(m)), c[p].c(), g(c[p], 1), c[p].m(e, null));
        }
        for (P(), p = a.length; p < c.length; p += 1) u(p);
        N();
      }
    },
    i(d) {
      if (!l) {
        for (let f = 0; f < a.length; f += 1) g(c[f]);
        l = !0;
      }
    },
    o(d) {
      c = c.filter(Boolean);
      for (let f = 0; f < c.length; f += 1) G(c[f]);
      l = !1;
    },
    d(d) {
      d && v(e), o && o.d(), _e(c, d);
    },
  };
}
function Un(n) {
  let e;
  return {
    c() {
      (e = _('div')),
        (e.textContent = `You are not a member of any groups yet, join some in order to
          recommend them on Portal.`);
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function Wn(n) {
  let e,
    t,
    r,
    i,
    s,
    l = n[21] + '',
    o,
    a,
    c,
    u,
    d;
  r = new je({ props: { image: n[22], title: n[21] } });
  function f() {
    return n[16](n[20]);
  }
  return {
    c() {
      (e = _('button')),
        (t = _('div')),
        L(r.$$.fragment),
        (i = $()),
        (s = _('div')),
        (o = E(l)),
        (a = $()),
        h(t, 'class', 'col-span-1'),
        h(s, 'class', 'col-span-11 justify-self-start font-bold'),
        h(
          e,
          'class',
          'grid grid-cols-12 hover:bg-panels rounded-lg items-center gap-4 p-1'
        );
    },
    m(p, m) {
      B(p, e, m),
        b(e, t),
        F(r, t, null),
        b(e, i),
        b(e, s),
        b(s, o),
        b(e, a),
        (c = !0),
        u || ((d = te(e, 'click', f)), (u = !0));
    },
    p(p, m) {
      n = p;
      const k = {};
      m & 64 && (k.image = n[22]),
        m & 64 && (k.title = n[21]),
        r.$set(k),
        (!c || m & 64) && l !== (l = n[21] + '') && ae(o, l);
    },
    i(p) {
      c || (g(r.$$.fragment, p), (c = !0));
    },
    o(p) {
      G(r.$$.fragment, p), (c = !1);
    },
    d(p) {
      p && v(e), x(r), (u = !1), d();
    },
  };
}
function Jc(n) {
  let e,
    t,
    r,
    i = Object.values(n[6]).length === 0,
    s,
    l,
    o = i && Un(),
    a = Object.entries(n[6]),
    c = [];
  for (let d = 0; d < a.length; d += 1) c[d] = Wn(In(n, a, d));
  const u = (d) =>
    G(c[d], 1, 1, () => {
      c[d] = null;
    });
  return {
    c() {
      (e = _('div')),
        (t = _('div')),
        (t.textContent = 'Recommend a group'),
        (r = $()),
        o && o.c(),
        (s = $());
      for (let d = 0; d < c.length; d += 1) c[d].c();
      h(t, 'class', 'text-2xl font-bold'),
        h(e, 'class', 'flex flex-col gap-4 p4');
    },
    m(d, f) {
      B(d, e, f), b(e, t), b(e, r), o && o.m(e, null), b(e, s);
      for (let p = 0; p < c.length; p += 1) c[p] && c[p].m(e, null);
      l = !0;
    },
    p(d, f) {
      if (
        (f & 64 && (i = Object.values(d[6]).length === 0),
        i ? o || ((o = Un()), o.c(), o.m(e, s)) : o && (o.d(1), (o = null)),
        f & 116)
      ) {
        a = Object.entries(d[6]);
        let p;
        for (p = 0; p < a.length; p += 1) {
          const m = In(d, a, p);
          c[p]
            ? (c[p].p(m, f), g(c[p], 1))
            : ((c[p] = Wn(m)), c[p].c(), g(c[p], 1), c[p].m(e, null));
        }
        for (P(), p = a.length; p < c.length; p += 1) u(p);
        N();
      }
    },
    i(d) {
      if (!l) {
        for (let f = 0; f < a.length; f += 1) g(c[f]);
        l = !0;
      }
    },
    o(d) {
      c = c.filter(Boolean);
      for (let f = 0; f < c.length; f += 1) G(c[f]);
      l = !1;
    },
    d(d) {
      d && v(e), o && o.d(), _e(c, d);
    },
  };
}
function Yc(n) {
  let e,
    t,
    r,
    i,
    s,
    l,
    o,
    a,
    c,
    u,
    d,
    f,
    p,
    m,
    k,
    y,
    w,
    M,
    C,
    S,
    H,
    O,
    Z,
    V,
    A,
    q;
  i = new Oe({ props: { patp: Ge } });
  function z(W) {
    n[11](W);
  }
  let U = { placeholder: 'Share a limerick, maybe' };
  n[1] !== void 0 && (U.value = n[1]),
    (o = new pt({ props: U })),
    ce.push(() => he(o, 'value', z));
  const J = [Uc, Dc],
    T = [];
  function Y(W, de) {
    return W[0] ? 0 : 1;
  }
  (d = Y(n)), (f = T[d] = J[d](n));
  function ie(W) {
    n[15](W);
  }
  let R = { $$slots: { default: [Wc] }, $$scope: { ctx: n } };
  n[3] !== void 0 && (R.open = n[3]),
    (y = new et({ props: R })),
    ce.push(() => he(y, 'open', ie));
  function I(W) {
    n[17](W);
  }
  let oe = { $$slots: { default: [Jc] }, $$scope: { ctx: n } };
  n[2] !== void 0 && (oe.open = n[2]),
    (C = new et({ props: oe })),
    ce.push(() => he(C, 'open', I));
  function Be(W) {
    n[18](W);
  }
  let Te = { key: n[5] };
  return (
    n[4] !== void 0 && (Te.open = n[4]),
    (O = new rr({ props: Te })),
    ce.push(() => he(O, 'open', Be)),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          (r = _('div')),
          L(i.$$.fragment),
          (s = $()),
          (l = _('div')),
          L(o.$$.fragment),
          (c = $()),
          (u = _('div')),
          f.c(),
          (p = $()),
          (m = _('button')),
          (m.textContent = 'Post'),
          (k = $()),
          L(y.$$.fragment),
          (M = $()),
          L(C.$$.fragment),
          (H = $()),
          L(O.$$.fragment),
          h(r, 'class', 'rounded-md overflow-hidden align-middle'),
          h(t, 'class', 'col-span-1 pr-2'),
          h(l, 'class', 'col-span-11'),
          h(
            m,
            'class',
            'bg-hover text-grey hover:bg-mdark hover:duration-500 font-saucebold rounded-lg px-3 py-1 self-end'
          ),
          h(u, 'class', 'col-span-12 col-start-2 flex justify-between'),
          h(
            e,
            'class',
            'grid grid-cols-12 bg-panels py-3 pl-3 rounded-lg pr-3'
          );
      },
      m(W, de) {
        B(W, e, de),
          b(e, t),
          b(t, r),
          F(i, r, null),
          b(e, s),
          b(e, l),
          F(o, l, null),
          b(e, c),
          b(e, u),
          T[d].m(u, null),
          b(u, p),
          b(u, m),
          b(e, k),
          F(y, e, null),
          b(e, M),
          F(C, e, null),
          b(e, H),
          F(O, e, null),
          (V = !0),
          A || ((q = te(m, 'click', n[9])), (A = !0));
      },
      p(W, [de]) {
        const Le = {};
        !a && de & 2 && ((a = !0), (Le.value = W[1]), fe(() => (a = !1))),
          o.$set(Le);
        let Pe = d;
        (d = Y(W)),
          d === Pe
            ? T[d].p(W, de)
            : (P(),
              G(T[Pe], 1, 1, () => {
                T[Pe] = null;
              }),
              N(),
              (f = T[d]),
              f ? f.p(W, de) : ((f = T[d] = J[d](W)), f.c()),
              g(f, 1),
              f.m(u, p));
        const st = {};
        de & 134217912 && (st.$$scope = { dirty: de, ctx: W }),
          !w && de & 8 && ((w = !0), (st.open = W[3]), fe(() => (w = !1))),
          y.$set(st);
        const kt = {};
        de & 134217844 && (kt.$$scope = { dirty: de, ctx: W }),
          !S && de & 4 && ((S = !0), (kt.open = W[2]), fe(() => (S = !1))),
          C.$set(kt);
        const at = {};
        de & 32 && (at.key = W[5]),
          !Z && de & 16 && ((Z = !0), (at.open = W[4]), fe(() => (Z = !1))),
          O.$set(at);
      },
      i(W) {
        V ||
          (g(i.$$.fragment, W),
          g(o.$$.fragment, W),
          g(f),
          g(y.$$.fragment, W),
          g(C.$$.fragment, W),
          g(O.$$.fragment, W),
          (V = !0));
      },
      o(W) {
        G(i.$$.fragment, W),
          G(o.$$.fragment, W),
          G(f),
          G(y.$$.fragment, W),
          G(C.$$.fragment, W),
          G(O.$$.fragment, W),
          (V = !1);
      },
      d(W) {
        W && v(e), x(i), x(o), T[d].d(), x(y), x(C), x(O), (A = !1), q();
      },
    }
  );
}
function Kc(n, e, t) {
  let { replyTo: r } = e,
    { recommendButtons: i = !0 } = e,
    s = ht(),
    l;
  const o = () => {
    let Z = {
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        create: {
          bespoke: { other: { title: '', blurb: l, link: '', image: '' } },
        },
      },
    };
    r
      ? (Z.json.create['tags-to'] = [
          {
            key: r,
            'tag-to': `/${Ge}/reply-to`,
            'tag-from': `/${r.ship}/reply-from`,
          },
        ])
      : (Z.json.create['prepend-to-feed'] = [
          { ship: Ge, struc: 'feed', time: '~2000.1.1', cord: '' },
        ]),
      ve(Z),
      t(1, (l = '')),
      s('post');
  };
  let a,
    c,
    u,
    d,
    f,
    p = {},
    m = {};
  ne.subscribe((Z) => {
    Z.groups &&
      Object.entries(Z.groups).forEach(([V, A]) => {
        var q;
        (q = A == null ? void 0 : A.meta) != null &&
          q.title &&
          t(6, (p[V] = A), p);
      }),
      Z.apps &&
        Object.entries(Z.apps).forEach(([V, A]) => {
          const q = `${A.ship}/${V}`;
          t(7, (m[q] = A), m);
        }),
      t(8, ({ color: f } = Re(Ge).bespoke || {}), f);
  });
  function k(Z) {
    (l = Z), t(1, l);
  }
  const y = () => {
      t(3, (c = !0));
    },
    w = () => {
      t(2, (a = !0));
    },
    M = (Z) => {
      t(3, (c = !1)), t(4, (u = !0)), t(5, (d = we(`/app/${Z}/`)));
    };
  function C(Z) {
    (c = Z), t(3, c);
  }
  const S = (Z) => {
    t(2, (a = !1)), t(4, (u = !0)), t(5, (d = we(`/group/${Z}/`)));
  };
  function H(Z) {
    (a = Z), t(2, a);
  }
  function O(Z) {
    (u = Z), t(4, u);
  }
  return (
    (n.$$set = (Z) => {
      'replyTo' in Z && t(10, (r = Z.replyTo)),
        'recommendButtons' in Z && t(0, (i = Z.recommendButtons));
    }),
    [i, l, a, c, u, d, p, m, f, o, r, k, y, w, M, C, S, H, O]
  );
}
class nr extends Q {
  constructor(e) {
    super(), X(this, e, Kc, Yc, K, { replyTo: 10, recommendButtons: 0 });
  }
}
function Jn(n, e, t) {
  const r = n.slice();
  return (
    (r[12] = e[t].struc),
    (r[4] = e[t].image),
    (r[3] = e[t].title),
    (r[13] = e[t].color),
    (r[15] = t),
    r
  );
}
function Xc(n) {
  let e, t, r;
  return (
    (t = new vr({ props: { class: 'w-16 h-16' } })),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          h(e, 'class', 'flex justify-center items-center p-10 w-full h-full');
      },
      m(i, s) {
        B(i, e, s), F(t, e, null), (r = !0);
      },
      p: j,
      i(i) {
        r || (g(t.$$.fragment, i), (r = !0));
      },
      o(i) {
        G(t.$$.fragment, i), (r = !1);
      },
      d(i) {
        i && v(e), x(t);
      },
    }
  );
}
function Qc(n) {
  let e, t, r, i, s, l;
  const o = [t1, e1],
    a = [];
  function c(d, f) {
    return d[4] ? 0 : 1;
  }
  (r = c(n)), (i = a[r] = o[r](n));
  let u = n[0] && Kn(n);
  return {
    c() {
      (e = _('div')),
        (t = _('div')),
        i.c(),
        (s = $()),
        u && u.c(),
        h(t, 'class', 'grid grid-cols-2 grid-rows-2'),
        h(e, 'class', 'rounded-lg overflow-hidden');
    },
    m(d, f) {
      B(d, e, f),
        b(e, t),
        a[r].m(t, null),
        n[9](t),
        b(e, s),
        u && u.m(e, null),
        (l = !0);
    },
    p(d, f) {
      let p = r;
      (r = c(d)),
        r === p
          ? a[r].p(d, f)
          : (P(),
            G(a[p], 1, 1, () => {
              a[p] = null;
            }),
            N(),
            (i = a[r]),
            i ? i.p(d, f) : ((i = a[r] = o[r](d)), i.c()),
            g(i, 1),
            i.m(t, null)),
        d[0]
          ? u
            ? u.p(d, f)
            : ((u = Kn(d)), u.c(), u.m(e, null))
          : u && (u.d(1), (u = null));
    },
    i(d) {
      l || (g(i), (l = !0));
    },
    o(d) {
      G(i), (l = !1);
    },
    d(d) {
      d && v(e), a[r].d(), n[9](null), u && u.d();
    },
  };
}
function e1(n) {
  let e,
    t,
    r = n[1],
    i = [];
  for (let l = 0; l < r.length; l += 1) i[l] = Yn(Jn(n, r, l));
  const s = (l) =>
    G(i[l], 1, 1, () => {
      i[l] = null;
    });
  return {
    c() {
      for (let l = 0; l < i.length; l += 1) i[l].c();
      e = se();
    },
    m(l, o) {
      for (let a = 0; a < i.length; a += 1) i[a] && i[a].m(l, o);
      B(l, e, o), (t = !0);
    },
    p(l, o) {
      if (o & 34) {
        r = l[1];
        let a;
        for (a = 0; a < r.length; a += 1) {
          const c = Jn(l, r, a);
          i[a]
            ? (i[a].p(c, o), g(i[a], 1))
            : ((i[a] = Yn(c)), i[a].c(), g(i[a], 1), i[a].m(e.parentNode, e));
        }
        for (P(), a = r.length; a < i.length; a += 1) s(a);
        N();
      }
    },
    i(l) {
      if (!t) {
        for (let o = 0; o < r.length; o += 1) g(i[o]);
        t = !0;
      }
    },
    o(l) {
      i = i.filter(Boolean);
      for (let o = 0; o < i.length; o += 1) G(i[o]);
      t = !1;
    },
    d(l) {
      _e(i, l), l && v(e);
    },
  };
}
function t1(n) {
  let e, t, r;
  return (
    (t = new je({ props: { image: n[4], title: n[3] } })),
    t.$on('load', n[5]),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          h(e, 'class', 'row-span-2 col-span-2');
      },
      m(i, s) {
        B(i, e, s), F(t, e, null), (r = !0);
      },
      p(i, s) {
        const l = {};
        s & 16 && (l.image = i[4]), s & 8 && (l.title = i[3]), t.$set(l);
      },
      i(i) {
        r || (g(t.$$.fragment, i), (r = !0));
      },
      o(i) {
        G(t.$$.fragment, i), (r = !1);
      },
      d(i) {
        i && v(e), x(t);
      },
    }
  );
}
function r1(n) {
  let e, t;
  return (
    (e = new je({ props: { image: n[4], title: n[3], color: n[13] } })),
    e.$on('load', n[5]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 2 && (s.image = r[4]),
          i & 2 && (s.title = r[3]),
          i & 2 && (s.color = r[13]),
          e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function n1(n) {
  let e, t, r, i, s, l, o;
  return (
    (e = new Oe({ props: { patp: n[3] } })),
    {
      c() {
        L(e.$$.fragment),
          (t = $()),
          (r = _('img')),
          Ye(r.src, (i = wl)) || h(r, 'src', i),
          h(r, 'class', 'hidden');
      },
      m(a, c) {
        F(e, a, c),
          B(a, t, c),
          B(a, r, c),
          (s = !0),
          l || ((o = te(r, 'load', n[5])), (l = !0));
      },
      p(a, c) {
        const u = {};
        c & 2 && (u.patp = a[3]), e.$set(u);
      },
      i(a) {
        s || (g(e.$$.fragment, a), (s = !0));
      },
      o(a) {
        G(e.$$.fragment, a), (s = !1);
      },
      d(a) {
        x(e, a), a && v(t), a && v(r), (l = !1), o();
      },
    }
  );
}
function Yn(n) {
  let e, t, r, i, s;
  const l = [n1, r1],
    o = [];
  function a(c, u) {
    return c[12] === 'ship' ? 0 : 1;
  }
  return (
    (t = a(n)),
    (r = o[t] = l[t](n)),
    {
      c() {
        (e = _('div')),
          r.c(),
          (i = $()),
          h(e, 'class', 'overflow-hidden'),
          D(
            e,
            'col-span-2',
            n[1].length === 1 ||
              (n[1].length === 3 && n[15] === 2) ||
              n[1].length === 2
          ),
          D(e, 'row-span-2', n[1].length === 1);
      },
      m(c, u) {
        B(c, e, u), o[t].m(e, null), b(e, i), (s = !0);
      },
      p(c, u) {
        let d = t;
        (t = a(c)),
          t === d
            ? o[t].p(c, u)
            : (P(),
              G(o[d], 1, 1, () => {
                o[d] = null;
              }),
              N(),
              (r = o[t]),
              r ? r.p(c, u) : ((r = o[t] = l[t](c)), r.c()),
              g(r, 1),
              r.m(e, i)),
          (!s || u & 2) &&
            D(
              e,
              'col-span-2',
              c[1].length === 1 ||
                (c[1].length === 3 && c[15] === 2) ||
                c[1].length === 2
            ),
          (!s || u & 2) && D(e, 'row-span-2', c[1].length === 1);
      },
      i(c) {
        s || (g(r), (s = !0));
      },
      o(c) {
        G(r), (s = !1);
      },
      d(c) {
        c && v(e), o[t].d();
      },
    }
  );
}
function Kn(n) {
  let e, t, r;
  return {
    c() {
      (e = _('div')),
        (t = _('div')),
        (r = E(n[3])),
        h(e, 'class', 'bg-panels p-2');
    },
    m(i, s) {
      B(i, e, s), b(e, t), b(t, r);
    },
    p(i, s) {
      s & 8 && ae(r, i[3]);
    },
    d(i) {
      i && v(e);
    },
  };
}
function i1(n) {
  let e, t, r, i;
  const s = [Qc, Xc],
    l = [];
  function o(a, c) {
    return a[1] && a[1].length > 0 ? 0 : 1;
  }
  return (
    (e = o(n)),
    (t = l[e] = s[e](n)),
    {
      c() {
        t.c(), (r = se());
      },
      m(a, c) {
        l[e].m(a, c), B(a, r, c), (i = !0);
      },
      p(a, [c]) {
        let u = e;
        (e = o(a)),
          e === u
            ? l[e].p(a, c)
            : (P(),
              G(l[u], 1, 1, () => {
                l[u] = null;
              }),
              N(),
              (t = l[e]),
              t ? t.p(a, c) : ((t = l[e] = s[e](a)), t.c()),
              g(t, 1),
              t.m(r.parentNode, r));
      },
      i(a) {
        i || (g(t), (i = !0));
      },
      o(a) {
        G(t), (i = !1);
      },
      d(a) {
        l[e].d(a), a && v(r);
      },
    }
  );
}
function l1(n, e, t) {
  let r;
  ze(n, ne, (k) => t(8, (r = k)));
  let { key: i } = e,
    { withTitle: s = !0 } = e,
    l,
    o,
    a,
    c,
    u,
    d,
    f;
  const p = () => {
    (d = u && u.clientHeight),
      c &&
        (c.length === 3 || c.length === 2) &&
        !a &&
        !f &&
        (t(2, (u.style.height = `${d / 2}px`), u), (f = !0));
  };
  function m(k) {
    ce[k ? 'unshift' : 'push'](() => {
      (u = k), t(2, u);
    });
  }
  return (
    (n.$$set = (k) => {
      'key' in k && t(6, (i = k.key)),
        'withTitle' in k && t(0, (s = k.withTitle));
    }),
    (n.$$.update = () => {
      var k, y;
      n.$$.dirty & 448 &&
        (t(7, (l = ye(ke(i)))),
        t(
          3,
          ({ title: o, image: a } = $e(l)),
          o,
          (t(4, a), t(6, i), t(7, l), t(8, r))
        ),
        t(
          1,
          (c =
            (y =
              (k = l == null ? void 0 : l.bespoke) == null
                ? void 0
                : k['key-list']) == null
              ? void 0
              : y
                  .map((w) => {
                    let M = ye(ke(w));
                    if (r.isLoaded && !M) {
                      Me(w);
                      return;
                    }
                    return $e(M);
                  })
                  .filter((w) => !!w)
                  .slice(0, 4))
        ));
    }),
    [s, c, u, o, a, p, i, l, r, m]
  );
}
class Ir extends Q {
  constructor(e) {
    super(), X(this, e, l1, i1, K, { key: 6, withTitle: 0 });
  }
}
function Xn(n, e, t) {
  const r = n.slice();
  return (r[7] = e[t]), r;
}
function s1(n) {
  let e,
    t,
    r = n[2],
    i = [];
  for (let l = 0; l < r.length; l += 1) i[l] = Qn(Xn(n, r, l));
  const s = (l) =>
    G(i[l], 1, 1, () => {
      i[l] = null;
    });
  return {
    c() {
      for (let l = 0; l < i.length; l += 1) i[l].c();
      e = se();
    },
    m(l, o) {
      for (let a = 0; a < i.length; a += 1) i[a] && i[a].m(l, o);
      B(l, e, o), (t = !0);
    },
    p(l, o) {
      if (o & 4) {
        r = l[2];
        let a;
        for (a = 0; a < r.length; a += 1) {
          const c = Xn(l, r, a);
          i[a]
            ? (i[a].p(c, o), g(i[a], 1))
            : ((i[a] = Qn(c)), i[a].c(), g(i[a], 1), i[a].m(e.parentNode, e));
        }
        for (P(), a = r.length; a < i.length; a += 1) s(a);
        N();
      }
    },
    i(l) {
      if (!t) {
        for (let o = 0; o < r.length; o += 1) g(i[o]);
        t = !0;
      }
    },
    o(l) {
      i = i.filter(Boolean);
      for (let o = 0; o < i.length; o += 1) G(i[o]);
      t = !1;
    },
    d(l) {
      _e(i, l), l && v(e);
    },
  };
}
function a1(n) {
  let e, t, r;
  return {
    c() {
      (e = _('div')),
        (t = E(n[1])),
        (r = E(" hasn't created any collections on Portal yet.")),
        h(e, 'class', 'col-span-12');
    },
    m(i, s) {
      B(i, e, s), b(e, t), b(e, r);
    },
    p(i, s) {
      s & 2 && ae(t, i[1]);
    },
    i: j,
    o: j,
    d(i) {
      i && v(e);
    },
  };
}
function o1(n) {
  let e;
  return {
    c() {
      (e = _('div')),
        (e.textContent = 'Loading...'),
        h(e, 'class', 'col-span-12');
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    i: j,
    o: j,
    d(t) {
      t && v(e);
    },
  };
}
function Qn(n) {
  let e, t, r, i, s, l, o, a;
  return (
    (t = new Ir({ props: { key: n[7].keyObj } })),
    {
      c() {
        (e = _('a')),
          L(t.$$.fragment),
          (r = $()),
          h(e, 'href', (i = `${n[7].keyStr}`)),
          h(e, 'class', 'col-span-4 h-full');
      },
      m(c, u) {
        B(c, e, u),
          F(t, e, null),
          b(e, r),
          (l = !0),
          o || ((a = qe(Ie.call(null, e))), (o = !0));
      },
      p(c, u) {
        const d = {};
        u & 4 && (d.key = c[7].keyObj),
          t.$set(d),
          (!l || (u & 4 && i !== (i = `${c[7].keyStr}`))) && h(e, 'href', i);
      },
      i(c) {
        l ||
          (g(t.$$.fragment, c),
          s ||
            Ce(() => {
              (s = Jt(e, tr, {})), s.start();
            }),
          (l = !0));
      },
      o(c) {
        G(t.$$.fragment, c), (l = !1);
      },
      d(c) {
        c && v(e), x(t), (o = !1), a();
      },
    }
  );
}
function c1(n) {
  let e, t, r, i;
  const s = [o1, a1, s1],
    l = [];
  function o(a, c) {
    return a[0] || (a[3].length > 0 && a[2].length === 0)
      ? 0
      : a[2].length === 0
      ? 1
      : 2;
  }
  return (
    (t = o(n)),
    (r = l[t] = s[t](n)),
    {
      c() {
        (e = _('div')),
          r.c(),
          h(e, 'class', 'grid grid-cols-12 gap-4 items-start');
      },
      m(a, c) {
        B(a, e, c), l[t].m(e, null), (i = !0);
      },
      p(a, [c]) {
        let u = t;
        (t = o(a)),
          t === u
            ? l[t].p(a, c)
            : (P(),
              G(l[u], 1, 1, () => {
                l[u] = null;
              }),
              N(),
              (r = l[t]),
              r ? r.p(a, c) : ((r = l[t] = s[t](a)), r.c()),
              g(r, 1),
              r.m(e, null));
      },
      i(a) {
        i || (g(r), (i = !0));
      },
      o(a) {
        G(r), (i = !1);
      },
      d(a) {
        a && v(e), l[t].d();
      },
    }
  );
}
function u1(n, e, t) {
  let r;
  ze(n, ne, (u) => t(5, (r = u)));
  let { patp: i } = e,
    { loading: s } = e,
    l,
    o,
    a = {};
  const c = (u) => {
    t(3, (o = _r(u) || [])),
      o.forEach((d) => {
        r.isLoaded &&
          !ye(ke(d)) &&
          !a[ke(d)] &&
          d.time !== 'all' &&
          ((a[ke(d)] = !0), Me(d));
      }),
      t(
        2,
        (l = (_r(u) || [])
          .map((d) => ye(ke(d)))
          .filter((d) => !!d)
          .map((d) => (delete a[ke(d.keyObj)], d))
          .filter((d) => {
            var f, p;
            return (
              ((p =
                (f = d == null ? void 0 : d.bespoke) == null
                  ? void 0
                  : f['key-list']) == null
                ? void 0
                : p.length) > 0
            );
          })
          .filter((d) => {
            var f;
            return (
              ((f = d == null ? void 0 : d.keyObj) == null
                ? void 0
                : f.time) !== 'all'
            );
          }))
      ),
      l.length > 0 && t(0, (s = !1));
  };
  return (
    ne.subscribe(() => {
      c(i);
    }),
    (n.$$set = (u) => {
      'patp' in u && t(1, (i = u.patp)),
        'loading' in u && t(0, (s = u.loading));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 2 && c(i);
    }),
    [s, i, l, o]
  );
}
class d1 extends Q {
  constructor(e) {
    super(), X(this, e, u1, c1, K, { patp: 1, loading: 0 });
  }
}
function ei(n, e, t) {
  const r = n.slice();
  return (r[38] = e[t]), r;
}
function ti(n, e, t) {
  const r = n.slice();
  return (r[38] = e[t]), r;
}
function ri(n, e, t) {
  const r = n.slice();
  (r[35] = e[t][0]),
    (r[36] = e[t][1].title),
    (r[37] = e[t][1].image),
    (r[41] = e[t][1].ship),
    (r[42] = e[t][1].info);
  const i = { struc: 'app', ship: r[41], cord: r[35], time: '' };
  return (r[38] = i), r;
}
function ni(n, e, t) {
  const r = n.slice();
  (r[35] = e[t][0]), (r[36] = e[t][1].meta.title), (r[37] = e[t][1].meta.image);
  const i = {
    struc: 'group',
    ship: r[35].split('/')[0],
    cord: r[35].split('/')[1],
    time: '',
  };
  return (r[38] = i), r;
}
function f1(n) {
  let e;
  return {
    c() {
      e = E('New Collection');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function h1(n) {
  let e, t, r, i, s, l, o, a;
  function c(d) {
    n[25](d);
  }
  let u = {};
  return (
    n[8] !== void 0 && (u.item = n[8]),
    (e = new qr({ props: u })),
    ce.push(() => he(e, 'item', c)),
    (s = new le({
      props: { icon: Ft, $$slots: { default: [_1] }, $$scope: { ctx: n } },
    })),
    s.$on('click', n[26]),
    (o = new le({
      props: { icon: We, $$slots: { default: [v1] }, $$scope: { ctx: n } },
    })),
    o.$on('click', n[27]),
    {
      c() {
        L(e.$$.fragment),
          (r = $()),
          (i = _('div')),
          L(s.$$.fragment),
          (l = $()),
          L(o.$$.fragment),
          h(i, 'class', 'flex justify-between');
      },
      m(d, f) {
        F(e, d, f),
          B(d, r, f),
          B(d, i, f),
          F(s, i, null),
          b(i, l),
          F(o, i, null),
          (a = !0);
      },
      p(d, f) {
        const p = {};
        !t && f[0] & 256 && ((t = !0), (p.item = d[8]), fe(() => (t = !1))),
          e.$set(p);
        const m = {};
        f[1] & 262144 && (m.$$scope = { dirty: f, ctx: d }), s.$set(m);
        const k = {};
        f[1] & 262144 && (k.$$scope = { dirty: f, ctx: d }), o.$set(k);
      },
      i(d) {
        a ||
          (g(e.$$.fragment, d),
          g(s.$$.fragment, d),
          g(o.$$.fragment, d),
          (a = !0));
      },
      o(d) {
        G(e.$$.fragment, d), G(s.$$.fragment, d), G(o.$$.fragment, d), (a = !1);
      },
      d(d) {
        x(e, d), d && v(r), d && v(i), x(s), x(o);
      },
    }
  );
}
function m1(n) {
  let e, t, r, i, s, l, o;
  (i = new le({
    props: { icon: Mt, $$slots: { default: [B1] }, $$scope: { ctx: n } },
  })),
    i.$on('click', n[24]);
  let a = n[6],
    c = [];
  for (let d = 0; d < a.length; d += 1) c[d] = ii(ei(n, a, d));
  const u = (d) =>
    G(c[d], 1, 1, () => {
      c[d] = null;
    });
  return {
    c() {
      (e = _('div')),
        (e.textContent = 'Add links, images, etc.'),
        (t = $()),
        (r = _('div')),
        L(i.$$.fragment),
        (s = $());
      for (let d = 0; d < c.length; d += 1) c[d].c();
      (l = se()),
        h(e, 'class', 'text-2xl font-bold'),
        h(r, 'class', 'flex flex-col items-center justify-center gap-4');
    },
    m(d, f) {
      B(d, e, f), B(d, t, f), B(d, r, f), F(i, r, null), B(d, s, f);
      for (let p = 0; p < c.length; p += 1) c[p] && c[p].m(d, f);
      B(d, l, f), (o = !0);
    },
    p(d, f) {
      const p = {};
      if (
        (f[1] & 262144 && (p.$$scope = { dirty: f, ctx: d }),
        i.$set(p),
        f[0] & 64)
      ) {
        a = d[6];
        let m;
        for (m = 0; m < a.length; m += 1) {
          const k = ei(d, a, m);
          c[m]
            ? (c[m].p(k, f), g(c[m], 1))
            : ((c[m] = ii(k)), c[m].c(), g(c[m], 1), c[m].m(l.parentNode, l));
        }
        for (P(), m = a.length; m < c.length; m += 1) u(m);
        N();
      }
    },
    i(d) {
      if (!o) {
        g(i.$$.fragment, d);
        for (let f = 0; f < a.length; f += 1) g(c[f]);
        o = !0;
      }
    },
    o(d) {
      G(i.$$.fragment, d), (c = c.filter(Boolean));
      for (let f = 0; f < c.length; f += 1) G(c[f]);
      o = !1;
    },
    d(d) {
      d && v(e), d && v(t), d && v(r), x(i), d && v(s), _e(c, d), d && v(l);
    },
  };
}
function p1(n) {
  let e, t, r, i, s, l, o, a;
  function c(d) {
    n[21](d);
  }
  let u = {};
  return (
    n[7] !== void 0 && (u.ship = n[7]),
    (e = new _m({ props: u })),
    ce.push(() => he(e, 'ship', c)),
    (s = new le({
      props: { icon: Ft, $$slots: { default: [y1] }, $$scope: { ctx: n } },
    })),
    s.$on('click', n[22]),
    (o = new le({
      props: { icon: We, $$slots: { default: [w1] }, $$scope: { ctx: n } },
    })),
    o.$on('click', n[23]),
    {
      c() {
        L(e.$$.fragment),
          (r = $()),
          (i = _('div')),
          L(s.$$.fragment),
          (l = $()),
          L(o.$$.fragment),
          h(i, 'class', 'flex justify-between');
      },
      m(d, f) {
        F(e, d, f),
          B(d, r, f),
          B(d, i, f),
          F(s, i, null),
          b(i, l),
          F(o, i, null),
          (a = !0);
      },
      p(d, f) {
        const p = {};
        !t && f[0] & 128 && ((t = !0), (p.ship = d[7]), fe(() => (t = !1))),
          e.$set(p);
        const m = {};
        f[1] & 262144 && (m.$$scope = { dirty: f, ctx: d }), s.$set(m);
        const k = {};
        f[1] & 262144 && (k.$$scope = { dirty: f, ctx: d }), o.$set(k);
      },
      i(d) {
        a ||
          (g(e.$$.fragment, d),
          g(s.$$.fragment, d),
          g(o.$$.fragment, d),
          (a = !0));
      },
      o(d) {
        G(e.$$.fragment, d), G(s.$$.fragment, d), G(o.$$.fragment, d), (a = !1);
      },
      d(d) {
        x(e, d), d && v(r), d && v(i), x(s), x(o);
      },
    }
  );
}
function b1(n) {
  let e, t, r, i, s, l, o;
  (i = new le({
    props: { icon: Mt, $$slots: { default: [C1] }, $$scope: { ctx: n } },
  })),
    i.$on('click', n[20]);
  let a = n[5],
    c = [];
  for (let d = 0; d < a.length; d += 1) c[d] = li(ti(n, a, d));
  const u = (d) =>
    G(c[d], 1, 1, () => {
      c[d] = null;
    });
  return {
    c() {
      (e = _('div')),
        (e.textContent = 'Add other users'),
        (t = $()),
        (r = _('div')),
        L(i.$$.fragment),
        (s = $());
      for (let d = 0; d < c.length; d += 1) c[d].c();
      (l = se()),
        h(e, 'class', 'text-2xl font-bold'),
        h(r, 'class', 'flex flex-col items-center justify-center gap-4');
    },
    m(d, f) {
      B(d, e, f), B(d, t, f), B(d, r, f), F(i, r, null), B(d, s, f);
      for (let p = 0; p < c.length; p += 1) c[p] && c[p].m(d, f);
      B(d, l, f), (o = !0);
    },
    p(d, f) {
      const p = {};
      if (
        (f[1] & 262144 && (p.$$scope = { dirty: f, ctx: d }),
        i.$set(p),
        f[0] & 32)
      ) {
        a = d[5];
        let m;
        for (m = 0; m < a.length; m += 1) {
          const k = ti(d, a, m);
          c[m]
            ? (c[m].p(k, f), g(c[m], 1))
            : ((c[m] = li(k)), c[m].c(), g(c[m], 1), c[m].m(l.parentNode, l));
        }
        for (P(), m = a.length; m < c.length; m += 1) u(m);
        N();
      }
    },
    i(d) {
      if (!o) {
        g(i.$$.fragment, d);
        for (let f = 0; f < a.length; f += 1) g(c[f]);
        o = !0;
      }
    },
    o(d) {
      G(i.$$.fragment, d), (c = c.filter(Boolean));
      for (let f = 0; f < c.length; f += 1) G(c[f]);
      o = !1;
    },
    d(d) {
      d && v(e), d && v(t), d && v(r), x(i), d && v(s), _e(c, d), d && v(l);
    },
  };
}
function k1(n) {
  let e,
    t,
    r,
    i,
    s = Object.entries(n[1]),
    l = [];
  for (let a = 0; a < s.length; a += 1) l[a] = si(ri(n, s, a));
  const o = (a) =>
    G(l[a], 1, 1, () => {
      l[a] = null;
    });
  return {
    c() {
      (e = _('div')), (e.textContent = 'Add apps'), (t = $());
      for (let a = 0; a < l.length; a += 1) l[a].c();
      (r = se()), h(e, 'class', 'text-2xl font-bold');
    },
    m(a, c) {
      B(a, e, c), B(a, t, c);
      for (let u = 0; u < l.length; u += 1) l[u] && l[u].m(a, c);
      B(a, r, c), (i = !0);
    },
    p(a, c) {
      if (c[0] & 8194) {
        s = Object.entries(a[1]);
        let u;
        for (u = 0; u < s.length; u += 1) {
          const d = ri(a, s, u);
          l[u]
            ? (l[u].p(d, c), g(l[u], 1))
            : ((l[u] = si(d)), l[u].c(), g(l[u], 1), l[u].m(r.parentNode, r));
        }
        for (P(), u = s.length; u < l.length; u += 1) o(u);
        N();
      }
    },
    i(a) {
      if (!i) {
        for (let c = 0; c < s.length; c += 1) g(l[c]);
        i = !0;
      }
    },
    o(a) {
      l = l.filter(Boolean);
      for (let c = 0; c < l.length; c += 1) G(l[c]);
      i = !1;
    },
    d(a) {
      a && v(e), a && v(t), _e(l, a), a && v(r);
    },
  };
}
function g1(n) {
  let e, t, r, i, s;
  const l = [M1, $1],
    o = [];
  function a(c, u) {
    return (
      u[0] & 1 && (e = null),
      e == null && (e = Object.entries(c[0]).length > 0),
      e ? 0 : 1
    );
  }
  return (
    (t = a(n, [-1, -1])),
    (r = o[t] = l[t](n)),
    {
      c() {
        r.c(), (i = se());
      },
      m(c, u) {
        o[t].m(c, u), B(c, i, u), (s = !0);
      },
      p(c, u) {
        let d = t;
        (t = a(c, u)),
          t === d
            ? o[t].p(c, u)
            : (P(),
              G(o[d], 1, 1, () => {
                o[d] = null;
              }),
              N(),
              (r = o[t]),
              r ? r.p(c, u) : ((r = o[t] = l[t](c)), r.c()),
              g(r, 1),
              r.m(i.parentNode, i));
      },
      i(c) {
        s || (g(r), (s = !0));
      },
      o(c) {
        G(r), (s = !1);
      },
      d(c) {
        o[t].d(c), c && v(i);
      },
    }
  );
}
function G1(n) {
  let e, t, r, i, s, l, o, a, c, u, d;
  function f(m) {
    n[19](m);
  }
  let p = {
    placeholder: 'Things to help you navigate Urbit for the first time',
  };
  return (
    n[4] !== void 0 && (p.value = n[4]),
    (o = new pt({ props: p })),
    ce.push(() => he(o, 'value', f)),
    {
      c() {
        (e = _('div')),
          (e.textContent = 'Give your collection a name'),
          (t = $()),
          (r = _('input')),
          (i = $()),
          (s = _('div')),
          (s.textContent = 'Briefly describe the collection (optional)'),
          (l = $()),
          L(o.$$.fragment),
          h(e, 'class', 'text-2xl font-bold'),
          h(r, 'type', 'text'),
          h(
            r,
            'class',
            'p-2 border-b text-lg focus:outline-none placeholder-grey'
          ),
          h(r, 'placeholder', 'A collection of useful items'),
          h(s, 'class', 'text-2xl font-bold pt-4');
      },
      m(m, k) {
        B(m, e, k),
          B(m, t, k),
          B(m, r, k),
          pe(r, n[3]),
          B(m, i, k),
          B(m, s, k),
          B(m, l, k),
          F(o, m, k),
          (c = !0),
          u || ((d = te(r, 'input', n[18])), (u = !0));
      },
      p(m, k) {
        k[0] & 8 && r.value !== m[3] && pe(r, m[3]);
        const y = {};
        !a && k[0] & 16 && ((a = !0), (y.value = m[4]), fe(() => (a = !1))),
          o.$set(y);
      },
      i(m) {
        c || (g(o.$$.fragment, m), (c = !0));
      },
      o(m) {
        G(o.$$.fragment, m), (c = !1);
      },
      d(m) {
        m && v(e),
          m && v(t),
          m && v(r),
          m && v(i),
          m && v(s),
          m && v(l),
          x(o, m),
          (u = !1),
          d();
      },
    }
  );
}
function _1(n) {
  let e;
  return {
    c() {
      e = E('Cancel');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function v1(n) {
  let e;
  return {
    c() {
      e = E('Save');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function B1(n) {
  let e;
  return {
    c() {
      e = E('Add');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function ii(n) {
  let e, t;
  return (
    (e = new Fe({ props: { key: n[38], clickable: !1 } })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i[0] & 64 && (s.key = r[38]), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function y1(n) {
  let e;
  return {
    c() {
      e = E('Cancel');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function w1(n) {
  let e;
  return {
    c() {
      e = E('Save');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function C1(n) {
  let e;
  return {
    c() {
      e = E('Add');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function li(n) {
  let e, t;
  return (
    (e = new Fe({ props: { key: n[38], clickable: !1 } })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i[0] & 32 && (s.key = r[38]), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function si(n) {
  let e, t, r, i, s;
  return (
    (r = new Fe({ props: { key: n[38], clickable: !1, selectable: !0 } })),
    r.$on('selected', n[13]),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          L(r.$$.fragment),
          (i = $()),
          h(t, 'class', 'w-full'),
          h(e, 'class', 'flex justify-between');
      },
      m(l, o) {
        B(l, e, o), b(e, t), F(r, t, null), b(e, i), (s = !0);
      },
      p(l, o) {
        const a = {};
        o[0] & 2 && (a.key = l[38]), r.$set(a);
      },
      i(l) {
        s || (g(r.$$.fragment, l), (s = !0));
      },
      o(l) {
        G(r.$$.fragment, l), (s = !1);
      },
      d(l) {
        l && v(e), x(r);
      },
    }
  );
}
function $1(n) {
  let e;
  return {
    c() {
      (e = _('div')),
        (e.textContent = `It looks like you are not a member of any groups yet, groups you
            join will appear here.`);
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    i: j,
    o: j,
    d(t) {
      t && v(e);
    },
  };
}
function M1(n) {
  let e,
    t,
    r,
    i,
    s = Object.entries(n[0]),
    l = [];
  for (let a = 0; a < s.length; a += 1) l[a] = ai(ni(n, s, a));
  const o = (a) =>
    G(l[a], 1, 1, () => {
      l[a] = null;
    });
  return {
    c() {
      (e = _('div')), (e.textContent = 'Add groups'), (t = $());
      for (let a = 0; a < l.length; a += 1) l[a].c();
      (r = se()), h(e, 'class', 'text-2xl font-bold');
    },
    m(a, c) {
      B(a, e, c), B(a, t, c);
      for (let u = 0; u < l.length; u += 1) l[u] && l[u].m(a, c);
      B(a, r, c), (i = !0);
    },
    p(a, c) {
      if (c[0] & 4097) {
        s = Object.entries(a[0]);
        let u;
        for (u = 0; u < s.length; u += 1) {
          const d = ni(a, s, u);
          l[u]
            ? (l[u].p(d, c), g(l[u], 1))
            : ((l[u] = ai(d)), l[u].c(), g(l[u], 1), l[u].m(r.parentNode, r));
        }
        for (P(), u = s.length; u < l.length; u += 1) o(u);
        N();
      }
    },
    i(a) {
      if (!i) {
        for (let c = 0; c < s.length; c += 1) g(l[c]);
        i = !0;
      }
    },
    o(a) {
      l = l.filter(Boolean);
      for (let c = 0; c < l.length; c += 1) G(l[c]);
      i = !1;
    },
    d(a) {
      a && v(e), a && v(t), _e(l, a), a && v(r);
    },
  };
}
function ai(n) {
  let e, t, r, i, s;
  return (
    (r = new Fe({ props: { key: n[38], clickable: !1, selectable: !0 } })),
    r.$on('selected', n[12]),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          L(r.$$.fragment),
          (i = $()),
          h(t, 'class', 'w-full'),
          h(e, 'class', 'flex justify-between');
      },
      m(l, o) {
        B(l, e, o), b(e, t), F(r, t, null), b(e, i), (s = !0);
      },
      p(l, o) {
        const a = {};
        o[0] & 1 && (a.key = l[38]), r.$set(a);
      },
      i(l) {
        s || (g(r.$$.fragment, l), (s = !0));
      },
      o(l) {
        G(r.$$.fragment, l), (s = !1);
      },
      d(l) {
        l && v(e), x(r);
      },
    }
  );
}
function F1(n) {
  let e, t, r, i;
  const s = [G1, g1, k1, b1, p1, m1, h1],
    l = [];
  function o(a, c) {
    return a[10] === 'meta'
      ? 0
      : a[10] === 'groups'
      ? 1
      : a[10] === 'apps'
      ? 2
      : a[10] === 'ships'
      ? 3
      : a[10] === 'addship'
      ? 4
      : a[10] === 'other'
      ? 5
      : a[10] === 'addother'
      ? 6
      : -1;
  }
  return (
    ~(t = o(n)) && (r = l[t] = s[t](n)),
    {
      c() {
        (e = _('div')), r && r.c(), h(e, 'class', 'flex flex-col gap-4');
      },
      m(a, c) {
        B(a, e, c), ~t && l[t].m(e, null), (i = !0);
      },
      p(a, c) {
        let u = t;
        (t = o(a)),
          t === u
            ? ~t && l[t].p(a, c)
            : (r &&
                (P(),
                G(l[u], 1, 1, () => {
                  l[u] = null;
                }),
                N()),
              ~t
                ? ((r = l[t]),
                  r ? r.p(a, c) : ((r = l[t] = s[t](a)), r.c()),
                  g(r, 1),
                  r.m(e, null))
                : (r = null));
      },
      i(a) {
        i || (g(r), (i = !0));
      },
      o(a) {
        G(r), (i = !1);
      },
      d(a) {
        a && v(e), ~t && l[t].d();
      },
    }
  );
}
function x1(n) {
  let e, t, r, i;
  function s(a) {
    n[28](a);
  }
  function l(a) {
    n[29](a);
  }
  let o = { formsteps: n[14], $$slots: { default: [F1] }, $$scope: { ctx: n } };
  return (
    n[10] !== void 0 && (o.formstep = n[10]),
    n[9] !== void 0 && (o.navbuttons = n[9]),
    (e = new Vr({ props: o })),
    ce.push(() => he(e, 'formstep', s)),
    ce.push(() => he(e, 'navbuttons', l)),
    e.$on('save', n[15]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(a, c) {
        F(e, a, c), (i = !0);
      },
      p(a, c) {
        const u = {};
        (c[0] & 2043) | (c[1] & 262144) && (u.$$scope = { dirty: c, ctx: a }),
          !t &&
            c[0] & 1024 &&
            ((t = !0), (u.formstep = a[10]), fe(() => (t = !1))),
          !r &&
            c[0] & 512 &&
            ((r = !0), (u.navbuttons = a[9]), fe(() => (r = !1))),
          e.$set(u);
      },
      i(a) {
        i || (g(e.$$.fragment, a), (i = !0));
      },
      o(a) {
        G(e.$$.fragment, a), (i = !1);
      },
      d(a) {
        x(e, a);
      },
    }
  );
}
function L1(n) {
  let e, t, r, i, s;
  (e = new le({
    props: { icon: Mt, $$slots: { default: [f1] }, $$scope: { ctx: n } },
  })),
    e.$on('click', n[11]);
  function l(a) {
    n[30](a);
  }
  let o = { $$slots: { default: [x1] }, $$scope: { ctx: n } };
  return (
    n[2] !== void 0 && (o.open = n[2]),
    (r = new et({ props: o })),
    ce.push(() => he(r, 'open', l)),
    {
      c() {
        L(e.$$.fragment), (t = $()), L(r.$$.fragment);
      },
      m(a, c) {
        F(e, a, c), B(a, t, c), F(r, a, c), (s = !0);
      },
      p(a, c) {
        const u = {};
        c[1] & 262144 && (u.$$scope = { dirty: c, ctx: a }), e.$set(u);
        const d = {};
        (c[0] & 2043) | (c[1] & 262144) && (d.$$scope = { dirty: c, ctx: a }),
          !i && c[0] & 4 && ((i = !0), (d.open = a[2]), fe(() => (i = !1))),
          r.$set(d);
      },
      i(a) {
        s || (g(e.$$.fragment, a), g(r.$$.fragment, a), (s = !0));
      },
      o(a) {
        G(e.$$.fragment, a), G(r.$$.fragment, a), (s = !1);
      },
      d(a) {
        x(e, a), a && v(t), x(r, a);
      },
    }
  );
}
function Z1(n, e, t) {
  let r = ht(),
    i = {},
    s;
  ne.subscribe((W) => {
    W.groups &&
      Object.entries(W.groups).forEach(([de, Le]) => {
        var Pe;
        (Pe = Le == null ? void 0 : Le.meta) != null &&
          Pe.title &&
          t(0, (i[de] = Le), i);
      }),
      t(1, (s = W.apps));
  });
  let l = !1;
  const o = () => {
    t(2, (l = !0));
  };
  let a, c, u, d, f, p, m, k, y;
  const w = ({ detail: { key: W } }) => {
      let de = ke(W);
      u.includes(de)
        ? (u = u.slice(0, u.indexOf(de)).concat(u.slice(u.indexOf(de) + 1)))
        : u.push(de);
    },
    M = ({ detail: { key: W } }) => {
      let de = ke(W);
      d.includes(de)
        ? (d = d.slice(0, d.indexOf(de)).concat(d.slice(d.indexOf(de) + 1)))
        : d.push(de);
    };
  let C = 'other',
    S = ['meta', 'groups', 'apps', 'ships', 'other'];
  const H = () => {
      console.log({
        app: 'portal-manager',
        mark: 'portal-action',
        json: {
          create: {
            'append-to': [
              { ship: Ge, time: '~2000.1.1', struc: 'collection', cord: '' },
            ],
            bespoke: {
              collection: {
                title: a,
                blurb: c,
                image: '',
                'key-list': [...u.map((W) => we(W)), ...d.map((W) => we(W)), p],
              },
            },
          },
        },
      }),
        ve({
          app: 'portal-manager',
          mark: 'portal-action',
          json: {
            create: {
              'append-to': [
                { ship: Ge, time: '~2000.1.1', struc: 'collection', cord: '' },
              ],
              bespoke: {
                collection: {
                  title: a,
                  blurb: c,
                  image: '',
                  'key-list': [
                    ...u.map((W) => we(W)),
                    ...d.map((W) => we(W)),
                    ...f,
                    ...p,
                  ],
                },
              },
            },
          },
        }),
        t(2, (l = !1)),
        r('add');
    },
    O = () => {
      let W = _a(Date.now()),
        de = { struc: 'other', ship: Ge, cord: '', time: W };
      ve({
        app: 'portal-manager',
        mark: 'portal-action',
        json: { create: { time: W, bespoke: { other: k } } },
      }),
        p.push(de),
        t(8, (k = {}));
    },
    Z = async () => {
      let W = { struc: 'ship', ship: m, time: '', cord: '' };
      f.push(W), t(7, (m = ''));
    };
  (() => {
    t(10, (C = 'meta')),
      t(3, (a = '')),
      t(4, (c = '')),
      (u = []),
      (d = []),
      t(5, (f = [])),
      t(6, (p = [])),
      t(7, (m = '')),
      t(8, (k = {})),
      t(9, (y = !0));
  })();
  function A() {
    (a = this.value), t(3, a);
  }
  function q(W) {
    (c = W), t(4, c);
  }
  const z = () => {
    t(10, (C = 'addship')), t(9, (y = !1));
  };
  function U(W) {
    (m = W), t(7, m);
  }
  const J = () => {
      t(10, (C = 'ships')), t(9, (y = !0));
    },
    T = () => {
      Z(), t(10, (C = 'ships')), t(9, (y = !0));
    },
    Y = () => {
      t(10, (C = 'addother')), t(9, (y = !1));
    };
  function ie(W) {
    (k = W), t(8, k);
  }
  const R = () => {
      t(10, (C = 'other')), t(9, (y = !0));
    },
    I = () => {
      O(), t(10, (C = 'other')), t(9, (y = !0));
    };
  function oe(W) {
    (C = W), t(10, C);
  }
  function Be(W) {
    (y = W), t(9, y);
  }
  function Te(W) {
    (l = W), t(2, l);
  }
  return [
    i,
    s,
    l,
    a,
    c,
    f,
    p,
    m,
    k,
    y,
    C,
    o,
    w,
    M,
    S,
    H,
    O,
    Z,
    A,
    q,
    z,
    U,
    J,
    T,
    Y,
    ie,
    R,
    I,
    oe,
    Be,
    Te,
  ];
}
class H1 extends Q {
  constructor(e) {
    super(), X(this, e, Z1, L1, K, {}, null, [-1, -1]);
  }
}
function oi(n, e, t) {
  const r = n.slice();
  return (
    (r[27] = e[t][0]),
    (r[28] = e[t][1].meta.title),
    (r[29] = e[t][1].meta.image),
    r
  );
}
function ci(n, e, t) {
  const r = n.slice();
  return (r[27] = e[t][0]), (r[28] = e[t][1].title), (r[29] = e[t][1].image), r;
}
function j1(n) {
  let e, t, r, i, s, l, o, a;
  function c(d) {
    n[21](d);
  }
  let u = {};
  return (
    n[4] !== void 0 && (u.item = n[4]),
    (e = new qr({ props: u })),
    ce.push(() => he(e, 'item', c)),
    (s = new le({
      props: { icon: Ue, $$slots: { default: [E1] }, $$scope: { ctx: n } },
    })),
    s.$on('click', n[22]),
    (o = new le({
      props: { icon: We, $$slots: { default: [A1] }, $$scope: { ctx: n } },
    })),
    o.$on('click', n[23]),
    {
      c() {
        L(e.$$.fragment),
          (r = $()),
          (i = _('div')),
          L(s.$$.fragment),
          (l = $()),
          L(o.$$.fragment),
          h(i, 'class', 'col-span-12 flex justify-between');
      },
      m(d, f) {
        F(e, d, f),
          B(d, r, f),
          B(d, i, f),
          F(s, i, null),
          b(i, l),
          F(o, i, null),
          (a = !0);
      },
      p(d, f) {
        const p = {};
        !t && f[0] & 16 && ((t = !0), (p.item = d[4]), fe(() => (t = !1))),
          e.$set(p);
        const m = {};
        f[1] & 8 && (m.$$scope = { dirty: f, ctx: d }), s.$set(m);
        const k = {};
        f[1] & 8 && (k.$$scope = { dirty: f, ctx: d }), o.$set(k);
      },
      i(d) {
        a ||
          (g(e.$$.fragment, d),
          g(s.$$.fragment, d),
          g(o.$$.fragment, d),
          (a = !0));
      },
      o(d) {
        G(e.$$.fragment, d), G(s.$$.fragment, d), G(o.$$.fragment, d), (a = !1);
      },
      d(d) {
        x(e, d), d && v(r), d && v(i), x(s), x(o);
      },
    }
  );
}
function O1(n) {
  let e, t, r, i, s, l, o, a, c, u, d, f, p, m;
  return (
    (i = new Oe({ props: { patp: n[5] } })),
    (c = new le({
      props: { icon: Ue, $$slots: { default: [T1] }, $$scope: { ctx: n } },
    })),
    c.$on('click', n[20]),
    (d = new le({
      props: {
        icon: We,
        disabled: n[5] !== n[0] || !n[0],
        $$slots: { default: [P1] },
        $$scope: { ctx: n },
      },
    })),
    d.$on('click', n[9]),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          (r = _('div')),
          L(i.$$.fragment),
          (s = $()),
          (l = _('input')),
          (o = $()),
          (a = _('div')),
          L(c.$$.fragment),
          (u = $()),
          L(d.$$.fragment),
          h(r, 'class', 'col-span-7 col-start-2 md:col-span-3 md:col-start-4'),
          h(l, 'type', 'text'),
          h(
            l,
            'class',
            'p-2 col-span-7 col-start-2 md:col-span-3 md:col-start-4 border placeholder-grey'
          ),
          h(l, 'placeholder', '~worpet-bildet'),
          D(l, 'border-rose-500', n[5] !== n[0]),
          h(t, 'class', 'grid grid-cols-9'),
          h(e, 'class', 'flex flex-col gap-4'),
          h(a, 'class', 'col-span-12 flex justify-between');
      },
      m(k, y) {
        B(k, e, y),
          b(e, t),
          b(t, r),
          F(i, r, null),
          b(t, s),
          b(t, l),
          pe(l, n[0]),
          B(k, o, y),
          B(k, a, y),
          F(c, a, null),
          b(a, u),
          F(d, a, null),
          (f = !0),
          p || ((m = te(l, 'input', n[19])), (p = !0));
      },
      p(k, y) {
        const w = {};
        y[0] & 32 && (w.patp = k[5]),
          i.$set(w),
          y[0] & 1 && l.value !== k[0] && pe(l, k[0]),
          (!f || y[0] & 33) && D(l, 'border-rose-500', k[5] !== k[0]);
        const M = {};
        y[1] & 8 && (M.$$scope = { dirty: y, ctx: k }), c.$set(M);
        const C = {};
        y[0] & 33 && (C.disabled = k[5] !== k[0] || !k[0]),
          y[1] & 8 && (C.$$scope = { dirty: y, ctx: k }),
          d.$set(C);
      },
      i(k) {
        f ||
          (g(i.$$.fragment, k),
          g(c.$$.fragment, k),
          g(d.$$.fragment, k),
          (f = !0));
      },
      o(k) {
        G(i.$$.fragment, k), G(c.$$.fragment, k), G(d.$$.fragment, k), (f = !1);
      },
      d(k) {
        k && v(e), x(i), k && v(o), k && v(a), x(c), x(d), (p = !1), m();
      },
    }
  );
}
function S1(n) {
  let e = Object.keys(n[2]).length === 0,
    t,
    r,
    i,
    s = e && ui(n),
    l = Object.entries(n[2]),
    o = [];
  for (let c = 0; c < l.length; c += 1) o[c] = di(oi(n, l, c));
  const a = (c) =>
    G(o[c], 1, 1, () => {
      o[c] = null;
    });
  return {
    c() {
      s && s.c(), (t = $());
      for (let c = 0; c < o.length; c += 1) o[c].c();
      r = se();
    },
    m(c, u) {
      s && s.m(c, u), B(c, t, u);
      for (let d = 0; d < o.length; d += 1) o[d] && o[d].m(c, u);
      B(c, r, u), (i = !0);
    },
    p(c, u) {
      if (
        (u[0] & 4 && (e = Object.keys(c[2]).length === 0),
        e
          ? s
            ? (s.p(c, u), u[0] & 4 && g(s, 1))
            : ((s = ui(c)), s.c(), g(s, 1), s.m(t.parentNode, t))
          : s &&
            (P(),
            G(s, 1, 1, () => {
              s = null;
            }),
            N()),
        u[0] & 132)
      ) {
        l = Object.entries(c[2]);
        let d;
        for (d = 0; d < l.length; d += 1) {
          const f = oi(c, l, d);
          o[d]
            ? (o[d].p(f, u), g(o[d], 1))
            : ((o[d] = di(f)), o[d].c(), g(o[d], 1), o[d].m(r.parentNode, r));
        }
        for (P(), d = l.length; d < o.length; d += 1) a(d);
        N();
      }
    },
    i(c) {
      if (!i) {
        g(s);
        for (let u = 0; u < l.length; u += 1) g(o[u]);
        i = !0;
      }
    },
    o(c) {
      G(s), (o = o.filter(Boolean));
      for (let u = 0; u < o.length; u += 1) G(o[u]);
      i = !1;
    },
    d(c) {
      s && s.d(c), c && v(t), _e(o, c), c && v(r);
    },
  };
}
function V1(n) {
  let e, t, r, i, s;
  const l = [z1, I1],
    o = [];
  function a(c, u) {
    return (
      u[0] & 8 && (e = null),
      e == null && (e = Object.keys(c[3]).length === 0),
      e ? 0 : 1
    );
  }
  return (
    (t = a(n, [-1, -1])),
    (r = o[t] = l[t](n)),
    {
      c() {
        r.c(), (i = se());
      },
      m(c, u) {
        o[t].m(c, u), B(c, i, u), (s = !0);
      },
      p(c, u) {
        let d = t;
        (t = a(c, u)),
          t === d
            ? o[t].p(c, u)
            : (P(),
              G(o[d], 1, 1, () => {
                o[d] = null;
              }),
              N(),
              (r = o[t]),
              r ? r.p(c, u) : ((r = o[t] = l[t](c)), r.c()),
              g(r, 1),
              r.m(i.parentNode, i));
      },
      i(c) {
        s || (g(r), (s = !0));
      },
      o(c) {
        G(r), (s = !1);
      },
      d(c) {
        o[t].d(c), c && v(i);
      },
    }
  );
}
function q1(n) {
  let e, t, r, i, s, l, o, a, c, u, d, f;
  return {
    c() {
      (e = _('div')),
        (t = _('div')),
        (t.textContent = 'What kind of item?'),
        (r = $()),
        (i = _('button')),
        (i.textContent = 'App'),
        (s = $()),
        (l = _('button')),
        (l.textContent = 'Group'),
        (o = $()),
        (a = _('button')),
        (a.textContent = 'Ship'),
        (c = $()),
        (u = _('button')),
        (u.textContent = 'Other (link etc.)'),
        h(t, 'class', 'text-2xl pb-2'),
        h(i, 'class', 'bg-panels hover:bg-hover text-2xl font-bold py-3'),
        h(l, 'class', 'bg-panels hover:bg-hover text-2xl font-bold py-3'),
        h(a, 'class', 'bg-panels hover:bg-hover text-2xl font-bold py-3'),
        h(u, 'class', 'bg-panels hover:bg-hover text-2xl font-bold py-3'),
        h(e, 'class', 'flex flex-col gap-4');
    },
    m(p, m) {
      B(p, e, m),
        b(e, t),
        b(e, r),
        b(e, i),
        b(e, s),
        b(e, l),
        b(e, o),
        b(e, a),
        b(e, c),
        b(e, u),
        d ||
          ((f = [
            te(i, 'click', n[11]),
            te(l, 'click', n[12]),
            te(a, 'click', n[13]),
            te(u, 'click', n[14]),
          ]),
          (d = !0));
    },
    p: j,
    i: j,
    o: j,
    d(p) {
      p && v(e), (d = !1), ge(f);
    },
  };
}
function E1(n) {
  let e;
  return {
    c() {
      e = E('Back');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function A1(n) {
  let e;
  return {
    c() {
      e = E('Save');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function T1(n) {
  let e;
  return {
    c() {
      e = E('Back');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function P1(n) {
  let e;
  return {
    c() {
      e = E('Save');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function ui(n) {
  let e, t, r, i, s, l, o;
  return (
    (i = new le({
      props: { icon: Ue, $$slots: { default: [N1] }, $$scope: { ctx: n } },
    })),
    i.$on('click', n[17]),
    {
      c() {
        (e = _('div')),
          (e.textContent =
            'You have already added all your groups to this collection'),
          (t = $()),
          (r = _('div')),
          L(i.$$.fragment),
          (s = $()),
          (l = _('div')),
          h(r, 'class', 'flex justify-between');
      },
      m(a, c) {
        B(a, e, c),
          B(a, t, c),
          B(a, r, c),
          F(i, r, null),
          b(r, s),
          b(r, l),
          (o = !0);
      },
      p(a, c) {
        const u = {};
        c[1] & 8 && (u.$$scope = { dirty: c, ctx: a }), i.$set(u);
      },
      i(a) {
        o || (g(i.$$.fragment, a), (o = !0));
      },
      o(a) {
        G(i.$$.fragment, a), (o = !1);
      },
      d(a) {
        a && v(e), a && v(t), a && v(r), x(i);
      },
    }
  );
}
function N1(n) {
  let e;
  return {
    c() {
      e = E('Back');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function di(n) {
  let e,
    t,
    r,
    i,
    s,
    l = n[28] + '',
    o,
    a,
    c,
    u,
    d;
  r = new je({ props: { image: n[29], title: n[28] } });
  function f() {
    return n[18](n[27]);
  }
  return {
    c() {
      (e = _('button')),
        (t = _('div')),
        L(r.$$.fragment),
        (i = $()),
        (s = _('div')),
        (o = E(l)),
        (a = $()),
        h(t, 'class', 'col-span-1'),
        h(s, 'class', 'col-span-11 justify-self-start font-bold'),
        h(e, 'class', 'grid grid-cols-12 items-center gap-4 p-1');
    },
    m(p, m) {
      B(p, e, m),
        b(e, t),
        F(r, t, null),
        b(e, i),
        b(e, s),
        b(s, o),
        b(e, a),
        (c = !0),
        u || ((d = te(e, 'click', f)), (u = !0));
    },
    p(p, m) {
      n = p;
      const k = {};
      m[0] & 4 && (k.image = n[29]),
        m[0] & 4 && (k.title = n[28]),
        r.$set(k),
        (!c || m[0] & 4) && l !== (l = n[28] + '') && ae(o, l);
    },
    i(p) {
      c || (g(r.$$.fragment, p), (c = !0));
    },
    o(p) {
      G(r.$$.fragment, p), (c = !1);
    },
    d(p) {
      p && v(e), x(r), (u = !1), d();
    },
  };
}
function I1(n) {
  let e,
    t,
    r = Object.entries(n[3]),
    i = [];
  for (let l = 0; l < r.length; l += 1) i[l] = fi(ci(n, r, l));
  const s = (l) =>
    G(i[l], 1, 1, () => {
      i[l] = null;
    });
  return {
    c() {
      e = _('div');
      for (let l = 0; l < i.length; l += 1) i[l].c();
      h(e, 'class', 'flex flex-col gap-4');
    },
    m(l, o) {
      B(l, e, o);
      for (let a = 0; a < i.length; a += 1) i[a] && i[a].m(e, null);
      t = !0;
    },
    p(l, o) {
      if (o[0] & 136) {
        r = Object.entries(l[3]);
        let a;
        for (a = 0; a < r.length; a += 1) {
          const c = ci(l, r, a);
          i[a]
            ? (i[a].p(c, o), g(i[a], 1))
            : ((i[a] = fi(c)), i[a].c(), g(i[a], 1), i[a].m(e, null));
        }
        for (P(), a = r.length; a < i.length; a += 1) s(a);
        N();
      }
    },
    i(l) {
      if (!t) {
        for (let o = 0; o < r.length; o += 1) g(i[o]);
        t = !0;
      }
    },
    o(l) {
      i = i.filter(Boolean);
      for (let o = 0; o < i.length; o += 1) G(i[o]);
      t = !1;
    },
    d(l) {
      l && v(e), _e(i, l);
    },
  };
}
function z1(n) {
  let e, t, r, i, s, l, o;
  return (
    (i = new le({
      props: { icon: Ue, $$slots: { default: [R1] }, $$scope: { ctx: n } },
    })),
    i.$on('click', n[15]),
    {
      c() {
        (e = _('div')),
          (e.textContent =
            'You have already added all your apps to this collection'),
          (t = $()),
          (r = _('div')),
          L(i.$$.fragment),
          (s = $()),
          (l = _('div')),
          h(r, 'class', 'flex justify-between');
      },
      m(a, c) {
        B(a, e, c),
          B(a, t, c),
          B(a, r, c),
          F(i, r, null),
          b(r, s),
          b(r, l),
          (o = !0);
      },
      p(a, c) {
        const u = {};
        c[1] & 8 && (u.$$scope = { dirty: c, ctx: a }), i.$set(u);
      },
      i(a) {
        o || (g(i.$$.fragment, a), (o = !0));
      },
      o(a) {
        G(i.$$.fragment, a), (o = !1);
      },
      d(a) {
        a && v(e), a && v(t), a && v(r), x(i);
      },
    }
  );
}
function fi(n) {
  let e,
    t,
    r,
    i,
    s,
    l = (n[28] || n[27]) + '',
    o,
    a,
    c,
    u,
    d;
  r = new je({ props: { image: n[29], title: n[28] || n[27] } });
  function f() {
    return n[16](n[27]);
  }
  return {
    c() {
      (e = _('button')),
        (t = _('div')),
        L(r.$$.fragment),
        (i = $()),
        (s = _('div')),
        (o = E(l)),
        (a = $()),
        h(t, 'class', 'col-span-1'),
        h(s, 'class', 'col-span-11 justify-self-start font-bold'),
        h(e, 'class', 'grid grid-cols-12 bg-panels items-center gap-4 p-1');
    },
    m(p, m) {
      B(p, e, m),
        b(e, t),
        F(r, t, null),
        b(e, i),
        b(e, s),
        b(s, o),
        b(e, a),
        (c = !0),
        u || ((d = te(e, 'click', f)), (u = !0));
    },
    p(p, m) {
      n = p;
      const k = {};
      m[0] & 8 && (k.image = n[29]),
        m[0] & 8 && (k.title = n[28] || n[27]),
        r.$set(k),
        (!c || m[0] & 8) && l !== (l = (n[28] || n[27]) + '') && ae(o, l);
    },
    i(p) {
      c || (g(r.$$.fragment, p), (c = !0));
    },
    o(p) {
      G(r.$$.fragment, p), (c = !1);
    },
    d(p) {
      p && v(e), x(r), (u = !1), d();
    },
  };
}
function R1(n) {
  let e;
  return {
    c() {
      e = E('Back');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function D1(n) {
  let e, t, r, i, s;
  const l = [q1, V1, S1, O1, j1],
    o = [];
  function a(c, u) {
    return c[1] === 'type'
      ? 0
      : c[1] === 'app'
      ? 1
      : c[1] === 'group'
      ? 2
      : c[1] === 'ship'
      ? 3
      : c[1] === 'other'
      ? 4
      : -1;
  }
  return (
    ~(r = a(n)) && (i = o[r] = l[r](n)),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          i && i.c(),
          h(t, 'class', 'flex flex-col col-span-12 gap-4 justify-between'),
          h(e, 'class', 'grid gap-4 grid-cols-12 h-full');
      },
      m(c, u) {
        B(c, e, u), b(e, t), ~r && o[r].m(t, null), (s = !0);
      },
      p(c, u) {
        let d = r;
        (r = a(c)),
          r === d
            ? ~r && o[r].p(c, u)
            : (i &&
                (P(),
                G(o[d], 1, 1, () => {
                  o[d] = null;
                }),
                N()),
              ~r
                ? ((i = o[r]),
                  i ? i.p(c, u) : ((i = o[r] = l[r](c)), i.c()),
                  g(i, 1),
                  i.m(t, null))
                : (i = null));
      },
      i(c) {
        s || (g(i), (s = !0));
      },
      o(c) {
        G(i), (s = !1);
      },
      d(c) {
        c && v(e), ~r && o[r].d();
      },
    }
  );
}
function U1(n) {
  let e, t, r;
  function i(l) {
    n[24](l);
  }
  let s = {
    formsteps: n[6],
    navbuttons: !1,
    $$slots: { default: [D1] },
    $$scope: { ctx: n },
  };
  return (
    n[1] !== void 0 && (s.formstep = n[1]),
    (e = new Vr({ props: s })),
    ce.push(() => he(e, 'formstep', i)),
    {
      c() {
        L(e.$$.fragment);
      },
      m(l, o) {
        F(e, l, o), (r = !0);
      },
      p(l, o) {
        const a = {};
        (o[0] & 63) | (o[1] & 8) && (a.$$scope = { dirty: o, ctx: l }),
          !t && o[0] & 2 && ((t = !0), (a.formstep = l[1]), fe(() => (t = !1))),
          e.$set(a);
      },
      i(l) {
        r || (g(e.$$.fragment, l), (r = !0));
      },
      o(l) {
        G(e.$$.fragment, l), (r = !1);
      },
      d(l) {
        x(e, l);
      },
    }
  );
}
function W1(n, e, t) {
  let { collection: r } = e,
    i = 'type',
    s = ['type', 'app', 'group', 'ship', 'other'],
    l = {},
    o = {},
    a,
    c;
  const u = (T) => {
    const Y = T.split('/');
    return r.bespoke['key-list'].find(
      (ie) => ie.ship === Y[0] && ie.cord === Y[1]
    );
  };
  ne.subscribe((T) => {
    T.groups &&
      Object.entries(T.groups).forEach(([Y, ie]) => {
        var R;
        !((R = ie == null ? void 0 : ie.meta) != null && R.title) ||
          u(Y) ||
          t(2, (l[Y] = ie), l);
      }),
      Object.entries(T.apps).forEach(([Y, ie]) => {
        const R = `${ie.ship}/${Y}`;
        u(R) || t(3, (o[R] = ie), o);
      });
  });
  const d = ht(),
    f = (T) => {
      d('add', T);
    },
    p = () => {
      ve({
        app: 'portal-manager',
        mark: 'portal-action',
        json: { create: { 'append-to': [r.keyObj], bespoke: { other: c } } },
      }),
        d('saved');
    },
    m = async () => {
      const T = { struc: 'ship', ship: a, time: '', cord: '' };
      ye(ke(T)) || (await Me(T)), f(ke(T));
    };
  let k = a;
  const y = () => t(1, (i = 'app')),
    w = () => t(1, (i = 'group')),
    M = () => t(1, (i = 'ship')),
    C = () => t(1, (i = 'other')),
    S = () => t(1, (i = 'type')),
    H = (T) => f(`/app/${T}/`),
    O = () => t(1, (i = 'type')),
    Z = (T) => f(`/group/${T}/`);
  function V() {
    (a = this.value), t(0, a);
  }
  const A = () => t(1, (i = 'type'));
  function q(T) {
    (c = T), t(4, c);
  }
  const z = () => t(1, (i = 'type')),
    U = () => p();
  function J(T) {
    (i = T), t(1, i);
  }
  return (
    (n.$$set = (T) => {
      'collection' in T && t(10, (r = T.collection));
    }),
    (n.$$.update = () => {
      n.$$.dirty[0] & 1 && Pt(a) && t(5, (k = a));
    }),
    [a, i, l, o, c, k, s, f, p, m, r, y, w, M, C, S, H, O, Z, V, A, q, z, U, J]
  );
}
class J1 extends Q {
  constructor(e) {
    super(), X(this, e, W1, U1, K, { collection: 10 }, null, [-1, -1]);
  }
}
function hi(n) {
  let e,
    t,
    r,
    i,
    s,
    l,
    o,
    a = (n[3] || n[0]) + '',
    c,
    u,
    d,
    f,
    p,
    m;
  const k = [K1, Y1],
    y = [];
  function w(C, S) {
    return C[2] ? 0 : 1;
  }
  (r = w(n)), (i = y[r] = k[r](n));
  let M = n[1] && mi(n);
  return {
    c() {
      (e = _('a')),
        (t = _('div')),
        i.c(),
        (s = $()),
        (l = _('div')),
        (o = _('div')),
        (c = E(a)),
        (u = $()),
        M && M.c(),
        h(o, 'class', 'line-clamp-1'),
        h(e, 'href', (d = `/${n[0]}`)),
        h(
          e,
          'class',
          'flex gap-4 items-center p-1 hover:bg-hover hover:duration-500 rounded-lg'
        );
    },
    m(C, S) {
      B(C, e, S),
        b(e, t),
        y[r].m(t, null),
        b(e, s),
        b(e, l),
        b(l, o),
        b(o, c),
        b(l, u),
        M && M.m(l, null),
        (f = !0),
        p || ((m = qe(Ie.call(null, e))), (p = !0));
    },
    p(C, S) {
      let H = r;
      (r = w(C)),
        r === H
          ? y[r].p(C, S)
          : (P(),
            G(y[H], 1, 1, () => {
              y[H] = null;
            }),
            N(),
            (i = y[r]),
            i ? i.p(C, S) : ((i = y[r] = k[r](C)), i.c()),
            g(i, 1),
            i.m(t, null)),
        (!f || S & 9) && a !== (a = (C[3] || C[0]) + '') && ae(c, a),
        C[1]
          ? M
            ? M.p(C, S)
            : ((M = mi(C)), M.c(), M.m(l, null))
          : M && (M.d(1), (M = null)),
        (!f || (S & 1 && d !== (d = `/${C[0]}`))) && h(e, 'href', d);
    },
    i(C) {
      f || (g(i), (f = !0));
    },
    o(C) {
      G(i), (f = !1);
    },
    d(C) {
      C && v(e), y[r].d(), M && M.d(), (p = !1), m();
    },
  };
}
function Y1(n) {
  let e, t, r;
  return (
    (t = new Oe({ props: { patp: n[0] } })),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          h(e, 'class', 'rounded-md w-10 h-10 overflow-hidden');
      },
      m(i, s) {
        B(i, e, s), F(t, e, null), (r = !0);
      },
      p(i, s) {
        const l = {};
        s & 1 && (l.patp = i[0]), t.$set(l);
      },
      i(i) {
        r || (g(t.$$.fragment, i), (r = !0));
      },
      o(i) {
        G(t.$$.fragment, i), (r = !1);
      },
      d(i) {
        i && v(e), x(t);
      },
    }
  );
}
function K1(n) {
  let e, t, r;
  return (
    (t = new je({ props: { image: n[2], title: n[0] } })),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          h(e, 'class', 'rounded-md w-10 h-10 overflow-hidden');
      },
      m(i, s) {
        B(i, e, s), F(t, e, null), (r = !0);
      },
      p(i, s) {
        const l = {};
        s & 4 && (l.image = i[2]), s & 1 && (l.title = i[0]), t.$set(l);
      },
      i(i) {
        r || (g(t.$$.fragment, i), (r = !0));
      },
      o(i) {
        G(t.$$.fragment, i), (r = !1);
      },
      d(i) {
        i && v(e), x(t);
      },
    }
  );
}
function mi(n) {
  let e, t, r;
  return {
    c() {
      (e = _('div')),
        (t = E('Portal score: ')),
        (r = E(n[1])),
        h(e, 'class', 'text-xs');
    },
    m(i, s) {
      B(i, e, s), b(e, t), b(e, r);
    },
    p(i, s) {
      s & 2 && ae(r, i[1]);
    },
    d(i) {
      i && v(e);
    },
  };
}
function X1(n) {
  let e,
    t,
    r = n[0] && hi(n);
  return {
    c() {
      r && r.c(), (e = se());
    },
    m(i, s) {
      r && r.m(i, s), B(i, e, s), (t = !0);
    },
    p(i, [s]) {
      i[0]
        ? r
          ? (r.p(i, s), s & 1 && g(r, 1))
          : ((r = hi(i)), r.c(), g(r, 1), r.m(e.parentNode, e))
        : r &&
          (P(),
          G(r, 1, 1, () => {
            r = null;
          }),
          N());
    },
    i(i) {
      t || (g(r), (t = !0));
    },
    o(i) {
      G(r), (t = !1);
    },
    d(i) {
      r && r.d(i), i && v(e);
    },
  };
}
function Q1(n, e, t) {
  let { pal: r, score: i } = e,
    s,
    l;
  return (
    ne.subscribe(() => {
      t(3, ({ title: l, image: s } = $e(Re(r))), l, t(2, s));
    }),
    (n.$$set = (o) => {
      'pal' in o && t(0, (r = o.pal)), 'score' in o && t(1, (i = o.score));
    }),
    [r, i, s, l]
  );
}
class e0 extends Q {
  constructor(e) {
    super(), X(this, e, Q1, X1, K, { pal: 0, score: 1 });
  }
}
function t0(n) {
  const e = n.slice(),
    t = e[7];
  (e[20] = t.keyObj.struc), (e[21] = t.keyObj.ship), (e[22] = t.keyStr);
  const r = $e(e[7]);
  return (
    (e[23] = r.title),
    (e[24] = r.blurb),
    (e[25] = r.description),
    (e[26] = r.image),
    (e[27] = r.color),
    e
  );
}
function r0(n) {
  let e;
  return {
    c() {
      (e = _('div')),
        (e.textContent = 'Loading...'),
        h(e, 'class', 'p-4 hover:bg-hover rounded-lg');
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    i: j,
    o: j,
    d(t) {
      t && v(e);
    },
  };
}
function n0(n) {
  let e,
    t,
    r,
    i,
    s,
    l,
    o,
    a,
    c = n[23] + '',
    u,
    d,
    f,
    p,
    m,
    k = n[20] + '',
    y,
    w,
    M,
    C = (n[24] || n[25] || '') + '',
    S,
    H,
    O,
    Z,
    V;
  const A = [s0, l0, i0],
    q = [];
  function z(J, T) {
    return J[20] === 'ship' && !J[26]
      ? 0
      : J[20] === 'collection' && !J[26]
      ? 1
      : 2;
  }
  (r = z(n)), (i = q[r] = A[r](n));
  let U = (n[4] || n[3]) && pi(n);
  return {
    c() {
      (e = _('button')),
        (t = _('div')),
        i.c(),
        (s = $()),
        (l = _('div')),
        (o = _('div')),
        (a = _('div')),
        (u = E(c)),
        (d = $()),
        (f = _('div')),
        (f.textContent = '·'),
        (p = $()),
        (m = _('div')),
        (y = E(k)),
        (w = $()),
        (M = _('div')),
        (S = E(C)),
        (H = $()),
        U && U.c(),
        h(t, 'class', 'border overflow-hidden h-full rounded-md'),
        D(t, 'col-span-1', !n[6]),
        D(t, 'col-span-2', n[6]),
        h(a, 'class', 'font-bold line-clamp-1'),
        D(a, 'text-sm', n[6]),
        D(a, 'text-xl', !n[6]),
        h(o, 'class', 'flex items-center gap-2'),
        h(M, 'class', 'line-clamp-2'),
        D(M, 'line-clamp-1', n[6]),
        h(l, 'class', 'flex flex-col items-start gap-2 overflow-hidden'),
        D(l, 'col-span-5', !n[6]),
        D(l, 'col-span-4', n[6]),
        h(
          e,
          'class',
          'grid grid-cols-6 w-full items-center gap-4 p-1 hover:bg-hover hover:duration-500 cursor-pointer rounded-lg text-sm text-left'
        ),
        D(e, 'bg-mdark', n[0]);
    },
    m(J, T) {
      B(J, e, T),
        b(e, t),
        q[r].m(t, null),
        b(e, s),
        b(e, l),
        b(l, o),
        b(o, a),
        b(a, u),
        b(o, d),
        b(o, f),
        b(o, p),
        b(o, m),
        b(m, y),
        b(l, w),
        b(l, M),
        b(M, S),
        b(e, H),
        U && U.m(e, null),
        (O = !0),
        Z || ((V = te(e, 'click', n[16])), (Z = !0));
    },
    p(J, T) {
      let Y = r;
      (r = z(J)),
        r === Y
          ? q[r].p(J, T)
          : (P(),
            G(q[Y], 1, 1, () => {
              q[Y] = null;
            }),
            N(),
            (i = q[r]),
            i ? i.p(J, T) : ((i = q[r] = A[r](J)), i.c()),
            g(i, 1),
            i.m(t, null)),
        (!O || T & 64) && D(t, 'col-span-1', !J[6]),
        (!O || T & 64) && D(t, 'col-span-2', J[6]),
        (!O || T & 128) && c !== (c = J[23] + '') && ae(u, c),
        (!O || T & 64) && D(a, 'text-sm', J[6]),
        (!O || T & 64) && D(a, 'text-xl', !J[6]),
        (!O || T & 128) && k !== (k = J[20] + '') && ae(y, k),
        (!O || T & 128) && C !== (C = (J[24] || J[25] || '') + '') && ae(S, C),
        (!O || T & 64) && D(M, 'line-clamp-1', J[6]),
        (!O || T & 64) && D(l, 'col-span-5', !J[6]),
        (!O || T & 64) && D(l, 'col-span-4', J[6]),
        J[4] || J[3]
          ? U
            ? (U.p(J, T), T & 24 && g(U, 1))
            : ((U = pi(J)), U.c(), g(U, 1), U.m(e, null))
          : U &&
            (P(),
            G(U, 1, 1, () => {
              U = null;
            }),
            N()),
        (!O || T & 1) && D(e, 'bg-mdark', J[0]);
    },
    i(J) {
      O || (g(i), g(U), (O = !0));
    },
    o(J) {
      G(i), G(U), (O = !1);
    },
    d(J) {
      J && v(e), q[r].d(), U && U.d(), (Z = !1), V();
    },
  };
}
function i0(n) {
  let e, t;
  return (
    (e = new je({ props: { image: n[26], title: n[23], color: n[27] } })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 128 && (s.image = r[26]),
          i & 128 && (s.title = r[23]),
          i & 128 && (s.color = r[27]),
          e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function l0(n) {
  let e, t;
  return (
    (e = new Ir({ props: { key: n[1], withTitle: !1 } })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 2 && (s.key = r[1]), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function s0(n) {
  let e, t;
  return (
    (e = new Oe({ props: { patp: n[21] } })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 128 && (s.patp = r[21]), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function pi(n) {
  let e,
    t,
    r,
    i = n[4] && bi(n),
    s = n[3] && ki(n);
  return {
    c() {
      (e = _('div')),
        i && i.c(),
        (t = $()),
        s && s.c(),
        h(
          e,
          'class',
          'col-span-1 col-start-12 flex gap-2 justify-center items-center'
        );
    },
    m(l, o) {
      B(l, e, o), i && i.m(e, null), b(e, t), s && s.m(e, null), (r = !0);
    },
    p(l, o) {
      l[4]
        ? i
          ? (i.p(l, o), o & 16 && g(i, 1))
          : ((i = bi(l)), i.c(), g(i, 1), i.m(e, t))
        : i &&
          (P(),
          G(i, 1, 1, () => {
            i = null;
          }),
          N()),
        l[3]
          ? s
            ? (s.p(l, o), o & 8 && g(s, 1))
            : ((s = ki(l)), s.c(), g(s, 1), s.m(e, null))
          : s &&
            (P(),
            G(s, 1, 1, () => {
              s = null;
            }),
            N());
    },
    i(l) {
      r || (g(i), g(s), (r = !0));
    },
    o(l) {
      G(i), G(s), (r = !1);
    },
    d(l) {
      l && v(e), i && i.d(), s && s.d();
    },
  };
}
function bi(n) {
  let e, t, r, i, s;
  t = new Tr({});
  function l() {
    return n[14](n[22]);
  }
  return {
    c() {
      (e = _('button')),
        L(t.$$.fragment),
        h(e, 'class', 'w-8 h-8 hover:text-blue-500 cursor-pointer');
    },
    m(o, a) {
      B(o, e, a),
        F(t, e, null),
        (r = !0),
        i || ((s = [te(e, 'click', Zr(n[13])), te(e, 'click', l)]), (i = !0));
    },
    p(o, a) {
      n = o;
    },
    i(o) {
      r || (g(t.$$.fragment, o), (r = !0));
    },
    o(o) {
      G(t.$$.fragment, o), (r = !1);
    },
    d(o) {
      o && v(e), x(t), (i = !1), ge(s);
    },
  };
}
function ki(n) {
  let e, t, r, i, s;
  t = new Vo({});
  function l() {
    return n[15](n[22]);
  }
  return {
    c() {
      (e = _('button')),
        L(t.$$.fragment),
        h(e, 'class', 'w-8 h-8 hover:bg-red-500 cursor-pointer');
    },
    m(o, a) {
      B(o, e, a),
        F(t, e, null),
        (r = !0),
        i || ((s = [te(e, 'click', Zr(n[12])), te(e, 'click', l)]), (i = !0));
    },
    p(o, a) {
      n = o;
    },
    i(o) {
      r || (g(t.$$.fragment, o), (r = !0));
    },
    o(o) {
      G(t.$$.fragment, o), (r = !1);
    },
    d(o) {
      o && v(e), x(t), (i = !1), ge(s);
    },
  };
}
function a0(n) {
  let e, t, r, i;
  const s = [n0, r0],
    l = [];
  function o(c, u) {
    return c[7] ? 0 : 1;
  }
  function a(c, u) {
    return u === 0 ? t0(c) : c;
  }
  return (
    (e = o(n)),
    (t = l[e] = s[e](a(n, e))),
    {
      c() {
        t.c(), (r = se());
      },
      m(c, u) {
        l[e].m(c, u), B(c, r, u), (i = !0);
      },
      p(c, [u]) {
        let d = e;
        (e = o(c)),
          e === d
            ? l[e].p(a(c, e), u)
            : (P(),
              G(l[d], 1, 1, () => {
                l[d] = null;
              }),
              N(),
              (t = l[e]),
              t ? t.p(a(c, e), u) : ((t = l[e] = s[e](a(c, e))), t.c()),
              g(t, 1),
              t.m(r.parentNode, r));
      },
      i(c) {
        i || (g(t), (i = !0));
      },
      o(c) {
        G(t), (i = !1);
      },
      d(c) {
        l[e].d(c), c && v(r);
      },
    }
  );
}
function o0(n, e, t) {
  let r;
  ze(n, ne, (Z) => t(18, (r = Z)));
  let { key: i } = e,
    { clickable: s = !0 } = e,
    { removable: l = !1 } = e,
    { editable: o = !1 } = e,
    { selectable: a = !1 } = e,
    { selected: c = !1 } = e,
    { small: u = !1 } = e,
    d,
    f;
  const p = (Z) => {
    if ((t(7, (d = ye(ke(Z)))), r.isLoaded && !d && !f)) return (f = !0), Me(Z);
  };
  ne.subscribe(() => {
    p(i);
  });
  const m = ht(),
    k = () => m('remove', d.keyStr),
    y = () => m('edit', d.keyStr),
    w = () => {
      d.keyObj.struc === 'ship' ? Xe(`/${d.keyObj.ship}`) : Xe(d.keyStr);
    };
  function M(Z) {
    Ke.call(this, n, Z);
  }
  function C(Z) {
    Ke.call(this, n, Z);
  }
  const S = (Z) => y(),
    H = (Z) => k(),
    O = () => {
      s ? w() : a && (t(0, (c = !c)), m('selected', { key: i, selected: c }));
    };
  return (
    (n.$$set = (Z) => {
      'key' in Z && t(1, (i = Z.key)),
        'clickable' in Z && t(2, (s = Z.clickable)),
        'removable' in Z && t(3, (l = Z.removable)),
        'editable' in Z && t(4, (o = Z.editable)),
        'selectable' in Z && t(5, (a = Z.selectable)),
        'selected' in Z && t(0, (c = Z.selected)),
        'small' in Z && t(6, (u = Z.small));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 2 && p(i);
    }),
    [c, i, s, l, o, a, u, d, m, k, y, w, M, C, S, H, O]
  );
}
class Fe extends Q {
  constructor(e) {
    super(),
      X(this, e, o0, a0, K, {
        key: 1,
        clickable: 2,
        removable: 3,
        editable: 4,
        selectable: 5,
        selected: 0,
        small: 6,
      });
  }
}
function c0(n) {
  return typeof n > 'u';
}
function gi(n, e = 0) {
  return { a: 1, c: 0, e: n, b: 0, d: 1, f: e };
}
function jl(...n) {
  n = Array.isArray(n[0]) ? n[0] : n;
  const e = (t, r) => ({
    a: t.a * r.a + t.c * r.b,
    c: t.a * r.c + t.c * r.d,
    e: t.a * r.e + t.c * r.f + t.e,
    b: t.b * r.a + t.d * r.b,
    d: t.b * r.c + t.d * r.d,
    f: t.b * r.e + t.d * r.f + t.f,
  });
  switch (n.length) {
    case 0:
      throw new Error('no matrices provided');
    case 1:
      return n[0];
    case 2:
      return e(n[0], n[1]);
    default:
      const [t, r, ...i] = n,
        s = e(t, r);
      return jl(s, ...i);
  }
}
function u0(n, e = void 0) {
  return c0(e) && (e = n), { a: n, c: 0, e: 0, b: 0, d: e, f: 0 };
}
function Gi(n) {
  return `matrix(${n.a},${n.b},${n.c},${n.d},${n.e},${n.f})`;
}
function d0(n, e) {
  function t() {
    this.constructor = n;
  }
  (t.prototype = e.prototype), (n.prototype = new t());
}
function zr(n, e, t, r) {
  (this.message = n),
    (this.expected = e),
    (this.found = t),
    (this.location = r),
    (this.name = 'SyntaxError'),
    typeof Error.captureStackTrace == 'function' &&
      Error.captureStackTrace(this, zr);
}
d0(zr, Error);
zr.buildMessage = function (n, e) {
  var t = {
    literal: function (c) {
      return '"' + i(c.text) + '"';
    },
    class: function (c) {
      var u = c.parts.map(function (d) {
        return Array.isArray(d) ? s(d[0]) + '-' + s(d[1]) : s(d);
      });
      return '[' + (c.inverted ? '^' : '') + u + ']';
    },
    any: function () {
      return 'any character';
    },
    end: function () {
      return 'end of input';
    },
    other: function (c) {
      return c.description;
    },
    not: function (c) {
      return 'not ' + l(c.expected);
    },
  };
  function r(c) {
    return c.charCodeAt(0).toString(16).toUpperCase();
  }
  function i(c) {
    return c
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g, function (u) {
        return '\\x0' + r(u);
      })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function (u) {
        return '\\x' + r(u);
      });
  }
  function s(c) {
    return c
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g, '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g, function (u) {
        return '\\x0' + r(u);
      })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function (u) {
        return '\\x' + r(u);
      });
  }
  function l(c) {
    return t[c.type](c);
  }
  function o(c) {
    var u = c.map(l),
      d,
      f;
    if ((u.sort(), u.length > 0)) {
      for (d = 1, f = 1; d < u.length; d++)
        u[d - 1] !== u[d] && ((u[f] = u[d]), f++);
      u.length = f;
    }
    switch (u.length) {
      case 1:
        return u[0];
      case 2:
        return u[0] + ' or ' + u[1];
      default:
        return u.slice(0, -1).join(', ') + ', or ' + u[u.length - 1];
    }
  }
  function a(c) {
    return c ? '"' + i(c) + '"' : 'end of input';
  }
  return 'Expected ' + o(n) + ' but ' + a(e) + ' found.';
};
var f0 = function (n, e, t, r, i, s, l, o) {
    if (!n) {
      var a;
      if (e === void 0)
        a = new Error(
          'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
        );
      else {
        var c = [t, r, i, s, l, o],
          u = 0;
        (a = new Error(
          e.replace(/%s/g, function () {
            return c[u++];
          })
        )),
          (a.name = 'Invariant Violation');
      }
      throw ((a.framesToPop = 1), a);
    }
  },
  dr = f0,
  _i = {},
  h0 = {
    get exports() {
      return _i;
    },
    set exports(n) {
      _i = n;
    },
  };
(function (n) {
  (function () {
    function e(t, r) {
      if (typeof r != 'function') return t;
      var i = {};
      for (var s in t)
        Object.prototype.hasOwnProperty.call(t, s) &&
          (i[r(s, t[s]) || s] = t[s]);
      return i;
    }
    n.exports ? (n.exports = e) : (window.rename = e);
  })();
})(h0);
var vi = {},
  m0 = {
    get exports() {
      return vi;
    },
    set exports(n) {
      vi = n;
    },
  };
(function (n) {
  var e = Object.prototype.hasOwnProperty,
    t = '~';
  function r() {}
  Object.create &&
    ((r.prototype = Object.create(null)), new r().__proto__ || (t = !1));
  function i(l, o, a) {
    (this.fn = l), (this.context = o), (this.once = a || !1);
  }
  function s() {
    (this._events = new r()), (this._eventsCount = 0);
  }
  (s.prototype.eventNames = function () {
    var o = [],
      a,
      c;
    if (this._eventsCount === 0) return o;
    for (c in (a = this._events)) e.call(a, c) && o.push(t ? c.slice(1) : c);
    return Object.getOwnPropertySymbols
      ? o.concat(Object.getOwnPropertySymbols(a))
      : o;
  }),
    (s.prototype.listeners = function (o, a) {
      var c = t ? t + o : o,
        u = this._events[c];
      if (a) return !!u;
      if (!u) return [];
      if (u.fn) return [u.fn];
      for (var d = 0, f = u.length, p = new Array(f); d < f; d++)
        p[d] = u[d].fn;
      return p;
    }),
    (s.prototype.emit = function (o, a, c, u, d, f) {
      var p = t ? t + o : o;
      if (!this._events[p]) return !1;
      var m = this._events[p],
        k = arguments.length,
        y,
        w;
      if (m.fn) {
        switch ((m.once && this.removeListener(o, m.fn, void 0, !0), k)) {
          case 1:
            return m.fn.call(m.context), !0;
          case 2:
            return m.fn.call(m.context, a), !0;
          case 3:
            return m.fn.call(m.context, a, c), !0;
          case 4:
            return m.fn.call(m.context, a, c, u), !0;
          case 5:
            return m.fn.call(m.context, a, c, u, d), !0;
          case 6:
            return m.fn.call(m.context, a, c, u, d, f), !0;
        }
        for (w = 1, y = new Array(k - 1); w < k; w++) y[w - 1] = arguments[w];
        m.fn.apply(m.context, y);
      } else {
        var M = m.length,
          C;
        for (w = 0; w < M; w++)
          switch (
            (m[w].once && this.removeListener(o, m[w].fn, void 0, !0), k)
          ) {
            case 1:
              m[w].fn.call(m[w].context);
              break;
            case 2:
              m[w].fn.call(m[w].context, a);
              break;
            case 3:
              m[w].fn.call(m[w].context, a, c);
              break;
            case 4:
              m[w].fn.call(m[w].context, a, c, u);
              break;
            default:
              if (!y)
                for (C = 1, y = new Array(k - 1); C < k; C++)
                  y[C - 1] = arguments[C];
              m[w].fn.apply(m[w].context, y);
          }
      }
      return !0;
    }),
    (s.prototype.on = function (o, a, c) {
      var u = new i(a, c || this),
        d = t ? t + o : o;
      return (
        this._events[d]
          ? this._events[d].fn
            ? (this._events[d] = [this._events[d], u])
            : this._events[d].push(u)
          : ((this._events[d] = u), this._eventsCount++),
        this
      );
    }),
    (s.prototype.once = function (o, a, c) {
      var u = new i(a, c || this, !0),
        d = t ? t + o : o;
      return (
        this._events[d]
          ? this._events[d].fn
            ? (this._events[d] = [this._events[d], u])
            : this._events[d].push(u)
          : ((this._events[d] = u), this._eventsCount++),
        this
      );
    }),
    (s.prototype.removeListener = function (o, a, c, u) {
      var d = t ? t + o : o;
      if (!this._events[d]) return this;
      if (!a)
        return (
          --this._eventsCount === 0
            ? (this._events = new r())
            : delete this._events[d],
          this
        );
      var f = this._events[d];
      if (f.fn)
        f.fn === a &&
          (!u || f.once) &&
          (!c || f.context === c) &&
          (--this._eventsCount === 0
            ? (this._events = new r())
            : delete this._events[d]);
      else {
        for (var p = 0, m = [], k = f.length; p < k; p++)
          (f[p].fn !== a || (u && !f[p].once) || (c && f[p].context !== c)) &&
            m.push(f[p]);
        m.length
          ? (this._events[d] = m.length === 1 ? m[0] : m)
          : --this._eventsCount === 0
          ? (this._events = new r())
          : delete this._events[d];
      }
      return this;
    }),
    (s.prototype.removeAllListeners = function (o) {
      var a;
      return (
        o
          ? ((a = t ? t + o : o),
            this._events[a] &&
              (--this._eventsCount === 0
                ? (this._events = new r())
                : delete this._events[a]))
          : ((this._events = new r()), (this._eventsCount = 0)),
        this
      );
    }),
    (s.prototype.off = s.prototype.removeListener),
    (s.prototype.addListener = s.prototype.on),
    (s.prototype.setMaxListeners = function () {
      return this;
    }),
    (s.prefixed = t),
    (s.EventEmitter = s),
    (n.exports = s);
})(m0);
var p0 = function (e) {
    if (e) {
      var t = String(e);
      return /[&<>]/.test(t)
        ? '<![CDATA['.concat(t.replace(/]]>/, ']]]]><![CDATA[>'), ']]>')
        : t;
    }
    return '';
  },
  b0 = function (e) {
    return String(e)
      .replace(/&/g, '&amp;')
      .replace(/'/g, '&apos;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },
  k0 = function n(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r = t.transformAttr,
      i =
        r === void 0
          ? function (u, d, f) {
              return ''.concat(u, '="').concat(f(d), '"');
            }
          : r,
      s = t.selfClose,
      l = s === void 0 ? !0 : s;
    if (Array.isArray(e))
      return e
        .map(function (u) {
          return n(u, { transformAttr: i, selfClose: l });
        })
        .join('');
    if (e.type === 'text') return p0(e.value);
    var o = '';
    for (var a in e.attributes) {
      var c = i(a, e.attributes[a], b0, e.name);
      o += c ? ' '.concat(c) : '';
    }
    return e.children.length || !l
      ? '<'
          .concat(e.name)
          .concat(o, '>')
          .concat(n(e.children, { transformAttr: i, selfClose: l }), '</')
          .concat(e.name, '>')
      : '<'.concat(e.name).concat(o, '/>');
  },
  Bi = {},
  g0 = {
    get exports() {
      return Bi;
    },
    set exports(n) {
      Bi = n;
    },
  },
  me = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var yi = Object.getOwnPropertySymbols,
  G0 = Object.prototype.hasOwnProperty,
  _0 = Object.prototype.propertyIsEnumerable;
function v0(n) {
  if (n == null)
    throw new TypeError(
      'Object.assign cannot be called with null or undefined'
    );
  return Object(n);
}
function B0() {
  try {
    if (!Object.assign) return !1;
    var n = new String('abc');
    if (((n[5] = 'de'), Object.getOwnPropertyNames(n)[0] === '5')) return !1;
    for (var e = {}, t = 0; t < 10; t++) e['_' + String.fromCharCode(t)] = t;
    var r = Object.getOwnPropertyNames(e).map(function (s) {
      return e[s];
    });
    if (r.join('') !== '0123456789') return !1;
    var i = {};
    return (
      'abcdefghijklmnopqrst'.split('').forEach(function (s) {
        i[s] = s;
      }),
      Object.keys(Object.assign({}, i)).join('') === 'abcdefghijklmnopqrst'
    );
  } catch {
    return !1;
  }
}
var y0 = B0()
  ? Object.assign
  : function (n, e) {
      for (var t, r = v0(n), i, s = 1; s < arguments.length; s++) {
        t = Object(arguments[s]);
        for (var l in t) G0.call(t, l) && (r[l] = t[l]);
        if (yi) {
          i = yi(t);
          for (var o = 0; o < i.length; o++)
            _0.call(t, i[o]) && (r[i[o]] = t[i[o]]);
        }
      }
      return r;
    };
/** @license React v16.14.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Rr = y0,
  xe = typeof Symbol == 'function' && Symbol.for,
  Lt = xe ? Symbol.for('react.element') : 60103,
  w0 = xe ? Symbol.for('react.portal') : 60106,
  C0 = xe ? Symbol.for('react.fragment') : 60107,
  $0 = xe ? Symbol.for('react.strict_mode') : 60108,
  M0 = xe ? Symbol.for('react.profiler') : 60114,
  F0 = xe ? Symbol.for('react.provider') : 60109,
  x0 = xe ? Symbol.for('react.context') : 60110,
  L0 = xe ? Symbol.for('react.forward_ref') : 60112,
  Z0 = xe ? Symbol.for('react.suspense') : 60113,
  H0 = xe ? Symbol.for('react.memo') : 60115,
  j0 = xe ? Symbol.for('react.lazy') : 60116,
  wi = typeof Symbol == 'function' && Symbol.iterator;
function Zt(n) {
  for (
    var e = 'https://reactjs.org/docs/error-decoder.html?invariant=' + n, t = 1;
    t < arguments.length;
    t++
  )
    e += '&args[]=' + encodeURIComponent(arguments[t]);
  return (
    'Minified React error #' +
    n +
    '; visit ' +
    e +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
var Ol = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Sl = {};
function bt(n, e, t) {
  (this.props = n),
    (this.context = e),
    (this.refs = Sl),
    (this.updater = t || Ol);
}
bt.prototype.isReactComponent = {};
bt.prototype.setState = function (n, e) {
  if (typeof n != 'object' && typeof n != 'function' && n != null)
    throw Error(Zt(85));
  this.updater.enqueueSetState(this, n, e, 'setState');
};
bt.prototype.forceUpdate = function (n) {
  this.updater.enqueueForceUpdate(this, n, 'forceUpdate');
};
function Vl() {}
Vl.prototype = bt.prototype;
function Dr(n, e, t) {
  (this.props = n),
    (this.context = e),
    (this.refs = Sl),
    (this.updater = t || Ol);
}
var Ur = (Dr.prototype = new Vl());
Ur.constructor = Dr;
Rr(Ur, bt.prototype);
Ur.isPureReactComponent = !0;
var Wr = { current: null },
  ql = Object.prototype.hasOwnProperty,
  El = { key: !0, ref: !0, __self: !0, __source: !0 };
function Al(n, e, t) {
  var r,
    i = {},
    s = null,
    l = null;
  if (e != null)
    for (r in (e.ref !== void 0 && (l = e.ref),
    e.key !== void 0 && (s = '' + e.key),
    e))
      ql.call(e, r) && !El.hasOwnProperty(r) && (i[r] = e[r]);
  var o = arguments.length - 2;
  if (o === 1) i.children = t;
  else if (1 < o) {
    for (var a = Array(o), c = 0; c < o; c++) a[c] = arguments[c + 2];
    i.children = a;
  }
  if (n && n.defaultProps)
    for (r in ((o = n.defaultProps), o)) i[r] === void 0 && (i[r] = o[r]);
  return {
    $$typeof: Lt,
    type: n,
    key: s,
    ref: l,
    props: i,
    _owner: Wr.current,
  };
}
function O0(n, e) {
  return {
    $$typeof: Lt,
    type: n.type,
    key: e,
    ref: n.ref,
    props: n.props,
    _owner: n._owner,
  };
}
function Jr(n) {
  return typeof n == 'object' && n !== null && n.$$typeof === Lt;
}
function S0(n) {
  var e = { '=': '=0', ':': '=2' };
  return (
    '$' +
    ('' + n).replace(/[=:]/g, function (t) {
      return e[t];
    })
  );
}
var Tl = /\/+/g,
  Rt = [];
function Pl(n, e, t, r) {
  if (Rt.length) {
    var i = Rt.pop();
    return (
      (i.result = n),
      (i.keyPrefix = e),
      (i.func = t),
      (i.context = r),
      (i.count = 0),
      i
    );
  }
  return { result: n, keyPrefix: e, func: t, context: r, count: 0 };
}
function Nl(n) {
  (n.result = null),
    (n.keyPrefix = null),
    (n.func = null),
    (n.context = null),
    (n.count = 0),
    10 > Rt.length && Rt.push(n);
}
function yr(n, e, t, r) {
  var i = typeof n;
  (i === 'undefined' || i === 'boolean') && (n = null);
  var s = !1;
  if (n === null) s = !0;
  else
    switch (i) {
      case 'string':
      case 'number':
        s = !0;
        break;
      case 'object':
        switch (n.$$typeof) {
          case Lt:
          case w0:
            s = !0;
        }
    }
  if (s) return t(r, n, e === '' ? '.' + fr(n, 0) : e), 1;
  if (((s = 0), (e = e === '' ? '.' : e + ':'), Array.isArray(n)))
    for (var l = 0; l < n.length; l++) {
      i = n[l];
      var o = e + fr(i, l);
      s += yr(i, o, t, r);
    }
  else if (
    (n === null || typeof n != 'object'
      ? (o = null)
      : ((o = (wi && n[wi]) || n['@@iterator']),
        (o = typeof o == 'function' ? o : null)),
    typeof o == 'function')
  )
    for (n = o.call(n), l = 0; !(i = n.next()).done; )
      (i = i.value), (o = e + fr(i, l++)), (s += yr(i, o, t, r));
  else if (i === 'object')
    throw (
      ((t = '' + n),
      Error(
        Zt(
          31,
          t === '[object Object]'
            ? 'object with keys {' + Object.keys(n).join(', ') + '}'
            : t,
          ''
        )
      ))
    );
  return s;
}
function wr(n, e, t) {
  return n == null ? 0 : yr(n, '', e, t);
}
function fr(n, e) {
  return typeof n == 'object' && n !== null && n.key != null
    ? S0(n.key)
    : e.toString(36);
}
function V0(n, e) {
  n.func.call(n.context, e, n.count++);
}
function q0(n, e, t) {
  var r = n.result,
    i = n.keyPrefix;
  (n = n.func.call(n.context, e, n.count++)),
    Array.isArray(n)
      ? Cr(n, r, t, function (s) {
          return s;
        })
      : n != null &&
        (Jr(n) &&
          (n = O0(
            n,
            i +
              (!n.key || (e && e.key === n.key)
                ? ''
                : ('' + n.key).replace(Tl, '$&/') + '/') +
              t
          )),
        r.push(n));
}
function Cr(n, e, t, r, i) {
  var s = '';
  t != null && (s = ('' + t).replace(Tl, '$&/') + '/'),
    (e = Pl(e, s, r, i)),
    wr(n, q0, e),
    Nl(e);
}
var Il = { current: null };
function Ae() {
  var n = Il.current;
  if (n === null) throw Error(Zt(321));
  return n;
}
var E0 = {
  ReactCurrentDispatcher: Il,
  ReactCurrentBatchConfig: { suspense: null },
  ReactCurrentOwner: Wr,
  IsSomeRendererActing: { current: !1 },
  assign: Rr,
};
me.Children = {
  map: function (n, e, t) {
    if (n == null) return n;
    var r = [];
    return Cr(n, r, null, e, t), r;
  },
  forEach: function (n, e, t) {
    if (n == null) return n;
    (e = Pl(null, null, e, t)), wr(n, V0, e), Nl(e);
  },
  count: function (n) {
    return wr(
      n,
      function () {
        return null;
      },
      null
    );
  },
  toArray: function (n) {
    var e = [];
    return (
      Cr(n, e, null, function (t) {
        return t;
      }),
      e
    );
  },
  only: function (n) {
    if (!Jr(n)) throw Error(Zt(143));
    return n;
  },
};
me.Component = bt;
me.Fragment = C0;
me.Profiler = M0;
me.PureComponent = Dr;
me.StrictMode = $0;
me.Suspense = Z0;
me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = E0;
me.cloneElement = function (n, e, t) {
  if (n == null) throw Error(Zt(267, n));
  var r = Rr({}, n.props),
    i = n.key,
    s = n.ref,
    l = n._owner;
  if (e != null) {
    if (
      (e.ref !== void 0 && ((s = e.ref), (l = Wr.current)),
      e.key !== void 0 && (i = '' + e.key),
      n.type && n.type.defaultProps)
    )
      var o = n.type.defaultProps;
    for (a in e)
      ql.call(e, a) &&
        !El.hasOwnProperty(a) &&
        (r[a] = e[a] === void 0 && o !== void 0 ? o[a] : e[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = t;
  else if (1 < a) {
    o = Array(a);
    for (var c = 0; c < a; c++) o[c] = arguments[c + 2];
    r.children = o;
  }
  return { $$typeof: Lt, type: n.type, key: i, ref: s, props: r, _owner: l };
};
me.createContext = function (n, e) {
  return (
    e === void 0 && (e = null),
    (n = {
      $$typeof: x0,
      _calculateChangedBits: e,
      _currentValue: n,
      _currentValue2: n,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
    }),
    (n.Provider = { $$typeof: F0, _context: n }),
    (n.Consumer = n)
  );
};
me.createElement = Al;
me.createFactory = function (n) {
  var e = Al.bind(null, n);
  return (e.type = n), e;
};
me.createRef = function () {
  return { current: null };
};
me.forwardRef = function (n) {
  return { $$typeof: L0, render: n };
};
me.isValidElement = Jr;
me.lazy = function (n) {
  return { $$typeof: j0, _ctor: n, _status: -1, _result: null };
};
me.memo = function (n, e) {
  return { $$typeof: H0, type: n, compare: e === void 0 ? null : e };
};
me.useCallback = function (n, e) {
  return Ae().useCallback(n, e);
};
me.useContext = function (n, e) {
  return Ae().useContext(n, e);
};
me.useDebugValue = function () {};
me.useEffect = function (n, e) {
  return Ae().useEffect(n, e);
};
me.useImperativeHandle = function (n, e, t) {
  return Ae().useImperativeHandle(n, e, t);
};
me.useLayoutEffect = function (n, e) {
  return Ae().useLayoutEffect(n, e);
};
me.useMemo = function (n, e) {
  return Ae().useMemo(n, e);
};
me.useReducer = function (n, e, t) {
  return Ae().useReducer(n, e, t);
};
me.useRef = function (n) {
  return Ae().useRef(n);
};
me.useState = function (n) {
  return Ae().useState(n);
};
me.version = '16.14.0';
(function (n) {
  n.exports = me;
})(g0);
function Je() {
  return (
    (Je =
      Object.assign ||
      function (n) {
        for (var e = 1; e < arguments.length; e++) {
          var t = arguments[e];
          for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
        }
        return n;
      }),
    Je.apply(this, arguments)
  );
}
var Ci = function (e) {
    return e.attributes.style !== void 0 && delete e.attributes.style, k0(e);
  },
  A0 = function (e) {
    return JSON.parse(JSON.stringify(e));
  },
  T0 = function (e, t) {
    var r = new RegExp('.{1,' + t + '}', 'g');
    return e.match(r);
  },
  P0 = function (e) {
    return typeof e > 'u';
  },
  N0 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  I0 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '32.0072',
          x2: '32.7071',
          y2: '127.3',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64.0072',
          x2: '64.7071',
          y2: '127.3',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '96.0072',
          x2: '96.7071',
          y2: '127.3',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  z0 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0C128 70.6924 70.6924 128 -1.52588e-05 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  R0 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  D0 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0C128 35.3462 99.3462 64 64 64C28.6538 64 0 35.3462 0 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  U0 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  W0 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  J0 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: { cx: '64', cy: '64', r: '8', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Y0 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 92.6538 64 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  K0 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M96 0L96 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  X0 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 128C64 92.6538 35.3462 64 0 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Q0 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0036',
          y1: '15.9965',
          x2: '48.0036',
          y2: '47.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  eu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0036',
          y1: '15.9965',
          x2: '48.0036',
          y2: '47.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  tu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C74.9807 96 32 53.0193 32 -4.19629e-06',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ru = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 0C32 70.6925 74.9807 128 128 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  nu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9965',
          x2: '112.004',
          y2: '111.997',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  iu = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  lu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-8.87604e-09',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '96',
          x2: '-8.87604e-09',
          y2: '96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '32',
          x2: '-8.87604e-09',
          y2: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  su = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  au = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-4.37114e-08',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ou = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128C92.6538 128 64 99.3462 64 64C64 28.6538 92.6538 4.215e-07 128 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  cu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 128C4.63574e-06 92.6489 14.3309 60.6449 37.5 37.4807',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 128C32 101.492 42.7436 77.4939 60.1138 60.1217',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 128C64 110.328 71.1626 94.3287 82.7432 82.7471',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M95.6284 128C95.6284 119.164 99.2097 111.164 105 105.374',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  uu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  du = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '32',
          y1: '2.18557e-08',
          x2: '32',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  fu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M16 64C16 90.5097 37.4903 112 64 112',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  hu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M7.37542e-06 -3.56072e-06C1.19529e-06 70.6924 57.3075 128 128 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  mu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 128C32 110.327 17.6731 96 0 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  pu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M22.1288 22.6299C16.0075 28.7511 8.0234 31.874 0.00134547 31.9986M44.7562 45.2573C32.3866 57.6269 16.2133 63.8747 0.00134277 64.0005M67.3836 67.8847C48.7656 86.5027 24.403 95.8749 0.00134412 96.0012',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  bu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0C128 35.3511 113.669 67.3551 90.5 90.5193',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 0C96 26.5077 85.2564 50.5061 67.8862 67.8783',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 0C64 17.6721 56.8374 33.6713 45.2568 45.2529',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32.3716 0C32.3716 8.83603 28.7903 16.8356 23 22.6264',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ku = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '80',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '80',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  gu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Gu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          y1: '-0.5',
          x2: '45.2548',
          y2: '-0.5',
          transform:
            'matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.6499)',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  _u = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64L-5.96046e-08 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  vu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '63.29',
          y2: '63.2929',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '32.0072',
          x2: '32.7071',
          y2: '127.3',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64.0072',
          x2: '64.7071',
          y2: '127.3',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '96.0072',
          x2: '96.7071',
          y2: '127.3',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Bu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '96',
          y1: '2.18557e-08',
          x2: '96',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  yu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9964',
          x2: '112.004',
          y2: '111.996',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  wu = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M86.6274 86.6274C99.1242 74.1307 99.1242 53.8694 86.6274 41.3726C74.1306 28.8758 53.8694 28.8758 41.3726 41.3726',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M75.3137 75.3137C81.5621 69.0653 81.5621 58.9347 75.3137 52.6863C69.0653 46.4379 58.9347 46.4379 52.6863 52.6863',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M97.9411 97.9411C116.686 79.1959 116.686 48.804 97.9411 30.0589C79.196 11.3137 48.804 11.3137 30.0589 30.0589',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Cu = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  $u = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128C92.6538 128 64 99.3462 64 64C64 28.6538 92.6538 -1.54503e-06 128 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Mu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 64C96 46.3269 81.6731 32 64 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Fu = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 -6.35781e-07C64 35.3462 35.3462 64 0 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  xu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '112',
          cy: '16',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '112',
          cy: '16',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Lu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 128L128 0',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 94L94 0',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 64L64 0',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 32L32 0',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Zu = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 128C64 92.6538 35.3462 64 0 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Hu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ju = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 -6.35781e-07C64 35.3462 35.3462 64 0 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ou = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.52575e-06 96C53.0193 96 96 53.0193 96 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Su = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 128C32 101.492 42.7436 77.4939 60.1138 60.1216',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 128C64 110.328 71.1626 94.3287 82.7432 82.7471',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M95.6284 128C95.6284 119.164 99.2097 111.164 105 105.374',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Vu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 64L5.59506e-06 0L128 1.11901e-05V64C128 99.3462 99.3462 128 64 128C28.6538 128 -4.6351e-06 99.3462 0 64Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M96 128L96 0', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  qu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M96 0L96 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Eu = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9964',
          y1: '111.996',
          x2: '47.9964',
          y2: '79.9964',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Au = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '96.5',
          y1: '3.07317e-08',
          x2: '96.5',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '32.5',
          y1: '3.07317e-08',
          x2: '32.5',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Tu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Pu = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '8.74228e-08',
          y1: '64',
          x2: '128',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '5.25874e-08',
          y1: '32',
          x2: '128',
          y2: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Nu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M60.1244 67.3837C41.5063 48.7657 32.1342 24.4031 32.0079 0.00145601M82.7518 44.7563C70.3822 32.3867 64.1344 16.2134 64.0086 0.00145196M105.379 22.1289C99.258 16.0077 96.1351 8.02351 96.0105 0.00145196',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '16',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '16',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Iu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64.5',
          y1: '-0.5',
          x2: '64.5',
          y2: '127.5',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0035',
          y1: '15.9965',
          x2: '48.0035',
          y2: '47.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  zu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0036',
          y1: '79.9964',
          x2: '112.004',
          y2: '111.996',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ru = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '96',
          y1: '2.18557e-08',
          x2: '96',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Du = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 64C96 81.6731 81.6731 96 64 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0035',
          y1: '15.9965',
          x2: '48.0035',
          y2: '47.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Uu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.0029152 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Wu = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-4.19629e-06 96C70.6924 96 128 53.0193 128 5.59506e-06',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-2.79753e-06 64C70.6924 64 128 35.3462 128 5.59506e-06',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ju = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M127.997 0L-0.00291443 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M86.6274 41.3726C74.1306 28.8758 53.8694 28.8758 41.3726 41.3726C28.8758 53.8694 28.8758 74.1306 41.3726 86.6274',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Yu = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-4.19629e-06 16C26.5097 16 48 37.4903 48 64C48 90.5097 26.5097 112 0 112',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ku = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-3.8147e-06 128C-7.24632e-07 92.6538 28.6538 64 64 64C99.3462 64 128 92.6538 128 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Xu = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 112C90.5097 112 112 90.5097 112 64C112 37.4903 90.5097 16 64 16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Qu = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          y1: '63.5',
          x2: '128',
          y2: '63.5',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  e2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M86.6274 86.6274C99.1242 74.1306 99.1242 53.8693 86.6274 41.3725C74.1306 28.8758 53.8694 28.8758 41.3726 41.3725',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  t2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  r2 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.701724 31.9914C25.6281 31.9914 49.4822 42.5913 66.8261 59.7565M-0.701723 63.9914C16.7916 63.9914 32.6456 71.0098 44.1982 82.3844M-0.701722 95.9914C7.955 95.9914 15.8089 99.4288 21.5694 105.013',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 0C35.3511 0 67.3551 14.3309 90.5193 37.5',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  n2 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128L0 0',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M30.0589 30.0589C48.804 11.3137 79.196 11.3137 97.9411 30.0589C116.686 48.804 116.686 79.196 97.9411 97.9411',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M52.6863 52.6863C58.9347 46.4379 69.0653 46.4379 75.3137 52.6863C81.5621 58.9347 81.5621 69.0653 75.3137 75.3137',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M41.3726 41.3726C53.8694 28.8758 74.1306 28.8758 86.6274 41.3726C99.1242 53.8694 99.1242 74.1306 86.6274 86.6274',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  i2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 32L0 32', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  l2 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 16C90.5097 16 112 37.4903 112 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 64L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  s2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M112 64C112 37.4903 90.5097 16 64 16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  a2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 64L5.59506e-06 0L128 1.11901e-05V64C128 99.3462 99.3462 128 64 128C28.6538 128 -4.6351e-06 99.3462 0 64Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  o2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 -3.05151e-06C32 53.0193 74.9807 96 128 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  c2 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  u2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-2.79795e-06 -3.55988e-06C70.6924 -4.40288e-06 128 57.3075 128 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  d2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M2.03434e-06 128C70.6924 128 128 70.6925 128 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  f2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 32L0 32', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  h2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  m2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-3.8147e-06 1.11901e-05C-7.24633e-07 35.3462 28.6538 64 64 64C99.3462 64 128 35.3462 128 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  p2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  b2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  k2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  g2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 128L128 0',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 0C35.3511 0 67.3551 14.3309 90.5193 37.5',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 32C26.5077 32 50.5061 42.7436 67.8783 60.1138',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 64C17.6721 64 33.6713 71.1626 45.2529 82.7432',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 95.6284C8.83603 95.6284 16.8356 99.2097 22.6264 105',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  G2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-4.37114e-08',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  _2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  v2 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  B2 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M7.37542e-06 -3.56072e-06C1.19529e-06 70.6924 57.3075 128 128 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  y2 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 32L0 32', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  w2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          y1: '-0.5',
          x2: '45.2548',
          y2: '-0.5',
          transform:
            'matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.6499)',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  C2 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 128C4.63574e-06 92.6489 14.3309 60.6449 37.5 37.4807',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 128C32 101.492 42.7436 77.4939 60.1138 60.1217',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 128C64 110.328 71.1626 94.3287 82.7432 82.7471',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M95.6284 128C95.6284 119.164 99.2097 111.164 105 105.374',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  $2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  M2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  F2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  x2 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  L2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          y1: '-0.5',
          x2: '45.2548',
          y2: '-0.5',
          transform:
            'matrix(0.707107 -0.707107 -0.707107 -0.707107 79.6499 47.6499)',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Z2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00291443 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  H2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  j2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-4.37114e-08',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '32',
          y1: '2.18557e-08',
          x2: '32',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  O2 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '98',
          y1: '2.18557e-08',
          x2: '98',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  S2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  V2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          y1: '-0.5',
          x2: '45.2548',
          y2: '-0.5',
          transform:
            'matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.6499)',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0036',
          y1: '79.9965',
          x2: '112.004',
          y2: '111.997',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0035',
          y1: '15.9965',
          x2: '48.0035',
          y2: '47.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  q2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  E2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  A2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M86.6274 86.6274C99.1242 74.1306 99.1242 53.8694 86.6274 41.3726C74.1306 28.8758 53.8694 28.8758 41.3726 41.3726',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  T2 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-4.37114e-08',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  P2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  N2 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M16 64C16 90.5097 37.4903 112 64 112',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  I2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 0C96 53.0193 53.0193 96 0 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 0C64 35.3462 35.3462 64 0 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 0C32 17.6731 17.6731 32 0 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  z2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9964',
          y1: '111.997',
          x2: '47.9964',
          y2: '79.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  R2 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 96C81.6731 96 96 81.6731 96 64C96 46.3269 81.6731 32 64 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  D2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9964',
          y1: '111.997',
          x2: '47.9964',
          y2: '79.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  U2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M86.8823 41.6275C74.3855 29.1307 54.1242 29.1307 41.6274 41.6275C29.1307 54.1243 29.1307 74.3855 41.6274 86.8823',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  W2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 128C32 110.327 17.6731 96 0 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  J2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M22.1288 22.6299C16.0075 28.7511 8.0234 31.874 0.00134547 31.9986M44.7562 45.2573C32.3866 57.6269 16.2133 63.8747 0.00134277 64.0005M67.3836 67.8847C48.7656 86.5027 24.403 95.8749 0.00134412 96.0012',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Y2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  K2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00268555 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          y1: '-0.5',
          x2: '45.2548',
          y2: '-0.5',
          transform:
            'matrix(0.707107 -0.707107 -0.707107 -0.707107 79.6499 47.6499)',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  X2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M60.1244 67.3837C41.5063 48.7657 32.1342 24.4031 32.0079 0.00145601M82.7518 44.7563C70.3822 32.3867 64.1344 16.2134 64.0086 0.00145196M105.379 22.1289C99.258 16.0077 96.1351 8.02351 96.0105 0.00145196',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Q2 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ed = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  td = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64.5',
          y1: '-0.5',
          x2: '64.5',
          y2: '127.5',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M16 64C16 90.5097 37.4903 112 64 112',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M112 64C112 37.4903 90.5097 16 64 16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  rd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  nd = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  id = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ld = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  sd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: { cx: '16', cy: '16', r: '8', fill: '@FG', stroke: '@FG' },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M48 32C48 40.8366 40.8366 48 32 48C23.1634 48 16 40.8366 16 32C16 23.1634 23.1634 16 32 16C40.8366 16 48 23.1634 48 32ZM32 40C36.4183 40 40 36.4183 40 32C40 27.5817 36.4183 24 32 24C27.5817 24 24 27.5817 24 32C24 36.4183 27.5817 40 32 40Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ad = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '96',
          y1: '2.18557e-08',
          x2: '96',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  od = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M2.03434e-06 128C70.6924 128 128 70.6925 128 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  cd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ud = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.00285417',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  dd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M48 96C48 104.837 40.8366 112 32 112C23.1634 112 16 104.837 16 96C16 87.1634 23.1634 80 32 80C40.8366 80 48 87.1634 48 96ZM32 104C36.4183 104 40 100.418 40 96C40 91.5817 36.4183 88 32 88C27.5817 88 24 91.5817 24 96C24 100.418 27.5817 104 32 104Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  fd = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M96 128L96 0', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  hd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  md = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M2.03434e-06 128C70.6924 128 128 70.6925 128 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.52575e-06 96C53.0193 96 96 53.0193 96 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.01717e-06 64C35.3462 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M5.08584e-07 32C17.6731 32 32 17.6731 32 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  pd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '8.74228e-08',
          y1: '64',
          x2: '128',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  bd = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '32',
          y1: '2.18557e-08',
          x2: '32',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M48 64C48 72.8366 40.8366 80 32 80C23.1634 80 16 72.8366 16 64C16 55.1634 23.1634 48 32 48C40.8366 48 48 55.1634 48 64ZM32 72C36.4183 72 40 68.4183 40 64C40 59.5817 36.4183 56 32 56C27.5817 56 24 59.5817 24 64C24 68.4183 27.5817 72 32 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  kd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-4.37114e-08',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  gd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          y1: '-0.5',
          x2: '45.2548',
          y2: '-0.5',
          transform:
            'matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.6499)',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Gd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  _d = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-4.37114e-08',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  vd = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 96C81.6731 96 96 81.6731 96 64C96 46.3269 81.6731 32 64 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Bd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0036',
          y1: '79.9965',
          x2: '112.004',
          y2: '111.997',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0036',
          y1: '15.9965',
          x2: '48.0036',
          y2: '47.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '48',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '48',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '47',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '47',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '81',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '81',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '80',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '80',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  yd = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  wd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 96C46.3269 96 32 81.6731 32 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Cd = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  $d = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          y1: '-0.5',
          x2: '45.2548',
          y2: '-0.5',
          transform:
            'matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.6499)',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9964',
          y1: '111.997',
          x2: '47.9964',
          y2: '79.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Md = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 -9.40976e-06C64 70.6924 92.6538 128 128 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 -7.63193e-07C32 70.6924 74.9807 128 128 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Fd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '95.35',
          y1: '32.7071',
          x2: '32.0571',
          y2: '96',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  xd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 112C90.5097 112 112 90.5097 112 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ld = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '32',
          y1: '2.18557e-08',
          x2: '32',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Zd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M112 64C112 37.4903 90.5097 16 64 16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '112',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '112',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Hd = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '2.78181e-08',
          y1: '64',
          x2: '128',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  jd = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Od = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M2.03434e-06 128C70.6924 128 128 70.6925 128 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.52575e-06 96C53.0193 96 96 53.0193 96 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.01717e-06 64C35.3462 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M5.08584e-07 32C17.6731 32 32 17.6731 32 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Sd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128C92.6489 128 60.6449 113.669 37.4807 90.5',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C101.492 96 77.4939 85.2564 60.1217 67.8862',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C110.328 64 94.3287 56.8374 82.7471 45.2568',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 32.3716C119.164 32.3716 111.164 28.7903 105.374 23',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Vd = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-1.64036e-05 32C53.0193 32 96 74.9807 96 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  qd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ed = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ad = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M7.63192e-07 32C17.6731 32 32 46.3269 32 64C32 81.6731 17.6731 96 0 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Td = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Pd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C110.327 96 96 110.327 96 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Nd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Id = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  zd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9965',
          y1: '111.997',
          x2: '47.9965',
          y2: '79.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Rd = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 92.6538 64 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Dd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0036',
          y1: '15.9965',
          x2: '48.0036',
          y2: '47.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ud = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Wd = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '128',
          x2: '64',
          y2: '-6.55671e-08',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: { cx: '80', cy: '64', r: '8', fill: '@BG' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Jd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-4.70488e-06 64C35.3462 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Yd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00286865 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0C128 35.3511 113.669 67.3551 90.5 90.5193',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 0C96 26.5077 85.2564 50.5061 67.8862 67.8783',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 0C64 17.6721 56.8374 33.6713 45.2568 45.2529',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32.3716 0C32.3716 8.83603 28.7903 16.8356 23 22.6264',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Kd = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-5.21346e-06 32C70.6924 32 128 17.6731 128 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M3.4331e-06 96C70.6924 96 128 53.0193 128 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Xd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C74.9807 96 32 53.0193 32 -4.19629e-06',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Qd = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M16 64C16 90.5097 37.4903 112 64 112',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ef = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  tf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M2.03434e-06 128C70.6924 128 128 70.6925 128 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.52575e-06 96C53.0193 96 96 53.0193 96 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.01717e-06 64C35.3462 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M5.08584e-07 32C17.6731 32 32 17.6731 32 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  rf = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-8.87604e-09',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '32',
          x2: '-8.87604e-09',
          y2: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  nf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  lf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  sf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-8.87604e-09',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 96L0 96', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  af = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M96 0L96 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  of = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 -7.62939e-06L64 -2.03434e-06C99.3462 1.05573e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  cf = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  uf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 -7.62939e-06L64 -2.03434e-06C99.3462 1.05573e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 16C90.5097 16 112 37.4903 112 64C112 90.5097 90.5097 112 64 112',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-8.87604e-09',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  df = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M96 0L96 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ff = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  hf = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  mf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  pf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  bf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  kf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00268555 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '48',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '48',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  gf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Gf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9965',
          x2: '112.003',
          y2: '111.997',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  _f = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  vf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Bf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  yf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9964',
          x2: '112.004',
          y2: '111.996',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  wf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0036',
          y1: '79.9965',
          x2: '112.004',
          y2: '111.997',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Cf = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.0029152 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 64L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M86.6274 86.6274C99.1242 74.1307 99.1242 53.8694 86.6274 41.3726C74.1306 28.8758 53.8694 28.8758 41.3726 41.3726',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M75.3137 75.3137C81.5621 69.0653 81.5621 58.9347 75.3137 52.6863C69.0653 46.4379 58.9347 46.4379 52.6863 52.6863',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M97.9411 97.9411C116.686 79.1959 116.686 48.804 97.9411 30.0589C79.196 11.3137 48.804 11.3137 30.0589 30.0589',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  $f = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Mf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 32C110.327 32 96 17.6731 96 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ff = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 -3.05151e-06C32 53.0193 74.9807 96 128 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  xf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9965',
          x2: '112.003',
          y2: '111.997',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Lf = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Zf = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 92.6538 64 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Hf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9964',
          y1: '111.997',
          x2: '47.9964',
          y2: '79.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  jf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 96L0 96', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 32L0 32', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Of = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Sf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9964',
          y1: '111.996',
          x2: '47.9964',
          y2: '79.9964',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Vf = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 128L32 0', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  qf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ef = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Af = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-2.09815e-06 80C26.5097 80 48 101.49 48 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Tf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-4.37114e-08',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 92.6538 64 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Pf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0036',
          y1: '79.9965',
          x2: '112.004',
          y2: '111.997',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Nf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-4.37114e-08',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '32',
          x2: '-4.37114e-08',
          y2: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '96',
          x2: '-4.37114e-08',
          y2: '96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  If = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  zf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128C92.6538 128 64 99.3462 64 64C64 28.6538 92.6538 4.215e-07 128 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Rf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0036',
          y1: '15.9964',
          x2: '48.0036',
          y2: '47.9964',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 64C96 46.3269 81.6731 32 64 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Df = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 92.6538 64 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00286865 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Uf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Wf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 96L0 96', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 32L0 32', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Jf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M0 96L128 96', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0035',
          y1: '15.9965',
          x2: '48.0035',
          y2: '47.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Yf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Kf = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-4.37114e-08',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M112 64C112 90.5097 90.5097 112 64 112C37.4903 112 16 90.5097 16 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M112 0C112 26.5097 90.5097 48 64 48C37.4903 48 16 26.5097 16 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Xf = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Qf = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  e6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0035',
          y1: '15.9964',
          x2: '48.0035',
          y2: '47.9964',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9964',
          y1: '111.996',
          x2: '47.9964',
          y2: '79.9964',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  t6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  r6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C110.327 96 96 81.6731 96 64C96 46.3269 110.327 32 128 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  n6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '80',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '80',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  i6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 96C81.6731 96 96 81.6731 96 64C96 46.3269 81.6731 32 64 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  l6 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9964',
          x2: '112.003',
          y2: '111.996',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M112 64C112 37.4903 90.5097 16 64 16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  s6 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  a6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  o6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 128C96 74.9807 53.0193 32 0 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  c6 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  u6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0035',
          y1: '15.9965',
          x2: '48.0035',
          y2: '47.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '16',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '16',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  d6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 1.52638e-06C57.3076 -7.74381e-06 9.2702e-06 57.3075 0 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 32C74.9807 32 32 74.9807 32 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 92.6538 64 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C110.327 96 96 110.327 96 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  f6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  h6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  m6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M2.82114e-06 110C60.7513 110 110 60.7513 110 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-5.09828e-06 73C40.3168 73 73 40.3168 73 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-6.63647e-07 37C20.4345 37 37 20.4345 37 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  p6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '8.74228e-08',
          y1: '64',
          x2: '128',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '112',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '112',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  b6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  k6 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: { cx: '64', cy: '64', r: '8', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  g6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-1.52588e-05 128C-9.07866e-06 57.3075 57.3076 1.44926e-06 128 7.62939e-06',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  G6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C101.492 96 77.4939 85.2564 60.1217 67.8862',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C110.328 64 94.3287 56.8374 82.7471 45.2568',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 32.3716C119.164 32.3716 111.164 28.7903 105.374 23',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  _6 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 32C74.9807 32 32 74.9807 32 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  v6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  B6 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  y6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00268555 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 1.90735e-06C96 53.0193 53.0193 96 0 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  w6 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 92.6538 64 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  C6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128C57.3076 128 3.09007e-06 70.6925 0 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C74.9807 96 32 53.0193 32 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 32C110.327 32 96 17.6731 96 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  $6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9965',
          y1: '111.997',
          x2: '47.9965',
          y2: '79.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  M6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  F6 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 64L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  x6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  L6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 -7.62939e-06L64 -2.03434e-06C99.3462 1.05573e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9964',
          x2: '112.003',
          y2: '111.996',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Z6 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 96L0 96', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  H6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128C92.6538 128 64 70.6925 64 7.63192e-07',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  j6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-8.87604e-09',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '32',
          x2: '-8.87604e-09',
          y2: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  O6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  S6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 32C74.9807 32 32 74.9807 32 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00285435 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  V6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  q6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  E6 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '1.51277e-05',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  A6 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  T6 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          y1: '-0.5',
          x2: '45.2548',
          y2: '-0.5',
          transform:
            'matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.65)',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  P6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 96C46.3269 96 32 81.6731 32 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  N6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  I6 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M2.03434e-06 128C70.6924 128 128 70.6925 128 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.52575e-06 96C53.0193 96 96 53.0193 96 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.01717e-06 64C35.3462 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M5.08584e-07 32C17.6731 32 32 17.6731 32 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  z6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  R6 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  D6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  U6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 -7.62939e-06L64 -2.03434e-06C99.3462 1.05573e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 16C90.5097 16 112 37.4903 112 64C112 90.5097 90.5097 112 64 112',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  W6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0.000105172 128C35.3582 128 67.3679 113.664 90.5332 90.4863',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '31',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '31',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  J6 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9964',
          x2: '112.003',
          y2: '111.996',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          y1: '-0.5',
          x2: '45.2548',
          y2: '-0.5',
          transform:
            'matrix(0.707107 -0.707107 -0.707107 -0.707107 79.6499 47.6499)',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Y6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 96L0 96', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 32L0 32', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  K6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  X6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 128C4.63574e-06 92.6489 14.3309 60.6449 37.5 37.4807',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 128C32 101.492 42.7436 77.4939 60.1138 60.1217',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 128C64 110.328 71.1626 94.3287 82.7432 82.7471',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M95.6284 128C95.6284 119.164 99.2097 111.164 105 105.374',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Q6 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M96 0L96 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  eh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00268555 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M95.9984 0C95.9984 26.3298 85.3985 50.1839 68.2332 67.5278M63.9983 0C63.9983 17.4933 56.9799 33.3473 45.6054 44.8999M31.9983 0C31.9983 8.65672 28.5609 16.5106 22.9766 22.2711',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  th = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  rh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 32C81.6731 32 96 46.3269 96 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 16C90.5097 16 112 37.4903 112 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  nh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ih = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  lh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  sh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9964',
          y1: '111.997',
          x2: '47.9964',
          y2: '79.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ah = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C101.492 96 77.4939 85.2564 60.1217 67.8862',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C110.328 64 94.3287 56.8374 82.7471 45.2568',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 32.3716C119.164 32.3716 111.164 28.7903 105.374 23',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  oh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M41.3726 86.6274C28.8758 74.1306 28.8758 53.8693 41.3726 41.3725C53.8694 28.8758 74.1306 28.8758 86.6274 41.3725',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ch = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.693 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  uh = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M96 0L96 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  dh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 -2.67054e-06C32 53.0193 74.9807 96 128 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 -1.78036e-06C64 35.3462 92.6538 64 128 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 -8.9018e-07C96 17.6731 110.327 32 128 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  fh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  hh = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  mh = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 0C96 17.6731 81.6731 32 64 32C46.3269 32 32 17.6731 32 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  ph = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M112 64C112 37.4903 90.5097 16 64 16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  bh = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 128C64 92.6538 35.3462 64 0 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  kh = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 0C96 17.6731 81.6731 32 64 32C46.3269 32 32 17.6731 32 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  gh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 64L5.59506e-06 0L128 1.11901e-05V64C128 99.3462 99.3462 128 64 128C28.6538 128 -4.6351e-06 99.3462 0 64Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Gh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 112C90.5097 112 112 90.5097 112 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.00285417',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  _h = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9964',
          x2: '112.003',
          y2: '111.996',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  vh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Bh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 128C96 74.9807 53.0193 32 0 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 128C64 92.6538 35.3462 64 0 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 128C32 110.327 17.6731 96 0 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  yh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  wh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ch = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  $h = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Mh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64.5',
          y1: '-0.5',
          x2: '64.5',
          y2: '127.5',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '96.5',
          y1: '-0.5',
          x2: '96.5',
          y2: '127.5',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '32.5',
          y1: '-0.5',
          x2: '32.5',
          y2: '127.5',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Fh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '96',
          x2: '-8.87604e-09',
          y2: '96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  xh = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '32',
          x2: '-8.87604e-09',
          y2: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Lh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Zh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Hh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  jh = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M112 64C112 37.4903 90.5097 16 64 16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 64C96 46.3269 81.6731 32 64 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M80 64C80 55.1634 72.8366 48 64 48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Oh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M3.73284e-05 64C17.6633 64 33.6554 56.8445 45.2356 45.2741',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Sh = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Vh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-5.59506e-06 128C35.3462 128 64 99.3462 64 64C64 28.6538 35.3462 1.54503e-06 0 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  qh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Eh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9965',
          y1: '111.997',
          x2: '47.9964',
          y2: '79.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ah = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Th = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ph = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0036',
          y1: '15.9965',
          x2: '48.0036',
          y2: '47.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Nh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Ih = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  zh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00291443 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Rh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '-1.29797e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Dh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 32L0 32', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Uh = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 -9.40976e-06C57.3075 -6.31969e-06 -3.09007e-06 57.3075 0 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Wh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Jh = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Yh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Kh = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C110.327 96 96 81.6731 96 64C96 46.3269 110.327 32 128 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Xh = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 96L0 96', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 32L0 32', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Qh = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  e8 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9965',
          x2: '112.003',
          y2: '111.997',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  t8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 128C32 74.9807 74.9807 32 128 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  r8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9965',
          x2: '112.003',
          y2: '111.997',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  n8 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  i8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9965',
          y1: '111.997',
          x2: '53.9965',
          y2: '73.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  l8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  s8 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '8.74228e-08',
          y1: '64',
          x2: '128',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  a8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 128C96 74.9807 53.0193 32 0 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  o8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M96 0L96 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  c8 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  u8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.693 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  d8 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '32',
          y1: '2.18557e-08',
          x2: '32',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  f8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 64C96 46.3269 81.6731 32 64 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  h8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0C128 35.3511 113.669 67.3551 90.5 90.5193',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 0C96 26.5077 85.2564 50.5061 67.8862 67.8783',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 0C64 17.6721 56.8374 33.6713 45.2568 45.2529',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32.3716 0C32.3716 8.83603 28.7903 16.8356 23 22.6264',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  m8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  p8 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  b8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '112',
          cy: '16',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '112',
          cy: '16',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  k8 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 16C90.5097 16 112 37.4903 112 64C112 90.5097 90.5097 112 64 112',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  g8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0C128 70.6924 70.6925 128 0 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  G8 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M112 64C112 37.4903 90.5097 16 64 16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  _8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  v8 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0C128 35.3511 113.669 67.3551 90.5 90.5193',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 0C96 26.5077 85.2564 50.5061 67.8862 67.8783',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 0C64 17.6721 56.8374 33.6713 45.2568 45.2529',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32.3716 0C32.3716 8.83603 28.7903 16.8356 23 22.6264',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  B8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 32L0 32', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  y8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  w8 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9964',
          x2: '112.003',
          y2: '111.996',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  C8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M5.08584e-07 32C17.6731 32 32 17.6731 32 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  $8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M96 0L96 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  M8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 112C90.5097 112 112 90.5097 112 64C112 37.4903 90.5097 16 64 16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  F8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 128C64 92.6538 35.3462 64 0 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  x8 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  L8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 64C32 81.6731 46.3269 96 64 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Z8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 96L0 96', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  H8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 64C96 81.6731 81.6731 96 64 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  j8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-2.79795e-06 -3.55988e-06C70.6924 -4.40288e-06 128 57.3075 128 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0035',
          y1: '15.9965',
          x2: '48.0035',
          y2: '47.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  O8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128C92.6489 128 60.6449 113.669 37.4807 90.5',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C101.492 96 77.4939 85.2564 60.1217 67.8862',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C110.328 64 94.3287 56.8374 82.7471 45.2568',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 32.3716C119.164 32.3716 111.164 28.7903 105.374 23',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  S8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 96L0 96', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  V8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128C57.3075 128 -3.09007e-06 70.6925 0 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  q8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  E8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.52575e-06 96C53.0193 96 96 53.0193 96 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  A8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 -7.62939e-06L64 -2.03434e-06C99.3462 1.05573e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  T8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  P8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          y1: '-0.5',
          x2: '45.2548',
          y2: '-0.5',
          transform:
            'matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.65)',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  N8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 128L128 0',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.701724 31.9914C25.6281 31.9914 49.4822 42.5913 66.8261 59.7565M-0.701723 63.9914C16.7916 63.9914 32.6456 71.0098 44.1982 82.3844M-0.701722 95.9914C7.955 95.9914 15.8089 99.4288 21.5694 105.013',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  I8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  z8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  R8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-4.37114e-08',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: { cx: '96', cy: '64', r: '8', fill: '@BG' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  D8 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  U8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 0 0 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  W8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 64C96 46.3269 81.6731 32 64 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  J8 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Y8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  K8 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  X8 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Q8 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 128C32 110.327 46.3269 96 64 96C81.6731 96 96 110.327 96 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  e5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: { cx: '64', cy: '64', r: '8', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  t5 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.01717e-06 64C35.3462 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  r5 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 128C96 110.327 81.6731 96 64 96C46.3269 96 32 110.327 32 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  n5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 128L64 0', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 128L32 0', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M96 128L96 0', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  i5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 64L5.59506e-06 0L128 1.11901e-05V64C128 99.3462 99.3462 128 64 128C28.6538 128 -4.6351e-06 99.3462 0 64Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  l5 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 64L128 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  s5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  a5 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 9.40976e-06C64 35.3462 92.6538 64 128 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  o5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  c5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128C110.327 128 96 113.673 96 96C96 78.3269 110.327 64 128 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  u5 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  d5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '16.0036',
          y1: '15.9965',
          x2: '48.0036',
          y2: '47.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  f5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  h5 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M16 64C16 37.4903 37.4903 16 64 16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  m5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  p5 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 96L0 96', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  b5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '16',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '16',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  k5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 96C81.6731 96 96 81.6731 96 64C96 46.3269 81.6731 32 64 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  g5 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64L-5.96046e-08 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  G5 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  _5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '127.553',
          y1: '128.224',
          x2: '63.5528',
          y2: '0.223598',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  v5 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  B5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0C128 35.3511 113.669 67.3551 90.5 90.5193',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 0C96 26.5077 85.2564 50.5061 67.8862 67.8783',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 0C64 17.6721 56.8374 33.6713 45.2568 45.2529',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32.3716 0C32.3716 8.83603 28.7903 16.8356 23 22.6264',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  y5 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 128L128 0',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128C92.6489 128 60.6449 113.669 37.4807 90.5',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C101.492 96 77.4939 85.2564 60.1217 67.8862',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C110.328 64 94.3287 56.8374 82.7471 45.2568',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 32.3716C119.164 32.3716 111.164 28.7903 105.374 23',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  w5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  C5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-8.87604e-09',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  $5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  M5 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 96C46.3269 96 32 81.6731 32 64C32 46.3269 46.3269 32 64 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  F5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.01717e-06 64C35.3462 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  x5 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '80',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '80',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '48',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '48',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '48',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '48',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '80',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '80',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  L5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 112C90.5097 112 112 90.5097 112 64C112 37.4903 90.5097 16 64 16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Z5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M3.73284e-05 64.0001C17.6633 64.0001 33.6554 56.8446 45.2356 45.2742',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0.000105172 128C35.3582 128 67.3679 113.664 90.5332 90.4863',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  H5 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  j5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 16C37.4903 16 16 37.4903 16 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  O5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  S5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '96.5',
          y1: '3.07317e-08',
          x2: '96.5',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  V5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 0C35.3511 0 67.3551 14.3309 90.5193 37.5',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 32C26.5077 32 50.5061 42.7436 67.8783 60.1138',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 64C17.6721 64 33.6713 71.1626 45.2529 82.7432',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 95.6284C8.83603 95.6284 16.8356 99.2097 22.6264 105',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  q5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.01717e-06 64C35.3462 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  E5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  A5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  T5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 128C4.63574e-06 92.6488 14.3309 60.6449 37.5 37.4807',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 128C32 101.492 42.7436 77.4939 60.1138 60.1216',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 128C64 110.328 71.1626 94.3287 82.7432 82.7471',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M95.6284 128C95.6284 119.164 99.2097 111.164 105 105.374',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  P5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: { cx: '64', cy: '64', r: '8', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  N5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  I5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  z5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0036',
          y1: '79.9964',
          x2: '112.004',
          y2: '111.996',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  R5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '0.5',
          y1: '-0.5',
          x2: '181.5',
          y2: '-0.5',
          transform: 'matrix(-0.707107 0.707107 0.707107 0.707107 128.71 0)',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 128C96 74.9807 53.0193 32 0 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  D5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '96',
          x2: '-8.87604e-09',
          y2: '96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '32',
          x2: '-8.87604e-09',
          y2: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  U5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 128C96 74.9807 53.0193 32 0 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 128C64 92.6538 35.3462 64 0 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M48 128C48 101.49 26.5097 80 0 80',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 128C32 110.327 17.6731 96 0 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M16 128C16 119.163 8.83656 112 0 112',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3075 70.6925 0 0 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  W5 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-8.87604e-09',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 32C81.6731 32 96 46.3269 96 64C96 81.6731 81.6731 96 64 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  J5 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Y5 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 32C81.6731 32 96 46.3269 96 64C96 81.6731 81.6731 96 64 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  K5 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.52575e-06 96C53.0193 96 96 53.0193 96 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  X5 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9965',
          x2: '112.003',
          y2: '111.997',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Q5 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  e4 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 80C119.163 80 112 72.8366 112 64C112 55.1634 119.163 48 128 48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  t4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '15',
          cy: '112',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '15',
          cy: '112',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 0L127.986 127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 0L128 96',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 0L128 64',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 0L128 32',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  r4 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 92.6538 64 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.00285417',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  n4 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '48',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '48',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '48',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '48',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '80',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '80',
          cy: '80',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '80',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '48',
          cy: '80',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  i4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.14479e-06 96C53.0193 96 96 53.0193 96 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  l4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 64L5.59506e-06 0L128 1.11901e-05V64C128 99.3462 99.3462 128 64 128C28.6538 128 -4.6351e-06 99.3462 0 64Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '96.5',
          y1: '3.07317e-08',
          x2: '96.5',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.01717e-06 64C35.3462 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  s4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  a4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  o4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9965',
          y1: '111.997',
          x2: '47.9965',
          y2: '79.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  c4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 32C110.327 32 96 17.6731 96 -1.39876e-06',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  u4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '96',
          y1: '2.18557e-08',
          x2: '96',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M112 32C112 40.8366 104.837 48 96 48C87.1634 48 80 40.8366 80 32C80 23.1634 87.1634 16 96 16C104.837 16 112 23.1634 112 32ZM96 40C100.418 40 104 36.4183 104 32C104 27.5817 100.418 24 96 24C91.5817 24 88 27.5817 88 32C88 36.4183 91.5817 40 96 40Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  d4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0036',
          y1: '79.9965',
          x2: '112.004',
          y2: '111.997',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  f4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00291443 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  h4 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '32',
          y1: '2.18557e-08',
          x2: '32',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  m4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  p4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  b4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 96L0 96', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  k4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '96',
          x2: '-8.87604e-09',
          y2: '96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  g4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  G4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 96C46.3269 96 32 81.6731 32 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  _4 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '128',
          y1: '64',
          x2: '-4.37114e-08',
          y2: '64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M16 128C16 101.49 37.4903 80 64 80C90.5097 80 112 101.49 112 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  v4 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  B4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 32C74.9807 32 32 74.9807 32 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 92.6538 64 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C110.327 96 96 110.327 96 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  y4 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '16',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  w4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  C4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 96L0 96', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  $4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  M4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 32L0 32', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  F4 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  x4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 64V128H0L2.79753e-06 64C4.34256e-06 28.6538 28.6538 -1.54503e-06 64 0C99.3462 1.54503e-06 128 28.6538 128 64Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  L4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Z4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  H4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  j4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00280762 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          y1: '-0.5',
          x2: '45.2548',
          y2: '-0.5',
          transform:
            'matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.6499)',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '15.9964',
          y1: '111.997',
          x2: '47.9964',
          y2: '79.9965',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  O4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M7.37542e-06 -3.56072e-06C1.19529e-06 70.6924 57.3075 128 128 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  S4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 -2.28831e-06C57.3076 -3.13131e-06 8.42999e-07 57.3075 0 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  V4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M96 1.90735e-06C96 53.0193 53.0193 96 0 96',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  q4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 0L128 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 64C35.3462 64 64 92.6538 64 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  E4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M256 0L128 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  A4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '11.5',
          fill: '@BG',
          stroke: '@BG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '112',
          r: '9',
          fill: '@FG',
          stroke: '@FG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  T4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64.5',
          y1: '-0.5',
          x2: '64.5',
          y2: '127.5',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '32',
          y1: '2.18557e-08',
          x2: '32',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  P4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  N4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  I4 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3075 70.6925 0 0 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  z4 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  R4 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M79.5254 0C79.5254 8.83656 72.3619 16 63.5254 16C54.6888 16 47.5254 8.83656 47.5254 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  D4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 32C74.9807 32 32 74.9807 32 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 64C92.6538 64 64 92.6538 64 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C110.327 96 96 110.327 96 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  U4 = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.01717e-06 64C35.3462 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  W4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  J4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 64L5.59506e-06 0L128 1.11901e-05V64C128 99.3462 99.3462 128 64 128C28.6538 128 -4.6351e-06 99.3462 0 64Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M32 0L32 128', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Y4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '80.0035',
          y1: '79.9965',
          x2: '112.003',
          y2: '111.997',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '112',
          cy: '112',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '112',
          cy: '112',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  K4 = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M64 64H0', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  X4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  Q4 = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 0C57.3075 8.42999e-07 -8.42999e-07 57.3075 0 128H128V0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  em = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '48.0035',
          y1: '80.0036',
          x2: '16.0035',
          y2: '112.004',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M80 64C80 72.8366 72.8366 80 64 80C55.1634 80 48 72.8366 48 64C48 55.1634 55.1634 48 64 48C72.8366 48 80 55.1634 80 64ZM64 72C68.4183 72 72 68.4183 72 64C72 59.5817 68.4183 56 64 56C59.5817 56 56 59.5817 56 64C56 68.4183 59.5817 72 64 72Z',
          fill: '@BG',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  tm = {
    children: [
      {
        name: 'rect',
        attributes: {
          width: '128',
          height: '128',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  rm = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 0C0 70.6925 57.3075 128 128 128V0H0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 64L0 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M128 32L0 32', stroke: '@BG', fill: 'none' },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  nm = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0 127.946C0.0292286 57.2783 57.3256 3.08928e-06 128 0C128 70.6823 70.7089 127.984 0.0305092 128C0.0203397 128 0.01017 128 2.36469e-09 128L0 127.946Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '64',
          y1: '2.18557e-08',
          x2: '64',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '32',
          y1: '2.18557e-08',
          x2: '32',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '96',
          y1: '2.18557e-08',
          x2: '96',
          y2: '128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  im = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: { d: 'M0 64L128 64', stroke: '@BG', fill: 'none' },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 96C110.327 96 96 81.6731 96 64C96 46.3269 110.327 32 128 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  lm = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          y1: '-0.5',
          x2: '45.2548',
          y2: '-0.5',
          transform:
            'matrix(0.707107 -0.707107 -0.707107 -0.707107 79.65 47.65)',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'line',
        attributes: {
          x1: '-0.0029152',
          x2: '127.983',
          y2: '127.986',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M64 96C46.3269 96 32 81.6731 32 64',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  sm = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  am = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M0.0541 0C70.7217 0.0292317 128 57.3256 128 128C57.3177 128 0.0164917 70.7089 7.62806e-06 0.0305091C7.62851e-06 0.0203397 -4.44317e-10 0.01017 0 0H0.0541Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M32 64C32 46.3269 46.3269 32 64 32',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  om = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M128 128C128 57.3076 70.6925 6.18013e-06 1.11901e-05 0L0 128L128 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-3.8147e-06 128C-7.24633e-07 92.6538 28.6538 64 64 64C99.3462 64 128 92.6538 128 128',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  cm = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.52575e-06 96C53.0193 96 96 53.0193 96 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M1.01717e-06 64C35.3462 64 64 35.3462 64 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M5.08584e-07 32C17.6731 32 32 17.6731 32 0',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  um = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M64 128H0L5.59506e-06 0L64 5.59506e-06C99.3462 8.68512e-06 128 28.6538 128 64C128 99.3462 99.3462 128 64 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M128 0L0 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '48',
          stroke: '@BG',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '16',
          cy: '64',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  dm = {
    children: [
      {
        name: 'path',
        attributes: {
          d: 'M5.59506e-06 128C70.6925 128 128 70.6925 128 0L0 5.59506e-06L5.59506e-06 128Z',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
      {
        name: 'path',
        attributes: {
          d: 'M-0.00292969 0L127.997 128',
          stroke: '@BG',
          'stroke-linecap': 'square',
          fill: 'none',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '96',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '32',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '11.5',
          fill: '@FG',
          stroke: '@FG',
        },
        children: [],
      },
      {
        name: 'circle',
        attributes: {
          cx: '96',
          cy: '32',
          r: '9',
          fill: '@BG',
          stroke: '@BG',
          'stroke-width': '2',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  fm = {
    children: [
      {
        name: 'circle',
        attributes: {
          cx: '64',
          cy: '64',
          r: '64',
          fill: '@FG',
          stroke: '@BG',
          'stroke-width': '0.5',
          dataisgeon: 'true',
        },
        children: [],
      },
    ],
    name: 'g',
    attributes: { fill: 'none' },
  },
  hm = {
    bac: N0,
    bal: I0,
    ban: z0,
    bar: R0,
    bat: D0,
    bec: U0,
    bel: W0,
    ben: J0,
    bep: Y0,
    ber: K0,
    bes: X0,
    bet: Q0,
    bex: eu,
    bic: tu,
    bid: ru,
    bil: nu,
    bin: iu,
    bis: lu,
    bit: su,
    bol: au,
    bon: ou,
    bor: cu,
    bos: uu,
    bot: du,
    bud: fu,
    bur: hu,
    bus: mu,
    byl: pu,
    byn: bu,
    byr: ku,
    byt: gu,
    dab: Gu,
    dac: _u,
    dal: vu,
    dan: Bu,
    dap: yu,
    dar: wu,
    das: Cu,
    dat: $u,
    dav: Mu,
    deb: Fu,
    dec: xu,
    def: Lu,
    deg: Zu,
    del: Hu,
    dem: ju,
    den: Ou,
    dep: Su,
    der: Vu,
    des: qu,
    det: Eu,
    dev: Au,
    dex: Tu,
    dib: Pu,
    dif: Nu,
    dig: Iu,
    dil: zu,
    din: Ru,
    dir: Du,
    dis: Uu,
    div: Wu,
    doc: Ju,
    dol: Yu,
    don: Ku,
    dop: Xu,
    dor: Qu,
    dos: e2,
    dot: t2,
    dov: r2,
    doz: n2,
    duc: i2,
    dul: l2,
    dun: s2,
    dur: a2,
    dus: o2,
    dut: c2,
    dux: u2,
    dyl: d2,
    dyn: f2,
    dyr: h2,
    dys: m2,
    dyt: p2,
    fab: b2,
    fad: k2,
    fal: g2,
    fam: G2,
    fan: _2,
    fas: v2,
    feb: B2,
    fed: y2,
    fel: w2,
    fen: C2,
    fep: $2,
    fer: M2,
    fes: F2,
    fet: x2,
    fex: L2,
    fid: Z2,
    fig: H2,
    fil: j2,
    fin: O2,
    fip: S2,
    fir: V2,
    fit: q2,
    fod: E2,
    fog: A2,
    fol: T2,
    fon: P2,
    fop: N2,
    for: {
      children: [
        {
          name: 'path',
          attributes: {
            d: 'M64 0H128V128H64C28.6538 128 0 99.3462 0 64C0 28.6538 28.6538 0 64 0Z',
            fill: '@FG',
            stroke: '@BG',
            'stroke-width': '0.5',
            dataisgeon: 'true',
          },
          children: [],
        },
        {
          name: 'line',
          attributes: {
            x1: '96',
            y1: '2.18557e-08',
            x2: '96',
            y2: '128',
            stroke: '@BG',
            fill: 'none',
          },
          children: [],
        },
        {
          name: 'circle',
          attributes: {
            cx: '64',
            cy: '64',
            r: '11.5',
            fill: '@FG',
            stroke: '@FG',
          },
          children: [],
        },
        {
          name: 'circle',
          attributes: {
            cx: '64',
            cy: '64',
            r: '9',
            fill: '@BG',
            stroke: '@BG',
            'stroke-width': '2',
          },
          children: [],
        },
      ],
      name: 'g',
      attributes: { fill: 'none' },
    },
    fos: I2,
    fot: z2,
    ful: R2,
    fun: D2,
    fur: U2,
    fus: W2,
    fyl: J2,
    fyn: Y2,
    fyr: K2,
    hab: X2,
    hac: Q2,
    had: ed,
    hal: td,
    han: rd,
    hap: nd,
    har: id,
    has: ld,
    hat: sd,
    hav: ad,
    heb: od,
    hec: cd,
    hep: ud,
    hes: dd,
    het: fd,
    hex: hd,
    hid: md,
    hil: pd,
    hin: bd,
    hob: kd,
    hoc: gd,
    hod: Gd,
    hol: _d,
    hop: vd,
    hos: Bd,
    hul: yd,
    hus: wd,
    hut: Cd,
    lab: $d,
    lac: Md,
    lad: Fd,
    lag: xd,
    lan: Ld,
    lap: Zd,
    lar: Hd,
    las: jd,
    lat: Od,
    lav: Sd,
    leb: Vd,
    lec: qd,
    led: Ed,
    leg: Ad,
    len: Td,
    lep: Pd,
    ler: Nd,
    let: {
      children: [
        {
          name: 'circle',
          attributes: {
            cx: '64',
            cy: '64',
            r: '64',
            fill: '@FG',
            stroke: '@BG',
            'stroke-width': '0.5',
            dataisgeon: 'true',
          },
          children: [],
        },
        {
          name: 'path',
          attributes: { d: 'M64 0L64 128', stroke: '@BG', fill: 'none' },
          children: [],
        },
      ],
      name: 'g',
      attributes: { fill: 'none' },
    },
    lev: Id,
    lex: zd,
    lib: Rd,
    lid: Dd,
    lig: Ud,
    lin: Wd,
    lis: Jd,
    lit: Yd,
    liv: Kd,
    loc: Xd,
    lod: Qd,
    lom: ef,
    lon: tf,
    lop: rf,
    lor: nf,
    los: lf,
    luc: sf,
    lud: af,
    lug: of,
    lun: cf,
    lup: uf,
    lur: df,
    lus: ff,
    lut: hf,
    lux: mf,
    lyd: pf,
    lyn: bf,
    lyr: kf,
    lys: gf,
    lyt: Gf,
    lyx: _f,
    mac: vf,
    mag: Bf,
    mal: yf,
    map: wf,
    mar: Cf,
    mas: $f,
    mat: Mf,
    meb: Ff,
    mec: xf,
    med: Lf,
    meg: Zf,
    mel: Hf,
    mep: jf,
    mer: Of,
    mes: Sf,
    met: Vf,
    mev: qf,
    mex: Ef,
    mic: Af,
    mid: Tf,
    mig: Pf,
    mil: Nf,
    min: If,
    mip: zf,
    mir: Rf,
    mis: Df,
    mit: Uf,
    moc: Wf,
    mod: Jf,
    mog: Yf,
    mol: Kf,
    mon: Xf,
    mop: Qf,
    mor: e6,
    mos: t6,
    mot: r6,
    mud: n6,
    mug: i6,
    mul: l6,
    mun: s6,
    mur: a6,
    mus: o6,
    mut: c6,
    myl: u6,
    myn: d6,
    myr: f6,
    nac: h6,
    nal: m6,
    nam: p6,
    nap: b6,
    nar: k6,
    nat: g6,
    nav: G6,
    neb: _6,
    nec: v6,
    ned: B6,
    nel: y6,
    nem: w6,
    nep: C6,
    ner: $6,
    nes: M6,
    net: F6,
    nev: x6,
    nex: L6,
    nib: Z6,
    nid: H6,
    nil: j6,
    nim: O6,
    nis: S6,
    noc: V6,
    nod: q6,
    nol: E6,
    nom: A6,
    nop: T6,
    nor: P6,
    nos: N6,
    nov: I6,
    nub: z6,
    nul: R6,
    num: D6,
    nup: U6,
    nus: W6,
    nut: J6,
    nux: Y6,
    nyd: K6,
    nyl: X6,
    nym: Q6,
    nyr: eh,
    nys: th,
    nyt: rh,
    nyx: nh,
    pac: ih,
    pad: lh,
    pag: sh,
    pal: ah,
    pan: oh,
    par: ch,
    pas: uh,
    pat: dh,
    pec: fh,
    ped: hh,
    peg: mh,
    pel: ph,
    pem: bh,
    pen: kh,
    per: gh,
    pes: Gh,
    pet: _h,
    pex: vh,
    pic: Bh,
    pid: yh,
    pil: wh,
    pin: Ch,
    pit: $h,
    poc: Mh,
    pod: Fh,
    pol: xh,
    pon: Lh,
    pos: Zh,
    pub: Hh,
    pun: jh,
    pur: Oh,
    put: Sh,
    pyl: Vh,
    pyx: qh,
    rab: Eh,
    rac: Ah,
    rad: Th,
    rag: Ph,
    ral: Nh,
    ram: Ih,
    ran: zh,
    rap: Rh,
    rav: Dh,
    reb: Uh,
    rec: Wh,
    red: Jh,
    ref: Yh,
    reg: Kh,
    rel: Xh,
    rem: Qh,
    ren: e8,
    rep: t8,
    res: r8,
    ret: n8,
    rev: i8,
    rex: l8,
    rib: s8,
    ric: a8,
    rid: o8,
    rig: c8,
    ril: u8,
    rin: d8,
    rip: f8,
    ris: h8,
    rit: m8,
    riv: p8,
    roc: b8,
    rol: k8,
    ron: g8,
    rop: G8,
    ros: _8,
    rov: v8,
    ruc: B8,
    rud: y8,
    rul: w8,
    rum: C8,
    run: $8,
    rup: M8,
    rus: F8,
    rut: x8,
    rux: L8,
    ryc: Z8,
    ryd: H8,
    ryg: j8,
    ryl: O8,
    rym: S8,
    ryn: V8,
    ryp: q8,
    rys: E8,
    ryt: A8,
    ryx: T8,
    sab: P8,
    sal: N8,
    sam: I8,
    san: z8,
    sap: R8,
    sar: D8,
    sat: U8,
    sav: W8,
    seb: J8,
    sec: Y8,
    sed: K8,
    sef: X8,
    seg: Q8,
    sel: e5,
    sem: t5,
    sen: r5,
    sep: n5,
    ser: i5,
    set: l5,
    sev: s5,
    sib: a5,
    sic: o5,
    sid: c5,
    sig: u5,
    sil: d5,
    sim: f5,
    sip: h5,
    sit: m5,
    siv: p5,
    soc: b5,
    sog: k5,
    sol: g5,
    som: G5,
    son: _5,
    sop: v5,
    sor: B5,
    sov: y5,
    sub: w5,
    sud: C5,
    sug: $5,
    sul: M5,
    sum: F5,
    sun: x5,
    sup: L5,
    sur: Z5,
    sut: H5,
    syd: j5,
    syl: O5,
    sym: S5,
    syn: V5,
    syp: q5,
    syr: E5,
    syt: A5,
    syx: T5,
    tab: P5,
    tac: N5,
    tad: I5,
    tag: z5,
    tal: R5,
    tam: D5,
    tan: U5,
    tap: W5,
    tar: J5,
    tas: Y5,
    teb: K5,
    tec: X5,
    ted: Q5,
    teg: e4,
    tel: t4,
    tem: r4,
    ten: n4,
    tep: i4,
    ter: l4,
    tes: s4,
    tev: a4,
    tex: o4,
    tic: c4,
    tid: u4,
    til: d4,
    tim: f4,
    tin: h4,
    tip: m4,
    tir: p4,
    tob: b4,
    toc: k4,
    tod: g4,
    tog: G4,
    tol: _4,
    tom: v4,
    ton: B4,
    top: y4,
    tor: w4,
    tuc: C4,
    tud: $4,
    tug: M4,
    tul: F4,
    tun: x4,
    tus: L4,
    tux: Z4,
    tyc: H4,
    tyd: j4,
    tyl: O4,
    tyn: S4,
    typ: V4,
    tyr: q4,
    tyv: E4,
    wac: A4,
    wal: T4,
    wan: P4,
    wat: N4,
    web: I4,
    wed: z4,
    weg: R4,
    wel: D4,
    wen: U4,
    wep: W4,
    wer: J4,
    wes: Y4,
    wet: K4,
    wex: X4,
    wic: Q4,
    wid: em,
    win: tm,
    wis: rm,
    wit: nm,
    wol: im,
    wor: lm,
    wyc: sm,
    wyd: am,
    wyl: om,
    wyn: cm,
    wyt: um,
    wyx: dm,
    zod: fm,
  },
  $i = 1,
  Mi = 0,
  $r = { FG: '@FG', BG: '@BG' },
  mm = {
    4: [
      { x: 0, y: 0 },
      { x: 128, y: 0 },
      { x: 0, y: 128 },
      { x: 128, y: 128 },
    ],
    2: [
      { x: 0, y: 0 },
      { x: 128, y: 0 },
    ],
    1: [{ x: 0, y: 0 }],
  },
  Fi = { 4: { x: 2, y: 2 }, 2: { x: 2, y: 1 }, 1: { x: 1, y: 1 } },
  pm = function n(e, t, r) {
    var i = e.attributes.fill === $r.FG ? $i : Mi,
      s = e.attributes.stroke === $r.FG ? $i : Mi;
    return (
      e.attributes.fill !== void 0 &&
        e.attributes.fill !== 'none' &&
        (e.attributes.fill = t[i]),
      e.attributes.stroke !== void 0 &&
        e.attributes.stroke !== 'none' &&
        ((e.attributes.stroke = t[s]),
        (e.attributes['stroke-width'] = r + 'px'),
        (e.attributes['stroke-linecap'] = 'square'),
        (e.attributes['vector-effect'] = 'non-scaling-stroke')),
      Je(
        {
          name: e.name,
          attributes: e.attributes,
          children: e.children.map(function (l) {
            return n(l, t, r);
          }),
        },
        e
      )
    );
  },
  xi = function (e) {
    (e = Je({}, e)),
      typeof e.colors > 'u' && (e.colors = ['#000', '#fff']),
      typeof e.attributes > 'u' && (e.attributes = {}),
      typeof e.style > 'u' && (e.style = {}),
      typeof e.class > 'u' && (e.class = ''),
      typeof e.size > 'u' || ((e.width = e.size), (e.height = e.size)),
      (typeof e.width > 'u' || typeof e.height > 'u') &&
        ((e.width = 128), (e.height = 128)),
      typeof e.margin > 'u' && (e.margin = !0),
      e.icon === !0 && (e.margin = !1);
    var t = T0(e.patp.replace(/[\^~-]/g, ''), 3);
    Array.isArray(t) || dr(!1);
    var r = t.length === 1 || t.length === 2 || t.length === 4;
    r || dr(!1);
    var i,
      s = t.map(function (C) {
        var S = hm[C];
        return P0(S) ? ((i = !1), {}) : ((i = !0), A0(S));
      });
    i || dr(!1),
      e.icon === !0 &&
        (s = s.map(function (C) {
          return Je({}, C, {
            children: C.children.filter(function (S) {
              return S.attributes.dataisgeon;
            }),
          });
        }));
    for (
      var l = s.length === 4 ? 4 : s.length === 2 ? 2 : 1, o = mm[l], a = 0;
      a < o.length;
      a++
    ) {
      var c = Gi(gi(o[a].x, o[a].y));
      s[a].attributes === void 0 && (s[a].attributes = {}),
        (s[a].attributes.transform = c);
    }
    var u;
    l === 1
      ? e.margin === !0
        ? (u = 0.5 * 0.8)
        : (u = 1)
      : e.margin === !0
      ? (u = 0.5 * 0.8)
      : (u = 0.5);
    var d = { x: e.width * u, y: e.height * u },
      f = {
        x: (e.width - Fi[l].x * d.x) / 2,
        y: (e.height - Fi[l].y * d.y) / 2,
      };
    (e.margin === !1 || e.icon === !0) &&
      ((f.x = 0), e.icon !== !0 && (f.y = 0));
    var p = d.x / 128,
      m = Gi(jl(gi(f.x, f.y), u0(p, p))),
      k = {
        name: 'g',
        type: '',
        value: '',
        attributes: { transform: m },
        children: s,
      };
    e.style === void 0 && (e.style = {}),
      e.style.width === void 0 && (e.style.width = e.width + 'px'),
      e.style.height === void 0 && (e.style.height = e.height + 'px');
    var y = {
        name: 'svg',
        type: '',
        value: '',
        attributes: Je(
          {
            style: Je({ display: 'block' }, e.style),
            viewBox: '0 0 ' + e.width + ' ' + e.height,
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
            class: e.class,
          },
          e.attributes
        ),
        children: [
          {
            name: 'rect',
            type: '',
            value: '',
            attributes: {
              fill: $r.BG,
              width: e.width + 'px',
              height: e.height + 'px',
              x: '0px',
              y: '0px',
            },
            children: [],
          },
          k,
        ],
      },
      w;
    e.strokeScalingFunction
      ? (w = e.strokeScalingFunction(e.size))
      : (w = e.width / 128 + 0.33),
      e.icon === !0 && (w = 0.8);
    var M = pm(y, e.colors, w);
    return e.renderer === void 0 ? M : e.renderer(M);
  };
function bm(n) {
  let e,
    t =
      xi({
        patp: n[0],
        renderer: Ci,
        size: n[1] || 50,
        colors: [`#${n[2]}`, `#${n[3]}`],
      }) + '',
    r;
  return {
    c() {
      (e = new Yl(!1)), (r = se()), (e.a = r);
    },
    m(i, s) {
      e.m(t, i, s), B(i, r, s);
    },
    p(i, [s]) {
      s & 15 &&
        t !==
          (t =
            xi({
              patp: i[0],
              renderer: Ci,
              size: i[1] || 50,
              colors: [`#${i[2]}`, `#${i[3]}`],
            }) + '') &&
        e.p(t);
    },
    i: j,
    o: j,
    d(i) {
      i && v(r), i && e.d();
    },
  };
}
function km(n, e, t) {
  let r,
    i,
    { patp: s, size: l } = e,
    { color: o = '0x0' } = e;
  return (
    ne.subscribe(() => {
      t(4, ({ color: o } = Re(s).bespoke || {}), o);
    }),
    (n.$$set = (a) => {
      'patp' in a && t(0, (s = a.patp)),
        'size' in a && t(1, (l = a.size)),
        'color' in a && t(4, (o = a.color));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 16 && t(2, (r = Bl(o))),
        n.$$.dirty & 4 &&
          r.length < 6 &&
          (t(2, (r = '000000')), t(3, (i = 'ffffff'))),
        n.$$.dirty & 4 && t(3, (i = va(r) ? '000000' : 'ffffff')),
        n.$$.dirty & 1 && (!s || s.length > 14) && t(0, (s = '~zod'));
    }),
    [s, l, r, i, o]
  );
}
class Oe extends Q {
  constructor(e) {
    super(), X(this, e, km, bm, K, { patp: 0, size: 1, color: 4 });
  }
}
function gm(n) {
  let e, t, r, i, s, l, o, a, c;
  return (
    (i = new Oe({ props: { patp: n[1] } })),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          (r = _('div')),
          L(i.$$.fragment),
          (s = $()),
          (l = _('input')),
          h(r, 'class', 'col-span-7 col-start-2 md:col-span-3 md:col-start-4'),
          h(l, 'type', 'text'),
          h(
            l,
            'class',
            'p-2 col-span-7 col-start-2 md:col-span-3 md:col-start-4 bg-panels border focus:outline-none placeholder-grey'
          ),
          h(l, 'placeholder', '~worpet-bildet'),
          D(l, 'border-rose-500', n[1] !== n[0]),
          h(t, 'class', 'grid grid-cols-9'),
          h(e, 'class', 'flex flex-col gap-4');
      },
      m(u, d) {
        B(u, e, d),
          b(e, t),
          b(t, r),
          F(i, r, null),
          b(t, s),
          b(t, l),
          pe(l, n[0]),
          (o = !0),
          a || ((c = te(l, 'input', n[2])), (a = !0));
      },
      p(u, [d]) {
        const f = {};
        d & 2 && (f.patp = u[1]),
          i.$set(f),
          d & 1 && l.value !== u[0] && pe(l, u[0]),
          (!o || d & 3) && D(l, 'border-rose-500', u[1] !== u[0]);
      },
      i(u) {
        o || (g(i.$$.fragment, u), (o = !0));
      },
      o(u) {
        G(i.$$.fragment, u), (o = !1);
      },
      d(u) {
        u && v(e), x(i), (a = !1), c();
      },
    }
  );
}
function Gm(n, e, t) {
  let { ship: r } = e,
    i = r;
  function s() {
    (r = this.value), t(0, r);
  }
  return (
    (n.$$set = (l) => {
      'ship' in l && t(0, (r = l.ship));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 1 && Pt(r) && t(1, (i = r));
    }),
    [r, i, s]
  );
}
class _m extends Q {
  constructor(e) {
    super(), X(this, e, Gm, gm, K, { ship: 0 });
  }
}
function Li(n, e, t) {
  const r = n.slice();
  return (r[12] = e[t]), r;
}
function Zi(n, e, t) {
  const r = n.slice();
  return (
    (r[15] = e[t].description),
    (r[16] = e[t].viewers),
    (r[17] = e[t].location),
    r
  );
}
function vm(n) {
  let e, t, r, i, s, l, o, a, c, u, d, f, p, m, k;
  return (
    (o = new Oe({ props: { patp: n[4] || '~zod' } })),
    (f = new Xo({})),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          (t.textContent = 'Find a curator'),
          (r = $()),
          (i = _('div')),
          (s = _('div')),
          (l = _('div')),
          L(o.$$.fragment),
          (a = $()),
          (c = _('input')),
          (u = $()),
          (d = _('button')),
          L(f.$$.fragment),
          h(t, 'class', 'text-xl font-bold'),
          h(l, 'class', 'w-6'),
          h(c, 'type', 'text'),
          h(c, 'class', 'border-b focus:outline-none placeholder-grey'),
          h(c, 'placeholder', '~worpet-bildet'),
          h(s, 'class', 'flex gap-4'),
          h(d, 'class', 'w-5'),
          h(
            i,
            'class',
            'flex w-full gap-4 items-center rounded-lg p-4 justify-between'
          ),
          h(e, 'class', 'flex flex-col gap-4 mx-2 mb-1 overflow-hidden');
      },
      m(y, w) {
        B(y, e, w),
          b(e, t),
          b(e, r),
          b(e, i),
          b(i, s),
          b(s, l),
          F(o, l, null),
          b(s, a),
          b(s, c),
          pe(c, n[0]),
          b(i, u),
          b(i, d),
          F(f, d, null),
          (p = !0),
          m ||
            ((k = [
              te(c, 'input', n[9]),
              te(c, 'keydown', n[10]),
              te(d, 'click', n[6]),
            ]),
            (m = !0));
      },
      p(y, w) {
        const M = {};
        w & 16 && (M.patp = y[4] || '~zod'),
          o.$set(M),
          w & 1 && c.value !== y[0] && pe(c, y[0]);
      },
      i(y) {
        p || (g(o.$$.fragment, y), g(f.$$.fragment, y), (p = !0));
      },
      o(y) {
        G(o.$$.fragment, y), G(f.$$.fragment, y), (p = !1);
      },
      d(y) {
        y && v(e), x(o), x(f), (m = !1), ge(k);
      },
    }
  );
}
function Hi(n) {
  let e, t;
  return (
    (e = new Ze({
      props: { $$slots: { default: [Bm] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 1048608 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function ji(n) {
  let e,
    t,
    r = n[15] + '',
    i,
    s,
    l,
    o,
    a,
    c = n[17] + '',
    u,
    d,
    f,
    p,
    m,
    k,
    y,
    w = n[16] + '',
    M,
    C,
    S,
    H,
    O;
  m = new Fl({});
  function Z() {
    return n[11](n[17]);
  }
  return {
    c() {
      (e = _('button')),
        (t = _('div')),
        (i = E(r)),
        (s = $()),
        (l = _('div')),
        (o = _('div')),
        (a = E('by ')),
        (u = E(c)),
        (d = $()),
        (f = _('div')),
        (p = _('div')),
        L(m.$$.fragment),
        (k = $()),
        (y = _('div')),
        (M = E(w)),
        (C = $()),
        h(p, 'class', 'w-4'),
        h(f, 'class', 'flex items-center gap-1'),
        h(l, 'class', 'flex items-center w-full justify-between gap-2 text-xs'),
        h(
          e,
          'class',
          'flex flex-col gap-2 rounded-md p-2 hover:bg-hover hover:duration-500 text-left'
        );
    },
    m(V, A) {
      B(V, e, A),
        b(e, t),
        b(t, i),
        b(e, s),
        b(e, l),
        b(l, o),
        b(o, a),
        b(o, u),
        b(l, d),
        b(l, f),
        b(f, p),
        F(m, p, null),
        b(f, k),
        b(f, y),
        b(y, M),
        b(e, C),
        (S = !0),
        H || ((O = te(e, 'click', Z)), (H = !0));
    },
    p(V, A) {
      (n = V),
        (!S || A & 32) && r !== (r = n[15] + '') && ae(i, r),
        (!S || A & 32) && c !== (c = n[17] + '') && ae(u, c),
        (!S || A & 32) && w !== (w = n[16] + '') && ae(M, w);
    },
    i(V) {
      S || (g(m.$$.fragment, V), (S = !0));
    },
    o(V) {
      G(m.$$.fragment, V), (S = !1);
    },
    d(V) {
      V && v(e), x(m), (H = !1), O();
    },
  };
}
function Bm(n) {
  let e,
    t,
    r,
    i,
    s = n[7](n[5].radioStations),
    l = [];
  for (let a = 0; a < s.length; a += 1) l[a] = ji(Zi(n, s, a));
  const o = (a) =>
    G(l[a], 1, 1, () => {
      l[a] = null;
    });
  return {
    c() {
      (e = _('div')),
        (e.textContent = 'Jump into %radio 📻'),
        (t = $()),
        (r = _('div'));
      for (let a = 0; a < l.length; a += 1) l[a].c();
      h(e, 'class', 'text-xl font-bold mx-2'),
        h(r, 'class', 'flex flex-col gap-4');
    },
    m(a, c) {
      B(a, e, c), B(a, t, c), B(a, r, c);
      for (let u = 0; u < l.length; u += 1) l[u] && l[u].m(r, null);
      i = !0;
    },
    p(a, c) {
      if (c & 416) {
        s = a[7](a[5].radioStations);
        let u;
        for (u = 0; u < s.length; u += 1) {
          const d = Zi(a, s, u);
          l[u]
            ? (l[u].p(d, c), g(l[u], 1))
            : ((l[u] = ji(d)), l[u].c(), g(l[u], 1), l[u].m(r, null));
        }
        for (P(), u = s.length; u < l.length; u += 1) o(u);
        N();
      }
    },
    i(a) {
      if (!i) {
        for (let c = 0; c < s.length; c += 1) g(l[c]);
        i = !0;
      }
    },
    o(a) {
      l = l.filter(Boolean);
      for (let c = 0; c < l.length; c += 1) G(l[c]);
      i = !1;
    },
    d(a) {
      a && v(e), a && v(t), a && v(r), _e(l, a);
    },
  };
}
function ym(n) {
  let e;
  return {
    c() {
      e = E('Loading...');
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    i: j,
    o: j,
    d(t) {
      t && v(e);
    },
  };
}
function wm(n) {
  let e,
    t,
    r,
    i,
    s = [],
    l = new Map(),
    o,
    a = n[1];
  const c = (u) => u[12];
  for (let u = 0; u < a.length; u += 1) {
    let d = Li(n, a, u),
      f = c(d);
    l.set(f, (s[u] = Oi(f, d)));
  }
  return {
    c() {
      (e = _('div')),
        (t = _('div')),
        (t.textContent = 'Your pals'),
        (r = $()),
        (i = _('div'));
      for (let u = 0; u < s.length; u += 1) s[u].c();
      h(t, 'class', 'text-xl font-bold'),
        h(i, 'class', 'flex flex-col gap-2'),
        h(e, 'class', 'flex flex-col gap-4 px-2');
    },
    m(u, d) {
      B(u, e, d), b(e, t), b(e, r), b(e, i);
      for (let f = 0; f < s.length; f += 1) s[f] && s[f].m(i, null);
      o = !0;
    },
    p(u, d) {
      d & 6 &&
        ((a = u[1]),
        P(),
        (s = Kt(s, d, c, 1, u, a, l, i, Yt, Oi, null, Li)),
        N());
    },
    i(u) {
      if (!o) {
        for (let d = 0; d < a.length; d += 1) g(s[d]);
        o = !0;
      }
    },
    o(u) {
      for (let d = 0; d < s.length; d += 1) G(s[d]);
      o = !1;
    },
    d(u) {
      u && v(e);
      for (let d = 0; d < s.length; d += 1) s[d].d();
    },
  };
}
function Cm(n) {
  let e, t, r, i, s;
  return (
    (i = new Fe({
      props: {
        small: !0,
        key: { struc: 'app', ship: '~paldev', cord: 'pals', time: '' },
      },
    })),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          (t.textContent = 'Portal is better with %pals'),
          (r = $()),
          L(i.$$.fragment),
          h(t, 'class', 'text-xl font-bold pb-4 px-2');
      },
      m(l, o) {
        B(l, e, o), b(e, t), b(e, r), F(i, e, null), (s = !0);
      },
      p: j,
      i(l) {
        s || (g(i.$$.fragment, l), (s = !0));
      },
      o(l) {
        G(i.$$.fragment, l), (s = !1);
      },
      d(l) {
        l && v(e), x(i);
      },
    }
  );
}
function Oi(n, e) {
  let t, r, i;
  return (
    (r = new e0({ props: { pal: `~${e[12]}`, score: e[2][`~${e[12]}`] } })),
    {
      key: n,
      first: null,
      c() {
        (t = se()), L(r.$$.fragment), (this.first = t);
      },
      m(s, l) {
        B(s, t, l), F(r, s, l), (i = !0);
      },
      p(s, l) {
        e = s;
        const o = {};
        l & 2 && (o.pal = `~${e[12]}`),
          l & 6 && (o.score = e[2][`~${e[12]}`]),
          r.$set(o);
      },
      i(s) {
        i || (g(r.$$.fragment, s), (i = !0));
      },
      o(s) {
        G(r.$$.fragment, s), (i = !1);
      },
      d(s) {
        s && v(t), x(r, s);
      },
    }
  );
}
function $m(n) {
  let e, t, r, i;
  const s = [Cm, wm, ym],
    l = [];
  function o(a, c) {
    return a[5].palsLoaded && !a[5].pals ? 0 : a[1] && a[1].length > 0 ? 1 : 2;
  }
  return (
    (e = o(n)),
    (t = l[e] = s[e](n)),
    {
      c() {
        t.c(), (r = se());
      },
      m(a, c) {
        l[e].m(a, c), B(a, r, c), (i = !0);
      },
      p(a, c) {
        let u = e;
        (e = o(a)),
          e === u
            ? l[e].p(a, c)
            : (P(),
              G(l[u], 1, 1, () => {
                l[u] = null;
              }),
              N(),
              (t = l[e]),
              t ? t.p(a, c) : ((t = l[e] = s[e](a)), t.c()),
              g(t, 1),
              t.m(r.parentNode, r));
      },
      i(a) {
        i || (g(t), (i = !0));
      },
      o(a) {
        G(t), (i = !1);
      },
      d(a) {
        l[e].d(a), a && v(r);
      },
    }
  );
}
function Mm(n) {
  let e, t, r, i, s;
  e = new Ze({ props: { $$slots: { default: [vm] }, $$scope: { ctx: n } } });
  let l = n[5].radioStations && Hi(n);
  return (
    (i = new Ze({
      props: { $$slots: { default: [$m] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        L(e.$$.fragment), (t = $()), l && l.c(), (r = $()), L(i.$$.fragment);
      },
      m(o, a) {
        F(e, o, a),
          B(o, t, a),
          l && l.m(o, a),
          B(o, r, a),
          F(i, o, a),
          (s = !0);
      },
      p(o, a) {
        const c = {};
        a & 1048593 && (c.$$scope = { dirty: a, ctx: o }),
          e.$set(c),
          o[5].radioStations
            ? l
              ? (l.p(o, a), a & 32 && g(l, 1))
              : ((l = Hi(o)), l.c(), g(l, 1), l.m(r.parentNode, r))
            : l &&
              (P(),
              G(l, 1, 1, () => {
                l = null;
              }),
              N());
        const u = {};
        a & 1048614 && (u.$$scope = { dirty: a, ctx: o }), i.$set(u);
      },
      i(o) {
        s || (g(e.$$.fragment, o), g(l), g(i.$$.fragment, o), (s = !0));
      },
      o(o) {
        G(e.$$.fragment, o), G(l), G(i.$$.fragment, o), (s = !1);
      },
      d(o) {
        x(e, o), o && v(t), l && l.d(o), o && v(r), x(i, o);
      },
    }
  );
}
function Fm(n) {
  let e, t, r, i, s, l, o, a;
  return (
    (r = new nr({})),
    (s = new Zl({ props: { feed: n[3] } })),
    (o = new De({
      props: { $$slots: { default: [Mm] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          L(r.$$.fragment),
          (i = $()),
          L(s.$$.fragment),
          (l = $()),
          L(o.$$.fragment),
          h(t, 'class', 'flex flex-col gap-4 col-span-12 md:col-span-6'),
          h(e, 'class', 'grid grid-cols-9 gap-8 mb-4');
      },
      m(c, u) {
        B(c, e, u),
          b(e, t),
          F(r, t, null),
          b(t, i),
          F(s, t, null),
          b(e, l),
          F(o, e, null),
          (a = !0);
      },
      p(c, [u]) {
        const d = {};
        u & 8 && (d.feed = c[3]), s.$set(d);
        const f = {};
        u & 1048631 && (f.$$scope = { dirty: u, ctx: c }), o.$set(f);
      },
      i(c) {
        a ||
          (g(r.$$.fragment, c),
          g(s.$$.fragment, c),
          g(o.$$.fragment, c),
          (a = !0));
      },
      o(c) {
        G(r.$$.fragment, c), G(s.$$.fragment, c), G(o.$$.fragment, c), (a = !1);
      },
      d(c) {
        c && v(e), x(r), x(s), x(o);
      },
    }
  );
}
function xm(n, e, t) {
  let r;
  ze(n, ne, (k) => t(5, (r = k)));
  let i = [],
    s = {},
    l;
  ne.subscribe((k) => {
    let { pals: y } = k;
    if (!k.isLoaded) return;
    if (k.isLoaded && !dn())
      return Me({ struc: 'feed', ship: jr.indexer, cord: '', time: 'global' });
    let w = dn().concat(yl(Ge));
    t(
      3,
      (l = w
        .filter((M) => !!M)
        .filter((M, C) => w.findIndex((S) => S.time === M.time) === C)
        .sort((M, C) => Ee(C.time) - Ee(M.time)))
    ),
      y &&
        (t(2, (s = {})),
        Object.keys(k).forEach((M) => {
          let C = we(M);
          if (C.struc === 'other') {
            if (!s[C.ship]) return t(2, (s[C.ship] = 1), s);
            t(2, s[C.ship]++, s);
          }
        }),
        t(
          1,
          (i = Object.keys(y).sort(
            (M, C) => (s[`~${C}`] || 0) - (s[`~${M}`] || 0)
          ))
        ));
  });
  let o,
    a = o;
  const c = () => {
      a && Xe(`/${a}`);
    },
    u = (k) =>
      k
        .sort((y, w) => w.time - y.time)
        .filter((y) => y.viewers > 0)
        .filter((y) => !!y.description)
        .slice(0, 4),
    d = (k) => {
      window.open(
        `${window.location.origin}/apps/radio?station=${encodeURIComponent(k)}`
      );
    };
  function f() {
    (o = this.value), t(0, o);
  }
  const p = (k) => (k.key === 'Enter' ? c() : null),
    m = (k) => d(k);
  return (
    (n.$$.update = () => {
      n.$$.dirty & 1 && Pt(o) && t(4, (a = Pt(o)));
    }),
    [o, i, s, l, a, r, c, u, d, f, p, m]
  );
}
class Si extends Q {
  constructor(e) {
    super(), X(this, e, xm, Fm, K, {});
  }
}
function Lm(n) {
  let e;
  return {
    c() {
      e = E('Loading...');
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    i: j,
    o: j,
    d(t) {
      t && v(e);
    },
  };
}
function Zm(n) {
  let e, t, r, i, s;
  return (
    (t = new Nr({ props: { item: n[0] } })),
    (i = new nr({})),
    i.$on('post', n[3]),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          (r = $()),
          L(i.$$.fragment),
          h(e, 'class', 'grid gap-y-5 mb-4');
      },
      m(l, o) {
        B(l, e, o), F(t, e, null), b(e, r), F(i, e, null), (s = !0);
      },
      p(l, o) {
        const a = {};
        o & 1 && (a.item = l[0]), t.$set(a);
      },
      i(l) {
        s || (g(t.$$.fragment, l), g(i.$$.fragment, l), (s = !0));
      },
      o(l) {
        G(t.$$.fragment, l), G(i.$$.fragment, l), (s = !1);
      },
      d(l) {
        l && v(e), x(t), x(i);
      },
    }
  );
}
function Hm(n) {
  let e, t, r, i;
  const s = [Zm, Lm],
    l = [];
  function o(a, c) {
    return a[0] ? 0 : 1;
  }
  return (
    (e = o(n)),
    (t = l[e] = s[e](n)),
    {
      c() {
        t.c(), (r = se());
      },
      m(a, c) {
        l[e].m(a, c), B(a, r, c), (i = !0);
      },
      p(a, [c]) {
        let u = e;
        (e = o(a)),
          e === u
            ? l[e].p(a, c)
            : (P(),
              G(l[u], 1, 1, () => {
                l[u] = null;
              }),
              N(),
              (t = l[e]),
              t ? t.p(a, c) : ((t = l[e] = s[e](a)), t.c()),
              g(t, 1),
              t.m(r.parentNode, r));
      },
      i(a) {
        i || (g(t), (i = !0));
      },
      o(a) {
        G(t), (i = !1);
      },
      d(a) {
        l[e].d(a), a && v(r);
      },
    }
  );
}
function jm(n, e, t) {
  let { params: r } = e;
  const { itemkey: i } = r;
  let s;
  ne.subscribe(() => {
    t(0, (s = ye(i)));
  });
  const l = (a) => {
      console.log({ detail: a });
    },
    o = ({ detail: a }) => l(a);
  return (
    (n.$$set = (a) => {
      'params' in a && t(2, (r = a.params));
    }),
    [s, l, r, o]
  );
}
class Om extends Q {
  constructor(e) {
    super(), X(this, e, jm, Hm, K, { params: 2 });
  }
}
function Vi(n, e, t) {
  const r = n.slice();
  r[18] = e[t];
  const i = r[1].zones[r[18]];
  return (r[19] = i.idx), (r[17] = i.meta.title), r;
}
function qi(n, e, t) {
  const r = n.slice();
  r[22] = e[t];
  const i = r[22].split('/')[0];
  r[23] = i;
  const s = r[1].channels[r[22]];
  return (r[17] = s.meta.title), (r[16] = s.meta.description), r;
}
function Sm(n) {
  const e = n.slice(),
    t = $e(e[0]);
  return (
    (e[14] = t.cover),
    (e[15] = t.image),
    (e[16] = t.description),
    (e[17] = t.title),
    e
  );
}
function Vm(n) {
  let e;
  return {
    c() {
      e = E('Loading...');
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    i: j,
    o: j,
    d(t) {
      t && v(e);
    },
  };
}
function qm(n) {
  let e, t, r, i, s, l, o, a;
  (t = new xt({
    props: {
      cover: n[14],
      avatar: n[15],
      title: n[17],
      description: n[16],
      type: 'group',
      $$slots: { default: [Im] },
      $$scope: { ctx: n },
    },
  })),
    (i = new De({
      props: { $$slots: { default: [Xm] }, $$scope: { ctx: n } },
    }));
  function c(d) {
    n[10](d);
  }
  let u = { key: n[0].keyObj };
  return (
    n[2] !== void 0 && (u.open = n[2]),
    (l = new rr({ props: u })),
    ce.push(() => he(l, 'open', c)),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          (r = $()),
          L(i.$$.fragment),
          (s = $()),
          L(l.$$.fragment),
          h(e, 'class', 'grid grid-cols-12 gap-x-8 mb-4');
      },
      m(d, f) {
        B(d, e, f),
          F(t, e, null),
          b(e, r),
          F(i, e, null),
          B(d, s, f),
          F(l, d, f),
          (a = !0);
      },
      p(d, f) {
        const p = {};
        f & 1 && (p.cover = d[14]),
          f & 1 && (p.avatar = d[15]),
          f & 1 && (p.title = d[17]),
          f & 1 && (p.description = d[16]),
          f & 67108867 && (p.$$scope = { dirty: f, ctx: d }),
          t.$set(p);
        const m = {};
        f & 67108870 && (m.$$scope = { dirty: f, ctx: d }), i.$set(m);
        const k = {};
        f & 1 && (k.key = d[0].keyObj),
          !o && f & 4 && ((o = !0), (k.open = d[2]), fe(() => (o = !1))),
          l.$set(k);
      },
      i(d) {
        a ||
          (g(t.$$.fragment, d),
          g(i.$$.fragment, d),
          g(l.$$.fragment, d),
          (a = !0));
      },
      o(d) {
        G(t.$$.fragment, d), G(i.$$.fragment, d), G(l.$$.fragment, d), (a = !1);
      },
      d(d) {
        d && v(e), x(t), x(i), d && v(s), x(l, d);
      },
    }
  );
}
function Em(n) {
  let e,
    t,
    r,
    i = n[17] + '',
    s,
    l,
    o,
    a,
    c = n[1]['zone-ord'],
    u = [];
  for (let f = 0; f < c.length; f += 1) u[f] = Pi(Vi(n, c, f));
  const d = (f) =>
    G(u[f], 1, 1, () => {
      u[f] = null;
    });
  return {
    c() {
      (e = _('div')),
        (t = _('div')),
        (r = E('Channels in ')),
        (s = E(i)),
        (l = $()),
        (o = _('div'));
      for (let f = 0; f < u.length; f += 1) u[f].c();
      h(t, 'class', 'text-2xl font-bold border-b pb-2'),
        h(o, 'class', 'grid gap-8'),
        h(e, 'class', 'grid gap-4');
    },
    m(f, p) {
      B(f, e, p), b(e, t), b(t, r), b(t, s), b(e, l), b(e, o);
      for (let m = 0; m < u.length; m += 1) u[m] && u[m].m(o, null);
      a = !0;
    },
    p(f, p) {
      if (((!a || p & 1) && i !== (i = f[17] + '') && ae(s, i), p & 34)) {
        c = f[1]['zone-ord'];
        let m;
        for (m = 0; m < c.length; m += 1) {
          const k = Vi(f, c, m);
          u[m]
            ? (u[m].p(k, p), g(u[m], 1))
            : ((u[m] = Pi(k)), u[m].c(), g(u[m], 1), u[m].m(o, null));
        }
        for (P(), m = c.length; m < u.length; m += 1) d(m);
        N();
      }
    },
    i(f) {
      if (!a) {
        for (let p = 0; p < c.length; p += 1) g(u[p]);
        a = !0;
      }
    },
    o(f) {
      u = u.filter(Boolean);
      for (let p = 0; p < u.length; p += 1) G(u[p]);
      a = !1;
    },
    d(f) {
      f && v(e), _e(u, f);
    },
  };
}
function Am(n) {
  let e;
  return {
    c() {
      (e = _('div')),
        (e.textContent = 'Join the group to see more information');
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    i: j,
    o: j,
    d(t) {
      t && v(e);
    },
  };
}
function Ei(n) {
  let e = Object.keys(n[1].zones).length > 1,
    t,
    r,
    i,
    s = e && Ai(n),
    l = n[19],
    o = [];
  for (let c = 0; c < l.length; c += 1) o[c] = Ti(qi(n, l, c));
  const a = (c) =>
    G(o[c], 1, 1, () => {
      o[c] = null;
    });
  return {
    c() {
      s && s.c(), (t = $());
      for (let c = 0; c < o.length; c += 1) o[c].c();
      r = se();
    },
    m(c, u) {
      s && s.m(c, u), B(c, t, u);
      for (let d = 0; d < o.length; d += 1) o[d] && o[d].m(c, u);
      B(c, r, u), (i = !0);
    },
    p(c, u) {
      if (
        (u & 2 && (e = Object.keys(c[1].zones).length > 1),
        e
          ? s
            ? s.p(c, u)
            : ((s = Ai(c)), s.c(), s.m(t.parentNode, t))
          : s && (s.d(1), (s = null)),
        u & 34)
      ) {
        l = c[19];
        let d;
        for (d = 0; d < l.length; d += 1) {
          const f = qi(c, l, d);
          o[d]
            ? (o[d].p(f, u), g(o[d], 1))
            : ((o[d] = Ti(f)), o[d].c(), g(o[d], 1), o[d].m(r.parentNode, r));
        }
        for (P(), d = l.length; d < o.length; d += 1) a(d);
        N();
      }
    },
    i(c) {
      if (!i) {
        for (let u = 0; u < l.length; u += 1) g(o[u]);
        i = !0;
      }
    },
    o(c) {
      o = o.filter(Boolean);
      for (let u = 0; u < o.length; u += 1) G(o[u]);
      i = !1;
    },
    d(c) {
      s && s.d(c), c && v(t), _e(o, c), c && v(r);
    },
  };
}
function Ai(n) {
  let e,
    t = n[17] + '',
    r;
  return {
    c() {
      (e = _('div')), (r = E(t)), h(e, 'class', 'text-xl font-bold');
    },
    m(i, s) {
      B(i, e, s), b(e, r);
    },
    p(i, s) {
      s & 2 && t !== (t = i[17] + '') && ae(r, t);
    },
    d(i) {
      i && v(e);
    },
  };
}
function Tm(n) {
  let e, t;
  return (
    (e = new xo({})),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function Pm(n) {
  let e, t;
  return (
    (e = new Mo({})),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function Nm(n) {
  let e, t;
  return (
    (e = new Ar({})),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function Ti(n) {
  let e,
    t,
    r,
    i,
    s,
    l,
    o,
    a,
    c = n[17] + '',
    u,
    d,
    f,
    p = n[16] + '',
    m,
    k,
    y,
    w;
  const M = [Nm, Pm, Tm],
    C = [];
  function S(H, O) {
    return H[23] === 'chat'
      ? 0
      : H[23] === 'diary'
      ? 1
      : H[23] === 'heap'
      ? 2
      : -1;
  }
  return (
    ~(i = S(n)) && (s = C[i] = M[i](n)),
    {
      c() {
        (e = _('div')),
          (t = _('a')),
          (r = _('div')),
          s && s.c(),
          (l = $()),
          (o = _('div')),
          (a = _('div')),
          (u = E(c)),
          (d = $()),
          (f = _('div')),
          (m = E(p)),
          (y = $()),
          h(r, 'class', 'col-span-1'),
          h(f, 'class', 'text-sm'),
          h(o, 'class', 'col-span-11'),
          h(t, 'href', (k = n[5](n[22]))),
          h(t, 'target', '_blank'),
          h(t, 'class', 'grid grid-cols-12 gap-4 items-center'),
          h(e, 'class', 'rounded-lg p-2 hover:bg-hover hover:duration-500');
      },
      m(H, O) {
        B(H, e, O),
          b(e, t),
          b(t, r),
          ~i && C[i].m(r, null),
          b(t, l),
          b(t, o),
          b(o, a),
          b(a, u),
          b(o, d),
          b(o, f),
          b(f, m),
          b(e, y),
          (w = !0);
      },
      p(H, O) {
        let Z = i;
        (i = S(H)),
          i !== Z &&
            (s &&
              (P(),
              G(C[Z], 1, 1, () => {
                C[Z] = null;
              }),
              N()),
            ~i
              ? ((s = C[i]),
                s || ((s = C[i] = M[i](H)), s.c()),
                g(s, 1),
                s.m(r, null))
              : (s = null)),
          (!w || O & 2) && c !== (c = H[17] + '') && ae(u, c),
          (!w || O & 2) && p !== (p = H[16] + '') && ae(m, p),
          (!w || (O & 2 && k !== (k = H[5](H[22])))) && h(t, 'href', k);
      },
      i(H) {
        w || (g(s), (w = !0));
      },
      o(H) {
        G(s), (w = !1);
      },
      d(H) {
        H && v(e), ~i && C[i].d();
      },
    }
  );
}
function Pi(n) {
  let e,
    t,
    r,
    i = n[19].length > 0 && Ei(n);
  return {
    c() {
      (e = _('div')), i && i.c(), (t = $()), h(e, 'class', 'grid gap-2');
    },
    m(s, l) {
      B(s, e, l), i && i.m(e, null), b(e, t), (r = !0);
    },
    p(s, l) {
      s[19].length > 0
        ? i
          ? (i.p(s, l), l & 2 && g(i, 1))
          : ((i = Ei(s)), i.c(), g(i, 1), i.m(e, t))
        : i &&
          (P(),
          G(i, 1, 1, () => {
            i = null;
          }),
          N());
    },
    i(s) {
      r || (g(i), (r = !0));
    },
    o(s) {
      G(i), (r = !1);
    },
    d(s) {
      s && v(e), i && i.d();
    },
  };
}
function Im(n) {
  let e, t, r, i;
  const s = [Am, Em],
    l = [];
  function o(a, c) {
    return a[1] ? (a[1].joining ? -1 : 1) : 0;
  }
  return (
    ~(t = o(n)) && (r = l[t] = s[t](n)),
    {
      c() {
        (e = _('div')),
          r && r.c(),
          h(e, 'class', 'col-span-12 md:col-span-9 bg-panels p-6 rounded-lg');
      },
      m(a, c) {
        B(a, e, c), ~t && l[t].m(e, null), (i = !0);
      },
      p(a, c) {
        let u = t;
        (t = o(a)),
          t === u
            ? ~t && l[t].p(a, c)
            : (r &&
                (P(),
                G(l[u], 1, 1, () => {
                  l[u] = null;
                }),
                N()),
              ~t
                ? ((r = l[t]),
                  r ? r.p(a, c) : ((r = l[t] = s[t](a)), r.c()),
                  g(r, 1),
                  r.m(e, null))
                : (r = null));
      },
      i(a) {
        i || (g(r), (i = !0));
      },
      o(a) {
        G(r), (i = !1);
      },
      d(a) {
        a && v(e), ~t && l[t].d();
      },
    }
  );
}
function zm(n) {
  let e,
    t,
    r,
    i,
    s,
    l,
    o,
    a = Object.keys(n[1].fleet).length + '',
    c,
    u,
    d,
    f;
  return (
    (l = new Fl({})),
    (d = new le({
      props: {
        icon: Ft,
        async: !0,
        $$slots: { default: [Um] },
        $$scope: { ctx: n },
      },
    })),
    d.$on('click', n[4]),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          (t.textContent = 'Members'),
          (r = $()),
          (i = _('div')),
          (s = _('div')),
          L(l.$$.fragment),
          (o = $()),
          (c = E(a)),
          (u = $()),
          L(d.$$.fragment),
          h(t, 'class', 'font-bold'),
          h(s, 'class', 'w-5 h-5'),
          h(i, 'class', 'flex items-center gap-2'),
          h(e, 'class', 'flex flex-col gap-1');
      },
      m(p, m) {
        B(p, e, m),
          b(e, t),
          b(e, r),
          b(e, i),
          b(i, s),
          F(l, s, null),
          b(i, o),
          b(i, c),
          B(p, u, m),
          F(d, p, m),
          (f = !0);
      },
      p(p, m) {
        (!f || m & 2) &&
          a !== (a = Object.keys(p[1].fleet).length + '') &&
          ae(c, a);
        const k = {};
        m & 67108864 && (k.$$scope = { dirty: m, ctx: p }), d.$set(k);
      },
      i(p) {
        f || (g(l.$$.fragment, p), g(d.$$.fragment, p), (f = !0));
      },
      o(p) {
        G(l.$$.fragment, p), G(d.$$.fragment, p), (f = !1);
      },
      d(p) {
        p && v(e), x(l), p && v(u), x(d, p);
      },
    }
  );
}
function Rm(n) {
  let e, t;
  return (
    (e = new le({
      props: {
        loading: !0,
        async: !0,
        $$slots: { default: [Wm] },
        $$scope: { ctx: n },
      },
    })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 67108864 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function Dm(n) {
  let e, t;
  return (
    (e = new le({
      props: {
        icon: Mt,
        async: !0,
        $$slots: { default: [Jm] },
        $$scope: { ctx: n },
      },
    })),
    e.$on('click', n[3]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 67108864 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function Um(n) {
  let e;
  return {
    c() {
      e = E('Leave');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function Wm(n) {
  let e;
  return {
    c() {
      e = E('Joining...');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function Jm(n) {
  let e;
  return {
    c() {
      e = E('Join Group');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function Ym(n) {
  let e;
  return {
    c() {
      e = E('Recommend');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function Km(n) {
  let e, t, r, i, s;
  const l = [Dm, Rm, zm],
    o = [];
  function a(c, u) {
    return c[1] ? (c[1].joining ? 1 : 2) : 0;
  }
  return (
    (e = a(n)),
    (t = o[e] = l[e](n)),
    (i = new le({
      props: { icon: Er, $$slots: { default: [Ym] }, $$scope: { ctx: n } },
    })),
    i.$on('click', n[9]),
    {
      c() {
        t.c(), (r = $()), L(i.$$.fragment);
      },
      m(c, u) {
        o[e].m(c, u), B(c, r, u), F(i, c, u), (s = !0);
      },
      p(c, u) {
        let d = e;
        (e = a(c)),
          e === d
            ? o[e].p(c, u)
            : (P(),
              G(o[d], 1, 1, () => {
                o[d] = null;
              }),
              N(),
              (t = o[e]),
              t ? t.p(c, u) : ((t = o[e] = l[e](c)), t.c()),
              g(t, 1),
              t.m(r.parentNode, r));
        const f = {};
        u & 67108864 && (f.$$scope = { dirty: u, ctx: c }), i.$set(f);
      },
      i(c) {
        s || (g(t), g(i.$$.fragment, c), (s = !0));
      },
      o(c) {
        G(t), G(i.$$.fragment, c), (s = !1);
      },
      d(c) {
        o[e].d(c), c && v(r), x(i, c);
      },
    }
  );
}
function Xm(n) {
  let e, t;
  return (
    (e = new Ze({
      props: { $$slots: { default: [Km] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 67108870 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function Qm(n) {
  let e, t, r, i;
  const s = [qm, Vm],
    l = [];
  function o(c, u) {
    return c[0] ? 0 : 1;
  }
  function a(c, u) {
    return u === 0 ? Sm(c) : c;
  }
  return (
    (e = o(n)),
    (t = l[e] = s[e](a(n, e))),
    {
      c() {
        t.c(), (r = se());
      },
      m(c, u) {
        l[e].m(c, u), B(c, r, u), (i = !0);
      },
      p(c, [u]) {
        let d = e;
        (e = o(c)),
          e === d
            ? l[e].p(a(c, e), u)
            : (P(),
              G(l[d], 1, 1, () => {
                l[d] = null;
              }),
              N(),
              (t = l[e]),
              t ? t.p(a(c, e), u) : ((t = l[e] = s[e](a(c, e))), t.c()),
              g(t, 1),
              t.m(r.parentNode, r));
      },
      i(c) {
        i || (g(t), (i = !0));
      },
      o(c) {
        G(t), (i = !1);
      },
      d(c) {
        l[e].d(c), c && v(r);
      },
    }
  );
}
function ep(n, e, t) {
  let r;
  ze(n, ne, (w) => t(12, (r = w)));
  let { params: i } = e;
  const s = () => {
    if (a) {
      if ((t(0, (c = Ma(a))), r.isLoaded && !c)) return Me(we(`/group/${a}/`));
      t(1, (u = Fa(a)));
    }
  };
  let l, o, a, c, u;
  ne.subscribe((w) => {
    w.isLoaded && s();
  });
  const d = () => Rs(a).then(Nt),
    f = () => Ds(a).then(Nt),
    p = (w) =>
      `${window.location.origin}/apps/groups/groups/${a}/channels/${w}`;
  let m;
  const k = () => t(2, (m = !0));
  function y(w) {
    (m = w), t(2, m);
  }
  return (
    (n.$$set = (w) => {
      'params' in w && t(6, (i = w.params));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 448 &&
        (t(7, ({ host: l, cord: o } = i), l, (t(8, o), t(6, i), t(7, l))),
        (a = `${l}/${o}`),
        s());
    }),
    [c, u, m, d, f, p, i, l, o, k, y]
  );
}
class tp extends Q {
  constructor(e) {
    super(), X(this, e, ep, Qm, K, { params: 6 });
  }
}
function Ni(n) {
  let e, t, r, i, s, l, o, a;
  (t = new xt({
    props: {
      title: n[3],
      description: n[4],
      patp: n[5],
      color: n[7],
      avatar: n[2],
      type: 'app',
      $$slots: { default: [rp] },
      $$scope: { ctx: n },
    },
  })),
    (i = new De({
      props: { $$slots: { default: [hp] }, $$scope: { ctx: n } },
    }));
  function c(d) {
    n[21](d);
  }
  let u = { key: we(n[0]) };
  return (
    n[13] !== void 0 && (u.open = n[13]),
    (l = new rr({ props: u })),
    ce.push(() => he(l, 'open', c)),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          (r = $()),
          L(i.$$.fragment),
          (s = $()),
          L(l.$$.fragment),
          h(e, 'class', 'grid grid-cols-12 gap-x-8 mb-4');
      },
      m(d, f) {
        B(d, e, f),
          F(t, e, null),
          b(e, r),
          F(i, e, null),
          B(d, s, f),
          F(l, d, f),
          (a = !0);
      },
      p(d, f) {
        const p = {};
        f & 8 && (p.title = d[3]),
          f & 16 && (p.description = d[4]),
          f & 32 && (p.patp = d[5]),
          f & 128 && (p.color = d[7]),
          f & 4 && (p.avatar = d[2]),
          f & 16777992 && (p.$$scope = { dirty: f, ctx: d }),
          t.$set(p);
        const m = {};
        f & 16792640 && (m.$$scope = { dirty: f, ctx: d }), i.$set(m);
        const k = {};
        f & 1 && (k.key = we(d[0])),
          !o && f & 8192 && ((o = !0), (k.open = d[13]), fe(() => (o = !1))),
          l.$set(k);
      },
      i(d) {
        a ||
          (g(t.$$.fragment, d),
          g(i.$$.fragment, d),
          g(l.$$.fragment, d),
          (a = !0));
      },
      o(d) {
        G(t.$$.fragment, d), G(i.$$.fragment, d), G(l.$$.fragment, d), (a = !1);
      },
      d(d) {
        d && v(e), x(t), x(i), d && v(s), x(l, d);
      },
    }
  );
}
function rp(n) {
  let e, t, r, i, s, l, o, a, c, u, d, f, p, m, k, y, w, M, C, S;
  return {
    c() {
      (e = _('div')),
        (t = _('div')),
        (r = _('div')),
        (i = E('Current ')),
        (s = E(n[3])),
        (l = E(' version')),
        (o = $()),
        (a = _('div')),
        (c = E(n[8])),
        (u = $()),
        (d = _('div')),
        (f = _('div')),
        (p = E('Current ')),
        (m = E(n[3])),
        (k = E(' hash')),
        (y = $()),
        (w = _('pre')),
        (M = E('            ')),
        (C = E(n[9])),
        (S = E(`
          `)),
        h(r, 'class', 'text-2xl font-bold'),
        h(a, 'class', 'text-lg'),
        h(f, 'class', 'text-2xl font-bold'),
        h(w, 'class', 'flex justify-start text-lg'),
        h(e, 'class', 'grid gap-8 bg-panels p-6 rounded-lg');
    },
    m(H, O) {
      B(H, e, O),
        b(e, t),
        b(t, r),
        b(r, i),
        b(r, s),
        b(r, l),
        b(t, o),
        b(t, a),
        b(a, c),
        b(e, u),
        b(e, d),
        b(d, f),
        b(f, p),
        b(f, m),
        b(f, k),
        b(d, y),
        b(d, w),
        b(w, M),
        b(w, C),
        b(w, S);
    },
    p(H, O) {
      O & 8 && ae(s, H[3]),
        O & 256 && ae(c, H[8]),
        O & 8 && ae(m, H[3]),
        O & 512 && ae(C, H[9]);
    },
    d(H) {
      H && v(e);
    },
  };
}
function np(n) {
  let e, t;
  return (
    (e = new le({
      props: {
        icon: Wo,
        async: !0,
        $$slots: { default: [sp] },
        $$scope: { ctx: n },
      },
    })),
    e.$on('click', n[15]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 16777216 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function ip(n) {
  let e, t;
  return (
    (e = new le({
      props: { loading: !0, $$slots: { default: [ap] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 16777216 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function lp(n) {
  let e, t;
  return (
    (e = new le({
      props: { icon: jo, $$slots: { default: [op] }, $$scope: { ctx: n } },
    })),
    e.$on('click', n[18]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 16777216 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function sp(n) {
  let e;
  return {
    c() {
      e = E('Install');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function ap(n) {
  let e;
  return {
    c() {
      e = E('Installing...');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function op(n) {
  let e;
  return {
    c() {
      e = E('Open');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function Ii(n) {
  let e, t;
  return (
    (e = new le({
      props: { icon: zo, $$slots: { default: [cp] }, $$scope: { ctx: n } },
    })),
    e.$on('click', n[19]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 16777216 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function cp(n) {
  let e;
  return {
    c() {
      e = E('View Website');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function up(n) {
  let e;
  return {
    c() {
      e = E('Recommend');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function zi(n) {
  let e, t;
  return (
    (e = new le({
      props: {
        icon: Ft,
        async: !0,
        $$slots: { default: [dp] },
        $$scope: { ctx: n },
      },
    })),
    e.$on('click', n[14]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 16777216 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function dp(n) {
  let e;
  return {
    c() {
      e = E('Uninstall');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function fp(n) {
  let e, t, r, i, s, l, o, a;
  const c = [lp, ip, np],
    u = [];
  function d(m, k) {
    return m[11] ? 0 : m[10] ? 1 : 2;
  }
  (e = d(n)), (t = u[e] = c[e](n));
  let f = n[6] && Ii(n);
  (s = new le({
    props: { icon: Er, $$slots: { default: [up] }, $$scope: { ctx: n } },
  })),
    s.$on('click', n[20]);
  let p = n[11] && zi(n);
  return {
    c() {
      t.c(),
        (r = $()),
        f && f.c(),
        (i = $()),
        L(s.$$.fragment),
        (l = $()),
        p && p.c(),
        (o = se());
    },
    m(m, k) {
      u[e].m(m, k),
        B(m, r, k),
        f && f.m(m, k),
        B(m, i, k),
        F(s, m, k),
        B(m, l, k),
        p && p.m(m, k),
        B(m, o, k),
        (a = !0);
    },
    p(m, k) {
      let y = e;
      (e = d(m)),
        e === y
          ? u[e].p(m, k)
          : (P(),
            G(u[y], 1, 1, () => {
              u[y] = null;
            }),
            N(),
            (t = u[e]),
            t ? t.p(m, k) : ((t = u[e] = c[e](m)), t.c()),
            g(t, 1),
            t.m(r.parentNode, r)),
        m[6]
          ? f
            ? (f.p(m, k), k & 64 && g(f, 1))
            : ((f = Ii(m)), f.c(), g(f, 1), f.m(i.parentNode, i))
          : f &&
            (P(),
            G(f, 1, 1, () => {
              f = null;
            }),
            N());
      const w = {};
      k & 16777216 && (w.$$scope = { dirty: k, ctx: m }),
        s.$set(w),
        m[11]
          ? p
            ? (p.p(m, k), k & 2048 && g(p, 1))
            : ((p = zi(m)), p.c(), g(p, 1), p.m(o.parentNode, o))
          : p &&
            (P(),
            G(p, 1, 1, () => {
              p = null;
            }),
            N());
    },
    i(m) {
      a || (g(t), g(f), g(s.$$.fragment, m), g(p), (a = !0));
    },
    o(m) {
      G(t), G(f), G(s.$$.fragment, m), G(p), (a = !1);
    },
    d(m) {
      u[e].d(m),
        m && v(r),
        f && f.d(m),
        m && v(i),
        x(s, m),
        m && v(l),
        p && p.d(m),
        m && v(o);
    },
  };
}
function hp(n) {
  let e, t;
  return (
    (e = new Ze({
      props: { $$slots: { default: [fp] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 16792640 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function mp(n) {
  let e,
    t,
    r = n[1] && Ni(n);
  return {
    c() {
      r && r.c(), (e = se());
    },
    m(i, s) {
      r && r.m(i, s), B(i, e, s), (t = !0);
    },
    p(i, [s]) {
      i[1]
        ? r
          ? (r.p(i, s), s & 2 && g(r, 1))
          : ((r = Ni(i)), r.c(), g(r, 1), r.m(e.parentNode, e))
        : r &&
          (P(),
          G(r, 1, 1, () => {
            r = null;
          }),
          N());
    },
    i(i) {
      t || (g(r), (t = !0));
    },
    o(i) {
      G(r), (t = !1);
    },
    d(i) {
      r && r.d(i), i && v(e);
    },
  };
}
function pp(n, e, t) {
  let r;
  ze(n, ne, (z) => t(17, (r = z)));
  let i,
    s,
    l,
    o,
    a,
    c,
    u,
    d,
    f,
    p,
    m,
    k,
    y,
    w,
    M,
    { params: C } = e;
  const S = (z) => {
    var U, J, T, Y;
    if (s) {
      if ((t(1, (l = ye(s))), z.isLoaded && !l)) return Me(we(s));
      t(
        2,
        ({
          image: o,
          title: a,
          description: c,
          ship: u,
          website: d,
          color: f,
          version: p,
          hash: m,
          servedFrom: w,
        } = $e(l)),
        o,
        t(3, a),
        t(4, c),
        t(5, u),
        t(6, d),
        t(7, f),
        t(8, p),
        t(9, m),
        t(12, w)
      ),
        t(
          10,
          (k =
            ((T =
              (J = (U = z.apps) == null ? void 0 : U[i]) == null
                ? void 0
                : J.chad) == null
              ? void 0
              : T.hasOwnProperty('install')) || k)
        ),
        t(11, (y = !k && !!((Y = z.apps) != null && Y[i])));
    }
  };
  ne.subscribe((z) => {
    z.isLoaded && S(z);
  });
  const H = () => {
      ve({ app: 'docket', mark: 'docket-uninstall', json: i }).then(It);
    },
    O = async () => {
      t(10, (k = !0)),
        await ve({ app: 'docket', mark: 'docket-install', json: `${u}/${i}` }),
        await ve({ app: 'hood', mark: 'kiln-revive', json: i }),
        It();
    },
    Z = () => window.open(`${window.location.origin}${w}`),
    V = () => window.open(d),
    A = () => t(13, (M = !0));
  function q(z) {
    (M = z), t(13, M);
  }
  return (
    (n.$$set = (z) => {
      'params' in z && t(16, (C = z.params));
    }),
    (n.$$.update = () => {
      if (n.$$.dirty & 196608) {
        let { wild: z } = C;
        t(0, (s = `/app/${z}`)), S(r);
      }
    }),
    [s, l, o, a, c, u, d, f, p, m, k, y, w, M, H, O, C, r, Z, V, A, q]
  );
}
class bp extends Q {
  constructor(e) {
    super(), X(this, e, pp, mp, K, { params: 16 });
  }
}
function hr(n) {
  const e = n.slice(),
    t = $e(e[0]);
  return (
    (e[3] = t.image), (e[4] = t.title), (e[5] = t.blurb), (e[6] = t.link), e
  );
}
function Ri(n) {
  var l, o;
  let e, t, r, i, s;
  return (
    (t = new xt({
      props: {
        avatar: n[3],
        title: n[4],
        patp:
          (o = (l = n[0]) == null ? void 0 : l.keyObj) == null
            ? void 0
            : o.ship,
        type: 'other',
        $$slots: { default: [kp] },
        $$scope: { ctx: n },
      },
    })),
    (i = new De({
      props: { $$slots: { default: [gp] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          (r = $()),
          L(i.$$.fragment),
          h(e, 'class', 'grid grid-cols-12 gap-8');
      },
      m(a, c) {
        B(a, e, c), F(t, e, null), b(e, r), F(i, e, null), (s = !0);
      },
      p(a, c) {
        var f, p;
        const u = {};
        c & 1 && (u.avatar = a[3]),
          c & 1 && (u.title = a[4]),
          c & 1 &&
            (u.patp =
              (p = (f = a[0]) == null ? void 0 : f.keyObj) == null
                ? void 0
                : p.ship),
          c & 129 && (u.$$scope = { dirty: c, ctx: a }),
          t.$set(u);
        const d = {};
        c & 129 && (d.$$scope = { dirty: c, ctx: a }), i.$set(d);
      },
      i(a) {
        s || (g(t.$$.fragment, a), g(i.$$.fragment, a), (s = !0));
      },
      o(a) {
        G(t.$$.fragment, a), G(i.$$.fragment, a), (s = !1);
      },
      d(a) {
        a && v(e), x(t), x(i);
      },
    }
  );
}
function kp(n) {
  let e,
    t = n[5] + '',
    r;
  return {
    c() {
      (e = _('div')), (r = E(t)), h(e, 'class', 'text-xl');
    },
    m(i, s) {
      B(i, e, s), b(e, r);
    },
    p(i, s) {
      s & 1 && t !== (t = i[5] + '') && ae(r, t);
    },
    d(i) {
      i && v(e);
    },
  };
}
function gp(n) {
  let e, t, r, i, s, l;
  return (
    (i = new Po({})),
    {
      c() {
        (e = _('a')),
          (t = E(`Go
        `)),
          (r = _('div')),
          L(i.$$.fragment),
          h(r, 'class', 'w-6 h-6'),
          h(e, 'target', '_blank'),
          h(e, 'href', (s = n[6])),
          h(
            e,
            'class',
            'border cursor-pointer py-1 flex items-center justify-center gap-2'
          );
      },
      m(o, a) {
        B(o, e, a), b(e, t), b(e, r), F(i, r, null), (l = !0);
      },
      p(o, a) {
        (!l || (a & 1 && s !== (s = o[6]))) && h(e, 'href', s);
      },
      i(o) {
        l || (g(i.$$.fragment, o), (l = !0));
      },
      o(o) {
        G(i.$$.fragment, o), (l = !1);
      },
      d(o) {
        o && v(e), x(i);
      },
    }
  );
}
function Gp(n) {
  let e,
    t,
    r = n[0] && Ri(hr(n));
  return {
    c() {
      r && r.c(), (e = se());
    },
    m(i, s) {
      r && r.m(i, s), B(i, e, s), (t = !0);
    },
    p(i, [s]) {
      i[0]
        ? r
          ? (r.p(hr(i), s), s & 1 && g(r, 1))
          : ((r = Ri(hr(i))), r.c(), g(r, 1), r.m(e.parentNode, e))
        : r &&
          (P(),
          G(r, 1, 1, () => {
            r = null;
          }),
          N());
    },
    i(i) {
      t || (g(r), (t = !0));
    },
    o(i) {
      G(r), (t = !1);
    },
    d(i) {
      r && r.d(i), i && v(e);
    },
  };
}
function _p(n, e, t) {
  let { params: r } = e,
    { wild: i } = r,
    s;
  return (
    ne.subscribe(() => {
      t(0, (s = ye(`/other/${i}`)));
    }),
    (n.$$set = (l) => {
      'params' in l && t(1, (r = l.params));
    }),
    [s, r]
  );
}
class vp extends Q {
  constructor(e) {
    super(), X(this, e, _p, Gp, K, { params: 1 });
  }
}
function Di(n, e, t) {
  const r = n.slice();
  return (r[9] = e[t]), r;
}
function Bp(n) {
  let e;
  return {
    c() {
      e = E('New to me');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function yp(n) {
  let e;
  return {
    c() {
      e = E('Apps');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function wp(n) {
  let e;
  return {
    c() {
      e = E('Groups');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function Ui(n) {
  let e, t, r, i;
  const s = [$p, Cp],
    l = [];
  function o(a, c) {
    return a[1].length > 0 ? 0 : 1;
  }
  return (
    (t = o(n)),
    (r = l[t] = s[t](n)),
    {
      c() {
        (e = _('div')),
          r.c(),
          h(e, 'class', 'flex flex-col gap-4 bg-panels p-6 rounded-lg');
      },
      m(a, c) {
        B(a, e, c), l[t].m(e, null), (i = !0);
      },
      p(a, c) {
        let u = t;
        (t = o(a)),
          t === u
            ? l[t].p(a, c)
            : (P(),
              G(l[u], 1, 1, () => {
                l[u] = null;
              }),
              N(),
              (r = l[t]),
              r ? r.p(a, c) : ((r = l[t] = s[t](a)), r.c()),
              g(r, 1),
              r.m(e, null));
      },
      i(a) {
        i || (g(r), (i = !0));
      },
      o(a) {
        G(r), (i = !1);
      },
      d(a) {
        a && v(e), l[t].d();
      },
    }
  );
}
function Cp(n) {
  let e;
  return {
    c() {
      (e = _('div')),
        (e.innerHTML = `<pre> _   _  ____ _______ _    _ _____ _   _  _____   _______ ____
| \\ | |/ __ \\__   __| |  | |_   _| \\ | |/ ____| |__   __/ __ \\
|  \\| | |  | | | |  | |__| | | | |  \\| | |  __     | | | |  | |
| . \` | |  | | | |  |  __  | | | | . \` | | |_ |    | | | |  | |
| |\\  | |__| | | |  | |  | |_| |_| |\\  | |__| |    | | | |__| |
|_| \\_|\\____/  |_|  |_|  |_|_____|_| \\_|\\_____|    |_|  \\____/

   ____ ______ ______   _    _ ______ ____   ______
 / ____|  ____|  ____| | |  | |  ____|  __ \\|  ____|
| (___ | |__  | |__    | |__| | |__  | |__) | |__
 \\___ \\|  __| |  __|   |  __  |  __| |  _  /|  __|
 ____) | |____| |____  | |  | | |____| | \\ \\| |____
|_____/|______|______| |_|  |_|______|_|  \\_\\______|
        </pre>`),
        h(e, 'class', 'p-10');
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    i: j,
    o: j,
    d(t) {
      t && v(e);
    },
  };
}
function $p(n) {
  let e,
    t,
    r = n[1],
    i = [];
  for (let l = 0; l < r.length; l += 1) i[l] = Wi(Di(n, r, l));
  const s = (l) =>
    G(i[l], 1, 1, () => {
      i[l] = null;
    });
  return {
    c() {
      for (let l = 0; l < i.length; l += 1) i[l].c();
      e = se();
    },
    m(l, o) {
      for (let a = 0; a < i.length; a += 1) i[a] && i[a].m(l, o);
      B(l, e, o), (t = !0);
    },
    p(l, o) {
      if (o & 2) {
        r = l[1];
        let a;
        for (a = 0; a < r.length; a += 1) {
          const c = Di(l, r, a);
          i[a]
            ? (i[a].p(c, o), g(i[a], 1))
            : ((i[a] = Wi(c)), i[a].c(), g(i[a], 1), i[a].m(e.parentNode, e));
        }
        for (P(), a = r.length; a < i.length; a += 1) s(a);
        N();
      }
    },
    i(l) {
      if (!t) {
        for (let o = 0; o < r.length; o += 1) g(i[o]);
        t = !0;
      }
    },
    o(l) {
      i = i.filter(Boolean);
      for (let o = 0; o < i.length; o += 1) G(i[o]);
      t = !1;
    },
    d(l) {
      _e(i, l), l && v(e);
    },
  };
}
function Wi(n) {
  let e, t;
  return (
    (e = new Fe({ props: { key: n[9] } })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 2 && (s.key = r[9]), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function Mp(n) {
  let e, t, r, i, s, l, o, a, c, u, d, f, p;
  (o = new le({
    props: {
      icon: nc,
      active: n[2].includes('new'),
      $$slots: { default: [Bp] },
      $$scope: { ctx: n },
    },
  })),
    o.$on('click', n[4]),
    (c = new le({
      props: {
        icon: xl,
        active: n[2].includes('apps'),
        $$slots: { default: [yp] },
        $$scope: { ctx: n },
      },
    })),
    c.$on('click', n[5]),
    (d = new le({
      props: {
        icon: Ll,
        active: n[2].includes('groups'),
        $$slots: { default: [wp] },
        $$scope: { ctx: n },
      },
    })),
    d.$on('click', n[6]);
  let m = n[0] && Ui(n);
  return {
    c() {
      (e = _('div')),
        (t = _('div')),
        (t.textContent = 'Everything you have ever seen on Portal'),
        (r = $()),
        (i = _('p')),
        (i.textContent = `Items you come across on your travels will accrue here, but it's not yet an
    exhaustive index of all the things on Portal.`),
        (s = $()),
        (l = _('div')),
        L(o.$$.fragment),
        (a = $()),
        L(c.$$.fragment),
        (u = $()),
        L(d.$$.fragment),
        (f = $()),
        m && m.c(),
        h(t, 'class', 'text-2xl font-bold'),
        h(l, 'class', 'flex gap-4'),
        h(e, 'class', 'flex flex-col gap-4 mb-4');
    },
    m(k, y) {
      B(k, e, y),
        b(e, t),
        b(e, r),
        b(e, i),
        b(e, s),
        b(e, l),
        F(o, l, null),
        b(l, a),
        F(c, l, null),
        b(l, u),
        F(d, l, null),
        b(e, f),
        m && m.m(e, null),
        (p = !0);
    },
    p(k, [y]) {
      const w = {};
      y & 4 && (w.active = k[2].includes('new')),
        y & 4096 && (w.$$scope = { dirty: y, ctx: k }),
        o.$set(w);
      const M = {};
      y & 4 && (M.active = k[2].includes('apps')),
        y & 4096 && (M.$$scope = { dirty: y, ctx: k }),
        c.$set(M);
      const C = {};
      y & 4 && (C.active = k[2].includes('groups')),
        y & 4096 && (C.$$scope = { dirty: y, ctx: k }),
        d.$set(C),
        k[0]
          ? m
            ? (m.p(k, y), y & 1 && g(m, 1))
            : ((m = Ui(k)), m.c(), g(m, 1), m.m(e, null))
          : m &&
            (P(),
            G(m, 1, 1, () => {
              m = null;
            }),
            N());
    },
    i(k) {
      p ||
        (g(o.$$.fragment, k),
        g(c.$$.fragment, k),
        g(d.$$.fragment, k),
        g(m),
        (p = !0));
    },
    o(k) {
      G(o.$$.fragment, k),
        G(c.$$.fragment, k),
        G(d.$$.fragment, k),
        G(m),
        (p = !1);
    },
    d(k) {
      k && v(e), x(o), x(c), x(d), m && m.d();
    },
  };
}
function Fp(n, e, t) {
  let r, i, s;
  const l = () => {
    t(1, (i = r)),
      o.includes('new') && t(1, (i = [...r.filter((f) => !s.includes(ke(f)))])),
      o.includes('apps') &&
        t(
          1,
          (i = [...i.filter((f) => (f == null ? void 0 : f.struc) === 'app')])
        ),
      o.includes('groups') &&
        t(
          1,
          (i = [...i.filter((f) => (f == null ? void 0 : f.struc) === 'group')])
        );
  };
  let o = [];
  const a = (f) => {
    o.includes(f)
      ? t(2, (o = o.filter((p) => p !== f)))
      : t(2, (o = [...o, f])),
      l();
  };
  return (
    ne.subscribe((f) => {
      !f.apps ||
        !f.groups ||
        (t(0, (r = $a(Ge))),
        (s = [
          ...Object.keys(f.groups).map(Za),
          ...Object.entries(f.apps).map(
            ([p, { ship: m }]) => `/app/${m}/${p}/`
          ),
        ]),
        l());
    }),
    [
      r,
      i,
      o,
      a,
      () => a('new'),
      () => {
        o.includes('groups') && a('groups'), a('apps');
      },
      () => {
        o.includes('apps') && a('apps'), a('groups');
      },
    ]
  );
}
class xp extends Q {
  constructor(e) {
    super(), X(this, e, Fp, Mp, K, {});
  }
}
function Ji(n, e, t) {
  const r = n.slice();
  return (r[21] = e[t]), r;
}
function Lp(n) {
  const e = n.slice(),
    t = $e(e[2]);
  return (
    (e[16] = t.title),
    (e[17] = t.cover),
    (e[18] = t.image),
    (e[19] = t.description),
    (e[20] = t.color),
    e
  );
}
function Zp(n) {
  let e;
  return {
    c() {
      e = E('Loading...');
    },
    m(t, r) {
      B(t, e, r);
    },
    p: j,
    i: j,
    o: j,
    d(t) {
      t && v(e);
    },
  };
}
function Hp(n) {
  let e, t, r, i, s;
  return (
    (t = new xt({
      props: {
        cover: n[17],
        avatar: n[18],
        title: n[16] || n[0],
        description: n[19],
        color: n[20],
        patp: n[0],
        type: 'ship',
        $$slots: { default: [qp] },
        $$scope: { ctx: n },
      },
    })),
    (i = new De({
      props: { $$slots: { default: [Up] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          (r = $()),
          L(i.$$.fragment),
          h(e, 'class', 'grid grid-cols-12 gap-x-8');
      },
      m(l, o) {
        B(l, e, o), F(t, e, null), b(e, r), F(i, e, null), (s = !0);
      },
      p(l, o) {
        const a = {};
        o & 4 && (a.cover = l[17]),
          o & 4 && (a.avatar = l[18]),
          o & 5 && (a.title = l[16] || l[0]),
          o & 4 && (a.description = l[19]),
          o & 4 && (a.color = l[20]),
          o & 1 && (a.patp = l[0]),
          o & 16777267 && (a.$$scope = { dirty: o, ctx: l }),
          t.$set(a);
        const c = {};
        o & 16777261 && (c.$$scope = { dirty: o, ctx: l }), i.$set(c);
      },
      i(l) {
        s || (g(t.$$.fragment, l), g(i.$$.fragment, l), (s = !0));
      },
      o(l) {
        G(t.$$.fragment, l), G(i.$$.fragment, l), (s = !1);
      },
      d(l) {
        l && v(e), x(t), x(i);
      },
    }
  );
}
function jp(n) {
  let e, t, r;
  function i(l) {
    n[10](l);
  }
  let s = { patp: n[0] };
  return (
    n[4] !== void 0 && (s.loading = n[4]),
    (e = new d1({ props: s })),
    ce.push(() => he(e, 'loading', i)),
    {
      c() {
        L(e.$$.fragment);
      },
      m(l, o) {
        F(e, l, o), (r = !0);
      },
      p(l, o) {
        const a = {};
        o & 1 && (a.patp = l[0]),
          !t && o & 16 && ((t = !0), (a.loading = l[4]), fe(() => (t = !1))),
          e.$set(a);
      },
      i(l) {
        r || (g(e.$$.fragment, l), (r = !0));
      },
      o(l) {
        G(e.$$.fragment, l), (r = !1);
      },
      d(l) {
        x(e, l);
      },
    }
  );
}
function Op(n) {
  let e,
    t,
    r,
    i,
    s,
    l = Ge === n[0] && Yi();
  const o = [Vp, Sp],
    a = [];
  function c(u, d) {
    return !u[1] || u[1].length === 0 ? 0 : 1;
  }
  return (
    (t = c(n)),
    (r = a[t] = o[t](n)),
    {
      c() {
        l && l.c(), (e = $()), r.c(), (i = se());
      },
      m(u, d) {
        l && l.m(u, d), B(u, e, d), a[t].m(u, d), B(u, i, d), (s = !0);
      },
      p(u, d) {
        Ge === u[0]
          ? l
            ? d & 1 && g(l, 1)
            : ((l = Yi()), l.c(), g(l, 1), l.m(e.parentNode, e))
          : l &&
            (P(),
            G(l, 1, 1, () => {
              l = null;
            }),
            N());
        let f = t;
        (t = c(u)),
          t === f
            ? a[t].p(u, d)
            : (P(),
              G(a[f], 1, 1, () => {
                a[f] = null;
              }),
              N(),
              (r = a[t]),
              r ? r.p(u, d) : ((r = a[t] = o[t](u)), r.c()),
              g(r, 1),
              r.m(i.parentNode, i));
      },
      i(u) {
        s || (g(l), g(r), (s = !0));
      },
      o(u) {
        G(l), G(r), (s = !1);
      },
      d(u) {
        l && l.d(u), u && v(e), a[t].d(u), u && v(i);
      },
    }
  );
}
function Yi(n) {
  let e, t;
  return (
    (e = new nr({})),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function Sp(n) {
  let e, t, r;
  return (
    (t = new Zl({ props: { feed: n[1] || [] } })),
    {
      c() {
        (e = _('div')), L(t.$$.fragment), h(e, 'class', 'grid gap-y-4');
      },
      m(i, s) {
        B(i, e, s), F(t, e, null), (r = !0);
      },
      p(i, s) {
        const l = {};
        s & 2 && (l.feed = i[1] || []), t.$set(l);
      },
      i(i) {
        r || (g(t.$$.fragment, i), (r = !0));
      },
      o(i) {
        G(t.$$.fragment, i), (r = !1);
      },
      d(i) {
        i && v(e), x(t);
      },
    }
  );
}
function Vp(n) {
  let e, t, r;
  return {
    c() {
      (e = _('div')),
        (t = E(n[0])),
        (r = E(" hasn't made any posts on Portal yet.")),
        h(e, 'class', 'col-span-12');
    },
    m(i, s) {
      B(i, e, s), b(e, t), b(e, r);
    },
    p(i, s) {
      s & 1 && ae(t, i[0]);
    },
    i: j,
    o: j,
    d(i) {
      i && v(e);
    },
  };
}
function qp(n) {
  let e, t, r, i, s, l, o, a;
  function c(m) {
    n[9](m);
  }
  let u = { tabs: n[7] };
  n[5] !== void 0 && (u.activeTab = n[5]),
    (t = new Cl({ props: u })),
    ce.push(() => he(t, 'activeTab', c));
  const d = [Op, jp],
    f = [];
  function p(m, k) {
    return m[5] === 'Activity' ? 0 : m[5] === 'Collections' ? 1 : -1;
  }
  return (
    ~(l = p(n)) && (o = f[l] = d[l](n)),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          (i = $()),
          (s = _('div')),
          o && o.c(),
          h(s, 'class', 'pt-4 flex flex-col gap-4'),
          h(e, 'class', 'col-span-12 lg:col-span-9');
      },
      m(m, k) {
        B(m, e, k),
          F(t, e, null),
          b(e, i),
          b(e, s),
          ~l && f[l].m(s, null),
          (a = !0);
      },
      p(m, k) {
        const y = {};
        !r && k & 32 && ((r = !0), (y.activeTab = m[5]), fe(() => (r = !1))),
          t.$set(y);
        let w = l;
        (l = p(m)),
          l === w
            ? ~l && f[l].p(m, k)
            : (o &&
                (P(),
                G(f[w], 1, 1, () => {
                  f[w] = null;
                }),
                N()),
              ~l
                ? ((o = f[l]),
                  o ? o.p(m, k) : ((o = f[l] = d[l](m)), o.c()),
                  g(o, 1),
                  o.m(s, null))
                : (o = null));
      },
      i(m) {
        a || (g(t.$$.fragment, m), g(o), (a = !0));
      },
      o(m) {
        G(t.$$.fragment, m), G(o), (a = !1);
      },
      d(m) {
        m && v(e), x(t), ~l && f[l].d();
      },
    }
  );
}
function Ep(n) {
  let e, t;
  return (
    (e = new le({
      props: {
        icon: Bo,
        async: !0,
        $$slots: { default: [Pp] },
        $$scope: { ctx: n },
      },
    })),
    e.$on('click', n[6]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 16777216 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function Ap(n) {
  let e, t;
  return (
    (e = new le({
      props: {
        icon: wo,
        async: !0,
        $$slots: { default: [Np] },
        $$scope: { ctx: n },
      },
    })),
    e.$on('click', n[6]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 16777216 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function Tp(n) {
  let e, t, r, i, s;
  return (
    (t = new H1({})),
    t.$on('add', n[11]),
    (i = new le({
      props: { icon: Tr, $$slots: { default: [Ip] }, $$scope: { ctx: n } },
    })),
    i.$on('click', n[12]),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          (r = $()),
          L(i.$$.fragment),
          h(e, 'class', 'flex flex-col gap-4');
      },
      m(l, o) {
        B(l, e, o), F(t, e, null), b(e, r), F(i, e, null), (s = !0);
      },
      p(l, o) {
        const a = {};
        o & 16777216 && (a.$$scope = { dirty: o, ctx: l }), i.$set(a);
      },
      i(l) {
        s || (g(t.$$.fragment, l), g(i.$$.fragment, l), (s = !0));
      },
      o(l) {
        G(t.$$.fragment, l), G(i.$$.fragment, l), (s = !1);
      },
      d(l) {
        l && v(e), x(t), x(i);
      },
    }
  );
}
function Pp(n) {
  let e;
  return {
    c() {
      e = E('Add Pal');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function Np(n) {
  let e;
  return {
    c() {
      e = E('Remove Pal');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function Ip(n) {
  let e;
  return {
    c() {
      e = E('Edit Profile');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function Ki(n) {
  let e, t;
  return (
    (e = new le({
      props: { icon: Ar, $$slots: { default: [zp] }, $$scope: { ctx: n } },
    })),
    e.$on('click', n[13]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 16777216 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function zp(n) {
  let e;
  return {
    c() {
      e = E('Message');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function Rp(n) {
  let e, t, r, i, s;
  const l = [Tp, Ap, Ep],
    o = [];
  function a(u, d) {
    return Ge === u[0] ? 0 : u[3] ? 1 : 2;
  }
  (e = a(n)), (t = o[e] = l[e](n));
  let c = Ge !== n[0] && Ki(n);
  return {
    c() {
      t.c(), (r = $()), c && c.c(), (i = se());
    },
    m(u, d) {
      o[e].m(u, d), B(u, r, d), c && c.m(u, d), B(u, i, d), (s = !0);
    },
    p(u, d) {
      let f = e;
      (e = a(u)),
        e === f
          ? o[e].p(u, d)
          : (P(),
            G(o[f], 1, 1, () => {
              o[f] = null;
            }),
            N(),
            (t = o[e]),
            t ? t.p(u, d) : ((t = o[e] = l[e](u)), t.c()),
            g(t, 1),
            t.m(r.parentNode, r)),
        Ge !== u[0]
          ? c
            ? (c.p(u, d), d & 1 && g(c, 1))
            : ((c = Ki(u)), c.c(), g(c, 1), c.m(i.parentNode, i))
          : c &&
            (P(),
            G(c, 1, 1, () => {
              c = null;
            }),
            N());
    },
    i(u) {
      s || (g(t), g(c), (s = !0));
    },
    o(u) {
      G(t), G(c), (s = !1);
    },
    d(u) {
      o[e].d(u), u && v(r), c && c.d(u), u && v(i);
    },
  };
}
function Xi(n) {
  let e, t;
  return (
    (e = new Ze({
      props: { $$slots: { default: [Dp] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 16777221 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function Qi(n) {
  let e, t;
  return (
    (e = new Fe({
      props: {
        small: !0,
        key: {
          struc: 'group',
          ship: n[21].split('/')[0],
          cord: n[21].split('/')[1],
          time: '',
        },
      },
    })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 4 &&
          (s.key = {
            struc: 'group',
            ship: r[21].split('/')[0],
            cord: r[21].split('/')[1],
            time: '',
          }),
          e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function Dp(n) {
  let e,
    t,
    r,
    i,
    s,
    l,
    o = n[2].bespoke.groups,
    a = [];
  for (let u = 0; u < o.length; u += 1) a[u] = Qi(Ji(n, o, u));
  const c = (u) =>
    G(a[u], 1, 1, () => {
      a[u] = null;
    });
  return {
    c() {
      (e = _('div')),
        (t = _('div')),
        (r = E(n[0])),
        (i = E(' recommends')),
        (s = $());
      for (let u = 0; u < a.length; u += 1) a[u].c();
      h(e, 'class', 'grid gap-y-4');
    },
    m(u, d) {
      B(u, e, d), b(e, t), b(t, r), b(t, i), b(e, s);
      for (let f = 0; f < a.length; f += 1) a[f] && a[f].m(e, null);
      l = !0;
    },
    p(u, d) {
      if (((!l || d & 1) && ae(r, u[0]), d & 4)) {
        o = u[2].bespoke.groups;
        let f;
        for (f = 0; f < o.length; f += 1) {
          const p = Ji(u, o, f);
          a[f]
            ? (a[f].p(p, d), g(a[f], 1))
            : ((a[f] = Qi(p)), a[f].c(), g(a[f], 1), a[f].m(e, null));
        }
        for (P(), f = o.length; f < a.length; f += 1) c(f);
        N();
      }
    },
    i(u) {
      if (!l) {
        for (let d = 0; d < o.length; d += 1) g(a[d]);
        l = !0;
      }
    },
    o(u) {
      a = a.filter(Boolean);
      for (let d = 0; d < a.length; d += 1) G(a[d]);
      l = !1;
    },
    d(u) {
      u && v(e), _e(a, u);
    },
  };
}
function Up(n) {
  var l, o, a;
  let e, t, r, i;
  e = new Ze({ props: { $$slots: { default: [Rp] }, $$scope: { ctx: n } } });
  let s =
    ((a =
      (o = (l = n[2]) == null ? void 0 : l.bespoke) == null
        ? void 0
        : o.groups) == null
      ? void 0
      : a.length) > 0 && Xi(n);
  return {
    c() {
      L(e.$$.fragment), (t = $()), s && s.c(), (r = se());
    },
    m(c, u) {
      F(e, c, u), B(c, t, u), s && s.m(c, u), B(c, r, u), (i = !0);
    },
    p(c, u) {
      var f, p, m;
      const d = {};
      u & 16777257 && (d.$$scope = { dirty: u, ctx: c }),
        e.$set(d),
        ((m =
          (p = (f = c[2]) == null ? void 0 : f.bespoke) == null
            ? void 0
            : p.groups) == null
          ? void 0
          : m.length) > 0
          ? s
            ? (s.p(c, u), u & 4 && g(s, 1))
            : ((s = Xi(c)), s.c(), g(s, 1), s.m(r.parentNode, r))
          : s &&
            (P(),
            G(s, 1, 1, () => {
              s = null;
            }),
            N());
    },
    i(c) {
      i || (g(e.$$.fragment, c), g(s), (i = !0));
    },
    o(c) {
      G(e.$$.fragment, c), G(s), (i = !1);
    },
    d(c) {
      x(e, c), c && v(t), s && s.d(c), c && v(r);
    },
  };
}
function Wp(n) {
  let e, t, r, i;
  const s = [Hp, Zp],
    l = [];
  function o(c, u) {
    return c[2] ? 0 : 1;
  }
  function a(c, u) {
    return u === 0 ? Lp(c) : c;
  }
  return (
    (e = o(n)),
    (t = l[e] = s[e](a(n, e))),
    {
      c() {
        t.c(), (r = se());
      },
      m(c, u) {
        l[e].m(c, u), B(c, r, u), (i = !0);
      },
      p(c, [u]) {
        let d = e;
        (e = o(c)),
          e === d
            ? l[e].p(a(c, e), u)
            : (P(),
              G(l[d], 1, 1, () => {
                l[d] = null;
              }),
              N(),
              (t = l[e]),
              t ? t.p(a(c, e), u) : ((t = l[e] = s[e](a(c, e))), t.c()),
              g(t, 1),
              t.m(r.parentNode, r));
      },
      i(c) {
        i || (g(t), (i = !0));
      },
      o(c) {
        G(t), (i = !1);
      },
      d(c) {
        l[e].d(c), c && v(r);
      },
    }
  );
}
function Jp(n, e, t) {
  let r;
  ze(n, ne, (C) => t(14, (r = C)));
  let { params: i } = e,
    { patp: s } = i,
    l = [],
    o,
    a,
    c;
  const u = async () => {
    var C;
    if (
      (t(2, (o = Re(s))),
      t(1, (l = yl(s))),
      t(3, (a = !!((C = r.pals) != null && C[s.slice(1)]))),
      !l && r.isLoaded && !c)
    )
      return t(4, (c = !0)), Ys(s);
  };
  ne.subscribe((C) => {
    C && u();
  });
  const d = () => {
    let C = s.slice(1);
    if (a) return zs(C).then(Gr);
    Is(C).then(Gr);
  };
  let f = 'Collections',
    p = ['Collections', 'Activity'];
  function m(C) {
    (f = C), t(5, f);
  }
  function k(C) {
    (c = C), t(4, c);
  }
  const y = () => t(5, (f = 'Collections')),
    w = () => Xe(`/${s}/edit`),
    M = () => window.open(`${window.location.origin}/apps/talk/dm/${s}`);
  return (
    (n.$$set = (C) => {
      'params' in C && t(8, (i = C.params));
    }),
    (n.$$.update = () => {
      n.$$.dirty & 256 && (t(0, ({ patp: s } = i), s), u());
    }),
    [s, l, o, a, c, f, d, p, i, m, k, y, w, M]
  );
}
class Yp extends Q {
  constructor(e) {
    super(), X(this, e, Jp, Wp, K, { params: 8 });
  }
}
function Kp(n) {
  let e,
    t,
    r,
    i,
    s,
    l,
    o,
    a = n[6] ? 'On' : 'Off',
    c,
    u,
    d,
    f,
    p,
    m,
    k,
    y,
    w = n[7] ? 'On' : 'Off',
    M,
    C,
    S;
  return {
    c() {
      (e = _('div')),
        (t = _('div')),
        (r = _('div')),
        (r.textContent = '📜'),
        (i = $()),
        (s = _('div')),
        (s.textContent = 'Post new %blogs automatically'),
        (l = $()),
        (o = _('button')),
        (c = E(a)),
        (u = $()),
        (d = _('div')),
        (f = _('div')),
        (f.textContent = '📻'),
        (p = $()),
        (m = _('div')),
        (m.textContent = 'Post when I !publish on %radio'),
        (k = $()),
        (y = _('button')),
        (M = E(w)),
        h(r, 'class', 'col-span-2 text-6xl'),
        h(s, 'class', 'col-span-8 self-center'),
        h(o, 'class', 'col-span-2 self-center py-1'),
        D(o, 'bg-green-500', n[6]),
        D(o, 'bg-red-500', !n[6]),
        h(t, 'class', 'grid grid-cols-12 gap-4'),
        h(f, 'class', 'col-span-2 text-6xl'),
        h(m, 'class', 'col-span-8 self-center'),
        h(y, 'class', 'col-span-2 self-center py-1'),
        D(y, 'bg-green-500', n[7]),
        D(y, 'bg-red-500', !n[7]),
        h(d, 'class', 'grid grid-cols-12 gap-4'),
        h(e, 'class', 'grid gap-y-4');
    },
    m(H, O) {
      B(H, e, O),
        b(e, t),
        b(t, r),
        b(t, i),
        b(t, s),
        b(t, l),
        b(t, o),
        b(o, c),
        b(e, u),
        b(e, d),
        b(d, f),
        b(d, p),
        b(d, m),
        b(d, k),
        b(d, y),
        b(y, M),
        C || ((S = [te(o, 'click', n[20]), te(y, 'click', n[21])]), (C = !0));
    },
    p(H, O) {
      O & 64 && a !== (a = H[6] ? 'On' : 'Off') && ae(c, a),
        O & 64 && D(o, 'bg-green-500', H[6]),
        O & 64 && D(o, 'bg-red-500', !H[6]),
        O & 128 && w !== (w = H[7] ? 'On' : 'Off') && ae(M, w),
        O & 128 && D(y, 'bg-green-500', H[7]),
        O & 128 && D(y, 'bg-red-500', !H[7]);
    },
    i: j,
    o: j,
    d(H) {
      H && v(e), (C = !1), ge(S);
    },
  };
}
function Xp(n) {
  let e, t, r, i, s, l;
  function o(c) {
    n[19](c);
  }
  let a = {
    key: 'time',
    $$slots: {
      default: [
        e7,
        ({ item: c }) => ({ 25: c }),
        ({ item: c }) => (c ? 33554432 : 0),
      ],
    },
    $$scope: { ctx: n },
  };
  return (
    n[4] !== void 0 && (a.list = n[4]),
    (i = new Ml({ props: a })),
    ce.push(() => he(i, 'list', o)),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          (t.textContent = 'Drag to reorder'),
          (r = $()),
          L(i.$$.fragment),
          h(t, 'class', 'text-lg font-bold col-span-4 pt-4'),
          h(e, 'class', 'grid gap-8 grid-cols-4 pb-4');
      },
      m(c, u) {
        B(c, e, u), b(e, t), b(e, r), F(i, e, null), (l = !0);
      },
      p(c, u) {
        const d = {};
        u & 100663296 && (d.$$scope = { dirty: u, ctx: c }),
          !s && u & 16 && ((s = !0), (d.list = c[4]), fe(() => (s = !1))),
          i.$set(d);
      },
      i(c) {
        l || (g(i.$$.fragment, c), (l = !0));
      },
      o(c) {
        G(i.$$.fragment, c), (l = !1);
      },
      d(c) {
        c && v(e), x(i);
      },
    }
  );
}
function Qp(n) {
  let e, t, r, i, s, l, o, a, c, u, d, f, p, m, k, y, w, M, C, S, H, O, Z;
  function V(q) {
    n[16](q);
  }
  let A = {};
  return (
    n[3] !== void 0 && (A.value = n[3]),
    (c = new pt({ props: A })),
    ce.push(() => he(c, 'value', V)),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          (t.textContent = 'Display Name'),
          (r = $()),
          (i = _('input')),
          (s = $()),
          (l = _('div')),
          (o = _('div')),
          (o.textContent = 'Bio'),
          (a = $()),
          L(c.$$.fragment),
          (d = $()),
          (f = _('div')),
          (p = _('div')),
          (p.textContent = 'Avatar'),
          (m = $()),
          (k = _('input')),
          (y = $()),
          (w = _('div')),
          (M = _('div')),
          (M.textContent = 'Cover Image'),
          (C = $()),
          (S = _('input')),
          h(i, 'type', 'text'),
          h(i, 'class', 'p-2 border-b'),
          h(e, 'class', 'flex flex-col gap-2'),
          h(l, 'class', 'flex flex-col gap-2'),
          h(k, 'type', 'text'),
          h(k, 'class', 'p-2 border-b'),
          h(f, 'class', 'flex flex-col gap-2'),
          h(S, 'type', 'text'),
          h(S, 'class', 'p-2 border-b'),
          h(w, 'class', 'flex flex-col gap-2');
      },
      m(q, z) {
        B(q, e, z),
          b(e, t),
          b(e, r),
          b(e, i),
          pe(i, n[0]),
          B(q, s, z),
          B(q, l, z),
          b(l, o),
          b(l, a),
          F(c, l, null),
          B(q, d, z),
          B(q, f, z),
          b(f, p),
          b(f, m),
          b(f, k),
          pe(k, n[2]),
          B(q, y, z),
          B(q, w, z),
          b(w, M),
          b(w, C),
          b(w, S),
          pe(S, n[1]),
          (H = !0),
          O ||
            ((Z = [
              te(i, 'input', n[15]),
              te(k, 'input', n[17]),
              te(S, 'input', n[18]),
            ]),
            (O = !0));
      },
      p(q, z) {
        z & 1 && i.value !== q[0] && pe(i, q[0]);
        const U = {};
        !u && z & 8 && ((u = !0), (U.value = q[3]), fe(() => (u = !1))),
          c.$set(U),
          z & 4 && k.value !== q[2] && pe(k, q[2]),
          z & 2 && S.value !== q[1] && pe(S, q[1]);
      },
      i(q) {
        H || (g(c.$$.fragment, q), (H = !0));
      },
      o(q) {
        G(c.$$.fragment, q), (H = !1);
      },
      d(q) {
        q && v(e),
          q && v(s),
          q && v(l),
          x(c),
          q && v(d),
          q && v(f),
          q && v(y),
          q && v(w),
          (O = !1),
          ge(Z);
      },
    }
  );
}
function e7(n) {
  let e, t;
  return (
    (e = new Ir({ props: { key: n[25] } })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 33554432 && (s.key = r[25]), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function t7(n) {
  let e;
  return {
    c() {
      e = E('Save');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function r7(n) {
  let e;
  return {
    c() {
      e = E('Back');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function n7(n) {
  let e, t, r, i;
  return (
    (e = new le({
      props: { icon: We, $$slots: { default: [t7] }, $$scope: { ctx: n } },
    })),
    e.$on('click', n[22]),
    (r = new le({
      props: { icon: Ue, $$slots: { default: [r7] }, $$scope: { ctx: n } },
    })),
    r.$on('click', Ct),
    {
      c() {
        L(e.$$.fragment), (t = $()), L(r.$$.fragment);
      },
      m(s, l) {
        F(e, s, l), B(s, t, l), F(r, s, l), (i = !0);
      },
      p(s, l) {
        const o = {};
        l & 67108864 && (o.$$scope = { dirty: l, ctx: s }), e.$set(o);
        const a = {};
        l & 67108864 && (a.$$scope = { dirty: l, ctx: s }), r.$set(a);
      },
      i(s) {
        i || (g(e.$$.fragment, s), g(r.$$.fragment, s), (i = !0));
      },
      o(s) {
        G(e.$$.fragment, s), G(r.$$.fragment, s), (i = !1);
      },
      d(s) {
        x(e, s), s && v(t), x(r, s);
      },
    }
  );
}
function i7(n) {
  let e, t;
  return (
    (e = new Ze({
      props: { $$slots: { default: [n7] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 67108896 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function l7(n) {
  let e, t, r, i, s, l, o, a, c, u;
  function d(y) {
    n[14](y);
  }
  let f = { tabs: n[8] };
  n[5] !== void 0 && (f.activeTab = n[5]),
    (r = new Cl({ props: f })),
    ce.push(() => he(r, 'activeTab', d));
  const p = [Qp, Xp, Kp],
    m = [];
  function k(y, w) {
    return y[5] === 'Profile'
      ? 0
      : y[5] === 'Collections'
      ? 1
      : y[5] === 'integrations'
      ? 2
      : -1;
  }
  return (
    ~(l = k(n)) && (o = m[l] = p[l](n)),
    (c = new De({
      props: { $$slots: { default: [i7] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          L(r.$$.fragment),
          (s = $()),
          o && o.c(),
          (a = $()),
          L(c.$$.fragment),
          h(t, 'class', 'grid gap-y-4 col-span-9 bg-panels p-6 rounded-lg'),
          h(e, 'class', 'grid grid-cols-12 gap-x-8');
      },
      m(y, w) {
        B(y, e, w),
          b(e, t),
          F(r, t, null),
          b(t, s),
          ~l && m[l].m(t, null),
          b(e, a),
          F(c, e, null),
          (u = !0);
      },
      p(y, [w]) {
        const M = {};
        !i && w & 32 && ((i = !0), (M.activeTab = y[5]), fe(() => (i = !1))),
          r.$set(M);
        let C = l;
        (l = k(y)),
          l === C
            ? ~l && m[l].p(y, w)
            : (o &&
                (P(),
                G(m[C], 1, 1, () => {
                  m[C] = null;
                }),
                N()),
              ~l
                ? ((o = m[l]),
                  o ? o.p(y, w) : ((o = m[l] = p[l](y)), o.c()),
                  g(o, 1),
                  o.m(t, null))
                : (o = null));
        const S = {};
        w & 67108896 && (S.$$scope = { dirty: w, ctx: y }), c.$set(S);
      },
      i(y) {
        u || (g(r.$$.fragment, y), g(o), g(c.$$.fragment, y), (u = !0));
      },
      o(y) {
        G(r.$$.fragment, y), G(o), G(c.$$.fragment, y), (u = !1);
      },
      d(y) {
        y && v(e), x(r), ~l && m[l].d(), x(c);
      },
    }
  );
}
function s7(n, e, t) {
  let { params: r } = e;
  const { patp: i } = r;
  let s, l, o, a, c, u;
  ne.subscribe(() => {
    (s = Re(i)),
      t(
        0,
        ({ nickname: l, cover: o, avatar: a, bio: c } = s.bespoke || {}),
        l,
        t(1, o),
        t(2, a),
        t(3, c)
      ),
      t(
        4,
        (u = (_r(i) || []).filter((U) => {
          var T, Y, ie;
          let J = ye(ke(U));
          return (
            ((T = J == null ? void 0 : J.bespoke) == null ? void 0 : T.title) &&
            ((ie =
              (Y = J == null ? void 0 : J.bespoke) == null
                ? void 0
                : Y['key-list']) == null
              ? void 0
              : ie.length) > 0
          );
        }))
      );
  });
  let d = 'Profile',
    f = ['Profile', 'Collections'],
    p = !0,
    m = !1;
  const k = () => {
      t(6, (p = !p));
    },
    y = () => {
      t(7, (m = !m));
    },
    w = () => {
      ve({
        app: 'contacts',
        mark: 'contact-action',
        json: {
          edit: [
            { nickname: l ?? '' },
            { cover: o ?? '' },
            { avatar: a ?? '' },
            { bio: c ?? '' },
          ],
        },
      });
    },
    M = () => {
      ve({
        app: 'portal-manager',
        mark: 'portal-action',
        json: {
          edit: {
            key: { struc: 'collection', ship: i, cord: '', time: '~2000.1.1' },
            bespoke: { collection: { 'key-list': u } },
          },
        },
      });
    };
  function C(U) {
    (d = U), t(5, d);
  }
  function S() {
    (l = this.value), t(0, l);
  }
  function H(U) {
    (c = U), t(3, c);
  }
  function O() {
    (a = this.value), t(2, a);
  }
  function Z() {
    (o = this.value), t(1, o);
  }
  function V(U) {
    (u = U), t(4, u);
  }
  const A = () => k(),
    q = () => y(),
    z = () => {
      switch (d) {
        case 'Profile':
          w(), Ct();
        case 'Collections':
          M(), Ct();
        default:
          return;
      }
    };
  return (
    (n.$$set = (U) => {
      'params' in U && t(13, (r = U.params));
    }),
    [l, o, a, c, u, d, p, m, f, k, y, w, M, r, C, S, H, O, Z, V, A, q, z]
  );
}
let a7 = class extends Q {
  constructor(e) {
    super(), X(this, e, s7, l7, K, { params: 13 });
  }
};
function el(n, e, t) {
  const r = n.slice();
  return (r[14] = e[t]), r;
}
function mr(n) {
  var i, s;
  const e = n.slice(),
    t = $e(e[0]);
  (e[9] = t.title), (e[10] = t.ship), (e[11] = t.blurb), (e[12] = t.image);
  const r = Re(
    (s = (i = e[0]) == null ? void 0 : i.keyObj) == null ? void 0 : s.ship
  );
  return (e[13] = r.cover), e;
}
function tl(n) {
  let e, t, r, i, s, l, o, a;
  (t = new xt({
    props: {
      patp: n[10],
      cover: n[13],
      title: n[9],
      description: n[11],
      avatar: n[12],
      type: 'collection',
      $$slots: { default: [o7] },
      $$scope: { ctx: n },
    },
  })),
    (i = new De({
      props: { $$slots: { default: [h7] }, $$scope: { ctx: n } },
    }));
  function c(d) {
    n[7](d);
  }
  let u = { key: n[0].keyObj };
  return (
    n[2] !== void 0 && (u.open = n[2]),
    (l = new rr({ props: u })),
    ce.push(() => he(l, 'open', c)),
    {
      c() {
        (e = _('div')),
          L(t.$$.fragment),
          (r = $()),
          L(i.$$.fragment),
          (s = $()),
          L(l.$$.fragment),
          h(e, 'class', 'grid grid-cols-12 gap-x-8 mb-4');
      },
      m(d, f) {
        B(d, e, f),
          F(t, e, null),
          b(e, r),
          F(i, e, null),
          B(d, s, f),
          F(l, d, f),
          (a = !0);
      },
      p(d, f) {
        const p = {};
        f & 1 && (p.patp = d[10]),
          f & 1 && (p.cover = d[13]),
          f & 1 && (p.title = d[9]),
          f & 1 && (p.description = d[11]),
          f & 1 && (p.avatar = d[12]),
          f & 131074 && (p.$$scope = { dirty: f, ctx: d }),
          t.$set(p);
        const m = {};
        f & 131077 && (m.$$scope = { dirty: f, ctx: d }), i.$set(m);
        const k = {};
        f & 1 && (k.key = d[0].keyObj),
          !o && f & 4 && ((o = !0), (k.open = d[2]), fe(() => (o = !1))),
          l.$set(k);
      },
      i(d) {
        a ||
          (g(t.$$.fragment, d),
          g(i.$$.fragment, d),
          g(l.$$.fragment, d),
          (a = !0));
      },
      o(d) {
        G(t.$$.fragment, d), G(i.$$.fragment, d), G(l.$$.fragment, d), (a = !1);
      },
      d(d) {
        d && v(e), x(t), x(i), d && v(s), x(l, d);
      },
    }
  );
}
function rl(n) {
  let e, t;
  return (
    (e = new Fe({ props: { key: n[14] } })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 2 && (s.key = r[14]), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function o7(n) {
  let e,
    t,
    r = n[1],
    i = [];
  for (let l = 0; l < r.length; l += 1) i[l] = rl(el(n, r, l));
  const s = (l) =>
    G(i[l], 1, 1, () => {
      i[l] = null;
    });
  return {
    c() {
      e = _('div');
      for (let l = 0; l < i.length; l += 1) i[l].c();
      h(e, 'class', 'grid gap-y-4 bg-panels p-4 rounded-lg');
    },
    m(l, o) {
      B(l, e, o);
      for (let a = 0; a < i.length; a += 1) i[a] && i[a].m(e, null);
      t = !0;
    },
    p(l, o) {
      if (o & 2) {
        r = l[1];
        let a;
        for (a = 0; a < r.length; a += 1) {
          const c = el(l, r, a);
          i[a]
            ? (i[a].p(c, o), g(i[a], 1))
            : ((i[a] = rl(c)), i[a].c(), g(i[a], 1), i[a].m(e, null));
        }
        for (P(), a = r.length; a < i.length; a += 1) s(a);
        N();
      }
    },
    i(l) {
      if (!t) {
        for (let o = 0; o < r.length; o += 1) g(i[o]);
        t = !0;
      }
    },
    o(l) {
      i = i.filter(Boolean);
      for (let o = 0; o < i.length; o += 1) G(i[o]);
      t = !1;
    },
    d(l) {
      l && v(e), _e(i, l);
    },
  };
}
function c7(n) {
  let e;
  return {
    c() {
      e = E('Back');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function u7(n) {
  let e;
  return {
    c() {
      e = E('Recommend');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function nl(n) {
  let e, t;
  return (
    (e = new le({
      props: { icon: Tr, $$slots: { default: [d7] }, $$scope: { ctx: n } },
    })),
    e.$on('click', n[6]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 131072 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function d7(n) {
  let e;
  return {
    c() {
      e = E('Edit');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function f7(n) {
  let e, t, r, i, s, l;
  (e = new le({
    props: { icon: Ue, $$slots: { default: [c7] }, $$scope: { ctx: n } },
  })),
    e.$on('click', Ct),
    (r = new le({
      props: { icon: Er, $$slots: { default: [u7] }, $$scope: { ctx: n } },
    })),
    r.$on('click', n[5]);
  let o = Ge === n[10] && nl(n);
  return {
    c() {
      L(e.$$.fragment),
        (t = $()),
        L(r.$$.fragment),
        (i = $()),
        o && o.c(),
        (s = se());
    },
    m(a, c) {
      F(e, a, c),
        B(a, t, c),
        F(r, a, c),
        B(a, i, c),
        o && o.m(a, c),
        B(a, s, c),
        (l = !0);
    },
    p(a, c) {
      const u = {};
      c & 131072 && (u.$$scope = { dirty: c, ctx: a }), e.$set(u);
      const d = {};
      c & 131072 && (d.$$scope = { dirty: c, ctx: a }),
        r.$set(d),
        Ge === a[10]
          ? o
            ? (o.p(a, c), c & 1 && g(o, 1))
            : ((o = nl(a)), o.c(), g(o, 1), o.m(s.parentNode, s))
          : o &&
            (P(),
            G(o, 1, 1, () => {
              o = null;
            }),
            N());
    },
    i(a) {
      l || (g(e.$$.fragment, a), g(r.$$.fragment, a), g(o), (l = !0));
    },
    o(a) {
      G(e.$$.fragment, a), G(r.$$.fragment, a), G(o), (l = !1);
    },
    d(a) {
      x(e, a), a && v(t), x(r, a), a && v(i), o && o.d(a), a && v(s);
    },
  };
}
function h7(n) {
  let e, t;
  return (
    (e = new Ze({
      props: { $$slots: { default: [f7] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i & 131077 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function m7(n) {
  let e,
    t,
    r = n[0] && tl(mr(n));
  return {
    c() {
      r && r.c(), (e = se());
    },
    m(i, s) {
      r && r.m(i, s), B(i, e, s), (t = !0);
    },
    p(i, [s]) {
      i[0]
        ? r
          ? (r.p(mr(i), s), s & 1 && g(r, 1))
          : ((r = tl(mr(i))), r.c(), g(r, 1), r.m(e.parentNode, e))
        : r &&
          (P(),
          G(r, 1, 1, () => {
            r = null;
          }),
          N());
    },
    i(i) {
      t || (g(r), (t = !0));
    },
    o(i) {
      G(r), (t = !1);
    },
    d(i) {
      r && r.d(i), i && v(e);
    },
  };
}
function p7(n, e, t) {
  let { params: r } = e,
    { wild: i } = r,
    s = `/collection/${i}`,
    l,
    o,
    a;
  ne.subscribe(() => {
    t(0, (l = ye(s))), l && t(1, (o = Sr(l.keyStr)));
  });
  const c = () => t(2, (a = !0)),
    u = () => Xe(`/collection-edit/${i}`);
  function d(f) {
    (a = f), t(2, a);
  }
  return (
    (n.$$set = (f) => {
      'params' in f && t(4, (r = f.params));
    }),
    [l, o, a, i, r, c, u, d]
  );
}
class b7 extends Q {
  constructor(e) {
    super(), X(this, e, p7, m7, K, { params: 4 });
  }
}
function il(n) {
  let e,
    t,
    r,
    i,
    s,
    l,
    o,
    a,
    c,
    u,
    d,
    f,
    p,
    m,
    k,
    y,
    w,
    M,
    C,
    S,
    H,
    O,
    Z,
    V,
    A,
    q,
    z,
    U,
    J,
    T,
    Y,
    ie,
    R,
    I,
    oe,
    Be,
    Te,
    W;
  function de(re) {
    n[17](re);
  }
  let Le = {};
  n[2] !== void 0 && (Le.value = n[2]),
    (k = new pt({ props: Le })),
    ce.push(() => he(k, 'value', de));
  function Pe(re) {
    n[21](re);
  }
  let st = {
    key: 'keyStr',
    $$slots: {
      default: [
        k7,
        ({ item: re }) => ({ 7: re }),
        ({ item: re }) => [re ? 128 : 0],
      ],
    },
    $$scope: { ctx: n },
  };
  n[4] !== void 0 && (st.list = n[4]),
    (q = new Ml({ props: st })),
    ce.push(() => he(q, 'list', Pe)),
    (J = new De({
      props: { $$slots: { default: [v7] }, $$scope: { ctx: n } },
    }));
  function kt(re) {
    n[23](re);
  }
  let at = { $$slots: { default: [B7] }, $$scope: { ctx: n } };
  n[5] !== void 0 && (at.open = n[5]),
    (Y = new et({ props: at })),
    ce.push(() => he(Y, 'open', kt));
  function zl(re) {
    n[26](re);
  }
  let Yr = { $$slots: { default: [C7] }, $$scope: { ctx: n } };
  return (
    n[6] !== void 0 && (Yr.open = n[6]),
    (I = new et({ props: Yr })),
    ce.push(() => he(I, 'open', zl)),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          (r = _('div')),
          (i = E('Editing ')),
          (s = E(n[1])),
          (l = $()),
          (o = _('div')),
          (a = _('div')),
          (a.textContent = 'Title'),
          (c = $()),
          (u = _('input')),
          (d = $()),
          (f = _('div')),
          (p = _('div')),
          (p.textContent = 'Description'),
          (m = $()),
          L(k.$$.fragment),
          (w = $()),
          (M = _('div')),
          (C = _('div')),
          (C.textContent = 'Image'),
          (S = $()),
          (H = _('input')),
          (O = $()),
          (Z = _('div')),
          (V = _('div')),
          (V.textContent = 'Items (drag to reorder)'),
          (A = $()),
          L(q.$$.fragment),
          (U = $()),
          L(J.$$.fragment),
          (T = $()),
          L(Y.$$.fragment),
          (R = $()),
          L(I.$$.fragment),
          h(r, 'class', 'text-2xl font-bold'),
          h(u, 'class', 'p-2 border-b focus:outline-none'),
          h(u, 'type', 'text'),
          h(o, 'class', 'flex flex-col gap-2'),
          h(f, 'class', 'flex flex-col gap-2'),
          h(H, 'class', 'p-2 border-b focus:outline-none'),
          h(H, 'type', 'text'),
          h(M, 'class', 'flex flex-col gap-2'),
          h(V, 'class', 'py-2'),
          h(Z, 'class', 'flex flex-col gap-2'),
          h(t, 'class', 'grid gap-4 col-span-9 bg-panels p-4 rounded-lg'),
          h(e, 'class', 'grid grid-cols-12 gap-x-8');
      },
      m(re, be) {
        B(re, e, be),
          b(e, t),
          b(t, r),
          b(r, i),
          b(r, s),
          b(t, l),
          b(t, o),
          b(o, a),
          b(o, c),
          b(o, u),
          pe(u, n[1]),
          b(t, d),
          b(t, f),
          b(f, p),
          b(f, m),
          F(k, f, null),
          b(t, w),
          b(t, M),
          b(M, C),
          b(M, S),
          b(M, H),
          pe(H, n[3]),
          b(t, O),
          b(t, Z),
          b(Z, V),
          b(Z, A),
          F(q, Z, null),
          b(e, U),
          F(J, e, null),
          B(re, T, be),
          F(Y, re, be),
          B(re, R, be),
          F(I, re, be),
          (Be = !0),
          Te ||
            ((W = [te(u, 'input', n[16]), te(H, 'input', n[18])]), (Te = !0));
      },
      p(re, be) {
        (!Be || be[0] & 2) && ae(s, re[1]),
          be[0] & 2 && u.value !== re[1] && pe(u, re[1]);
        const Kr = {};
        !y && be[0] & 4 && ((y = !0), (Kr.value = re[2]), fe(() => (y = !1))),
          k.$set(Kr),
          be[0] & 8 && H.value !== re[3] && pe(H, re[3]);
        const ir = {};
        (be[0] & 128) | (be[1] & 1) && (ir.$$scope = { dirty: be, ctx: re }),
          !z && be[0] & 16 && ((z = !0), (ir.list = re[4]), fe(() => (z = !1))),
          q.$set(ir);
        const Xr = {};
        be[1] & 1 && (Xr.$$scope = { dirty: be, ctx: re }), J.$set(Xr);
        const lr = {};
        (be[0] & 1) | (be[1] & 1) && (lr.$$scope = { dirty: be, ctx: re }),
          !ie &&
            be[0] & 32 &&
            ((ie = !0), (lr.open = re[5]), fe(() => (ie = !1))),
          Y.$set(lr);
        const sr = {};
        (be[0] & 192) | (be[1] & 1) && (sr.$$scope = { dirty: be, ctx: re }),
          !oe &&
            be[0] & 64 &&
            ((oe = !0), (sr.open = re[6]), fe(() => (oe = !1))),
          I.$set(sr);
      },
      i(re) {
        Be ||
          (g(k.$$.fragment, re),
          g(q.$$.fragment, re),
          g(J.$$.fragment, re),
          g(Y.$$.fragment, re),
          g(I.$$.fragment, re),
          (Be = !0));
      },
      o(re) {
        G(k.$$.fragment, re),
          G(q.$$.fragment, re),
          G(J.$$.fragment, re),
          G(Y.$$.fragment, re),
          G(I.$$.fragment, re),
          (Be = !1);
      },
      d(re) {
        re && v(e),
          x(k),
          x(q),
          x(J),
          re && v(T),
          x(Y, re),
          re && v(R),
          x(I, re),
          (Te = !1),
          ge(W);
      },
    }
  );
}
function k7(n) {
  let e, t;
  return (
    (e = new Fe({
      props: {
        key: n[7],
        clickable: !1,
        removable: !0,
        editable: n[7].struc === 'other',
      },
    })),
    e.$on('remove', n[19]),
    e.$on('edit', n[20]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i[0] & 128 && (s.key = r[7]),
          i[0] & 128 && (s.editable = r[7].struc === 'other'),
          e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function g7(n) {
  let e;
  return {
    c() {
      e = E('Add Item');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function G7(n) {
  let e;
  return {
    c() {
      e = E('Save');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function _7(n) {
  let e, t, r, i;
  return (
    (e = new le({
      props: { icon: Mt, $$slots: { default: [g7] }, $$scope: { ctx: n } },
    })),
    e.$on('click', n[9]),
    (r = new le({
      props: { icon: We, $$slots: { default: [G7] }, $$scope: { ctx: n } },
    })),
    r.$on('click', n[8]),
    {
      c() {
        L(e.$$.fragment), (t = $()), L(r.$$.fragment);
      },
      m(s, l) {
        F(e, s, l), B(s, t, l), F(r, s, l), (i = !0);
      },
      p(s, l) {
        const o = {};
        l[1] & 1 && (o.$$scope = { dirty: l, ctx: s }), e.$set(o);
        const a = {};
        l[1] & 1 && (a.$$scope = { dirty: l, ctx: s }), r.$set(a);
      },
      i(s) {
        i || (g(e.$$.fragment, s), g(r.$$.fragment, s), (i = !0));
      },
      o(s) {
        G(e.$$.fragment, s), G(r.$$.fragment, s), (i = !1);
      },
      d(s) {
        x(e, s), s && v(t), x(r, s);
      },
    }
  );
}
function v7(n) {
  let e, t;
  return (
    (e = new Ze({
      props: { $$slots: { default: [_7] }, $$scope: { ctx: n } },
    })),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i[1] & 1 && (s.$$scope = { dirty: i, ctx: r }), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function B7(n) {
  let e, t;
  return (
    (e = new J1({ props: { collection: n[0] } })),
    e.$on('add', n[22]),
    e.$on('saved', n[14]),
    {
      c() {
        L(e.$$.fragment);
      },
      m(r, i) {
        F(e, r, i), (t = !0);
      },
      p(r, i) {
        const s = {};
        i[0] & 1 && (s.collection = r[0]), e.$set(s);
      },
      i(r) {
        t || (g(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        G(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        x(e, r);
      },
    }
  );
}
function y7(n) {
  let e;
  return {
    c() {
      e = E('Back');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function w7(n) {
  let e;
  return {
    c() {
      e = E('Save');
    },
    m(t, r) {
      B(t, e, r);
    },
    d(t) {
      t && v(e);
    },
  };
}
function C7(n) {
  let e, t, r, i, s, l, o, a, c, u;
  function d(p) {
    n[24](p);
  }
  let f = {};
  return (
    n[7].bespoke !== void 0 && (f.item = n[7].bespoke),
    (r = new qr({ props: f })),
    ce.push(() => he(r, 'item', d)),
    (o = new le({
      props: { icon: Ue, $$slots: { default: [y7] }, $$scope: { ctx: n } },
    })),
    o.$on('click', n[25]),
    (c = new le({
      props: { icon: We, $$slots: { default: [w7] }, $$scope: { ctx: n } },
    })),
    c.$on('click', n[12]),
    {
      c() {
        (e = _('div')),
          (t = _('div')),
          L(r.$$.fragment),
          (s = $()),
          (l = _('div')),
          L(o.$$.fragment),
          (a = $()),
          L(c.$$.fragment),
          h(l, 'class', 'flex justify-between'),
          h(e, 'class', 'flex flex-col h-full justify-between');
      },
      m(p, m) {
        B(p, e, m),
          b(e, t),
          F(r, t, null),
          b(e, s),
          b(e, l),
          F(o, l, null),
          b(l, a),
          F(c, l, null),
          (u = !0);
      },
      p(p, m) {
        const k = {};
        !i &&
          m[0] & 128 &&
          ((i = !0), (k.item = p[7].bespoke), fe(() => (i = !1))),
          r.$set(k);
        const y = {};
        m[1] & 1 && (y.$$scope = { dirty: m, ctx: p }), o.$set(y);
        const w = {};
        m[1] & 1 && (w.$$scope = { dirty: m, ctx: p }), c.$set(w);
      },
      i(p) {
        u ||
          (g(r.$$.fragment, p),
          g(o.$$.fragment, p),
          g(c.$$.fragment, p),
          (u = !0));
      },
      o(p) {
        G(r.$$.fragment, p), G(o.$$.fragment, p), G(c.$$.fragment, p), (u = !1);
      },
      d(p) {
        p && v(e), x(r), x(o), x(c);
      },
    }
  );
}
function $7(n) {
  let e,
    t,
    r = n[0] && il(n);
  return {
    c() {
      r && r.c(), (e = se());
    },
    m(i, s) {
      r && r.m(i, s), B(i, e, s), (t = !0);
    },
    p(i, s) {
      i[0]
        ? r
          ? (r.p(i, s), s[0] & 1 && g(r, 1))
          : ((r = il(i)), r.c(), g(r, 1), r.m(e.parentNode, e))
        : r &&
          (P(),
          G(r, 1, 1, () => {
            r = null;
          }),
          N());
    },
    i(i) {
      t || (g(r), (t = !0));
    },
    o(i) {
      G(r), (t = !1);
    },
    d(i) {
      r && r.d(i), i && v(e);
    },
  };
}
function M7(n, e, t) {
  let { params: r } = e,
    { wild: i } = r,
    s = `/collection/${i}`,
    l,
    o,
    a,
    c,
    u,
    d;
  ne.subscribe(() => {
    t(0, (l = ye(s))),
      l &&
        (t(
          1,
          ({
            bespoke: { ship: o, title: a, blurb: c, image: u },
            keyObj: { ship: o },
          } = l),
          a,
          t(2, c),
          t(3, u)
        ),
        Re(o),
        t(4, (d = Sr(l.keyStr).map((R) => ({ ...R, keyStr: ke(R) })))));
  });
  const f = () => {
    ve({
      app: 'portal-manager',
      mark: 'portal-action',
      json: {
        edit: {
          key: we(s),
          bespoke: {
            collection: { title: a, blurb: c, image: u, 'key-list': d },
          },
        },
      },
    });
  };
  let p = !1;
  const m = () => {
      t(5, (p = !0));
    },
    k = (R) => {
      t(4, (d = d.filter((I) => I.keyStr !== R)));
    };
  let y = !1,
    w;
  const M = (R) => {
      t(7, (w = ye(d.find((I) => I.keyStr === R).keyStr))), t(6, (y = !0));
    },
    C = () => {
      ve({
        app: 'portal-manager',
        mark: 'portal-action',
        json: { edit: { key: w.keyObj, bespoke: { other: { ...w.bespoke } } } },
      }),
        t(6, (y = !1));
    },
    S = (R) => {
      d.push(we(R)), t(4, d), t(5, (p = !1)), f(), Ct();
    },
    H = () => {
      t(5, (p = !1));
    };
  function O() {
    (a = this.value), t(1, a);
  }
  function Z(R) {
    (c = R), t(2, c);
  }
  function V() {
    (u = this.value), t(3, u);
  }
  const A = ({ detail: R }) => k(R),
    q = ({ detail: R }) => M(R);
  function z(R) {
    (d = R), t(4, d);
  }
  const U = ({ detail: R }) => S(R);
  function J(R) {
    (p = R), t(5, p);
  }
  function T(R) {
    n.$$.not_equal(w.bespoke, R) && ((w.bespoke = R), t(7, w));
  }
  const Y = () => t(6, (y = !1));
  function ie(R) {
    (y = R), t(6, y);
  }
  return (
    (n.$$set = (R) => {
      'params' in R && t(15, (r = R.params));
    }),
    [
      l,
      a,
      c,
      u,
      d,
      p,
      y,
      w,
      f,
      m,
      k,
      M,
      C,
      S,
      H,
      r,
      O,
      Z,
      V,
      A,
      q,
      z,
      U,
      J,
      T,
      Y,
      ie,
    ]
  );
}
class F7 extends Q {
  constructor(e) {
    super(), X(this, e, M7, $7, K, { params: 15 }, null, [-1, -1]);
  }
}
function x7(n) {
  let e, t, r, i, s, l, o, a, c, u, d;
  return (
    (t = new vs({ props: { properties: [jr.googleAnalyticsId] } })),
    (s = new pc({})),
    (a = new ks({ props: { routes: n[0] } })),
    (u = new Cc({})),
    {
      c() {
        (e = _('main')),
          L(t.$$.fragment),
          (r = $()),
          (i = _('div')),
          L(s.$$.fragment),
          (l = $()),
          (o = _('div')),
          L(a.$$.fragment),
          (c = $()),
          L(u.$$.fragment),
          h(i, 'class', 'relative z-10'),
          h(o, 'class', 'p-2 z-0 md:px-16 lg:px-32 2xl:px-56');
      },
      m(f, p) {
        B(f, e, p),
          F(t, e, null),
          b(e, r),
          b(e, i),
          F(s, i, null),
          b(e, l),
          b(e, o),
          F(a, o, null),
          b(e, c),
          F(u, e, null),
          (d = !0);
      },
      p: j,
      i(f) {
        d ||
          (g(t.$$.fragment, f),
          g(s.$$.fragment, f),
          g(a.$$.fragment, f),
          g(u.$$.fragment, f),
          (d = !0));
      },
      o(f) {
        G(t.$$.fragment, f),
          G(s.$$.fragment, f),
          G(a.$$.fragment, f),
          G(u.$$.fragment, f),
          (d = !1);
      },
      d(f) {
        f && v(e), x(t), x(s), x(a), x(u);
      },
    }
  );
}
function L7(n) {
  const e = {
    '/': Si,
    '/index': qa,
    '/feed': Si,
    '/explore': xp,
    '/item/:itemkey': Om,
    '/group/:host/:cord': tp,
    '/app/*': bp,
    '/other/*': vp,
    '/collection/*': b7,
    '/collection-edit/*': F7,
    '/:patp': Yp,
    '/:patp/edit': a7,
  };
  return (
    ne.subscribe((t) => {
      console.log({ state: t });
    }),
    _l.subscribe((t) => {
      window.scrollTo(0, 0),
        Bs('pageview', { location: t }),
        console.log({ location: t });
    }),
    [e]
  );
}
class Z7 extends Q {
  constructor(e) {
    super(), X(this, e, L7, x7, K, {});
  }
}
Qs(mt);
ea(mt);
ta(mt);
ra(mt);
na(mt);
ia(mt);
new Z7({ target: document.getElementById('app') });
