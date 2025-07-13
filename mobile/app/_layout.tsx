import { Redirect, Slot } from "expo-router";
import { useAuth } from "../hooks/useAuth"; // your custom hook for checking login

export default function RootLayout() {
//   const { isLoggedIn, loading } = useAuth();

//   if (loading) return null; // or splash screen

//   if (!isLoggedIn) return <Redirect href="/(auth)/login" />;
  return <Slot />;
}
