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
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <link href="/upwage-favicon.png" rel="icon" type="image/png" />
      </head>
      <body className={`${poppins.className} py-6`}>
        {children}
        <footer className="pb-4 text-center text-sm text-zinc-500">
          <a
            href="https://github.com/nweii/upwage-question-builder/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 hover:underline"
          >
            View on GitHub
          </a>
        </footer>
      </body>
    </html>
  );
}
