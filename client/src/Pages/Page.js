import { useEffect } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page({title = "", children, className = "" }) {

    useEffect(() =>{
        document.title = title;
    }, [title]);

    return (
        <div className={"page w-100 p-3 " + className} style={{ flexGrow: 1 }}>
            <ToastContainer theme="light" hideProgressBar={true}></ToastContainer>
            {children}
        </div>
    )
}