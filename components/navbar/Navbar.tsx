"use client";
import { useAuth } from "@/lib/store/auth-context";
import { ImStatsBars } from "react-icons/im";
import Image from "next/image";

const Navbar: React.FC = () => {
  const { user, loading, logout } = useAuth();

  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {user && !loading && (
          <div className="flex items-center gap-2">
            <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
              <Image
                src={user.photoURL || "/user.png"}
                alt={user.displayName || "User"}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <small>Hi, {user.displayName}!</small>
          </div>
        )}
        {user && !loading && (
          <nav className="flex items-center gap-4">
            <div>
              <a href="#stats">
                <ImStatsBars className="text-2xl" />
              </a>
            </div>
            <div>
              <button onClick={logout} className="btn btn-danger">
                Sign out
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
