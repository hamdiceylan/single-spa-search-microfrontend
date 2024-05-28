import rxjs from "rxjs";
import operators from "rxjs/operators";

jest.mock("@react-mf/styleguide", () => ({
  Button: ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));
