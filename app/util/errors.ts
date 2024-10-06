export function getErrorMessage(response: any): Array<string> {
  if (response.message) {
    const { message } = response;
    if (Array.isArray(message)) {
      return message.map(formatErrorMessage);
    }
    return [formatErrorMessage(message)];
  }
  return ["Unknown error ocurred."];
}

function formatErrorMessage(message: string) {
  return message.charAt(0).toUpperCase() + message.slice(1);
}
