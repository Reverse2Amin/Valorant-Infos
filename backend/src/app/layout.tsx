import type { ReactNode } from "react";

export const metadata = {
  title: "Valorant Infos",
  description: "Projekt"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, minHeight: "100vh", background: "#0a0a0f", color: "#fff" }}>
        {children}
      </body>
    </html>
  );
}