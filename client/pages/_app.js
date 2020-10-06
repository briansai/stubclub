import buildClient from '../api/buildClient';
import Navigation from '../components/navigation';
import '../scss/pages/_app.scss';

const AppComponent = ({ Component, pageProps, currentUser, admin }) => (
  <div className="main">
    <Navigation currentUser={currentUser} />
    <Component currentUser={currentUser} admin={admin} {...pageProps} />
  </div>
);

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser,
      data.admin
    );
  }

  return {
    pageProps,
    ...data
  };
};

export default AppComponent;
