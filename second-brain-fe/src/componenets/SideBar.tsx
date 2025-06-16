import { BrainIcon} from "./Icons"
import { SideBarItem } from "./SideBarItem"
import { useContent } from "../hooks/useContent"
import { useContentSecond } from "../hooks/useContentSecond"
import { useState } from "react"

interface SideBarInterface {
    contents : any,
    setContents : any,
    refresh : any,
    shared? : boolean,
    hash? : string
}

export const SideBar = (props : SideBarInterface) => {
    const {contents, setContents, refresh} = props.shared ? useContentSecond(props.hash || "") : useContent();
    const [active, setActive] = useState("");

    function ReturnAll() {
        setActive("");
        props.setContents(contents);
    }

    function TweetsFilter() {
        // await props.refresh();
        setActive("tweets");
        const contentsNew = contents.filter((content : any) => content.type === "Tweet");
        props.setContents(contentsNew);
        // props.refresh()
    }

    function VideosFilter() {
        // await props.refresh();
        setActive("videos");
        const contentsNew = contents.filter((content : any) => content.type === "Video");
        props.setContents(contentsNew);
        // props.refresh()
    }

    function InstaPostFilter() {
        // await props.refresh();
        setActive("posts");
        const contentsNew = contents.filter((content : any) => content.type === "InstaPost");
        props.setContents(contentsNew);
        // props.refresh()
    }
    
    return <div className="h-screen bg-white border-r border-gray-300 md:min-w-68 max-w-32 fixed left-0 top-0  p-6 md:p-6 text-gray-500">
        <div onClick={ReturnAll} className="cursor-pointer pl-2 md:pl-0 text-2xl font-bold text-gray-800 mb-8 flex gap-4 items-center">
            <BrainIcon className="size-8 text-[#5148dd]"/> <span className="hidden md:inline">Second Brain</span>
        </div>
        <div className="flex flex-col">
            <SideBarItem type = "tweets" active={active} onClick = {TweetsFilter} text={<span className="hidden md:inline">Tweets</span>} />
            <SideBarItem type = "videos" active={active} onClick = {VideosFilter} text={<span className="hidden md:inline">Videos</span>} />
            <SideBarItem type = "posts" active={active} onClick = {InstaPostFilter} text={<span className="hidden md:inline">Instagram Posts</span>} />
            {/* <SideBarItem startIcon={<DocumentTextIcon className="size-5 text-gray-500" />} text="Documents" /> */}
        </div>
    </div>
}