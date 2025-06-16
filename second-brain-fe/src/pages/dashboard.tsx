import { useEffect, useState } from 'react';
import { ShareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { CreateContentModal } from '../componenets/CreateContentModal';
import { Button } from '../componenets/Button';
import { Card } from '../componenets/Card';
import { SideBar } from '../componenets/SideBar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useLocation } from "react-router-dom"
import { HeyIcon } from '../componenets/Icons';
import toast from 'react-hot-toast';

type LocationState = {
    username: string;
}

export const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, setContents, refresh } = useContent();
    const [sortedContents, setSortedContents] = useState([]);
    const [sortOrder, setSortOrder] = useState("oldest");
    const location = useLocation();
    const [shareLink, setShareLink] = useState("");

    const handleShare = async () => {
        const response = await axios.post(`${BACKEND_URL}/brain/share`, {
            share: true,
        }, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        });

        const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
        setShareLink(shareUrl);
        navigator.clipboard.writeText(shareUrl).then(() => {toast.success('Link copied to clipboard!');})
    };

    const handleSortChange = (e: any) => {
        setSortOrder(e.target.value);
    };
    useEffect(() => {
        sortOrder === "newest" ? setSortedContents([...contents].reverse()) : setSortedContents(contents);
    }, [sortOrder, contents])
    const { username } = location.state as LocationState;
    useEffect(() => {
        refresh()
    }, [modalOpen])
    return (
        <>
            <CreateContentModal open={modalOpen} onClose={() => {
                setModalOpen(false);
            }} />
            <div>
                <SideBar contents={contents} setContents={setContents} refresh={refresh} />
                <div className="min-h-screen max-w-screen bg-[#f8fafc] p-4">
                    <div className='flex justify-between items-center'>
                        <div className='ml-22 md:ml-66 flex justify-begin gap-2 items-center font-medium text-lg px-4'>
                            <HeyIcon className="size-5" />
                            <span>Hello, {username}</span>
                        </div>
                        <div className="flex justify-end text-md">
                            <label className="mr-2 font-semibold text-gray-600">Sort by:</label>
                            <select
                                className="outline outline-gray-300 hover:outline-gray-700 hover:bg-white rounded px-2 appearance-none py-1 text-sm"
                                value={sortOrder}
                                onChange={handleSortChange}
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-4 justify-end py-4 items-start'>
                        <div className="flex flex-col items-end gap-2">
                            <Button
                                variant="secondary"
                                size="md"
                                text="Share Brain"
                                onClick={handleShare}
                                startIcon={<ShareIcon className='size-4' />}
                            />
                        </div>
                        <Button variant="primary" size="md" text="Add Content" onClick={() => {
                            setModalOpen(true);
                        }} startIcon={<PlusIcon className='size-4' />} />
                    </div>
                    <div className='columns-1 lg:columns-2 xl:columns-3 md:ml-66 ml-24 '>
                        {sortedContents.map(({ type, link, title, _id }) => {
                            return <Card title={title} type={type} link={link} id={_id} modalOpen={modalOpen} refresh={refresh} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}