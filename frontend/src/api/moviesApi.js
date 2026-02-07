import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


export const getMovies = async (
  search = "",
  sort = "",
  page = 1
) => {

  let params = {
    page,
  };


  if (search) {
    params.search = search;
  }


  if (sort) {

    const orderMap = {
      name: "asc",
      rating: "desc",
      releaseDate: "desc",
      duration: "desc",
    };

    params.sortBy = sort;
    params.order = orderMap[sort] || "asc";
  }


  const res = await axios.get(
    `${API}/movies`,
    { params }
  );

  return res.data;
};
