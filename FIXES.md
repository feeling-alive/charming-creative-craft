# FIXES — 3 исправления

---

## FIX 1 — ProjectsSection.tsx

### Проблема 1а: Grid — вернуть бенто-сетку с разными размерами
Текущая версия показывает равную сетку 3×3 с одинаковыми карточками.
Нужно вернуть бенто-grid — средняя колонка шире боковых.

Используй CSS Grid:
```css
grid-template-columns: 1fr 1.5fr 1fr;
```
Карточки должны иметь разную высоту как было в оригинале.
Можно использовать разные классы height: первый ряд центральная карточка выше остальных.

### Проблема 1б: Изображения — серые по умолчанию, цветные при наведении
На каждой карточке:
```css
filter: grayscale(100%);
transition: filter 0.4s ease;
/* on hover: */
filter: grayscale(0%);
```

### Проблема 1в: Модальное окно — сделать шире
max-width модального окна: `max-w-5xl` минимум 900px.
Layout внутри: левая часть (изображение/GIF) 60%, правая (описание) 40%.

---

## FIX 2 — ProcessSection.tsx

### Проблема: Сломана оригинальная структура — ВОССТАНОВИТЬ carousel

Claude Code заменил carousel на вертикальный список. Нужно полностью вернуть оригинальную структуру:

- Слева: изображение которое меняется при переключении шага (анимация fadeIn)
- Справа: список шагов, активный полностью виден (opacity 1), остальные затемнены (opacity 0.4)
- Навигация: кнопки стрелки и dot-индикаторы над списком
- Автопереключение каждые 4 секунды

Замени данные на 6 шагов:

```ts
const steps = [
  {
    id: 1,
    title: "Discovery & Brief",
    desc: "We discuss your goals, target audience, references, timeline and budget. I ask detailed questions to fully understand what you need and what success looks like. This stage eliminates misunderstandings before a single line is written. Duration: 1 call or chat, 30–60 min.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
  },
  {
    id: 2,
    title: "Proposal & Agreement",
    desc: "I send a detailed proposal covering scope of work, timeline, price and payment terms. We agree on deliverables clearly so there are no surprises later. We sign a simple agreement — even via chat. Prepayment is 50% before work begins.",
    img: "https://images.unsplash.com/photo-1554774853-719586f82d77?w=600&q=80"
  },
  {
    id: 3,
    title: "Design Concept",
    desc: "I create wireframes and visual mockups so you see the look and feel before a single line of code is written. You approve the direction first — this saves time and avoids costly rework. Up to 2 revision rounds included. Your approval is required before development starts.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80"
  },
  {
    id: 4,
    title: "Development",
    desc: "Clean structured code with React, TypeScript and Tailwind CSS. Smooth animations, pixel-perfect layout and full mobile responsiveness are standard. You can track progress at any time via a shared preview link. Updates at every major milestone.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"
  },
  {
    id: 5,
    title: "Testing & Review",
    desc: "Full cross-browser and cross-device testing before anything goes live. You get a preview link to review everything at your own pace. I fix whatever is needed — no arguing, no extra charges for agreed scope. Quality is the standard, not the exception.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
  },
  {
    id: 6,
    title: "Launch & Handoff",
    desc: "Deployment to your domain or Vercel with zero downtime. I hand over all files, credentials and a short guide. Post-launch support included for 7 days — any issues after going live are fixed at no additional cost.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
  },
]
```

Обнови: автопереключение `% 6`, dot-индикаторы 6 штук вместо 4.

---

## FIX 3 — FAQSection.tsx

### Проблема: SVG-картинка вместо Lottie-анимации из Coding.json

Убери всё что стоит сейчас на месте изображения слева.
Вставь Lottie-анимацию из файла `src/assets/Coding.json`:

```bash
npm install lottie-react
```

```tsx
import Lottie from "lottie-react";
import codingAnimation from "@/assets/Coding.json";

<div className="w-full h-full rounded-xl overflow-hidden">
  <Lottie
    animationData={codingAnimation}
    loop={true}
    style={{ width: "100%", height: "100%" }}
  />
</div>
```

---

## После всех правок

Запусти `npm run build` — 0 ошибок, 0 type errors.
