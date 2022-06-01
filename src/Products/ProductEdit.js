import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";

const ProductEditStyles = css`
  color: #fff;
  background: #2a2c37;
  border-radius: 6px;
  padding: 15px;
`;

const ProductEdit = () => {
  const [formValue, setFormValue] = useState(null);

  useEffect(() => {
    setFormValue({
      id: "",
      name: "",
      price: 0,
      description: "",
    });
  }, []);

  const updateField = ({ name, value }) => {
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  if (formValue === null) {
    return <div>Loading...</div>;
  }

  return (
    <form className={ProductEditStyles} autoComplete="off" noValidate>
      <input
        type="text"
        name="id"
        placeholder="ID"
        className="ProductEdit-Input"
        value={formValue.id}
        onChange={({ target }) => updateField({ target })}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="ProductEdit-Input"
        value={formValue.name}
        onChange={({ target }) => updateField({ target })}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        className="ProductEdit-Input"
        value={formValue.price}
        onChange={({ target }) =>
          updateField({ name: target.name, value: parseInt(target.value, 10) })
        }
      />
      <textarea
        name="description"
        rows="5"
        className="ProductEdit-Input ProductEdit-Textarea"
        value={formValue.description}
        onChange={({ target }) => updateField({ target })}
      />

      <button type="button" className="ProductEdit-Button">
        Create
      </button>
    </form>
  );
};

export default ProductEdit;
