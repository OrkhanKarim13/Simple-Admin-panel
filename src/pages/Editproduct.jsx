import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Editproduct = () => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    details: "",
    price: "",
    abv: "",
    volume: "",
    productImage: "uploads/night-on-earth.png",
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        await axios
          .get(`http://localhost:5000/api/products/${id}`)
          .then((res) => {
            setData(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
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

  const editData = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("name", data.name);
    body.append("details", data.details);
    body.append("price", data.price);
    body.append("abv", data.abv);
    body.append("volume", data.volume);
    body.append("productImage", image);

    console.log(body);

    try {
      await axios
        .put(`http://localhost:5000/api/products/${id}`, body)
        .then((res) => {
          navigate("/");
        });
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <section className="editproduct">
      <div className="container">
        <form>
          <input
            type="text"
            className="edit"
            name="name"
            placeholder="Item name"
            value={data?.name}
            onChange={handleChange}
          />
          <input
            type="text"
            className="edit"
            name="details"
            placeholder="Item details"
            value={data?.details}
            onChange={handleChange}
          />
          <input
            type="text"
            className="edit"
            name="price"
            placeholder="Item price"
            value={data?.price}
            onChange={handleChange}
          />
          <input
            type="text"
            className="edit"
            name="abv"
            placeholder="Abv"
            value={data?.abv}
            onChange={handleChange}
          />
          <input
            type="text"
            className="edit"
            name="volume"
            placeholder="volume"
            value={data?.volume}
            onChange={handleChange}
          />
          <div className="itemImg">
            <label htmlFor="image">
              Choose image
              <input
                type="file"
                className="edit"
                id="image"
                name="productImage"
                placeholder="image"
                onChange={addImage}
              />
            </label>
          </div>
          <div className="editPreview" >
            <img
              className="editImg"
              src={preview ? preview : `http://localhost:5000/${data?.productImage}`}
              alt="preview"
            />
          </div>
          <button className="editbtn" type="submit" onClick={editData}>
            Edit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Editproduct;
