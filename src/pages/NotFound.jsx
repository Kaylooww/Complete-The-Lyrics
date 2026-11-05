import { Link } from 'react-router-dom'

export default function NotFound({ message = '404 Not Found' }) {
  return (
    <section className="not-found">
      <h2>{message}</h2>
      <p>{message === 'Singer Not Found' ? 'That singer is not in this song. Choose one above to continue.' : 'This page could not be found.'}</p>
      <Link to="/">Home</Link>
    </section>
  )
}

