import { useEffect } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Footer from '../ui/Footer';
import Header from '../ui/Header';
import LoadingPage from '../ui/LoadingPage';

function Root() {
  const { state } = useNavigation();
  const { pathname } = useLocation();

  // 🔹 State to control initial loading

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 🔹 Show loading for initial 3s, or during route loading
  if (state === 'loading') {
    return <LoadingPage />;
  }

  return (
    <div>
      <header>
        <Header />
      </header>

      <main className="min-h-screen">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Root;
