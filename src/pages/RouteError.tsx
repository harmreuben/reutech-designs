import { isRouteErrorResponse, useRouteError } from 'react-router'
import NotFound from './NotFound'

/** Shown when a route fails to load, for example after a lost connection. */
export default function RouteError() {
  const error = useRouteError()
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFound />

  return (
    <section className="container-site flex flex-col items-start py-28">
      <title>Something went wrong | Reutech Designs</title>
      <h1 className="text-h2">This page didn’t load</h1>
      <p className="mt-4 max-w-md text-muted">
        Check your connection and reload the page. If it keeps happening, go back to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
          Reload page
        </button>
        <a href="/" className="btn btn-secondary">
          Go to the homepage
        </a>
      </div>
    </section>
  )
}
