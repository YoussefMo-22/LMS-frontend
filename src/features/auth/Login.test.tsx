// src/pages/auth/Login.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./Login";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import toast from "react-hot-toast";

// 🔐 Mock lottie-react to avoid HTMLCanvasElement errors
vi.mock("lottie-react", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-lottie" />,
}));


// Mock useAuth and toast
vi.mock("./hooks/useAuth");
vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Helper to render with Router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Login", () => {
  const mockedLogin = vi.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockedLogin,
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders login form fields", () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByPlaceholderText("Enter Your Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Your Password")).toBeInTheDocument();
    expect(screen.getByTestId("main-login-btn")).toBeInTheDocument();
  });

  it("calls login function and shows success toast", async () => {
    mockedLogin.mockResolvedValue({ id: "user-id" });

    renderWithRouter(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter Your Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Your Password"), {
      target: { value: "Test@1234" },
    });

    fireEvent.click(screen.getByTestId("main-login-btn"));

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith("test@example.com", "Test@1234");
      expect(toast.success).toHaveBeenCalledWith("Login successful!");
    });
  });

  it("shows error toast on failed login", async () => {
    mockedLogin.mockResolvedValue(null);
    (useAuth as jest.Mock).mockReturnValue({
      login: mockedLogin,
      loading: false,
      error: "Invalid credentials",
    });

    renderWithRouter(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter Your Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Your Password"), {
      target: { value: "WrongPassword" },
    });

    fireEvent.click(screen.getByTestId("main-login-btn"));

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});
