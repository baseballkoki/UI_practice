import axios from "axios";
import { useCallback, useState } from "react"
import { cat } from "../components/types/api/cat";
import { User } from "../components/types/api/user";
import { useMessage } from "./useMessage";

export const useAllUsers = () => {
    const { showMessage } = useMessage();

    const [loading, setLoading] = useState(false);
    const [cats, setUsers] = useState<Array<cat>>([]);
    console.log("apiへ通信開始しそう")

    const getUsers = useCallback(() => {
        console.log("apiへ通信開始")
        setLoading(true);
        //axios.get<Array<cat>>(`https://api-practice-spring.onrender.com/services/v1/nyanko/all`)
        axios.get<Array<cat>>(`http://localhost:4646/services/v1/nyanko/all`)
        .then((res) => setUsers(res.data))
        .catch(() => 
         showMessage({title:"取得に失敗しました", status:"error"})
        ).finally(() => setLoading(false));
    },[]);
    return { getUsers, loading, cats }
}