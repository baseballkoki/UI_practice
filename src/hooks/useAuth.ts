import { useCallback,useState } from "react"
import axios from "axios";
import { User } from "../components/types/api/user";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useLoginUser } from "../hooks/useLoginUser"

export const useAuth = () => {
    const navigate = useNavigate();
    const onClickHome = useCallback(() => navigate("/home"), [navigate]);
    const { setloginUser } = useLoginUser();


    const [loading ,setLoading] = useState(false);
    const { showMessage } = useMessage();

    const login = useCallback((id: string) => {
        setLoading(true);
        axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
            if (res.data) {
                const isAdmin = res.data.id === 10 ? true : false;
                setloginUser({...res.data, isAdmin});
                showMessage({title:"正常起動を確認しました", status:"success"});
                onClickHome();
            } else {
                showMessage({title:"起動に失敗しました", status:"error"});
                setLoading(false);
            }
        }).catch(() => {showMessage({title:"起動に失敗しました", status:"error"})
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }, [navigate]);
    return { login,loading }
}