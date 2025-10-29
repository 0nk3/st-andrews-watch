# St. Andrews Watch - Anonymous Crime Reporting Platform

A secure, anonymous web application for reporting crime, theft, and corruption in the St. Andrews precinct. Built with Next.js and designed with a strong emphasis on user privacy and anonymity.

## Features

### 🔒 **Complete Anonymity**
- No IP address logging or tracking
- No cookies or session storage
- No account creation required
- Files are stripped of metadata automatically
- Reports are encrypted during transmission

### 📝 **Comprehensive Reporting**
- Multiple incident types (theft, burglary, assault, vandalism, corruption, fraud, drug-related crimes)
- Detailed description fields with validation
- Location and date/time reporting
- Additional information section

### 📎 **Secure File Upload**
- Support for images (JPG, PNG, GIF)
- PDF and Word document support
- 10MB file size limit
- Automatic metadata removal for privacy
- Multiple file upload capability

### ✅ **Form Validation**
- Client-side validation for all required fields
- Real-time error feedback
- Minimum character requirements for descriptions
- File type and size validation

### 🎨 **Professional Design**
- Clean, minimalistic interface
- Trustworthy and secure appearance
- Mobile-responsive design
- Clear privacy messaging throughout
- Success confirmation with anonymity reassurance

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd st-andrews-watch
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deployment on Vercel

This application is optimized for deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Connect your repository to Vercel
3. Deploy with zero configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/st-andrews-watch)

## Security Considerations

### For Production Deployment:
- Implement server-side form handling with encryption
- Add CAPTCHA to prevent automated submissions
- Set up secure email or database storage for reports
- Configure HTTPS and security headers
- Implement rate limiting
- Consider using a VPN-friendly hosting solution
- Add CSP (Content Security Policy) headers

### Privacy Features Already Implemented:
- Client-side only form handling (no server storage in demo)
- No tracking scripts or analytics
- No external CDN dependencies that could leak IPs
- Clean, professional design that builds trust

## Technology Stack

- **Frontend**: Next.js 15.5.4 with React 19
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Optimized for Vercel

## File Structure

```
st-andrews-watch/
├── src/
│   └── app/
│       ├── layout.tsx      # App layout and metadata
│       ├── page.tsx        # Main reporting form
│       └── globals.css     # Global styles
├── public/                 # Static assets
├── README.md              # This file
└── package.json           # Dependencies and scripts
```

## Contributing

This is a public service application. Contributions that improve security, accessibility, or user experience are welcome.

## License

This project is created for public service and community safety.
