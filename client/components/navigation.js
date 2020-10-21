import Link from 'next/link';
import { Fragment } from 'react';

const Navigation = ({ currentUser }) => {
  const dropdown = [
    {
      label: 'Sell Tickets',
      href: '/tickets/new',
      classname: 'navbar-dropdown-item'
    }
  ];

  const links = [
    {
      label: 'StubClub',
      href: '/',
      classname: `navbar-list-brand`,
      type: 'list'
    },
    !currentUser && {
      label: 'Sign Up',
      href: '/auth/signup',
      classname: 'navbar-list-item',
      type: 'list'
    },
    !currentUser && {
      label: 'Sign In',
      href: '/auth/signin',
      classname: 'navbar-list-item',
      type: 'list'
    },
    currentUser && {
      label: 'Tickets',
      classname: 'navbar-dropdown-item',
      type: 'dropdown'
    },
    currentUser && {
      label: 'My Orders',
      href: '/orders',
      classname: 'navbar-list-item',
      type: 'list'
    },
    currentUser && {
      label: 'Sign Out',
      href: '/auth/signout',
      classname: 'navbar-list-item',
      type: 'list'
    }
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href, classname, type }) => {
      return (
        <Fragment key={label}>
          {type === 'list' ? (
            <Link href={href}>
              <li className={classname}>
                <a className="navbar-list-brand-label">{label}</a>
              </li>
            </Link>
          ) : (
            <li className={classname}>
              <a className="navbar-dropdown-label">{label}</a>
            </li>
          )}
        </Fragment>
      );
    });

  return (
    <div className="navbar">
      <ul className="navbar-list">{links}</ul>
    </div>
  );
};

export default Navigation;
