'use client'
import { useState, useEffect } from 'react'

const WEB3FORMS_ACCESS_KEY = 'ff40f076-e0bd-4853-ba94-e43a82886ce3'
const plotSizes = ['100 Sq. Yd.', '150 Sq. Yd.', '200 Sq. Yd.', '300 Sq. Yd.', 'Custom / Not Sure Yet']

export default function LeadModal({ isOpen, onClose, triggerText = '', inline = false }) {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', plotSize: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    if (isOpen && !inline) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen, inline])

  useEffect(() => {
    if (!isOpen && !inline) {
      setTimeout(() => { setSubmitted(false); setErrors({}); setServerError('') }, 300)
    }
  }, [isOpen, inline])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile.replace(/\s/g, ''))) e.mobile = 'Enter a valid 10-digit mobile number'
    if (!form.plotSize) e.plotSize = 'Please select a plot size'
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
        subject: `New Lead – Expressway Residency | ${triggerText || 'Website Enquiry'}`,
        from_name: 'Expressway Residency Website',
        name: form.name,
        mobile: form.mobile,
        email: form.email || 'Not provided',
        plot_size_interest: form.plotSize,
        message: form.message || 'No message provided',
        source: triggerText || 'Lead Modal',
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
      } else {
        setServerError(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setServerError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen && !inline) return null

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    borderRadius: 10,
    border: '1.5px solid rgba(255,255,255,0.15)',
    background: '#fff',
    color: '#1e2a22',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    display: 'block',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#fff',
    marginBottom: 6,
  }

  const modalContent = (
    <div style={{
      background: '#1a4a3a',
      borderRadius: 16,
      boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
      maxHeight: inline ? 'none' : '92vh',
      overflowY: 'auto',
      width: '100%',
      maxWidth: inline ? '100%' : 480,
      position: 'relative',
      padding: '36px 32px 28px',
    }}>

      {!inline && (
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700 }}
        >
          ×
        </button>
      )}

      {submitted ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
            Thank You, {form.name.split(' ')[0]}!
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
            Our team will contact you within 2 hours with pricing details and to schedule your complimentary site visit.
          </p>
          <p style={{ color: '#f59e0b', fontWeight: 700, fontSize: 16 }}>+91-9911807193</p>
          {!inline && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline', marginTop: 12 }}>Close</button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 28 }}>
            Enquire Now
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            <div>
              <label style={labelStyle}>Name *</label>
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })) }}
                style={{ ...inputStyle, border: `1.5px solid ${errors.name ? '#f87171' : 'rgba(255,255,255,0.15)'}` }}
              />
              {errors.name && <p style={{ color: '#f87171', fontSize: 11, marginTop: 4 }}>{errors.name}</p>}
            </div>

            <div>
              <label style={labelStyle}>Mobile No. *</label>
              <input
                type="tel"
                placeholder="10-digit mobile"
                value={form.mobile}
                onChange={e => { setForm(f => ({ ...f, mobile: e.target.value })); setErrors(er => ({ ...er, mobile: '' })) }}
                style={{ ...inputStyle, border: `1.5px solid ${errors.mobile ? '#f87171' : 'rgba(255,255,255,0.15)'}` }}
              />
              {errors.mobile && <p style={{ color: '#f87171', fontSize: 11, marginTop: 4 }}>{errors.mobile}</p>}
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Plot Size</label>
              <select
                value={form.plotSize}
                onChange={e => { setForm(f => ({ ...f, plotSize: e.target.value })); setErrors(er => ({ ...er, plotSize: '' })) }}
                style={{ ...inputStyle, color: form.plotSize ? '#1e2a22' : '#9ca3af', appearance: 'none', cursor: 'pointer', border: `1.5px solid ${errors.plotSize ? '#f87171' : 'rgba(255,255,255,0.15)'}` }}
              >
                <option value="" disabled style={{ color: '#9ca3af' }}>Select plot size</option>
                {plotSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              {errors.plotSize && <p style={{ color: '#f87171', fontSize: 11, marginTop: 4 }}>{errors.plotSize}</p>}
            </div>

            {serverError && (
              <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 8, padding: '10px 14px', color: '#fca5a5', fontSize: 12 }}>
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{ background: submitting ? '#9ca3af' : '#f59e0b', border: 'none', color: '#fff', padding: '15px', fontWeight: 800, fontSize: 15, cursor: submitting ? 'not-allowed' : 'pointer', borderRadius: 10, width: '100%', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              {submitting ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Submitting…
                </>
              ) : (
                'Submit Enquiry →'
              )}
            </button>

            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center', margin: 0 }}>
              Your data is safe with us.
            </p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </form>
      )}
    </div>
  )

  if (inline) return modalContent

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(13,47,36,0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      {modalContent}
    </div>
  )
}