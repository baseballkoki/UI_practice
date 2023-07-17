import { memo, ReactNode } from "react";
import { IconButton, Button } from "@chakra-ui/react";

type Props = {
    children: ReactNode;
    disabled?: boolean;
    loading?: boolean;
    onClick: () => void;
}

export const PrimatyButton = memo((props:Props) => {
    const { children, disabled , loading , onClick } = props;
    return (
        <Button bg="teal.400" color="white" _hover={{ opacity: 0.8 }} 
        disabled={disabled} isLoading={loading} pointerEvents={disabled ? "none" : "auto"} onClick={onClick}>
            {children}
        </Button>
    )
});