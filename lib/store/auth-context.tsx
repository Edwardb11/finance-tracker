"use client";
import { createContext, ReactNode, useContext } from "react";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

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
  logout: () => void;
};

const authContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  githubLoginHandler: async () => {},
  facebookLoginHandler: async () => {},
  logout: () => {},
});

type AuthContextProviderProps = {
  children: ReactNode;
};

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, loading] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      throw error;
    }
  };

  const githubLoginHandler = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      throw error;
    }
  };

  const facebookLoginHandler = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const currentUser: User | null = user
    ? {
        uid: user.uid,
        email: user.email || "",
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
    : null;

  const values: AuthContextType = {
    user: currentUser,
    loading,
    googleLoginHandler,
    githubLoginHandler,
    facebookLoginHandler,
    logout,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
