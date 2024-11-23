import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

// Create a client-only ThemeImage component that properly handles theme detection
const ThemeImage = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { srcLight, srcDark, ...rest } = props;

  // Only render after component is mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null during SSR to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

// Create a client-only button component if it uses browser APIs
const ClientButton = dynamic(() => import("@repo/ui/button").then(mod => mod.Button), {
  ssr: false
});

// Main page component
export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  // Wait for client-side render to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Only render theme-dependent content after client-side hydration */}
        {isClient && (
          <ThemeImage
            className={styles.logo}
            srcLight="/turborepo-dark.svg"  // Added leading slash for public directory
            srcDark="/turborepo-light.svg"  // Added leading slash for public directory
            alt="Turborepo logo"
            width={180}
            height={38}
            priority
          />
        )}

        <ol>
          <li>
            Get started by editing <code>apps/docs/app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo..."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://turbo.build/repo/docs?utm_source"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>

        {/* Use client-side only button if it uses browser APIs */}
        {isClient && (
          <ClientButton appName="docs" className={styles.secondary}>
            Open alert
          </ClientButton>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://turbo.build?utm_source=create-turbo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to turbo.build →
        </a>
      </footer>
    </div>
  );
}