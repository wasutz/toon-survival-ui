/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    turnstile: {
      verifyUrl: process.env.TURNSTILE_VERIFY_ENDPOINT,
      secretKey: process.env.TURNSTILE_SECRET_KEY
    }
  }
}

module.exports = nextConfig
