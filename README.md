# Dental Clinic Website Template

A modern, customizable dental clinic website template built with Next.js 14, Tailwind CSS, and Framer Motion. This template is designed to be easily forked and customized for different dental practices.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive layout
- ⚡ Fast performance with Next.js 14
- 🎭 Smooth animations with Framer Motion
- 🎯 SEO optimized
- 💅 Styled with Tailwind CSS
- 📝 Easy content management through siteConfig.json
- 🔍 Google Maps integration
- 💬 WhatsApp integration
- 📅 Google Forms integration for appointments

## Quick Start

1. Fork this repository
2. Clone your forked repository
3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Update the configuration:
   - Edit `src/config/siteConfig.json` with your clinic's information
   - Replace images in `public/images/`
   - Update Google Maps URL in siteConfig.json
   - Update Google Forms URL in siteConfig.json
   - Update WhatsApp number and message in siteConfig.json

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) to see your website

## Customization

### Content
All website content is managed through `src/config/siteConfig.json`. This includes:
- Site name and description
- Navigation links
- Hero section content
- Services
- Contact information
- WhatsApp integration
- Google Maps URL
- Google Forms URL

### Styling
- Colors: Edit `tailwind.config.js` to change the color scheme
- Typography: Update font settings in `src/app/layout.tsx`
- Components: Modify individual components in `src/components/`

### Images
Replace the following images in `public/images/`:
- `logo.png`: Your clinic's logo
- `main_bg_image.jpg`: Hero section background
- Service images as referenced in siteConfig.json

## Deployment

The easiest way to deploy your website is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Deploy

## License

This template is MIT licensed. Feel free to use it for your dental clinic website.

## Support

If you need help customizing this template for your dental clinic, please reach out to me at [your-email].
