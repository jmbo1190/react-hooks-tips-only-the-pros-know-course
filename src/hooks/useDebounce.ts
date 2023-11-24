import { useEffect } from "react"

const useDebounce = (fn : () => void, timeout: number): void => {
    useEffect(() => {
        const handle = setTimeout(fn, timeout);

        return () => clearTimeout(handle);
    }, [fn, timeout]);
}

export {useDebounce};