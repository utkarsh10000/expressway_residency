'use client'
import { useState, useEffect } from 'react'
import LeadModal from '../components/LeadModal'

const WEB3FORMS_ACCESS_KEY = 'ff40f076-e0bd-4853-ba94-e43a82886ce3'

/* ── Responsive helper styles injected once ── */
const responsiveCSS = `
  * { box-sizing: border-box; }
  
  .nav-links { display: flex; }
  .hero-grid { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
  .hero-form-wrap { flex: 0 0 360px; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
  .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 900px; margin: 0 auto 40px; }
  .map-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; align-items: start; }
  .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; margin-bottom: 40px; }
  .footer-cta { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
  .footer-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .proximity-cols { columns: 2; column-gap: 24px; }
  .amenities-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 16px; }
  .specs-grid { display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; }
  .facilities-grid { display: flex; justify-content: center; flex-wrap: wrap; gap: 24px; }
  .siteplan-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
  .faq-overlay { background: linear-gradient(to right, rgba(10,25,18,0.88) 0%, rgba(10,25,18,0.88) 70%, rgba(10,25,18,0) 70%); }
  .nav-height { height: 64px; }
  .about-img { width: 85%; height: 260px; }
  .about-img-row2 { width: 85%; height: 260px; margin-left: 0; }

  @media (max-width: 900px) {
    .nav-links a { display: none; }
    .hero-grid { flex-direction: column; }
    .hero-form-wrap { flex: none; width: 100%; max-width: 100%; }
    .about-grid { grid-template-columns: 1fr; gap: 48px; }
    .about-row2-img { order: -1; }
    .proximity-cols { columns: 1; }
    .faq-overlay { background: rgba(10,25,18,0.88); }
  }

  @media (max-width: 640px) {
    .nav-links .apply-btn { display: none; }
    .nav-height { height: 56px; }
    .hero-btns button, .hero-btns a { width: 100%; justify-content: center; }
    .hero-btns { flex-direction: column; }
    .footer-cta { flex-direction: column; align-items: flex-start; }
    .footer-cta-btns { flex-direction: column; width: 100%; }
    .footer-cta-btns a, .footer-cta-btns button { width: 100%; text-align: center; justify-content: center; }
    .about-img { width: 100%; height: 220px; }
    .about-img-row2 { width: 100%; height: 220px; }
    .amenities-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; }
  }

  @media (max-width: 480px) {
    .nav-links .call-btn span { display: none; }
  }

  .proximity-mobile { display: none; }
  @media (max-width: 900px) {
    .proximity-desktop { display: none; }
    .proximity-mobile { display: table; }
  }

  @keyframes spin { to { transform: rotate(360deg); } }
`

/* ── SVG Icons ── */
const IconPin = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
  </svg>
)
const IconCheck = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const IconPhone = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)
const IconWhatsApp = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)
const IconBuilding = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M9 3v18" /><path d="M3 9h6" /><path d="M3 15h6" /><path d="M12 9h9" /><path d="M12 15h9" /></svg>)
const IconPool = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20" /><path d="M2 18c2-2 4 0 6 0s4-2 6 0 4 0 6 0" /><path d="M8 6l4-4 4 4" /><path d="M12 2v10" /></svg>)
const IconDumbbell = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11" /><path d="M6.5 17.5h11" /><path d="M6 6v12" /><path d="M18 6v12" /><path d="M4 8v8" /><path d="M20 8v8" /></svg>)
const IconHeart = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>)
const IconTree = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-7" /><path d="M9 15H5l7-7 7 7h-4" /><path d="M7 11H3l9-9 9 9h-4" /></svg>)
const IconShield = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>)
const IconShoppingBag = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>)
const IconCamera = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>)
const IconCpu = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></svg>)
const IconActivity = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>)
const IconWind = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" /></svg>)
const IconCoffee = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>)
const IconBadminton = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="6" r="3" /><path d="M12 9v6" /><path d="M9 15l3 5 3-5" /></svg>)
const IconSmile = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>)
const IconFeather = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" /><line x1="16" y1="8" x2="2" y2="22" /><line x1="17.5" y1="15" x2="9" y2="15" /></svg>)
const IconDoor = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="2" width="18" height="20" rx="1" /><circle cx="15" cy="12" r="1" fill={color} /></svg>)
const IconRoad = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l3-10h12l3 10" /><path d="M12 7v10" /></svg>)
const IconCompass = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>)
const IconBolt = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>)
const IconHome = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>)
const IconUsers = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>)
const IconLayers = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>)
const IconGlobe = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>)
const IconDownload = ({ size = 18, color = 'currentColor' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>)
const IconCar = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3v-4l2-5h14l2 5v4h-2" /><circle cx="7.5" cy="17.5" r="2.5" /><circle cx="16.5" cy="17.5" r="2.5" /></svg>)
const IconSun = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /></svg>)
const IconEarth = ({ size = 28, color = '#1a4a3a' }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2c-4 5-4 15 0 20"/><path d="M12 2c4 5 4 15 0 20"/></svg>)

/* ── Spinner Icon ── */
const IconSpinner = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)

/* ── Data ── */
const facilities = [
  { Icon: IconBuilding, label: 'Club House' },
  { Icon: IconPool, label: 'Swimming Pool' },
  { Icon: IconDumbbell, label: 'Gymnasium' },
  { Icon: IconHeart, label: 'Health Club' },
  { Icon: IconHeart, label: 'Kids Play Area' },
  { Icon: IconTree, label: 'Ample Green Area' },
  { Icon: IconShoppingBag, label: 'Shopping Complex' },
]

const amenities = [
  { Icon: IconBuilding, label: 'Club House' },
  { Icon: IconTree, label: 'Landscaped Park' },
  { Icon: IconPool, label: 'Swimming Pool' },
  { Icon: IconCamera, label: 'CCTV + Drone Surveillance' },
  { Icon: IconDoor, label: 'Separate Entry & Exit Gate' },
  { Icon: IconShield, label: '24×7 Secured Living' },
  { Icon: IconActivity, label: 'Jogging Track' },
  { Icon: IconHeart, label: 'Kids Play Area' },
  { Icon: IconShoppingBag, label: 'Retail Shops' },
  { Icon: IconCoffee, label: 'Food Court' },
  { Icon: IconWind, label: 'Yoga / Meditation Area' },
  { Icon: IconBadminton, label: 'Badminton Court' },
  { Icon: IconDumbbell, label: 'Gymnasium' },
  { Icon: IconFeather, label: '8 Themed Landscapes' },
  { Icon: IconCpu, label: 'AI Smart Features' },
  { Icon: IconSmile, label: 'Face Recognition Entry' },
]

const townshipSpecs = [
  { Icon: IconCar, label: 'Personal Car Parking' },
  { Icon: IconTree, label: 'Private Lawn' },
  { Icon: IconHome, label: 'Spacious Terrace' },
  { Icon: IconUsers, label: 'Maintenance Staff' },
  { Icon: IconLayers, label: 'Water Storage' },
  { Icon: IconBolt, label: 'Sewage Treatment' },
  { Icon: IconSun, label: '24x7 Power Supply' },
  { Icon: IconShield, label: 'Security' },
  { Icon: IconGlobe, label: 'Gated Society' },
  { Icon: IconEarth, label: 'Environment Electrification' },
  { Icon: IconCompass, label: 'Earthquake Resistant' },
]

const proximityList = [
  { place: 'Pony Public School', distance: '2 km' },
  { place: 'HPS Public School', distance: '3 km' },
  { place: 'Sunrise Mall', distance: '4 km' },
  { place: 'Ayush Mall', distance: '5 km' },
  { place: 'Fortis Hospital', distance: '6 km' },
  { place: 'Parekh Hospital', distance: '10 km' },
  { place: 'Fire Station', distance: '6 km' },
  { place: 'Committed Police Post', distance: '5 km' },
  { place: 'Shyam Park Lalkuan', distance: '8 km' },
  { place: 'Ghaziabad Police Ltd', distance: '6 km' },
  { place: 'Saugandh India Pvt Ltd', distance: '5 km' },
  { place: 'NH 24 Expressway', distance: '0 km' },
  { place: 'Young Abbas Prasad', distance: '2 km' },
]

const faqs = [
  { q: 'Where is Expressway Residency located?', a: 'Expressway Residency is located on Delhi–Meerut Expressway (NE-3), near Hawa Hawai Restaurant, Didwari, Ghaziabad, Uttar Pradesh 201206 — directly on the 16-lane expressway with seamless access to Delhi, Noida, and Meerut.' },
  { q: 'What is the size and price of villa and plots in Expressway Residency?', a: 'Expressway Residency offers plots in sizes of 100 Sq. Yd., 150 Sq. Yd., 200 Sq. Yd., and 300 Sq. Yd. The pre-launch price starts at ₹75,000 per square yard. Contact our sales team for a detailed price list and payment plan.' },
  { q: 'What facilities does Expressway Residency offer?', a: 'Expressway Residency offers 50+ premium amenities including a Club House, Swimming Pool, Gymnasium, Landscaped Parks, CCTV Surveillance, 24×7 Security, Kids Play Area, Food Court, Jogging Track, Face Recognition Entry, and much more.' },
  { q: 'Is the project RERA registered?', a: 'RERA registration for Expressway Residency is currently under process. Our team will keep all investors updated with the RERA number once approved. All documentation and due diligence is transparent and available for review.' },
  { q: 'What is the payment plan for Expressway Residency?', a: 'The payment plan is structured as: ₹10 Lacs on booking, 50% of BSP on RERA approval (within 15 days), 25% of BSP during mid-development, and 25% of BSP on registry. Flexi plans are available — contact us for details.' },
]

const advantages = [
  'Clear-title plots with complete due diligence support',
  'Transparent pricing aligned with expressway corridor benchmarks',
  'End-to-end guidance from site visit to registration',
  'Low rise township living with 50+ modern amenities',
  'Plots offer customisable home solutions',
  'Strong appreciation and growth potential',
  'Superior connectivity to Delhi & NCR',
  'USA + Dubai inspired premium township design',
]

/* ── Navbar ── */
function Navbar({ onCTAClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.3s',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', height: 88, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/assets/logo.webp" alt="Expressway Residency" style={{ height: 70, width: 'auto', display: 'block', objectFit: 'contain' }} />
          </div>
          {/* Desktop nav */}
          <div className="nav-links" style={{ alignItems: 'center', gap: 20, fontSize: 13, fontWeight: 600 }}>
            {['Overview', 'Amenities', 'Pricing', 'Location'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ color: '#374151', textDecoration: 'none' }}>{item}</a>
            ))}
            <button className="apply-btn" onClick={() => onCTAClick('Apply Now')} style={{ background: '#1a4a3a', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Apply Now</button>
            <a href="tel:+919911807193" className="call-btn" style={{ background: '#f59e0b', color: '#fff', borderRadius: 6, padding: '8px 16px', fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
              <IconPhone size={14} color="#fff" /> <span>Call Us Now</span>
            </a>
          </div>
          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} className="hamburger-btn" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a4a3a" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 49, background: '#fff', borderBottom: '2px solid #1a4a3a', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Overview', 'Amenities', 'Pricing', 'Location'].map((item, i) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ color: '#1a4a3a', textDecoration: 'none', fontWeight: 600, fontSize: 15, padding: '8px 0', borderBottom: '1px solid #f3f4f6', marginTop: i === 0 ? 8 : 0 }}>{item}</a>
          ))}
          <button onClick={() => { onCTAClick('Apply Now'); setMenuOpen(false) }} style={{ background: '#1a4a3a', color: '#fff', border: 'none', borderRadius: 6, padding: '12px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Apply Now</button>
          <a href="tel:+919911807193" style={{ background: '#f59e0b', color: '#fff', borderRadius: 6, padding: '12px', fontWeight: 700, fontSize: 14, textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><IconPhone size={16} color="#fff" /> Call Us Now</a>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}

/* ── Enquiry Form (with Web3Forms) ── */
function EnquiryForm({ source = 'Hero / Map Enquiry Form' }) {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', plotSize: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const plotSizes = ['100 Sq. Yd.', '150 Sq. Yd.', '200 Sq. Yd.', '300 Sq. Yd.', 'Custom']

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/^\d{10}$/.test(form.mobile.replace(/\s/g, ''))) e.mobile = 'Enter valid 10-digit number'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }

    setSubmitting(true)
    setServerError('')

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Enquiry – Expressway Residency | ${source}`,
        from_name: 'Expressway Residency Website',
        name: form.name,
        mobile: form.mobile,
        email: form.email || 'Not provided',
        plot_size_interest: form.plotSize || 'Not specified',
        message: form.message || 'No message provided',
        source,
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (data.success) {
        setSubmitted(true)

        // Google Ads conversion tracking
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-18216224281/Q6hPCK3QvMocEJmMlu5D',
            value: 1.0,
            currency: 'INR',
          })
        }
      } else {
        setServerError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setServerError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = (hasError) => ({
    width: '100%', padding: '10px 14px', borderRadius: 6,
    border: `1px solid ${hasError ? '#ef4444' : '#d1d5db'}`,
    fontSize: 13, outline: 'none', fontFamily: 'inherit',
    background: '#fff', color: '#1e2a22', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  })

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
        <IconCheck size={24} color="#16a34a" />
      </div>
      <h3 style={{ color: '#1a4a3a', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Thank You!</h3>
      <p style={{ color: '#6b7280', fontSize: 14 }}>Our team will contact you within 2 hours.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Hidden honeypot */}
      <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

      <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 16, textAlign: 'center', letterSpacing: 0.5 }}>Enquire Now</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#d1d5db', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Name *</label>
          <input type="text" placeholder="Full name" value={form.name} onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })) }} style={inputStyle(errors.name)} />
          {errors.name && <p style={{ color: '#f87171', fontSize: 11, marginTop: 3 }}>{errors.name}</p>}
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#d1d5db', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Mobile No. *</label>
          <input type="tel" placeholder="10-digit mobile" value={form.mobile} onChange={e => { setForm(f => ({ ...f, mobile: e.target.value })); setErrors(er => ({ ...er, mobile: '' })) }} style={inputStyle(errors.mobile)} />
          {errors.mobile && <p style={{ color: '#f87171', fontSize: 11, marginTop: 3 }}>{errors.mobile}</p>}
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#d1d5db', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Email</label>
          <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle(false)} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#d1d5db', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Plot Size</label>
          <select value={form.plotSize} onChange={e => setForm(f => ({ ...f, plotSize: e.target.value }))} style={{ width: '100%', padding: '10px 14px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', color: form.plotSize ? '#1e2a22' : '#9ca3af', fontSize: 13, outline: 'none', fontFamily: 'inherit', cursor: 'pointer', appearance: 'none', boxSizing: 'border-box' }}>
            <option value="" disabled style={{ background: '#0d2f24', color: '#fff' }}>Select plot size</option>
            {plotSizes.map(s => (<option key={s} value={s} style={{ background: '#0d2f24', color: '#fff' }}>{s}</option>))}
          </select>
        </div>

        {serverError && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 6, padding: '10px 14px', color: '#fca5a5', fontSize: 12 }}>
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{ background: submitting ? '#9ca3af' : '#f59e0b', color: '#fff', border: 'none', borderRadius: 6, padding: '12px', fontWeight: 800, fontSize: 14, cursor: submitting ? 'not-allowed' : 'pointer', letterSpacing: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          {submitting ? <><IconSpinner /> Submitting…</> : 'Submit Enquiry →'}
        </button>
        <p style={{ fontSize: 10, color: '#9ca3af', textAlign: 'center' }}>Your data is safe with us.</p>
      </div>
    </form>
  )
}

/* ── FAQ Item ── */
function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid #e5e7eb', background: isOpen ? '#eef1fb' : '#fff', transition: 'background 0.2s' }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1e2a22', lineHeight: 1.5 }}>{q}</span>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div style={{ padding: '0 20px 16px' }}>
          <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.8, margin: 0 }}>{a}</p>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════ MAIN PAGE ══════════════════════════════ */
export default function ExpresswayResidencyPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [activeSlide, setActiveSlide] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const openModal = (title = '') => { setModalTitle(title); setModalOpen(true) }

  useEffect(() => {
    const timer = setTimeout(() => openModal('Book a Free Site Visit'), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!modalOpen) openModal('Book a Free Site Visit')
    }, 30000)
    return () => clearInterval(interval)
  }, [modalOpen])

  useEffect(() => {
    const galleryInterval = setInterval(() => {
      setActiveSlide(s => (s === 10 ? 0 : s + 1))
    }, 3000)
    return () => clearInterval(galleryInterval)
  }, [])

  useEffect(() => {
    const siteplanEl = document.getElementById('siteplan')
    if (!siteplanEl) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            openModal('Book a Free Site Visit')
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(siteplanEl)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: '#1e2a22', background: '#fff', overflowX: 'hidden' }}>
      <style>{responsiveCSS}</style>
      <Navbar onCTAClick={openModal} />
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} triggerText={modalTitle} />

      {/* ── HERO ── */}
      <section id="overview" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 140 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://i.postimg.cc/bwn1qkPh/Screenshot-2026-06-04-151727.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.3) 100%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 16px', position: 'relative', zIndex: 10, width: '100%' }}>
          <div className="hero-grid">
            <div style={{ maxWidth: 580, flex: '1 1 auto' }}>
              <p style={{ color: '#fbbf24', fontSize: 11, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>Premium Residential Township on NE-3</p>
              <h1 style={{ color: '#fff', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.2rem,5vw,4.2rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 16 }}>
                <span style={{ whiteSpace: 'nowrap' }}>Expressway <em style={{ color: '#fbbf24', fontStyle: 'italic' }}>Residency</em></span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 'clamp(13px,1.5vw,15px)', lineHeight: 1.7, marginBottom: 8 }}>
                75 Acres USA + Dubai inspired premium living mega township on the 16-lane Delhi–Meerut Expressway (NE-3), Ghaziabad.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, marginBottom: 28 }}>Ready-to-Move · Residential Plots (100–300 Sq. Yd.) · Starting ₹75,000/Sq. Yd.</p>
              <div className="hero-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => openModal('Book a Free Site Visit')} style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>Book a Free Site Visit →</button>
                <button onClick={() => openModal('Get Pricing & Payment Plan')} style={{ background: 'transparent', color: '#f59e0b', border: '2px solid #f59e0b', borderRadius: 8, padding: '14px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Get Pricing Details</button>
              </div>
            </div>
            <div className="hero-form-wrap" style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(245,158,11,0.35)', padding: '24px', backdropFilter: 'blur(12px)' }}>
              <EnquiryForm source="Hero Form" />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE PROJECT ── */}
      <section style={{ background: '#fff', padding: 'clamp(40px,5vw,64px) 16px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem,3vw,2.6rem)', color: '#1e2a22', fontWeight: 700, marginBottom: 12 }}>About the Project</h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg,#1a4a3a,#f59e0b)', borderRadius: 2, margin: '0 auto 24px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

            {/* Row 1 */}
            <div className="about-grid">
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: '#1a4a3a', marginBottom: 8 }}>ABOUT THE <span style={{ color: '#374151' }}>PROJECT</span></p>
                <h3 style={{ fontSize: 'clamp(15px,2vw,18px)', fontWeight: 700, color: '#1e2a22', marginBottom: 12 }}>Expressway Residency — Exclusive Villa Society in Ghaziabad</h3>
                <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.8, marginBottom: 16 }}>
                  Experience a perfect blend of comfort, connectivity, and contemporary lifestyle at Expressway Residency, ideally located on the rapidly developing NE-3 Delhi–Meerut Expressway, Ghaziabad. Designed for modern families, this residential enclave offers a serene living environment with seamless access to major urban hubs. Just 1 hour from Delhi NCR, this thoughtfully planned township blends urban comfort with green living.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {advantages.slice(0, 4).map(a => (
                    <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151' }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, background: '#1a4a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IconCheck size={10} color="#fff" /></div>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: 'relative', padding: '24px 0 0 24px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '92%', height: '92%', background: '#b8d4be', zIndex: 0, borderRadius: 4, boxShadow: '0 4px 16px rgba(26,74,58,0.18)' }} />
                <img src="https://i.postimg.cc/rw45qxkv/Screenshot-2026-06-04-151758.webp" alt="Expressway Residency Overview" className="about-img" style={{ objectFit: 'cover', display: 'block', position: 'relative', zIndex: 1, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', marginLeft: 'auto', width: '85%', height: 260 }} />
              </div>
            </div>

            {/* Row 2 */}
            <div className="about-grid">
              <div className="about-row2-img" style={{ position: 'relative', padding: '24px 0 0 24px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '92%', height: '92%', background: '#b8d4be', zIndex: 0, borderRadius: 4, boxShadow: '0 4px 16px rgba(26,74,58,0.18)' }} />
                <img src="https://i.postimg.cc/MpB1zVSN/Screenshot-2026-06-04-151838.webp" alt="Expressway Residency Plots" style={{ width: '85%', height: 260, objectFit: 'cover', display: 'block', position: 'relative', zIndex: 1, boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: 'clamp(15px,2vw,18px)', fontWeight: 700, color: '#1e2a22', marginBottom: 12 }}>Expressway Residency Plots — Exclusive Residential Plots in Ghaziabad</h3>
                <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.8, marginBottom: 16 }}>
                  At Expressway Residency you can own your dream property with premium residential plots available in sizes of 100, 150, 200 and 300 Sq. Yd., starting at ₹75,000 per Sq. Yd. Surrounded by villas and lush greenery, these plots offer wide road access and access to premium lifestyle amenities.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {advantages.slice(4).map(a => (
                    <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151' }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, background: '#1a4a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IconCheck size={10} color="#fff" /></div>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING BANNER ── */}
      <div style={{ background: '#1a4a3a', borderTop: '3px solid #f59e0b', borderBottom: '3px solid #f59e0b' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 16px', textAlign: 'center' }}>
          <p style={{ color: '#fff', fontSize: 'clamp(16px,3vw,28px)', fontWeight: 800, letterSpacing: 0.5 }}>
            India's First <span style={{ color: '#fbbf24', fontSize: 'clamp(18px,3.2vw,30px)' }}>AI Enabled Township</span> on Delhi–Meerut Expressway
            <br />
            <span style={{ fontSize: 'clamp(16px,3vw,28px)', fontWeight: 800, color: '#fff' }}>Plots at <span style={{ color: '#fbbf24' }}>₹75,000 / Per Sq. Yard</span> Onwards</span>
          </p>
        </div>
      </div>


      {/* ── LOCATION ── */}
      <section id="location" style={{ background: '#fff', padding: 'clamp(40px,5vw,64px) 16px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem,3vw,2.6rem)', color: '#1e2a22', fontWeight: 700, marginBottom: 6 }}>Expressway Residency</h2>
            <p style={{ fontSize: 13, color: '#6b7280' }}>Location: 300m from Honda North Gate, Ghaziabad</p>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg,#1a4a3a,#f59e0b)', borderRadius: 2, margin: '16px auto 0' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, alignItems: 'start' }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <img src="https://i.postimg.cc/MpB1zVSN/Screenshot-2026-06-04-151838.webp" alt="Location" style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }} />
            </div>
            <div>
              <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.7, marginBottom: 20 }}>
                Expressway Residency is located near Honda North Gate, Ghaziabad — close to schools, hospitals, and key landmarks. Adjacent to the RRTS rapid rail system with Dhanchurpur Metro Rail station.
              </p>
              {/* Desktop: 2-col layout */}
              <div className="proximity-cols proximity-desktop">
                {proximityList.map(({ place, distance }) => (
                  <div key={place} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f3f4f6', breakInside: 'avoid' }}>
                    <span style={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>{place}</span>
                    <span style={{ fontSize: 12, color: '#1a4a3a', fontWeight: 700, marginLeft: 12, whiteSpace: 'nowrap' }}>{distance}</span>
                  </div>
                ))}
              </div>
              {/* Mobile: table */}
              <table className="proximity-mobile" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#1a4a3a' }}>
                    <th style={{ padding: '8px 12px', color: '#fff', fontWeight: 700, textAlign: 'left' }}>Location</th>
                    <th style={{ padding: '8px 12px', color: '#fbbf24', fontWeight: 700, textAlign: 'right' }}>Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {proximityList.map(({ place, distance }, i) => (
                    <tr key={place} style={{ background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                      <td style={{ padding: '8px 12px', color: '#374151', fontWeight: 500, borderBottom: '1px solid #f3f4f6' }}>{place}</td>
                      <td style={{ padding: '8px 12px', color: '#1a4a3a', fontWeight: 700, textAlign: 'right', borderBottom: '1px solid #f3f4f6', whiteSpace: 'nowrap' }}>{distance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOWNSHIP SPECS ── */}
      <section style={{ background: '#f8f4ed', padding: 'clamp(40px,5vw,64px) 16px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem,3vw,2.6rem)', color: '#1e2a22', fontWeight: 700, marginBottom: 12 }}>Township Specifications</h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg,#1a4a3a,#f59e0b)', borderRadius: 2, margin: '0 auto' }} />
          </div>
          <div className="specs-grid">
            {townshipSpecs.map(({ Icon, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 100 }}>
                <div style={{ width: 76, height: 76, borderRadius: '50%', background: '#fff', border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <Icon size={34} color="#1a4a3a" />
                </div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.4 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: '#0d1f18', padding: 'clamp(40px,5vw,72px) 16px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, fontStyle: 'italic', color: '#f59e0b', marginBottom: 12 }}>Price List</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#fff', fontWeight: 700, marginBottom: 16 }}>Your Dream Home at Expressway Residency</h2>
            <div style={{ width: 80, height: 2, background: '#fff', opacity: 0.3, margin: '0 auto' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap' }}>
            {[
              { size: '100 Sq.Yd.', type: 'Residencial Plots ' },
              { size: '200 Sq.Yd.', type: 'Residencial Plots ' },
              { size: '300 Sq.Yd.', type: 'Residencial Plots ' },
            ].map(({ size, type }) => (
              <div key={size} style={{ width: 300, borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.35)', flexShrink: 0 }}>
                {/* Top grey header */}
                <div style={{ background: '#e5e5e0', padding: '18px 24px', textAlign: 'center' }}>
                  <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: '#1a4a3a', textTransform: 'uppercase', margin: 0 }}>Plots</p>
                </div>
                {/* White price band with diagonal cut effect */}
                <div style={{ background: '#fff', padding: '20px 24px 40px', position: 'relative' }}>
                  <p style={{ fontSize: 15, color: '#1e2a22', fontWeight: 500, margin: 0 }}>₹ On Request</p>
                  {/* Diagonal overlay */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: '#f0ece3', clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
                </div>
                {/* Cream bottom card */}
                <div style={{ background: '#f0ece3', padding: '28px 24px 28px' }}>
                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: '#1a4a3a', textTransform: 'uppercase', marginBottom: 4 }}>Residential Plots</p>
                    <p style={{ fontSize: 22, fontWeight: 800, color: '#1e2a22', margin: 0 }}>{size}</p>
                  </div>
                  <div style={{ marginBottom: 28 }}>
                    <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: '#1a4a3a', textTransform: 'uppercase', marginBottom: 4 }}>Type</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: '#1e2a22', margin: 0 }}>{type}</p>
                  </div>
                  <button onClick={() => openModal('Request A Call – ' + size)} style={{ width: '100%', background: '#1a4a3a', color: '#fff', border: 'none', borderRadius: 50, padding: '14px', fontWeight: 700, fontSize: 14, cursor: 'pointer', letterSpacing: 0.5 }}>
                    Request A Call
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button onClick={() => openModal('Download E-Brochure & Pricing')} style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', border: 'none', color: '#fff', borderRadius: 0, padding: '14px 32px', fontWeight: 800, fontSize: 15, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(245,158,11,0.45)', letterSpacing: 0.5 }}>
              <IconDownload size={20} color="#fff" /> Download E-Brochure & Full Price List
            </button>
          </div>
        </div>
      </section>

      {/* ── SITE LAYOUT ── */}      <section id="siteplan" style={{ background: '#fff', padding: 'clamp(40px,5vw,64px) 16px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem,3vw,2.6rem)', color: '#1e2a22', fontWeight: 700, marginBottom: 12 }}>Site Layout</h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg,#1a4a3a,#f59e0b)', borderRadius: 2, margin: '0 auto' }} />
          </div>
          {/* Lightbox state handled inline */}
          {(() => {
            const [lightboxOpen, setLightboxOpen] = useState(false)
            const [zoom, setZoom] = useState(1)
            const [pos, setPos] = useState({ x: 0, y: 0 })
            const [dragging, setDragging] = useState(false)
            const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
            const closeLightbox = () => { setLightboxOpen(false); setZoom(1); setPos({ x: 0, y: 0 }) }
            const handleZoomIn = () => setZoom(z => Math.min(z + 0.5, 5))
            const handleZoomOut = () => setZoom(z => { const next = Math.max(z - 0.5, 1); if (next === 1) setPos({ x: 0, y: 0 }); return next })
            const handleWheel = (e) => { e.preventDefault(); const delta = e.deltaY > 0 ? -0.3 : 0.3; setZoom(z => { const next = Math.min(Math.max(z + delta, 1), 5); if (next === 1) setPos({ x: 0, y: 0 }); return next }) }
            const handleMouseDown = (e) => { if (zoom > 1) { setDragging(true); setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y }) } }
            const handleMouseMove = (e) => { if (dragging) setPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }) }
            const handleMouseUp = () => setDragging(false)
            return (
              <>
                <div
                  onClick={() => setLightboxOpen(true)}
                  style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', marginBottom: 24, maxWidth: 700, margin: '0 auto 24px', cursor: 'zoom-in' }}
                >
                  <img src="/assets/expressway-layout.webp" alt="Site Plan" style={{ width: '100%', display: 'block', height: 360, objectFit: 'contain', background: '#f8f4ed' }} />
                  <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6, backdropFilter: 'blur(4px)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    Click to enlarge
                  </div>
                </div>

                {lightboxOpen && (
                  <div
                    onClick={(e) => { if (e.target === e.currentTarget) closeLightbox() }}
                    style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
                    onWheel={handleWheel}
                  >
                    {/* Close button */}
                    <button onClick={closeLightbox} style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 101 }}>×</button>

                    {/* Zoom controls */}
                    <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(0,0,0,0.6)', padding: '8px 20px', borderRadius: 30, zIndex: 101, backdropFilter: 'blur(8px)' }}>
                      <button onClick={handleZoomOut} disabled={zoom <= 1} style={{ width: 34, height: 34, borderRadius: '50%', background: zoom <= 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: 20, cursor: zoom <= 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>−</button>
                      <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, minWidth: 44, textAlign: 'center' }}>{Math.round(zoom * 100)}%</span>
                      <button onClick={handleZoomIn} disabled={zoom >= 5} style={{ width: 34, height: 34, borderRadius: '50%', background: zoom >= 5 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: 20, cursor: zoom >= 5 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>+</button>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginLeft: 4 }}>Scroll to zoom · Drag to pan</span>
                    </div>

                    {/* Image */}
                    <div
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      style={{ cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default', userSelect: 'none', maxWidth: '90vw', maxHeight: '85vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <img
                        src="/assets/expressway-layout.webp"
                        alt="Site Plan"
                        draggable={false}
                        style={{ transform: `scale(${zoom}) translate(${pos.x / zoom}px, ${pos.y / zoom}px)`, transformOrigin: 'center center', transition: dragging ? 'none' : 'transform 0.2s ease', maxWidth: '90vw', maxHeight: '85vh', display: 'block', objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                )}
              </>
            )
          })()}
          
        </div>
      </section>

      {/* ── ALL AMENITIES ── */}
      <section style={{ background: '#fff', padding: 'clamp(40px,5vw,64px) 16px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem,3vw,2.6rem)', color: '#1e2a22', fontWeight: 700, marginBottom: 6 }}>50+ Modern Amenities</h2>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>Premium lifestyle amenities for every member of the family</p>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg,#1a4a3a,#f59e0b)', borderRadius: 2, margin: '0 auto' }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
            {amenities.map(({ Icon, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '28px 12px', background: '#f8f4ed', borderRadius: 12, border: '1px solid #e5e7eb', textAlign: 'center', minHeight: 140, width: 'calc((100% - 100px) / 6)', minWidth: 120, boxSizing: 'border-box' }}>
                <Icon size={44} color="#1a4a3a" />
                <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', lineHeight: 1.4, margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE GALLERY ── */}
      <section style={{ background: '#f0ece3', padding: 'clamp(40px,5vw,64px) 16px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#1a4a3a', marginBottom: 8 }}>Project Visuals</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem,3vw,2.6rem)', color: '#1e2a22', fontWeight: 700, marginBottom: 12 }}>Image Gallery</h2>
            <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg,#1a4a3a,#f59e0b)', borderRadius: 2, margin: '0 auto' }} />
          </div>
          {(() => {
            const slides = [
              { src: 'https://i.postimg.cc/m2JQxV0K/Screenshot-2026-06-04-151930.webp', label: 'Township Entry' },
              { src: 'https://i.postimg.cc/MKNykthC/Screenshot-2026-06-04-152029.webp', label: 'Villa Exterior' },
              { src: 'https://i.postimg.cc/W1Z0sgvK/Screenshot-2026-06-04-152104.webp', label: 'Green Landscape' },
              { src: 'https://i.postimg.cc/kXzxrwkk/Screenshot-2026-06-04-152124.webp', label: 'Amenity Zone' },
              { src: 'https://i.postimg.cc/Fs8jtG26/Screenshot-2026-06-04-152219.webp', label: 'Club House View' },
              { src: 'https://i.postimg.cc/7YdgvXpB/Screenshot-2026-06-04-152231.webp', label: 'Swimming Pool Area' },
              { src: 'https://i.postimg.cc/NjXRQmtG/Screenshot-2026-06-04-152306.webp', label: 'Plot Layout' },
              { src: 'https://i.postimg.cc/Lsc92gHp/Screenshot-2026-06-04-152231.png', label: 'Street View' },
              { src: 'https://i.postimg.cc/N09s3kvV/Screenshot-2026-06-04-152306.png', label: 'Master Plan' },
              { src: 'https://i.postimg.cc/vmJYbxQd/Screenshot-2026-06-04-152334.png', label: 'Community Zone' },
              { src: '/assets/expressway-front.webp', label: 'Expressway Front' },
            ]
            const prev = () => setActiveSlide(s => (s === 0 ? slides.length - 1 : s - 1))
            const next = () => setActiveSlide(s => (s === slides.length - 1 ? 0 : s + 1))
            return (
              <div>
                <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 12, boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
                  <img src={slides[activeSlide].src} alt={slides[activeSlide].label} style={{ width: '100%', height: 'clamp(220px,45vw,480px)', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.65) 100%)' }} />
                  <button onClick={prev} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
                  <button onClick={next} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
                </div>
                <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
                  {slides.map((slide, i) => (
                    <div key={i} onClick={() => setActiveSlide(i)} style={{ flexShrink: 0, width: 72, height: 48, borderRadius: 6, overflow: 'hidden', cursor: 'pointer', border: `2px solid ${activeSlide === i ? '#f59e0b' : 'transparent'}`, opacity: activeSlide === i ? 1 : 0.5, transition: 'all 0.2s' }}>
                      <img src={slide.src} alt={slide.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
        </div>
      </section>


      {/* ── GOOGLE MAP + ENQUIRY FORM ── */}
      <section style={{ background: '#1a4a3a', padding: 'clamp(40px,5vw,64px) 16px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="map-grid">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(245,158,11,0.3)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', flex: 1 }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.123456789!2d77.4850!3d28.7050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf33ebb2a7351%3A0x4e08c11e7abf3002!2sExpressway%20Residency!5e0!3m2!1sen!2sin!4v1775802565878!5m2!1sen!2sin"
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location Map"
                  style={{ width: '100%', height: '100%', minHeight: 480, border: 0, display: 'block' }} />
              </div>
            </div>
            <div style={{ background: '#0d2f24', borderRadius: 12, padding: '28px', border: '1px solid rgba(245,158,11,0.2)' }}>
              <EnquiryForm source="Map Section Form" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ position: 'relative', minHeight: 480 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://i.postimg.cc/m2JQxV0K/Screenshot-2026-06-04-151930.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="faq-overlay" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,5vw,72px) 16px' }}>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', marginBottom: 32 }}>FAQ</h2>
          <div style={{ maxWidth: 520, background: '#fff', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} isOpen={openFaqIndex === i} onToggle={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: '#fff', borderTop: '4px solid #1a4a3a' }}>

        {/* Main Grid */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px,4vw,52px) 16px 32px' }}>
          <div className="footer-grid">
            <div>
              <div style={{ marginBottom: 16 }}>
                <img src="/assets/logo.webp" alt="Expressway Residency" style={{ height: 90, width: 'auto', display: 'block', objectFit: 'contain' }} />
              </div>
              <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8, marginBottom: 20 }}>75 Acres USA + Dubai inspired premium township on NE-3, Ghaziabad. Delivering dream homes since 2011.</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <a href="https://wa.me/919911807193" target="_blank" rel="noopener noreferrer" style={{ width: 38, height: 38, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}><IconWhatsApp size={18} /></a>
                <a href="tel:+919911807193" style={{ width: 38, height: 38, background: '#1a4a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><IconPhone size={16} color="#fff" /></a>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#1a4a3a', fontWeight: 800, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 18, paddingBottom: 10, borderBottom: '2px solid #f59e0b' }}>Contact Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <IconPin size={14} color="#f59e0b" />
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>Delhi–Meerut Expy, near Hawa Hawai Restaurant, Didwari, Ghaziabad, UP 201206</p>
                </div>
                <a href="tel:+919911807193" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#1a4a3a', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                  <IconPhone size={15} color="#f59e0b" /> +91-9911807193
                </a>
                <a href="https://wa.me/919911807193" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#25D366', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
                  <IconWhatsApp size={16} /> Chat on WhatsApp
                </a>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#1a4a3a', fontWeight: 800, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 18, paddingBottom: 10, borderBottom: '2px solid #f59e0b' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Book a Free Site Visit','Book Site Visit'],['Get Pricing & Payment Plan','Pricing & Payment Plan'],['Download E-Brochure & Pricing','Download Brochure'],['Apply Now','Apply Now']].map(([modal, label]) => (
                  <button key={label} onClick={() => openModal(modal)} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#374151', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', textAlign: 'left', fontWeight: 500 }}>
                    <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: 15 }}>→</span> {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <p style={{ color: '#9ca3af', fontSize: 12, margin: 0 }}>© 2026 Expressway Residency · Haute World Developers. All Rights Reserved.</p>
            <p style={{ color: '#9ca3af', fontSize: 12, margin: 0 }}>RERA Registration Under Process · Prices subject to change without prior notice.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/919911807193?text=Hi%2C%20I%20am%20interested%20in%20Expressway%20Residency%20plots." target="_blank" rel="noopener noreferrer"
        style={{ position: 'fixed', bottom: 24, right: 16, zIndex: 40, width: 52, height: 52, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 20px rgba(37,211,102,0.45)', textDecoration: 'none' }}
        aria-label="Chat on WhatsApp">
        <IconWhatsApp size={26} />
      </a>
    </div>
  )
}