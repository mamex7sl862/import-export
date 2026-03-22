"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { api } from "@/hooks/api"

interface FAQItem { id: number; question: string; answer: string; order: number }

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)
  const [faqs, setFaqs] = useState<FAQItem[]>([])

  useEffect(() => {
    api.get("/api/content/faqs/")
      .then(r => setFaqs(r.data.results || r.data))
      .catch(() => {})
  }, [])

  return (
    <section id="faq" className="w-full py-16 md:py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 relative z-10">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">FAQ</p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-white md:text-4xl">Common Questions</h2>
          <p className="mt-4 text-slate-300">Find answers to frequently asked questions about our services</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={faq.id} className="border border-slate-700/50 rounded-lg overflow-hidden backdrop-blur-sm">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
              >
                <span className="font-semibold text-white">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 text-[#d4af37] transition-transform ${openIdx === idx ? "rotate-180" : ""}`} />
              </button>
              {openIdx === idx && (
                <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700/50 text-slate-300">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
