/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // GitHub Pages serves static files only: emit a fully static site to out/.
  output: "export",
  // next/image optimization needs a server; Pages has none.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
