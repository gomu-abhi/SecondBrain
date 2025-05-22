import { DocumentTextIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { InstaIcon, TweetIcon } from "./Icons";
import { VideoIcon } from "./Icons";
import { InstagramEmbed, XEmbed, YouTubeEmbed } from "react-social-media-embed";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CardProps {
    type : "Document" | "Tweet" | "Video" | "InstaPost";
    title : string;
    link : string;
    modalOpen : boolean;
    id : any;
    refresh : any;
}

const IconVariant = {
    "Document" : <DocumentTextIcon className="size-4"/>,
    "Tweet" : <TweetIcon className="size-4"/>,
    "Video" : <VideoIcon className="size-5"/>,
    "InstaPost" : <InstaIcon className="size-4"/>
}

export const Card = (props : CardProps) => {

    async function DeleteContent() {
        const contentId = props.id;
        await axios.delete(`${BACKEND_URL}/content`, {
            headers: {
              authorization : localStorage.getItem("token")
            },
            data: {
              contentId: contentId
            }
          });
        props.refresh();
    }

    return <div className="break-inside-avoid bg-white rounded-lg p-4 mx-2 mb-4 border border-gray-200 min-h-48 min-w-90" >
        <div className="flex justify-between">
            <div className="flex items-center gap-2 font-semibold">
                {IconVariant[props.type]}
                {props.title}
            </div>
            <div className="flex items-center gap-2">
                <div>
                    <a href = {props.link} target="_blank">
                        <ShareIcon className="size-6 text-gray-500 hover:bg-gray-100 transition-all p-1 rounded"/>
                    </a>
                </div> 
                <TrashIcon onClick={() => {
                    DeleteContent()
                }} className="cursor-pointer size-6 text-gray-500 hover:text-black hover:bg-red-500 transition-all p-1 rounded"/>
            </div>
        </div>
        <div className="mt-4">
            {props.type === "Video" && <YouTubeEmbed url = {props.link} width={325} height={200}></YouTubeEmbed>}
            {props.type === "Tweet" && <XEmbed url={props.link} width={325} /> }
            {!props.modalOpen && props.type === "InstaPost" && <InstagramEmbed url={props.link} width={328}></InstagramEmbed>}
        </div>
    </div>
}