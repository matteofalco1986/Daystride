import { useNavigate } from "react-router-dom";
import "./UnauthorizedAccess.css";
export const UnauthorizedAccess = () => {
  const navigate = useNavigate();
    return (
    <>
      <h3 className="text-center mt-5">
        Per accedere devi prima fare il login
      </h3>
      <div className="d-flex justify-content-center">
        <h2
          className="mt-5 text-center go-to-login"
          onClick={() => {
            navigate("/login");
          }}
        >
          VAI ALLA PAGINA DI LOGIN
        </h2>
      </div>
    </>
  );
};
