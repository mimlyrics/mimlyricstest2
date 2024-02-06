import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import queryString from "query-string";
const VIDEO_URL = "/api/v1/video";
const SEARCH_VIDEO_URL = "/api/v1/video/search";
const EditorVideo = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory]  = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artistName, setArtistName] = useState("");
  const [country, setCountry] = useState("");
  const [videos, setVideos] = useState([]);
  const [points, setPoints] = useState("");
  const [famous, setFamous] = useState(false);
  const [file, setFile] = useState();
  const [showVideo, setShowVideo] = useState(false);
  const {userInfo} = useSelector(state => state.auth);
  const [searchId, setSearchId] = useState("");
  const [video, setVideo] = useState("");
  const [searchVideos, setSearchVideos] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [Hi, setHi] = useState("");

    useEffect(() => {
        var {categoryx} = queryString.parse(location.search);
        setCategory(categoryx);       
    }, [category]);

    console.log(category);

    useEffect(() => {
        const getLyricsVideo = async () => {
            try {
                const lyrics = await axios.get(`${VIDEO_URL}/${category}`, {headers: {withCredentials: true}});
                console.log(lyrics);
                setVideos(lyrics.data.videos);
                console.log(videos);
            }catch(err) {
                console.log(err);
            }
        }
        getLyricsVideo();
    }, [category])

    console.log(category);

  const searchVideo = async (e, searchId) => {
      e.preventDefault();
      try {
        const res = await axios.get(`${SEARCH_VIDEO_URL}/${searchId}`, {headers: {withCredentials: true}});
        console.log(res.data);
        setSearchVideos(res.data.searchvideos);
      }catch(err) {
        setErrMsg(err?.data?.message);
        console.log(err?.data);
      }
  }

  const deleteVideo = async (videoId) => {
    try {
      await axios.delete(`${VIDEO_URL}/${videoId}`, {headers: {withCredentials: true}});
      setVideos(videos.filter(video => video._id !== videoId));
    }catch(err) {
      setErrMsg(err?.data?.message);
      console.log(err?.data);
    }
  }

  return (
    <>
    { searchVideos ?
    <section className=" mt-7 md:absolute md:top-16 md:w-[50%] mx-1 md:ml-48 lg:ml-64">
        <h1 className="text-center font-bold py-3 text-blue-600 bg-indigo-200">videos found</h1>
        <button className="p-3 bg-indigo-300 rounded-md" onClick={()=>setSearchVideos(null)}>Show All Data</button>
        <ul className="md:hidden">
            {searchVideos.map(video => {
                return (
                    <div key={video._id} className="border-b-2 text-[17px] font-medium py-3">
                        <p className="flex text-gray-800">Artist Name: <p className="ml-2 text-blue-900">{video.artistName}</p></p>
                        <p className="flex text-gray-800">Title: <p className="ml-2 text-blue-900">{video.title}</p></p>
                        <p className="flex text-gray-800">Created At: <p className="ml-2 text-blue-900">{video.createdAt}</p></p>
                        <p className="flex text-gray-800">Updated At: <p className="ml-2 text-blue-900">{video.updatedAt}</p></p>
                        <p className="flex text-gray-800">Description: <p className="ml-2 f text-blue-900">{video.description}</p></p>
                        <p className="flex text-gray-800">Country: <p className="ml-2 text-blue-900">{video.country}</p></p>
                        <p className="flex text-gray-800">Famous: <p className="ml-2 text-blue-900">{video.famous}</p></p>
                        <p className="flex text-gray-800">Points: <p className="ml-2 text-blue-900">{video.points}</p></p>                        
                        <p className="flex text-gray-800">Likes: <p className="ml-2 text-blue-900"></p></p>
                        <p className="flex text-gray-800">Size: <p className="ml-2 text-blue-900">{video.size}</p></p>
                        <p className="flex text-gray-800">Translated version: <p className="ml-2 text-blue-900">{video.translatedVersion}</p></p>                        
                        <p className="flex text-gray-800">Downloads: <p className="ml-2 text-blue-900">{video.downloads}</p></p>    
                        <p className="flex text-gray-800">Shares: <p className="ml-2 text-blue-900">{video.shares}</p></p>
                        <p className="flex text-gray-800">Comments: <p className="ml-2 text-blue-900">{video.comments}</p></p>    
                        <p className="flex text-gray-800">Category: <p className="ml-2 text-blue-900">{video.category}</p></p>
                        <div className="mt-3">
                            <button><Link onClick={e=> !video._id ? e.preventDefault(): null}  to= {`/post/editor/video/edit?videoId=${video._id}`}  className=" p-3 border shadow rounded-lg bg-green-300" >Edit</Link> </button>
                            <button onClick={()=>deleteVideo(video._id)} className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >Delete</button>
                        </div>                        
                    </div>
                )
            })}          
        </ul>

            <div className="mr-7">
             {searchVideos.map(video=> {
                return (
                  <div key={video._id} className="border-b-2 text-[17px] font-medium py-3">
                    <div className=" py-8">
                    <p className="flex text-gray-800">Artist Name: <p className="ml-2 text-blue-900">{video.artistName}</p></p>
                    <p className="flex text-gray-800">Title: <p className="ml-2 text-blue-900">{video.title}</p></p>
                    <p className="flex text-gray-800">Created At: <p className="ml-2 text-blue-900">{video.createdAt}</p></p>
                    <p className="flex text-gray-800">Updated At: <p className="ml-2 text-blue-900">{video.updatedAt}</p></p>
                    <p className="flex text-gray-800">Description: <p className="ml-2 f text-blue-900">{video.description}</p></p>
                    <p className="flex text-gray-800">Country: <p className="ml-2 text-blue-900">{video.country}</p></p>
                    <p className="flex text-gray-800">Category: <p className="ml-2 text-blue-900">{video.category}</p></p>
                    <p className="flex text-gray-800">Famous: <p className="ml-2 text-blue-900">{video.famous}</p></p>
                    </div>
                    <div className="">
                    <p className="flex text-gray-800">Size: <p className="ml-2 text-blue-900">{video.size}</p></p>
                    <p className="flex text-gray-800">Points: <p className="ml-2 text-blue-900">{video.points}</p></p>                        
                    <p className="flex text-gray-800">Likes: <p className="ml-2 text-blue-900"></p></p>
                    <p className="flex text-gray-800">Translated version: <p className="ml-2 text-blue-900">{video.translatedVersion}</p></p>                        
                    <p className="flex text-gray-800">Downloads: <p className="ml-2 text-blue-900">{video.downloads}</p></p>    
                    <p className="flex text-gray-800">Shares: <p className="ml-2 text-blue-900">{video.shares}</p></p>
                    <p className="flex text-gray-800">Comments: <p className="ml-2 text-blue-900">{video.comments}</p></p>    
                    </div>
                    <div className="mt-3">
                        <button><Link onClick={e=> !video._id ? e.preventDefault(): null}  to= {`/post/editor/video/edit?videoId=${video._id}`}  className=" p-3 border shadow rounded-lg bg-green-300" >Edit</Link> </button>
                        <button onClick={()=>deleteVideo(video._id)} className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >Delete</button>
                    </div>                        
                  </div>      
                )
             })}
            </div>   
    </section>
    :
    <section className=" md:absolute md:top-16 md:w-[60%] mx-1 md:ml-52 lg:ml-64">
        <div className="my-1 md:w-[50%]">
            <h1 className=" text-lg md:text-xl text-center bg-blue-200 font-semibold">Editor video's Management DashBoard</h1>
        </div>

        <div>
            <input onKeyDown={(e)=>(e.key === "Enter" ? searchVideo(e,searchId) : null)} placeholder="firstName/lastName/phone/email" className="w-96 text-lg p-2 h-11 bg-indigo-200 text-gray-700" type="text" value={searchId} onChange={e=>setSearchId(e.target.value)}/>
            <button  onClick={(e) => searchVideo(e, searchId)} className="h-11 p-2 ml-1 text-lg bg-blue-300 rounded-md text-gray-700 hover:bg-blue-500 hover:translate-y-[1px] ">Search</button>
        </div>

        <div className="my-3">
            <Link  to= "/post/editor/video/add"  className=" w-11 h-4 p-2 border shadow rounded-lg bg-blue-500" >Add Video</Link>
        </div>

        <div className="font-bold text-lg ">
            <h1>Video Info</h1>
        </div>

        <ul className="md:hidden">
            {videos.map(video => {
                return (
                    <div key={video._id} className="border-b-2 text-[17px] font-medium py-3">
                        <p className="flex text-gray-800">Artist Name: <p className="ml-2 text-blue-900">{video.artistName}</p></p>
                        <p className="flex text-gray-800">Title: <p className="ml-2 text-blue-900">{video.title}</p></p>
                        <p className="flex text-gray-800">Created At: <p className="ml-2 text-blue-900">{video.createdAt}</p></p>
                        <p className="flex text-gray-800">Updated At: <p className="ml-2 text-blue-900">{video.updatedAt}</p></p>
                        <p className="flex text-gray-800">Description: <p className="ml-2 f text-blue-900">{video.description}</p></p>
                        <p className="flex text-gray-800">Country: <p className="ml-2 text-blue-900">{video.country}</p></p>
                        <p className="flex text-gray-800">Famous: <p className="ml-2 text-blue-900">{video.famous}</p></p>
                        <p className="flex text-gray-800">Points: <p className="ml-2 text-blue-900">{video.points}</p></p>                        
                        <p className="flex text-gray-800">Likes: <p className="ml-2 text-blue-900"></p></p>
                        <p className="flex text-gray-800">Size: <p className="ml-2 text-blue-900">{video.size}</p></p>
                        <p className="flex text-gray-800">Translated version: <p className="ml-2 text-blue-900">{video.translatedVersion}</p></p>                        
                        <p className="flex text-gray-800">Downloads: <p className="ml-2 text-blue-900">{video.downloads}</p></p>    
                        <p className="flex text-gray-800">Shares: <p className="ml-2 text-blue-900">{video.shares}</p></p>
                        <p className="flex text-gray-800">Comments: <p className="ml-2 text-blue-900">{video.comments}</p></p>    
                        <p className="flex text-gray-800">Category: <p className="ml-2 text-blue-900">{video.category}</p></p>
                        <div className="mt-3">
                            <button><Link onClick={e=> !video._id ? e.preventDefault(): null}  to= {`/post/editor/video/edit?videoId=${video._id}`}  className=" p-3 border shadow rounded-lg bg-green-300" >Edit</Link> </button>
                            <button onClick={()=>deleteVideo(video._id)} className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >Delete</button>
                        </div>                        
                    </div>
                )
            })}          
        </ul>
        
       
          <div className=" mt-7 md:visible invisible mr-7 ">
            {videos.map(video=> {
              return (
                  <div key={video._id} className="border-b-2 text-[17px] font-medium py-3">
                    <div className=" py-8">
                    <p className="flex text-gray-800">Artist Name: <p className="ml-2 text-blue-900">{video.artistName}</p></p>
                    <p className="flex text-gray-800">Title: <p className="ml-2 text-blue-900">{video.title}</p></p>
                    <p className="flex text-gray-800">Created At: <p className="ml-2 text-blue-900">{video.createdAt}</p></p>
                    <p className="flex text-gray-800">Updated At: <p className="ml-2 text-blue-900">{video.updatedAt}</p></p>
                    <p className="flex text-gray-800">Description: <p className="ml-2 f text-blue-900">{video.description}</p></p>
                    <p className="flex text-gray-800">Country: <p className="ml-2 text-blue-900">{video.country}</p></p>
                    <p className="flex text-gray-800">Category: <p className="ml-2 text-blue-900">{video.category}</p></p>
                    <p className="flex text-gray-800">Famous: <p className="ml-2 text-blue-900">{video.famous}</p></p>
                    </div>
                    <div className="">
                    <p className="flex text-gray-800">Size: <p className="ml-2 text-blue-900">{video.size}</p></p>
                    <p className="flex text-gray-800">Points: <p className="ml-2 text-blue-900">{video.points}</p></p>                        
                    <p className="flex text-gray-800">Likes: <p className="ml-2 text-blue-900"></p></p>
                    <p className="flex text-gray-800">Translated version: <p className="ml-2 text-blue-900">{video.translatedVersion}</p></p>                        
                    <p className="flex text-gray-800">Downloads: <p className="ml-2 text-blue-900">{video.downloads}</p></p>    
                    <p className="flex text-gray-800">Shares: <p className="ml-2 text-blue-900">{video.shares}</p></p>
                    <p className="flex text-gray-800">Comments: <p className="ml-2 text-blue-900">{video.comments}</p></p>    
                    </div>
                    <div className="mt-3">
                        <button><Link onClick={e=> !video._id ? e.preventDefault(): null}  to= {`/post/editor/video/edit?videoId=${video._id}`}  className=" p-3 border shadow rounded-lg bg-green-300" >Edit</Link> </button>
                        <button onClick={()=>deleteVideo(video._id)} className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >Delete</button>
                    </div>                        
                  </div>                  
                )
             })}
          </div>
    </section> }
    </>
  )
  }
export default EditorVideo;