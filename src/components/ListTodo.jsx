import React, { useEffect, useState } from "react";
import "./ListTodo.css";
import axios from "axios";

function ListTodo({ isDayMode }) {
  const white = "#ffffff";
  const black = "#25273d";

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("All");
  const [number,setNumber]= useState(1) ;

  useEffect(() => {
    getData();
  },[number]);



  const getData = async () => {
    try {
      const response = await axios.get(
        "https://sql-products-6sb0.onrender.com/api/todo"
      );
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = async () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      try {
        const response = await axios.post('https://sql-products-6sb0.onrender.com/api/todo', newTodo
        );
      setNumber(number +1 ) ;
         
      } catch (error) {
        console.log(error);
      }

   

      setInputValue("");
    }
  };

 


 const handleDeleteTodo = async (todoId) => {
  try {
    await axios.delete(`https://sql-products-6sb0.onrender.com/api/todo/${todoId}`);
    setNumber(number + 1);
  } catch (error) {
    console.log(error);
  }
};


const handleToggleComplete = async (todoId, completed) => {
  try {
    await axios.put(`https://sql-products-6sb0.onrender.com/api/todo/${todoId}`, { completed : !completed});

    setNumber(number + 1);
  } catch (error) {
    console.log(error);
  }
};


  const filteredTodos = todos.filter((todo) => {
    if (filter === "Completed") {
      return todo.completed;
    } else if (filter === "Active") {
      return !todo.completed;
    }
    return true;
  });

  const handleFilterChange = (filterType) => {
 
    setFilter(filterType);
  };




  const handleClearList = async () => {
    try {
      todos.length = 0;
      await axios.delete(`https://sql-products-6sb0.onrender.com/api/todo/${todos}`);
     
      setNumber(number + 1);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div
      className="mainbox"
      style={{
        backgroundColor: isDayMode ? white : black,
        color: isDayMode ? black : white,
      }}
    >
      <div
        className="boxforinputelement"
        style={{
          backgroundColor: isDayMode ? white : black,
          color: isDayMode ? black : white,
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new todo"
          className="inputwhattodo"
          style={{
            backgroundColor: isDayMode ? white : black,
            color: isDayMode ? black : white,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo();
            }
          }}
        />
      </div>

      <ul
        className="whattodolist"
        style={{ backgroundColor: isDayMode ? white : black }}
      >
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              backgroundColor: isDayMode ? white : black,
              color: isDayMode ? black : white,
            }}
            className="whattodotext"
          >
            <input
              type="checkbox"
              style={{ backgroundColor: isDayMode ? white : black }}
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id,todo.completed)}
            />
            <span>{todo.todotext}</span>
            <button
              className="allbuttons"
              style={{ backgroundColor: isDayMode ? white : black }}
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div
        className="filter-buttons"
        style={{ backgroundColor: isDayMode ? white : black }}
      >
        <button
          className="allbuttons"
          style={{ backgroundColor: isDayMode ? white : black }}
          onClick={() => handleFilterChange("All")}
        >
          All
        </button>
        <button
          className="allbuttons"
          style={{ backgroundColor: isDayMode ? white : black }}
          onClick={() => handleFilterChange("Active")}
        >
          Active
        </button>
        <button
          className="allbuttons"
          style={{ backgroundColor: isDayMode ? white : black }}
          onClick={() => handleFilterChange("Completed")}
        >
          Completed
        </button>
        <button
          className="allbuttons"
          style={{ backgroundColor: isDayMode ? white : black }}
          onClick={handleClearList}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default ListTodo;
