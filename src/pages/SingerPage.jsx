import { useState } from 'react'
import { Link, useLocation, useOutletContext, useParams } from 'react-router-dom'
import { singers } from '../data/singers'
import NotFound from './NotFound'

function SingerInput({ singer }) {
  const { updateLine } = useOutletContext()
  const [text, setText] = useState('')
  const [lineId, setLineId] = useState(() => crypto.randomUUID())

  function handleChange(event) {
    setText(event.target.value)
    updateLine(lineId, singer, event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!text.trim()) return
    setText('')
    setLineId(crypto.randomUUID())
  }

  return (
    <form className="singer-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="lyric-input">{singer.name} lyric</label>
      <input id="lyric-input" autoFocus autoComplete="off" value={text} onChange={handleChange}
        aria-describedby="singer-prompt" />
      <div className="singer-details">
        <span id="singer-prompt"><strong>{singer.name}</strong> · {singer.prompt}</span>
        <Link to="/">Home</Link>
      </div>
    </form>
  )
}

export default function SingerPage() {
  const { singerId } = useParams()
  const location = useLocation()
  const singer = singers.find(item => item.id === singerId)
  if (!singer) return <NotFound message="Singer Not Found" />
  return <SingerInput key={location.key} singer={singer} />
}

