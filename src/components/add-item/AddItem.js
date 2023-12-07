import React, { useEffect, useState } from "react";
import axios from "axios";
import useInput from "../../Hooks/user-input";
import { useParams } from "react-router-dom";
import uploadIcon from "../../assets/upload-icon.svg";
import separator from "../../assets/separator.svg";
import check from "../../assets/check-svgrepo-com.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddItem() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [categories, setCategoriesData] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);

  const params = useParams();

  let {
    value: name,
    isValid: nameIsValid,
    haserror: nameHasError,
    setIstouched: setNameIstouched,
    setEnteredValue: setNameEnteredValue,
    handleValueChange: handleNameChange,
    inputBlurHandler: handleNameBlur,
  } = useInput((value) => value.trim() !== "");

  const {
    value: type,
    isValid: typeIsValid,
    haserror: typeHasError,
    setIstouched: setTypeIstouched,
    setEnteredValue: settypeEnteredValue,
    handleValueChange: handleTypeChange,
    inputBlurHandler: handleTypeBlur,
  } = useInput((value) => value.trim() !== "");

  const {
    value: price,
    isValid: priceIsValid,
    haserror: priceHasError,
    setIstouched: setPriceIstouched,
    setEnteredValue: setPriceEnteredValue,
    handleValueChange: handlePriceChange,
    inputBlurHandler: handlePriceBlur,
  } = useInput((value) => !isNaN(parseFloat(value)));

  const {
    value: size,
    isValid: sizeIsValid,
    haserror: sizeHasError,
    setIstouched: setSizeIstouched,
    setEnteredValue: setSizeEnteredValue,
    handleValueChange: handleSizeChange,
    inputBlurHandler: handleSizeBlur,
  } = useInput((value) => value.trim() !== "");

  const {
    value: description,
    isValid: descriptionIsValid,
    haserror: descriptionHasError,
    setIstouched: setDiscriptionIstouched,
    setEnteredValue: setDiscriptionEnteredValue,
    handleValueChange: handleDescriptionChange,
    inputBlurHandler: handleDescriptionBlur,
  } = useInput((value) => value.trim() !== "");

  const {
    value: category_id,
    isValid: categoryIdIsValid,
    haserror: categoryIdHasError,
    setIstouched: setCategoryIstouched,
    setEnteredValue: setCategoryEnteredValue,
    handleValueChange: handleCategoryIdChange,
    inputBlurHandler: handleCategoryIdBlur,
  } = useInput((value) => value.trim() !== "");

  useEffect(() => {
    if (params.id) {
      const fetchItem = async () => {
        try {
          const response = await axios.get(`${apiUrl}/items/${params.id}`);
          setUpdateMode(true);
          const data = response.data;
          setNameEnteredValue(data.name);
          settypeEnteredValue(data.type);
          setCategoryEnteredValue(data.category_id);
          setDiscriptionEnteredValue(data.description);
          setPriceEnteredValue(data.price);
          setSizeEnteredValue(data.size);
          console.log(name);
        } catch (error) {
          console.error("Error fetching item:", error);
        }
      };

      fetchItem();
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const Categoriesresponse = await fetch(`${apiUrl}/categories`);

        if (!Categoriesresponse.ok) {
          console.log(Categoriesresponse);
        }

        const CategoriesResult = await Categoriesresponse.json();
        setCategoriesData(CategoriesResult);
        console.log(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

  const [productImage, setProductImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nameIsValid ||
      !typeIsValid ||
      !priceIsValid ||
      !sizeIsValid ||
      !descriptionIsValid ||
      !categoryIdIsValid
    ) {
      return;
    }

    try {
      const formDataForServer = new FormData();
      formDataForServer.append("name", name);
      formDataForServer.append("type", type);
      formDataForServer.append("price", price);
      formDataForServer.append("size", size);
      formDataForServer.append("description", description);
      formDataForServer.append("category_id", category_id);
      formDataForServer.append("productImage", productImage);
      let response;
      if (updateMode) {
        response = await axios.put(
          `${apiUrl}/items/${params.id}`,
          formDataForServer
        );

        if (response.status === 200) {
          toast.success("Form updating successfully!", {
            position: "top-right",
            autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          // Reset form fields only if the response status is successful
          setNameEnteredValue("");
          setCategoryEnteredValue("");
          settypeEnteredValue("");
          setPriceEnteredValue("");
          setSizeEnteredValue("");
          setDiscriptionEnteredValue("");
          setTypeIstouched(false);
          setDiscriptionIstouched(false);
          setCategoryIstouched(false);
          setNameIstouched(false);
          setPriceIstouched(false);
          setSizeIstouched(false);
        } else {
          toast.error("An error occurred while updating the form.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        try {
          const response = await axios.post(
            `${apiUrl}/items`,
            formDataForServer
          );

          if (response.status === 201) {
            toast.success("Form submitted successfully!", {
              position: "top-right",
              autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });

            // Reset form fields only if the response status is successful
            setNameEnteredValue("");
            setCategoryEnteredValue("");
            settypeEnteredValue("");
            setPriceEnteredValue("");
            setSizeEnteredValue("");
            setDiscriptionEnteredValue("");
            setTypeIstouched(false);
            setDiscriptionIstouched(false);
            setCategoryIstouched(false);
            setNameIstouched(false);
            setPriceIstouched(false);
            setSizeIstouched(false);
          } else {
            toast.error("An error occurred while submitting the form.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        } catch (error) {
          // Handle errors, e.g., log the error or show a user-friendly message
          console.error("Error:", error);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const clickss = () => {
    document.getElementById("file").click();
  };

  return (
    <div className="add-item-container">
      <div className="special-sections">
        <p>Add Item</p>
        <img src={separator} alt="separator" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-text-box">
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            style={{ background: "white", color: "black" }}
          />
          <label for="">Name</label>
          {nameHasError && <p className="input-error">Name is required</p>}
        </div>

        <div className="input-select-box">
          <select
            name="type"
            value={type}
            required
            onChange={handleTypeChange}
            onBlur={handleTypeBlur}
          >
            <option value="لايوجد">لايوجد</option>
            <option value="قطعة">قطعة</option>
            <option value="دزينة">دزينة</option>
          </select>
          <label htmlFor="type">Type</label>
          {typeHasError && <p className="input-error">Type is required</p>}
        </div>

        <div className="input-text-box">
          <input
            type="number"
            name="price"
            required
            value={price}
            onChange={handlePriceChange}
            onBlur={handlePriceBlur}
          />
          <label for="">Price:</label>
          {priceHasError && (
            <p className="input-error">Price must be a number</p>
          )}
        </div>

        <div className="input-select-box">
          <select
            name="size"
            value={size}
            onChange={handleSizeChange}
            onBlur={handleSizeBlur}
            required
          >
            <option value="لايوجد">لايوجد</option>
            <option value="صغير">صغير</option>
            <option value="وسط">وسط</option>
            <option value="كبير">كبير</option>
          </select>
          <label for="">Size:</label>
          {sizeHasError && <p className="input-error">Size is required</p>}
        </div>

        <div className="input-text-box">
          <input
            name="description"
            value={description}
            required
            onChange={handleDescriptionChange}
            onBlur={handleDescriptionBlur}
          />
          <label for="">Description:</label>
          {descriptionHasError && (
            <p className="input-error">Description is required</p>
          )}
        </div>

        <div className="input-select-box">
          <select
            name="category_id"
            value={category_id}
            onChange={handleCategoryIdChange}
            onBlur={handleCategoryIdBlur}
            required
          >
            {categories.map((res) => (
              <option value={res._id} key={res._id}>
                {res.name}
              </option>
            ))}
          </select>
          <label for="">Category : </label>
          {sizeHasError && <p className="input-error">Category is required</p>}
        </div>

        <div className="input-file-box">
          <div>
            {setProductImage ? (
              <img
                src={uploadIcon}
                alt="upload-icon"
                className="cloud-upload-icon"
              />
            ) : (
              <img
                src={check}
                alt="upload-icon"
                className="cloud-upload-icon"
              />
            )}
            <p className="upload-image-text"> Upload Image </p>
          </div>
          <button onClick={clickss} type="button">
            Upload
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="file"
          />
        </div>

        <button type="submit" className="submit">
          {updateMode ? "Update Item" : "Add Item"}
        </button>
      </form>
    </div>
  );
}
