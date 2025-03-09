import type { Metadata } from 'next'
import Providers from 'app/Providers'
import 'lib/global.css'

const TITLE = '커미캣 | Commicat'
const DESCRIPTION = '커미션, 외주 플랫폼 커미캣'
const OG_IMAGE = '/opengraph-image.jpg'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.commicat.com'),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.commicat.com',
    siteName: 'Commicat',
    images: [
      {
        url: OG_IMAGE,
        width: 800,
        height: 600,
        alt: 'Commicat',
      },
    ],
    locale: 'ko-kr',
    type: 'website',
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    images: {
      url: OG_IMAGE,
    },
    card: 'summary_large_image',
  },
}

const RootLayout = ({ children }: Children) => {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="ywau_fnYsccD5E17S7d7DwywcTjwT_5WTU84qiQysjg" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
