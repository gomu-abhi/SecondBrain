import type { JSX } from "react";
import { InstaIcon, TweetIcon, VideoIcon } from "./Icons";

interface SideBarItemProps {
    type : string;
    text : React.ReactElement;
    active : string
    onClick? : any
}

const IconMap: Record<string, JSX.Element> = {
    tweets: <TweetIcon className="size-4 text-gray-500" />,
    videos: <VideoIcon className="size-5 text-gray-500" />,
    posts: <InstaIcon className="size-4 text-gray-500" />,
};

const IconMapSpecial: Record<string, JSX.Element> = {
    tweets: <TweetIcon className="size-4 text-black" />,
    videos: <VideoIcon className="size-5 text-black" />,
    posts: <InstaIcon className="size-4 text-black" />,
};


export const SideBarItem = (props : SideBarItemProps) => {
    return <div onClick={props.onClick} className={`${props.type === props.active ? "bg-gray-100 font-semibold text-black" : "text-gray-500"} flex gap-4 pl-4 md:pl-2 items-center justify-start cursor-pointer hover:bg-gray-100 p-2 rounded transition-all duration-200`}>
        {props.type === props.active ? IconMapSpecial[props.type] : IconMap[props.type] } 
        <div>{props.text}</div>
    </div>
}