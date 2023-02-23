import { useState, useEffect } from 'react';

export const useLoadingImage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(false), []);

  const style = {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    background: "rgba(255, 255, 255, .3)"
  } 
  
  const Mask = () => {
    return (
      <>
        { !loaded && <span style={style} /> }
      </>
    );
  }

  return { Mask, setLoaded };
}