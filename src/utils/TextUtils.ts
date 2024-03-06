/**
 * Returns the firebase message without error code which is first word
 */
export const showFirebaseMessage = (message: string): string | undefined => {
  let messageArray = message.split(" ");
  messageArray.shift();
  return messageArray.join(" ");
};
