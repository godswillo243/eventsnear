import { navLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const Navlist = () => {
  const { pathname } = useLocation();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {navLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-primary-500"
            } flex-center p-regular-16 whitespace-nowrap w-full hover:text-neutral-600 hover:text-shadow-2xs text-shadow-neutral-600/70 md:w-auto px-2`}
          >
            <Link to={link.route} className="w-full">
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navlist;
