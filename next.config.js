const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// const withPWA = require("next-pwa");
// const runtimeCaching = require("next-pwa/cache");

const isDevelopment = process.env.NODE_ENV === "development";

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  // swcMinify: true,
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "www.datocms-assets.com",
      "pbs.twimg.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "profile.line-scdn.net",
    ],
  },
  // pwa: {
  //   dest: "public",
  //   runtimeCaching,
  //   disable: isDevelopment,
  //   mode: "production",
  //   buildExcludes: [
  //     /middleware-manifest\.json$/,
  //     /middleware-runtime\.js$/,
  //     /middleware-runtime\.js.map$/,
  //     /middleware\.js$/,
  //     /middleware\.js.map$/,
  //   ],
  // },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
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
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  // experimental: { appDir: true },
};

module.exports = withBundleAnalyzer(nextConfig);
