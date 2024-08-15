import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import { useEffect } from "react";
import Spinner from "./Spinner";

const Fullpage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  // If the user is not authenticated, redirect to the login page

  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) navigate("/login");
    },
    [isLoading, isAuthenticated, navigate]
  );

  if (isLoading) {
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );
  }

  return children;
}

export default ProtectedRoute;
