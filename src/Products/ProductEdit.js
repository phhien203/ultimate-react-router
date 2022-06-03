import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  retrieveProduct,
  updateProduct,
} from "./ProductsService";

const ProductEditStyles = css`
  color: #fff;
  background: #2a2c37;
  border-radius: 6px;
  padding: 15px;
  .ProductEdit {
    &-Input {
      width: 100%;
      border: 1px solid transparent;
      color: #fff;
      background: #1d1e26;
      padding: 10px 15px;
      margin-bottom: 5px;
      border-radius: 6px;
      outline: 0;
      &:focus {
        border-color: #50fa7b;
      }
    }

    &-Textarea {
      min-height: 80px;
      resize: none;
    }

    &-Button {
      border: 2px solid #50fa7b;
      color: #50fa7b;
      background: none;
      padding: 10px 15px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
`;

const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValue, setFormValue] = useState(null);

  useEffect(() => {
    setFormValue({
      id: "",
      name: "",
      price: 0,
      description: "",
    });

    (async () => {
      try {
        const product = await retrieveProduct(id);
        setFormValue(product);
      } catch (err) {
        console.warn(err);
        navigate("/admin", { replace: true });
      }
    })();
  }, [id]);

  const updateField = ({ name, value }) => {
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    try {
      const { id } = await createProduct(formValue);
      navigate(`/admin/${id}`);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(formValue);
      alert(`Updated ${formValue.name}`);
      navigate(`/admin`);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Really delete ${formValue.name}?`)) {
      return;
    }

    try {
      await deleteProduct(formValue.id);
      navigate("/admin");
    } catch (err) {
      console.warn(err);
    }
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
        onChange={({ target }) => updateField(target)}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="ProductEdit-Input"
        value={formValue.name}
        onChange={({ target }) => updateField(target)}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        className="ProductEdit-Input"
        value={formValue.price}
        onChange={({ target }) =>
          updateField({
            name: target.name,
            value: parseInt(target.value, 10) || 0,
          })
        }
      />
      <textarea
        name="description"
        placeholder="Description"
        rows="5"
        className="ProductEdit-Input ProductEdit-Textarea"
        value={formValue.description}
        onChange={({ target }) => updateField(target)}
      />

      <button
        type="button"
        className="ProductEdit-Button"
        onClick={handleCreate}
      >
        Create
      </button>

      <button
        type="button"
        className="ProductEdit-Button"
        onClick={handleUpdate}
      >
        Update
      </button>

      <button
        type="button"
        className="ProductEdit-Button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </form>
  );
};

export default ProductEdit;
// {
// "id": "big-cheese",
// "name": "Big Cheese",
// "description": "Large burger, all the cheese.",
// "price": 749
// },
