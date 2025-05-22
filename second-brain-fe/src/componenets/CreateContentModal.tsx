import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { InstaIcon, TweetIcon, VideoIcon } from "./Icons";
import { Input } from "./Input";

interface ModalProp {
    open: boolean;
    onClose: () => void;
}


// type ContentType = "Video" | "Tweet" | "InstaPost";

//controlled component
export const CreateContentModal = (props: ModalProp) => {
    const [loading, setLoading] = useState(false);
    const [type , setType] = useState("Video");
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    async function NewEntry() {
        setLoading(true);
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const request = {
            title : title,
            link : link,
            type : type
        }
        const token = localStorage.getItem("token");
        await axios.post(`${BACKEND_URL}/content`, request, {
            headers : {
                authorization : token,
            }
        });
        props.onClose();
        setLoading(false);
    }
    
    if (props.open) {
        return <div className="w-screen h-screen bg-black/60 fixed top-0 left-0 flex justify-center items-center">
            <div className="bg-white p-4 flex flex-col rounded-lg items-center">
                <div onClick={props.onClose} className="cursor-pointer self-end">
                    <XMarkIcon className="size-6 hover:bg-red-400 rounded-sm" />
                </div>
                <div className="pb-4 font-semibold text-lg">
                    Add New Content
                </div>
                <div className="flex flex-col gap-4 px-8">
                    <Input ref = {titleRef} placeHolder="Title" />
                    <Input ref = {linkRef} placeHolder="Link" />
                </div>
                <div className="flex items-center gap-2 p-6">
                    <Button startIcon={<VideoIcon className="size-5"/>} text = "" variant = {type === "Video" ? "iconPrimary" : "iconSecondary"} size = "md" onClick={
                        () => {
                            setType("Video");
                        }
                    }/>
                    <Button startIcon={<TweetIcon className="size-5"/>} text = "" variant = {type === "Tweet" ? "iconPrimary" : "iconSecondary"} size = "md" onClick={
                        () => {
                            setType("Tweet");
                        }
                    }/>
                    <Button startIcon={<InstaIcon className="size-5"/>} text = "" variant = {type === "InstaPost" ? "iconPrimary" : "iconSecondary"} size = "md" onClick={
                        () => {
                            setType("InstaPost");
                        }
                    }/>
                </div>
                <Button loading={loading} text="Submit" variant="primary" size="md" onClick={NewEntry} />
            </div>

        </div>
    }
}

