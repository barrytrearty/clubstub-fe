import Cube from "./Cube";
import { useState, useEffect } from "react";

const CubeHome = () => {
  const [matches, setMatches] = useState([]);
  const apiUrl = "http://localhost:5000";

  const getMatches = async () => {
    try {
      let response = await fetch(`${apiUrl}/matches`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      let matchesRes = await response.json();
      console.log(matchesRes);
      setMatches(matchesRes.slice(0, 6));
      // setLoading(false);
      console.log(matches);
      return matchesRes;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <div>
      <Cube array={matches} />
    </div>
  );
};

export default CubeHome;
