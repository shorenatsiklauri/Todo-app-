import './App.css'
import sun from './assets/icon-sun.svg'
import moon from './assets/icon-moon.svg';
import dayPicture from './assets/bg-desktop-light.jpg'
import nightPicture from './assets/bg-desktop-dark.jpg'
import { useState } from 'react'
import TodoApp from './components/ListTodo'


function App() {
  const [isDayMode, setIsDayMode] = useState(false);

  const toggleDayMode = () => {
    setIsDayMode(!isDayMode);
  };

  const bgColor = isDayMode ? '#ffffff' : '#25273d';
  const backgroundImage = isDayMode ? dayPicture : nightPicture;

  return (
    <div>
      <header className="pictureheader"  style={{ backgroundImage: `url(${isDayMode ? dayPicture : nightPicture})` }}
      >
        <h1 className="Todo">T O D O</h1>
        <img src={isDayMode ? sun : moon} alt="" onClick={toggleDayMode} />
      </header>
      <main style={{ background: bgColor }}>
        <div className="card">
          <TodoApp isDayMode={isDayMode} />
        </div>

        <div className="footerbox" style={{ background: bgColor }}>
        <p className="Draganddroptext">Drag and drop to reorder list</p>
      </div>
      </main>
    
    </div>
  );
}

export default App;
