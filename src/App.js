import {useRive} from '@rive-app/react-canvas';
import {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const {rive, canvas, RiveComponent} = useRive({
    src: 'skydiving.riv',
    autoplay: true,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   if (rive) {
  //     rive.on('play', () => {
  //       console.log("PLAYING");
  //       setIsPlaying(true);
  //     });

  //     rive.on('pause', () => {
  //       console.log("PAUSED");
  //     });
  //   }
  // }, [rive]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log("PLAYING");
        setIsPlaying(true);
      } else {
        console.log("PAUSING");
        setIsPlaying(false);
      }
    });

    if (canvas) {
      observer.observe(canvas);
    }

    return () => {
      observer.disconnect();
    };
  }, [rive, canvas]);

  return (
    <div className="App">
      <header className="App-header">
        Scroll the animation into view
      </header>
      <div className="animation-container">
        <div className="rive-container">
          <RiveComponent role="img" aria-describedby='skydive-animation-live' />
        </div>
        <div id="skydive-animation-live" aria-live="polite" style={{position: 'relative'}}>
          <div className="visually-hidden" id="skydive-animation-text" style={{display: isPlaying ? 'block' : 'none'}}>
            {isPlaying ? (
              <p>Image of a character skydiving and screaming as they descend through an infinite sky</p>
            ): null}
          </div>
        </div>
        <p className="animation-text">Try skydiving! You'll FALL in love with it.</p>
      </div>
    </div>
  );
}

export default App;
