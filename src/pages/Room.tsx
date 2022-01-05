import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import likeImg from '../assets/images/like.svg'
import { Button } from '../components/Button'

import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

type RoomParams = {
  id: string;
}

export function Room() {
  const { user } = useAuth()
  const { id: roomId } = useParams<RoomParams>();

  const [newQuestion, setNewQuestion] = useState('')

  async function handleNewQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isAnswered: false,
      isHighlighted: false,
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId || ''} />
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>
        <form>
          <textarea
            placeholder='O que você deseja perguntar?'
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {
              user ? (
                <div className='user-info'>
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
              )
            }
            <Button
              type='submit'
              disabled={!user}
              onClick={handleNewQuestion}
            >
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className="room-question">
          <p>
            Olá, eu gostaria de saber como criar componentes funcionais dentro do React e se existe diferença na performance entre um componente com classes.
          </p>
          <div className="question-footer">
            <div>
              {/* <img src="" alt="" />  */}
              <span className='question-author'>Rachel Laguna Martins</span>
            </div>

            <div>
              <span className='question-like-count'>16</span>
              <img src={likeImg} alt="Like" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}