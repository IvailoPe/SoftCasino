import { useEffect, useState } from "react"
import requester from "../api/requester";

export default function useFetch(method, url, body, reset, startingValue = {}) {
    const [data, setData] = useState(startingValue);
    
    useEffect(() => {
        if (reset === true || reset === false) {
            (async function () {
                let data = await requester(method, url, body)
                setData(data)
            })()
        }
    }, [reset])

    return [data]
}