import { Link, useLocation} from "react-router-dom";
import type {  LinkProps} from "react-router-dom";


interface SmartLinkTypes extends LinkProps {
    children: React.ReactNode;
}

const SmartLink: React.FC<SmartLinkTypes> = ({ to, children, ...rest }) => {
    const { pathname } = useLocation();


    const handleClick = () => {
        if (pathname === to) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <Link to={to} onClick={handleClick} {...rest}>
            {children}
        </Link>
    );
};

export default SmartLink;