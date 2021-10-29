import React, { useEffect, useState } from "react";
import axios from "axios";
import {getToken, millisToMinutesAndSeconds,sortHorseList} from '../utils';
import {LoadingComponent} from './Loading';
import './race-dashboard.css';
import {DEFAULT_EMAIL_ID, DEFAULT_PASS, AUTH_TOKEN_KEY} from '../config';
import {setToken} from '../utils';
const API_CALL_INTERVAL = 1000;
const API_STATUS_OK = 200;
const API_STATUS_REQ_TIMEOUT = 204;

const API_STATUS_UNAUTHORIZE = 401;
const API_STATUS_SERVER_TIMEOUT = 503;


// useEffect(() => {     
//   const getData = async () => {  
//     await axios.get('your_url')  
//     .then(res => {  
//       console.log(res)  
//     })  
//     .catch(err => {  
//       console.log(err)  
//     });  
//   }  
//   getData()  
// }, [])


export default class RaceDashboardComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      horseList: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.updateHorseList();
  }

  async fetchHorseInfo() {
    const _token = getToken();
    const res = await axios({
      method: 'get',
      url: '/results',
      headers: { 'Authorization': `Bearer ${_token}` }
    })
    .then(res => {  
      return res;
    }).catch(err => {  
      return  {
          status: 401,
          error: 'Unable to fetch data. Please wait for some time.'
      }
    }); 
    return res;
  }

  setList(val) {
    let _list = [...this.state.horseList];
    let _sortedHorseList = [];
    if(val.event === "start"){
      const _filteredList = _list.filter((horse) => horse.event === val.event);
      _sortedHorseList = [..._filteredList,val];
      //this.setState({ horseList: [..._filteredList,val]  });
    }else{
    if (_list.length) {
      const i = _list.findIndex(item => item.id === val.id);  
      if (i !== -1) {
        _list[i].time = val.time;
        _list[i].event = val.event;
        _sortedHorseList = _list;
        //this.setState({ horseList: _list })
      } else {
        _sortedHorseList = [..._list, val];
        //this.setState({ horseList: [..._list, val] })
      }
    } else {
      _sortedHorseList = [val];
      //this.setState({ horseList: [val] })
    }
  }
  this.setState({ horseList: sortHorseList(_sortedHorseList) });
  }


  async updateHorseList() {
    const info = await this.fetchHorseInfo();

    if(info && info.status){
      if (info.status === API_STATUS_OK) {
        const { time, horse: { id, name }, event } = info.data;
        this.setState({loading:false})
        let t = time;
        if(event === "start") { t  = 0;}
        this.setList({ id, name, time:t, event });
        setTimeout(() => {
          this.updateHorseList();
        }, API_CALL_INTERVAL);
      } else if (info.status === API_STATUS_REQ_TIMEOUT) {
        setTimeout(() => {
          this.updateHorseList();
        }, API_CALL_INTERVAL);
      } else if (info.status === API_STATUS_UNAUTHORIZE) { 
        this.refreshToken();
      } else {
        setTimeout(() => {
          this.updateHorseList();
        }, API_CALL_INTERVAL);
      }
  }else {
    this.refreshToken();
  }

  }

  async refreshToken() {
    const res = await axios({
      method: 'post',
      url: '/auth',
      data: JSON.stringify({
        email: DEFAULT_EMAIL_ID, //or can be replaced by email stored in session
        password: DEFAULT_PASS //or can be replaced by pass stored in session
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.status === API_STATUS_OK) {
      const { token } = res.data;
      setToken(token);
      setTimeout(() => {
        this.updateHorseList();
      }, API_CALL_INTERVAL);
    } else {
      this.refreshToken();
    }
  }

   convertTimeToSec = (time) => {
    if(time === 0) { 
      return '';
    }
    return millisToMinutesAndSeconds(time);
  }

  render() {
    const { horseList } = this.state;
    return (<div className="raceDashboardContainer">
      <div><h1 className="heading">Race Dashboard</h1></div>
      <section>
  <header>
    <div class="col right">No</div>
    <div class="col">Horse</div>
    <div class="col right">Time</div>
    <div class="col">Event status</div>
    
  </header>

  { (this.state.loading) && <LoadingComponent />  }
  {/* { (_horseList.length === 0 && this.state.loading === false) ? <div className="error">Unable to fetch data.. </div> : null }  */}
        {horseList.map(horse =>
        {
          const convertedTime = this.convertTimeToSec(horse.time);
        
          return ( <div class="row">
          <div class="col right">{horse.id}</div>
           <div class="col">{horse.name}</div>
            <div class="col right">{convertedTime}</div>
            <div class="col">{horse.event}</div>
         </div>)
        }  
       )}
</section>
    </div>)
  }
}

