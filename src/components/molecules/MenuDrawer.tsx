import { memo } from "react";
import { Button,Box, Drawer, DrawerBody, DrawerOverlay,  DrawerContent } from "@chakra-ui/react";

type Props = {
    onClose:() => void;
    isOpen: boolean;
    onClickHome: () => void;
    onClickUserManagement: () => void;
    onClickSetting: () => void;
}

export const MenuDrawer = memo((props:Props) => {

    const { 
        onClose , 
        isOpen,
        onClickHome,
        onClickUserManagement,
        onClickSetting
         } = props;

    return (
        <Drawer placement="left" size="xs" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay>
            <DrawerContent>
            <DrawerBody p={0} bg="gray.100" >
                <Button w="100%" onClick={onClickHome}>トップ</Button>
                <Button w="100%" onClick={onClickUserManagement}>性格タイプ</Button>
                <Button w="100%" onClick={onClickSetting}>問い合わせ</Button>
            </DrawerBody>
            </DrawerContent>
        </DrawerOverlay>
       </Drawer>       
    )
});