import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginSuccess() {
 const navigate = useNavigate();

useEffect(() => { 
  const token = new URLSearchParams(window.location.search).get("token");

  if (token) {
    localStorage.setItem("token", token);
    navigate("/home");
  }else {
      navigate("/login"); 
    }
}, []);


  return <h2>✅ Login réussi</h2>;
}
