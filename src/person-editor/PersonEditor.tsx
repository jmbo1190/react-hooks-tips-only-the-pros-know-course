import React, { ReactElement, useRef, useEffect } from "react"
// import localforage from "localforage";

// import type { Person } from "../types/person"
import { LabeledInput, Loading } from "../components"
import { initialPerson } from "../utils"
import { usePerson } from "./usePerson"

// function savePerson(person: Person | null): void {
//   console.log('Saving:', person);
//   localforage.setItem('person', person);
// }

export function PersonEditor(): ReactElement {
  // const [person, setPerson] = useState(() => initialPerson);
  // const [person, setPerson] = useState< Person | null>(null);
  // const person = initialPerson
  const [person, setPerson] = usePerson(initialPerson)

  const input = useRef<HTMLInputElement>(null);

  useEffect( () => {
      // Automatically focus the button 1 sec after loading
      setTimeout(() => {
        input.current?.focus();
      }, 1000);
    }, [])


  // useEffect(() => {
  //   const getPerson = async () => {
  //     const person = await localforage.getItem<Person>('person');
  //     setPerson(person ?? initialPerson);
  //   }

  //   getPerson();
  // }, []);

  // useEffect( () => {
  //   savePerson(person)
  // }, [person])

  if (!person) {
    return <Loading />
  }

  return (
    <form
      className="person-editor"
      onSubmit={(e) => {
        e.preventDefault()
        alert(`Submitting\n${JSON.stringify(person, null, 2)}`)
      }}
    >
      <h2>Person Editor</h2>
      <LabeledInput
        ref={input}   // Warning: Function components cannot be given refs. Attempts to 
                      // access this ref will fail. Did you mean to use React.forwardRef()?
                      // -> fix this by wrapping LabeledInput component definition 
                      //    with forwardRef()
        label="Firstname:"
        value={person.firstname}
        onChange={(e) => {
          // const newPerson = {
          //   ...person,
          //   firstname: e.target.value,
          // }
          // console.log("Updated person:", newPerson)
          // setPerson(newPerson);
          /*
          In the following code line:
          The ! after ...person is a non-null assertion operator in TypeScript. This is used to tell TypeScript to ignore strict null checks for the person object. It's saying that person should not be null or undefined. This is particularly useful when developers are certain that a particular value won't be null or undefined but TypeScript is unable to infer that.
           the ! operator in this context is used to assert that person is not null or undefined, potentially overriding TypeScript's strict null checks for this specific use case, allowing the spread operation to work without TypeScript raising null-related errors.
           TypeScript would flags the spread operation (...person) as potentially problematic because person is of a type that might be undefined. However, if the developer is certain that person won't be undefined at that specific point, they can use the non-null assertion operator ! to indicate this assurance to TypeScript.
          Note: using ! to bypass TypeScript's strict null checks should be done cautiously and only when developers are absolutely sure that the value won't be null or undefined. Misusing the ! operator can potentially introduce runtime errors if the assumption about the non-nullability of the variable is incorrect.
          */
          setPerson((person) => ({ ...person!, firstname: e.target.value }))
          if (e.target.value === "Ford") {
            setPerson((person) => ({
              ...person!,
              surname: "Prefect",
              address: "Outer space",
              email: "",
              phone: "",
            }))
          }
        }}
      />
      <LabeledInput
        label="Surname:"
        value={person.surname}
        onChange={(e) => {
          // const newPerson = { ...person, surname: e.target.value }
          // console.log("Updated person:", newPerson)
          // setPerson(newPerson);
          setPerson((person) => ({ ...person!, surname: e.target.value }))
        }}
      />
      <LabeledInput
        label="Email:"
        value={person.email}
        onChange={(e) => {
          // const newPerson = { ...person, email: e.target.value }
          // console.log("Updated person:", newPerson)
          // setPerson(newPerson);
          setPerson((person) => ({ ...person!, email: e.target.value }))
        }}
      />
      <LabeledInput
        label="Address:"
        value={person.address}
        onChange={(e) => {
          // const newPerson = { ...person, address: e.target.value }
          // console.log("Updated person:", newPerson)
          // setPerson(newPerson);
          setPerson((person) => ({ ...person!, address: e.target.value }))
        }}
      />
      <LabeledInput
        label="Phone:"
        value={person.phone}
        onChange={(e) => {
          // const newPerson = { ...person, phone: e.target.value }
          // console.log("Updated person:", newPerson)
          // setPerson(newPerson);
          setPerson((person) => ({ ...person!, phone: e.target.value }))
        }}
      />
      <hr />
      <div className="btn-group">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <hr />
      <pre>{JSON.stringify(person, null, 2)}</pre>
    </form>
  )
}
