import { useNavigate } from "react-router"
import { authContext } from "../context/Auth-context"
import { useContext, useEffect } from "react"

export default function useRouteGuard() {
    const auth = useContext(authContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.currentUserLogged.isLogged) {
            navigate("/login");
        }
    }, [])
}

export function useAuthenticationRouteGuard() {
    const auth = useContext(authContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.currentUserLogged.isLogged) {
            navigate("/home");
        }
    }, [])
}