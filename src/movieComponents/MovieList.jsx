import React from "react";
function MoviesList(props) {
    //original movies array(object) contain all movies
    let [movies, setMovies] = React.useState("");

    //for input box/filtering movies
    let [value, setValue] = React.useState("");
    function changeValue(e) {
      let input = e.target.value;
      //  console.log(input)
      setValue(input);
    }

    //add dslike option 
    let [favourite, setFavourite] = React.useState([]);

    function deleteFavHandler(MovId){
      let filteredFavorite =
      favourite.filter((movieObj) => {
          return movieObj.id != MovId;
      })

      setFavourite(filteredFavorite);
    }

    function addFavHandler(MovId){
       let newFavArr = [...favourite];

       for(let i = 0; i < movies.length; i++){
           let MovObj = movies[i];
           if(MovObj.id == MovId){
              newFavArr.push(MovObj);
              break;
           }
       }

       setFavourite(newFavArr);
    }

    //checks in favourite array that movObj is present or not 
    function checkFavHandler(MovId){
        for(let i = 0; i < favourite.length; i++){
            if(favourite[i].id == MovId){
              return true;
            }
        }

        return false;
    }

    //NOTE : react.useeffect mai asynch function seedha nhi dalna , usko normal function me cover kro
    React.useEffect(function fn() {
      async function fetchData() {
        let response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=e63af17cae04b6fc62e1737331fb7b80&page=" + props.PageNo);
        let data = await response.json();

        setMovies(data.results);
      }

      fetchData();

    }, [props.PageNo]);

    function filterLogic(searchText, moviesArr) {
      let ansArr = [];

      for (let i = 0; i < moviesArr.length; i++) {
        let movieName = moviesArr[i].original_title;
        let movie = movieName.toUpperCase();
        let text = searchText.toUpperCase();

        let contains = movie.includes(text);

        if (contains) {
          ansArr.push(moviesArr[i]); //push movie object
        }
      }

      return ansArr;
    }

  let searchMovies = filterLogic(value, movies);
  return (<div>
    <h2>Trending Movies</h2>
    <input onChange={changeValue} value={value}></input>
    {movies == "" ? <h1>Loading</h1> :

      <div className="trending_div">
        {
          //searchMovies pe map lgaya -> to only show filtered movies | if input empty -> show all movies 
          //IMP : why not update state of original movie arr after filtering ?-> notes
          searchMovies.map((MovObj, idx) => {
            return (<div className="movie_panel" key={idx}>
              <div className="text">{MovObj.title}</div>
              <img src={"https://image.tmdb.org/t/p/original/" + MovObj.poster_path} className="movie_poster" />

              {
                checkFavHandler(MovObj.id) == true ? 
                //onclick me function me parameter pass nhi kr sakte -> so ek dummy arrow function me real fn ko wrap kia
                <div onClick={()=>{deleteFavHandler(MovObj.id)}}>
                     <i class="fa fa-heart"></i>
                </div> : 
                
                <div onClick={()=>{addFavHandler(MovObj.id)}}>
                  <i class="fa fa-heart-o"></i>
                </div>
              }
              
             



            </div>)
          })
        }
      </div>}
    {/* <Pagination></Pagination> */}
  </div>)
}

export default MoviesList;