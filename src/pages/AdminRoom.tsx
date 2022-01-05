import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'

import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'

type RoomParams = {
  id: string;
}


export function AdminRoom() {
  const { id: roomId } = useParams<RoomParams>();
  const { title, questions } = useRoom(roomId || '')
  
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId || ''} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>
        <div className='question-list'>
          {
            questions.map((question) => (
              <Question  {...question} key={question.id} />
            ))
          }
        </div>
      </main>
    </div>
  )
}