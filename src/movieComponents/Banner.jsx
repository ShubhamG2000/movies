import React from "react";
function Banner(){
    let [FirstMovie, setFirstMovie] = React.useState("");
    //NOTE : react.useeffect mai asynch function seedha nhi dalna , usko normal function me cover kro
    React.useEffect(function(){
      async function fetchData(){
        //use fetch to get data from api 
        let response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=e63af17cae04b6fc62e1737331fb7b80");
        let data = await response.json();
        console.log(data)
    
        let movies = data.results;
    
        setFirstMovie(movies[0]);
      }
  
      fetchData();
    },[])


    return(<div className="banner_div">
           {FirstMovie == "" ? <h1>Loading</h1> : 
              <>
                 <img src = {"https://image.tmdb.org/t/p/original/" + FirstMovie.backdrop_path} className="banner_img"></img>
                 <h1>{FirstMovie.title}</h1>
              </>}
    </div>)
}
 
  export default Banner;