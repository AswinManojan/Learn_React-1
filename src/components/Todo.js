import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosDoneAll } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

function Todo() {
  const [Input, setInput] = useState("");
  const [Todo, setTodo] = useState([]);
  const [EditID, setEditID] = useState(0);
  function addTodo() {
    if (Input !== "" && ListExist(Input)) {
      setTodo([...Todo, { list: Input, id: Date.now(), status: false }]);
      setInput("");
    }
    if (EditID !== 0 && Input !== "" && ListExist(Input)) {
      const updateTodo = Todo.map((to) =>
      to.id === EditID
      ? (to = { id: to.id, list: Input, status: to.status })
      : (to = { id: to.id, list: to.list, status: to.status })
      );
      setTodo(updateTodo);
      setInput("");
      setEditID(0);
    }
  }
  function ListExist(Input) {
    let flag = 0;
    Todo.map((x) => {
      if (x.list === Input) {
        flag++;
        return;
      }
    });
    return flag === 0;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
  });
  const onDelete = (id) => {
    setTodo(Todo.filter((to) => to.id !== id));
  };
  const onComplete = (id) => {
    let complete = Todo.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodo(complete);
  };
  const onEdit = (id) => {
    const editVal = Todo.find((i) => i.id == id);
    // console.log('---',editVal)
    setInput(editVal.list);
    setEditID(id);
    console.log("set edit id: ", EditID);
  };
  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={Input}
          placeholder="Enter your Todo"
          ref={inputRef}
          className="form-control"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>{EditID !== 0 ? "EDIT" : "ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {Todo.map((to) => (
            <li className="list-items">
              <div className="list-item-list" id={to.status ? "list-item" : ""}>
                {to.list}
              </div>
              <span>
                <IoIosDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(to.id)}
                />
                <FaEdit
                  className="list-item-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(to.id)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
