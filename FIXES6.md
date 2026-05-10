# FIXES 6 — Финальный фикс блока кода в FAQSection

Найди контейнер блока кода в `src/components/FAQSection.tsx`.

Замени его стили на следующие:

```tsx
<div style={{
  background: "#0a0a0a",
  borderRadius: 12,
  padding: "20px 24px",
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  fontSize: 13,
  lineHeight: 1.7,
  minHeight: 420,
  width: "100%",
  maxWidth: "100%",
  border: "1px solid rgba(255,255,255,0.06)",
  overflow: "hidden",
  marginLeft: 0,
  marginRight: "auto"
}}>
```

Изменения:
- `background: "#0a0a0a"` — под цвет сайта (был синеватый #0d1117)
- `border: "1px solid rgba(255,255,255,0.06)"` — тонкая граница как на остальных карточках
- `minHeight: 420` — чуть длиннее
- `width: "100%", maxWidth: "100%"` — во всю ширину левой колонки
- `marginLeft: 0` — прижат к левому краю

Больше ничего не трогать.

---

```bash
npm run build
```
