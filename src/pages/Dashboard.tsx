import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "../auth/AuthService";

export default function Dashboard() {
    const [userEmail, setUserEmail] = useState<string>("");
  
    useEffect(() => {
      async function fetchUser() {
        const currentUser = await getCurrentUser();
        setUserEmail(currentUser?.email || "Unbekannter Benutzer");
      }
      fetchUser();
    }, []);
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Willkommen, {userEmail}!</h1>
        <button onClick={signOut} className="mt-4 bg-red-500 text-white p-2 rounded">
          Logout
        </button>
      </div>
    );
  }
  