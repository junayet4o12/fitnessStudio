import { useNavigate } from "react-router-dom";
import useAxiosFitbitAuthorize from "../../Hooks/useAxiosFitbitAuthorize";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const Fitbit = () => {
  const [decoded, setDecoded] = useState("");
  const navigate = useNavigate();
  const axiosFitbitAuthorize = useAxiosFitbitAuthorize();

  useEffect(() => {
    if (localStorage.getItem("Authorization")) {
      const decodedToken = jwtDecode(localStorage.getItem("Authorization"));
      setDecoded(decodedToken);
      console.log(decodedToken);
    }
    
  }, []);

  const handleAuthorize = async () => {
    const response = await axiosFitbitAuthorize?.get("/authorizeFitbit");
    const authUrl = response.data.auth;
    navigate(`//${authUrl}`);
  };

  return (
    <div className="lg:flex space-y-2 justify-between w-full lg:w-3/4 py-6 rounded-md shadow-lg px-4 text-gray-600 font-semibold bg-white">
      <div className="items-center flex gap-4">
        <img
          src="https://i.ibb.co/HBnFfJ9/62a896ebda9e7313e0262a77.png"
          className="h-8"
          alt=""
        />
        <p className="">Fitbit</p>
      </div>

      {decoded?.iss === "Fitbit" ? (
        <button
          disabled
          className="p-2 lg:p-3 text-sm lg:text-md rounded-md  bg-base-200 text-gray-300"
        >
          Connected
        </button>
      ) : (
        <button
          onClick={handleAuthorize}
          className="p-2 lg:p-3 text-sm lg:text-md rounded-md shadow-md bg-base-300"
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default Fitbit;
