/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      '127.0.0.1',
      'thumbnail.image.rakuten.co.jp',
      `${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`,
    ],
  },
};

module.exports = nextConfig;
