import { useEffect, useRef } from "react";

export function useWillUnmount(fn: () => void) : void {
    const functionRef = useRef(fn);  // passing fn argument here just to make sure 
                                     // the type 'function' will be inferred
    functionRef.current = fn;

    useEffect(() => {
        return () => functionRef.current()
    }, [])  // no dependencies ensures the clean-up function will only be called 
            // just before the component unmounts, not when a dependency value changes

}