"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";

type User = {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  googleLoginHandler: () => Promise<void>;
  githubLoginHandler: () => Promise<void>;
  facebookLoginHandler: () => Promise<void>;
  emailLoginHandler: (email: string, password: string) => Promise<void>;
  emailRegisterHandler: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
  logout: () => void;
};

const authContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  googleLoginHandler: async () => {},
  githubLoginHandler: async () => {},
  facebookLoginHandler: async () => {},
  emailLoginHandler: async () => {},
  emailRegisterHandler: async () => {},
  logout: () => {},
});

type AuthContextProviderProps = {
  children: ReactNode;
};

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: FirebaseUser | null) => {
        if (user) {
          setUser({
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || null,
            photoURL: user.photoURL || null,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const socialSignIn = async (provider: any) => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error en inicio de sesión social:", error);
      throw error;
    }
  };

  const emailLoginHandler = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error en inicio de sesión con correo electrónico:", error);
      throw error;
    }
  };

  const emailRegisterHandler = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { displayName: username });
      }
    } catch (error) {
      console.error("Error en registro con correo electrónico:", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const values: AuthContextType = {
    user,
    loading,
    googleLoginHandler: () => socialSignIn(googleProvider),
    githubLoginHandler: () => socialSignIn(githubProvider),
    facebookLoginHandler: () => socialSignIn(facebookProvider),
    emailLoginHandler,
    emailRegisterHandler,
    logout,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
