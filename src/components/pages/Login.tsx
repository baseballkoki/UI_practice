import { Box, Button, Divider, Flex, Heading,Input,Stack } from "@chakra-ui/react";
import { ChangeEvent, memo, useState } from "react";
import { PrimatyButton } from "../atoms/button/PrimatyButton";
import { useAuth } from "../../hooks/useAuth";
import nyanko1 from "../../image/nyanko2.png"

export const Login = memo(() => {
    const {login , loading} = useAuth();
    const [userId, setUserId] =useState("");
    const onChangeUserId = (e:ChangeEvent<HTMLInputElement>) => setUserId(e.target.value);

    //const onClickLogin = () => login(userId); デフォルトのやつ一旦コメントアウト
    const onClickLogin = () => login("1");

    return (
        <div style={{ backgroundImage: `url(${nyanko1})`, backgroundSize: "cover", }}>
        <Flex align="center" justify="center" height="100vh">
            <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md" opacity={0.9}>
               <Heading as="h1" size="lg" textAlign="center">猫ちゃんAI性格診断</Heading>
               <Divider my={8}/>
               <Stack spacing={4} py={4} px={10}>
               {/* <Input placeholder="ユーザID" value={"下のボタンを押してね"} onChange={onChangeUserId} disabled={true}/> */}
               <PrimatyButton  loading={loading} onClick={onClickLogin}>開始</PrimatyButton>
               </Stack>
            </Box>
        </Flex>
        </div>
    );
    
});