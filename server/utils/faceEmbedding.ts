// Simulated face embedding generator
// Later replace with real ML model

export const generateFaceEmbedding = async (
  _imageBuffer: Buffer
): Promise<number[]> => {
  // Fake 128-d embedding
  return Array.from({ length: 128 }, () => Math.random());
};
