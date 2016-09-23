/** Format raw message with replacements values
  @param rawMessage (string) : string to interpolate
  @param placeholders (object) : key/values pairs to replace
  @return string : interpolated string
*/
export function formatMessage(rawMessage, placeholders = {}) {

  let message = rawMessage;

  Object.keys(placeholders).forEach(holder => {
    message = message.split(`%{${holder}}`).join(placeholders[holder]);
  });

  return message;
}
