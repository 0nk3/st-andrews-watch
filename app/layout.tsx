import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "St. Andrews Watch - Anonymous Reporting",
  description: "Report crime, theft and corruption anonymously",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
