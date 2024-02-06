import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import EditorPost from "./EditorPost";
import axios from "../api/axios";
const ROOM_URL ="/api/v1/room"
const Post = () => {
  
  const [rooms, setRooms] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    const getRooms = axios.get(ROOM_URL).then(res=> {
      setRooms(res.data.rooms);
    }).catch(err=> setErrMsg(err?.data?.message));
  }, [])

  return (
    <div>
    <section className="cursor-pointer md:visible mx-1">
        {rooms.map(room => {
            return ( <Link 
                     onClick={e => !room.name ? e.preventDefault() : null} 
                     to={`/post/video/roomName=${room.name}`}
                     className=" md:ml-[78%] md:w-[23%] hidden md:visible md:bg-zinc-100 md:flex md:shadow md:my-3 md:hover:bg-zinc-300 "
                     key={room._id}>
                   <h1  className="mt-4 mr-7 font-medium text-lg text-blue-500 cursor-pointer">{room.name}</h1>
                   {room.logo ? <img className=" mb-2 w-16 h-16 rounded-full" alt="X" src={room.logo}/> : null }
                  </Link> )
        })}  
        <Outlet/>      
    </section>
    </div>
  )
}

export default Post
