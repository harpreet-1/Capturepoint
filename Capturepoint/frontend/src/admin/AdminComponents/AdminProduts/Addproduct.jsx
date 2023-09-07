import Modal from "react-bootstrap/Modal";
import { useRef, useState } from "react";
import { useAlertContext } from "../../../Context/AlertContext";

function AddProduct({ setAdminProductData }) {
  const [showAddPrModal, setShowAddPrModal] = useState(false);
  const { showAlert } = useAlertContext();
  const AddProductForm = useRef();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    let newProductData = getFormData(AddProductForm.current);

    let result = await addProductInBakcend(newProductData, showAlert);
    if (result) {
      AddProductForm.current.reset();
      setShowAddPrModal(false);
      setAdminProductData((prev) => [newProductData, ...prev]);
    }
  };
  return (
    <>
      <button
        onClick={() => setShowAddPrModal(true)}
        className="addProductBtn btn btn-primary"
      >
        <i className="bx bx-plus"></i>
        <span>Add Product</span>
      </button>
      <Modal
        show={showAddPrModal}
        onHide={() => setShowAddPrModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <h3>Add New Product</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="login_body">
            <div className="login_main">
              <div id="big_box">
                <div className="right_box">
                  <div className="form_box">
                    <form
                      ref={AddProductForm}
                      onSubmit={(e) => handleLoginSubmit(e)}
                    >
                      <input
                        className=""
                        id="name"
                        required
                        placeholder="Enter Product Name"
                        type="text"
                      />

                      <input
                        className=""
                        id="category"
                        required
                        placeholder="Enter Category"
                        type="text"
                      />

                      <input
                        className=""
                        id="brand"
                        required
                        placeholder="Enter Brand"
                        type="text"
                      />

                      <input
                        className=""
                        id="price"
                        required
                        placeholder="Enter Price"
                        type="number"
                      />

                      <input
                        className=""
                        id="stockQuantity"
                        required
                        placeholder="Enter stock Quantity"
                        type="number"
                      />

                      <input
                        className=""
                        id="image"
                        required
                        placeholder="Enter Image URL"
                        type="text"
                      />

                      <input
                        className=""
                        id="description"
                        required
                        placeholder="Enter Description"
                        type="text"
                      />

                      <input type="submit" value="Add Product" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

function getFormData(form) {
  let newData = {};
  let fileds = [
    "name",
    "price",
    "category",
    "brand",
    "description",
    "stockQuantity",
    "image",
  ];

  for (let key of fileds) {
    newData[key] = form[key].value;
  }

  newData = { ...newData, images: [newData.image] };
  return newData;
}

async function addProductInBakcend(payload, showAlert) {
  try {
    let res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/admin/product/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(payload),
      }
    );
    let data = await res.json();
    showAlert(data.message, data.status ? "success" : "danger");
    return data.status;
  } catch (error) {
    console.log(" error from signup ************\n", error);
  }
}
export default AddProduct;
