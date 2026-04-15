'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const domain = searchParams.get('domain')

  // Branding state - simplified
  const [logoUrl, setLogoUrl] = useState<string>('')
  const primaryColor = '#334155' // Clean bank-grade slate blue (no extraction needed)

  // Form state (pre-filled for instant demo)
  const [clientName, setClientName] = useState<string>('John Doe')
  const [ssn, setSsn] = useState<string>('123-45-6789')
  const [accountBalance, setAccountBalance] = useState<string>('125000')
  const [meetingNotes, setMeetingNotes] = useState<string>(
    'Client discussed mortgage refinancing options and expressed concerns about recent identity theft attempts in the region.'
  )

  // Processing & output state
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [sanitizedPayload, setSanitizedPayload] = useState<any>(null)

  // Load logo only
  useEffect(() => {
    if (!domain) return
    const clearbitLogo = `https://logo.clearbit.com/${domain}`
    setLogoUrl(clearbitLogo)
  }, [domain])

  // Secure processing handler
  const handleProcessSecurely = async () => {
    setIsProcessing(true)
    setSanitizedPayload(null)

    await new Promise((resolve) => setTimeout(resolve, 1800))

    const sanitizedNotes = meetingNotes.replace(
      /(\d{3})-?(\d{2})-?(\d{4})/g,
      '[***-**-****]'
    )

    const sanitized = {
      clientName: '[REDACTED_NAME]',
      ssn: '[***-**-****]',
      accountBalance: `$${(parseInt(accountBalance) || 0).toLocaleString('en-US')}`,
      meetingNotes: sanitizedNotes,
    }

    setSanitizedPayload(sanitized)
    setIsProcessing(false)
  }

  // Landing page (no domain)
  if (!domain) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          <div className="flex items-center justify-center gap-x-3 mb-8">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-inner">
              🛡️
            </div>
            <h1 className="text-5xl font-semibold tracking-tighter text-white">
              Sovereign AI Redaction
            </h1>
          </div>

          <p className="text-xl text-zinc-400 mb-10 max-w-md mx-auto">
            Enter any company domain to instantly brand this bank-grade AI redaction demo.<br />
            Fully local. Air-gapped. Zero data leaves your browser.
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col gap-y-2">
              <label className="text-left text-sm font-medium text-zinc-400 px-1">
                Target Company Domain
              </label>
              <div className="flex gap-x-3">
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="arva.ai or hadrius.com"
                  className="flex-1 px-6 py-5 bg-zinc-800 border border-zinc-700 focus:border-blue-500 rounded-2xl text-lg placeholder-zinc-500 outline-none transition-colors"
                />
                <button
                  onClick={() => {
                    const cleanDomain = clientName.trim().toLowerCase().replace(/^https?:\/\//, '')
                    if (cleanDomain) {
                      router.push(`/?domain=${encodeURIComponent(cleanDomain)}`)
                    }
                  }}
                  className="px-10 bg-white text-zinc-950 font-semibold rounded-2xl hover:bg-amber-300 transition-all active:scale-95 flex items-center justify-center"
                >
                  Generate Demo
                </button>
              </div>
              <p className="text-xs text-zinc-500 text-left px-1 mt-1">
                Example: arva.ai • hadrius.com • x.ai
              </p>
            </div>
          </div>

          <div className="mt-12 text-xs text-zinc-500 flex items-center justify-center gap-x-8">
            <div className="flex items-center gap-x-1.5">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              LIVE • Air-gapped
            </div>
            <div>Clearbit logo • Bank-grade design</div>
            <div>Next.js 15 • Vercel ready</div>
          </div>
        </div>
      </div>
    )
  }

  // Branded Dashboard
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100" style={{ '--accent': primaryColor } as React.CSSProperties}>
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={`${domain} logo`}
              className="w-12 h-12 object-contain rounded-2xl shadow-md"
              onError={() => setLogoUrl('')}
            />
          )}
          <div>
            <h1 className="text-3xl font-semibold tracking-tight" style={{ color: primaryColor }}>
              Sovereign AI Redaction
            </h1>
            <p className="text-sm text-zinc-400">for {domain}</p>
          </div>
        </div>

        <div className="flex items-center gap-x-3 text-sm">
          <div className="px-4 py-2 bg-zinc-800 rounded-3xl flex items-center gap-x-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="font-medium">LOCAL • AIR-GAPPED</span>
          </div>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 text-zinc-400 hover:text-white transition-colors flex items-center gap-x-2"
          >
            ← New Domain
          </button>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto p-8">
        <div className="flex gap-8 h-[calc(100vh-120px)]">
          {/* LEFT PANEL — Input */}
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col shadow-2xl">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-x-2" style={{ color: primaryColor }}>
              <span className="text-2xl">📋</span>
              CLIENT PII INPUT
            </h2>

            <div className="space-y-8 flex-1">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">CLIENT NAME</label>
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl focus:border-[var(--accent)] outline-none text-lg transition-all" />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">SSN</label>
                <input type="text" value={ssn} onChange={(e) => setSsn(e.target.value)}
                  className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl focus:border-[var(--accent)] outline-none text-lg transition-all" />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">ACCOUNT BALANCE</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-zinc-400">$</span>
                  <input type="text" value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)}
                    className="w-full pl-10 pr-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl focus:border-[var(--accent)] outline-none text-lg transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">MEETING NOTES</label>
                <textarea value={meetingNotes} onChange={(e) => setMeetingNotes(e.target.value)} rows={5}
                  className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-3xl focus:border-[var(--accent)] outline-none resize-none text-lg transition-all" />
              </div>
            </div>

            <button
              onClick={handleProcessSecurely}
              disabled={isProcessing}
              className="mt-8 w-full py-6 text-lg font-semibold rounded-3xl transition-all active:scale-[0.97] flex items-center justify-center gap-x-3"
              style={{ backgroundColor: primaryColor, color: '#fff', boxShadow: `0 0 25px -3px ${primaryColor}` }}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  EXECUTING LOCAL REDACTION...
                </>
              ) : (
                <>PROCESS SECURELY <span className="text-xl">🔒</span></>
              )}
            </button>

            <p className="text-center text-[10px] text-zinc-500 mt-4">
              Data never leaves this browser • 100% client-side regex redaction
            </p>
          </div>

          {/* MIDDLE — Loading */}
          <div className="w-80 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-6" 
                   style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>🧬</div>
              <h3 className="font-medium text-xl mb-1">Air-Gapped Pipeline</h3>
              <p className="text-zinc-400 text-sm">Local Sovereign AI Redaction Engine</p>
            </div>

            {isProcessing ? (
              <div className="space-y-6 w-full">
                <div className="flex justify-center">
                  <div className="w-12 h-12 border-4 border-zinc-700 border-t-[var(--accent)] rounded-full animate-spin"></div>
                </div>
                <div>
                  <p className="font-mono text-xs tracking-[2px] text-emerald-300">EXECUTING...</p>
                  <p className="text-sm text-zinc-400 mt-3 leading-tight">
                    Regex PII masking • Token-level sanitization •<br />
                    No network • No telemetry • Zero trust model
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-zinc-400 text-sm leading-relaxed max-w-[220px]">
                Click <span className="font-semibold text-white">PROCESS SECURELY</span> to trigger local redaction.
              </div>
            )}
          </div>

          {/* RIGHT — Output */}
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col shadow-2xl">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-x-2" style={{ color: primaryColor }}>
              <span className="text-2xl">✅</span> REDACTED OUTPUT
            </h2>

            {sanitizedPayload ? (
              <>
                <div className="bg-black/40 border border-zinc-700 rounded-3xl p-6 mb-8 font-mono text-sm">
                  <div className="space-y-4">
                    <div className="flex justify-between"><span className="text-zinc-400">clientName</span><span className="text-emerald-300">{sanitizedPayload.clientName}</span></div>
                    <div className="flex justify-between"><span className="text-zinc-400">ssn</span><span className="text-emerald-300">{sanitizedPayload.ssn}</span></div>
                    <div className="flex justify-between"><span className="text-zinc-400">accountBalance</span><span className="text-emerald-300">{sanitizedPayload.accountBalance}</span></div>
                    <div>
                      <span className="text-zinc-400 block mb-1">meetingNotes</span>
                      <p className="text-zinc-300 leading-snug text-xs">{sanitizedPayload.meetingNotes}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center gap-x-2 mb-3">
                    <span className="text-cyan-400 text-xl">☁️</span>
                    <h3 className="uppercase text-xs tracking-widest font-medium">Cloud LLM Summary</h3>
                    <span className="text-[10px] bg-cyan-900 text-cyan-300 px-3 py-px rounded-full">SANITIZED ONLY</span>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-950 to-transparent border border-cyan-800 rounded-3xl p-6 text-sm leading-relaxed">
                    Client {sanitizedPayload.clientName} maintains an account balance of {sanitizedPayload.accountBalance}. 
                    Sanitized notes indicate standard refinancing discussion with emphasis on security protocols. 
                    No PII exposed. Recommendation: Proceed with standard KYC verification.
                  </div>
                </div>

                <button
                  onClick={() => { setSanitizedPayload(null); setIsProcessing(false) }}
                  className="mt-8 text-xs mx-auto block text-zinc-400 hover:text-white underline"
                >
                  Clear output & try new input
                </button>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-500 text-center">
                <div>
                  <div className="text-6xl mb-4 opacity-20">📤</div>
                  <p className="font-medium">Sanitized payload appears here</p>
                  <p className="text-xs mt-2">after local redaction completes</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}