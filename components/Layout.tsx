import Navbar from './Navbar'
import { FC } from "react";

const Layout: FC<{children: React.ReactNode}> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

export default Layout;