import { useEffect, useRef } from "react";
import Routes from "./routes";
import { useClientAuth } from "./hooks/use-client-auth";
import { toast } from "sonner";
import { useDeviceNetworkHandler } from "./hooks/use-network";

function App() {
  const { fetchUser } = useClientAuth();

  useDeviceNetworkHandler();

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
