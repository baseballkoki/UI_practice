import { Box, Modal, ModalHeader, Input, Stack, Wrap, WrapItem, Image, Text,Spinner,Center, ModalOverlay, ModalContent, useDisclosure, ModalCloseButton, ModalBody, FormControl, FormLabel } from "@chakra-ui/react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers"
import { useSelectUser } from "../../hooks/useSelectUser"
import { useEffect } from "react";
import { UserDetailModal } from "../organisms/user/UserDetailModal"
import { useLoginUser } from "../../hooks/useLoginUser";


export const UserManagements = () => {

    const { isOpen, onOpen, onClose} = useDisclosure()
    const { getUsers, cats, loading } = useAllUsers();
    const { onSelectUser, selectedUser } = useSelectUser();
    const { loginUser } = useLoginUser();
    console.log(loginUser)


    useEffect(() => {
        getUsers(); // 関数を呼び出してAPIを叩く
      }, [getUsers]); // getUsersを依存配列に含める

    const onClickUser = (id: number) => {
        onSelectUser({ id, cats, onOpen })
        onOpen()
    }

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * 20) + 1; // 1から20までの数を生成
        return `/image/nyanko${randomIndex}.jpg`; // publicディレクトリのパスを直接使う
    };

    return (
        <>
        <h2>{loading}</h2>
        {loading ? ( 
        <Center h="100vh">
        <Spinner /> 
        </Center>
        ): (
        <Wrap p={{base:4, md: 10}}>
            {cats.map((cat, index) => (
            <WrapItem key={cat.id} mx="auto">
                <UserCard 
                id={cat.id}
                imageUrl={`/image/nyanko${index + 1}.jpg`}
                userName={cat.type} 
                fullName={cat.text}
                onClick = {onClickUser}
                />
            </WrapItem>
            ))}
        </Wrap>
        )}
           <UserDetailModal cat={selectedUser} isOpen={isOpen} isAdmin={loginUser?.isAdmin} onClose={onClose}/>
        </>
    )
};