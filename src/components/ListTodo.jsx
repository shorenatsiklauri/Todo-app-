import React, { useState } from 'react';
import './ListTodo.css';

function ListTodo({ isDayMode }) {
  const white = '#ffffff'; // color for day mode
  const black = '#25273d'; // color for night mode
  console.log(isDayMode);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('All');
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleToggleComplete = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Completed') {
      return todo.completed;
    } else if (filter === 'Active') {
      return !todo.completed;
    }
    return true; // 'All' filter or if filter value is invalid
  });

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };
  
  const handleClearList = () => {
    setTodos([]);
  };

  return (
    <div className='mainbox' style={{ backgroundColor: isDayMode ? white : black, color: isDayMode ? black : white }}>
      <div className="boxforinputelement" style={{ backgroundColor: isDayMode ? white : black, color: isDayMode ? black : white }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a new todo"
        className="inputwhattodo"
        style={{ backgroundColor: isDayMode ? white : black, color: isDayMode ? black : white }}

        onKeyDown={(e) => {
          if(e.key==='Enter') {
            handleAddTodo()

          }
        }
        
        }

      />
      </div>

      <ul className="whattodolist" style={{ backgroundColor: isDayMode ? white : black }}>
        
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              backgroundColor: isDayMode ? white : black,
              color: isDayMode ? black : white,
            }}
            className="whattodotext"
          >
           
            
            <input
              type="checkbox" style={{ backgroundColor: isDayMode ? white : black }}
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
             <span>{todo.text}</span>
            <button className="allbuttons"style={{ backgroundColor: isDayMode ? white : black }} onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="filter-buttons" style={{ backgroundColor: isDayMode ? white : black }}>
        <button className="allbuttons" style={{ backgroundColor: isDayMode ? white : black }} onClick={() => handleFilterChange('All')}>
          All
        </button>
        <button className="allbuttons" style={{ backgroundColor: isDayMode ? white : black }}onClick={() => handleFilterChange('Active')}>
          Active
        </button>
        <button className="allbuttons" style={{ backgroundColor: isDayMode ? white : black }}onClick={() => handleFilterChange('Completed')}>
          Completed
        </button>
         <button className='allbuttons' style={{ backgroundColor: isDayMode ? white : black }}onClick={handleClearList}>Clear</button>
      </div>
    </div>
  );
}

export default ListTodo;