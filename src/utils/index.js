import {TOKEN_KEY} from '../config';


export const isLogin = () => {
    return sessionStorage.getItem(TOKEN_KEY) ? true : false;
}

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
    sessionStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.clear();
}


export const millisToMinutesAndSeconds_v1 = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}, ${(seconds < 10 ? "0" : "")}${seconds}s`;
}

export const millisToMinutesAndSeconds = (time) =>{
    let hours = Math.floor(time / 60 / 60);
      let minutes = Math.floor(time / 60) - (hours * 60);
      let seconds = time % 60;
      return `${minutes}, ${seconds}s`;
}

export const sortHorseList = (horseList) => {
    // return horseList.length > 0 && horseList.sort(function(a, b) {
    //  return (  a.time === 0)-(b.time === 0) || +(a.time > b.time)||-(a.time<b.time) || horseList;
    // });

    horseList.sort((a, b) => {
        if (a.time === 0) return 1;        //Return 1 so that b goes first
        if (b.time === 0) return -1;       //Return -1 so that a goes first
        return a.time - b.time;
      });

    return horseList;
};

