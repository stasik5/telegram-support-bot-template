// ==================== KEYBOARD BUILDER ====================
// Helper functions to create Telegram inline keyboards

const { style } = require('../config/style');

/**
 * Build main menu keyboard
 */
function buildMainMenu() {
  return {
    inline_keyboard: [
      [
        { text: style.button.faq, callback_data: 'menu_faq' }
      ],
      [
        { text: style.button.contact, callback_data: 'menu_contact' },
        { text: style.button.about, callback_data: 'menu_about' }
      ],
      [
        { text: style.button.help, callback_data: 'menu_help' }
      ]
    ]
  };
}

/**
 * Build FAQ menu keyboard with FAQ items
 */
function buildFAQMenu(faqItems) {
  // Create keyboard rows (2 buttons per row)
  const buttons = faqItems.map(item => ({
    text: item.question,
    callback_data: item.id
  }));

  // Chunk into rows of 2
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }

  // Add back button
  rows.push([{ text: style.button.back, callback_data: 'menu_main' }]);

  return {
    inline_keyboard: rows
  };
}

/**
 * Build simple reply keyboard
 */
function buildReplyKeyboard(buttons) {
  return {
    reply_markup: {
      keyboard: buttons,
      resize_keyboard: style.keyboard.resize,
      one_time_keyboard: style.keyboard.oneTime
    }
  };
}

/**
 * Remove keyboard from message
 */
function removeKeyboard() {
  return {
    reply_markup: {
      remove_keyboard: true
    }
  };
}

module.exports = {
  buildMainMenu,
  buildFAQMenu,
  buildReplyKeyboard,
  removeKeyboard
};
