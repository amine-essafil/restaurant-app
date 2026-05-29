import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, searchParams]);

  return <h2>✅ Login réussi</h2>;
}