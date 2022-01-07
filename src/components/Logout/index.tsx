import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../Button";


export function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <Button isOutlined onClick={handleLogout}>Logout</Button>
  )
}