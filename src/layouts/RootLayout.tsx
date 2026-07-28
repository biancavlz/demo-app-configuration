import { NavLink, Outlet } from "react-router";

export default function RootLayout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-w bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">My Demo app</h1>

          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>

            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
