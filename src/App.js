import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { getPeopleList } from "./services";
import PeopleList from "./components/PeopleList";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PeopleDetail from "./components/PeopleDetail";

function App() {
  const baseUrl = "https://swapi.dev/api/people";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getPeoples(baseUrl);
  }, []);

  function getPaginatedData(type) {
    if (type === "next") {
      getPeoples(data?.next);
    } else if (type === "prev") {
      getPeoples(data?.previous);
    }
  }

  function getPeoples(url) {
    setLoading(true);
    getPeopleList(url).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }

  return (
    <BrowserRouter>
      <nav>Dpanda Assignment</nav>

      <div className="App">
        {loading ? (
          <>Loading....</>
        ) : (
          <Routes>
            <Route
              index
              path="/peoples"
              Component={() => (
                <PeopleList list={data} getPeople={getPaginatedData} />
              )}
            />
            <Route path="/peoples/:id" Component={() => <PeopleDetail />} />
            <Route
              path="*"
              element={<Navigate to="/peoples" replace={true} />}
            />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
