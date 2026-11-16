/* Gönül Plak · Kıraathane karakterleri: riglı 3D insan modeli + hareket yakalama animasyonları
   Model: Ready Player Me avatarı (three.js örnekleri). Animasyonlar: Mixamo (idle, yürüme, koşma, baş sallama), bu iskelete aktarıldı (kh-anim.json).
   Oturma, çay içme, nargile çekme, el sallama gibi duruşlar kemiklere kodla eklenir. */
import * as THREE from './kh-three.js';
import { GLTFLoader } from './kh-x-GLTFLoader.js';
import * as SU from './kh-x-SkeletonUtils.js';

let BASE = null, CLIPS = null;
export async function loadAvatars() {
  if (BASE) return true;
  const L = new GLTFLoader();
  const [g, j] = await Promise.all([L.loadAsync('kh-av.glb'), fetch('kh-anim.json').then(r => r.json())]);
  BASE = g.scene;
  BASE.traverse(o => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; o.frustumCulled = false; } });
  CLIPS = {};
  for (const [name, c] of Object.entries(j)) {
    if (name === '_rest') continue;
    const tracks = Object.entries(c.q).map(([bone, v]) => new THREE.QuaternionKeyframeTrack(bone + '.quaternion', c.t, v));
    CLIPS[name] = new THREE.AnimationClip(name, c.d, tracks);
  }
  return true;
}
export const ready = () => !!BASE;

const DEF = { skin: 0xc99a78, hair: 0x17100b, hairStyle: 0, mustache: 1, beard: 0, shirt: 0x2a5a8a, vest: 0, pants: 0x23232a, cap: 0, glasses: 0 };
const _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _v = new THREE.Vector3();
const X = new THREE.Vector3(1, 0, 0), Y = new THREE.Vector3(0, 1, 0), Z = new THREE.Vector3(0, 0, 1);
const col = c => new THREE.Color(c);
// renkler doku üstüne çarpılır; açık doku için rengi biraz aç
const tint = (c, k = 1.35) => { const x = col(c); x.r = Math.min(1, x.r * k + 0.04); x.g = Math.min(1, x.g * k + 0.04); x.b = Math.min(1, x.b * k + 0.04); return x; };

export function createAvatar(look, opts = {}) {
  const o = Object.assign({}, DEF, look);
  const root = new THREE.Group();
  const model = SU.clone(BASE); root.add(model);
  const B = {}; model.traverse(n => { if (n.isBone) B[n.name] = n; });
  const mats = {};
  model.traverse(n => {
    if (!n.isMesh) return;
    n.material = n.material.clone(); mats[n.name] = n.material;
    if (n.name === 'Wolf3D_Headwear') n.visible = true;
  });
  let applyLook = function (l) {
    Object.assign(o, l || {});
    const d0 = col(DEF.skin), c0 = col(o.skin), sk = new THREE.Color(Math.min(1.25, c0.r / d0.r), Math.min(1.25, c0.g / d0.g), Math.min(1.25, c0.b / d0.b));
    if (mats.Wolf3D_Head) mats.Wolf3D_Head.color.copy(sk); if (mats.Wolf3D_Body) mats.Wolf3D_Body.color.copy(sk);
    if (mats.Wolf3D_Outfit_Top) mats.Wolf3D_Outfit_Top.color.copy(tint(o.shirt));
    if (mats.Wolf3D_Outfit_Bottom) mats.Wolf3D_Outfit_Bottom.color.copy(tint(o.pants));
    if (mats.Wolf3D_Beard) { mats.Wolf3D_Beard.color.copy(tint(o.hair, 2.2)); }
    const hw = model.getObjectByName('Wolf3D_Headwear'); if (hw) { hw.visible = !!o.cap; if (o.cap) mats.Wolf3D_Headwear.color.copy(tint(o.cap, 1.6)); }
    const beard = model.getObjectByName('Wolf3D_Beard'); if (beard) beard.visible = !!(o.mustache || o.beard);
  };
  // saç (şapka yokken)
  const hairG = new THREE.Group(); if (B.Head) B.Head.add(hairG);
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x17100b, roughness: 0.85 });
  function buildHair() {
    hairG.clear(); hairMat.color.copy(col(o.hair));
    if (o.cap || o.hairStyle === 1) return;
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 14, 0, Math.PI * 2, 0, Math.PI * (o.hairStyle === 2 ? 0.62 : 0.5)), hairMat);
    cap.position.set(0, HY - 0.006, 0.014); cap.scale.set(1.02, o.hairStyle === 3 ? 1.02 : 0.9, 1.13); cap.rotation.x = 0.05; hairG.add(cap);
    if (o.hairStyle === 2) { const back = new THREE.Mesh(new THREE.SphereGeometry(0.095, 18, 10, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.4), hairMat); back.position.set(0, HY - 0.06, -0.035); back.scale.set(1, 1.3, 0.9); hairG.add(back); }
    if (o.hairStyle === 3) for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, c = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), hairMat); c.position.set(Math.cos(a) * 0.088, HY + 0.035 + Math.sin(i * 1.7) * 0.012, Math.sin(a) * 0.09 - 0.02); hairG.add(c); }
  }
  const HY = 0.118;
  const _look = applyLook; applyLook = l => { _look(l); buildHair(); };
  applyLook();
  // eldeki çay bardağı
  const cup = new THREE.Group(); {
    const gm = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05, transparent: true, opacity: 0.35, depthWrite: false });
    const g = new THREE.Mesh(new THREE.LatheGeometry([[0.001, 0], [0.026, 0], [0.03, 0.02], [0.022, 0.04], [0.024, 0.06], [0.033, 0.085], [0.034, 0.09]].map(p => new THREE.Vector2(p[0], p[1])), 14), gm);
    const t = new THREE.Mesh(new THREE.LatheGeometry([[0.001, 0.002], [0.024, 0.002], [0.028, 0.02], [0.02, 0.04], [0.022, 0.06], [0.029, 0.078], [0.001, 0.078]].map(p => new THREE.Vector2(p[0], p[1])), 12), new THREE.MeshStandardMaterial({ color: 0x6e2208, roughness: 0.12 }));
    cup.add(g, t); cup.userData.tea = t;
  }
  if (B.RightHand) { B.RightHand.add(cup); cup.position.set(0.02, 0.09, 0.04); cup.rotation.set(0, 0, -Math.PI / 2); cup.scale.setScalar(1.0); }
  cup.visible = false;
  // gölge lekesi
  if (opts.blob) { const s = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.75), new THREE.MeshBasicMaterial({ map: opts.blob, transparent: true, depthWrite: false })); s.rotation.x = -Math.PI / 2; s.position.y = 0.006; root.add(s); root.userData.shadow = s; }

  const mixer = new THREE.AnimationMixer(model);
  const acts = {}; for (const k in CLIPS) { acts[k] = mixer.clipAction(CLIPS[k]); }
  let cur = null, mode = 'idle', act = null, actP = 0, actDur = 1;
  function play(name, fade = 0.3) {
    const a = acts[name]; if (!a || a === cur) return;
    a.reset().setEffectiveWeight(1).fadeIn(fade).play(); if (cur) cur.fadeOut(fade); cur = a;
  }
  play('idle', 0); mixer.setTime(Math.random() * 3);
  const hip0 = B.Hips.position.clone();
  // kemiği dünya ekseni etrafında döndür (karakterin kendi yönüne göre)
  const rotW = (bone, axis, ang) => {
    if (!bone || !ang) return;
    bone.updateWorldMatrix(true, false);
    const pw = bone.parent.getWorldQuaternion(_q2);
    const w = bone.getWorldQuaternion(_q);
    const ax = _v.copy(axis).applyQuaternion(root.getWorldQuaternion(new THREE.Quaternion())).normalize();
    w.premultiply(new THREE.Quaternion().setFromAxisAngle(ax, ang));
    bone.quaternion.copy(pw.invert().multiply(w));
    bone.updateMatrixWorld(true);
  };
  let speed = 0, sitH = 0.5, sitK = 0, look_ = 0;
  function update(dt) {
    mixer.update(dt);
    // oturma: kalça aşağı, uyluklar öne, dizler aşağı
    const wantSit = mode === 'sit' ? 1 : 0; sitK += (wantSit - sitK) * Math.min(1, dt * 8);
    if (sitK > 0.01) {
      const k = sitK;
      B.Hips.position.y = hip0.y - (hip0.y - (sitH + 0.08) / model.scale.y) * k;
      rotW(B.LeftUpLeg, X, -1.5 * k); rotW(B.RightUpLeg, X, -1.5 * k);
      rotW(B.LeftLeg, X, 1.45 * k); rotW(B.RightLeg, X, 1.45 * k);
      rotW(B.LeftFoot, X, 0.1 * k); rotW(B.RightFoot, X, 0.1 * k);
      rotW(B.Spine, X, 0.06 * k);
      // kollar masada
      if (!act) { rotW(B.LeftArm, Z, -0.55 * k); rotW(B.RightArm, Z, 0.55 * k); rotW(B.LeftArm, X, -0.55 * k); rotW(B.RightArm, X, -0.55 * k); rotW(B.LeftForeArm, X, -0.9 * k); rotW(B.RightForeArm, X, -0.9 * k); }
    } else B.Hips.position.y = hip0.y;
    // eylemler: yudum / nargile çekme / el sallama
    if (act) {
      actP += dt * 1000 / actDur; const t = actP; if (t >= 1) { act = null; }
      else {
        const e = Math.sin(Math.min(1, t) * Math.PI);
        if (act === 'sip' || act === 'pull') {
          rotW(B.RightArm, Z, 0.75 * (1 - e * 0.2)); rotW(B.RightArm, X, -0.75 - e * 0.55);
          rotW(B.RightForeArm, X, -1.2 - e * 0.9); rotW(B.RightForeArm, Y, 0.35 * e);
          rotW(B.Head, X, act === 'sip' ? -0.22 * e : -0.06 * e);
        } else if (act === 'wave') {
          rotW(B.RightArm, Z, 1.9 * e); rotW(B.RightForeArm, Z, 0.9 * e + Math.sin(t * 22) * 0.35 * e);
        }
      }
    }
    if (cup.visible && !act && mode !== 'sit') { rotW(B.RightArm, X, -0.35); rotW(B.RightForeArm, X, -1.1); }
    if (look_) rotW(B.Head, Y, look_);
    if (root.userData.shadow) root.userData.shadow.visible = sitK < 0.5;
  }
  function setMode(m, sp = 0, h = 0.5) {
    mode = m; speed = sp; sitH = h;
    if (m === 'sit') play('idle', 0.25);
    else if (m === 'walk') { play(sp > 2.4 ? 'run' : 'walk', 0.25); if (cur) cur.timeScale = sp > 2.4 ? sp / 3.4 : Math.max(0.6, sp / 1.45); }
    else play('idle', 0.3);
  }
  function doAct(name, dur) { act = name; actP = 0; actDur = dur || (name === 'sip' ? 1500 : name === 'pull' ? 1900 : 1600); if (name === 'nod') { acts.agree && acts.agree.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.2).play(); act = null; } }
  return { root, model, bones: B, cup, update, setMode, act: doAct, look: applyLook, get mode() { return mode; }, set headYaw(v) { look_ = v; }, get acting() { return !!act; }, dispose() { mixer.stopAllAction(); model.traverse(n => { if (n.isMesh) n.material.dispose(); }); } };
}
