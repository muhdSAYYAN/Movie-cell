import React, { useEffect, useState } from 'react'
import Card from './Card'
import search from './search.png'
import movie from './movie.png'



let API_key="&api_key=db95773a7fb212ba790d71f6adac0e7e"
let base_url="https://api.themoviedb.org/3"
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
let arr=["Popular","Kids","Drama","Comedie"]



const Main = () => {
  
  const[movieData,setmovieData]=useState([]);
  const[url_set,seturl]=useState(url);
  const[search,setSearch]=useState()

  useEffect(()=>{
    fetch(url_set).then(res=>res.json()).then(data=>{
      // console.log(data.results);
      setmovieData(data.results);
    });
  },[url_set]);

  const getData=(movieType)=>{
    if(movieType=="Popular")
    {
        url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
    }
    // if(movieType=="Theatre")
    // {
    //     url=base_url+"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+API_key;
    // }
    if(movieType=="Kids")
    {
        url=base_url+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+API_key;
    }
    if(movieType=="Drama")
    {
        url=base_url+"/discover/movie?with_genres=18&primary_release_year=2014"+API_key;
    }
    if(movieType=="Comedie")
    {
        url=base_url+"/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc"+API_key;
    }
    seturl(url)
  }
  const searchMovie = (evt) => {
    console.log("Search button clicked");
    if (evt && (evt.key === "Enter" || evt.keyCode === 13)) {
      evt.preventDefault(); // Prevent the form from submitting and the page from reloading
      url = base_url + "/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" + search;
      seturl(url);
      setSearch(""); // Clear the search input
    }
  };
  
 
  return (

    <>
    <div className='header'>
      <div className="heading">
      <img src={movie} alt="" /><h2>MOVIE CELL</h2>
      </div>
      <div className='nav'>
        {
          arr.map((value,pos)=>{
            return(
              <a href="#" key={pos} name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a>
            )
          })
        }
         
         {/* <a href="">Theater</a>
         <a href="">Kids</a>
         <a href="">Drama</a>
         <a href="">Comedie</a> */}
         </div>


         <form action="">
            <div className='search-btn'>
                <input type="text" placeholder='Enter Movie Name' onChange={(e)=>{setSearch(e.target.value)}} value={search} onKeyPress={searchMovie}/>
                <button onClick={searchMovie}>Search</button>
                
            </div>
         </form>
         

      
      </div>
      
      <div className='mainbody'>
          
          {
            (movieData.length==0)?<p className='notfound'>Not Found</p>: movieData.map((res,pos)=>{
              return(
                <Card info={res} key={pos}/>
              )
            })
          }

      </div>
   
    </>
  )
}

export default Main
