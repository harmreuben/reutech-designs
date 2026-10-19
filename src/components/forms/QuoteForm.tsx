import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, LoaderCircle, MessageCircle } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { useForm, useWatch, type FieldError } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router'
import { hasWhatsApp } from '../../config/site'
import { whatsappUrl } from '../../lib/contact'
import {
  budgetOptions,
  contactMethodOptions,
  limits,
  quoteSchema,
  serviceLabel,
  serviceOptions,
  type QuoteInput,
  type QuoteRequest,
  type QuoteResponse,
} from '../../lib/quote-schema'
import { pricingPackages } from '../../data/pricing'

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; reference: string; delivery: 'email' | 'dev-log'; name: string }
  | { kind: 'error'; message: string }

const REQUEST_TIMEOUT_MS = 15_000

function todayISO() {
  const d = new Date()
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 10)
}

/** WhatsApp fallback that carries the visitor's details, so nothing is lost if sending fails. */
function fallbackMessage(v: Partial<QuoteInput>) {
  return [
    'Hello Reutech Designs, I tried to send a quote request on your website.',
    v.fullName && `Name: ${v.fullName}`,
    v.service && `Service: ${serviceLabel(v.service)}`,
    v.projectTitle && `Project: ${v.projectTitle}`,
    v.details && `Details: ${v.details}`,
  ]
    .filter(Boolean)
    .join('\n')
}

function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  hint?: ReactNode
  error?: FieldError
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="font-normal text-subtle"> (optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error?.message && (
        <p id={`${id}-error`} className="field-error flex items-start gap-1.5">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error.message}
        </p>
      )}
    </div>
  )
}

export function QuoteForm() {
  const [params] = useSearchParams()
  const uid = useId()
  const id = (name: string) => `${uid}-${name}`

  const presetService = serviceOptions.some((s) => s.value === params.get('service'))
    ? (params.get('service') as QuoteInput['service'])
    : undefined
  const presetPackage = pricingPackages.find((p) => p.id === params.get('package'))

  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm<QuoteInput, unknown, QuoteRequest>({
    resolver: zodResolver(quoteSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      service: presetPackage?.service ?? presetService,
      packageId: presetPackage?.id ?? '',
      projectTitle: '',
      details: '',
      budget: '',
      deadline: '',
      contactMethod: 'WhatsApp',
      consent: undefined,
    },
  })

  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const startedAt = useRef(0)
  const honeypot = useRef<HTMLInputElement>(null)
  const inFlight = useRef(false)
  const successHeading = useRef<HTMLHeadingElement>(null)
  const errorBox = useRef<HTMLDivElement>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  useEffect(() => {
    if (status.kind === 'success') successHeading.current?.focus()
    if (status.kind === 'error') errorBox.current?.focus()
  }, [status])

  const detailsLength = useWatch({ control, name: 'details' })?.length ?? 0
  const contactMethod = useWatch({ control, name: 'contactMethod' })

  const onSubmit = async (data: QuoteRequest) => {
    if (inFlight.current) return // ignore double clicks
    inFlight.current = true
    setStatus({ kind: 'submitting' })

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          website: honeypot.current?.value ?? '',
          startedAt: startedAt.current,
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      })

      let body: QuoteResponse | null = null
      try {
        body = (await res.json()) as QuoteResponse
      } catch {
        body = null
      }

      if (res.ok && body?.ok) {
        setStatus({ kind: 'success', reference: body.reference, delivery: body.delivery, name: data.fullName })
        reset()
        startedAt.current = Date.now()
        return
      }

      if (body && !body.ok && body.fieldErrors) {
        for (const [field, message] of Object.entries(body.fieldErrors)) {
          setError(field as keyof QuoteInput, { type: 'server', message }, { shouldFocus: true })
        }
      }
      setStatus({
        kind: 'error',
        message:
          body && !body.ok
            ? body.message
            : 'Your request could not be sent. Please try again, or message us on WhatsApp.',
      })
    } catch (error) {
      const timedOut = error instanceof DOMException && error.name === 'TimeoutError'
      setStatus({
        kind: 'error',
        message: timedOut
          ? 'Sending took too long, so your request may not have arrived. Please try again, or message us on WhatsApp.'
          : 'We couldn’t reach the server. Check your internet connection and try again.',
      })
    } finally {
      inFlight.current = false
    }
  }

  if (status.kind === 'success') {
    return (
      <div className="card p-8 sm:p-10" role="status">
        <CheckCircle2 className="size-10 text-success" aria-hidden="true" />
        <h3 ref={successHeading} tabIndex={-1} className="mt-5 text-h3 focus:outline-none">
          Thank you, {status.name.split(' ')[0]}. Your request has been sent.
        </h3>
        <p className="mt-3 max-w-prose text-muted">
          We’ll review your project and get back to you using your preferred contact method. Your
          reference is <strong className="text-fg">{status.reference}</strong>.
        </p>
        {status.delivery === 'dev-log' && (
          <p className="mt-4 rounded-control border border-dashed border-line-strong p-3 text-sm text-subtle">
            Development only: email isn’t configured, so the request was printed in the terminal
            instead of being emailed.
          </p>
        )}
        <div className="mt-7 flex flex-wrap gap-3">
          <button type="button" className="btn btn-secondary" onClick={() => setStatus({ kind: 'idle' })}>
            Send another request
          </button>
          <Link to="/portfolio" className="btn btn-secondary">
            Browse our work
          </Link>
        </div>
      </div>
    )
  }

  const submitting = status.kind === 'submitting'
  const describedBy = (name: keyof QuoteInput, hasHint = false) =>
    [errors[name] ? `${id(name)}-error` : hasHint ? `${id(name)}-hint` : ''].filter(Boolean).join(' ') || undefined

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)} noValidate aria-describedby={`${uid}-required`} className="space-y-6">
      <p id={`${uid}-required`} className="text-sm text-subtle">
        All fields are required unless marked optional.
      </p>

      {status.kind === 'error' && (
        <div
          ref={errorBox}
          tabIndex={-1}
          role="alert"
          className="rounded-control border border-danger/60 bg-danger/10 p-4 focus:outline-none"
        >
          <p className="flex items-start gap-2 font-semibold text-fg">
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden="true" />
            Your request was not sent
          </p>
          <p className="mt-1 text-muted">{status.message}</p>
          {hasWhatsApp && (
            <a
              href={whatsappUrl(fallbackMessage(getValues()))}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link mt-2 inline-flex items-center gap-1.5"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Send these details on WhatsApp instead
            </a>
          )}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id('fullName')} label="Full name" error={errors.fullName}>
          <input
            id={id('fullName')}
            className="field-control"
            autoComplete="name"
            maxLength={limits.name}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={describedBy('fullName')}
            {...register('fullName')}
          />
        </Field>
        <Field id={id('email')} label="Email address" error={errors.email}>
          <input
            id={id('email')}
            type="email"
            inputMode="email"
            className="field-control"
            autoComplete="email"
            maxLength={limits.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy('email')}
            {...register('email')}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={id('phone')}
          label="Phone number"
          optional={contactMethod === 'Email'}
          hint="Include the country code if you’re outside Kenya."
          error={errors.phone}
        >
          <input
            id={id('phone')}
            type="tel"
            inputMode="tel"
            className="field-control"
            autoComplete="tel"
            maxLength={limits.phone}
            placeholder="0712 345 678"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy('phone', true)}
            {...register('phone')}
          />
        </Field>
        <fieldset>
          <legend className="field-label">How should we contact you?</legend>
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
            {contactMethodOptions.map((m) => (
              <label key={m} className="inline-flex min-h-11 cursor-pointer items-center gap-2.5">
                <input type="radio" value={m} className="size-5 accent-electric" {...register('contactMethod')} />
                {m}
              </label>
            ))}
          </div>
          {errors.contactMethod?.message && <p className="field-error">{errors.contactMethod.message}</p>}
        </fieldset>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id('service')} label="Service" error={errors.service}>
          <select
            id={id('service')}
            className="field-control"
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={describedBy('service')}
            {...register('service')}
          >
            <option value="">Choose a service</option>
            {serviceOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id('packageId')} label="Package" optional>
          <select id={id('packageId')} className="field-control" {...register('packageId')}>
            <option value="">Not sure / custom project</option>
            {pricingPackages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({serviceLabel(p.service)})
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id={id('projectTitle')} label="Project title" hint="For example: Logo for my bakery" error={errors.projectTitle}>
        <input
          id={id('projectTitle')}
          className="field-control"
          maxLength={limits.title}
          aria-invalid={errors.projectTitle ? true : undefined}
          aria-describedby={describedBy('projectTitle', true)}
          {...register('projectTitle')}
        />
      </Field>

      <Field
        id={id('details')}
        label="Project details"
        hint={`What you need, what it’s for, and anything we should know. ${detailsLength.toLocaleString('en')}/${limits.details.toLocaleString('en')}`}
        error={errors.details}
      >
        <textarea
          id={id('details')}
          className="field-control"
          rows={6}
          maxLength={limits.details}
          aria-invalid={errors.details ? true : undefined}
          aria-describedby={describedBy('details', true)}
          {...register('details')}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id('budget')} label="Budget range" optional error={errors.budget}>
          <select id={id('budget')} className="field-control" {...register('budget')}>
            <option value="">Prefer not to say</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id('deadline')} label="When do you need it?" optional error={errors.deadline}>
          <input
            id={id('deadline')}
            type="date"
            min={todayISO()}
            className="field-control [color-scheme:dark]"
            aria-invalid={errors.deadline ? true : undefined}
            aria-describedby={describedBy('deadline')}
            {...register('deadline')}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people and screen readers; bots tend to fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id('website')}>Leave this field empty</label>
        <input ref={honeypot} id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 size-5 shrink-0 accent-electric"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${id('consent')}-error` : undefined}
            {...register('consent')}
          />
          <span className="text-[0.95rem] text-muted">
            I agree that Reutech Designs may use these details to reply to my request, as explained
            in the{' '}
            <Link to="/privacy" className="text-link" target="_blank" rel="noopener">
              privacy notice
            </Link>
            .
          </span>
        </label>
        {errors.consent?.message && (
          <p id={`${id('consent')}-error`} className="field-error flex items-start gap-1.5">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {errors.consent.message}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={submitting} aria-disabled={submitting}>
        {submitting ? (
          <>
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
            Sending your request…
          </>
        ) : (
          'Send quote request'
        )}
      </button>
    </form>
  )
}
