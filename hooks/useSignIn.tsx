import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const UseSignIn = async (
  authData: {},
  setIsLoading: any,
  setAlertState: any
) => {
  setIsLoading(true);
  setAlertState(["", ""]);

  try {
    // Load FingerprintJS and get the visitorId
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    // Include visitorId in the request headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        "User-Client": result.visitorId, // Custom header for visitorId
      },
    };

    // Perform the login request
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/auth/login/",
      authData,
      config
    );

    if (response.status === 200) {
      localStorage.setItem("a", response.data?.token);
      setAlertState(["Successfully logged in", "green"]);
      setTimeout(() => {
        open("/dashboard", "_self");
      }, 1500);
    } else if (response.status === 267) {
      setAlertState([response.data, "red"]);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  } catch (error) {
    setIsLoading(false);
    setAlertState(["Something went wrong, Try again later.", "red"]);
    console.error(error);
  }
};

export default UseSignIn;
