import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getPeopleDetail } from "../services";

function PeopleDetail() {
  const param = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeopleDetail(param.id).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <div>
          <h3>
            Details{" "}
            <NavLink to={"/peoples"}>
              <button style={{ marginLeft: 40 }}>Back</button>
            </NavLink>
          </h3>
          <table style={{ width: "100%" }}>
            <tr>
              <th>Name:</th>
              <td>{data?.name}</td>
            </tr>
            <tr>
              <th>Gender: </th>
              <td>{data?.gender}</td>
            </tr>
            <tr>
              <th>Height: </th>
              <td>{data?.height}</td>
            </tr>
            <tr>
              <th> Mass: </th>
              <td>{data?.mass}</td>
            </tr>
            <tr>
              <th> Skin Color:</th>
              <td> {data?.skin_color}</td>
            </tr>
            <tr>
              <th> Eye Color: </th>
              <td>{data?.eye_color}</td>
            </tr>
          </table>
          <h3>Movies:</h3>
          {data?.films &&
            data?.films.map((item, index) => <p key={index}>{item}</p>)}
        </div>
      )}
    </>
  );
}

export default PeopleDetail;
