import { getErrorMessage, type FallbackProps } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div
        role="alert"
        className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-xl"
      >
        <h1 className="text-xl font-semibold text-gray-900">
          Something went wrong
        </h1>
        <p className="mt-3 text-gray-600">
          {getErrorMessage(error) ?? "An unexpected error occurred."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={resetErrorBoundary}
            className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Reload page
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
