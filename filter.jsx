import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFiltereddata] = useState([]);
  const [isFiltered, setIsfiltered] = useState(false);

  const [text, setText] = useState('');

  const url = 'https://jsonplaceholder.typicode.com/posts';
  const fetchData = async () => {
    const data = await fetch(url);
    const parsedData = await data.json();
    setData(parsedData);
  };

  const handleOnChange = (evt) => {
    setText(evt.target.value);
  };
  const handleFilter = () => {
    const result = data.filter((cv) => {
      return cv.title.includes(text);
    });
    setIsfiltered(true);
    setFiltereddata(result);
  };
  const Data = isFiltered ? filteredData : data;
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <input onChange={handleOnChange} value={text}></input>
      <button onClick={handleFilter}>Filter</button>
      {Data.length &&
        Data.map((cv) => {
          return (
            <div style={{ padding: 10 }}>
              <div>Title:{cv.title}</div>
              <div>Body:{cv.body}</div>
            </div>
          );
        })}
    </div>
  );
}
