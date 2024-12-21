import { useEffect, useState } from "react";

const App = () => {

  const [Hours1, setHours] = useState(0)
  const [Minut1, setMinut] = useState(0)
  const [Second1, setSecond] = useState(0)
  const [Disabled, setDisabled] = useState(true)
  const [Interval, setInterval] = useState(null)
  const [Index, setIndex] = useState(1)
  const [Text, setText] = useState([])
  let interval = null

  const restart = () => {
    let prompt1 = prompt("Please enter a number for the hour.");
    let prompt2;
    let prompt3;

    if (prompt1) {
      prompt2 = prompt("Please enter a number for the minute.");
      if (prompt2) {
        prompt3 = prompt("Please enter a number for the second.");
        if (prompt3) {
          alert("Okay, you can start.");
          setHours(Number(prompt1));
          setMinut(Number(prompt2));
          setSecond(Number(prompt3));
        } 
        else {
          alert("Please enter a valid number for seconds.");
        }
      } 
      else {
        alert("Please enter a valid number for minutes.");
      }
    } 
    else {
      alert("Please enter a valid number for hours.");
    }
  };

  useEffect(() => {
    restart()
  }, []);


  const Button2 = () => {
    clearTimeout(interval)
    setDisabled(true)
    setInterval(false)
  }

  const Button3 = () => {
    setIndex(Index + 1)
    interval1()
  }

  const interval1 = () => {
    let text = `${Index + ") " + Hours1 + " : " + Minut1 + " : " + Second1}`
    setText((prevText) => [...prevText, text]);
  }

  const Button4 = () => {
    setHours(0)
    setMinut(0)
    setSecond(0)
    setText([])
    setIndex(1)
    Button2()
    restart()
  }

  const Button1 = () => {
    setInterval(true)
    setDisabled(false)
  }

  useEffect(() => {
    if (Interval) {
      interval = setTimeout(() => {
        setSecond((prevSecond) => {
          if (prevSecond > 0) {
            return prevSecond - 1;
          }
          if (Minut1 > 1) {
            setMinut((prevMinute) => prevMinute - 1);
            return 59;
          }
          if (Hours1 > 0) {
            setHours((prevHour) => prevHour - 1);
            setMinut(59);
            return 59;
          }
          setInterval(null);
          setDisabled(true);
          return 0;
        });
      }, 1000);
    }

    return () => clearTimeout(interval)

  }, [Second1, Interval, Hours1, Minut1])

  useEffect(() => {
    if (Hours1 == 0 && Minut1 == 0 && Second1 == 0) {
      setInterval(null)
      setDisabled(true)
      return () => clearTimeout(interval)
    }
  }, [Hours1, Minut1, Second1])

  if (Hours1 < 1 && Minut1 < 1 && Second1 < 1) {
    restart()
  }

  return (
    <section>
      <div className="container">
        <div className="top">
          <h1>
            <span>Online</span> Stopwatch
          </h1>
          <div>
            <h3 id="hours">
              Hours
              <small>{Hours1 < 10 ? "0" + Hours1 : Hours1}</small>
            </h3>
            <h3 id="minuts">
              Minutes
              <small>{Minut1 < 10 ? "0" + Minut1 : Minut1}</small>
            </h3>
            <h3 id="secend">
              Secondes
              <small>{Second1 < 10 ? "0" + Second1 : Second1}</small>
            </h3>
          </div>
        </div>
        <div className="center">
          <button id="btn1" onClick={Button1} disabled={!Disabled ? true : false}>
            Start
          </button>
          <button id="btn2" onClick={Button2} disabled={Disabled ? true : false}>
            Paused
          </button>
          <button id="btn3" onClick={Button3} disabled={Hours1 === 0 && Minut1 === 0 && Second1 === 0 ? true : false}>
            Interval
          </button>
          <button id="btn4" onClick={Button4}>
            Reset
          </button>
        </div>
        <div className="buttom">
          {Text.map((item, index) => (
            <h3 key={index}>{item}</h3>
          ))}
        </div>
      </div>
    </section>
  )
}

export default App
