import LayoutWrapper from "@/components/LayoutWrapper";
import "../css/tailwind.css";
import { AppProviders } from "@/components/AppProviders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subash",
  description: "Subash's site",
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://subash-baniya.com.np",
    siteName: "Subash",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AppProviders>
      </body>
    </html>
  );
}
