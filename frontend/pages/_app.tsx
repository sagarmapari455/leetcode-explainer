/**
 * _app.tsx
 * Next.js App wrapper for global styles and configuration
 */

import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
