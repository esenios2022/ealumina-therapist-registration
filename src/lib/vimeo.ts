export function extractVimeoId(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(/(\d{6,})/);
  return match ? match[1] : trimmed;
}
