import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import '../../stylesheets/Nav.css'

const Layout = () => {

  const [activeLink, setActiveLink] = useState('');

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  }

  const queryClient = new QueryClient();
  return (
    <>
      <nav className="nav">
      <NavLink
        className={`home ${activeLink === 'false' ? 'active' : ''}`}
        to="/"
        onClick={() => handleNavLinkClick('home')}
      >
        Home
      </NavLink>
      <NavLink
        className={`add ${activeLink === 'add' ? 'active' : ''}`}
        to="/add-candidate"
        onClick={() => handleNavLinkClick('add')}
      >
        Add Candidates
      </NavLink>
      <NavLink
        className={`candidate ${activeLink === 'candidate' ? 'active' : ''}`}
        to="/candidates"
        onClick={() => handleNavLinkClick('candidate')}
      >
        Candidates
      </NavLink>
      <NavLink
        className={`oferta ${activeLink === 'oferta' ? 'active' : ''}`}
        to="/offers"
        onClick={() => handleNavLinkClick('oferta')}
      >
        Offers
      </NavLink>
    </nav>

      <main>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </main>
    </>
  );
};

export default Layout;