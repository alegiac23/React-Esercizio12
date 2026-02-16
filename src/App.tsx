import "./App.css";
import { GithubUser } from "./GithubUser";
import { GithubUsers } from "./GithubUsers";

function App() {
  return (
    <>
      <h2>Data Fetching </h2>
      <GithubUser username="alegiac23" />
      <hr></hr>
      <GithubUsers />
    </>
  );
}

export default App;
