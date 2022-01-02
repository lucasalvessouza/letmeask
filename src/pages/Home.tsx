import { useNavigate } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export function Home() {
    const navigate = useNavigate()

    function handleCreateRoom() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result)
                navigate('/rooms/new')
            })
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
                <button className='create-room' onClick={handleCreateRoom}>
                    <img src={googleIconImg} alt="Google logo" />
                    Crie sua sala com o Google
                </button>
                <div className='separator'>ou entre em uma sala</div>
                <form>
                    <input type="text" />

                    <Button type='submit'>Entrar em uma sala</Button>
                </form>
            </main>
        </div>
    )
}