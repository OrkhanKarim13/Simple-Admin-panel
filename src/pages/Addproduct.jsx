import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addproduct = () => {
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState({
    name: "",
    details: "",
    price: "",
    abv: "",
    volume: "",
    productImage: "",
  });
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const addImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
    }
  };

  const addItem = async (e) => {
    e.preventDefault();

    const body = new FormData();

    body.append("name", newItem.name);
    body.append("details", newItem.details);
    body.append("price", newItem.price);
    body.append("productImage", image);
    body.append("abv", Number(newItem.abv));
    body.append("volume", newItem.volume);

    console.log(body);

    try {
      await axios
        .post("http://localhost:5000/api/products", body)
        .then((res) => {
          navigate("/");
          setNewItem({
            name: "",
            details: "",
            price: "",
            abv: "",
            volume: "",
          });
          setImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="addproduct">
      <div className="container">
        <form className="form">
          <label className="formlabel">Product Name</label>
          <input
            placeholder="Enter product name"
            name="name"
            type="text"
            onChange={handleChange}
          ></input>
          <label className="formlabel">Product Details</label>
          <input
            placeholder="Enter product details"
            name="details"
            type="text"
            onChange={handleChange}
          ></input>
          <label className="formlabel">Product Price</label>
          <input
            placeholder="Enter product price"
            name="price"
            type="text"
            onChange={handleChange}
          ></input>
          <label className="formlabel">ABV</label>
          <input
            placeholder="abv"
            name="abv"
            type="text"
            onChange={handleChange}
          ></input>
          <label className="formlabel">Volume</label>
          <input
            placeholder="volume"
            name="volume"
            type="text"
            onChange={handleChange}
          ></input>
          <div className="addimg">
            {preview ? (
              <div className="preview">
                <img src={preview} alt="preview" />
              </div>
            ) : (
              <div className="img">
                <label htmlFor="image" className="formlabel">
                  Chose Foto
                </label>
                <input
                  placeholder="Enter product image"
                  name="producFile"
                  type="file"
                  onChange={addImage}
                ></input>
              </div>
            )}
          </div>
          <button onClick={addItem} className="addbtn" type="submit">
            Add
          </button>
        </form>
      </div>
    </section>
  );
};

export default Addproduct;
