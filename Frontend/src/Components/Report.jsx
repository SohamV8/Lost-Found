import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './ReportForm.css';
import Modal from './Modal'; // Import the Modal component

export default function ReportForm() {
  const [reportType, setReportType] = useState("lost");
  const [location, setLocation] = useState("Location");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Category");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State to store modal message

  function clearForm() {
    setReportType("lost");
    setLocation("Location");
    setCategory("Category");
    setItemName("");
    setDate("");
    setDesc("");
    setImages([]);
  }

  function handleImage(e) {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(imageUrls);
  }

  async function handleReport(e) {
    e.preventDefault();
    const report = {
      location,
      itemName,
      category,
      date,
      description: desc,
      images
    };

    const endpoint = reportType === "lost" ? 'https://lf-backend-wx64.onrender.com/api/reports/lost' : 'https://lf-backend-wx64.onrender.com/api/reports/found';

    try {
      await axios.post(endpoint, report);
      setModalMessage("Item reported successfully!");
      setShowModal(true);
      clearForm();
    } catch (error) {
      setModalMessage("There was an error submitting the report!");
      setShowModal(true);
    }
  }

  return (
    <div className="Form">
      <ToastContainer />
      <div className="container1">
        <div className="form-wrapper">
          <h1 className="form-title">REPORT AN ITEM</h1>
          <form onSubmit={handleReport} className="form">
            <div className="check-box">
              <label>
                <input
                  type="radio"
                  value="lost"
                  checked={reportType === "lost"}
                  onChange={() => setReportType("lost")}
                />
                Lost
              </label>
              <label>
                <input
                  type="radio"
                  value="found"
                  checked={reportType === "found"}
                  onChange={() => setReportType("found")}
                />
                Found
              </label>
            </div>
            <input
              type="text"
              value={itemName}
              placeholder="Item Name"
              id="itemName"
              onChange={(e) => setItemName(e.target.value)}
              className="input"
            />
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input"
            >
              <option value="Location" disabled>
                Location
              </option>
              <option value="sportRoom">Sport Room</option>
              <option value="cricketGround">Cricket Ground</option>
              <option value="cafe10">Cafe 10</option>
              <option value="cafe1">Cafe 1</option>
              <option value="cadLab">Cad Lab</option>
            </select>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
            >
              <option value="Category" disabled>
                Category
              </option>
              <option value="electronic">Electronic</option>
              <option value="notebook">Stationery</option>
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="sport">Sport</option>
            </select>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              id="date"
              className="input"
            />
            <input
              type="file"
              id="file"
              multiple
              onChange={handleImage}
              className="input"
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              id="description"
              rows="5"
              className="textarea"
              placeholder="Add description..."
            ></textarea>
            {images.length > 0 && (
              <div className="image-preview">
                {images.map((image, index) => (
                  <img key={index} src={image} alt={`preview ${index}`} />
                ))}
              </div>
            )}
            <div className="button-group">
              <input
                type="submit"
                value="Submit"
                className="button21 submit-button"
              />
              <input
                type="button"
                value="Cancel"
                onClick={(e) => { e.preventDefault(); clearForm(); }}
                className="button21 cancel-button"
              />
            </div>
          </form>
        </div>
        <div className="balls21">
          <div className="ball21 ballz1"></div>
          <div className="ball21 ballz2"></div>
        </div>
      </div>
      <Modal show={showModal} handleClose={() => setShowModal(false)} message={modalMessage} />
    </div>
  );
}
