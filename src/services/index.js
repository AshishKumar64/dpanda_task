import axios from "axios";

const baseUrl = "https://swapi.dev/api/people/";

export async function getPeopleList(url) {
  const res = await axios.get(url);
  return res;
}

export async function getPeopleDetail(id) {
  const res = await axios.get(`${baseUrl}${id}`);
  return res;
}
