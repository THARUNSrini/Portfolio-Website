/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    basePath: '/Portfolio-Website',
    assetPrefix: '/Portfolio-Website/',
};

export default nextConfig;

