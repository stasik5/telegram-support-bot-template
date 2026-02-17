# Telegram Bot Templates - Customer Support Bot

A ready-to-deploy Telegram bot template for customer support and FAQ automation.

## Features

- ✅ Interactive FAQ menu with buttons
- ✅ User message forwarding to admin
- ✅ Multi-language support ready
- ✅ Customizable command responses
- ✅ Clean, documented code
- ✅ Environment-based configuration
- ✅ Quick deployment (5 minutes)

## Quick Start

1. **Create a Telegram Bot**
   - Open [@BotFather](https://t.me/BotFather) on Telegram
   - Send `/newbot` and follow instructions
   - Save your bot token

2. **Install Dependencies**
   ```bash
   npm install node-telegram-bot-api dotenv
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env`:
   ```
   BOT_TOKEN=your_bot_token_here
   ADMIN_CHAT_ID=your_telegram_id_for_notifications
   BOT_NAME=YourBotName
   ```

4. **Run the Bot**
   ```bash
   node bot.js
   ```

## Customization

### Adding FAQ Items

Edit `config/faq.js`:
```javascript
{
  question: "How do I contact support?",
  answer: "You can reach us at support@example.com or use this bot!",
  keywords: ["contact", "support", "help"]
}
```

### Adding Commands

Edit `config/commands.js`:
```javascript
{
  command: "about",
  description: "Learn about us",
  response: "We're a company that helps people!"
}
```

### Styling

Edit `config/style.js` to customize:
- Button text
- Message formatting
- Emoji usage

## Deployment Options

### Option 1: Local Development
```bash
node bot.js
```

### Option 2: PM2 (Production)
```bash
npm install -g pm2
pm2 start bot.js --name "support-bot"
pm2 save
pm2 startup
```

### Option 3: Docker
```bash
docker build -t telegram-support-bot .
docker run -d --env-file .env --name support-bot telegram-support-bot
```

### Option 4: VPS/Cloud Service
- Railway.app
- Heroku
- DigitalOcean App Platform
- Render.com

## Project Structure

```
telegram-bot-templates/
├── bot.js                 # Main bot entry point
├── config/
│   ├── faq.js            # FAQ items database
│   ├── commands.js       # Bot commands configuration
│   └── style.js          # UI/UX settings
├── handlers/
│   ├── faq.js            # FAQ menu handler
│   ├── commands.js       # Command handlers
│   └── messages.js       # Message forwarding
├── utils/
│   ├── keyboard.js       # Inline keyboard builder
│   └── logger.js         # Logging utilities
├── .env.example          # Environment template
├── package.json           # Dependencies
└── README.md             # This file
```

## Advanced Features

### Multi-Language Support

1. Create `config/lang/` directory
2. Add language files: `en.js`, `es.js`, etc.
3. Update user language tracking in handlers
4. Reference `MULTILANGUAGE.md` for detailed guide

### Database Integration

For persistent storage:
- SQLite: `npm install better-sqlite3`
- PostgreSQL: `npm install pg`
- MongoDB: `npm install mongodb`

See `DATABASE.md` for integration examples.

### Webhooks (Production)

Instead of polling, use webhooks for better performance:
```bash
curl -F "url=https://yourdomain.com/webhook" \
     https://api.telegram.org/bot<TOKEN>/setWebhook
```

## Support

Need help?
- Email: jim.steeletto@gmail.com
- Telegram: [Contact Support](https://t.me/your_support_bot)

## License

MIT License - Use this template for your own projects!

---

**Bought this template?** Customize it freely for your business needs.
