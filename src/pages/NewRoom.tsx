import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function NewRoom() {
    const { user } = useAuth()
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

                <form>
                    <input type="text" />

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