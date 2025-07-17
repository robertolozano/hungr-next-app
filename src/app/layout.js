import { Inter } from "next/font/google";
import "./globals.css";
import ScreenSizer from "./screenSizer";
import Navbar from "./navbar";

import { Teko } from "next/font/google";
import { Kanit } from "next/font/google";
import { Anton as MyFont2 } from "next/font/google";
import { Staatliches as MyFont } from "next/font/google";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

const teko = MyFont({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-myFont",
});

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hungr",
  description: "Hungr App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={teko.className}>
      <body style={{ backgroundColor: "#f3f7fc" }}>
        <ScreenSizer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "black",
              height: "100vh",
            }}
          >
            <ThemeProvider theme={theme}>
              <Navbar />
              <div style={{ height: "100%", width: "100%" }}>{children}</div>
            </ThemeProvider>
          </div>
        </ScreenSizer>
      </body>
    </html>
  );
}
