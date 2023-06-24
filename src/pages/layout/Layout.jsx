import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, NavLink } from "react-router-dom";
import Candidate from "../candidate/Candidate";
import '../../stylesheets/Nav.css'

const Layout = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <nav className="nav">
        <NavLink className="" to="/">
          Home
        </NavLink>
        <NavLink className="" to="/add-candidate">
          {" "}
          AddCandidates
        </NavLink>
        <NavLink className="" to="/candidates">
          {" "}
          Candidates
        </NavLink>
        <NavLink className="" to="/offers">
          {" "}
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

export default Layout;
