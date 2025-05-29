import { useEffect, useState } from 'react';
import { ShareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { CreateContentModal } from '../componenets/CreateContentModal';
import { Button } from '../componenets/Button';
import { Card } from '../componenets/Card';
import { SideBar } from '../componenets/SideBar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useParams } from 'react-router-dom';
import { useContentSecond } from '../hooks/useContentSecond';

export const SecondDashboard = () => {
    const { hash } = useParams();
    // console.log(hash);
    if (!hash) {
        throw new Error("Hash is not defined");
    }
    const [modalOpen, setModalOpen] = useState(false);
    const {contents, setContents, refresh} = useContentSecond(hash);
    useEffect(() => {
        refresh()
    }, [modalOpen])
    return (
        <>
            <CreateContentModal open={modalOpen} onClose={() => {
                setModalOpen(false);
            }} />
            <div>
                <SideBar hash = {hash} shared = {true} contents = {contents} setContents = {setContents} refresh={refresh}/>
                <div className="min-h-screen max-w-screen bg-[#f8fafc] p-4">
                    {/* <div className='flex gap-4 justify-end pb-4'>
                        <Button variant="secondary" size="md" text="Share Brain" onClick={async () => {
                            const response = await axios.post(`${BACKEND_URL}/brain/share`, {
                                share : true
                            }, {
                                headers : {
                                    authorization : localStorage.getItem("token")
                                }
                            });
                            const shaerUrl = `http://localhost:5173/share/${response.data.hash}`;
                            alert(shaerUrl);
                         }} startIcon={<ShareIcon className='size-4' />} />
                        <Button variant="primary" size="md" text="Add Content" onClick={() => {
                            setModalOpen(true);
                        }} startIcon={<PlusIcon className='size-4' />} />
                    </div> */}
                    <div className='columns-1 lg:columns-2 xl:columns-3 ml-66 '>
                        {contents.map(({type, link, title, _id})  => {
                            return <Card trashDisabled = {true} title = {title} type = {type} link = {link} id = {_id} modalOpen = {modalOpen} refresh = {refresh}/>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}