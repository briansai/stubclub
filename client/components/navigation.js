import Link from 'next/link';
import { Fragment } from 'react';

const Navigation = ({ currentUser }) => {
  const dropdown = [
    {
      text: 'My Tickets',
      href: '/tickets/',
      classname: 'navbar-dropdown-content-item'
    },
    {
      text: 'Sell Tickets',
      href: '/tickets/new',
      classname: 'navbar-dropdown-content-item'
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
      classname: 'navbar-dropdown',
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
            <Fragment>
              <li className={classname}>
                <div className="navbar-dropdown-label">{label}</div>
                <div className="navbar-dropdown-content">
                  {dropdown.map(({ text, href, classname, type }) => (
                    <Link href={href} type={type} key={text}>
                      <div className={classname}>
                        <a>{text}</a>
                      </div>
                    </Link>
                  ))}
                </div>
              </li>
            </Fragment>
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
