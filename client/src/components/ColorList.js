import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { axiosWithAuth } from "../axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, history }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);
  const [colorToDelete, setColorToDelete] = useState();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data);
        axiosWithAuth()
          .get(`colors`)
          .then(response => updateColors(response.data));
      })
      .catch(err => console.error(err));
  };

  const addColor = e => {
    axiosWithAuth()
      .post(`colors/`, colorToAdd)
      .then(res => {
        updateColors([...colors, colorToAdd]);
      })
      .catch(err => console.error(err));
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`colors/${color.id}`)
      .then(res => {
        const updated = colors.filter(col => col.id !== res.data);
        updateColors(updated);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}{" "}
      <form onSubmit={addColor}>
        <legend>edit color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <hr />
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">add</button>
        </div>
      </form>
      <div className="spacer" />
    </div>
  );
};

export default withRouter(ColorList);
