import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export default function Select({ options, ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(value) {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  }

  const currentSort = searchParams.get("sort") || options[0].value;

  return (
    <StyledSelect
      value={currentSort}
      onChange={(e) => handleChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} {...props}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
