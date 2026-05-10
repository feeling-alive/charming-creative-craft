# FIXES 3

---

## FIX 1 — FAQSection.tsx — ЗАПРЕТ НА SVG, ТОЛЬКО LOTTIE

### ВНИМАНИЕ: КРИТИЧЕСКИ ВАЖНО
В текущем коде стоит SVG-элемент (тег `<svg>` или `<img>` с иллюстрацией программиста).
УДАЛИ ЕГО ПОЛНОСТЬЮ. Любой `<svg>`, любой `<img>` на левой стороне — УДАЛИТЬ.

### Что делать пошагово:

**Шаг 1** — Убедись что пакет установлен:
```bash
npm install lottie-react
```
Проверь что в `node_modules` появилась папка `lottie-react`. Если нет — выполни команду ещё раз.

**Шаг 2** — В самом начале файла `src/components/FAQSection.tsx` добавь эти два импорта:
```tsx
import Lottie from "lottie-react";
import codingAnimation from "@/assets/Coding.json";
```

**Шаг 3** — Найди в JSX ВЕСЬ блок где сейчас стоит изображение слева (это может быть `<svg>`, `<img>`, `<div>` с картинкой). УДАЛИ его целиком.

**Шаг 4** — На его место вставь ТОЛЬКО ЭТО и ничего другого:
```tsx
<div style={{ width: "100%", borderRadius: 12, overflow: "hidden", background: "#0a0a0a" }}>
  <Lottie
    animationData={codingAnimation}
    loop={true}
    style={{ width: "100%", height: "auto" }}
  />
</div>
```

**Шаг 5** — Если TypeScript выдаёт ошибку на `import codingAnimation from "@/assets/Coding.json"`, открой `tsconfig.json` и убедись что в `compilerOptions` есть:
```json
"resolveJsonModule": true
```

**Шаг 6** — Запусти `npm run dev` и визуально проверь: в секции FAQ слева должна быть АНИМАЦИЯ (движущийся код), а не статичная картинка.

### КРИТЕРИЙ УСПЕХА:
В DevTools (F12 → Elements) на месте левого блока FAQ должен быть НЕ `<svg>` и НЕ `<img>`,
а `<canvas>` или `<div>` с классами от lottie-player.
Если видишь `<svg xmlns="http://www.w3.org/2000/svg"...>` — ты сделал неправильно, начни заново.

---

## FIX 2 — Адаптивность ProcessSection на мобильных

Проблема: на мобильном тест обрезается справа, layout выходит за экран.

### Исправления:

**2а** — Обернуть правую колонку (список шагов) в контейнер с:
```css
overflow: hidden;
word-break: break-word;
```

**2б** — На мобильных (< 768px) переключать layout с `grid grid-cols-2` на `grid grid-cols-1`:
```tsx
className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
```

**2в** — Текст в каждом шаге:
```tsx
<p className="text-sm text-muted-foreground leading-relaxed break-words overflow-hidden">
```

**2г** — Навигационные кнопки (стрелки + dots) на мобильном должны быть выше списка.
Убедись что они не уходят за правый край: добавь `overflow-x: hidden` на родительский контейнер секции.

**2д** — Изображение слева на мобильном: высота `h-48 lg:h-96`, не фиксированная.

---

## FIX 3 — Адаптивность ProjectsSection (грид) на мобильных

Проблема: на мобильном карточки слишком высокие, обрезаются.

Найди в `ProjectsSection.tsx` функцию `getCardHeight`. Сейчас там:
```ts
if (typeof window !== 'undefined' && window.innerWidth < 1200) return "350px"
```

Замени на:
```ts
const w = typeof window !== "undefined" ? window.innerWidth : 1200
if (w < 640) return "180px"   // mobile
if (w < 1024) return "260px"  // tablet
return closestIndex === index ? "550px" : "450px"  // desktop
```

Также на мобильных (< 640px) переключить layout с трёх колонок на одну:
В JSX найди главный flex-контейнер грида и добавь медиа-логику:
```tsx
// Добавь состояние:
const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 640)

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 640)
  window.addEventListener("resize", check)
  return () => window.removeEventListener("resize", check)
}, [])
```

На мобильном показывать карточки в одну колонку:
```tsx
{isMobile ? (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
    {projects.map((p, i) => makeCard(i, i, 0))}
  </div>
) : (
  // существующий трёхколоночный flex layout
)}
```

---

## После всех правок

```bash
npm run build
```
0 ошибок, 0 type errors.

Визуальная проверка:
- FAQ: в DevTools слева НЕ должно быть `<svg>` — должен быть Lottie canvas/div
- Process: на мобильном текст не обрезается, всё влезает в экран
- Grid: на мобильном карточки одна под другой с высотой 180px
