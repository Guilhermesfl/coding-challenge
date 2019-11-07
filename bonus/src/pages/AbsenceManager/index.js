import React, { useEffect, useState } from 'react';
import download from 'downloadjs';
import api from '../../services/api';
import './styles.css';

export default function AbsenceManager({ history }) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const [absences, setAbsences] = useState([]);
  const [crewId] = useState(['352']);
  const [tableView, setTableView] = useState([true]);
  const [userId, setUserId] = useState(params.get('userId') ? params.get('userId') : '');
  const [startDate, setStartDate] = useState(params.get('startDate') ? params.get('startDate') : '');
  const [endDate, setEndDate] = useState(params.get('endDate') ? params.get('endDate') : '');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    getAbsences('filter');
  }, []);

  async function getAbsences(type) {
    let query = '';
    setTableView(true);
    setFilterType('all');
    switch (type) {
      case 'all':
        clearInputs();
        break;
      case 'filter':
        query = '?';
        if (userId) {
          query += `userId=${userId}&`;
        }
        if (startDate && endDate) {
          query += `startDate=${startDate}&endDate=${endDate}&`;
        }
        history.push(query.substr(0, query.length - 1));
        break;
      default:
        clearInputs();
        setFilterType(type);
        setTableView(false);
        query = `/${type}`;
        break;
    }
    const response = await api.get(`/absences${query}`);
    setAbsences(response.data.absences);
  }

  function clearInputs() {
    setUserId('');
    setStartDate('');
    setEndDate('');
  }

  async function handleExport() {
    const res = await api.get('/');
    download(res.data, 'absences.ics');
  }

  function handleSubmit(event) {
    event.preventDefault();
    getAbsences('filter');
  }

  function getPattern() {
    const str1 = '(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9]';
    const str2 = ')|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))';
    return str1 + str2;
  }

  return (
    <div className="absences">
      <h1>Absence Manager</h1>
      <span>CrewID: { crewId }</span>
      <div className="absences__options">
        <div className="absences__filters">
          <div>
            <button onClick={ () => getAbsences('all') }
              className={ `left ${ filterType === 'all' ? 'active' : 'inactive'}` }
            >All</button>
            <button onClick={ () => getAbsences('vacations') }
              className={ (filterType === 'vacations' ? 'active' : 'inactive') }
            >Vacations</button>
            <button onClick={ () => getAbsences('sickness') }
              className={ `right ${ filterType === 'sickness' ? 'active' : 'inactive'}` }
            >Sickness</button>
          </div>
          <div className="divider" />
          <div>
            <form onSubmit={ handleSubmit }>
              <input
                id="member"
                type="text"
                placeholder="Member id"
                value={ userId }
                onChange={ (event) => setUserId(event.target.value) }
              />
              <input
                type="text"
                id="startDate"
                placeholder="Start date: YYYY-MM-DD"
                pattern={ getPattern() }
                value={ startDate }
                onChange={ (event) => setStartDate(event.target.value) }
              />
              <input
                type="text"
                placeholder="End date: YYYY-MM-DD"
                pattern={ getPattern() }
                id="endDate"
                value={ endDate }
                onChange={ (event) => setEndDate(event.target.value) }
              />
              <button type="submit" className="search"> Search </button>
            </form>
          </div>
        </div>
        <div className="absences__export">
          <button onClick={ () => handleExport() }>Export Calendar</button>
        </div>
      </div>
      <div className="absences__table-container">
        { tableView ? (
          <table className="absences__table">
            <tbody>
              <tr>
                <th><span>Member</span></th>
                <th><span>Member ID</span></th>
                <th><span>Type</span></th>
                <th><span>Start Date</span></th>
                <th><span>End Date</span></th>
                <th><span>Member Note</span></th>
              </tr>
              {absences.map((absence) => (
                <tr key={ absence.id }>
                  <td><span>{ absence.userName }</span></td>
                  <td><span>{ absence.userId }</span></td>
                  <td><span>{ absence.type }</span></td>
                  <td><span>{ absence.startDate }</span></td>
                  <td><span>{ absence.endDate }</span></td>
                  <td><span>{ absence.memberNote }</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="absences__table">
            <tbody>
              <tr>
                <th><span>Absences</span></th>
                <th><span>Start Date</span></th>
                <th><span>End Date</span></th>
              </tr>
              {absences.map((absence) => (
                <tr key={ absence.id }>
                  <td><span>{ absence.message }</span></td>
                  <td><span>{ absence.startDate }</span></td>
                  <td><span>{ absence.endDate }</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
