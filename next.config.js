/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "prosperabo.com",
      "www.wservices.prosperabo.com",
      "localhost",
    ], // TODO: update domains
  },
  async redirects() {
    // TODO: *Redirigir después de iniciar sesión, Redirigir a la página de campaña, * Redirigir después de una acción, *Redirigir desde enlaces externos, ...
    return [
      {
        source: "/github",
        destination: "https://github.com/prosperabo",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: process.env.BASE_URL + "/:path*",
        // destination: "https://www.services.prosperabo.com/:path*",
      },
    ];
  },
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
};

module.exports = nextConfig;
