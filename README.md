# Charming Creative Craft

Современный портфолио сайт для креативного агентства.

## 🛠 Технологии

- **React 18** + **TypeScript**
- **Vite** — сборка и dev-сервер
- **Tailwind CSS** + **shadcn/ui** — стилизация
- **Framer Motion** — анимации
- **React Three Fiber** — 3D элементы
- **Recharts** — графики

## 📦 Установка зависимостей

### Вариант 1: NPM
```bash
npm install
```

### Вариант 2: Yarn
```bash
yarn install
```

### Вариант 3: PNPM
```bash
pnpm install
```

## 🚀 Запуск

### Development
```bash
npm run dev
```
Откроется http://localhost:5173

### Production сборка
```bash
npm run build
```

### Preview production
```bash
npm run preview
```

## 🌐 Деплой

### Vercel
```bash
vercel --prod
```

### GitHub Pages
1. Создать репозиторий
2. Настроить GitHub Actions или использовать Vercel

## 📁 Структура

```
src/
├── assets/          # Изображения, JSON данные
├── components/      # React компоненты
│   └── ui/          # UI компоненты shadcn
├── hooks/           # Кастомные хуки
├── lib/             # Утилиты
└── pages/           # Страницы
```