import { Inter } from "next/font/google";
import "./globals.css";
import ScreenSizer from "./screenSizer";
import Navbar from "./navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hungr",
  description: "Hungr App",
};

export default function RootLayout({ children }) {
  return (
    <ScreenSizer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f3f7fc",
          color: "black",
          fontFamily: "sans-serif",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Navbar />
        {children}
      </div>
    </ScreenSizer>
  );
}
