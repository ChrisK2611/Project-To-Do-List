import { useState } from "react";

const ShoppingList = () => {
  const [list, setList] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [openEditor, setOpenEditor] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [safeIndex, setSafeIndex] = useState();


  const addToList = () => {
    if (inputVal != "") {
      const newobject = {
        title: inputVal,
        done: false,
      };
      setList([...list, newobject]);
      setInputVal("");
    } else {
      alert("Please enter something!");
    }
  };

  const löschen = (index) => {
    const listeAngepasstCopy = [...list];
   
    listeAngepasstCopy.splice(index, 1);
    
    setList(listeAngepasstCopy);
  };

  const update = (index) => {
    setList((neueListe) =>
     
      neueListe.map((einzObjvonListe, i) =>
       
        i === index
          ? { ...einzObjvonListe, done: !einzObjvonListe.done }
          : einzObjvonListe
      )
    );
  };

  const editText = () => {
    if (updateText != "") {
      setList((neueListe) =>
        neueListe.map((item, index) =>
          index == safeIndex ? { ...item, title: updateText } : item
        )
      );
      setOpenEditor(false);
    } else {
      alert("You didn't enter anything!");
    }
    setUpdateText("");
  };

  const open = (index) => {
    setSafeIndex(index);
    setOpenEditor(true);
  };

  const abbrechen = () => {
    setOpenEditor(false);
    
    setUpdateText("");
  };

  const filterAZ = () => {
    const sortedArray = [...list].sort((a, b) =>
     
      a.title.localeCompare(b.title)
    );
    setList(sortedArray);
  };

  const filterZA = () => {
    const sortedArray = [...list].sort((a, b) =>
      b.title.toLowerCase().localeCompare(a.title.toLowerCase())
    );
    setList(sortedArray);
  };

  return (
    <section className="toDo">
      <h1>ToDo List</h1>
      <label htmlFor="list">Add ToDo in the Section below:</label>
      <input
        id="list"
        type="text"
        onChange={(e) => setInputVal(e.target.value)}
        value={inputVal}
      />
      <button className="btns" onClick={addToList}>Add</button>
      <hr />
      <section className="filter">
        <button className="btns" onClick={filterAZ}>A - Z</button>
        <button className="btns" onClick={filterZA}>Z - A</button>
      </section>
      <section
        className="edit"
        style={openEditor ? { display: "flex" } : { display: "none" }}
      >
        <div className="inner">
          <label htmlFor="edit">Edit Todo:</label>
          <input
            id="edit"
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
            placeholder="Edit your Todo title"
            type="text"
          />
          <button onClick={editText}>Done</button>
          <button onClick={abbrechen}>Abbrechen</button>
        </div>
      </section>

      {list.map((elm, index) => (
        <div key={index} className="list-item">
          <input
            onChange={() => update(index)}
            type="checkbox"
            checked={elm.done}
          />
          <p
           
            style={
              elm.done
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }
          >
            {elm.title}
          </p>
          <button onClick={() => löschen(index)}>x</button>
          <button onClick={() => open(index)}>📝</button>
        </div>
      ))}
    </section>
  );
};

export default ShoppingList;