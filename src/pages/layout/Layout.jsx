import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, NavLink } from "react-router-dom";
import Candidate from "../candidate/Candidate";

const Layout = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <nav>
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
          Ofertas
        </NavLink>
        <NavLink className="" to="/add-skills">
          {" "}
          Habilidades
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
