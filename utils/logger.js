// ==================== LOGGER UTILITIES ====================
// Simple logging for bot events and debugging

/**
 * Log bot events to console with timestamp
 */
function log(event, chatId, additionalInfo = '') {
  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] ${event}`;

  if (chatId) {
    message += ` | Chat: ${chatId}`;
  }

  if (additionalInfo) {
    message += ` | ${additionalInfo}`;
  }

  console.log(message);
}

/**
 * Log errors
 */
function logError(error, context = '') {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR | ${context}`, error.message);
}

/**
 * Log command usage
 */
function logCommand(command, chatId, userName) {
  log(`COMMAND_${command.toUpperCase()}`, chatId, userName);
}

/**
 * Log user actions
 */
function logAction(action, chatId, details = '') {
  log(`ACTION_${action.toUpperCase()}`, chatId, details);
}

module.exports = {
  log,
  logError,
  logCommand,
  logAction
};
