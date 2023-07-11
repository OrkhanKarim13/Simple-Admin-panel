import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const Itemlist = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeProduct = async (productID) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productID}`);
      const updatedProducts = items.filter(
        (product) => product.id !== productID
      );
      setItems(updatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="allproduct">
      <div className="container">
        <div className="title">
          <h1> ALL PRODUCTS</h1>
        </div>
        <div className="productList">
          <ul className="allproduct">
            {items.map((item) => (
              <li className="product" key={item.id}>
                <div className="productImage">
                  <img
                    src={`http://localhost:5000/${item?.productImage}`}
                    alt="product"
                  />
                </div>
                <div className="productTitle">{item.name}</div>
                <div className="productDetail">{item.details}</div>
                <div className="productprice">
                  <strong>£{item.price}</strong>
                </div>
                <div className="buttons">
                  <Link to={`/edit-product/${item.id}`} className="editBtn">
                    {<FaEdit />}
                  </Link>
                  <button
                    onClick={() => removeProduct(item.id)}
                    type="submit"
                    className="removeBtn"
                  >
                    {<FaTrashAlt />}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Itemlist;
