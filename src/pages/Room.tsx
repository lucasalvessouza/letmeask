import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'

import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useEffect, useState } from 'react'
import { database } from '../services/firebase'
import { Question } from '../components/Question'

type RoomParams = {
  id: string;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean,
  isHighlighted: boolean
}>

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean,
  isHighlighted: boolean
}

export function Room() {
  const { user } = useAuth()
  const { id: roomId } = useParams<RoomParams>();

  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered
          }
        })
      
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId])

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
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
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