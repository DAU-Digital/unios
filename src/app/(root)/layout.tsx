import "../globals.css";
import { bricolage } from "../fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={bricolage.variable}>
      <body>{children}</body>
    </html>
  );
}
