import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export function useContentSecond(hash : string) {
    // console.log(hash);
    const [contents, setContents] = useState([]);
    async function refresh()
    {
        axios.get(`${BACKEND_URL}/brain/${hash}`)
            .then((response) => {
                setContents(response.data.content);
            })
    }
    useEffect(() => {
        refresh()
        // let interval = setInterval(() => {
        //     refresh()
        // } , 10*1000);

        // return () => {
        //     clearInterval(interval);
        // }
    }, [])
    return {contents, setContents, refresh};
}