import { useAuth } from '../../hooks/useAuth'
import logoImg from '../../assets/images/logo.svg'
import { Logout } from '../Logout'
import { RoomCode } from '../RoomCode'
import { Button } from '../Button'
import { database } from '../../services/firebase'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import './styles.scss'
import { useState } from 'react'

type HeaderProps = {
  roomId?: string
}


export function Header(props: HeaderProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(true)

  async function handleCloseRoom() {
    if (window.confirm('Você tem certeza que deseja encerrar essa sala?')) {
      await database.ref(`rooms/${props.roomId}`).update({
        closedAt: Date.now()
      })
      toast.success('Sala encerrada com sucesso!')
      navigate('/')
    }
  }

  return (
    <header>
      <div className="content">
        <img src={logoImg} alt="Letmeask" />
        <nav>
          <RoomCode code={props.roomId || ''} />
          <Button variant='danger' onClick={handleCloseRoom}>Encerrar sala</Button>
          { user && <Logout /> }
        </nav>
        <div
          className={`menu-section ${openMenu ? 'on' : undefined}`}
          onClick={() => setOpenMenu(!openMenu)}
        >
          <div className="nav-mobile">
            <ul>
              <a href='#'>Codigo da sala</a>
              <a href='#'>Encerrar sala</a>
              <a href='#'>Logout</a>
            </ul>
          </div>
          <div className="menu-toggle">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
          </div>
        </div>
      </div>
    </header>
  )
}