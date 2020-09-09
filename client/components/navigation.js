import Link from 'next/link';

const Navigation = ({ currentUser }) => {
  const links = [
    !currentUser && {
      label: 'Sign Up',
      href: '/auth/signup',
      classname: 'navbar-item'
    },
    !currentUser && {
      label: 'Sign In',
      href: '/auth/signin',
      classname: 'navbar-item'
    },
    currentUser && { label: 'StubClub', href: '/', classname: 'navbar-brand' },
    currentUser && {
      label: 'Sell Tickets',
      href: '/tickets/new',
      classname: 'navbar-item'
    },
    currentUser && {
      label: 'My Orders',
      href: '/orders',
      classname: 'navbar-item'
    },
    currentUser && {
      label: 'Sign Out',
      href: '/auth/signout',
      classname: 'navbar-item'
    }
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href, classname }) => (
      <li key={href} className={classname}>
        <Link href={href}>
          <a className="nav-link">{label}</a>
        </Link>
      </li>
    ));

  return (
    <div className="navbar">
      <ul>{links}</ul>
    </div>
  );
};

export default Navigation;
