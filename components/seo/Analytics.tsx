import Script from "next/script";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

/** Google Analytics 4. Off unless NEXT_PUBLIC_GA_ID is set (see .env.example). */
export function Analytics() {
  if (!gaId || !/^G-[A-Z0-9]+$/i.test(gaId)) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
