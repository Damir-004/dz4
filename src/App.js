import React, {useState, useEffect, useRef} from "react";
import './App.css'

let arr = Array(30).fill('').map((index) => 'Items');
const App = () => {
  const [items] = useState(arr)
  const [toShow, setToShow] = useState([])
  const [textAreaHeigth, setTextAreaHeight] = useState()
  const [textAreaWidth, setTextAreaWidth] = useState()
  const [hide, setHide] = useState(true)
  const textArea = useRef(null)
  const innerBlock = useRef(null)
  const observer = useRef(new ResizeObserver((entries) => {
      const {height, width} = entries[0].contentRect;
      setTextAreaHeight(height);
      setTextAreaWidth(width);
  }))
  const showItems = () => {
      let cols = Math.floor(textAreaWidth / 100)
      let rows = Math.floor(textAreaHeigth / 55)
      let count = cols * rows
      setToShow([])
      let toShowItems = items.slice(0, count - 1)
      setToShow(toShowItems)
  }

  useEffect(() => {
      if (!hide) {
          textArea.current.style.height = innerBlock.current.getBoundingClientRect().height+"px"
          textArea.current.style.resize ="none"
      }else{
          textArea.current.style.height = 300 +"px"
          textArea.current.style.resize = "both"
      }
  }, [hide])
  useEffect(() => {
      observer.current.observe(textArea.current);
      showItems()
  }, [textAreaHeigth, textAreaWidth])

  return (
    <div className='box'>
        <textarea ref={textArea}></textarea>
        <div ref={innerBlock} className='bottom_block'>
            {(() => hide ? toShow : items)().map((item) => <span key={item}>{item}</span>)}
            <button onClick={() => setHide(!hide)} className='hideButton'>{hide ? `+${items.length - toShow.length}More...` : `Hide`}</button>
        </div>
    </div>
  )
}
export default App