// Must match backend validation in packages/api/src/yubal_api/schemas/jobs.py
// and core validation in packages/yubal/src/yubal/utils/url.py
export const YOUTUBE_URL_PATTERN =
  /^https?:\/\/(music\.youtube\.com\/(playlist\?list=|browse\/|watch\?v=)|(?:www\.|m\.)?youtube\.com\/(playlist\?list=|watch\?v=|shorts\/|live\/|embed\/|e\/|v\/|vi\/)|youtu\.be\/|(?:www\.)?youtube-nocookie\.com\/embed\/)[\w-]+/;

export function isValidUrl(url: string): boolean {
  return YOUTUBE_URL_PATTERN.test(url);
}

export interface SharedTargetInput {
  title?: string | null;
  text?: string | null;
  url?: string | null;
}

function cleanUrlCandidate(candidate: string): string {
  return candidate.trim().replace(/[),.;!?]+$/, "");
}

export function extractSharedUrl(input: SharedTargetInput): string | null {
  const candidates = [input.url, input.text, input.title].filter(
    (value): value is string => Boolean(value),
  );

  for (const candidate of candidates) {
    const cleaned = cleanUrlCandidate(candidate);
    if (isValidUrl(cleaned)) return cleaned;
  }

  const urlRegex = /https?:\/\/[^\s]+/g;
  for (const candidate of candidates) {
    for (const match of candidate.matchAll(urlRegex)) {
      const cleaned = cleanUrlCandidate(match[0]);
      if (isValidUrl(cleaned)) return cleaned;
    }
  }

  return null;
}

export const extractUrlFromShare = extractSharedUrl;
export const extractUrlFromShareTarget = extractSharedUrl;
export const extractSharedTargetUrl = extractSharedUrl;
export const getSharedUrl = extractSharedUrl;
