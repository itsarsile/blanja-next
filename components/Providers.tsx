"use client";
import { MantineProvider, useEmotionCache } from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { modals } from "./modals/Modals";

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
      <SessionProvider>
        <MantineProvider theme={{ colorScheme: "light" }}>
          <ModalsProvider modals={modals}>
            <Notifications />
            {children}
          </ModalsProvider>
        </MantineProvider>
      </SessionProvider>
    </CacheProvider>
  );
}
