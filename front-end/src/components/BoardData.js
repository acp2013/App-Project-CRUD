import React, { useState, useEffect } from "react";
import DataService from "../services/crud.service";

const DataCrud = props => {
  const initialDataCrudState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentDataCrud, setCurrentDataCrud] = useState(initialDataCrudState);
  const [message, setMessage] = useState("");

  const getDataCrud = id => {
    DataService.get(id)
      .then(response => {
        setCurrentDataCrud(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDataCrud(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDataCrud({ ...currentDataCrud, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentDataCrud.id,
      title: currentDataCrud.title,
      description: currentDataCrud.description,
      published: status
    };

    DataService.update(currentDataCrud.id, data)
      .then(response => {
        setCurrentDataCrud({ ...currentDataCrud, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateDataCrud = () => {
    DataService.update(currentDataCrud.id, currentDataCrud)
      .then(response => {
        console.log(response.data);
        setMessage("The DataCrud was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteDataCrud = () => {
    DataService.remove(currentDataCrud.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/DataCruds");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentDataCrud ? (
        <div className="edit-form">
          <h4>DataCrud</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentDataCrud.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentDataCrud.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentDataCrud.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentDataCrud.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteDataCrud}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateDataCrud}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a DataCrud...</p>
        </div>
      )}
    </div>
  );
};

export default DataCrud;