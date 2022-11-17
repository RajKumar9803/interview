import React, { useState, useEffect } from 'react';
import './style.css';
import data from './data.json';

export default function App() {
  const [employeedata, setEmployeeData] = useState(data);
  const [teamdata, setTeamsData] = useState([]);

  const addFlag = () => {
    const result = data.reduce((acc, cv) => {
      cv.isAdded = false;
      acc.push(cv);
      return acc;
    }, []);
    setEmployeeData(result);
  };

  useEffect(() => {
    addFlag();
  }, []);

  const handleaddClick = (id) => {
    const Arremp = [...employeedata];
    const result = Arremp.reduce((acc, cv) => {
      if (cv.id === id) {
        cv.isAdded = true;
      }
      acc.push(cv);
      return acc;
    }, []);
    const Arrteams = [...teamdata];
    const addedToTeam = Arremp.filter((cv) => cv.id === id);
    Arrteams.push(addedToTeam[0]);
    setEmployeeData(result);
    setTeamsData(Arrteams);
  };
  const handleRemoveClick = (id) => {
    const Arremp = [...employeedata];
    const result = Arremp.reduce((acc, cv) => {
      if (cv.id === id) {
        cv.isAdded = false;
      }
      acc.push(cv);
      return acc;
    }, []);
    const Arrteams = [...teamdata];
    Arrteams.forEach((cv, index) => {
      if (cv.id === id) {
        Arrteams.splice(index, 1);
      }
    });
    setEmployeeData(result);
    setTeamsData(Arrteams);
  };

  const handleSort = () => {
    const result = teamdata.sort((a, b) => a.age - b.age).map((cv) => cv);

    setTeamsData(result);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {employeedata &&
            employeedata.map((cv) => {
              return (
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  key={cv.id}
                >
                  <div>{cv.first_name}</div>
                  <div>{cv.age}</div>
                  {!cv.isAdded && (
                    <div
                      onClick={() => {
                        handleaddClick(cv.id);
                      }}
                    >
                      add
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        <div>
          <div onClick={handleSort}>sort </div>
          {teamdata &&
            teamdata.map((cv) => {
              return (
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  key={cv.id}
                >
                  <div>{cv.first_name}</div>
                  <div>{cv.age}</div>
                  <div
                    onClick={() => {
                      handleRemoveClick(cv.id);
                    }}
                  >
                    remove
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
