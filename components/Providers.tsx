"use client";
import { MantineProvider, useEmotionCache } from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import React from "react";
import { SessionProvider } from "next-auth/react";



export default function Providers({ children }: { children: React.ReactNode }) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider theme={{ colorScheme: "light" }}>
        <SessionProvider>
        {children}
        </SessionProvider>
      </MantineProvider>
    </CacheProvider>
  );
}
