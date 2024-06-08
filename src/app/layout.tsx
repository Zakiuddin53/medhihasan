import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "./globals.css";
import "@mantine/dates/styles.css";

import "@mantine/core/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          footer: "hidden",
        },
      }}
    >
      <html lang="en">
        <head>
          <ColorSchemeScript defaultColorScheme="light" />
        </head>
        <body>
          <MantineProvider defaultColorScheme="light">
            {children}
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
