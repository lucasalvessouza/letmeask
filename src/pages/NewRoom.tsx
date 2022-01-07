import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import toast from 'react-hot-toast'

export function NewRoom() {
    const [newRoom, setNewRoom] = useState('');
    const navigate = useNavigate()
    const { user } = useAuth()

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if (newRoom.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            userId: user?.id 
        })

        toast.success('Sala criada com sucesso')

        navigate(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Toda pergunta tem uma resposta</strong>
                <p>Aprenda e compartilha conhecimento com outras pessoas</p>
            </aside>
            <main className='main-content'>
                <div>
                    <img src={logoImg} alt="Letmeask" />
                </div>

                <h1>{user?.name}</h1>

                <h2>Crie uma nova sala</h2>

                <form onSubmit={handleCreateRoom}>
                    <input
                        type="text"
                        name='newRoom'
                        placeholder='Digite o nome da sala'
                        onChange={e => setNewRoom(e.target.value)}
                        value={newRoom}
                    />
                    <Button type='submit'>Criar sala</Button>
                </form>
                <p>
                    Quer entrar em uma sala já existente? 
                    <Link to="/">Clique aqui</Link>
                </p>
            </main>
        </div>
    )
}