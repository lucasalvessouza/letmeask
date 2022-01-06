import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import { Button } from '../components/Button'

import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

type RoomParams = {
  id: string;
}


export function AdminRoom() {
  const { id: roomId } = useParams<RoomParams>();
  const { title, questions } = useRoom(roomId || '')

  async function handleDeleteQuestion(questionId: string) {
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm('teste')
    if (isConfirmed) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleHightlightQuestion(questionId: string, isHighlighted: boolean) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: !isHighlighted
    })
  }

  async function handleAnsweredQuestion(questionId: string, isAnswered: boolean) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: !isAnswered
    })
  }
  
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
              <Question  {...question} key={question.id}>
                <div className='button-group'>
                  <button
                    className={`answered-button ${question.isAnswered ? 'answered' : ''}`}
                    onClick={() => handleAnsweredQuestion(question.id, question.isAnswered)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    className={`highlight-button ${question.isHighlighted ? 'highlighted' : ''}`}
                    onClick={() => handleHightlightQuestion(question.id, question.isHighlighted)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button onClick={() => handleDeleteQuestion(question.id)}>
                    <img src={deleteImg} alt="Excluir pergunta" />
                  </button>
                </div>
              </Question>
            ))
          }
        </div>
      </main>
    </div>
  )
}