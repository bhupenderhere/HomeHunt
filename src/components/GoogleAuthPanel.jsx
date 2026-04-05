import { Link } from "react-router-dom"
import OAuth from "./OAuth"

function GoogleAuthPanel({ introTitle, introDescription, footerPrompt, footerLinkText, footerLinkTo }) {
  return (
    <>
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[24px] bg-sand-100/80 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
            Google only
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Authentication now runs through Google only. No separate email or password flow is shown.
          </p>
        </div>
        <div className="rounded-[24px] bg-brand-50/80 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-700">
            Fast access
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            One action gets you into profile management, listing publishing, and inquiry tools.
          </p>
        </div>
      </div>

      <div className="rounded-[28px] bg-sand-100/80 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
          Access
        </p>
        <h2 className="mt-3 text-2xl font-bold text-ink-950">{introTitle}</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">{introDescription}</p>
      </div>

      <OAuth />

      <p className="mt-6 text-center text-sm text-slate-500">
        {footerPrompt}{" "}
        <Link className="font-semibold text-brand-700 hover:text-brand-800" to={footerLinkTo}>
          {footerLinkText}
        </Link>
      </p>
    </>
  )
}

export default GoogleAuthPanel
