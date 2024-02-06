import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import queryString from "query-string";
import TimeAgo from "timeago-react";
const Video = ({videoy}) => {
  return (
    <div className="mx-2 my-5  ">
      <Link className="flex" to={`/video/stream?videoId=${videoy._id}`}>
        <div className=" font-medium ">
          <div className="">
            <video 
              className="bg-white rounded-md w-[100vw] md:w-[100vw]" 
              src={videoy.path} alt="X"
            />
          </div>
          <div className="">
            <div>
              <h1>{videoy.title}</h1>  
            </div>
            <div className="flex space-x-3">
              <TimeAgo datetime={videoy.createdAt}/>
              <h1>{videoy.views}</h1>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Video
