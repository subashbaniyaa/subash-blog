const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  typescript: {
    // Allow production builds even if there are type errors
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "images.unsplash.com",        // project hero
      "www.datocms-assets.com",     // CMS assets
      "lh3.googleusercontent.com",  // Google avatar
      "avatars.githubusercontent.com", // GitHub avatar
      "profile.line-scdn.net",      // LINE avatar
    ],
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(png|jpe?g|gif|mp4)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/_next",
              name: "static/media/[name].[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      }
    );
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
