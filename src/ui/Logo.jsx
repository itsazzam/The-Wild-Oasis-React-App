import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { darkMode } = useDarkMode();

  const logoPath = darkMode
    ? "../../public/img/logo-dark.png"
    : "../../public/img/logo-light.png";

  return (
    <StyledLogo>
      <Img src={logoPath} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
