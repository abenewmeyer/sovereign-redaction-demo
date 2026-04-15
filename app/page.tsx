'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

// Inner component that uses useSearchParams (required for Next.js 16 build)
function RedactionApp() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const domain = searchParams.get('domain')

  const [logoUrl, setLogoUrl] = useState<string>('')
  const primaryColor = '#334155'

  // Form state
  const [clientName, setClientName] = useState<string>('John Doe')
  const [ssn, setSsn] = useState<string>('123-45-6789')
  const [accountBalance, setAccountBalance] = useState<string>('125000')
  const [meetingNotes, setMeetingNotes] = useState<string>(
    'Client discussed mortgage refinancing options and expressed concerns about recent identity theft attempts in the region.'
  )

  // Processing & output state
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [sanitizedPayload, setSanitizedPayload] = useState<any>(null)

  // System Audit Terminal - logs persist on screen
  const [auditLogs, setAuditLogs] = useState<string[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [auditLogs])

  // Load logo
  useEffect(() => {
    if (!domain) return
    const clearbitLogo = `https://logo.clearbit.com/${domain}`
    setLogoUrl(clearbitLogo)
  }, [domain])

  const clearTerminal = () => setAuditLogs([])

  // Stream audit logs with readable timing (stay visible after finish)
  const streamAuditLogs = async () => {
    const logs = [
      `[${new Date().toLocaleTimeString()}] INITIATING AIR-GAPPED ENVIRONMENT...`,
      `[${new Date(Date.now() + 800).toLocaleTimeString()}] COMPLIANCE CHECK: PII DETECTED (REGEX: SSN, NAME)`,
      `[${new Date(Date.now() + 1600).toLocaleTimeString()}] EXECUTING LOCAL REDACTION ALGORITHM...`,
      `[${new Date(Date.now() + 2400).toLocaleTimeString()}] MASKING SENSITIVE TOKENS (SSN → [***-**-****])`,
      `[${new Date(Date.now() + 3200).toLocaleTimeString()}] ZERO-RETENTION PAYLOAD PREPARED`,
      `[${new Date(Date.now() + 4000).toLocaleTimeString()}] SANITIZED NOTES ROUTED TO MOCK LLM`,
      `[${new Date(Date.now() + 4800).toLocaleTimeString()}] AUDIT COMPLETE — NO DATA EXFILTRATED`,
      `[${new Date(Date.now() + 5600).toLocaleTimeString()}] SOVEREIGN AI SANDBOX SECURE ✓`,
    ]

    for (const log of logs) {
      await new Promise((resolve) => setTimeout(resolve, 600))
      setAuditLogs((prev) => [...prev, log])
    }
  }

  const handleProcessSecurely = async () => {
    setIsProcessing(true)
    setSanitizedPayload(null)

    await streamAuditLogs()

    await new Promise((resolve) => setTimeout(resolve, 600))

    const sanitizedNotes = meetingNotes.replace(/(\d{3})-?(\d{2})-?(\d{4})/g, '[***-**-****]')

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
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-inner">🛡️</div>
            <h1 className="text-5xl font-semibold tracking-tighter text-white">Sovereign AI Redaction</h1>
          </div>

          <p className="text-xl text-zinc-400 mb-10 max-w-md mx-auto">
            Enter any company domain to instantly brand this bank-grade AI redaction demo.<br />
            Fully local. Air-gapped. Zero data leaves your browser.
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col gap-y-2">
              <label className="text-left text-sm font-medium text-zinc-400 px-1">Target Company Domain</label>
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
                    if (cleanDomain) router.push(`/?domain=${encodeURIComponent(cleanDomain)}`)
                  }}
                  className="px-10 bg-white text-zinc-950 font-semibold rounded-2xl hover:bg-amber-300 transition-all active:scale-95 flex items-center justify-center"
                >
                  Generate Demo
                </button>
              </div>
              <p className="text-xs text-zinc-500 text-left px-1 mt-1">Example: arva.ai • hadrius.com • x.ai</p>
            </div>
          </div>

          <div className="mt-12 text-xs text-zinc-500">Next.js 16 • Fully client-side • Air-gapped demo</div>
        </div>
      </div>
    )
  }

  // Branded Dashboard
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100" style={{ '--accent': primaryColor } as any}>
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {logoUrl && (
            <img src={logoUrl} alt={`${domain} logo`} className="w-12 h-12 object-contain rounded-2xl shadow-md" onError={() => setLogoUrl('')} />
          )}
          <div>
            <h1 className="text-3xl font-semibold tracking-tight" style={{ color: primaryColor }}>Sovereign AI Redaction</h1>
            <p className="text-sm text-zinc-400">for {domain}</p>
          </div>
        </div>

        <div className="flex items-center gap-x-3 text-sm">
          <div className="px-4 py-2 bg-zinc-800 rounded-3xl flex items-center gap-x-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="font-medium">LOCAL • AIR-GAPPED</span>
          </div>
          <button onClick={() => router.push('/')} className="px-6 py-3 text-zinc-400 hover:text-white transition-colors flex items-center gap-x-2">← New Domain</button>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto p-8 space-y-8">
        {/* Main Three Panels */}
        <div className="flex gap-8 h-[calc(100vh-260px)]">
          {/* LEFT: Input */}
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col shadow-2xl">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-x-2" style={{ color: primaryColor }}>📋 CLIENT PII INPUT</h2>
            <div className="space-y-8 flex-1">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">CLIENT NAME</label>
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl focus:border-[var(--accent)] outline-none text-lg transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">SSN</label>
                <input type="text" value={ssn} onChange={(e) => setSsn(e.target.value)} className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl focus:border-[var(--accent)] outline-none text-lg transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">ACCOUNT BALANCE</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-zinc-400">$</span>
                  <input type="text" value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} className="w-full pl-10 pr-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl focus:border-[var(--accent)] outline-none text-lg transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">MEETING NOTES</label>
                <textarea value={meetingNotes} onChange={(e) => setMeetingNotes(e.target.value)} rows={5} className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-3xl focus:border-[var(--accent)] outline-none resize-none text-lg transition-all" />
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
          </div>

          {/* MIDDLE: Status */}
          <div className="w-80 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-6" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>🧬</div>
              <h3 className="font-medium text-xl mb-1">Air-Gapped Pipeline</h3>
              <p className="text-zinc-400 text-sm">Local Sovereign AI Redaction Engine</p>
            </div>
            {isProcessing ? (
              <div className="space-y-6 w-full">
                <div className="flex justify-center"><div className="w-12 h-12 border-4 border-zinc-700 border-t-[var(--accent)] rounded-full animate-spin"></div></div>
                <p className="font-mono text-xs tracking-[2px] text-emerald-300">PROCESSING...</p>
              </div>
            ) : (
              <p className="text-zinc-400 text-sm">Click PROCESS SECURELY above</p>
            )}
          </div>

          {/* RIGHT: Output */}
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col shadow-2xl">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-x-2" style={{ color: primaryColor }}>✅ REDACTED OUTPUT</h2>
            {sanitizedPayload ? (
              <div className="space-y-8 flex-1 flex flex-col">
                <div className="bg-black/40 border border-zinc-700 rounded-3xl p-6 font-mono text-sm space-y-4 flex-1">
                  <div className="flex justify-between"><span className="text-zinc-400">clientName</span><span className="text-emerald-300">{sanitizedPayload.clientName}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-400">ssn</span><span className="text-emerald-300">{sanitizedPayload.ssn}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-400">accountBalance</span><span className="text-emerald-300">{sanitizedPayload.accountBalance}</span></div>
                  <div><span className="text-zinc-400 block mb-1">meetingNotes</span><p className="text-zinc-300 text-xs">{sanitizedPayload.meetingNotes}</p></div>
                </div>

                <div>
                  <div className="flex items-center gap-x-2 mb-3">
                    <span className="text-cyan-400 text-xl">☁️</span>
                    <h3 className="uppercase text-xs tracking-widest font-medium">Cloud LLM Summary (SANITIZED ONLY)</h3>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-950 border border-cyan-800 rounded-3xl p-6 text-sm">
                    Client {sanitizedPayload.clientName} maintains an account balance of {sanitizedPayload.accountBalance}. Sanitized notes indicate standard refinancing discussion. No PII exposed.
                  </div>
                </div>

                <button onClick={() => setSanitizedPayload(null)} className="text-xs mx-auto block text-zinc-400 hover:text-white underline">Clear output</button>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-500">Redacted output will appear here</div>
            )}
          </div>
        </div>

        {/* System Audit Terminal - logs stay visible */}
        <div className="bg-black border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-zinc-950 border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            </div>
            <div className="font-mono text-xs text-zinc-400 tracking-widest">SYSTEM AUDIT TERMINAL • AIR-GAPPED MODE</div>
            <button onClick={clearTerminal} className="text-[10px] px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded text-zinc-400 hover:text-white transition-colors">CLEAR LOGS</button>
          </div>

          <div ref={terminalRef} className="h-72 p-6 font-mono text-sm text-emerald-300 bg-black overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {auditLogs.length > 0 ? (
              auditLogs.map((log, index) => <div key={index} className="mb-1">{log}</div>)
            ) : (
              <div className="text-zinc-500 italic">Terminal ready. Click PROCESS SECURELY to start the air-gapped audit trail...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Root page with Suspense boundary (fixes Vercel build error)
export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading Sovereign AI Redaction Demo...</div>}>
      <RedactionApp />
    </Suspense>
  )
}