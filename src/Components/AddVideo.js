import React, { useState, useEffect } from 'react';
import { addVideo } from '../database/firebase';
import useFetch from '../hooks/useFetch';
import { youtubeDurationToTimeString, validate } from '../helper/util';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  border: 2px solid aqua;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spin} 0.5s linear infinite;
`;

const StyledError = styled.div`
  color: red;
  font-size: 0.8rem;
  position: absolute;
  left: 0;
  top: 100%;
  margin-top: 0.5rem;
`;

const StyledForm = styled.form`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr auto;
  position: relative;
`;

const StyledInput = styled.input`
  padding: 0 0.5rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 2.5rem;
`;

function AddVideo({ addvideo }) {
  const BASEURL = 'https://youtube.googleapis.com/youtube/v3/videos';
  const PART = 'snippet,contentDetails';
  const KEY = 'AIzaSyAaDeAQGh5X6NRD4OK9iUjRlGnCAWPqEpg';

  const [formValue, setFormValue] = useState('');
  const [url, setUrl] = useState('');
  const [validation, setValidation] = useState({
    isFormValid: null,
    errorMsg: '',
    id: '',
  });
  const { data, isLoading } = useFetch(url);

  useEffect(() => {
    let videoObj = {};
    let videoData = data?.items?.[0]?.id ? data.items[0] : null;

    console.log('data', data);

    if (data === null) {
      // on initial mount data will be null
      return;
    }

    if (videoData) {
      videoObj.youtubeId = videoData.id;
      videoObj.id = videoData.id + Date.now(); // enable same video in playlist mutiple times to have different IDs
      videoObj.title = videoData.snippet.title;
      videoObj.timestamp = Date.now();
      videoObj.duration = youtubeDurationToTimeString(
        videoData.contentDetails.duration
      );
      addVideo(videoObj);
      setFormValue(''); // reset the form input value
      setUrl(''); // this enables user to add the same url: one after the other (otherwise useEffect will not fire for the same url)
      setValidation({
        isFormValid: null,
        errorMsg: '',
        id: '',
      });
    } else {
      setValidation((prev) => ({
        ...prev,
        isFormValid: false,
        errorMsg: "error: video with that id doesn't exist",
      }));
    }
  }, [data]);

  function validateInput(str) {
    const validateObj = validate(str);
    console.log('validateObj', validateObj);
    if (validateObj.isValidId) {
      setValidation({
        errorMsg: '',
        isFormValid: true,
        id: validateObj.id,
      });
    } else {
      setValidation((prev) => ({
        ...prev,
        isFormValid: false,
        errorMsg: validateObj.error,
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUrl(`${BASEURL}?part=${PART}&key=${KEY}&id=${validation.id}`);
    console.log('addVideo: url: ', url);
  }

  function handleChange(e) {
    setFormValue(e.target.value);
    console.log('e.target.value', e.target.value);
    console.log('formValue', formValue);
    validateInput(e.target.value);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type='text'
        placeholder='Enter youtube url or id'
        value={formValue}
        onChange={handleChange}
      />
      <StyledButton disabled={!validation.isFormValid}>
        {isLoading ? <StyledSpinner /> : 'Add'}
      </StyledButton>
      {validation.isFormValid === false && (
        <StyledError>{validation.errorMsg}</StyledError>
      )}
    </StyledForm>
  );
}

export default AddVideo;
