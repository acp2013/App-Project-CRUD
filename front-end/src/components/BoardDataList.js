import React, { useState, useEffect } from "react";
import DataService from "../services/crud.service";
import { Link } from "react-router-dom";

const BoardDataList = () => {
  const [Data, setData] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveData();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveData = () => {
    DataService.getAll()
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveData();
    setCurrentData(null);
    setCurrentIndex(-1);
  };

  const setActiveData = (Data, index) => {
    setCurrentData(Data);
    setCurrentIndex(index);
  };

  const removeAllData = () => {
    DataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    DataService.findByTitle(searchTitle)
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Data List</h4>
        
        <ul className="list-group">
          {Data &&
            Data.map((Data, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveData(Data, index)}
                key={index}
              >
                {Data.title}
              </li>
            ))}
        </ul>

        <a class="btn btn-sm btn-primary" href="/add" role="button">Entry Data</a>
        <a class="m-2 btn btn-sm btn-danger" href={removeAllData} role="button">Remove All</a>

      </div>
      <div className="col-md-6">
        {currentData ? (
          <div>
            <h4>Data</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentData.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentData.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentData.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/crud/" + currentData.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardDataList;