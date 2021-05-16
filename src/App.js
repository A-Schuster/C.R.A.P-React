import { useState } from 'react';
import './App.css';
import NavBarComp from './components/navbarcomp/navbarcomp';
import Home from "./components/home/home"
import Contact from "./components/contact/contact"
import HowTo from "./components/howto/howto"
import About from './components/about/about'

function App() {
  const [selectedPage, setPage] = useState(<Home />)
  const handleSelect = (e) => {
    const clickedPage = e.target.id;
    switch(clickedPage){
      case 'about':
        setPage(<About/>)
        break;
      case 'contact':
        setPage(<Contact/>)
        break;
      case 'howto':
        setPage(<HowTo/>)
        break;
      default:
        setPage(<Home/>)
        break;
    }
  }


  return (
    <div className="App">
      <NavBarComp setPage={handleSelect}/>
      {selectedPage}
    </div>
  );
}

export default App;
