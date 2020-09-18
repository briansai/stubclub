import Link from 'next/link';

const Navigation = ({ currentUser }) => {
  const links = [
    {
      label: 'StubClub',
      href: '/',
      classname: `navbar-list-brand`
    },
    !currentUser && {
      label: 'Sign Up',
      href: '/auth/signup',
      classname: 'navbar-list-item'
    },
    !currentUser && {
      label: 'Sign In',
      href: '/auth/signin',
      classname: 'navbar-list-item'
    },
    currentUser && {
      label: 'Sell Tickets',
      href: '/tickets/new',
      classname: 'navbar-list-item'
    },
    currentUser && {
      label: 'My Orders',
      href: '/orders',
      classname: 'navbar-list-item'
    },
    currentUser && {
      label: 'Sign Out',
      href: '/auth/signout',
      classname: 'navbar-list-item'
    }
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href, classname }) => (
      <Link key={href} href={href}>
        <li className={classname}>
          <a className="navbar-list-brand-label">{label}</a>
        </li>
      </Link>
    ));

  return (
    <div className="navbar">
      <ul className="navbar-list">{links}</ul>
    </div>
  );
};

export default Navigation;
