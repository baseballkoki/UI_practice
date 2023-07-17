import { memo, ReactNode } from "react";
import { Box, Stack, Wrap, WrapItem, Image, Text } from "@chakra-ui/react";

type Props = {
    id: number;
    imageUrl:string;
    userName:string;
    fullName:string,
    onClick: (id :number) => void;
}

export const UserCard = memo((props:Props) => {
    const { id, imageUrl, userName, fullName, onClick} = props;
    return (
        <Box 
        w="260px" 
        h="260px" 
        bg="white" 
        borderRadius="10px" 
        shadow="md" 
        p={4} _hover={{cursor: "pointer" ,opacity: 0.8}}
        onClick={() => onClick(id)}
        >
            <Stack textAlign="center">
                <Image borderRadius="full"
                    alt="プロフィール画像"
                    m="auto"
                    boxSize="160px" src={imageUrl} />
                <Text fontSize="lg" fontWeight="bold">{userName}</Text>
                <Text fontSize="sm" fontWeight="bold">{fullName}</Text>
            </Stack>
        </Box>
    )
});