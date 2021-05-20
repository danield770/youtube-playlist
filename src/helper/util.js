export const youtubeDurationToTimeString = (duration) => {
  let hours = '',
    minutes = '',
    seconds = '';
  let temp = duration.replace('PT', '').split('H');
  if (temp.length > 1) {
    hours = `${temp[0]}:`;
  }
  temp = temp.slice(-1)[0].split('M');
  if (temp.length > 1) {
    minutes = temp[0] < 10 ? `0${temp[0]}:` : `${temp[0]}:`;
  } else {
    minutes = '00:';
  }
  temp = temp.slice(-1)[0].split('S');
  if (temp.length > 1) {
    seconds = temp[0] < 10 ? `0${temp[0]}` : `${temp[0]}`;
  } else {
    seconds = '00';
  }
  return hours + minutes + seconds;
};

export const isValidId = (str) => {
  // official regex from https://markmail.org/message/jb6nsveqs7hya5la
  return /[a-zA-Z0-9_-]{11}/.test(str);
};

export const getIdFromInputString = (str) => {
  // If empty string is returned - this implies an invalid url
  // where either 'youtube.com' is absent or there is no v={id} param
  let idFromInput = '';

  // assume that input is a valid youtube id
  if (str.length === 11) return str;
  if (str.includes('youtube.com')) {
    idFromInput = str.split('?v=')[1];
    if (idFromInput === undefined) {
      // no v={id} param
      return '';
    }
    // remove trailing query parameters (Note: the '&' character is guaranteed not to be part of the youtube id)
    if (idFromInput.indexOf('&') !== -1) {
      idFromInput = idFromInput.slice(0, idFromInput.indexOf('&'));
    }
  } else {
    return '';
  }
  // console.log('idFromInput', idFromInput);
  return idFromInput;
};

export const validate = (str) => {
  const res = {};
  let id = getIdFromInputString(str);

  if (!id) {
    res.error = 'error: invalid url';
    res.isValidId = false;
  } else if (!isValidId(id)) {
    res.error = 'error: invalid youtube id';
    res.isValidId = false;
  } else {
    res.isValidId = true;
    res.id = id;
  }
  return res;
};
