/* eslint-disable  */

import { render, screen } from "@/__tests__/test-utils";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { UserRole } from "@/types/user";
import { es } from "date-fns/locale";

// Mock the UserContext hook instead of using the context directly
jest.mock("@/context/UserContext", () => ({
  useUser: jest.fn(),
}));

const mockUseUser = require("@/context/UserContext").useUser;

describe("RoleGuard", () => {
  const TestComponent = () => <div>Protected Content</div>;
  const FallbackComponent = () => <div>Access Denied</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children when user has allowed role", () => {
    mockUseUser.mockReturnValue({
      user: { id: 1, name: "John Doe", user_type: "admin" as UserRole },
      isAuthenticated: true,
    });

    render(
      <RoleGuard allowedRoles={["admin", "host"]}>
        <TestComponent />
      </RoleGuard>,
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("renders fallback when user does not have allowed role", () => {
    mockUseUser.mockReturnValue({
      user: { id: 1, name: "John Doe", user_type: "player" as UserRole },
      isAuthenticated: true,
    });

    render(
      <RoleGuard
        allowedRoles={["admin", "host"]}
        fallback={<FallbackComponent />}
      >
        <TestComponent />
      </RoleGuard>,
    );

    expect(screen.getByText("Access Denied")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("renders fallback when user is not authenticated", () => {
    mockUseUser.mockReturnValue({
      user: null,
      isAuthenticated: false,
    });

    render(
      <RoleGuard allowedRoles={["admin"]} fallback={<FallbackComponent />}>
        <TestComponent />
      </RoleGuard>,
    );

    expect(screen.getByText("Access Denied")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("renders children when user is not in forbidden roles", () => {
    mockUseUser.mockReturnValue({
      user: { id: 1, name: "John Doe", user_type: "player" as UserRole },
      isAuthenticated: true,
    });

    render(
      <RoleGuard forbiddenRoles={["admin"]}>
        <TestComponent />
      </RoleGuard>,
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("renders fallback when user has forbidden role", () => {
    mockUseUser.mockReturnValue({
      user: { id: 1, name: "John Doe", user_type: "admin" as UserRole },
      isAuthenticated: true,
    });

    render(
      <RoleGuard forbiddenRoles={["admin"]} fallback={<FallbackComponent />}>
        <TestComponent />
      </RoleGuard>,
    );

    expect(screen.getByText("Access Denied")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("renders null fallback by default", () => {
    mockUseUser.mockReturnValue({
      user: null,
      isAuthenticated: false,
    });

    render(
      <RoleGuard allowedRoles={["admin"]}>
        <TestComponent />
      </RoleGuard>,
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    expect(screen.queryByText("Access Denied")).not.toBeInTheDocument();
  });

  it("works with both allowed and forbidden roles", () => {
    mockUseUser.mockReturnValue({
      user: { id: 1, name: "John Doe", user_type: "host" as UserRole },
      isAuthenticated: true,
    });

    render(
      <RoleGuard allowedRoles={["admin", "host"]} forbiddenRoles={["player"]}>
        <TestComponent />
      </RoleGuard>,
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
/* eslint-enable  */
