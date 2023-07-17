import { Box, Modal, ModalHeader, Input, Stack, Wrap, WrapItem, Image, Text,Spinner,Center, ModalOverlay, ModalContent, useDisclosure, ModalCloseButton, ModalBody, FormControl, FormLabel } from "@chakra-ui/react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers"
import { useSelectUser } from "../../hooks/useSelectUser"
import { useEffect } from "react";
import { UserDetailModal } from "../organisms/user/UserDetailModal"
import { useLoginUser } from "../../hooks/useLoginUser";


export const UserManagements = () => {

    const { isOpen, onOpen, onClose} = useDisclosure()
    const { getUsers, users, loading } = useAllUsers();
    const { onSelectUser, selectedUser } = useSelectUser();
    const { loginUser } = useLoginUser();
    console.log(loginUser)


    useEffect(() => getUsers ,[])

    const onClickUser = (id: number) => {
        onSelectUser({ id, users, onOpen })
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
            {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
                <UserCard 
                id={user.id}
                imageUrl="https://source.unsplash.com/random" 
                userName={user.username} 
                fullName={user.name}
                onClick = {onClickUser}
                />
            </WrapItem>
            ))}
        </Wrap>
        )}
           <UserDetailModal user={selectedUser} isOpen={isOpen} isAdmin={loginUser?.isAdmin} onClose={onClose}/>
        </>
    )
};