import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../Button";


export function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  async function handleLogout() {
    await logout()
    toast.success('Logout concluido!')
    navigate('/')
  }

  return (
    <Button isOutlined onClick={handleLogout}>Logout</Button>
  )
}