# Как установить и запустить проект

## Распаковка и установка зависимостей

### Шаг 1: Скачайте проект
Склонируйте репозиторий:
```bash
git clone https://github.com/feeling-alive/charming-creative-craft.git
cd charming-creative-craft
```

### Шаг 2: Установите зависимости

**NPM (рекомендуется):**
```bash
npm install
```

**Yarn:**
```bash
yarn
```

**PNPM:**
```bash
pnpm install
```

### Шаг 3: Запуск проекта

**Development режим (с hot-reload):**
```bash
npm run dev
```
Откроет http://localhost:5173

**Production сборка:**
```bash
npm run build
```

**Предпросмотр production сборки:**
```bash
npm run preview
```

## Возможные проблемы

### Ошибка "node_modules not found"
```bash
npm install
```

### Ошибка версии Node
Требуется Node.js 18+
```bash
node -v  # проверить версию
```

Обновить Node: https://nodejs.org/

### Очистка и переустановка
```bash
rm -rf node_modules package-lock.json
npm install
```