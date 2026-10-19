import { hasWhatsApp } from '../../config/site'
import { whatsappMessages, whatsappUrl } from '../../lib/contact'

/** WhatsApp glyph, used only to link to a WhatsApp chat. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z"
      />
    </svg>
  )
}

/** Floating chat button, shown on every page when a confirmed WhatsApp number is set. */
export function WhatsAppButton() {
  if (!hasWhatsApp) return null
  return (
    <aside aria-label="Quick contact">
      <a
        href={whatsappUrl(whatsappMessages.general)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Reutech Designs on WhatsApp (opens in a new tab)"
        title="Chat on WhatsApp"
        className="whatsapp-float fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-[#08260F] shadow-lg shadow-black/40 transition-transform hover:scale-105 focus-visible:outline-offset-4 sm:right-6 sm:bottom-6"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </aside>
  )
}
