import { Link } from 'react-router-dom'

const LinkBtn = ({href, children , className}) => {
  return (
    <Link to={href} className={`hover:opacity-50 ${className}`}>
      {children}
    </Link>
  )
}

export default LinkBtn