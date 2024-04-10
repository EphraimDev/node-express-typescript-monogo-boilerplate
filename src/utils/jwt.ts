import jwt from "jsonwebtoken";

let { JWT_SECRET_KEY } = process.env;

export interface JWTPayloadArgType {
  id: string;
  expiresIn: string;
}

const GenerateAccessToken = (user: JWTPayloadArgType) => {
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY!, {
    expiresIn: user.expiresIn,
  });

  return token;
};

const VerifyAccessToken = (token: string) => {
  const decoded = jwt.verify(
    token,
    JWT_SECRET_KEY!
  ) as JWTPayloadArgType | null;

  return decoded;
};

export { GenerateAccessToken, VerifyAccessToken };
