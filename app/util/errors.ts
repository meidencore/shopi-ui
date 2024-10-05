export function getErrorMessage(response: any) {
  if (response.message) {
    const { message } = response;
    if (Array.isArray(response.message)) {
      return message.map(formatErrorMessage);
    }
    return formatErrorMessage(message);
  }
  return "Unknown error ocurred.";
}

function formatErrorMessage(message: string) {
  return message.charAt(0).toUpperCase() + message.slice(1);
}
