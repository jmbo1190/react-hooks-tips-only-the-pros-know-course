import React, { ReactElement, useState, useEffect } from "react"
import localforage from "localforage";

import type { Person } from "../types/person"

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
        
    useEffect(() => {
        const getPerson = async () => {
        const person = await localforage.getItem<Person>('person');
        setPerson(person ?? initialPerson);
        }

        getPerson();
    }, [initialPerson]);

    useEffect( () => {
        savePerson(person)
    }, [person])


    // use 'as const' to make typescript aware that we return an array
    // with exactly 2 elements, one Person and one function,
    // rather than an array with potentially multiple Persons and functions
    return [person, setPerson] as const;
}
