import jwt from "jsonwebtoken";

export interface JwtPayload {
  id: string;
  role: string;
}

export const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET as string;

  return jwt.sign(payload, secret, {
    expiresIn: "7d", // ✅ literal string
  });
};
