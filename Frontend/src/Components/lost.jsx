import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import data from "../dummyData/foundDummyData";
import "./Lost.css";

export default function Found() {
  const [search, setSearch] = useState("Search Item");
  const [selectCategory, setSelectCategory] = useState("All");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      selectCategory === "All"
        ? data
        : data.filter((item) => item.itemStatus === selectCategory)
    );
  }, [selectCategory]);

  function handleSearch() {
    console.log(data[1]);
  }

  function sortItem(e) {
    e.preventDefault();
  }

  return (
  
      <div className="container-lost">
        <div className="header-lost">
          <h1 className="found-title">Lost Inventory</h1>
          <h6 className="subtitle">List of items that are lost</h6>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <span className="searchForm">
              <input
                type="text"
                // value={search}
                placeholder={search}
                onChange={(e) => setSearch(e.target.value)}
                id="search"
                className="inputBox"
              />
              <FaSearch onClick={handleSearch} />
            </span>
          </form>
        </div>
        <div className="buttonContainer">
          <button className="btn-lost">
            <img
              src="./src/Assets/image 20.png"
              alt="Specs"
              className="img-btn"
            />
            <h1 className="search-btn">Specs</h1>
          </button>
          <button className="btn-lost">
            <img
              src="./src/Assets/image 21.png"
              alt="Key"
              className="img-btn"
            />
            <h1 className="search-btn">Key</h1>
          </button>
          <button className="btn-lost">
            <img
              src="./src/Assets/image 29.png"
              alt="Bag"
              className="img-btn"
            />
            <h1 className="search-btn">Bag</h1>
          </button>
          <button className="btn-lost">
            <img
              src="./src/Assets/image 31.png"
              alt="Mobile"
              className="img-btn"
            />
            <h1 className="search-btn">Mobile</h1>
          </button>
          <button className="btn-lost">
            <img
              src="./src/Assets/image 37.png"
              alt="Purse"
              className="img-btn"
            />
            <h1 className="search-btn">Purse</h1>
          </button>
        </div>
        <div className="divider"></div>
        <section className="sortForm">
          <form onSubmit={() => sortItem()}>
            <select
              className="selectBox"
              name=""
              id="sortId"
              value={selectCategory}
              onChange={(e) => setSelectCategory(e.target.value)}
            >
              <option value="All">ALL</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="claimed">Claimed</option>
              <option value="unclaimed">Unclaimed</option>
            </select>
          </form>
        </section>
        <div className="itemList">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className={`itemCard ${item.dark ? "dark" : ""}`}
            >
              <section className="img-section">
                <img
                  src="./src/Assets/Rectangle 14.png"
                  className="itemImage"
                  alt="error"
                />
              </section>
              <section className="itemDetails">
                <h1 className="itemTitle">{item.itemName}</h1>
                <p className="itemDesc">{item.itemDesc}</p>
                <section className="itemInfo">
                  <section>
                    <p>Status : {item.itemStatus}</p>
                    <p>Category : {item.itemCategory}</p>
                  </section>
                  <section>
                    <p>Location : {item.itemLocation}</p>
                    <p>Date Lost : {item.itemDate}</p>
                  </section>
                </section>
                <section className="dividerSmall"></section>
                <section className="claimInfo">
                  <section>
                    <p>Claimed By : ABC</p>
                    <p>Email ID : ABC@ncuindia.edu</p>
                    <p>Phone NO : 67867886767</p>
                  </section>
                  <button className="claimButton">Claim</button>
                </section>
              </section>
            </div>
          ))}
        </div>
      </div>
  );
}
