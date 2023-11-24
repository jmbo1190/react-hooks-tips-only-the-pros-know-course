import React, { ReactElement, useState, useEffect, useCallback } from "react"
import localforage from "localforage";

import type { Person } from "../types/person"
import { sleep } from "../utils"
import { useIsMounted } from "../hooks/useIsMounted";
import { useDebounce } from "../hooks/useDebounce";


function savePerson(person: Person | null): void {
    console.log('Saving:', person);
    localforage.setItem('person', person);
  }

export const usePerson = (initialPerson: Person) => {


    // const person = initialPerson
    // const [person, setPerson] = useState(() => initialPerson);
    const [person, setPerson] = useState< Person | null>(null);
        // need to initialize person to null as we are loading the data asynchronously
        // therefore need to tell typescript it can be either null or a Person
        // otherwise it will assume the value is always null

    const isMounted = useIsMounted();
        
    useEffect(() => {
        const getPerson = async () => {
            const person = await localforage.getItem<Person>('person');
            // await sleep(2500);  // make loading artificially slower
            if (isMounted.current) {
                setPerson(person ?? initialPerson);
            }
        }

        getPerson();
    }, [initialPerson, isMounted]);

    // Trigger a component re-render at every specified interval 
    // by changing some (actually unused) state
    // If interval is 500 i.e. shorter than useDebounce interval, saving never occurs
    // If interval is 1500 i.e. larger than useDebounce interval, saving occurs at each re-render
    // because savePerson() has been redefined.  
    // Both unwanted behaviours can be prevented
    // by making a stable saveFn() that is only redefined when person changes.
    const [_now, setNow] = useState(new Date());
    useEffect(() => {
        const handle = setInterval(() => {
            setNow(new Date());
         }, 
         500
         )
     }, [])

    // useEffect( () => {
    //     savePerson(person)
    // }, [person])


    // Note: useDebounce takes a callback function as 1st argument
    //       i.e. the function must not be called yet
    useDebounce( 
        () => { savePerson(person) }
        , 1000)


    // use 'as const' to make typescript aware that we return an array
    // with exactly 2 elements, one Person and one function,
    // rather than an array with potentially multiple Persons and functions
    return [person, setPerson] as const;
}
