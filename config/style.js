// ==================== UI/UX STYLE CONFIGURATION ====================
// Customize emojis, messages, and bot appearance

module.exports = {
  style: {
    // Emoji configuration
    emoji: {
      wave: '👋',
      info: 'ℹ️',
      menu: '📋',
      faq: '❓',
      contact: '📞',
      about: 'ℹ️',
      pointer: '▸',
      tip: '💡',
      question: '🙋',
      answer: '✍️',
      star: '⭐',
      success: '✅',
      error: '❌'
    },

    // Message templates
    message: {
      sent: 'Your message has been sent to our support team.',
      received: 'Thank you for your message!',
      error: 'Sorry, something went wrong. Please try again.'
    },

    // Button text
    button: {
      faq: '📚 FAQ',
      contact: '📞 Contact',
      about: 'ℹ️ About',
      back: '⬅️ Back to Menu',
      help: '❓ Help'
    },

    // Keyboard style
    keyboard: {
      resize: true,
      oneTime: false
    }
  }
};
