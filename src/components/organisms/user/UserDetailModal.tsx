import { Box, Modal, ModalHeader, Input, Stack, Wrap, WrapItem, Image, Text,Spinner,Center, ModalOverlay, ModalContent, useDisclosure, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter } from "@chakra-ui/react";
import { ChangeEvent, memo, ReactNode, useEffect, useState } from "react";
import { PrimatyButton } from "../../atoms/button/PrimatyButton";
import { User } from "../../types/api/user"
import { cat } from "../../../components/types/api/cat";

type Props = {
   cat: cat | null
   isOpen: boolean;
   isAdmin?: boolean;
   onClose: () => void;
}

export const UserDetailModal = memo((props:Props) => {

    const { cat, isOpen, isAdmin=false, onClose} = props;

    const onClickUpdate = () => alert("追加実装");

    const [catname, setUsername] = useState(cat?.type);
    const [name, setName] = useState(cat?.text);
    

    useEffect(() => {
        setUsername(cat?.type ?? '')
        setUsername(cat?.text ?? '')
    }, [cat]);

    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
      setUsername(e.target.value);
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
      setName(e.target.value);

      //console.log("name"+name);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent pb={6}>
                <ModalHeader>性格情報</ModalHeader>
                <ModalCloseButton />
                <ModalBody mx={4}>
                    <Stack spacing={4}>
                       <FormControl>
                        <FormLabel>性格タイプ</FormLabel>
                        <Input value={catname} onChange={onChangeUserName}  isReadOnly={!isAdmin} />
                       </FormControl>
                       <FormControl>
                        <FormLabel>説明</FormLabel>
                        <Input value={cat?.text} onChange={onChangeName} isReadOnly={!isAdmin} />
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