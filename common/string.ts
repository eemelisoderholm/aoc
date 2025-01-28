function charCounts(word: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const char of word) {
    if (!counts[char]) counts[char] = 0;
    counts[char]++;
  }
  return counts;
}

export const S = {
  charCounts,
};
