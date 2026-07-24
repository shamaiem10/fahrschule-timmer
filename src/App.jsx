import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

const revealEase = [0.16, 1, 0.3, 1];
const viewport = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' };

const roadmap = [
  { title: 'Anmeldung', text: 'Den persönlichen Weg zum Führerschein beginnen.', icon: 'bi-person-check' },
  { title: 'Theorie', text: 'Regeln verstehen und Wissen festigen.', icon: 'bi-journal-check' },
  { title: 'Praxis', text: 'Fahrabläufe ruhig und sicher üben.', icon: 'bi-car-front' },
  { title: 'Prüfung', text: 'Vorbereitet das Gelernte zeigen.', icon: 'bi-award' }
];

const reasons = [
  { title: 'Sicherheit', icon: 'bi-shield-check', bullets: ['Ruhig lernen', 'Klar handeln', 'Sicher entscheiden'] },
  { title: 'Orientierung', icon: 'bi-traffic-cone', bullets: ['Schritte erkennen', 'Ziele verstehen', 'Fortschritt sehen'] },
  { title: 'Klarheit', icon: 'bi-lightning-charge', bullets: ['Direkte Erklärungen', 'Fokus behalten', 'Wissen anwenden'] },
  { title: 'Respekt', icon: 'bi-people', bullets: ['Aufmerksam begleiten', 'Fragen zulassen', 'In Ruhe lernen'] }
];

const journey = [
  { title: 'Anmeldung', text: 'Der erste Schritt auf dem Weg zum Führerschein.' },
  { title: 'Unterlagen', text: 'Die allgemein erforderlichen Nachweise vorbereiten.' },
  { title: 'Theorie lernen', text: 'Verkehrsregeln verstehen und das Wissen festigen.' },
  { title: 'Fahrstunden', text: 'Fahrabläufe schrittweise kennenlernen und wiederholen.' },
  { title: 'Vorbereitung', text: 'Theorie und Praxis gezielt zusammenführen.' },
  { title: 'Prüfung', text: 'Das Gelernte konzentriert und sicher anwenden.' }
];

const documents = [
  { title: 'Ausweis', icon: 'bi-card-checklist', text: 'Ein gültiges Ausweisdokument kann für den Antrag erforderlich sein.' },
  { title: 'Sehtest', icon: 'bi-eye', text: 'Ein gültiger Sehtest gehört üblicherweise zu den Unterlagen.' },
  { title: 'Erste Hilfe', icon: 'bi-lifebuoy', text: 'Ein entsprechender Nachweis kann für den Antrag benötigt werden.' }
];

const learning = [
  { title: 'Klare Erklärungen', icon: 'bi-journal-check', text: 'Lernziele werden verständlich eingeordnet und in überschaubare Schritte gegliedert.' },
  { title: 'Ruhige Begleitung', icon: 'bi-headset', text: 'Fragen und Wiederholungen schaffen Sicherheit beim Lernen.' },
  { title: 'Fester Lernweg', icon: 'bi-clipboard-check', text: 'Wissen wird nachvollziehbar aufgebaut und praktisch eingeordnet.' }
];

const values = [
  { title: 'Sicherheit', icon: 'bi-shield-lock', text: 'Umsichtiges Handeln steht im Mittelpunkt.' },
  { title: 'Respekt', icon: 'bi-people', text: 'Lernen braucht einen fairen und ruhigen Umgang.' },
  { title: 'Verständnis', icon: 'bi-lightbulb', text: 'Klare Erklärungen machen Zusammenhänge greifbar.' },
  { title: 'Ruhe', icon: 'bi-clock', text: 'Wiederholung schafft Routine und Vertrauen.' }
];

const generalFaq = [
  { q: 'Welche Unterlagen werden benötigt?', a: 'Häufig gehören Ausweisdokument, Sehtest und ein Erste-Hilfe-Nachweis dazu. Die Anforderungen können je nach Behörde variieren.' },
  { q: 'Wie läuft der Weg zum Führerschein ab?', a: 'Im Allgemeinen folgen auf Anmeldung und Antrag die theoretische und praktische Ausbildung sowie die jeweiligen Prüfungen.' },
  { q: 'Wann beginnen die Fahrstunden?', a: 'Der passende Ablauf hängt vom individuellen Lernstand und der persönlichen Planung ab.' },
  { q: 'Wie kann ich offene Fragen klären?', a: 'Nutze die Anfrage, um deinen Bedarf und deine Fragen direkt zu beschreiben.' }
];

const learningFaq = [
  { q: 'Wie greifen Theorie und Praxis ineinander?', a: 'Theoretisches Wissen hilft, Situationen in der Praxis früh zu erkennen und sicher einzuordnen.' },
  { q: 'Was hilft bei schwierigen Manövern?', a: 'Ruhige Wiederholung und klar gegliederte Einzelschritte unterstützen den Lernprozess.' },
  { q: 'Wie entsteht mehr Sicherheit am Steuer?', a: 'Durch verständliche Rückmeldung, Wiederholung und zunehmend selbstständiges Entscheiden.' }
];

function Reveal({ children, className = '', delay = 0, x = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: reduced ? 0 : x, y: reduced ? 0 : 20, scale: reduced ? 1 : 0.98 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={viewport}
      transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : delay, ease: revealEase }}
    >
      {children}
    </motion.div>
  );
}

function ActionLink({ href, children, secondary = false, dark = false }) {
  const reduced = useReducedMotion();
  return (
    <motion.a
      href={href}
      className={`button ${secondary ? 'button-secondary' : ''} ${dark ? 'button-dark' : ''}`}
      whileHover={reduced ? {} : { y: -2, scale: secondary ? 1.025 : 1.04 }}
      whileTap={reduced ? {} : { scale: 0.97 }}
      transition={{ type: reduced ? 'tween' : 'spring', stiffness: 260, damping: 20, mass: 0.7 }}
    >
      <span>{children}</span><motion.i className="bi bi-arrow-right" aria-hidden="true" whileHover={reduced ? {} : { x: 4, rotate: 3 }} />
    </motion.a>
  );
}

function CursorGlow() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springX = useSpring(x, { stiffness: 180, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 180, damping: 24, mass: 0.35 });

  if (reduced) return null;
  return <motion.div className="cursor-glow" style={{ x: springX, y: springY }} onPointerMove={() => null} />;
}

function PointerTracker({ children }) {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springX = useSpring(x, { stiffness: 180, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 180, damping: 24, mass: 0.35 });
  const move = (event) => {
    x.set(event.clientX - 90);
    y.set(event.clientY - 90);
  };
  return (
    <div onPointerMove={move}>
      <motion.div className="cursor-glow" style={{ x: springX, y: springY }} />
      {children}
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const links = [
    ['Startseite', '#startseite'],
    ['Weg zum Führerschein', '#weg'],
    ['Theorie & Praxis', '#theorie-praxis'],
    ['Über uns', '#ueber-uns'],
    ['Kontakt', '#kontakt']
  ];
  return (
    <motion.header className="site-header" initial={{ opacity: 0, y: reduced ? 0 : -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.2 : 0.5, delay: 0.05, ease: revealEase }}>
      <nav className="nav-shell" aria-label="Hauptnavigation">
        <a className="brand" href="#startseite"><span className="brand-mark"><i className="bi bi-steering-wheel" /></span><span>Fahrschule <strong>Timmer</strong></span></a>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menü öffnen">
          <motion.i className={open ? 'bi bi-x-lg' : 'bi bi-list'} animate={{ rotate: open ? 90 : 0 }} transition={{ duration: reduced ? 0 : 0.25 }} />
        </button>
        <div className="desktop-links">
          {links.map(([label, href], index) => <motion.a key={href} href={href} whileHover={reduced ? {} : { y: -2 }} transition={{ delay: index * 0.055 }}>{label}</motion.a>)}
        </div>
        <AnimatePresence>
          {open && (
            <motion.div className="mobile-links" initial={{ opacity: 0, y: reduced ? 0 : -12, scaleY: reduced ? 1 : 0.96 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0.2 : 0.32, ease: revealEase }}>
              {links.map(([label, href], index) => <motion.a key={href} href={href} onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : index * 0.045 }}>{label}</motion.a>)}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const roadY = useTransform(scrollYProgress, [0, 0.35], [0, reduced ? 0 : 28]);
  const dotY = useTransform(scrollYProgress, [0, 0.35], [0, reduced ? 0 : 360]);
  const words = ['Sicher', 'lernen.', 'Klar', 'Richtung', 'Führerschein', 'fahren.'];
  return (
    <section id="startseite" className="hero section-pad-xl">
      <motion.div className="road-band" style={{ y: roadY }} initial={{ clipPath: reduced ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: reduced ? 0.2 : 0.9, ease: revealEase }}>
        <motion.div className="road-line" initial={{ backgroundPositionX: reduced ? 0 : -80 }} animate={{ backgroundPositionX: 0 }} transition={{ duration: reduced ? 0.2 : 1.2, delay: reduced ? 0 : 0.25, ease: 'easeOut' }} />
        <motion.span className="progress-dot" style={{ y: dotY }} />
      </motion.div>
      <div className="container hero-content">
        <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}><i className="bi bi-flag" /> Fahrschule Timmer</motion.div>
        <h1 aria-label={words.join(' ')}>
          {words.map((word, index) => <motion.span key={word + index} initial={{ opacity: 0, y: reduced ? 0 : 20, rotate: reduced ? 0 : 1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 0.12 + index * 0.07, ease: revealEase }}>{word} </motion.span>)}
        </h1>
        <motion.p className="hero-copy" initial={{ opacity: 0, y: reduced ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 0.65, ease: revealEase }}>Mit klaren Lernschritten, ruhiger Begleitung und dem Fokus auf sicheres Fahren.</motion.p>
        <motion.div className="button-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.76 }}>
          <ActionLink href="#kontakt">Jetzt anfragen</ActionLink>
          <ActionLink href="#weg" secondary>Ablauf ansehen</ActionLink>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return <Reveal className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text ? <p>{text}</p> : null}</Reveal>;
}

function QuickRoadmap() {
  const reduced = useReducedMotion();
  return (
    <section className="section section-pad-lg surface-tint" aria-labelledby="roadmap-title">
      <div className="container narrow-wide">
        <SectionHeading eyebrow="Der Überblick" title="Vier Schritte, eine klare Richtung" text="Der Weg wird übersichtlich, wenn jeder Abschnitt verständlich vor dir liegt." />
        <motion.div className="card-grid four roadmap-grid" initial="hidden" whileInView="show" viewport={viewport} variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.09 } } }}>
          <motion.div className="lane-divider" initial={{ scaleX: reduced ? 1 : 0 }} whileInView={{ scaleX: 1 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.8, ease: revealEase }} />
          {roadmap.map((item, index) => (
            <motion.article key={item.title} className="card roadmap-card" tabIndex="0" variants={{ hidden: { opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.97 }, show: { opacity: 1, y: 0, scale: 1 } }} whileHover={reduced ? {} : { y: -4, scale: 1.015 }}>
              <span className="step-number">0{index + 1}</span><motion.span className="icon-badge" whileHover={reduced ? {} : { scale: 1.08, rotate: 3 }}><i className={`bi ${item.icon}`} /></motion.span><h3>{item.title}</h3><p>{item.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WhyTimmer() {
  const reduced = useReducedMotion();
  return (
    <section className="section section-pad-lg" aria-labelledby="why-title">
      <div className="container narrow-wide">
        <SectionHeading eyebrow="Warum Timmer" title="Klarheit schafft Vertrauen" text="Lernen gelingt dort, wo Orientierung, Ruhe und Sicherheit zusammenkommen." />
        <div className="card-grid four">
          {reasons.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.085}>
              <motion.article className="card reason-card" tabIndex="0" whileHover={reduced ? {} : { y: -5, scale: 1.012 }}>
                <span className="top-rule" /><motion.span className="speckle-icon" whileHover={reduced ? {} : { scale: 1.06, rotate: 2 }}><i className={`bi ${item.icon}`} /></motion.span><h3>{item.title}</h3><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TheoryPracticeSplit() {
  const reduced = useReducedMotion();
  const panels = [
    { title: 'Theorie', icon: 'bi-journal-text', text: 'Klare Lernziele helfen dabei, Verkehrsregeln nicht nur auswendig zu kennen, sondern verständlich einzuordnen.', points: ['Zusammenhänge verstehen', 'Wissen wiederholen', 'Situationen einordnen'] },
    { title: 'Praxis', icon: 'bi-speedometer2', text: 'Ruhige Wiederholungen machen Fahrabläufe nachvollziehbar und unterstützen sicheres, selbstständiges Handeln.', points: ['Blickführung üben', 'Abläufe festigen', 'Sicherheit entwickeln'] }
  ];
  return (
    <section className="section section-pad-xl split-section surface-tint" aria-labelledby="split-title">
      <div className="container narrow-wide">
        <SectionHeading eyebrow="Theorie & Praxis" title="Verstehen und anwenden" text="Beide Bereiche greifen ineinander und geben dem Lernen eine klare Struktur." />
        <div className="split-grid">
          <span className="vertical-divider" />
          {panels.map((panel, index) => (
            <Reveal key={panel.title} x={reduced ? 0 : index === 0 ? -24 : 24} delay={index * 0.1}>
              <motion.article className="split-panel" whileHover={reduced ? {} : { y: -4, scale: 1.012 }} whileTap={reduced ? {} : { scale: 0.995 }}>
                <motion.i className={`bi ${panel.icon} split-icon`} whileHover={reduced ? {} : { scale: 1.08, rotate: index === 0 ? -4 : 6 }} /><h3>{panel.title}</h3><p>{panel.text}</p><ul className="check-list">{panel.points.map((point) => <li key={point}><i className="bi bi-check2-circle" />{point}</li>)}</ul>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  const reduced = useReducedMotion();
  return (
    <motion.section className="cta-band section-pad-lg" initial={{ opacity: 0, y: reduced ? 0 : 18, scaleY: reduced ? 1 : 0.96 }} whileInView={{ opacity: 1, y: 0, scaleY: 1 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.7, ease: revealEase }}>
      <div className="moving-dashes" />
      <div className="container cta-content"><div><span className="eyebrow inverted">Nächster Schritt</span><h2>Bereit, deinen Weg zu beginnen?</h2><p>Beschreibe kurz dein Anliegen oder sieh dir den Ablauf noch einmal an.</p></div><div className="button-row"><ActionLink href="#kontakt" dark><i className="bi bi-envelope" /> Anfrage senden</ActionLink><ActionLink href="#weg" dark><i className="bi bi-calendar-check" /> Weg ansehen</ActionLink></div></div>
    </motion.section>
  );
}

function Journey() {
  const reduced = useReducedMotion();
  return (
    <section id="weg" className="section section-pad-xl" aria-labelledby="journey-title">
      <div className="container timeline-container">
        <SectionHeading eyebrow="Weg zum Führerschein" title="Schritt für Schritt vorwärts" text="Ein klarer Ablauf macht den Fortschritt greifbar und hilft, den nächsten Abschnitt im Blick zu behalten." />
        <div className="timeline">
          <motion.div className="timeline-line" initial={{ scaleY: reduced ? 1 : 0 }} whileInView={{ scaleY: 1 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.9, ease: revealEase }} />
          {!reduced ? <motion.span className="timeline-dot" animate={{ top: ['0%', '100%'] }} transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }} /> : null}
          {journey.map((step, index) => (
            <Reveal key={step.title} className={`timeline-row ${index % 2 ? 'right' : 'left'}`} x={reduced ? 0 : index % 2 ? 32 : -32} delay={index * 0.11}>
              <motion.article className="timeline-card" whileHover={reduced ? {} : { y: -4, scale: 1.015 }}><span className="timeline-marker"><i className={index === journey.length - 1 ? 'bi bi-flag' : 'bi bi-check2-circle'} /></span><span className="timeline-index">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Documents() {
  const reduced = useReducedMotion();
  return (
    <section className="section section-pad-lg surface-tint">
      <div className="container compact-wide"><SectionHeading eyebrow="Unterlagen & Hinweise" title="Gut vorbereitet starten" text="Diese allgemeinen Hinweise geben Orientierung für die üblichen Unterlagen." /><div className="card-grid three">{documents.map((item, index) => <Reveal key={item.title} delay={index * 0.09}><motion.article className="card document-card" tabIndex="0" whileHover={reduced ? {} : { y: -4, scale: 1.012 }}><span className="corner-flag" /><motion.span className="document-icon" whileHover={reduced ? {} : { scale: 1.08, rotate: -3 }}><i className={`bi ${item.icon}`} /></motion.span><h3>{item.title}</h3><p>{item.text}</p></motion.article></Reveal>)}</div><p className="disclaimer"><i className="bi bi-info-circle" /> Anforderungen können je nach Behörde und Führerscheinklasse variieren.</p></div>
    </section>
  );
}

function Accordion({ items, yellow = false }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return <div className={`accordion ${yellow ? 'accordion-yellow' : ''}`}>{items.map((item, index) => { const isOpen = active === index; return <Reveal key={item.q} delay={index * 0.065}><div className={`accordion-item ${isOpen ? 'open' : ''}`}><motion.button type="button" className="accordion-toggle" onClick={() => setActive(isOpen ? -1 : index)} whileHover={reduced ? {} : { x: 4 }} whileTap={reduced ? {} : { scale: 0.99 }} aria-expanded={isOpen}><span><i className="bi bi-question-circle" />{item.q}</span><motion.i className="bi bi-chevron-down" animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.08 : 1 }} transition={{ duration: reduced ? 0 : 0.28 }} /></motion.button><AnimatePresence initial={false}>{isOpen ? <motion.div className="accordion-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0.2 : 0.32, ease: [0.22, 1, 0.36, 1] }}><p>{item.a}</p></motion.div> : null}</AnimatePresence></div></Reveal>; })}</div>;
}

function FaqTeaser() {
  return <section className="section section-pad-lg"><div className="container faq-width"><SectionHeading eyebrow="Häufige Fragen" title="Was viele vorab wissen möchten" /><Accordion items={generalFaq} /></div></section>;
}

function LearningApproach() {
  const reduced = useReducedMotion();
  return <section id="theorie-praxis" className="section section-pad-xl learning-section surface-tint"><div className="mesh" /><div className="container compact-wide"><SectionHeading eyebrow="Theorie & Praxis" title="Lernen mit Struktur" text="Verständliche Erklärungen und wiederholbare Schritte geben Orientierung in Theorie und Praxis." /><div className="card-grid three">{learning.map((item, index) => <Reveal key={item.title} delay={index * 0.095}><motion.article className="card learning-card" tabIndex="0" whileHover={reduced ? {} : { y: -5, scale: 1.015 }}><span className="top-rule" /><motion.i className={`bi ${item.icon} learning-icon`} whileHover={reduced ? {} : { scale: 1.09, rotate: 3 }} /><h3>{item.title}</h3><p>{item.text}</p></motion.article></Reveal>)}</div></div></section>;
}

function PracticePreparation() {
  const reduced = useReducedMotion();
  const items = [
    ['Blickführung', 'bi-speedometer', 'Verkehr und Umgebung früh wahrnehmen.'],
    ['Geschwindigkeit', 'bi-geo-alt', 'Tempo passend zur Situation einordnen.'],
    ['Manöver', 'bi-traffic-cone', 'Abläufe in klaren Schritten wiederholen.']
  ];
  return <section className="section section-pad-lg route-section"><div className="route-art"><span /></div><div className="container compact-wide practice-grid"><Reveal x={-24}><div className="practice-copy"><span className="eyebrow">Praxisvorbereitung</span><h2>Von den Grundlagen zur Routine</h2><p>Aufmerksamkeit, angepasste Geschwindigkeit und kontrollierte Abläufe bilden eine gemeinsame Grundlage.</p><p>Wiederholung hilft dabei, Entscheidungen zunehmend ruhig und selbstständig zu treffen.</p></div></Reveal><Reveal x={24} delay={0.1}><motion.div className="practice-card" whileHover={reduced ? {} : { y: -4, scale: 1.012 }}>{items.map(([title, icon, text]) => <motion.div className="practice-row" key={title} whileHover={reduced ? {} : { y: -3 }}><motion.i className={`bi ${icon}`} whileHover={reduced ? {} : { scale: 1.08, rotate: 5 }} /><span><strong>{title}</strong><small>{text}</small></span></motion.div>)}</motion.div></Reveal></div></section>;
}

function MiniFaq() {
  return <section className="section section-pad-lg surface-tint"><div className="container faq-width"><SectionHeading eyebrow="Kurz erklärt" title="Fragen zu Theorie und Praxis" /><Accordion items={learningFaq} yellow /></div></section>;
}

function Philosophy() {
  const reduced = useReducedMotion();
  const words = ['Sicherheit', 'beginnt', 'mit', 'Verständnis.'];
  return <section id="ueber-uns" className="section section-pad-xl philosophy"><div className="container philosophy-grid"><Reveal><div className="manifesto"><span className="eyebrow">Über uns</span><h2>{words.map((word, index) => <motion.span key={word} initial={{ opacity: 0, y: reduced ? 0 : 16, rotate: reduced ? 0 : 1 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : index * 0.075, ease: revealEase }}>{word} </motion.span>)}</h2><p>Sicheres Lernen braucht Klarheit, Respekt und die Ruhe, Zusammenhänge wirklich zu verstehen.</p><p>Jeder Schritt soll Orientierung geben und dabei helfen, Verantwortung im Straßenverkehr bewusst zu übernehmen.</p></div></Reveal><Reveal x={24} delay={0.12}><div className="quote-stack"><motion.blockquote tabIndex="0" whileHover={reduced ? {} : { y: -4, scale: 1.012, rotate: -0.4 }}><i className="bi bi-compass" /><span>Klare Richtung statt unnötiger Umwege.</span></motion.blockquote><motion.blockquote tabIndex="0" whileHover={reduced ? {} : { y: -4, scale: 1.012, rotate: -0.4 }}><i className="bi bi-heart" /><span>Respekt und Ruhe schaffen Raum zum Lernen.</span></motion.blockquote></div></Reveal></div></section>;
}

function Values() {
  const reduced = useReducedMotion();
  return <section className="section section-pad-lg values-section surface-tint"><div className="container compact-wide"><SectionHeading eyebrow="Unsere Werte" title="Was den Lernweg trägt" /><div className="card-grid four">{values.map((item, index) => <Reveal key={item.title} delay={index * 0.085}><motion.article className={`card value-card tone-${index % 2}`} tabIndex="0" whileHover={reduced ? {} : { y: -5, scale: 1.015 }}><motion.i className={`bi ${item.icon}`} whileHover={reduced ? {} : { y: -2, scale: 1.08, rotate: 3 }} /><h3>{item.title}</h3><p>{item.text}</p><span className="bottom-rule" /></motion.article></Reveal>)}</div></div></section>;
}

function Contact() {
  const reduced = useReducedMotion();
  const submit = (event) => event.preventDefault();
  return <section id="kontakt" className="section section-pad-xl contact-section"><div className="container contact-width"><SectionHeading eyebrow="Kontakt" title="Was können wir für dich klären?" text="Beschreibe dein Anliegen möglichst kurz und eindeutig." /><div className="contact-grid"><Reveal x={-24}><motion.form className="contact-card" onSubmit={submit} whileHover={reduced ? {} : { y: -3, scale: 1.006 }}><label><span>Name</span><input type="text" name="name" autoComplete="name" required /></label><label><span>E-Mail</span><input type="email" name="email" autoComplete="email" required /></label><label><span>Betreff</span><select name="subject" defaultValue="allgemein"><option value="allgemein">Allgemeine Anfrage</option><option value="ablauf">Frage zum Ablauf</option><option value="termin">Frage zu Terminen</option></select></label><label><span>Nachricht</span><textarea name="message" rows="5" required /></label><motion.button className="button submit-button" type="submit" whileHover={reduced ? {} : { y: -2, scale: 1.04 }} whileTap={reduced ? {} : { scale: 0.96 }} transition={{ type: reduced ? 'tween' : 'spring', stiffness: 260, damping: 20, mass: 0.7 }}><span>Anfrage senden</span><i className="bi bi-envelope" /></motion.button></motion.form></Reveal><Reveal x={24} delay={0.1}><motion.aside className="contact-info" whileHover={reduced ? {} : { y: -3 }}><div className="info-icon-row"><i className="bi bi-envelope" /><i className="bi bi-telephone" /></div><h3>Dein Anliegen im Blick</h3><p>Nutze das Formular für allgemeine Fragen zum Weg zum Führerschein, zu Theorie und Praxis oder zur persönlichen Planung.</p><p>Eine Rückmeldung richtet sich nach dem jeweiligen Anliegen und der aktuellen Erreichbarkeit.</p><span className="info-note"><i className="bi bi-shield-check" /> Bitte keine sensiblen Daten eintragen.</span></motion.aside></Reveal></div></div></section>;
}

function AppointmentNotice() {
  const reduced = useReducedMotion();
  return <section className="section section-pad-lg surface-tint"><div className="container faq-width"><motion.aside className="appointment-notice" initial={{ opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} whileHover={reduced ? {} : { y: -3, scale: 1.008 }} transition={{ duration: reduced ? 0.2 : 0.55, ease: revealEase }}><motion.span className="notice-highlight" initial={{ scaleX: reduced ? 1 : 0 }} whileInView={{ scaleX: 1 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.65, ease: revealEase }} /><span className="notice-icons"><i className="bi bi-info-circle" /><i className="bi bi-calendar" /></span><div><h2>Hinweis zu Terminen und Preisen</h2><p>Termine und Preise bitte direkt anfragen. Die Angaben können je nach persönlichem Bedarf und geplantem Ablauf variieren.</p><a href="#kontakt">Anfrage formulieren <i className="bi bi-arrow-right" /></a></div></motion.aside></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-inner"><a className="brand footer-brand" href="#startseite"><span className="brand-mark"><i className="bi bi-steering-wheel" /></span><span>Fahrschule <strong>Timmer</strong></span></a><p>Klar lernen. Sicher fahren.</p><a href="#startseite">Nach oben <i className="bi bi-arrow-up" /></a></div></footer>;
}

export default function App() {
  return <PointerTracker><Navigation /><main><Hero /><QuickRoadmap /><WhyTimmer /><TheoryPracticeSplit /><CtaBand /><Journey /><Documents /><FaqTeaser /><LearningApproach /><PracticePreparation /><MiniFaq /><Philosophy /><Values /><Contact /><AppointmentNotice /></main><Footer /></PointerTracker>;
}
