import crypto from "node:crypto";

const secret = () => process.env.LAB_SIGNING_SECRET || "faultpilot-lab-local-development-secret";

export const shouldUseSecureCookies = () =>
  process.env.VERCEL === "1" || process.env.LAB_SECURE_COOKIES === "true";

export function sign(value) {
  return crypto.createHmac("sha256", secret()).update(String(value)).digest("hex");
}

export function signedValue(value) {
  return `${value}.${sign(value)}`;
}

export function verifySigned(value = "") {
  const separator = value.lastIndexOf(".");
  if (separator < 1) return null;
  const payload = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  const expected = sign(payload);
  if (signature.length !== expected.length) return null;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected)) ? payload : null;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
export function decodeBase32(input) {
  const bits = input.toUpperCase().replace(/=+$/, "").split("").map((char) => {
    const index = alphabet.indexOf(char);
    if (index < 0) throw new Error("Invalid Base32 secret");
    return index.toString(2).padStart(5, "0");
  }).join("");
  const bytes = [];
  for (let index = 0; index + 8 <= bits.length; index += 8) bytes.push(parseInt(bits.slice(index, index + 8), 2));
  return Buffer.from(bytes);
}

export function totp(secretValue, timestamp = Date.now()) {
  const counter = Math.floor(timestamp / 30_000);
  const buffer = Buffer.alloc(8);
  buffer.writeBigUInt64BE(BigInt(counter));
  const digest = crypto.createHmac("sha1", decodeBase32(secretValue)).update(buffer).digest();
  const offset = digest[digest.length - 1] & 15;
  const value = (digest.readUInt32BE(offset) & 0x7fffffff) % 1_000_000;
  return String(value).padStart(6, "0");
}

export function verifyTotp(code, secretValue) {
  return [-30_000, 0, 30_000].some((offset) => totp(secretValue, Date.now() + offset) === String(code));
}

export function emailOtp(email, bucket = Math.floor(Date.now() / 300_000)) {
  return String(parseInt(sign(`${email}:${bucket}`).slice(0, 8), 16) % 1_000_000).padStart(6, "0");
}
