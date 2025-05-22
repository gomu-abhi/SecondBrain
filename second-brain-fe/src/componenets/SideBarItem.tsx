interface SideBarItemProps {
    startIcon : any;
    text : string;
    onClick? : any
}

export const SideBarItem = (props : SideBarItemProps) => {
    return <div onClick={props.onClick} className="flex gap-4 items-center justify-start cursor-pointer hover:bg-gray-100 p-2 rounded transition-all duration-200">
        {props.startIcon} {props.text}
    </div>
}