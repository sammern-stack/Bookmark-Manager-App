import { useAuthStore } from "../../stores";
import "./Home.scss";

export default function Home() {
  const { logout } = useAuthStore();

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={async () => await logout()}>Log out</button>
    </>
  );
}
