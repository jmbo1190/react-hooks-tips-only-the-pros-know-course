import React, { ReactElement, useState, useRef, useEffect, useLayoutEffect } from "react"

export function Counter(): ReactElement {
  const [counter, setCounter] = useState(0)

  const button = useRef<HTMLButtonElement>(null);

  useEffect( () => {
    // Automatically focus the button 1 sec after loading
    setTimeout(() => {
      button.current?.focus();
    }, 1000);
  }, [])

  // useEffect fires asynchronously - i.e. after some delay
  // Note the default backgroundColor is blue
  useEffect( () => {
    if (button.current) button.current.style.backgroundColor = "green";
  }, []);

  // useLayoutEffect fires synchronously - immediately when compounent is rendered but before it becomes visible
  // Note the default backgroundColor is blue
  useLayoutEffect( () => {
    if (button.current) button.current.style.backgroundColor = "red";
  }, []);

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
