import crypto from "crypto";

export const hashImage = (buffer: Buffer): string => {
  return crypto.createHash("sha256").update(buffer).digest("hex");
};
