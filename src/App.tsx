import { useQuery } from "@apollo/client";
import { GET_ALL_LIFTS } from "./queries";
import List from "./components/List";
import "./App.css";

const App = () => {
  const { data, loading, error } = useQuery(GET_ALL_LIFTS);

  console.log(data, loading, error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <List />
    </>
  );
};

export default App;
