import { type FC, ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Backdrop from "./backdrop/Backdrop";
import scss from "./Layout.module.scss";

interface ILayoutProps {
  children: ReactNode;
}

// Login lives in community-service, on its own origin.
const LOGIN_HREF = `${process.env.SERVICE_URL ?? ""}/login`;

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={scss.Layout}>
      <Backdrop />
      <Header />
      <main>{children}</main>
      <Footer loginHref={LOGIN_HREF} />
    </div>
  );
};

export default Layout;
