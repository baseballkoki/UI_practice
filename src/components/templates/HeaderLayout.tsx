import { memo, ReactNode } from "react";
import { Header } from "../organisms/layout/Header";

type Props= {
    children: ReactNode;
}

export const HeaderLayput = (props:Props) => {
    const { children } = props;
    return (
      <>
        <Header />
        { children }
      </>
)};