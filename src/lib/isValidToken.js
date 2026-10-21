import ms from "ms";

export default function isValidToken(token) {
  return Date.now() > token.iat + ms(token.expiresIn);
}
