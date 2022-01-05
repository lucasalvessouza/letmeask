import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type FirebaseLike = Record<string, {
  id: string
  userId: string
}>

type FirebaseQuestions = Record<string, {
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean,
  isHighlighted: boolean,
  likes: FirebaseLike
}>

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean,
  isHighlighted: boolean,
  likeCount: number,
  likeId?: string
}

export function useRoom(roomId: string) {
  const { user } = useAuth()
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
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length || 0,
            likeId: Object.entries(value.likes ?? {}).find(([key, value]) => value.userId === user?.id)?.[0]
          }
        })
      
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

    return (() => {
      roomRef.off('value')
    })
  }, [roomId, user?.id])

  return { title, questions }
}