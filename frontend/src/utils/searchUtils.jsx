export const searchTranscript = (transcript, query) => {
  if (!query.trim()) return transcript;

  const searchTerms = query.toLowerCase().split(/\s+/);
  const results = [];

  transcript.forEach((entry, index) => {
    const text = entry.text.toLowerCase();
    let score = 0;

    // Scoring mechanism
    searchTerms.forEach(term => {
      if (text.includes(term)) {
        score += 10;
        if (term === text) score += 50;
        const occurrences = (text.match(new RegExp(term, 'g')) || []).length;
        score += occurrences * 2;
      }
    });

    if (searchTerms.length > 1) {
      const positions = searchTerms.map(term => text.indexOf(term)).filter(pos => pos > -1);
      if (positions.length > 1) {
        const minPos = Math.min(...positions);
        const maxPos = Math.max(...positions);
        score += Math.max(0, 20 - (maxPos - minPos) / 10);
      }
    }

    if (score > 0) {
      results.push({
        ...entry,
        score,
        originalIndex: index
      });
    }
  });

  return results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.originalIndex - b.originalIndex;
  }).map(item => {
    const { score, originalIndex, ...rest } = item;
    return rest;
  });
};