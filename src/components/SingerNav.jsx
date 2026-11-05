import { NavLink } from 'react-router-dom'
import { singers } from '../data/singers'

export default function SingerNav() {
  return (
    <nav className="singer-nav" aria-label="Choose a singer">
      {singers.map(singer => (
        <NavLink key={singer.id} to={`/singer/${singer.id}`} style={{ backgroundColor: singer.color }}
          className={({ isActive }) => `singer-link${isActive ? ' active' : ''}`}>
          {singer.name}
        </NavLink>
      ))}
    </nav>
  )
}

