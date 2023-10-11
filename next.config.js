/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/tools/numbers",
        destination: "/tools/number-representations",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
