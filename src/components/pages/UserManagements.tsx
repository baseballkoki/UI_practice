import { Box, Modal, ModalHeader, Input, Stack, Wrap, WrapItem, Image, Text,Spinner,Center, ModalOverlay, ModalContent, useDisclosure, ModalCloseButton, ModalBody, FormControl, FormLabel } from "@chakra-ui/react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers"
import { useSelectUser } from "../../hooks/useSelectUser"
import { useEffect } from "react";
import { UserDetailModal } from "../organisms/user/UserDetailModal"
import { useLoginUser } from "../../hooks/useLoginUser";
import nyanko4 from "../../image/nyanko4.jpg"


export const UserManagements = () => {

    const { isOpen, onOpen, onClose} = useDisclosure()
    const { getUsers, cats, loading } = useAllUsers();
    const { onSelectUser, selectedUser } = useSelectUser();
    const { loginUser } = useLoginUser();
    console.log(loginUser)


    useEffect(() => getUsers ,[])

    const onClickUser = (id: number) => {
        onSelectUser({ id, cats, onOpen })
        onOpen()
    }

    return (
        <>
        {loading ? ( 
        <Center h="100vh">
        <Spinner /> 
        </Center>
        ): (
        <Wrap p={{base:4, md: 10}}>
            {cats.map((cat) => (
            <WrapItem key={cat.id} mx="auto">
                <UserCard 
                id={cat.id}
                imageUrl={nyanko4}
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