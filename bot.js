require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// ==================== CONFIGURATION ====================
const token = process.env.BOT_TOKEN;
const adminChatId = process.env.ADMIN_CHAT_ID;
const botName = process.env.BOT_NAME || 'Support Bot';

// Create bot instance
const bot = new TelegramBot(token, { polling: true });

// ==================== IMPORTS ====================
const { faqItems } = require('./config/faq');
const { commands } = require('./config/commands');
const { style } = require('./config/style');
const { buildMainMenu, buildFAQMenu } = require('./utils/keyboard');
const { log } = require('./utils/logger');

// ==================== BOT STARTUP ====================
console.log(`🤖 ${botName} started successfully!`);
console.log(`📱 Listening for messages...`);
console.log(`👤 Admin chat ID: ${adminChatId}`);

// ==================== COMMAND HANDLERS ====================

// /start command - Welcome new users
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'there';

  const welcomeMessage = `
${style.emoji.wave} Welcome, ${userName}!

${style.emoji.info} I'm ${botName}, here to help you with any questions.

${style.emoji.menu} *What can I do?*

${style.emoji.faq} ${commands.faq.description}
${style.emoji.contact} ${commands.contact.description}
${style.emoji.about} ${commands.about.description}

${style.emoji.pointer} Use the buttons below or type /help
`;

  bot.sendMessage(chatId, welcomeMessage, {
    parse_mode: 'Markdown',
    reply_markup: buildMainMenu()
  });

  log('START', chatId, userName);
});

// /help command - Show help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `
${style.emoji.help} *Help & Commands*

${style.emoji.info} Here's what I can do:

${commands.map(cmd =>
  `${style.emoji.pointer} /${cmd.command} - ${cmd.description}`
).join('\n')}

${style.emoji.tip} *Tip:* You can also use the menu buttons for quick access!
`;

  bot.sendMessage(chatId, helpMessage, {
    parse_mode: 'Markdown',
    reply_markup: buildMainMenu()
  });
});

// /faq command - Show FAQ menu
bot.onText(/\/faq/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    `${style.emoji.faq} *Frequently Asked Questions*

${style.emoji.pointer} Choose a topic below:`,
    {
      parse_mode: 'Markdown',
      reply_markup: buildFAQMenu(faqItems)
    }
  );
});

// /about command - About the bot
bot.onText(/\/about/, (msg) => {
  const chatId = msg.chat.id;

  const aboutMessage = `
${style.emoji.about} *About ${botName}*

${style.emoji.info} This is a customer support bot built to help you quickly find answers and get in touch with our team.

${style.emoji.star} *Features:*
- Quick FAQ access
- Easy contact with support
- 24/7 availability
- Instant responses

${style.emoji.contact} Need more help? Use the /contact command.
`;

  bot.sendMessage(chatId, aboutMessage, {
    parse_mode: 'Markdown',
    reply_markup: buildMainMenu()
  });
});

// /contact command - Contact form
bot.onText(/\/contact/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    `${style.emoji.contact} *Contact Support*

${style.emoji.info} Please type your message below and I'll forward it to our support team.

${style.emoji.tip} Your message will be answered as soon as possible (usually within 24 hours).`,
    {
      parse_mode: 'Markdown'
    }
  );
});

// ==================== CALLBACK HANDLERS ====================

// FAQ button callbacks
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  // Check if it's a FAQ selection
  const faqItem = faqItems.find(item => item.id === data);

  if (faqItem) {
    const answerMessage = `
${style.emoji.question} *${faqItem.question}*

${style.emoji.answer} ${faqItem.answer}

${style.emoji.pointer} More questions? Use the menu buttons!
`;

    bot.editMessageText(answerMessage, {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: 'Markdown',
      reply_markup: buildMainMenu()
    });

    bot.answerCallbackQuery(query.id);
  }
});

// ==================== MESSAGE HANDLING ====================

// Handle user messages (forward to admin)
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Skip if it's a command
  if (text && text.startsWith('/')) return;

  // Skip if message is from a bot (handle group messages)
  if (msg.from.is_bot) return;

  // Forward message to admin
  if (adminChatId) {
    const userName = msg.from.first_name || msg.from.username || 'Anonymous';
    const userInfo = `📨 *New message from ${userName}*`;
    const userLink = `👤 User ID: \`${chatId}\``;

    // Check if it's a text message
    if (text) {
      bot.sendMessage(adminChatId, `${userInfo}\n\n${userLink}\n\n💬 *Message:*\n${text}`, {
        parse_mode: 'Markdown'
      });
    } else {
      // Forward non-text messages (photos, documents, etc.)
      bot.forwardMessage(adminChatId, chatId, msg.message_id);
      bot.sendMessage(adminChatId, `${userInfo}\n\n${userLink}`, {
        parse_mode: 'Markdown'
      });
    }

    // Send confirmation to user
    bot.sendMessage(
      chatId,
      `${style.emoji.success} ${style.message.sent}\n\n${style.emoji.tip} We'll reply as soon as possible!`,
      { reply_markup: buildMainMenu() }
    );

    log('MESSAGE_FORWARDED', chatId, userName);
  } else {
    console.warn('⚠️  ADMIN_CHAT_ID not set - messages will not be forwarded');
  }
});

// ==================== ERROR HANDLING ====================

bot.on('polling_error', (error) => {
  console.error('❌ Polling error:', error.code, error.message);
});

// ==================== GRACEFUL SHUTDOWN ====================

process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down gracefully...');
  bot.stopPolling();
  process.exit(0);
});

console.log(`✅ ${botName} is ready to assist!`);
