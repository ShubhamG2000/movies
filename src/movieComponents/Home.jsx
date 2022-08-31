import React from 'react'
import './header.css'
// import {results} from '../movies.js';
import './banner.css';
import './trending.css'
import './pagination.css'
// import Favourites from './Favourites'
// import Pagination from './Pagination'
import Header from './Header';
import Banner from './Banner';
import MoviesList from './MovieList';

function Home() {
  const [PageNo, changePage] = React.useState(1);  
  function decPage(){
     if(PageNo == 1){return}

     changePage(function (PageNo){
        return PageNo -1;
     });
  }

  function incPage(){
      changePage(function (PageNo){
        return PageNo +1;
    });
  }

  return (
    <>
     <Header></Header>
     <Banner></Banner>
     <MoviesList PageNo={PageNo}></MoviesList>
     {/* <UseStateHelper></UseStateHelper> */}
     {/* <Trending></Trending> */}
     <div className="pagination">
        <div className="pag_container">
            <div className="pag_previous" onClick={decPage} >Previous</div>
            <div className="pag_pageno">{PageNo}</div>
            <div className="pag_next" onClick={incPage} >Next</div>
        </div>
    </div>
    </>
  )
}






//three types of React.useEffect
function UseStateHelper(){
  let [val, SetVal] = React.useState(0)
  let [val5, SetVal5] = React.useState(0)
  function incVal(){SetVal(val + 1)}
  function incVal5(){SetVal5(val5 + 5)}
  console.log("render")

  // this type of useEffect runs the function after first render 
  // React.useEffect(function(){
  //   console.log("useeffect")
  // }, [])

  //this type of useEffect runs every time a state variable is changed (here val or val5)
  // React.useEffect(function(){
  //   console.log("useeffect")
  // })

  //this type of useEffect runs only when given varible in [arr] changes ,here ->val 
  React.useEffect(function(){
    console.log("useeffect")
  }, [val])
  return(
    <> {console.log("return component")}
       <div>
        <h1>count {val}</h1>
       <button onClick={incVal}>+</button>
       </div>

       <div>
        <h1>count {val5}</h1>
       <button onClick={incVal5}>+5</button>
       </div>
      
    </>
  )
}
function Trending(){
  return(
      <h1>trending</h1>
  )
}

export default Home