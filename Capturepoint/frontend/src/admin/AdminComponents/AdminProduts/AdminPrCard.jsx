import React, { useState } from "react";
import "../../CSS/AdminProducts.css";
import { useAlertContext } from "../../../Context/AlertContext";
import OrderCancleConfirmModal from "../../../Components/modals/OrderCancleConfirmModal";
function AdminPrCard({ product }) {
  const { showAlert } = useAlertContext();
  const [editing, setEditing] = useState(false);
  const [prDetails, setPrDetails] = useState({ ...product });
  const [showOrderDeleteConfirm, setShowOrderDeleteConfirm] = useState();
  const toggleEditing = () => {
    if (editing) {
      setPrDetails(null);
      setTimeout(() => {
        setPrDetails(product);
      }, 0);
    }
    setEditing(!editing);
  };

  async function handleUpdateProduct() {
    let updatedData = getUpdatedData(showAlert, product._id, product);
    if (updatedData) {
      let result = await updateInBackend(showAlert, product._id, updatedData);

      if (result) {
        setPrDetails({ ...updatedData, images: [updatedData.image] });
        setEditing(false);
      } else {
        toggleEditing();
      }
    } else {
      setEditing(false);
    }
  }
  function handleDeleteProduct() {
    deletefrombackend(product._id, showAlert);
  }
  let { name, price, category, brand, description, stockQuantity, images } =
    prDetails || {};
  return (
    <>
      {showOrderDeleteConfirm && (
        <OrderCancleConfirmModal
          message="Are you sure you want to Delete This product"
          showConfirmModal={showOrderDeleteConfirm}
          handleConfirmYes={handleDeleteProduct}
          hidemodal={() => setShowOrderDeleteConfirm(false)}
        />
      )}
      <div id={`adminPr${product._id}`} className="product AdminPrCard">
        <div className="AdminPrImg">
          {!editing ? (
            <img id="image" src={images && images[0]} alt="" />
          ) : (
            <p className="imageLinkBox">
              <p>Image URL</p>
              <span
                className="imageLinkSpan"
                id={`image${product._id}`}
                contentEditable={editing}
              >
                {images && images[0]}
              </span>
            </p>
          )}
        </div>
        <div className={`AdminPrDetails ${editing ? "adminPrEditActive" : ""}`}>
          <p>
            <span> Title :</span>
            <span id={`name${product._id}`} contentEditable={editing}>
              {name}
            </span>
          </p>

          <p className="brand">
            <span>Brand : </span>

            <span id={`brand${product._id}`} contentEditable={editing}>
              {brand}
            </span>
          </p>
          <p className="category">
            <span>Category : </span>

            <span id={`category${product._id}`} contentEditable={editing}>
              {category}
            </span>
          </p>

          <p>
            <span> Price : </span>

            <span>
              $
              <span
                style={{ outline: "none" }}
                id={`price${product._id}`}
                contentEditable={editing}
              >
                {price}
              </span>
            </span>
          </p>
          <p>
            <span>In Stock: </span>

            <span id={`stockQuantity${product._id}`} contentEditable={editing}>
              {stockQuantity}
            </span>
          </p>
          <p className="AdminPrDes">
            <span>Description : </span>
            <span id={`description${product._id}`} contentEditable={editing}>
              {description}
            </span>
          </p>
        </div>
        <div className="adminPrBtn">
          {editing && (
            <div>
              <button onClick={handleUpdateProduct} className="btn btn-success">
                <i className="bx bx-check-square"></i> Update
              </button>
            </div>
          )}
          <div>
            <button onClick={toggleEditing} className="btn btn-primary">
              <i className={`bx bx-${editing ? "undo" : "edit-alt"}`}></i>{" "}
              {editing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div>
            <button
              className="btn btn-danger"
              onClick={() => setShowOrderDeleteConfirm(true)}
            >
              <i className="bx bx-trash"></i> Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function getUpdatedData(showAlert, productId, product) {
  let updatedData = {};
  let fileds = [
    "name",
    "price",
    "category",
    "brand",
    "description",
    "stockQuantity",
    "image",
  ];
  let isSameData = true;
  for (let key of fileds) {
    let htmlElement = document.getElementById(`${key}${productId}`);
    updatedData[key] = htmlElement.innerText.trim();

    if (!updatedData[key]) {
      htmlElement.style.minWidth = "100px";
      showAlert(`Please provide ${key}`, "danger", 2000);
      return false;
    }
    if (
      (key !== "image" && product[key] != updatedData[key]) ||
      (key == "image" && product.images[0] != updatedData[key])
    ) {
      isSameData = false;
    }
  }
  if (isSameData) {
    showAlert("product data is up to date", "primary");
    return;
  }
  return updatedData;
}

async function updateInBackend(showAlert, productId, payload) {
  try {
    let res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/admin/product/update/${productId}`,
      {
        method: "PATCH",
        headers: {
          "auth-token": localStorage.getItem("token") || null,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    res = await res.json();

    if (res.status) {
      showAlert(`Product updated successfully`, "success", 2000);
    } else {
      showAlert(res.message, "danger");
    }
    return res.status;
  } catch (error) {
    console.log(error);
  }
}
async function deletefrombackend(productId, showAlert) {
  try {
    let res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/admin/product/delete/${productId}`,
      {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token") || null,
        },
      }
    );
    res = await res.json();

    if (res.status) {
      showAlert(`Product Deleted successfully`, "success", 2000);
    } else {
      showAlert(res.message, "danger");
    }
    return res.status;
  } catch (error) {
    showAlert(`something went wrong !`, "danger", 2000);
    console.log(error);
  }
}
export default AdminPrCard;
