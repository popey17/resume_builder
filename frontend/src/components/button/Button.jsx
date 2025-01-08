import { Link } from 'react-router-dom';

const Button = ({ children, className, href, link, type, onClick }) => {
  if (link) {
    return (
      <Link to={href} className={`bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover flex justify-center w-fit mx-auto ${className}`}>
        {children}
      </Link>
    );
  } else {
    return (
      <button type={type} className={`bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover flex justify-center ${className}`} onClick={onClick}>
        {children}
      </button>
    );
  }
};

export default Button;