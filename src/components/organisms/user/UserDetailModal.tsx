import { Box, Modal, ModalHeader, Input, Stack, Wrap, WrapItem, Image, Text,Spinner,Center, ModalOverlay, ModalContent, useDisclosure, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter } from "@chakra-ui/react";
import { ChangeEvent, memo, ReactNode, useEffect, useState } from "react";
import { PrimatyButton } from "../../atoms/button/PrimatyButton";
import { User } from "../../types/api/user"
import { cat } from "../../../components/types/api/cat";
import AdmaxAd from "../AdmaxAd";

type Props = {
  cat: cat | null;
  isOpen: boolean;
  isAdmin?: boolean;
  onClose: () => void;
};

export const UserDetailModal = memo((props: Props) => {
  const { cat, isOpen, isAdmin = false, onClose } = props;

  const onClickUpdate = () => alert("追加実装");

  const [catName, setCatName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setCatName(cat?.type ?? "");
    setDescription(cat?.text ?? "");
  }, [cat]);

  const onChangeCatName = (e: ChangeEvent<HTMLInputElement>) =>
    setCatName(e.target.value);
  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
      <AdmaxAd />
        <ModalHeader>性格情報</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            {isAdmin && (
              <>
                <FormControl>
                  <FormLabel>性格タイプ</FormLabel>
                  <Input
                    value={catName}
                    onChange={onChangeCatName}
                    isReadOnly={!isAdmin}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>説明</FormLabel>
                  <Input
                    value={description}
                    onChange={onChangeDescription}
                    isReadOnly={!isAdmin}
                  />
                </FormControl>
              </>
            )}
            {!isAdmin && (
              <Stack spacing={4}>
                <Text fontWeight="bold">性格タイプ: {catName}</Text>
                <Text>{description}</Text>
              </Stack>
            )}
          </Stack>
        </ModalBody>
        {isAdmin && (
          <ModalFooter>
            <PrimatyButton onClick={onClickUpdate}>更新</PrimatyButton>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
});