import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import Footer from './components/Footer';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <MyNavbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}