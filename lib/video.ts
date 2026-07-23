/**
 * Helper function to extract YouTube Embed URL from any valid YouTube link
 * Supports:
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function getYouTubeEmbedUrl(url: string | undefined | null): string | null {
  if (!url) return null;

  const trimmed = url.trim();

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);

  if (match && match[2].length === 11) {
    const videoId = match[2];
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
  }

  if (trimmed.includes("youtube.com/embed/")) {
    return trimmed;
  }

  return null;
}

export function isYouTubeUrl(url: string | undefined | null): boolean {
  return getYouTubeEmbedUrl(url) !== null;
}
