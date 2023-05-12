
import './App.css'
import sun from './assets/icon-sun.svg'
import moon from './assets/icon-moon.svg'
import  dayPicture from './assets/bg-desktop-light.jpg'
import  nightPicture from './assets/bg-desktop-dark.jpg'
import { useState } from 'react';

function App() {
  const [isDayMode, setIsDayMode] = useState(true);

  const changeHandler = () => {
    setIsDayMode(!isDayMode);
  };


  return (
    
      <div>
   <header
        className="pictureheader"
        style={{ backgroundImage: `url(${isDayMode ? dayPicture : nightPicture})` }}
      >
        <h1 className="Todo">T O D O</h1>
        {isDayMode && (
          <img src={sun} alt="" onClick={changeHandler} />
        )}
        {!isDayMode && (
          <img src={moon} alt="" onClick={changeHandler} />
        )}
        <div
          className="whattodo"
          style={{ backgroundColor: isDayMode ? 'white' : '#25273d' }}
        >
          <div
            className="smalltick"
            style={{ backgroundColor: isDayMode ? 'white' : '#25273d' }}
          >
            <input type="checkbox" className="tick-button" />
            <input
              type="text"
              className="whattodotext"
              placeholder="Create TODO list"
              style={{ backgroundColor: isDayMode ? 'white' : '#25273d', color: isDayMode ? '#25273d' : 'white' }}
            />
          </div>
        </div>
      </header>
        <main>
    
      <div className='cardfilters' >
        <div className='choicefilterbox'> 
        <button className='howmanyitemsleft'> </button>
        </div>
        
      </div>
               </main>
               <div className='footerbox'>
               <p className='Draganddroptext'> Drag and drop to reorder list </p>
               </div>
        
      </div>
   
    
  )
}

export default App;
