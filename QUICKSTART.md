# QUICK START GUIDE

Get your bot running in 5 minutes!

## Step 1: Create Your Bot (1 minute)

1. Open Telegram and search for **@BotFather**
2. Send `/newbot` command
3. Follow the prompts:
   - Choose a name: `My Support Bot`
   - Choose a username: `MySupportBot_bot`
4. **Copy the token** you receive (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

## Step 2: Get Your Telegram ID (30 seconds)

1. Search for **@userinfobot** on Telegram
2. Send it any message
3. **Copy your ID** (number shown in response)

## Step 3: Setup Your Files (2 minutes)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create your config:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` and paste your values:**
   ```env
   BOT_TOKEN=paste_your_token_here
   ADMIN_CHAT_ID=your_telegram_id
   BOT_NAME=My Support Bot
   ```

## Step 4: Run Your Bot! (1 minute)

```bash
npm start
```

You should see:
```
🤖 My Support Bot started successfully!
📱 Listening for messages...
👤 Admin chat ID: 123456789
✅ My Support Bot is ready to assist!
```

## Step 5: Test It

1. Go to Telegram
2. Search for your bot by username
3. Click "Start"
4. Try the menu buttons!

## Customize Your FAQ

Edit `config/faq.js` to change the questions and answers:
```javascript
{
  question: 'Your custom question?',
  answer: 'Your custom answer here!',
  keywords: ['search', 'terms']
}
```

## Need Help?

Check `README.md` for detailed documentation.

---

**That's it!** Your bot is live and ready to assist customers. 🎉
