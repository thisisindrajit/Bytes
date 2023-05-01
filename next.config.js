/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
})

module.exports = withPWA({
  // reactStrictMode: true,
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // }
})