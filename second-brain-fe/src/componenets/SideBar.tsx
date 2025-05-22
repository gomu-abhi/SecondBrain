import { DocumentTextIcon } from "@heroicons/react/24/outline"
import { BrainIcon, InstaIcon, TweetIcon, VideoIcon } from "./Icons"
import { SideBarItem } from "./SideBarItem"
import { useContent } from "../hooks/useContent"

interface SideBarInterface {
    contents : any,
    setContents : any,
    refresh : any
}

export const SideBar = (props : SideBarInterface) => {
    const {contents, setContents, refresh} = useContent();

    function ReturnAll() {
        props.setContents(contents);
    }

    function TweetsFilter() {
        // await props.refresh();
        const contentsNew = contents.filter((content : any) => content.type === "Tweet");
        props.setContents(contentsNew);
        // props.refresh()
    }

    function VideosFilter() {
        // await props.refresh();
        const contentsNew = contents.filter((content : any) => content.type === "Video");
        props.setContents(contentsNew);
        // props.refresh()
    }

    function InstaPostFilter() {
        // await props.refresh();
        const contentsNew = contents.filter((content : any) => content.type === "InstaPost");
        props.setContents(contentsNew);
        // props.refresh()
    }
    
    return <div className="h-screen bg-white border-r border-gray-300 min-w-68 fixed left-0 top-0 p-6 text-gray-500">
        <div onClick={ReturnAll} className="cursor-pointer text-2xl font-bold text-gray-800 mb-8 flex gap-4 items-center">
            <BrainIcon className="size-8 text-[#5148dd]"/> <span>Second Brain</span>
        </div>
        <div className="flex flex-col">
            <SideBarItem onClick = {TweetsFilter} startIcon={<TweetIcon className="size-4 text-gray-300" />} text="Tweets" />
            <SideBarItem onClick = {VideosFilter} startIcon={<VideoIcon className="size-5 text-gray-300" />} text="Videos" />
            <SideBarItem onClick = {InstaPostFilter} startIcon={<InstaIcon className="size-4 text-gray-300" />} text="Instagram Posts" />
            <SideBarItem startIcon={<DocumentTextIcon className="size-5 text-gray-500" />} text="Documents" />
        </div>
    </div>
}