import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { debounce } from "../utils/debounce";

function PeopleList({ list, getPeople }) {
  const favList = JSON.parse(localStorage.getItem("favourite")) ?? [];
  const [favouriteList, setFavouriteList] = useState(favList);
  const [input, setInput] = useState("");
  const [peoples, setPeoples] = useState(list?.results);

  useEffect(() => {
    localStorage.setItem("favourite", JSON.stringify(favouriteList));
  }, [favouriteList]);

  function setFavourite(url) {
    const index = isFavourite(url);
    if (index > -1) {
      const newArr = favouriteList.filter((val) => val !== url);
      setFavouriteList(newArr);
    } else {
      setFavouriteList([...favouriteList, url]);
    }
  }

  const isFavourite = (url) => {
    return favouriteList?.indexOf(url);
  };

  const filterData = (value) => {
    setInput(value);
    if (value.length) {
      const filteredData = list.results.filter((val) =>
        val?.name?.toLowerCase().includes(value?.toLowerCase())
      );
      setPeoples(filteredData);
    } else {
      setPeoples(list?.results);
    }
  };

  const searchData = useCallback(debounce(filterData), []);

  return (
    <>
      <button
        onClick={() => getPeople("prev")}
        disabled={list?.previous ? false : true}
      >
        Previous
      </button>
      <div>
        <input
          value={input}
          onChange={(e) => searchData(e.target.value)}
          placeholder="Search"
        />
        {peoples?.map((people, idx) => (
          <div className="card" key={people.url}>
            <i
              className="fa fa-star"
              style={{
                color: isFavourite(people.url) > -1 ? "#2076bb" : "#fff",
              }}
              onClick={() => setFavourite(people?.url)}
            ></i>
            {people.name}
            <NavLink to={`/peoples/${people?.url?.slice(-2)}`}>
              <i
                className="fa fa-chevron-circle-right"
                aria-hidden="true"
                style={{ color: "blueviolet" }}
              ></i>
            </NavLink>
          </div>
        ))}
      </div>
      <button
        onClick={() => getPeople("next")}
        disabled={list?.next ? false : true}
      >
        Next
      </button>
    </>
  );
}

export default PeopleList;
