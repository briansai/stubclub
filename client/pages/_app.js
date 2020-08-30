import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Navigation from '../components/navigation';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Navigation currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data
  };
};

export default AppComponent;
