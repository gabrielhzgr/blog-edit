import ms from "ms";

export default function isValidToken(token) {
  return token.iat + ms(token.expiresIn) < Date.now();
}
