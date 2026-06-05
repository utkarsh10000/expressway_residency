import './globals.css'

export const metadata = {
  title: 'Expressway Residency – Premium Plots on Delhi–Meerut Expressway | Haute World Developers',
  description:
    'Premium residential plots (100–300 sq. yd.) at Expressway Residency on NH-24 Delhi–Meerut Expressway, Ghaziabad. 75 Acres USA + Dubai inspired township. Pre-Launch Price ₹75,000/Sq.Yd.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          body { font-family: 'DM Sans', system-ui, sans-serif; }
          h1, h2, h3, h4, blockquote, em { font-family: 'Cormorant Garamond', Georgia, serif; }
        ` }} />
      </head>
      <body>{children}</body>
    </html>
  )
}