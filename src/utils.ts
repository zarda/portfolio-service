// Utility helpers shared across the app

// Generate live screenshot URL from a website
export const getScreenshotUrl = (url: string) =>
  // Using image.thum.io - free screenshot service
  `https://image.thum.io/get/width/600/crop/400/${url}`


