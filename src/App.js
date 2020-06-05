import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TimerInput } from './component/timerInput';
import { Button } from 'react-bootstrap';
import countdownTimer from "./core/dataStructure/new_timerTree";

function App() {
  const [grid, setGrid] = useState([])

  useEffect(() => {
    // let t = { left: 0, top: 0 }
    // let root = document.getElementsByClassName('App')[0]
    // for (let i = 0; i < 10; i++) {
    //   for (let j = 0; j < 10; j++) {
    //     let newDiv = document.createElement('div')
    //     newDiv.setAttribute('class', 'block')
    //     newDiv.style.left = `${t.left}px`
    //     newDiv.style.top = `${t.top}px`
    //     t.left = t.left + 50
    //     newDiv.style.backgroundColor = getRandomColor()
    //     root.appendChild(newDiv)


    //   }
    //   t.left = 0
    //   t.top +=50
    // }

  }, [])

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="App">
      <div className='grid' style={{ display: 'grid', }}>

        <div className='grid-item' style={{ display: 'grid', 'grid-auto-columns': '50px', gridRow: 1, gridColumn: 1 }}>
          <p style={{ display: 'grid', gridRow: 1, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 2 }}>1</p>
          <div className='grid-item' style={{ display: 'grid', 'grid-auto-columns': '50px', gridRow: 2, gridColumn: 3 }}>
            <p style={{ display: 'grid', gridRow: 1, gridColumn: 1 }}>1</p>
            <p style={{ display: 'grid', gridRow: 2, gridColumn: 1 }}>1</p>
            <p style={{ display: 'grid', gridRow: 2, gridColumn: 2 }}>1</p>
            <p style={{ display: 'grid', gridRow: 2, gridColumn: 4 }}>1</p>
            <p style={{ display: 'grid', gridRow: 2, gridColumn: 5 }}>1</p>
            <p style={{ display: 'grid', gridRow: 2, gridColumn: 6 }}>1</p>
            <p style={{ display: 'grid', gridRow: 2, gridColumn: 7 }}>1</p>
            <p style={{ display: 'grid', gridRow: 2, gridColumn: 8 }}>1</p>
            <p style={{ display: 'grid', gridRow: 2, gridColumn: 9 }}>1</p>
            <p style={{ display: 'grid', gridRow: 2, gridColumn: 10 }}>1</p>
            <p style={{ display: 'grid', gridRow: 2, gridColumn: 11 }}>1</p>

            {/* <p className='block' >first</p>
          <p className='block'>second</p>
          <p className='block' >third</p> */}

          </div>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 4 }}>X</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 5 }}>X</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 6 }}>X</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 7 }}>X</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 8 }}>X</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 9 }}>X</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 10 }}>X</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 11 }}>X</p>

          {/* <p className='block' >first</p>
          <p className='block'>second</p>
          <p className='block' >third</p> */}

        </div>

        <div className='grid-item' style={{ display: 'grid', 'grid-auto-columns': '50px', gridRow: 1, gridColumn: 2 }}>
          <p style={{ display: 'grid', gridRow: 1, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 2 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 3 }}>1</p>

          {/* <p className='block' >first</p>
          <p className='block'>second</p>
          <p className='block' >third</p> */}

        </div>
        <div className='grid-item' style={{ display: 'grid', 'grid-auto-columns': '50px', gridRow: 1, gridColumn: 3 }}>
          <p style={{ display: 'grid', gridRow: 1, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 2 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 3 }}>1</p>

          {/* <p className='block' >first</p>
          <p className='block'>second</p>
          <p className='block' >third</p> */}

        </div>
        <div className='grid-item' style={{ display: 'grid', gridTemplateColumns: '50px 50px 50px', gridRow: 1, gridColumn: 4 }}>
          <p style={{ display: 'grid', gridRow: 1, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 2 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 3 }}>1</p>

          {/* <p className='block' >first</p>
          <p className='block'>second</p>
          <p className='block' >third</p> */}

        </div>
        <div className='grid-item' style={{ display: 'grid', gridTemplateColumns: '50px 50px 50px', gridRow: 1, gridColumn: 5 }}>
          <p style={{ display: 'grid', gridRow: 1, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 2 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 3 }}>1</p>

          {/* <p className='block' >first</p>
          <p className='block'>second</p>
          <p className='block' >third</p> */}

        </div>
        <div className='grid-item' style={{ display: 'grid', gridTemplateColumns: '50px 50px 50px', gridRow: 1, gridColumn: 6 }}>
          <p style={{ display: 'grid', gridRow: 1, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 2 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 3 }}>1</p>

          {/* <p className='block' >first</p>
          <p className='block'>second</p>
          <p className='block' >third</p> */}

        </div>
        <div className='grid-item' style={{ display: 'grid', gridTemplateColumns: '50px 50px 50px', gridRow: 1, gridColumn: 7 }}>
          <p style={{ display: 'grid', gridRow: 1, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 2 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 3 }}>1</p>

          {/* <p className='block' >first</p>
          <p className='block'>second</p>
          <p className='block' >third</p> */}

        </div>
        <div className='grid-item' style={{ display: 'grid', gridTemplateColumns: '50px 50px 50px', gridRow: 1, gridColumn: 8 }}>
          <p style={{ display: 'grid', gridRow: 1, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 2 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 3 }}>1</p>

          {/* <p className='block' >first</p>
          <p className='block'>second</p>
          <p className='block' >third</p> */}

        </div>
        <div className='grid-item' style={{ display: 'grid', gridTemplateColumns: '50px 50px 50px', gridRow: 1, gridColumn: 9 }}>
          <p style={{ display: 'grid', gridRow: 1, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 1 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 2 }}>1</p>
          <p style={{ display: 'grid', gridRow: 2, gridColumn: 3 }}>1</p>

          {/* <p className='block' >first</p>
          <p className='block'>second</p>
          <p className='block' >third</p> */}

        </div>
        {/* <div className='position-absolute'>
          <p className='block' style={{}}>something</p>
        </div> */}

      </div>
      <div style={{ display: 'grid', 'grid-auto-columns': '170px'}}>
        <TimerInput id='himanshu' row={1} col={1} />
      </div>
    </div>
  );
}

export default App;
