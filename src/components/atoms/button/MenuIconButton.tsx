import { memo } from "react";
import { IconButton } from "@chakra-ui/react";

type Props = {
    onOpen: () => void;
}

export const MenuIconButton = memo((props:Props) => {
    const { onOpen } = props;
    return (
        <IconButton aria-label="メニューボタン" size="sm" 
        display={{base:"block", md:"none"}}
        onClick={onOpen}
        />
    )
});