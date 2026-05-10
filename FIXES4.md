# FIXES 4 — 4 задачи

---

## FIX 1 — ProjectsSection.tsx — Адаптивная сетка + модалка "All Projects"

### 1а — Breakpoints сетки

Сетка должна меняться в зависимости от ширины экрана:

| Ширина | Колонки | Карточек видно |
|--------|---------|----------------|
| ≥ 1200px | 3 колонки (текущий bento) | все 9 |
| 768–1199px | 2 колонки | 6 карточек (первые 6) |
| < 768px | 1 колонка | 3 карточки (первые 3) |

Реализация через state:
```tsx
const [cols, setCols] = useState(3)
const [visibleCount, setVisibleCount] = useState(9)

useEffect(() => {
  const update = () => {
    const w = window.innerWidth
    if (w < 768) { setCols(1); setVisibleCount(3) }
    else if (w < 1200) { setCols(2); setVisibleCount(6) }
    else { setCols(3); setVisibleCount(9) }
  }
  update()
  window.addEventListener("resize", update)
  return () => window.removeEventListener("resize", update)
}, [])
```

Рендер:
- `cols === 3`: текущий трёхколоночный flex bento (левая col flex 1.2, центр flex 1.8, правая flex 1.2)
- `cols === 2`: обычный grid 2 колонки, показываем `projects.slice(0, visibleCount)`, одинаковая высота карточек 300px
- `cols === 1`: flex column, показываем `projects.slice(0, visibleCount)`, высота карточек 220px

### 1б — Кнопка "All Projects" → модалка со списком всех проектов

Сейчас кнопка "All Projects" просто href="#projects". Нужно сделать её открывающей модалку.

Добавь новый компонент `AllProjectsModal`:

```tsx
function AllProjectsModal({ onClose, onSelect }: {
  onClose: () => void
  onSelect: (project: typeof projects[0]) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9998,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "#111",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          width: "100%", maxWidth: 700,
          maxHeight: "80vh",
          overflow: "auto",
          padding: 32
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ color: "white", fontSize: 22, fontWeight: 600, margin: 0 }}>All Projects</h2>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 18 }}>×</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {projects.map(p => (
            <div
              key={p.id}
              onClick={() => { onClose(); setTimeout(() => onSelect(p), 100) }}
              style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <img src={p.img} alt={p.title} style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover", filter: "grayscale(1)" }} />
              <div>
                <div style={{ color: "white", fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {p.tags.slice(0, 2).map(tag => (
                    <span key={tag} style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: 999 }}>{tag}</span>
                  ))}
                </div>
              </div>
              <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.3)", fontSize: 18 }}>→</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
```

Добавь state:
```tsx
const [showAllProjects, setShowAllProjects] = useState(false)
```

Кнопку "All Projects" измени:
```tsx
<button
  onClick={() => setShowAllProjects(true)}
  className="backdrop-blur-md bg-white/15 border border-white/30 text-white rounded-full px-7 py-3 text-sm font-medium hover:bg-white/25 transition-all duration-300"
>
  All Projects
</button>
```

В JSX добавь:
```tsx
{showAllProjects && (
  <AllProjectsModal
    onClose={() => setShowAllProjects(false)}
    onSelect={(p) => setSelectedProject(p)}
  />
)}
```

---

## FIX 2 — FAQSection.tsx — Заменить иллюстрацию на анимацию кода (typing effect)

### УДАЛИ всё что сейчас стоит слева (SVG, img, Lottie — всё)

### Вставь вместо этого блок с typing-анимацией кода.

Это точная копия реализации из `src/components/AboutSection.tsx` (файл есть на диске, прочитай его).

В AboutSection есть:
- Массив `lines` с токенами и цветами
- Массив `allChars` — развёртка всех символов
- State `charIndex` и `phase` ('typing' | 'pause' | 'erasing')
- useEffect с таймерами: typing 45ms/char, pause 2500ms, erasing 18ms/char

**Скопируй эти данные и логику целиком в FAQSection.**

Рендер блока кода (вместо иллюстрации слева):
```tsx
<div style={{
  background: "#0d1117",
  borderRadius: 12,
  padding: "20px 24px",
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  fontSize: 13,
  lineHeight: 1.7,
  minHeight: 280,
  border: "1px solid rgba(255,255,255,0.08)",
  overflow: "hidden"
}}>
  {/* Filename bar */}
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
    <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
    <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
    <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginLeft: 8 }}>portfolio.tsx</span>
  </div>
  {/* Code content */}
  <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
    {(() => {
      // Rebuild visible text from allChars up to charIndex
      // Group by line, render with colors
      const visible = allChars.slice(0, charIndex)
      const lineGroups: { char: string; color: string }[][] = [[]]
      visible.forEach(c => {
        if (c.type === 'newline') lineGroups.push([])
        else lineGroups[lineGroups.length - 1].push(c)
      })
      return lineGroups.map((line, li) => (
        <div key={li}>
          {line.map((c, ci) => (
            <span key={ci} style={{ color: c.color }}>{c.char}</span>
          ))}
          {li === lineGroups.length - 1 && (
            <span style={{
              display: "inline-block",
              width: 2, height: "1em",
              background: "#79c0ff",
              verticalAlign: "text-bottom",
              animation: "blink 1s step-end infinite"
            }} />
          )}
        </div>
      ))
    })()}
  </pre>
  <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
</div>
```

---

## FIX 3 — Navbar — Nav-ссылки появляются вместе с хедером

Открой `src/components/Navbar.tsx` (или как называется файл навигации).

Найди nav-ссылки справа (Services, Projects, About, Contact).

Они должны появляться с анимацией — fade in + небольшой сдвиг вверх — одновременно с появлением хедера при загрузке страницы.

Оберни их в motion.div:
```tsx
<motion.div
  initial={{ opacity: 0, y: -8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
  className="hidden md:flex items-center gap-8"
>
  {/* nav links here */}
</motion.div>
```

Надпись "dev." оставь без изменений — не трогай.

---

## FIX 4 — HeroSection.tsx — Чёрный overlay с fade-out через 2 секунды

В `HeroSection.tsx` добавь state и overlay:

```tsx
const [overlayVisible, setOverlayVisible] = useState(true)

useEffect(() => {
  const t = setTimeout(() => setOverlayVisible(false), 2000)
  return () => clearTimeout(t)
}, [])
```

В JSX, ПЕРВЫМ дочерним элементом внутри `<motion.section>` (до ShaderBackground), добавь:

```tsx
<AnimatePresence>
  {overlayVisible && (
    <motion.div
      key="overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{
        position: "absolute",
        inset: 0,
        background: "#000",
        zIndex: 50,
        pointerEvents: "none"
      }}
    />
  )}
</AnimatePresence>
```

Убедись что `AnimatePresence` импортирован из framer-motion.

---

## После всех правок

```bash
npm run build
```
0 ошибок, 0 type errors.
