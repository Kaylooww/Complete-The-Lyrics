import { useState } from 'react'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import SingerNav from './components/SingerNav'
import SingerPage from './pages/SingerPage'
import NotFound from './pages/NotFound'
import './App.css'

function LyricsLayout() {
  const [lyrics, setLyrics] = useState([])

  function updateLine(id, singer, text) {
    setLyrics(previous => {
      const existing = previous.some(line => line.id === id)
      if (!text.trim()) return previous.filter(line => line.id !== id)
      if (existing) return previous.map(line => line.id === id ? { ...line, text } : line)
      return [...previous, { id, singerId: singer.id, color: singer.color, name: singer.name, text }]
    })
  }

  return (
    <main className="lyrics-app">
      <h1><Link to="/">Complete the Lyrics</Link></h1>
      <SingerNav />
      <Outlet context={{ updateLine }} />
      <section className="lyrics-board" aria-label="Shared lyrics" aria-live="polite" aria-relevant="additions text">
        {lyrics.map(line => (
          <p className="lyric-line" key={line.id} style={{ backgroundColor: line.color }} aria-label={`${line.name}: ${line.text}`}>
            {line.text}
          </p>
        ))}
      </section>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LyricsLayout />}>
          <Route index element={null} />
          <Route path="singer" element={null} />
          <Route path="singer/:singerId" element={<SingerPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

