import { Link } from 'react-router-dom';

const Button = ({ children, className, href, link }) => {
  if (link) {
    return (
      <Link to={href} className={`bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover inline-block ${className}`}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={`bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover inline-block ${className}`}>
        {children}
      </button>
    );
  }
};

export default Button;