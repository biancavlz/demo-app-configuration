import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import ErrorBoundary from "./ErrorBoundary";

function ProblemChild(): ReactNode {
  throw new Error("Boom");
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  it("renders a fallback UI and logs the error when a child throws", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Boom")).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith(
      "Unhandled error caught by ErrorBoundary:",
      expect.any(Error),
      expect.anything(),
    );
  });

  it("resets and re-renders children when 'Try again' is clicked", async () => {
    const user = userEvent.setup();
    let shouldThrow = true;

    function MaybeThrow() {
      if (shouldThrow) {
        throw new Error("Boom");
      }
      return <p>Recovered</p>;
    }

    render(
      <ErrorBoundary>
        <MaybeThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    shouldThrow = false;
    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(screen.getByText("Recovered")).toBeInTheDocument();
  });

  it("falls back to a generic message when the thrown value has no message", () => {
    function ThrowNonError(): ReactNode {
      throw 42;
    }

    render(
      <ErrorBoundary>
        <ThrowNonError />
      </ErrorBoundary>,
    );

    expect(
      screen.getByText("An unexpected error occurred."),
    ).toBeInTheDocument();
  });

  it("reloads the page when 'Reload page' is clicked", async () => {
    const user = userEvent.setup();
    const reloadMock = vi.fn();
    vi.stubGlobal("location", { ...window.location, reload: reloadMock });

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    await user.click(screen.getByRole("button", { name: "Reload page" }));

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
