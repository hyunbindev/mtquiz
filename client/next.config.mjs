/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://1.231.178.91:4000/api/:path*',
      },
    ];
  },
};
export default nextConfig;