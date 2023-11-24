import { useLayoutEffect, useRef, MutableRefObject } from "react";

    // Make return value red-only so it cannot be changed outside of this function
export function useIsMounted(): Readonly <MutableRefObject<boolean>>{
    const isMounted = useRef(false);

    useLayoutEffect(() => {
        isMounted.current = true;

        return( () => {
            isMounted.current = false;
        })
    }, [])

    return isMounted;
}