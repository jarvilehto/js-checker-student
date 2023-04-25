import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useResource, useTest } from "./hooks/apiHooks";
import { isValidUrl } from "./tools/functions";
import AssgResults from "./components/AssgResults";
import PageHeader from "./components/pageHeader";

const MainPage = () => {
  const [assgs] = useResource();
  const [assg, setAssg] = useState("");
  const [url, setURL] = useState("https://users.metropolia.fi/");
  const [res, setRes] = useState(null);

  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const onLoading = () => {
    setRes(null);
    setLoading(!loading);
  };

  const onUrlChange = (name) => {
    setURL(name);
  };

  const onAssgSelect = (name) => {
    if (name == assg) {
      setAssg("");
    } else {
      setAssg(name);
    }
  };

  const onEvaluate = async () => {
    if (!assg || !url) {
      alert("Make sure you have selected an assignment and given a URL");
      return;
    } else {
      if (isValidUrl(url)) {
        const body = { url: url };
        onLoading();
        const b = await useTest(assg, body);
        setRes(b);
      } else {
        alert("Invalid URL!");
        return;
      }
    }
  };

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
    toggleDropdown();
  };

  return (
    <>
      {!loading && (
        <>
          <div className="App">
            <PageHeader />
            <div>
              <h3>
                Begin evaluating your JS/HTML assignments by making sure you
                have uploaded your assignment to
                <a
                  href="https://users.metropolia.fi/~username/folder"
                  target="_blank"
                >
                  {" "}
                  users.metropolia.fi
                </a>{" "}
              </h3>
            </div>
            <div className="assgContainer">
              <p className="pmarginBottom">
                1. Begin by selecting the correspoding assignment with your task
                below
              </p>
              <div className="dropdown">
                <div className="dropdown-header" onClick={toggleDropdown}>
                  {selectedItem
                    ? assgs.find((item) => item._id == selectedItem).name
                    : "Select assignment"}
                  <FaChevronRight
                    className={`fa fa-chevron-right icon ${isOpen && "open"}`}
                  />
                </div>
                <div className={`dropdown-body ${isOpen && "open"}`}>
                  {assgs.map((item) => (
                    <div
                      className="dropdown-item"
                      onClick={(e) => {
                        handleItemClick(e.target.id), onAssgSelect(item.name);
                      }}
                      id={item._id}
                    >
                      <span
                        className={`dropdown-item-dot ${
                          item._id == selectedItem && "selected"
                        }`}
                      >
                        •{" "}
                      </span>
                      {item.name.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
              <p>
                2. Paste the URL to the assignment HTML from your
                users.metropolia.fi
              </p>
              <input
                className="assgInput"
                name="Assignment URL"
                onChange={(event) => onUrlChange(event.target.value)}
                placeholder={url}
              />
              <p>3. Send code for evaluation!</p>
              <button className="assgBtn" onClick={onEvaluate}>
                Send
              </button>
            </div>
          </div>
        </>
      )}

      {loading && <AssgResults res={res} url={url} onLoading={onLoading} />}
    </>
  );
};

export default MainPage;
