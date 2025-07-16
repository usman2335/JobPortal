import { NavLink } from "react-router-dom";

export function CandidateNavMenu() {
  const navItems = [
    { label: "Home", to: "/candidate" },
    { label: "Explore Jobs", to: "/candidate/find-jobs" },
    { label: "My Applications", to: "/candidate/applications" },
  ];

  return (
    <nav className="flex gap-4 py-3">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/candidate"}
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium rounded-md text-foreground ${
              isActive
                ? "shadow-md border text-foreground"
                : "text-foreground hover:bg-accent"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
