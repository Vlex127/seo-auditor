import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VINCENT IWUNO | SEO-AUDITOR",
  description: "UNLEASH YOUR DIGITAL PRESENCE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* No need for font.variable here since 
         we defined it globally in globals.css 
      */}
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
};