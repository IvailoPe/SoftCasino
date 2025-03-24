import { useState, useEffect } from "react"

export default function useChat(url, username, id) {
    const [ws] = useState(() => {
        return new WebSocket(url);
    })
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        ws.addEventListener("open", () => {
            ws.send(JSON.stringify({ username, action: "first-time", id }))
        })

        ws.addEventListener("message", (e) => {
            let data = JSON.parse(e.data);
            setMessages((prevData) => {
                return [data,...prevData]
            })
        })

        return () => {
            ws.close();
        }
    }, [])

    return [(username, message) => {        
        return ws.send(JSON.stringify({
            username,
            message,
            action: "message"
        }))
    }, messages, setMessages]
} 