/* Gönül Plak · online oyun bağlantısı (Bilardo + Okey)
   Sunucu kurmadan çalışsın diye herkese açık MQTT köprüleri (WebSocket) kullanılır; mesajlar oda koduna özel bir konuda gider.
   Ev sahibi (odayı kuran) oyunun hakemidir: kurallar onun cihazında işler, diğerleri hamlesini gönderir.
   Test için ?nettest=1: aynı tarayıcıdaki sekmeler arasında BroadcastChannel kullanılır. */
(function () {
  'use strict';
  var BROKERS = ['wss://broker.emqx.io:8084/mqtt', 'wss://broker.hivemq.com:8884/mqtt', 'wss://test.mosquitto.org:8081/mqtt'];
  var LIB = 'https://unpkg.com/mqtt@5.10.1/dist/mqtt.min.js';
  var ABC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var TEST = /[?&]nettest=1/.test(location.search);

  function rid(n) { var s = ''; for (var i = 0; i < n; i++) s += ABC[(Math.random() * ABC.length) | 0]; return s; }
  function loadLib() {
    if (window.mqtt) return Promise.resolve();
    return new Promise(function (res, rej) {
      var s = document.createElement('script'); s.src = LIB; s.async = true;
      s.onload = function () { window.mqtt ? res() : rej(new Error('lib')); };
      s.onerror = function () { rej(new Error('İnternet bağlantısı yok')); };
      document.head.appendChild(s);
    });
  }
  // tek bir taşıyıcı: {send(obj), close()} ; onmsg(obj)
  function openBroker(idx, topic, onmsg) {
    return loadLib().then(function () {
      return new Promise(function (res, rej) {
        var done = false;
        var c = window.mqtt.connect(BROKERS[idx], { clientId: 'gp_' + rid(10), keepalive: 30, reconnectPeriod: 2500, connectTimeout: 7000, clean: true });
        var to = setTimeout(function () { if (!done) { done = true; try { c.end(true); } catch (e) {} rej(new Error('zaman aşımı')); } }, 8000);
        c.on('connect', function () {
          c.subscribe(topic, { qos: 0 }, function (err) {
            if (done) return; done = true; clearTimeout(to);
            if (err) { try { c.end(true); } catch (e) {} return rej(err); }
            res({ send: function (o) { try { c.publish(topic, JSON.stringify(o), { qos: 0 }); } catch (e) {} }, close: function () { try { c.end(true); } catch (e) {} }, raw: c });
          });
        });
        c.on('message', function (t, m) { try { onmsg(JSON.parse(m.toString())); } catch (e) {} });
        c.on('error', function () { if (!done) { done = true; clearTimeout(to); try { c.end(true); } catch (e) {} rej(new Error('bağlanamadı')); } });
      });
    });
  }
  function openTest(topic, onmsg) {
    var bc = new BroadcastChannel(topic);
    bc.onmessage = function (e) { onmsg(e.data); };
    return Promise.resolve({ send: function (o) { bc.postMessage(o); onmsg(o); }, close: function () { bc.close(); } });
  }

  /* Oda: host(game, opts) / join(game, code, opts)
     opts: { name, max, onPeers(list), onMsg(type, data, fromPeer), onStatus(text), onClose(reason) }
     peers: [{ id, name, seat, host }] — seat 0 ev sahibi */
  function Room(game, opts) {
    this.game = game; this.o = opts || {}; this.id = rid(8); this.name = (opts && opts.name) || 'Oyuncu';
    this.peers = []; this.seen = {}; this.tx = null; this.code = ''; this.isHost = false; this.alive = true; this.lastHost = Date.now();
  }
  Room.prototype._open = function (code, brokerIdx) {
    var self = this; this.code = code;
    var topic = 'gonulplak/v2/' + this.game + '/' + code;
    var onm = function (m) { self._recv(m); };
    return (TEST ? openTest(topic, onm) : openBroker(brokerIdx, topic, onm)).then(function (tx) {
      self.tx = tx;
      self.hb = setInterval(function () { self._beat(); }, 4000);
      return self;
    });
  };
  Room.prototype._send = function (o) { o.f = this.id; o.k = rid(6); if (this.tx) this.tx.send(o); };
  Room.prototype.send = function (type, data, to) { this._send({ t: type, d: data, to: to || null }); };
  Room.prototype._recv = function (m) {
    if (!m || !m.f || !this.alive) return;
    if (m.k) { if (this.seen[m.k]) return; this.seen[m.k] = 1; }
    if (m.to && m.to !== this.id) return;
    var self = this, from = this.peers.find(function (p) { return p.id === m.f; });
    if (from) from.last = Date.now();
    if (m.t === '_hello') {
      if (!this.isHost) return;
      if (m.f === this.id) return;
      if (!from) {
        var max = this.o.max || 2;
        if (this.peers.length >= max || this.locked) { this._send({ t: '_full', to: m.f }); return; }
        var used = this.peers.map(function (p) { return p.seat; }), seat = 1; while (used.indexOf(seat) >= 0) seat++;
        from = { id: m.f, name: String(m.d && m.d.name || 'Oyuncu').slice(0, 18), seat: seat, last: Date.now() };
        this.peers.push(from);
      }
      this._send({ t: '_peers', d: this.peers.map(function (p) { return { id: p.id, name: p.name, seat: p.seat }; }) });
      if (this.o.onPeers) this.o.onPeers(this.peers.slice());
      return;
    }
    if (m.t === '_peers') {
      if (this.isHost) return;
      this.lastHost = Date.now();
      var me = m.d.find(function (p) { return p.id === self.id; });
      this.peers = m.d.map(function (p) { return { id: p.id, name: p.name, seat: p.seat, last: Date.now() }; });
      this.seat = me ? me.seat : -1;
      if (this._joinRes && me) { var r = this._joinRes; this._joinRes = null; r(this); }
      if (this.o.onPeers) this.o.onPeers(this.peers.slice());
      return;
    }
    if (m.t === '_full') { if (this._joinRej) { var j = this._joinRej; this._joinRej = null; j(new Error('Oda dolu ya da oyun başladı')); } return; }
    if (m.t === '_bye') { this._drop(m.f, 'ayrıldı'); return; }
    if (m.t === '_beat') { if (!this.isHost && from && from.seat === 0) this.lastHost = Date.now(); return; }
    if (m.f === this.id) return;
    if (!from && m.t.charAt(0) !== '_') return;
    if (from && from.seat === 0) this.lastHost = Date.now();
    if (this.o.onMsg) this.o.onMsg(m.t, m.d, from);
  };
  Room.prototype._beat = function () {
    if (!this.alive) return;
    this._send({ t: '_beat' });
    var now = Date.now(), self = this;
    if (this.isHost) {
      this.peers.filter(function (p) { return p.seat !== 0 && now - (p.last || now) > 20000; }).forEach(function (p) { self._drop(p.id, 'bağlantısı koptu'); });
    } else if (this.seat >= 0 && now - this.lastHost > 20000) {
      this.close('Oda sahibinin bağlantısı koptu');
    }
  };
  Room.prototype._drop = function (id, why) {
    var i = this.peers.findIndex(function (p) { return p.id === id; }); if (i < 0) return;
    var p = this.peers[i];
    if (p.seat === 0 && !this.isHost) { this.close('Oda sahibi ' + why); return; }
    this.peers.splice(i, 1);
    if (this.isHost) this._send({ t: '_peers', d: this.peers.map(function (q) { return { id: q.id, name: q.name, seat: q.seat }; }) });
    if (this.o.onPeers) this.o.onPeers(this.peers.slice());
    if (this.o.onLeave) this.o.onLeave(p, why);
  };
  Room.prototype.close = function (reason) {
    if (!this.alive) return; this.alive = false;
    try { this._send({ t: '_bye' }); } catch (e) {}
    clearInterval(this.hb);
    var tx = this.tx; setTimeout(function () { if (tx) tx.close(); }, 300);
    if (reason && this.o.onClose) this.o.onClose(reason);
  };
  Room.prototype.lock = function (v) { this.locked = v !== false; };
  Room.prototype.link = function () {
    var base;
    try { base = new URL('index.html', (window.parent !== window ? window.parent.location.href : location.href)); } catch (e) { base = new URL('index.html', location.href); }
    base.search = '?oyun=' + this.game + '&oda=' + this.code;
    return base.href;
  };

  function host(game, opts) {
    var r = new Room(game, opts); r.isHost = true; r.seat = 0;
    r.peers = [{ id: r.id, name: r.name, seat: 0, last: Date.now() }];
    var tryB = function (i) {
      var code = rid(4) + (i + 1);
      return r._open(code, i).catch(function (e) { if (i + 1 < BROKERS.length && !TEST) return tryB(i + 1); throw e; });
    };
    return tryB(0).then(function () { if (opts.onPeers) opts.onPeers(r.peers.slice()); return r; });
  }
  function join(game, code, opts) {
    code = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (code.length !== 5) return Promise.reject(new Error('Oda kodu 5 karakter olmalı'));
    var bi = Math.max(0, Math.min(BROKERS.length - 1, (+code.charAt(4) || 1) - 1));
    var r = new Room(game, opts); r.seat = -1;
    return r._open(code, bi).then(function () {
      return new Promise(function (res, rej) {
        r._joinRes = res; r._joinRej = rej;
        var n = 0, hello = function () { if (!r._joinRes) return; if (n++ > 6) { r._joinRes = null; r.close(); rej(new Error('Oda bulunamadı. Kodu kontrol et; oda sahibi oyunda mı?')); return; } r._send({ t: '_hello', d: { name: r.name } }); setTimeout(hello, 1500); };
        hello();
      });
    });
  }
  window.GPNet = { host: host, join: join, test: TEST };
})();
