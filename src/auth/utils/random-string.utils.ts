export function secureRandomString(length: number): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsLength = chars.length;
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  const secret = Array.from(array, (byte) => chars[byte % charsLength]).join(
    '',
  );

  return secret;
}
