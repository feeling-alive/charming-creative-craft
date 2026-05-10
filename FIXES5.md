# FIXES 5 — 6 правок

---

## FIX 1 — ProjectsSection.tsx — Модалки не перекрываются

Сейчас при открытии All Projects модалки старая Project модалка не закрывается.

В `AllProjectsModal` при клике на проект:
```tsx
// СТАРЫЙ КОД:
onClick={() => { onClose(); setTimeout(() => onSelect(p), 100) }}

// НОВЫЙ КОД — сначала закрываем ВСЕ модалки, потом открываем нужную:
onClick={() => {
  onClose()           // закрыть All Projects modal
  onSelect(p)         // открыть Project modal (onSelect уже закрывает предыдущий)
}}
```

В основном компоненте `ProjectsSection` при клике на карточку:
```tsx
// При открытии Project modal — All Projects modal должен закрыться
onClick={() => {
  setShowAllProjects(false)
  setSelectedProject(projects[projectIndex])
}}
```

---

## FIX 2 — HeroSection.tsx — Overlay не закрывает navbar, задержка 0.75с

### 2а — Уменьши задержку до 0.75 секунды:
```tsx
// БЫЛО:
const t = setTimeout(() => setOverlayVisible(false), 2000)

// СТАЛО:
const t = setTimeout(() => setOverlayVisible(false), 750)
```

### 2б — Overlay НЕ должен перекрывать navbar ("dev." и ссылки)

Navbar имеет `z-50`. Overlay должен иметь `z-40`:
```tsx
style={{
  position: "absolute",  // НЕ fixed, именно absolute — внутри секции
  inset: 0,
  background: "#000",
  zIndex: 40,            // ниже чем navbar (z-50)
  pointerEvents: "none"
}}
```

---

## FIX 3 — Navbar.tsx — Ссылки, стиль, border

### 3а — Переименовать ссылки и якоря:
```tsx
const navLinks = [
  { label: "Projects",  href: "#projects" },
  { label: "Process",   href: "#process" },
  { label: "Reviews",   href: "#reviews" },
  { label: "Contact",   href: "#contact" },
]
```

Убедись что секции на странице имеют соответствующие `id`:
- ProcessSection: `id="process"`
- TestimonialsSection: `id="reviews"`
- ContactSection: `id="contact"`
- ProjectsSection: уже `id="projects"`

### 3б — Ссылки на тёмном фоне — добавить glassmorphism pill

Оберни nav-ссылки в pill-контейнер:
```tsx
<div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
  {navLinks.map((link) => (
    <a
      key={link.label}
      href={link.href}
      className="text-sm text-white/70 hover:text-white transition-colors duration-200 px-4 py-1.5 rounded-full hover:bg-white/10"
    >
      {link.label}
    </a>
  ))}
</div>
```

### 3в — Border снизу nav исчезает вместе с nav, не после

Текущий код: border появляется только когда `scrolled === true`. Добавь `transition-opacity` чтобы border плавно появлялся и исчезал вместе с фоном:

```tsx
<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  scrolled
    ? "bg-background/80 backdrop-blur-md"
    : "bg-transparent"
}`}>
  {/* Отдельный border элемент с opacity transition */}
  <div className={`absolute bottom-0 left-0 right-0 h-px bg-white/[0.06] transition-opacity duration-300 ${
    scrolled ? "opacity-100" : "opacity-0"
  }`} />
  ...
</nav>
```

---

## FIX 4 — FAQSection.tsx — Блок кода уже и длиннее

Найди контейнер блока кода. Измени его размеры:
- Максимальная ширина: `maxWidth: 420px` (уже чем сейчас)
- Минимальная высота: `minHeight: 380px` (длиннее чем сейчас)
- Выровняй по центру если нужно: `margin: "0 auto"`

---

## FIX 5 — Глобальный кастомный скроллбар

Открой `src/index.css` (или `src/App.css` — главный CSS файл).

Добавь в конец файла:
```css
/* Custom scrollbar — тонкий, тёмный, одинаковый везде */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
}
```

Это автоматически применится и к модалкам и к основной странице — один стиль везде.

---

## FIX 6 — ProjectsSection.tsx — Grid: высоты карточек и hover-цвет

### 6а — Уменьшить разницу высот

Сейчас: closestIndex карточка = 550px, остальные = 450px. Разница 100px слишком заметна.

Измени в `getCardHeight`:
```tsx
const getCardHeight = (index: number) => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1200
  if (w < 640) return "180px"
  if (w < 1024) return "260px"
  // Desktop: разница уменьшена до 30px
  return closestIndex === index ? "480px" : "450px"
}
```

### 6б — Починить hover: серые → цветные

Проблема: Tailwind `group-hover:grayscale-0` не переопределяет inline style `filter: grayscale(1)`.

Исправление: убери из inline style всё про filter, перенеси в className:

```tsx
// В imgStyle УБЕРИ эти два свойства:
// filter: "grayscale(1) brightness(0.85)",
// transition: "filter 0.45s ease",

// В тег <img> добавь className:
className="grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
```

Итоговый imgStyle без filter:
```tsx
const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center center",
  position: "absolute",
  top: 0,
  left: 0,
  display: "block"
}
```

### 6в — Анимация появления при скролле

Уже есть `initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}}` — оставь как есть, это правильно.

Добавь на каждую карточку `whileHover={{ scale: 1.02 }}` для лёгкого zoom при наведении:
```tsx
<motion.div
  ...
  whileHover={{ scale: 1.02 }}
  transition={{ ..., scale: { duration: 0.3, ease: "easeOut" } }}
>
```

---

## После всех правок

```bash
npm run build
```
0 ошибок, 0 type errors.

Проверить визуально:
- Кликнуть карточку → открылась Project модалка, больше ничего нет
- Кликнуть "All Projects" → открылась All Projects, кликнуть проект → All Projects закрылась, открылась Project
- Скроллбар тонкий и тёмный везде
- Наведение на карточку: серая → цветная плавно
- Nav ссылки в тёмном pill-контейнере
