// Cosine similarity (simple & fast for hackathon)

export const compareEmbeddings = (
  emb1: number[],
  emb2: number[]
): number => {
  const dot = emb1.reduce((sum, val, i) => sum + val * emb2[i], 0);
  const mag1 = Math.sqrt(emb1.reduce((s, v) => s + v * v, 0));
  const mag2 = Math.sqrt(emb2.reduce((s, v) => s + v * v, 0));

  return dot / (mag1 * mag2);
};
