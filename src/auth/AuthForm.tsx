import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, signIn } from "./AuthService";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 🚀 Navigation nach Login

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isSignUp) {
        await signUp(email, password);
        setMessage("Registrierung erfolgreich! Du kannst dich jetzt einloggen.");
      } else {
        await signIn(email, password);
        navigate("/dashboard"); // 🚀 Nach Login weiterleiten!
      }
    } catch (error) {
      setMessage((error as Error).message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">{isSignUp ? "Registrieren" : "Einloggen"}</h2>

      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded mb-4"/>
        <input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded mb-4"/>
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded">
          {loading ? "Lädt..." : isSignUp ? "Registrieren" : "Einloggen"}
        </button>
      </form>

      <button onClick={() => setIsSignUp(!isSignUp)} className="mt-4 text-blue-500">
        {isSignUp ? "Schon registriert? Hier einloggen." : "Noch keinen Account? Hier registrieren."}
      </button>
    </div>
  );
}
