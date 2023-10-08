import { useCallback, useState } from "react";
import { cat } from "../components/types/api/cat";
import { User } from "../components/types/api/user";

type Props = {
    id:number;
    cats: Array<cat>
    onOpen: () => void;
}

//選択したユーザ情報を特定しモーダルを表示する
export const useSelectUser = () => {
    const [selectedUser , setSelectedUser] = useState<cat | null>(null);

    const onSelectUser = (props:Props) => {
        const { id, cats, onOpen } = props;
        const targetCat = cats.find((cats) => cats.id === id)
        setSelectedUser(targetCat!);
        onOpen();
    }

    return { onSelectUser,  selectedUser}
}