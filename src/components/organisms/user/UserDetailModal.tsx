import { Box, Modal, ModalHeader, Input, Stack, Wrap, WrapItem, Image, Text,Spinner,Center, ModalOverlay, ModalContent, useDisclosure, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter } from "@chakra-ui/react";
import { ChangeEvent, memo, ReactNode, useEffect, useState } from "react";
import { PrimatyButton } from "../../atoms/button/PrimatyButton";
import { User } from "../../types/api/user"

type Props = {
   user: User | null
   isOpen: boolean;
   isAdmin?: boolean;
   onClose: () => void;
}

export const UserDetailModal = memo((props:Props) => {

    const { user, isOpen, isAdmin=false, onClose} = props;

    const onClickUpdate = () => alert("追加実装");

    const [username, setUsername] = useState(user?.username);
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);

    useEffect(() => {
        setUsername(user?.username ?? '')
        setUsername(user?.name ?? '')
        setUsername(user?.email ?? '')
    }, [user]);

    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
      setUsername(e.target.value);
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
      setName(e.target.value);
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
      setEmail(e.target.value);

      console.log("name"+name);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent pb={6}>
                <ModalHeader>ユーザー詳細</ModalHeader>
                <ModalCloseButton />
                <ModalBody mx={4}>
                    <Stack spacing={4}>
                       <FormControl>
                        <FormLabel>名前</FormLabel>
                        <Input value={username} onChange={onChangeUserName}  isReadOnly={!isAdmin} />
                       </FormControl>
                       <FormControl>
                        <FormLabel>フルネーム</FormLabel>
                        <Input value={user?.name} onChange={onChangeName} isReadOnly={!isAdmin} />
                       </FormControl>
                       <FormControl>
                        <FormLabel>メールアドレス</FormLabel>
                        <Input value={user?.email} onChange={onChangeEmail} isReadOnly={!isAdmin} />
                       </FormControl>
                       <FormControl>
                        <FormLabel>電話番号</FormLabel>
                        <Input value={user?.phone} isReadOnly={!isAdmin} />
                       </FormControl>
                    </Stack>
                </ModalBody>
                {isAdmin && (
                <ModalFooter>
                  <PrimatyButton onClick={onClickUpdate}>更新</PrimatyButton>
                </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    )
    
});