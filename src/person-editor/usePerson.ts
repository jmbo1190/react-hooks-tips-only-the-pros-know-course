import React, { ReactElement, useState, useEffect } from "react"
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

    // useEffect( () => {
    //     savePerson(person)
    // }, [person])

    useDebounce( () => {
        savePerson(person)
    }, 1000)


    // use 'as const' to make typescript aware that we return an array
    // with exactly 2 elements, one Person and one function,
    // rather than an array with potentially multiple Persons and functions
    return [person, setPerson] as const;
}
