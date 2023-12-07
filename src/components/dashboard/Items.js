import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Items() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [toggleOptionsIsActive, setToggleOptionsIsActive] = useState(false);
  const [toggleOptionsIsActiveId, setToggleOptionsIdIsActive] = useState(null);
  const [filterItemValue, setfilterItemValue] = useState("");

  const getdata = useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/items`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirm = () => {
    console.log("Item deleted");
    setIsDeleteModalOpen(false);
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`${apiUrl}/deleteItem/${itemId}`);

      if (response.status === 204) {
        toast.success("Form submitted successfully!", {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("An error occurred", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  function toggleOptions(id) {
    setToggleOptionsIsActive(!toggleOptionsIsActive);
    setToggleOptionsIdIsActive(id);
  }

  const filterTableItems = async (event) => {
    setfilterItemValue(event.target.value);
    console.log(filterItemValue);
    if (filterItemValue != "") {
      const response = await axios.get(
        `${apiUrl}/items?name=${filterItemValue}`
      );
      setItems(response.data);
    } else {
      const response = await axios.get(`${apiUrl}/items`);
      setItems(response.data);
    }
  };

  const optionsClass = toggleOptionsIsActive ? "active" : "";

  return (
    <>
      <div className="dashboard-items-table">
        <div className="items-table-header">
          <div>
            <div className="numberOfItems">
              Product <span>({items.length})</span>
            </div>
            <div className="items-table-header-subtitle">
              Mange products for Your store
            </div>
          </div>
          <div>
            <Link to="/add-item" className="add-item-link">
              + Add New
            </Link>
          </div>
        </div>
        <div className="items-table-container">
          <div className="items-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td data-cell="name">{item.name}</td>
                    <td data-cell="type">{item.type}</td>
                    <td data-cell="price">{item.price}</td>
                    <td data-cell="description" className="discriptionTd">
                      {item.description}
                    </td>
                    <td className="options-td">
                      <button
                        type="button"
                        className="options-button-toggeler"
                        onClick={() => {
                          toggleOptions(item._id);
                        }}
                      >
                        <span>...</span>
                        <ul
                          className={`options ${
                            toggleOptionsIsActiveId == item._id
                              ? optionsClass
                              : ""
                          }`}
                        >
                          <li className="options-li options-update">
                            <Link to={`/add-item/${item._id}`}>
                              <button>Update</button>
                            </Link>{" "}
                          </li>
                          <li className="options-li options-delet">
                            <button
                              onClick={() => {
                                deleteItem(item._id);
                              }}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* {setIsDeleteModalOpen && (
        <DeleteModel
          isOpen={isDeleteModalOpen}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )} */}
    </>
  );
}
