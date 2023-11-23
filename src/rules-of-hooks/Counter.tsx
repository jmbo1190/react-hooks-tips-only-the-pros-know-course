import React, { ReactElement, useState, useRef, useEffect } from "react"

export function Counter(): ReactElement {
  const [counter, setCounter] = useState(0)

  const button = useRef<HTMLButtonElement>(null);

  useEffect( () => {
    // Automatically focus the button 1 sec after loading
    setTimeout(() => {
      button.current?.focus();
    }, 1000);
  }, [])

  return (
    <div>
      <div>Count: {counter}</div>
      <div>
        <button
          ref={button}
          className="btn btn-primary"
          onClick={() => setCounter(counter + 1)}
        >
          Increment
        </button>
      </div>
    </div>
  )
}
