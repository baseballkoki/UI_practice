import { Box, Button, Divider, Flex, Heading,Input,Stack } from "@chakra-ui/react";
import { ChangeEvent, memo, useState } from "react";
import { PrimatyButton } from "../atoms/button/PrimatyButton";
import { useAuth } from "../../hooks/useAuth";

export const Login = memo(() => {
    const {login , loading} = useAuth();
    const [userId, setUserId] =useState("");
    const onChangeUserId = (e:ChangeEvent<HTMLInputElement>) => setUserId(e.target.value);

    const onClickLogin = () => login(userId);

    return (
        <Flex align="center" justify="center" height="100vh">
            <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
               <Heading as="h1" size="lg" textAlign="center">ユーザ管理アプリ</Heading>
               <Divider my={8}/>
               <Stack spacing={4} py={4} px={10}>
               <Input placeholder="ユーザID" value={userId} onChange={onChangeUserId}/>
               <PrimatyButton disabled={userId === ""} loading={loading} onClick={onClickLogin}>ログイン</PrimatyButton>
               </Stack>
            </Box>
        </Flex>
    );
    
});