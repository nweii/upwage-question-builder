import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Upwage Question Builder",
  description: "Export chatbot screening questions with embedded logic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} py-12`}>{children}</body>
    </html>
  );
}
