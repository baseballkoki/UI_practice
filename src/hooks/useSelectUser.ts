import { useCallback, useState } from "react";
import { User } from "../components/types/api/user";

type Props = {
    id:number;
    users: Array<User>
    onOpen: () => void;
}

//選択したユーザ情報を特定しモーダルを表示する
export const useSelectUser = () => {
    const [selectedUser , setSelectedUser] = useState<User | null>(null);

    const onSelectUser = (props:Props) => {
        const { id, users, onOpen } = props;
        const targetUser = users.find((users) => users.id === id)
        setSelectedUser(targetUser!);
        onOpen();
    }

    return { onSelectUser,  selectedUser}
}