import SideBar from "./components/Sidebar"
import Main from "./components/Main"
import Footer from "./components/Footer"
import { useEffect, useState } from "react"



function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModel, setShowModel] = useState(false)
  
  function toggleModel() {
    setShowModel(!showModel)
  }
  
  useEffect(()  => {
    async function fetchAPIData() {
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
    const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`
    
    const today = (new Date()).toDateString()
    const localKey = `NASA-${today}`
    if (localStorage.getItem(localKey)) {
      const apiData = JSON.parse(localStorage.getItem(localKey))
      setData(apiData)
      console.log('Fetching data from local storage')
      return
    }
    localStorage.clear()

    try {
      const res = await fetch(url)
      const apiData = await res.json()
      localStorage.setItem(localKey, JSON.stringify(apiData))
      setData(apiData)
      console.log('Fetching data from API')
    } catch (error) {
      console.log(error.message)
    }
  }
  fetchAPIData()
  }, [])


  return (
    <>
     {data ? (<Main data={data} />) : (
     <div className="loadingState">
      <span className="material-symbols-outlined">settings</span></div>
     )}
      {showModel && ( <SideBar data={data} toggleModel = {toggleModel}/>)}
      {data && (<Footer data={data} toggleModel = {toggleModel}/>)}
    </>
  )
}

export default App
