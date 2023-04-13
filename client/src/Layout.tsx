import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  return (
    <section className="h-screen flex flex-col relative">
      <Header />
      <Outlet />
      <footer>Footer</footer>
    </section>
  );
};

export default Layout;
