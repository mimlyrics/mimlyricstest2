import {useState, useEffect} from "react";
import Video from "./Video";
import queryString from "query-string";
import axios from "../api/axios";
const VIDEO_URL = "/api/v1/video";
const SEARCH_VIDEO_URL = "/api/v1/video/search";
const LyricsVideo = () => {
    const [category, setCategory] = useState("");
    const [videos, setVideos] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [searchvideos, setSearchvideos] = useState(null);
    const [rec, setRec] = useState(null);
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

  const SearchVideo = async (e, searchId) => {
    console.log("olllk");
    try {
      const res = await axios.get(`${SEARCH_VIDEO_URL}/${searchId}`,  {headers: {withCredentials: true}});
      setSearchvideos(res.data.searchvideos);
      console.log(res.data);
      setRec(res.data.searchvideos);
    }catch(err) {
      setErrMsg(err?.data?.message);
    }
  }

  return (
    <section className=" md:absolute md:top-20 md:ml-[20%] md:w-[53%]">
    {searchvideos ? 
    <div className=" ">
        <div className="mx-3">
            <input type="text" placeholder="search..."
                value={searchId} 
                onChange={e=>setSearchId(e.target.value)}
                onKeyDown={e=>SearchVideo(e, searchId)}
                onKeyUp={e=>SearchVideo(e, searchId)}
            className=" mx-3 border rounded p-3 mr-2"/>
            <button onClick={SearchVideo} type="button" className="p-3  bg-indigo-100 hover:bg-indigo-200">Search</button>
        </div>
        {searchvideos.map(videoy => {
            return <Video key={videoy._id} videoy={videoy} />
        })}.
    </div>
    : 
    <div className=" ">
        <div className="mx-3">
            <input type="text" placeholder="search..."
                value={searchId} 
                onChange={e=>setSearchId(e.target.value)}
                onClick={e=>SearchVideo(e, searchId)}
                onKeyDown={e=>e.key === 'Enter' ? SearchVideo(e, searchId) : null}
            className=" mx-3 border rounded p-3 mr-2"/>
            <button type="button" className="p-3  bg-indigo-100 hover:bg-indigo-200">Search</button>
        </div>

        <div className=" my-1 mx-4 border shadow bg-slate-50 rounded-md">
        {rec ? 
           rec.map(r=> {
            return (
                <div key={r._id} className="mx-1 ">
                    <input onClick={e=>setSearchId(e, searchId)} placeholder={r.title} className=" mx-2  p-2 border-b-2 hover:bg-slate-200"/>
                </div>
            )
           }) : null}
        </div>

        <div className=" grid grid-cols-1 lg:grid-cols-2">
        {videos.map(videoy => {
            return <Video key={videoy._id} videoy={videoy} />
        })}
        </div>
    </div>    
    }
    </section>

  )
} 

export default LyricsVideo;