import './App.css'
import AllViewTop from './components/AllViewTop'
import { BrowserRouter, Route, Routes } from 'react-router'
import WorldGenerate from './components/WorldGenerate'
import TradeOverview from './components/TradeOverview'
import WorldView from './components/WorldView'
import Header from './components/Header'
import MyLogin from './components/MyLogin'


function App() {


  return (
    <>
      <div>
        <BrowserRouter> {/* Defines and controlles the different urls available in the website */}
        <Header></Header>
        <Routes>
          <Route path="/" element= {
            <AllViewTop/>
          }/>
          {/* <Route path="/login" element= {
            <MyLogin/>
          }/> */} {/* Cut feature, almost worked but we ran out of time */}
          <Route path="/trade" element= {
            <TradeOverview/>
          }/>
          <Route path="/generateworld/" element= {
            <WorldGenerate/>
          }/>
          <Route path="/world/:worldid" element= {
            <WorldView/>
          }/>

        </Routes>
        </BrowserRouter>
        
      </div>
    </>
  )
}

export default App
