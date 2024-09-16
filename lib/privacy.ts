export function maskUserIdInEvent(event: any): any {
  const regex = /(user_)[^&]+/; // Regex to detect and mask userId in URLs
  const maskedUserId = "maskedUserId"; // The string to replace the userId with

  const recurseMask = (data: any): any => {
    if (typeof data === "string") {
      // If it's a string, check if it contains userId and replace
      return data.replace(regex, `$1${maskedUserId}`);
    } else if (typeof data === "object" && data !== null) {
      // If it's an object or array, recursively go through all its properties
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          data[key] = recurseMask(data[key]);
        }
      }
    }
    return data;
  };

  return recurseMask(event);
}
