interface InputInterface {
    placeHolder: string,
    ref? : any,
    type? : string
}

export function Input(props: InputInterface) {
    return <div>
        <input type = {props.type} ref={props.ref} placeholder={props.placeHolder} className="px-4 py-2 border border-gray-300 rounded-md"></input>
    </div>
}