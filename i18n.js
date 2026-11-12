/* Gönül Plak — ikinci dil (Deutsch).
   Uygulamanın metinleri Türkçe yazılı; Almanca seçilince ekrana çıkan her yazı burada çevrilir.
   Dil seçimi: Ben sekmesi → Uygulama → Dil / Sprache (localStorage: gp_lang). */
(function () {
  'use strict';
  var lang = 'tr';
  try { lang = localStorage.getItem('gp_lang') || 'tr'; } catch (e) {}
  window.GP_LANG = lang;
  window.gpSetLang = function (l) { try { localStorage.setItem('gp_lang', l); } catch (e) {} location.reload(); };
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('[data-lang]');
    if (b && b.getAttribute('data-lang') !== lang) window.gpSetLang(b.getAttribute('data-lang'));
  }, true);
  window.gpT = function (s) { return s; };
  if (lang !== 'de') return;
  document.documentElement.lang = 'de';

  var D = {
    /* ---------- index.html ---------- */
    "30 dk sonra kapat": "In 30 Min ausschalten", "Arşive ekle": "Zum Archiv hinzufügen", "Bir şey yaz…": "Schreib etwas…", "Doğal vokal": "Natürliche Stimme",
    "Döngüyü kaldır": "Schleife entfernen", "Efektleri uygula": "Effekte anwenden", "Ekolayzır": "Equalizer", "Gönder": "Senden", "Karışık": "Zufall",
    "Ses dalgası: sağa sola kaydırarak şarkıda ilerle": "Wellenform: nach links/rechts wischen, um im Lied zu springen", "Sonraki": "Weiter", "Sırala": "Sortieren", "Tekrarla": "Wiederholen",
    "VU metre": "VU-Meter", "Yakınlaştır": "Zoomen", "Çal": "Abspielen", "Çal/Duraklat": "Abspielen/Pause", "Duraklat": "Pause", "Ön kazancı sıfırla": "Vorverstärkung zurücksetzen", "Ön kazanç": "Vorverstärkung",
    "Önceki": "Zurück", "İstasyon ara (ör. Zuffenhausen)": "Station suchen (z. B. Zuffenhausen)", "İşaret koy": "Marker setzen", "Şarkı ekle": "Lied hinzufügen",
    "Şarkı, sanatçı, albüm": "Lied, Künstler, Album", "Şarkıda ilerle": "Im Lied springen", "Ad ile sanatçıyı yer değiştir": "Titel und Künstler tauschen", "Albüm": "Album",
    "Arşiv": "Archiv", "Arşive de ekle": "Auch ins Archiv", "Arşivi": "Archiv", "Ben": "Ich", "Bilardo": "Billard", "Bitti": "Fertig", "Bu şarkının hikâyesi": "Die Geschichte dieses Lieds",
    "Buruğum, liste kur": "Mir ist schwer ums Herz, mach eine Liste", "Bölümleri ve modları sırala": "Bereiche und Modi sortieren", "Bütün istasyonlar": "Alle Stationen",
    "Dertleşelim": "Lass uns reden", "Dinleme karnem": "Mein Hörzeugnis", "Dışa aktar": "Exportieren", "Efektler": "Effekte", "Gece lambası": "Nachtlicht",
    "Hepsini sıfırla": "Alles zurücksetzen", "Kapak seç": "Cover wählen", "Kapat": "Schließen", "Kapağı ayarla": "Cover zuschneiden", "Kapağı kaldır": "Cover entfernen",
    "Kaset": "Kassette", "Kaset etiketi": "Kassettenetikett", "Kaset rafı": "Kassettenregal", "Kaydet": "Speichern", "Kaydet / Paylaş": "Speichern / Teilen", "Kullan": "Verwenden",
    "Liste": "Liste", "Listeler": "Listen", "Modlar": "Modi", "Plak koy, gönlünü aç": "Leg eine Platte auf, öffne dein Herz", "Plak rafı": "Plattenregal",
    "Saate göre ne dinleyeyim?": "Was soll ich um diese Zeit hören?", "Sanatçı": "Künstler", "Ses masası": "Mischpult",
    "Spotify şarkı dosyası vermiyor. Listenin adları, sanatçıları ve kapakları gelir; elindeki dosyalarla otomatik eşleşir.": "Spotify gibt keine Audiodateien heraus. Titel, Künstler und Cover der Liste werden übernommen und automatisch mit deinen Dateien verknüpft.",
    "Spotify'dan bilgi ve kapak bul": "Infos und Cover bei Spotify suchen", "Spotify'dan liste aktar": "Liste aus Spotify importieren",
    "Sürükleyerek kaydır, iki parmakla ya da alttaki çubukla yakınlaştır.": "Zum Verschieben ziehen, mit zwei Fingern oder dem Regler unten zoomen.",
    "Sıralama modu: okları kullan": "Sortiermodus: Pfeile benutzen", "Tempo, ton, yankı, eko, ekolayzır ve diğer efektler dosyaya işlenir": "Tempo, Tonhöhe, Hall, Echo, Equalizer und andere Effekte werden in die Datei gerechnet",
    "Ton değişince ses karakteri korunur": "Die Stimmfarbe bleibt beim Ändern der Tonhöhe erhalten", "Vazgeç": "Abbrechen", "Yeni hali ayrı bir şarkı olarak listende görünür": "Die neue Version erscheint als eigenes Lied in deiner Liste",
    "Yıl": "Jahr", "gönlümün": "meines Herzens", "ince ayar": "Feinabstimmung", "kaderimin kaseti": "die Kassette meines Schicksals", "kontroller için ekrana dokun": "Für Bedienelemente den Bildschirm antippen",
    "yankı, cızırtı, gazino": "Hall, Knistern, Gazino", "çay demlendi, anlat bakalım": "Der Çay ist fertig, erzähl mal", "Şarkı adı": "Titel", "Şarkıyı sil": "Lied löschen", "şarkı seç": "Lied wählen",
    /* ---------- oynatıcı / arşiv ---------- */
    "İsimsiz şarkı": "Unbenanntes Lied", "Devamı hazırlanıyor…": "Der Rest wird vorbereitet…", "Uygulanıyor…": "Wird angewendet…", "Ses hazırlanıyor…": "Ton wird vorbereitet…",
    "Bulut bağlantısı kurulamadı": "Keine Verbindung zur Cloud", "Değişiklik buluta yazılamadı": "Änderung konnte nicht in die Cloud geschrieben werden", "Eşitleniyor…": "Synchronisiere…", "Eşitleniyor": "Synchronisiere",
    "Bulutla eşit": "Mit der Cloud synchron", "Eşitleme hatası": "Synchronisierungsfehler", "Spotify girişi reddedildi": "Spotify-Anmeldung abgelehnt", "Spotify bağlantısı iptal edildi": "Spotify-Verbindung abgebrochen",
    "Spotify bağlandı": "Spotify verbunden", "Spotify bağlanamadı. Redirect adresini kontrol et.": "Spotify konnte nicht verbunden werden. Prüfe die Redirect-Adresse.", "Spotify bağlı değil": "Spotify ist nicht verbunden",
    "Spotify hatası": "Spotify-Fehler", "Bu şarkının Spotify bilgisi yok": "Zu diesem Lied gibt es keine Spotify-Daten", "Spotify'da çalmak için Premium gerekli": "Zum Abspielen in Spotify brauchst du Premium",
    "Spotify limiti doldu, biraz sonra tekrar dene": "Spotify-Limit erreicht, versuch es gleich nochmal",
    "sabah": "Morgen", "gündüz": "Tag", "gün batımı": "Sonnenuntergang", "akşam": "Abend", "gece": "Nacht", "kapalı sabah": "bedeckter Morgen", "kapalı gündüz": "bedeckter Tag", "kapalı akşam": "bedeckter Abend", "kapalı gece": "bedeckte Nacht",
    "Sabah": "Morgen", "Gündüz": "Tag", "Gün batımı": "Sonnenuntergang", "Akşam": "Abend", "Gece": "Nacht", "Dolunay": "Vollmond", "Kapalı hava": "Bedeckt", "dolunay gecesi": "Vollmondnacht",
    "açık": "klar", "az bulutlu": "leicht bewölkt", "parçalı bulutlu": "wolkig", "kapalı": "aus", "sisli": "neblig", "çiseliyor": "Nieselregen", "yağmurlu": "Regen", "karlı": "Schnee", "sağanak": "Schauer", "kar yağışlı": "Schneefall", "fırtınalı": "Gewitter",
    "Kaset takılıyor": "Kassette wird eingelegt", "Bu şarkının dosyası bu cihazda yok": "Die Datei dieses Lieds ist nicht auf diesem Gerät", "Ses motoru açılamadı. Uygulamayı kapatıp yeniden aç.": "Die Audio-Engine startet nicht. Schließ die App und öffne sie neu.",
    "Şarkı açılamadı. Dosya bozuk ya da desteklenmiyor.": "Lied lässt sich nicht öffnen. Die Datei ist beschädigt oder wird nicht unterstützt.", "Buluttan indiriliyor": "Wird aus der Cloud geladen",
    "iPhone için hazırlamalı motora geçildi. Ton, yankı ve EQ çalışır; ayar değişince ses bir saniyede güncellenir.": "Für das iPhone wurde auf die vorbereitende Engine umgeschaltet. Tonhöhe, Hall und EQ funktionieren; nach einer Änderung aktualisiert sich der Ton in einer Sekunde.",
    "Bilinmeyen sanatçı": "Unbekannter Künstler", "bilinmeyen sanatçı": "unbekannter Künstler", "arşivden bir şarkı seç": "wähl ein Lied aus dem Archiv", "Henüz kaset takılmadı": "Noch keine Kassette eingelegt",
    "Arşivden bir şarkıya dokun": "Tipp im Archiv auf ein Lied", "Bu şarkı tekrar çalacak": "Dieses Lied läuft nochmal", "Sırada: karışık": "Als Nächstes: Zufall", "Sırada:": "Als Nächstes:",
    "canlı motor": "Live-Engine", "hazırlamalı motor": "vorbereitende Engine", "Arşivin bomboş": "Dein Archiv ist leer",
    "Telefondaki MP3, M4A veya WAV şarkılarını ekle. İçlerinde yazan ad, sanatçı, albüm ve kapak otomatik okunur.": "Füg MP3-, M4A- oder WAV-Lieder von deinem Handy hinzu. Titel, Künstler, Album und Cover werden automatisch ausgelesen.",
    "Seçenekler": "Optionen", "Geri": "Zurück", "Listeyi paylaş (link)": "Liste teilen (Link)", "Listeyi sil": "Liste löschen", "Spotify'da çal": "In Spotify abspielen", "Dosya ekle": "Datei hinzufügen",
    "Spotify'dan aktar": "Aus Spotify importieren", "Spotify'ı bağla": "Spotify verbinden", "Henüz liste yok": "Noch keine Liste",
    "Spotify'ı bağla; listelerin ve beğendiklerin ad, sanatçı ve kapaklarıyla gelsin. Arşivindeki şarkılar otomatik eşleşir.": "Verbinde Spotify, dann kommen deine Listen und Lieblingslieder mit Titel, Künstler und Cover. Lieder aus deinem Archiv werden automatisch zugeordnet.",
    "Spotify listelerini getirmek için rehberdeki Spotify adımını yapıp config.js dosyasına Client ID'yi yaz.": "Um Spotify-Listen zu holen, mach den Spotify-Schritt aus der Anleitung und trag die Client ID in config.js ein.",
    "derdimin": "meines Kummers", "Listeleri": "Listen",
    /* ---------- Ben ---------- */
    "Bulut henüz kurulmadı. Rehberdeki Supabase adımını yapıp config.js dosyasına adresi ve anahtarı yazınca burada giriş ekranı çıkar.": "Die Cloud ist noch nicht eingerichtet. Mach den Supabase-Schritt aus der Anleitung und trag Adresse und Schlüssel in config.js ein, dann erscheint hier die Anmeldung.",
    "Giriş yapıldı:": "Angemeldet:", "Şimdi eşitle": "Jetzt synchronisieren", "Çıkış yap": "Abmelden",
    "Giriş yaparsan şarkıların bilgileri ve kapaklarıyla buluta yedeklenir, telefon değişse de kaybolmaz.": "Wenn du dich anmeldest, werden deine Lieder mit Infos und Covern in der Cloud gesichert und gehen auch bei einem Handywechsel nicht verloren.",
    "E-posta": "E-Mail", "Şifre (en az 6 karakter)": "Passwort (mind. 6 Zeichen)", "Giriş yap": "Anmelden", "Hesap oluştur": "Konto erstellen",
    "Spotify bağlantısı için rehberdeki Spotify adımını yapıp Client ID'yi config.js'e yaz.": "Für die Spotify-Verbindung mach den Spotify-Schritt aus der Anleitung und trag die Client ID in config.js ein.",
    "Bağlı hesap:": "Verbundenes Konto:", "Liste aktar": "Liste importieren", "Bağlantıyı kes": "Verbindung trennen",
    "Listelerini ve beğendiklerini getirir, şarkılarına doğru ad ve kapak bulur.": "Holt deine Listen und Lieblingslieder und findet passende Titel und Cover für deine Lieder.",
    "hesabım": "mein Konto", "Bulut": "Cloud",
    "Şarkılara laf atan, seninle dertleşen, istersen kaseti senin yerine yöneten yapay zekâ (Claude). Anahtar sadece bu telefonda saklanır.": "Eine KI (Claude), die Lieder kommentiert, mit dir plaudert und auf Wunsch die Kassette für dich steuert. Der Schlüssel wird nur auf diesem Handy gespeichert.",
    "Claude API anahtarı": "Claude-API-Schlüssel", "Kaydet ve dene": "Speichern und testen", "Zekâ": "Intelligenz", "Akıllı (Sonnet)": "Schlau (Sonnet)", "Hızlı ve ucuz (Haiku)": "Schnell und günstig (Haiku)",
    "Akıllı: daha derin sohbet, mesaj başı ~0,6 cent. Hızlı: ~0,05 cent. Şarkı başı yorumları her zaman hızlı modelle yapılır.": "Schlau: tiefere Gespräche, ca. 0,6 Cent pro Nachricht. Schnell: ca. 0,05 Cent. Kommentare zu Liedern kommen immer vom schnellen Modell.",
    "İnternetten bilgi baksın": "Im Internet nachschauen", "Şarkı ve sanatçı bilgisini doğrular, kaynak gösterir. Arama başına ~1 cent.": "Prüft Infos zu Lied und Künstler und nennt Quellen. Ca. 1 Cent pro Suche.", "İnternet araması": "Internetsuche",
    "Şarkı başlayınca laf atsın": "Beim Liedstart etwas sagen", "Her şarkıya bir kez, kısa": "Einmal pro Lied, kurz", "Otomatik yorum": "Automatischer Kommentar",
    "Gönül Dostu'nun seninle ilgili notları": "Gönül Dostus Notizen über dich", "Sohbet geçmişini temizle": "Chatverlauf löschen", "Stuttgart manzarası": "Stuttgart-Panorama",
    "Canlı Stuttgart havası": "Live-Wetter aus Stuttgart", "Yağmur yağıyorsa manzarada da yağar · Hava verisi: Open-Meteo": "Wenn es regnet, regnet es auch im Panorama · Wetterdaten: Open-Meteo", "Canlı hava": "Live-Wetter",
    "Hareketli manzara": "Bewegtes Panorama", "Ara sıra yoldan araba geçer, gökten uçak süzülür, kuşlar uçar": "Ab und zu fährt ein Auto vorbei, ein Flugzeug zieht vorüber, Vögel fliegen",
    "Kaset ekranında": "Auf dem Kassettenbildschirm", "Özel günler (kendiliğinden gelir; 1 dakikalık önizleme)": "Besondere Tage (kommen von selbst; 1 Minute Vorschau)",
    "Weihnachtsmarkt 26 Kasım–23 Aralık, Silvester 31 Aralık akşamı, Wasen ilkbahar ve sonbahar şenliklerinde. Akşam ve gece sahnesinde görünür.": "Weihnachtsmarkt 26. November–23. Dezember, Silvester am Abend des 31. Dezember, Wasen zum Frühlings- und Volksfest. Sichtbar in der Abend- und Nachtszene.",
    "Fernsehturm ritme göre parlasın": "Fernsehturm leuchtet im Takt", "Akşam ve gece sahnesinde kulenin ışığı çalan şarkının vuruşlarıyla yanıp söner": "In der Abend- und Nachtszene blinkt das Turmlicht im Rhythmus des Lieds", "Ritme göre Fernsehturm": "Fernsehturm im Takt",
    "Ses motoru": "Audio-Engine", "Sadece canlı motor çalışır: ayarlar anında duyulur. Ses takılırsa uygulama motoru kendisi tazeler, hazırlamalı motora geçmez.": "Es läuft nur die Live-Engine: Einstellungen hörst du sofort. Wenn der Ton hängt, startet die App die Engine selbst neu.",
    "Teknik bilgiyi kopyala": "Technische Infos kopieren", "Uygulama": "App", "Sürüm": "Version", "Güncellemeyi kontrol et": "Nach Update suchen", "Anahtarı sil": "Schlüssel löschen",
    "Henüz not yok. Sohbet ettikçe sevdiklerini öğrenip not alır.": "Noch keine Notizen. Beim Plaudern lernt er, was du magst, und merkt es sich.", "Gerçek saat ve hava": "Echte Uhrzeit und Wetter", "Kapalı": "Aus",
    "Araba geçsin": "Autos", "Uçak geçsin": "Flugzeuge", "Kuşlar": "Vögel", "Plak": "Platte", "plak": "Platte", "(hazır)": "(bereit)",
    /* ---------- S-Bahn ---------- */
    "Durak bulunamadı": "Haltestelle nicht gefunden", "Stammstrecke yine dertli. Trenler de gönül gibi, gelmiyor 🥀": "Die Stammstrecke hat wieder Kummer. Die Züge sind wie das Herz: sie kommen nicht 🥀",
    "Bir hat aksıyor. Bekleyene \"Bekle Beni\" çalsın.": "Eine Linie hakt. Für alle Wartenden: \"Bekle Beni\".", "Hafif rötar var, bir şarkı boyu gecikme.": "Leichte Verspätung, etwa ein Lied lang.",
    "Bugün trenler dakik. Kader bu sefer yüzüne güldü.": "Heute sind die Züge pünktlich. Das Schicksal meint es diesmal gut mit dir.", "Harita yüklenemedi": "Karte konnte nicht geladen werden",
    "Harita yüklenemedi. İnterneti kontrol et.": "Karte konnte nicht geladen werden. Prüf deine Internetverbindung.", "dakik": "pünktlich", "şimdi": "jetzt", "Önümüzdeki 20 dakikada gelecek trenler": "Züge der nächsten 20 Minuten",
    "yükleniyor…": "lädt…", "Yükleniyor…": "Lädt…", "20 dakika içinde tren yok": "Kein Zug in den nächsten 20 Minuten", "canlı": "live", "Yenile": "Aktualisieren", "Canlı harita": "Live-Karte",
    "Hat durumu": "Linienstatus", "yoldaki trenlere göre, şu an": "nach den Zügen, die gerade unterwegs sind", "iptal var": "Ausfall", "sefer yok": "keine Fahrt", "iptal": "Ausfall",
    "Şu an gösterilecek sefer yok": "Im Moment keine Fahrten", "Bu durak bulunamadı.": "Diese Haltestelle wurde nicht gefunden.",
    "Canlı veriye ulaşılamadı. İnternetini kontrol et, biraz sonra tekrar dene.": "Keine Live-Daten erreichbar. Prüf dein Internet und versuch es gleich nochmal.",
    "Harita için sefer bilgisi gelmedi.": "Keine Fahrtdaten für die Karte erhalten.", "Harita verisine ulaşılamadı.": "Kartendaten nicht erreichbar.", "İstasyonlar yükleniyor…": "Stationen werden geladen…", "Bulunamadı": "Nicht gefunden",
    "İstasyon listesi canlı veriden gelir; adını yazarak da arayabilirsin.": "Die Stationsliste kommt aus den Live-Daten; du kannst auch nach dem Namen suchen.", "Nereye gidiyorsun?": "Wohin fährst du?",
    "Yolculuk": "Fahrt", "varış süresine göre liste · inmeden 2 dk önce uyarı": "Liste passend zur Fahrzeit · Hinweis 2 Min vor dem Aussteigen", "Durak uyarısı": "Haltestellen-Hinweis", "Yolculuğu bitir": "Fahrt beenden",
    "Canlı ağ bilgisi gelince varış süresi hesaplanır. Şimdilik süreyi seç:": "Sobald Live-Netzdaten da sind, wird die Fahrzeit berechnet. Wähl vorerst die Dauer:", "Yolculuk bitti. İyi akşamlar.": "Fahrt beendet. Schönen Abend.", "Yolculuk bitti.": "Fahrt beendet.",
    /* ---------- ses masası ---------- */
    "Düz": "Neutral", "Arabesk vokal": "Arabesk-Gesang", "Bas": "Bass", "Bağlama": "Bağlama", "Keman": "Geige", "Telefon hoparlörü": "Handy-Lautsprecher",
    "Orijinal": "Original", "Olduğu gibi, katıksız": "So wie es ist, pur", "Yavaş, derin, gece üç": "Langsam, tief, drei Uhr nachts", "Gazino Gecesi": "Gazino-Nacht", "Sahne yankısı, hafif eko": "Bühnenhall, leichtes Echo",
    "Kubbede yankılanan ses": "Klang, der in der Kuppel hallt", "Eski Kaset": "Alte Kassette", "Bant titremesi, hışırtı": "Bandleiern, Rauschen", "45'lik Plak": "45er-Platte", "Cızırtı, sıcak ses": "Knistern, warmer Klang",
    "Dolmuş Teybi": "Dolmuş-Radio", "Küçük hoparlör, eski bant": "Kleiner Lautsprecher, altes Band", "Biraz ağır, biraz pes": "Etwas langsamer, etwas tiefer", "Ses başının etrafında döner": "Der Klang kreist um deinen Kopf",
    "Fernsehturm Tepesi": "Oben am Fernsehturm", "Şehrin üstünde, geniş ve derin": "Über der Stadt, weit und tief", "U-Bahn Gecesi": "U-Bahn-Nacht", "Yeraltında yankılanan uzak ses": "Ferner Klang, der im Untergrund hallt",
    "Neckar Kenarı": "Am Neckarufer", "Sakin, sudan gelen bir hüzün": "Ruhig, eine Wehmut vom Wasser her", "Hızlı ve tiz": "Schnell und hoch", "Ton": "Tonhöhe", "Yankı": "Hall", "Eko": "Echo",
    "Oda": "Raum", "Konser": "Konzert", "Odanın, gazinonun, hamamın sesi": "Der Klang von Raum, Gazino und Hamam", "Sesin dağlara çarpıp dönmesi": "Wie ein Ruf, der von den Bergen zurückkommt", "Süre": "Dauer", "Miktar": "Anteil", "Tekrar": "Wiederholung",
    "Eski kaset": "Alte Kassette", "Bant titremesi ve hışırtı": "Bandleiern und Rauschen", "Titreme": "Leiern", "Hışırtı": "Rauschen", "Plak cızırtısı": "Plattenknistern", "İğnenin plakta gezinmesi": "Die Nadel wandert über die Platte", "Seviye": "Pegel",
    "Dolmuş hoparlörü": "Dolmuş-Lautsprecher", "Küçük, cızırtılı teyp sesi": "Kleiner, knisternder Kassettenrekorder", "8D dönen ses": "8D-Rundumklang", "Kulaklıkla dinle": "Mit Kopfhörern hören", "Hız": "Tempo",
    "Vokal kesme": "Gesang absenken", "Vokali azaltır, sen söyle": "Dämpft den Gesang, du singst", "Havaya uy": "Passend zum Wetter", "Stuttgart'ta yağmur yağıyorsa arkada yağmur sesi": "Wenn es in Stuttgart regnet, hörst du Regen im Hintergrund", "Yağmur sesi": "Regengeräusch",
    "Bas ve tizler kesilir, ses küçük bir teypten geliyormuş gibi olur.": "Bässe und Höhen werden gekappt, es klingt wie aus einem kleinen Kassettenrekorder.", "Ön kazanç sıfırlandı": "Vorverstärkung zurückgesetzt", "Her şey sıfırlandı": "Alles zurückgesetzt", "Önce bir şarkı çal": "Spiel erst ein Lied ab",
    "+ Kaydet": "+ Speichern", "Kaydedildi": "Gespeichert", "Bu ekolayzır ayarına bir isim ver": "Gib dieser Equalizer-Einstellung einen Namen",
    /* ---------- menüler ---------- */
    "Etiketi ve kapağı düzenle": "Infos und Cover bearbeiten", "Sonra çal": "Als Nächstes spielen", "Sıraya ekle": "Zur Warteschlange", "Kaseti süsle": "Kassette gestalten", "Bu şarkının ses ayarlarını sıfırla": "Klangeinstellungen dieses Lieds zurücksetzen",
    "Emin misin? Tekrar bas": "Sicher? Nochmal tippen", "Silindi": "Gelöscht", "En yeni üstte": "Neueste zuerst", "Şarkı adına göre": "Nach Titel", "Sanatçıya göre": "Nach Künstler", "Şarkı okunuyor…": "Lied wird gelesen…",
    "Şarkı eşleşti, bilgileri ve kapağı işlendi": "Lied zugeordnet, Infos und Cover übernommen", "Bu resim açılamadı": "Dieses Bild lässt sich nicht öffnen", "Aranıyor…": "Suche…", "Doğru olana dokun:": "Tipp auf das richtige:",
    "Sonuç bulunamadı. Adı düzeltip tekrar dene.": "Nichts gefunden. Korrigier den Namen und versuch es nochmal.", "Kapak indiriliyor…": "Cover wird geladen…", "Bilgiler dolduruldu. Kaydet'e bas.": "Infos ausgefüllt. Tipp auf Speichern.", "Etiket kaydedildi": "Infos gespeichert",
    "Orijinal ses, sadece format değişir": "Originalton, nur das Format ändert sich", "Ses çözülüyor": "Audio wird dekodiert", "Tempo ve ton işleniyor": "Tempo und Tonhöhe werden berechnet", "Efektler uygulanıyor": "Effekte werden angewendet",
    "MP3 kodlanıyor": "MP3 wird kodiert", "WAV oluşturuluyor": "WAV wird erstellt", "E-posta veya şifre yanlış.": "E-Mail oder Passwort falsch.", "Bu e-postayla zaten hesap var. Giriş yap.": "Mit dieser E-Mail gibt es schon ein Konto. Melde dich an.",
    "Şifre en az 6 karakter olmalı.": "Das Passwort braucht mindestens 6 Zeichen.", "E-postana gelen onay linkine bas, sonra giriş yap.": "Tipp auf den Bestätigungslink in deiner E-Mail und melde dich dann an.", "E-posta ve şifreyi yaz.": "Gib E-Mail und Passwort ein.",
    "Hesap açıldı. E-postana gelen onay linkine bas, sonra giriş yap.": "Konto erstellt. Tipp auf den Bestätigungslink in deiner E-Mail und melde dich dann an.", "Giriş yapıldı": "Angemeldet", "Önce anahtarı yapıştır.": "Füg erst den Schlüssel ein.", "Deneniyor…": "Wird getestet…",
    "Önizleme 1 dakika sürecek": "Die Vorschau dauert 1 Minute", "Kontrol ediliyor…": "Wird geprüft…", "Kontrol edilemedi, internet bağlantını kontrol et": "Prüfung nicht möglich, check deine Internetverbindung", "Kopyalandı": "Kopiert", "Metni seçtim, Kopyala de": "Text ist markiert, tipp auf Kopieren",
    "Sohbet temizlendi": "Chat gelöscht", "Listelerin yükleniyor…": "Deine Listen werden geladen…", "Beğenilen Şarkılar": "Lieblingssongs", "Kalpli şarkıların": "Deine Lieder mit Herz", "Aktar": "Importieren", "Aktarılıyor…": "Wird importiert…",
    "Bu listeden şarkı alınamadı. Spotify sadece senin oluşturduğun listelerin içeriğini veriyor.": "Aus dieser Liste konnten keine Lieder geholt werden. Spotify gibt nur den Inhalt deiner eigenen Listen heraus.",
    "Spotify'da çalabilmem için bir kez yeniden bağlanman gerekiyor": "Damit ich in Spotify abspielen kann, musst du dich einmal neu verbinden", "Spotify uygulaması açılıyor. Orada çalmaya başlayınca buradan da şarkı seçebilirsin.": "Die Spotify-App wird geöffnet. Sobald dort etwas läuft, kannst du auch von hier aus Lieder wählen.",
    "Yukarı": "Nach oben", "Aşağı": "Nach unten", "Çıkar": "Entfernen", "Okları kullanarak bölümleri ve modları taşı": "Verschieb Bereiche und Modi mit den Pfeilen", "ses dalgası hazırlanıyor…": "Wellenform wird vorbereitet…", "bir şarkı çal": "spiel ein Lied ab",
    "Önce A noktasını koy": "Setz zuerst Punkt A", "B noktası A'dan sonra olmalı": "Punkt B muss nach A liegen", "İşaretin adı": "Name des Markers", "Nakarat": "Refrain", "İşaret": "Marker", "İşareti sil": "Marker löschen", "bütün şarkı": "ganzes Lied",
    "Bordo": "Bordeaux", "Siyah": "Schwarz", "Duman": "Rauch", "Krem": "Creme", "Lacivert": "Marine", "Beyaz": "Weiß", "Kırmızı": "Rot", "Yeşil": "Grün", "Sarı": "Gelb", "Pembe": "Rosa", "Mavi": "Blau", "Deniz": "Meer", "Orman": "Wald", "Sade": "Schlicht",
    "Kırmızı beyaz": "Rot-Weiß", "El yazısı": "Handschrift", "Kalın": "Fett", "Daktilo": "Schreibmaschine", "Nereye uygulansın?": "Wofür soll es gelten?", "Bu şarkı": "Dieses Lied", "Bütün kasetler": "Alle Kassetten", "Özelleştirmeyi kaldır": "Gestaltung entfernen",
    "GÖVDE": "GEHÄUSE", "ETİKET": "ETIKETT", "ŞERİT": "STREIFEN", "YAZI": "SCHRIFT", "Kaset süslendi": "Kassette gestaltet", "Varsayılan kasete dönüldü": "Zurück zur Standardkassette", "Bu şarkının ayarları silindi, orijinal sese döndü": "Einstellungen dieses Lieds gelöscht, zurück zum Originalton",
    "Sırada": "Warteschlange", "Şimdi çalıyor:": "Läuft gerade:", "Sırayı temizle": "Warteschlange leeren", "Sıran boş. Bir şarkının ••• menüsünden \"Sonra çal\" ya da \"Sıraya ekle\" de.": "Deine Warteschlange ist leer. Wähl im •••-Menü eines Lieds \"Als Nächstes spielen\" oder \"Zur Warteschlange\".",
    "Sonra kendiliğinden:": "Danach automatisch:", "Bu şarkıdan sonra çalacak": "Läuft nach diesem Lied", "Gerçek kaset kapağı koy": "Echtes Kassettencover einsetzen", "Plak kapağı koy": "Plattencover einsetzen", "Kaset kapağını ayarla": "Kassettencover zuschneiden",
    "Plak kapağını ayarla": "Plattencover zuschneiden", "Kaset kapağını kaldır": "Kassettencover entfernen", "Kapak kondu": "Cover eingesetzt", "Linki kopyala": "Link kopieren", "45 devir": "45 Touren",
    /* ---------- damar / kader / söz ---------- */
    "Bugün gönül hafif, kuş gibi.": "Heute ist das Herz leicht wie ein Vogel.", "Hafif bir hüzün, çayın yanında.": "Eine leise Wehmut zum Çay.", "Orta karar damar, tadında.": "Mittlere Schwermut, genau richtig.",
    "Damar kabarıyor, dikkat.": "Die Schwermut steigt, Vorsicht.", "Ağır damar. Sigara yok, çay var.": "Schwere Kost. Keine Zigarette, aber Çay.", "Çok ağır damar. Kader bu, ne yapalım.": "Sehr schwere Kost. So ist das Schicksal, was soll man machen.",
    "Müslüm Baba seviyesi. Kolların sağlam olsun.": "Müslüm-Baba-Niveau. Halt dich gut fest.", "Terk edildim": "Ich wurde verlassen", "Giden gitti": "Wer geht, ist gegangen", "Gurbetteyim": "Ich bin in der Fremde", "Stuttgart'tan memlekete": "Von Stuttgart in die Heimat",
    "Hayata küstüm": "Ich bin dem Leben böse", "Dünya dönüyor, ben duruyorum": "Die Welt dreht sich, ich stehe still", "Yine de umut var": "Trotzdem gibt es Hoffnung", "Yarın başka gün": "Morgen ist ein neuer Tag", "Kader kaseti": "Schicksalskassette", "ruh haline göre": "nach deiner Stimmung",
    "günün sözü": "Spruch des Tages", "Söz kartı yap": "Spruchkarte erstellen", "Kartta hangi söz olsun?": "Welcher Spruch soll auf die Karte?",
    "Gönül bir kaset gibi; sararsın, sararsın, en güzel yerinde kopar.": "Das Herz ist wie eine Kassette: Du spulst und spulst, und an der schönsten Stelle reißt das Band.",
    "Stuttgart'ın yağmuru da gurbetçinin gözyaşı gibi; durmaz, sadece yavaşlar.": "Der Stuttgarter Regen ist wie die Tränen in der Fremde: Er hört nicht auf, er wird nur langsamer.",
    "Her S-Bahn bir gün gelir, her sevgili değil.": "Jede S-Bahn kommt irgendwann, nicht jede Liebe.", "Çayın demi, derdin demi; ikisi de bekledikçe koyulaşır.": "Çay und Kummer: Beide werden stärker, je länger sie ziehen.",
    "Kader dediğin bir plak: bir yüzü çalar, öbür yüzü beklenir.": "Das Schicksal ist eine Platte: Eine Seite läuft, die andere wartet.", "Fernsehturm bile yalnız; o yüzden en yükseğe çıkmış.": "Sogar der Fernsehturm ist einsam; deshalb steht er ganz oben.",
    "Gece üçte çalan her şarkı biraz itiraftır.": "Jedes Lied um drei Uhr nachts ist ein kleines Geständnis.", "Gurbette kalbin iki saati olur; biri burada, biri orada işler.": "In der Fremde hat das Herz zwei Uhren: Eine tickt hier, die andere dort.",
    "Kırılan kalp de kaset gibi; kalemle sarılır, yine çalar.": "Auch ein gebrochenes Herz ist wie eine Kassette: mit dem Stift aufgewickelt, spielt es wieder.", "Ağır damar ağır yük değil; paylaşınca hafifler.": "Schwermut ist keine schwere Last; geteilt wird sie leichter.",
    "Neckar akar, dert akmaz; bari şarkı aksın.": "Der Neckar fließt, der Kummer nicht; dann soll wenigstens das Lied fließen.", "Rötar yapan sadece tren değil, gönül de bazen geç kalır.": "Nicht nur Züge haben Verspätung, auch das Herz kommt manchmal zu spät.",
    "Bekle beni demek kolay, Hauptbahnhof'ta beklemek zor.": "\"Warte auf mich\" sagt sich leicht, am Hauptbahnhof zu warten ist schwer.", "Kimse bilmez ama her kasetin bir B yüzü vardır.": "Keiner weiß es, aber jede Kassette hat eine B-Seite.",
    "Sessizlik de bir şarkıdır; sadece sözleri içeride.": "Auch Stille ist ein Lied; nur der Text bleibt innen.", "Unutmak istediğini bir şarkıya koy; şarkı hatırlasın, sen değil.": "Leg, was du vergessen willst, in ein Lied; soll das Lied sich erinnern, nicht du.",
    "Bugün de geçer; gün batımı bile Killesberg'de bekletmez.": "Auch heute geht vorbei; selbst der Sonnenuntergang lässt am Killesberg nicht auf sich warten.", "Arabesk ağlamak değil, ağlarken dik durmaktır.": "Arabesk heißt nicht weinen, sondern beim Weinen aufrecht stehen.",
    "Gönül kapısı itmekle değil, çalmakla açılır.": "Die Tür zum Herzen geht nicht durch Drücken auf, sondern durch Anklopfen.", "Her durak bir veda, her kalkış bir umut.": "Jede Haltestelle ein Abschied, jede Abfahrt eine Hoffnung.",
    "Karanlık tünelde bile S-Bahn ışığını yakar.": "Selbst im dunklen Tunnel macht die S-Bahn ihr Licht an.", "Gözyaşı da yağmur gibi; toprağı yumuşatır.": "Tränen sind wie Regen: Sie machen den Boden weich.",
    "Kalbinin sesini aç; kulaklık sadece müziği duyurur.": "Dreh die Stimme deines Herzens auf; Kopfhörer bringen nur die Musik.", "Derdin varsa çayı tazele, kaseti çevir.": "Wenn du Kummer hast: frischer Çay, Kassette umdrehen.",
    "Yolun yarısı sabır, yarısı şarkı.": "Der halbe Weg ist Geduld, die andere Hälfte ein Lied.", "Ay dolunay olunca gönül de taşar.": "Bei Vollmond läuft auch das Herz über.", "Bir şarkı yetmez, bir ömür de.": "Ein Lied reicht nicht, ein Leben auch nicht.",
    "Her gece biraz Müslüm, her sabah biraz umut.": "Jede Nacht ein bisschen Müslüm, jeden Morgen ein bisschen Hoffnung.",
    /* ---------- Gönül Dostu ---------- */
    "Uyku zamanı. Kaset durdu, iyi geceler.": "Schlafenszeit. Die Kassette steht, gute Nacht.", "Bu numarada şarkı yok.": "Unter dieser Nummer gibt es kein Lied.", "Geçerli şarkı yok.": "Kein gültiges Lied.", "Böyle bir mod yok.": "So einen Modus gibt es nicht.",
    "Ses ayarlandı": "Klang eingestellt", "Uyku zamanlayıcısı kapatıldı": "Schlaf-Timer ausgeschaltet", "Anahtar geçersiz. Ben sekmesinden kontrol et.": "Schlüssel ungültig. Prüf ihn im Tab \"Ich\".", "Çok hızlı gittik, birazdan tekrar dene.": "Das war zu schnell, versuch es gleich nochmal.",
    "Sunucular şu an yoğun, biraz sonra tekrar dene.": "Die Server sind gerade ausgelastet, versuch es gleich nochmal.", "Claude hesabında kredi kalmamış. console.anthropic.com'dan yükleme yapabilirsin.": "Dein Claude-Konto hat kein Guthaben mehr. Aufladen kannst du auf console.anthropic.com.",
    "Akış hatası": "Übertragungsfehler", "İnternete bakıyor…": "Schaut im Internet nach…", "Tamamdır.": "Erledigt.",
    "Şarkılara laf atan, seninle dertleşen, istersen kaseti senin yerine yöneten bir dost. Açmak için Ben sekmesinden anahtarını ekle.": "Ein Freund, der Lieder kommentiert, mit dir plaudert und auf Wunsch die Kassette für dich steuert. Zum Aktivieren trag deinen Schlüssel im Tab \"Ich\" ein.",
    "Kur": "Einrichten", "Sohbet": "Chat", "düşünüyor…": "denkt nach…", "Bir şarkı aç, lafa girelim.": "Mach ein Lied an, dann reden wir.", "Dinliyorum. Bir derdin varsa yaz.": "Ich höre zu. Schreib, wenn dich etwas bedrückt.",
    "Merhaba! Bir şey sor, ya da \"bana gece için bir liste yap\" de.": "Hallo! Frag etwas, oder sag \"mach mir eine Liste für die Nacht\".",
    /* ---------- araçlar ---------- */
    "Akıllı etiketleme": "Smartes Aufräumen", "Bozuk isimler ayıklanıyor…": "Kaputte Namen werden herausgesucht…", "Gönül Dostu isimlere bakıyor…": "Gönül Dostu schaut sich die Namen an…",
    "Arşivin tertemiz, düzeltilecek bir şey bulamadım.": "Dein Archiv ist blitzsauber, ich habe nichts zu korrigieren gefunden.", "Tamam": "OK", "Uygula": "Anwenden", "Gönül Dostu anahtarı eklersen anlaşılmayan isimleri de tahmin eder.": "Mit einem Gönül-Dostu-Schlüssel werden auch unklare Namen erraten.",
    "anlaşılmadı, elle düzelt": "nicht erkannt, bitte von Hand korrigieren", "yz": "KI", "Gönül Plak yedeği": "Gönül-Plak-Backup", "Yedek hazır. \"Dosyalara kaydet\" ile iCloud Drive'a koyabilirsin.": "Backup fertig. Mit \"In Dateien sichern\" kannst du es in iCloud Drive ablegen.",
    "Bu bir Gönül Plak yedeği değil": "Das ist kein Gönül-Plak-Backup", "Link kopyalandı": "Link kopiert", "Paylaşılan liste": "Geteilte Liste", "Paylaşılan liste açılamadı": "Geteilte Liste konnte nicht geöffnet werden",
    "Dinledikçe burada senin arabesk karnen çıkacak.": "Je mehr du hörst, desto mehr füllt sich hier dein Arabesk-Zeugnis.", "şarkı bu yıl": "Lieder dieses Jahr", "saat damar": "Stunden Schwermut", "ortalama damar": "Ø Schwermut", "Arabesk Wrapped kartı": "Arabesk-Wrapped-Karte",
    "Son 30 gün en çok:": "Meistgehört in 30 Tagen:", "Şarkı:": "Lied:", "Burayı ekle (şu an çalan şarkıyla)": "Diesen Ort hinzufügen (mit dem aktuellen Lied)",
    "Uygulama açıkken o yere gelince şarkın kendiliğinden başlar. iPhone, web uygulamalarına kapalıyken konum vermez.": "Wenn die App offen ist und du dort ankommst, startet dein Lied von selbst. Das iPhone gibt Web-Apps im Hintergrund keinen Standort.",
    "şarkı silinmiş": "Lied gelöscht", "Henüz yer yok.": "Noch kein Ort.", "Önce bu yerde çalmasını istediğin şarkıyı başlat": "Starte zuerst das Lied, das an diesem Ort laufen soll", "Bu yerin adı (ör. Killesberg, Karlshöhe)": "Name dieses Orts (z. B. Killesberg, Karlshöhe)",
    "Konum desteklenmiyor": "Standort wird nicht unterstützt", "Konum izni verilmedi. Ayarlar > Gizlilik > Konum Servisleri > Safari Web Siteleri": "Kein Standortzugriff. Einstellungen > Datenschutz > Ortungsdienste > Safari-Websites",
    "devre arası": "Halbzeit", "başlıyor": "beginnt", "maç bitti": "Abpfiff", "bugün": "heute", "Kazandık! Bugün damar hafif.": "Gewonnen! Heute wenig Schwermut.", "Kaybettik… ağır damar günü.": "Verloren… ein Tag für schwere Kost.", "Berabere. Ne ağla ne gül.": "Unentschieden. Weder weinen noch lachen.",
    "Skor gecikmeli olabilir": "Der Spielstand kann verzögert sein", "Dinleme": "Hören", "Ses dengeleme": "Lautstärke angleichen", "Kısık ve yüksek kayıtlar aynı seviyede çalar": "Leise und laute Aufnahmen spielen gleich laut",
    "Şarkı geçişi": "Übergang", "Şarkı sonu kısılarak biter, yenisi yumuşak başlar (canlı motorda).": "Das Liedende wird ausgeblendet, das nächste beginnt sanft (in der Live-Engine).", "Her şarkının ayarını hatırla": "Einstellungen pro Lied merken",
    "Ton, tempo, ekolayzır, efektler ve mod her şarkıya ayrı kaydedilir. Ayarı olmayan şarkı orijinal sesle başlar.": "Tonhöhe, Tempo, Equalizer, Effekte und Modus werden für jedes Lied einzeln gespeichert. Lieder ohne Einstellung starten im Originalton.", "Şarkıya özel ayar": "Einstellung pro Lied",
    "Gece 3 modu": "3-Uhr-nachts-Modus", "02:00 ile 05:00 arası ekran kararır, ses yumuşar, Gönül Dostu derinleşir": "Zwischen 02:00 und 05:00 wird der Bildschirm dunkler, der Ton weicher und Gönül Dostu tiefgründiger",
    "Kilit ekranı kontrolleri": "Sperrbildschirm-Steuerung", "İleri, geri ve saniye kaydırma kilit ekranında çalışır. Ses kesilirse kapat.": "Vor, zurück und Spulen funktionieren auf dem Sperrbildschirm. Wenn der Ton abbricht, schalte es aus.",
    "Arşiv araçları": "Archiv-Werkzeuge", "\"telegram-cloud-document\" gibi bozuk isimleri düzeltir, \"Sanatçı - Şarkı\" adlarını ayırır, eksik kapakları internetten bulur.": "Korrigiert kaputte Namen wie \"telegram-cloud-document\", trennt \"Künstler - Lied\" und sucht fehlende Cover im Internet.",
    "Bütün şarkıların, kapakların, listelerin ve ayarların tek dosyada. \"Dosyalara kaydet\" ile iCloud Drive'a koy; telefon değişse de geri yüklersin.": "Alle Lieder, Cover, Listen und Einstellungen in einer Datei. Leg sie mit \"In Dateien sichern\" in iCloud Drive ab; nach einem Handywechsel stellst du alles wieder her.",
    "Tam yedek": "Vollständiges Backup", "Sadece etiketler": "Nur Infos", "Yedekten geri yükle": "Aus Backup wiederherstellen", "Benim yerlerim": "Meine Orte", "Açılıyor…": "Wird geöffnet…", "Kapatılıyor…": "Wird geschlossen…",
    "Yedek açılıyor…": "Backup wird geöffnet…", "Yedek açılamadı": "Backup konnte nicht geöffnet werden", "Arşivde şarkı yok": "Keine Lieder im Archiv", "Arşiv yeni sürüme taşınıyor…": "Archiv wird auf die neue Version umgestellt…",
    "Dil / Sprache": "Sprache / Dil", "Eski Kaset Hızı": "Alte-Kassetten-Tempo", "Eski damar kasetleri gibi hafif hızlı, ton da birlikte yukarı": "Leicht schneller wie alte Arabesk-Kassetten, die Tonhöhe geht mit nach oben", "Ses açılıyor…": "Ton wird gestartet…", "Müziğe devam etmek için ekrana dokun": "Tipp auf den Bildschirm, um die Musik fortzusetzen", "Görünüm": "Ansicht", "2D · Üstten": "2D · Von oben", "3D · Gerçek masa": "3D · Echter Tisch", "Kamera": "Kamera", "sevdası": "meine Liebe", "dolunay": "Vollmond", "kış": "Winter", "ilkbahar": "Frühling", "yaz": "Sommer", "sonbahar": "Herbst",
    /* ---------- bilardo ---------- */
    "Bilardo hazırlanıyor…": "Billard wird vorbereitet…", "Menü": "Menü", "Ayarlar": "Einstellungen", "Rakipler": "Gegner", "İstatistik": "Statistik", "Mağaza": "Shop", "Falso": "Effet",
    "Kırılış sende": "Du stößt an", "Elde top: beyazı istediğin yere sürükle": "Ball in Hand: Zieh die Weiße, wohin du willst", "Kırılış: beyazı çizginin gerisinde sürükle": "Anstoß: Zieh die Weiße hinter die Linie",
    "Sen düz toplardasın (1-7)": "Du hast die Vollen (1-7)", "Sen çizgili toplardasın (9-15)": "Du hast die Halben (9-15)", "Beyaz top deliğe girdi": "Die Weiße ist gefallen", "Hiçbir topa değmedi": "Keine Kugel getroffen",
    "Önce 8 numaraya vurmalıydın": "Du hättest zuerst die 8 treffen müssen", "Önce 8 numaraya vurdun": "Du hast zuerst die 8 getroffen", "Önce rakibin topuna vurdun": "Du hast zuerst eine gegnerische Kugel getroffen",
    "Temastan sonra hiçbir top banda değmedi": "Nach dem Kontakt hat keine Kugel die Bande berührt", "8 numara deliğe girdi!": "Die 8 ist drin!", "8 numara faulle girdi": "Die 8 fiel bei einem Foul", "8 numara erken girdi": "Die 8 fiel zu früh", "9 numara deliğe girdi!": "Die 9 ist drin!",
    "Yeterli jeton yok": "Nicht genug Münzen", "Yeni ıstakalar mağazada 🛒": "Neue Queues gibt es im Shop 🛒", "Yeni oyun": "Neues Spiel", "Kurallar": "Regeln", "Bilardodan çık": "Billard verlassen",
    "İlk sokulan top grubunu belirler (düz 1-7 / çizgili 9-15). Kendi grubunu bitir, sonra 8'i sok. 8 erken ya da faulle girerse kaybedersin.": "Die erste versenkte Kugel bestimmt deine Gruppe (Volle 1-7 / Halbe 9-15). Räum deine Gruppe ab, dann versenk die 8. Fällt die 8 zu früh oder bei einem Foul, verlierst du.",
    "Her atışta önce masadaki en küçük numaralı topa vurmalısın. 9'u kurallı sokan kazanır.": "Bei jedem Stoß musst du zuerst die niedrigste Kugel auf dem Tisch treffen. Wer die 9 regelgerecht versenkt, gewinnt.", "Faul:": "Foul:", "Kontrol:": "Steuerung:",
    "beyaz deliğe girerse, hiçbir topa değmezse, önce yanlış topa vurursan ya da temastan sonra hiçbir top banda gitmezse. Faulde rakip elde topla oynar.": "wenn die Weiße fällt, du keine Kugel triffst, zuerst die falsche Kugel triffst oder nach dem Kontakt keine Kugel an die Bande läuft. Nach einem Foul hat der Gegner Ball in Hand.",
    "masada sürükle → nişan · topa dokun → o topa nişan · alttaki tekerlek → ince ayar · soldaki güç çubuğunu aşağı çekip bırak → vuruş · sağ alttaki top → falso.": "auf dem Tisch ziehen → zielen · Kugel antippen → auf sie zielen · Rad unten → Feinjustierung · Kraftleiste links runterziehen und loslassen → Stoß · Kugel unten rechts → Effet.",
    "Masa teması": "Tisch-Design", "Klasik": "Klassisch", "Ses efektleri": "Soundeffekte", "İsim": "Name", "Profil fotoğrafı seç": "Profilfoto wählen", "Fotoğrafı kaldır": "Foto entfernen", "Hızlı mesaj": "Schnellnachricht",
    "İyi oyunlar!": "Gutes Spiel!", "Güzel atış!": "Schöner Stoß!", "Teşekkürler": "Danke", "Ups!": "Ups!", "Hadi bakalım 😎": "Na dann los 😎", "Şanslıydı 😄": "Glück gehabt 😄", "Aferin 👏": "Bravo 👏", "Rövanş?": "Revanche?",
    "Sana da!": "Dir auch!", "Sağ ol 😊": "Danke 😊", "Bakalım 😏": "Mal sehen 😏", "Rica ederim": "Gern geschehen", "Olur!": "Klar!", "Teşekkürler 😉": "Danke 😉", "Sağ ol!": "Danke!", "Vay be!": "Wow!", "Helal olsun 👏": "Respekt 👏",
    "Tebrikler, iyi oyundu 👏": "Glückwunsch, gutes Spiel 👏", "İyi oyundu 😊": "Gutes Spiel 😊", "Rakip seç": "Gegner wählen", "Kolay": "Leicht", "Orta": "Mittel", "Zor": "Schwer", "İstatistikler": "Statistik",
    "Oyun": "Spiele", "Galibiyet": "Siege", "Mağlubiyet": "Niederlagen", "Kazanma oranı": "Siegquote", "Seri": "Serie", "En iyi seri": "Beste Serie", "Jeton": "Münzen", "Istaka": "Queue", "Mağaza ·": "Shop ·",
    "Güç": "Kraft", "Nişan": "Zielen", "Kullanılıyor": "In Benutzung", "Gece Yarısı": "Mitternacht", "Ortala": "Zentrieren", "KAZANDIN!": "GEWONNEN!", "Kaybettin": "Verloren", "Tekrar oyna": "Nochmal spielen", "Çık": "Beenden"
  };

  /* Değişken içeren yazılar: [desen, karşılık]. $1, $2… yakalanan parçalar (sözlükte varsa onlar da çevrilir). */
  var P = [
    [/^(\d+) dk$/, '$1 Min'], [/^\+(\d+) dk$/, '+$1 Min'], [/^(\d+) dk önce$/, 'vor $1 Min'], [/^(\d+) saat önce$/, 'vor $1 Std'], [/^(\d+) gün önce$/, 'vor $1 Tagen'], [/^(\d+) dk sonra$/, 'in $1 Min'],
    [/^(.+) sn$/, '$1 s'], [/^([+−-]?[\d.,]+) yarım ton$/, '$1 Halbtöne'], [/^%(\d+)$/, '$1 %'], [/^%(\d+) · (.+)$/, '$1 % · $2'],
    [/^(\d+) kaset$/, '$1 Kassetten'], [/^(\d+) kaset · (\d+) sonuç$/, '$1 Kassetten · $2 Treffer'], [/^· (\d+) sonuç$/, '· $1 Treffer'], [/^(\d+)\/(\d+) şarkı çalınabilir$/, '$1/$2 Lieder abspielbar'], [/^(\d+)\/(\d+) hazır$/, '$1/$2 bereit'],
    [/^uyku (\d+) dk$/, 'Schlaf $1 Min'], [/^Tekrarla: (.+)$/, 'Wiederholen: $1'], [/^tüm liste$/, 'ganze Liste'], [/^tek şarkı$/, 'ein Lied'],
    [/^Buluta yükleniyor (\d+)\/(\d+)$/, 'Upload in die Cloud $1/$2'], [/^Yükleme hatası: (.*)$/, 'Upload-Fehler: $1'], [/^yüklenemedi: (.*)$/, 'konnte nicht geladen werden: $1'],
    [/^Dosyası olan (\d+) şarkı burada efektlerle çalar\. Diğerlerine dokununca Spotify uygulamasında çalar \(Premium\)\. Spotify sesine ton ve yankı uygulanamaz; istersen "Dosya ekle" ile MP3'ünü bağla\.$/, '$1 Lieder mit Datei laufen hier mit Effekten. Die anderen öffnen sich beim Antippen in der Spotify-App (Premium). Auf Spotify-Ton lassen sich Tonhöhe und Hall nicht anwenden; verknüpf bei Bedarf deine MP3 über "Datei hinzufügen".'],
    [/^Bugün Stuttgart'ta gün doğumu$/, 'Heute in Stuttgart: Sonnenaufgang'], [/^, batımı$/, ', Sonnenuntergang'], [/^\. Ay %(\d+) dolu\.$/, '. Mond zu $1 % voll.'], [/^\. Ay %(\d+) dolu\. Hava: kapalı\.$/, '. Mond zu $1 % voll. Wetter: bedeckt.'], [/^\. Ay %(\d+) dolu\. Hava: (.+)\.$/, '. Mond zu $1 % voll. Wetter: $2.'],
    [/^(-?\d+)° · kapalı( gece)?$/, '$1° · bedeckt'], [/^kapalı( gece)?$/, 'bedeckt'], [/^(-?\d+)° · (.+) gece$/, '$1° · $2, Nacht'], [/^(-?\d+)° · (.+)$/, '$1° · $2'], [/^(çiseliyor|yağmurlu|karlı|sağanak|kar yağışlı|fırtınalı|sisli) gece$/, '$1, Nacht'],
    [/^(.+) durağında$/, 'an der Haltestelle $1'], [/^sıradaki: (.+)$/, 'nächster Halt: $1'], [/^\+(\d+) dk rötar$/, '+$1 Min Verspätung'], [/^\+(\d+) rötar$/, '+$1 Verspätung'], [/^(\d+) tren yolda · tahmini konum$/, '$1 Züge unterwegs · geschätzte Position'],
    [/^(\d+) iptal$/, '$1 Ausfälle'], [/^(\d+) tren · dakik$/, '$1 Züge · pünktlich'], [/^(.+) · gelen trenler$/, '$1 · Ankünfte'], [/^(S\d+) süzülüyor · (.*)$/, 'Filter $1 · $2'], [/^güncellendi (.+)$/, 'aktualisiert $1'],
    [/^(S\d+) süzülüyor · güncellendi (.+)$/, 'Filter $1 · aktualisiert $2'], [/^(.+) · plan$/, '$1 · Plan'], [/^(S\d+) bu duraktan geçmiyor ya da yakında sefer yok$/, 'Die $1 hält hier nicht oder es fährt bald nichts'],
    [/^Veri: VVS \(EFA, gerçek zamanlı\)\. Haritadaki konumlar canlı saatlerden hesaplanan tahmindir\. ✓ dakik, sarı rötar\.$/, 'Daten: VVS (EFA, Echtzeit). Die Positionen auf der Karte sind aus den Live-Zeiten geschätzt. ✓ pünktlich, gelb = Verspätung.'],
    [/^Veri: Deutsche Bahn \(transport\.rest\); harita için VVS gerekli\. Haritadaki konumlar canlı saatlerden hesaplanan tahmindir\. ✓ dakik, sarı rötar\.$/, 'Daten: Deutsche Bahn (transport.rest); für die Karte wird der VVS benötigt. Die Positionen auf der Karte sind aus den Live-Zeiten geschätzt. ✓ pünktlich, gelb = Verspätung.'],
    [/^Çevrimdışısın, (.+) verisi gösteriliyor \(rötarlar güncel değil\)\.$/, 'Du bist offline, es werden Daten von $1 gezeigt (Verspätungen nicht aktuell).'],
    [/^(.+) azalt$/, '$1 verringern'], [/^(.+) artır$/, '$1 erhöhen'], [/^(.+) sıfırla$/, '$1 zurücksetzen'],
    [/^♪ (.+) çalıyor$/, '♪ $1 läuft'], [/^Çalıyor: (.+)$/, 'Läuft: $1'], [/^Sıra kuruldu: (\d+) şarkı$/, 'Warteschlange erstellt: $1 Lieder'], [/^"(.+)" listesi kuruldu \((\d+) şarkı\)$/, 'Liste "$1" erstellt ($2 Lieder)'],
    [/^(.+) modu açıldı$/, 'Modus $1 aktiviert'], [/^Uyku zamanlayıcısı: (\d+) dk$/, 'Schlaf-Timer: $1 Min'], [/^Not aldım: (.+)$/, 'Notiert: $1'], [/^Bağlantı hatası \((.+)\)$/, 'Verbindungsfehler ($1)'], [/^(.+) açıldı$/, '$1 aktiviert'],
    [/^(\d+) şarkı okunuyor…$/, '$1 Lieder werden gelesen…'], [/^(\d+) şarkı arşive eklendi$/, '$1 Lieder zum Archiv hinzugefügt'], [/^Hazır · (.+)$/, 'Fertig · $1'], [/^Olmadı: (.*)$/, 'Hat nicht geklappt: $1'], [/^Çalışıyor: (.*)$/, 'Funktioniert: $1'],
    [/^Sürüm (\d+) bulundu, yükleniyor$/, 'Version $1 gefunden, wird geladen'], [/^En güncel sürümdesin \((.+)\)$/, 'Du hast die neueste Version ($1)'], [/^(\d+) şarkı$/, '$1 Lieder'], [/^([\d/]+) şarkı alındı$/, '$1 Lieder geholt'], [/^(\d+) şarkı aktarıldı$/, '$1 Lieder importiert'],
    [/^Spotify'da çalıyor \((.+)\): (.+)$/, 'Läuft in Spotify ($1): $2'], [/^Döngü: (.+)$/, 'Schleife: $1'], [/^Sıraya eklendi \((\d+)\. sırada\)$/, 'Zur Warteschlange hinzugefügt (Platz $1)'], [/^Hepsini çal \((\d+)\)$/, 'Alle abspielen ($1)'],
    [/^"(.+)" silinsin mi\?$/, '"$1" löschen?'], [/^Benim EQ'm (\d+)$/, 'Mein EQ $1'], [/^(.+) Bugün ortalama ([\d.,]+)\/10 damar gidiyorsun\.$/, '$1 Heute liegst du im Schnitt bei $2/10 Schwermut.'], [/^“(.+)”$/, '„$1“'],
    [/^Kapaklar aranıyor… (.*)$/, 'Cover werden gesucht… $1'], [/^(\d+) şarkı için öneri var\. İstemediklerinin işaretini kaldır\.(.*)$/, 'Für $1 Lieder gibt es Vorschläge. Entfern den Haken bei denen, die du nicht willst.$2'],
    [/^(.+) · kapak bulundu$/, '$1 · Cover gefunden'], [/^eski: (.+)$/, 'alt: $1'], [/^(\d+) şarkı düzeltildi$/, '$1 Lieder korrigiert'], [/^Yedek indirildi \((\d+) MB\)$/, 'Backup geladen ($1 MB)'], [/^Geri yüklendi: (\d+) yeni şarkı$/, 'Wiederhergestellt: $1 neue Lieder'],
    [/^"(.+)" listem, (\d+) şarkı$/, 'Meine Liste "$1", $2 Lieder'], [/^"(.+)" listesi eklendi$/, 'Liste "$1" hinzugefügt'], [/^\((\d+) kez\)$/, '($1-mal)'], [/^Gece 00:00 ile 05:00 arası (\d+) şarkı\. Uykusuz gönül\.$/, '$1 Lieder zwischen 00:00 und 05:00. Schlafloses Herz.'],
    [/^En çok$/, 'Am meisten hast du auf der'], [/^yolculuğunda dinledin \((\d+) şarkı\)\.$/, 'gehört ($1 Lieder).'], [/^Gönlün: (.+)$/, 'Dein Herz: $1'], [/^Yılın şarkısı: (.+)$/, 'Lied des Jahres: $1'], [/^En çok (.+)'te ağladın$/, 'Am meisten geweint in der $1'],
    [/^(\d+) şarkı gece yarısından sonra$/, '$1 Lieder nach Mitternacht'], [/^(.+)'e hoş geldin\. (.+) çalıyor\.$/, 'Willkommen in $1. Es läuft $2.'], [/^GOOOL! VfB! (.+)$/, 'TOOOR! VfB! $1'], [/^Gol… (.+)$/, 'Tor… $1'], [/^CANLI · (.+)$/, 'LIVE · $1'],
    [/^(.+)\. (\d+) şarkı, yaklaşık (\d+) dk\.$/, '$1. $2 Lieder, etwa $3 Min.'], [/^(.+) geliyor, 2 dakika! İnmeye hazırlan\.$/, '$1 kommt in 2 Minuten! Mach dich bereit zum Aussteigen.'], [/^varış (.+) · (\d+) dk kaldı$/, 'Ankunft $1 · noch $2 Min'], [/^varış (.+) · (\d+) dk kaldı ·$/, 'Ankunft $1 · noch $2 Min ·'],
    [/^Tren (\d+) dk gecikmiş\. Bari şarkı gecikmesin:$/, 'Der Zug hat $1 Min Verspätung. Dann soll wenigstens das Lied pünktlich sein:'], [/^(.+)'dan nereye\?$/, 'Von $1 wohin?'], [/^(S\d+) (\d+) dk rötarlı\. Bekleyene şarkı:$/, 'Die $1 hat $2 Min Verspätung. Ein Lied fürs Warten:'],
    [/^(.+) ile (.+) arasında yakında direkt tren bulamadım$/, 'Zwischen $1 und $2 habe ich bald keinen direkten Zug gefunden'], [/^(.+) kaseti takıldı · (\d+) şarkı$/, 'Kassette "$1" eingelegt · $2 Lieder'], [/^(\d+) şarkının dosyası bozulmuş, tekrar eklemen gerekiyor$/, 'Bei $1 Liedern ist die Datei beschädigt, du musst sie neu hinzufügen'],
    [/^(.+) yankısı$/, '$1-Hall'], [/^(.+) başladı\)$/, '$1 läuft)'],
    /* bilardo */
    [/^Kırılış (.+)'da$/, '$1 stößt an'], [/^(.+) nişan alıyor…$/, '$1 zielt…'], [/^(.+) düzleri aldı · Sen çizgililerdesin$/, '$1 hat die Vollen · Du hast die Halben'], [/^(.+) çizgilileri aldı · Sen düzlerdesin$/, '$1 hat die Halben · Du hast die Vollen'],
    [/^FAUL · (.+) · Elde top sende$/, 'FOUL · $1 · Du hast Ball in Hand'], [/^FAUL · (.+)$/, 'FOUL · $1'], [/^Önce (\d+) numaraya vurmalıydın$/, 'Du hättest zuerst die $1 treffen müssen'], [/^Seviye (\d+)$/, 'Level $1'], [/^(\d+) jeton$/, '$1 Münzen'],
    [/^Seviye atladın: (\d+)!$/, 'Level-Aufstieg: $1!']
  ];

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }
  function core(k, depth) {
    if (Object.prototype.hasOwnProperty.call(D, k)) return D[k];
    if (k.length > 400 || (depth || 0) > 2) return null;
    for (var i = 0; i < P.length; i++) {
      var m = k.match(P[i][0]);
      if (m) return P[i][1].replace(/\$(\d)/g, function (_, n) { var c = m[+n] == null ? '' : m[+n], t = core(c, (depth || 0) + 1); return t == null ? c : t; });
    }
    return null;
  }
  function tr(s) {
    if (!s || typeof s !== 'string') return null;
    var k = norm(s); if (!k || !/[A-Za-zÇĞİÖŞÜçğıöşü]/.test(k)) return null;
    var v = core(k); if (v == null || v === k) return null;
    var a = s.match(/^\s*/)[0], b = s.match(/\s*$/)[0];
    return a + v + b;
  }
  window.gpT = function (s) { var v = tr(s); return v == null ? s : v; };

  /* kullanıcı verisi (şarkı adı, sanatçı, liste adı, sohbet): tek kelimelik eşleşmeler çevrilmez */
  var USER = '.t,.a,.cn,.cmsg,#vLblT,#vLblA,#npT,#npA,#miniT,#miniA,.wmk,.nm';
  var ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
  var done = typeof WeakMap === 'function' ? new WeakMap() : null;
  function textNode(n) {
    var s = n.nodeValue; if (!s || s.length < 2) return;
    if (done && done.get(n) === s) return;
    var p = n.parentNode; if (!p || p.nodeType !== 1) return;
    var tag = p.nodeName; if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'PRE') return;
    if (p.closest && p.closest('[data-noi18n]')) return;
    var v = tr(s);
    if (v != null && p.closest && p.closest(USER) && !p.closest('.cues')) { if (p.closest('.cmsg') || norm(s).indexOf(' ') < 0) v = null; }
    if (v != null) { n.nodeValue = v; if (done) done.set(n, v); } else if (done) done.set(n, s);
  }
  function attrs(el) {
    for (var i = 0; i < ATTRS.length; i++) { var a = ATTRS[i], s = el.getAttribute && el.getAttribute(a); if (s) { var v = tr(s); if (v != null) el.setAttribute(a, v); } }
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) return textNode(root);
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (root.nodeType === 1) attrs(root);
    var w = document.createTreeWalker(root, 5, null), n;   // SHOW_ELEMENT | SHOW_TEXT
    while ((n = w.nextNode())) { if (n.nodeType === 3) textNode(n); else attrs(n); }
  }
  new MutationObserver(function (ms) {
    for (var i = 0; i < ms.length; i++) {
      var m = ms[i];
      if (m.type === 'characterData') textNode(m.target);
      else if (m.type === 'attributes') attrs(m.target);
      else for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
    }
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  walk(document.documentElement);
  document.addEventListener('DOMContentLoaded', function () { walk(document.documentElement); });

  /* DOM dışı yazılar: sorular, çizilen kartlar, tarih biçimi */
  ['prompt', 'confirm', 'alert'].forEach(function (f) { var o = window[f]; if (o) window[f] = function (m, d) { return o.call(window, window.gpT(m), d); }; });
  try {
    var cp = CanvasRenderingContext2D.prototype;
    ['fillText', 'strokeText', 'measureText'].forEach(function (f) { var o = cp[f]; cp[f] = function () { var a = arguments; if (typeof a[0] === 'string') a[0] = window.gpT(a[0]); return o.apply(this, a); }; });
  } catch (e) {}
  try {
    ['toLocaleDateString', 'toLocaleTimeString', 'toLocaleString'].forEach(function (f) { var o = Date.prototype[f]; Date.prototype[f] = function (l, opt) { return o.call(this, typeof l === 'string' && /^tr/.test(l) ? 'de-DE' : l, opt); }; });
  } catch (e) {}
  window.__gpI18n = { D: D, P: P, tr: tr };
})();
