import { useState, useEffect } from 'react';

/* ── CONFIG ─ change these for each client ── */
const CONFIG = {
  name: 'Maison Kuro',
  tagline: 'Cuisine du marché · Paris 9e',
  address: '24 rue des Martyrs, 75009 Paris',
  phone: '01 48 00 00 00',
  email: 'bonjour@maisonkuro.fr',
  hours: ['Mardi – Samedi', 'Déj. 12h–14h30', 'Dîner 19h–22h30'],
  instagram: '@maisonkuro',
  metro: 'Notre-Dame-de-Lorette',
};

/* ── MENU DATA ── */
const MENU = {
  Entrées: [
    { name: 'Burrata crémeuse', desc: 'Tomates anciennes, basilic, huile d\'olive de Sicile', price: 16 },
    { name: 'Tartare de bœuf', desc: 'Câpres, cornichons, jaune d\'œuf, frites maison', price: 18 },
    { name: 'Soupe à l\'oignon', desc: 'Gratiné au comté, croûtons au beurre', price: 13 },
    { name: 'Foie gras mi-cuit', desc: 'Chutney de figues, brioche toastée', price: 22 },
  ],
  Plats: [
    { name: 'Entrecôte grillée', desc: '300g, sauce béarnaise, frites maison, salade', price: 32 },
    { name: 'Sole meunière', desc: 'Beurre noisette, câpres, citron confit, pommes vapeur', price: 34 },
    { name: 'Magret de canard', desc: 'Réduction de cerise, purée maison, haricots verts', price: 28 },
    { name: 'Risotto aux champignons', desc: 'Cèpes, parmesan 24 mois, truffe noire', price: 26 },
  ],
  Desserts: [
    { name: 'Tarte tatin', desc: 'Pommes caramélisées, crème fraîche épaisse', price: 10 },
    { name: 'Crème brûlée', desc: 'Vanille de Tahiti, cassonade caramélisée', price: 9 },
    { name: 'Moelleux chocolat', desc: 'Cœur coulant Valrhona, glace vanille', price: 11 },
    { name: 'Cheese-cake citron', desc: 'Coulis de fruits rouges, biscuit breton', price: 10 },
  ],
};

/* ── AVIS ── */
const AVIS = [
  { initials: 'SM', name: 'Sophie M.', stars: 5, text: 'Une adresse qui fait mouche à tous les coups. La burrata est incroyable et le service vraiment chaleureux. On reviendra !', date: 'Avril 2025' },
  { initials: 'JL', name: 'Jean-Louis P.', stars: 5, text: 'Le meilleur tartare de Paris, c\'est dit. Cadre élégant, carte des vins bien pensée. Un sans-faute du début à la fin.', date: 'Mars 2025' },
  { initials: 'CR', name: 'Camille R.', stars: 5, text: 'Dîner d\'anniversaire parfait. L\'équipe a été aux petits soins toute la soirée. Les desserts sont à tomber.', date: 'Mars 2025' },
];

/* ── HELPERS ── */
const S = {
  // layout
  maxW: { maxWidth: 1160, margin: '0 auto', padding: '0 24px' },
  section: { padding: '96px 24px' },
  // text
  label: { fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 12 },
  h2: { fontFamily: 'var(--serif)', fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 400, lineHeight: 1.15, marginBottom: 16 },
  body: { fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 },
};

/* ── NAV ── */
function Nav({ scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.35s ease',
    }}>
      <div style={{ ...S.maxW, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 400, letterSpacing: 0.5 }}>
          {CONFIG.name}
        </span>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {[['menu', 'Menu'], ['histoire', 'Histoire'], ['avis', 'Avis']].map(([id, label]) => (
            <button key={id} onClick={() => go(id)} style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--text-secondary)', letterSpacing: 0.3, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >{label}</button>
          ))}
          <button onClick={() => go('reservation')} style={{
            background: 'var(--text)', color: 'white', border: 'none',
            padding: '9px 20px', borderRadius: 4, fontSize: 13, fontWeight: 500,
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Réserver</button>
        </div>
      </div>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section style={{ minHeight: '100vh', background: 'var(--off-white)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background grid lines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.4 }} />

      <div style={{ ...S.maxW, width: '100%', position: 'relative', paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', border: '1px solid var(--border)', borderRadius: 20, padding: '6px 14px', marginBottom: 40 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', letterSpacing: 0.5 }}>Ouvert ce soir — Réservations disponibles</span>
          </div>

          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 400, lineHeight: 1.05, marginBottom: 28, letterSpacing: -1 }}>
            Une cuisine<br />
            <em style={{ fontStyle: 'italic' }}>sincère</em> et<br />
            généreuse
          </h1>

          <p style={{ ...S.body, fontSize: 17, maxWidth: 460, marginBottom: 44 }}>
            Produits du marché, recettes maison, saisons respectées. Maison Kuro vous accueille dans une atmosphère conviviale au cœur de Paris.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} style={{
              background: 'var(--text)', color: 'white', border: 'none',
              padding: '14px 32px', borderRadius: 4, fontSize: 14, fontWeight: 500,
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >Voir la carte</button>
            <button onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })} style={{
              background: 'transparent', color: 'var(--text)',
              border: '1px solid var(--border)',
              padding: '14px 32px', borderRadius: 4, fontSize: 14,
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >Réserver une table</button>
          </div>
        </div>

        {/* Stats bottom */}
        <div style={{ display: 'flex', gap: 48, marginTop: 80, paddingTop: 48, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
          {[['4.9 ★', 'sur Google · 280 avis'], ['7 ans', 'rue des Martyrs'], ['100%', 'fait maison']].map(([val, label]) => (
            <div key={val}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 400 }}>{val}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── AMBIANCE ── */
function Ambiance() {
  const cards = [
    { emoji: '🌿', title: 'Produits du marché', desc: 'La carte change chaque semaine selon les arrivages des producteurs locaux.' },
    { emoji: '🍷', title: 'Cave naturelle', desc: 'Vins nature et biodynamiques sélectionnés chez de petits vignerons.' },
    { emoji: '👨‍🍳', title: 'Tout est fait maison', desc: 'Pains, desserts, sauces — rien ne sort d\'une boîte chez nous.' },
    { emoji: '🕯️', title: 'Ambiance intime', desc: '38 couverts, une salle lumineuse et une terrasse en été.' },
  ];

  return (
    <section style={{ background: 'var(--light)', padding: '80px 24px' }}>
      <div style={{ ...S.maxW }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, background: 'var(--border)' }}>
          {cards.map(({ emoji, title, desc }) => (
            <div key={title} style={{ background: 'var(--light)', padding: '2.5rem 2rem' }}>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{emoji}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18, marginBottom: 10 }}>{title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── MENU ── */
function MenuSection() {
  const cats = Object.keys(MENU);
  const [active, setActive] = useState(cats[0]);

  return (
    <section id="menu" style={{ ...S.section, background: 'var(--white)' }}>
      <div style={S.maxW}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 52, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p style={S.label}>La carte</p>
            <h2 style={{ ...S.h2, marginBottom: 0 }}>Menu <em>de saison</em></h2>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {cats.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                padding: '8px 20px', borderRadius: 20, fontSize: 13,
                border: '1px solid',
                borderColor: active === cat ? 'var(--text)' : 'var(--border)',
                background: active === cat ? 'var(--text)' : 'transparent',
                color: active === cat ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}>{cat}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
          {MENU[active].map((item, i) => (
            <div key={item.name} style={{
              background: 'var(--white)', padding: '2rem',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--off-white)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 16 }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 400 }}>{item.name}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 18, whiteSpace: 'nowrap' }}>{item.price} €</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: '20px 24px', background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 16 }}>Menu du marché</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 12 }}>Entrée + Plat + Dessert</span>
          </div>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 20 }}>38 €</span>
        </div>
      </div>
    </section>
  );
}

/* ── HISTOIRE ── */
function Histoire() {
  return (
    <section id="histoire" style={{ ...S.section, background: 'var(--text)', color: 'white' }}>
      <div style={{ ...S.maxW, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <p style={{ ...S.label, color: 'rgba(255,255,255,0.4)' }}>Notre histoire</p>
          <h2 style={{ ...S.h2, color: 'white' }}>
            Nés de la<br /><em>passion</em>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, marginBottom: 20 }}>
            Maison Kuro a ouvert ses portes en 2018 avec une idée simple : cuisiner comme à la maison, avec les meilleurs produits du moment. Pas de chichis, juste de la bonne cuisine.
          </p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, marginBottom: 40 }}>
            Thomas, notre chef, s'approvisionne chaque matin au marché des Martyrs. La carte change donc chaque semaine — parfois chaque jour.
          </p>
          <div style={{ display: 'flex', gap: 48 }}>
            {[['2018', 'Ouverture'], ['★ 4.9', 'Google'], ['7', 'Années']].map(([n, l]) => (
              <div key={n}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 30, color: 'white' }}>{n}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '3rem' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontStyle: 'italic', color: 'white', lineHeight: 1.55, marginBottom: 28 }}>
            "Je cuisine ce que j'ai envie de manger. Des produits vrais, des recettes sincères, des gens heureux."
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👨‍🍳</div>
            <div>
              <div style={{ fontSize: 14, color: 'white', fontWeight: 500 }}>Thomas Avril</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Chef & fondateur</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── AVIS ── */
function AvisSection() {
  return (
    <section id="avis" style={{ ...S.section, background: 'var(--off-white)' }}>
      <div style={S.maxW}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={S.label}>Avis clients</p>
          <h2 style={{ ...S.h2, marginBottom: 8 }}>Ce qu'ils <em>disent</em></h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>4.9/5 · 280 avis Google</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {AVIS.map(({ initials, name, stars, text, date }) => (
            <div key={name} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 4, padding: '1.75rem' }}>
              <div style={{ color: '#F59E0B', fontSize: 13, marginBottom: 14, letterSpacing: 2 }}>{'★'.repeat(stars)}</div>
              <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>"{text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500 }}>{initials}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── RÉSERVATION ── */
function Reservation() {
  const [form, setForm] = useState({ nom: '', email: '', tel: '', date: '', heure: '19:30', couverts: '2', message: '' });
  const [sent, setSent] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    border: '1px solid var(--border)', borderRadius: 4,
    fontSize: 14, color: 'var(--text)', background: 'white',
    outline: 'none', transition: 'border-color 0.2s',
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="reservation" style={{ ...S.section, background: 'var(--white)' }}>
      <div style={{ ...S.maxW, maxWidth: 700 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={S.label}>Réservation</p>
          <h2 style={{ ...S.h2, marginBottom: 8 }}>Réservez votre <em>table</em></h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Confirmation par email · Annulation gratuite 24h avant</p>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px solid var(--border)', borderRadius: 4 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, marginBottom: 8 }}>Demande envoyée !</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Nous vous confirmons votre réservation par email dans les 2 heures.</p>
            <button onClick={() => setSent(false)} style={{ marginTop: 24, background: 'none', border: '1px solid var(--border)', padding: '10px 24px', borderRadius: 4, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>Nouvelle réservation</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <input style={inputStyle} placeholder="Votre nom *" value={form.nom} onChange={set('nom')} required
                onFocus={e => e.target.style.borderColor = 'var(--text)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <input style={inputStyle} type="email" placeholder="Email *" required
                onFocus={e => e.target.style.borderColor = 'var(--text)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <input style={inputStyle} type="tel" placeholder="Téléphone"
              onFocus={e => e.target.style.borderColor = 'var(--text)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              <input style={inputStyle} type="date" value={form.date} onChange={set('date')} required
                onFocus={e => e.target.style.borderColor = 'var(--text)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.heure} onChange={set('heure')}>
                {['12:00','12:30','13:00','13:30','19:00','19:30','20:00','20:30','21:00','21:30'].map(h => <option key={h}>{h}</option>)}
              </select>
              <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.couverts} onChange={set('couverts')}>
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'couvert' : 'couverts'}</option>)}
              </select>
            </div>
            <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }}
              placeholder="Message, allergies, occasion particulière…"
              value={form.message} onChange={set('message')}
              onFocus={e => e.target.style.borderColor = 'var(--text)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button type="submit" style={{
              background: 'var(--text)', color: 'white', border: 'none',
              padding: '15px', borderRadius: 4, fontSize: 14, fontWeight: 500,
              marginTop: 4, transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >Confirmer la réservation</button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{ background: 'var(--light)', borderTop: '1px solid var(--border)', padding: '56px 24px 32px' }}>
      <div style={S.maxW}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 20, marginBottom: 12 }}>{CONFIG.name}</div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{CONFIG.tagline}</p>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 14 }}>Adresse</div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9 }}>{CONFIG.address}<br />Métro {CONFIG.metro}</p>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 14 }}>Horaires</div>
            {CONFIG.hours.map(h => <p key={h} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9 }}>{h}</p>)}
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 14 }}>Contact</div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9 }}>{CONFIG.phone}<br />{CONFIG.email}<br />{CONFIG.instagram}</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>© 2025 {CONFIG.name} · Tous droits réservés</p>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Site réalisé par votre agence · <span style={{ color: 'var(--text)' }}>contact@votreagence.fr</span></p>
        </div>
      </div>
    </footer>
  );
}

/* ── APP ── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <Nav scrolled={scrolled} />
      <Hero />
      <Ambiance />
      <MenuSection />
      <Histoire />
      <AvisSection />
      <Reservation />
      <Footer />
    </>
  );
}
