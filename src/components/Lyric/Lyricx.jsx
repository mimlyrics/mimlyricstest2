import {useState, useEffect} from "react";
import queryString from "query-string";
import Lyric from "./Lyric";
import { BsSearch } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { useMimlyrics } from "../context/AppProvider";
import axios from "../api/axios";
const LYRIC_URL = "/api/v1/lyric";
const SEARCH_LYRIC_URL = "/api/v1/lyric/search";
const Lyricx = () => {
    const [category, setCategory] = useState("");
    const [lyrics, setLyrics] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const [searchLyrics, setSearchLyrics] = useState(null);
    const [searchId, setSearchId] = useState("");  
    const [sLyrics, setSLyrics] = useState([]);
    const [showDescription, setShowDescription] = useState(false);
    useEffect(() => {
        var {categoryx} = queryString.parse(location.search);
        setCategory(categoryx);       
    }, [category]);

    console.log("category: ", category);
    const {isActiveModalNavbar} = useMimlyrics();

    useEffect(() => {
        const getLyrics = async () => {
            try {
                const res = await axios.get(`${LYRIC_URL}/${category}`, {headers: {withCredentials: true}});
                console.log(res.data);
                setLyrics(res.data.lyrics);
            }catch(err) {
                console.log(err);
                setErrMsg(err?.data?.message);
            }
        }
        getLyrics();
    }, [category])


    const searchLyricsF = async () => {
        console.log(searchId);
        try {
            const res = await axios.get(`${SEARCH_LYRIC_URL}/${searchId}`, 
            {headers: {withCredentials: true}});
            console.log(res.data.searchlyrics);
            setSearchLyrics(res.data.searchlyrics);
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }


  return (
    <section className={ isActiveModalNavbar ? "relative -z-50 opacity-60" :  "md:absolute md:top-14 md:ml-[20%] md:w-[53%]"}>
        <div className=' text-lg md:text-xl flex my-1 md:absolute md:my-3 space-x-0 '>
          <input 
           type='text'
           onChange={e=>setSearchId(e.target.value)}
           onKeyDown={e=> e.key === 'Enter' ? searchLyricsF(e) : null}
           placeholder="search..."
           className=' bg-slate-50 mx-2 p-3 border-4 
            shadow rounded-md  w-[90vw] md:w-[48vw] '/>
          <button type="submit" className=" bg-zinc-200 hover:bg-zinc-300 absolute w-12 h-[55px] 
            right-[6%] top-[11%] border rounded-lg md:right-[12px] md:top-[6%] md:w-11 md:h-[53px]">
            <IoMdSearch className=" w-11 h-11 right-[15%] top-[12%] md:right-[8%] md:top-2
             text-gray-400 md:w-11 md:h-11 "/>
          </button>
        </div>

        {!searchLyrics ? 
            <div className=" my-3 md:mt-20 grid max-w-[1200px] grid-cols-2 px-5 lg:grid-cols-3 gap-2 lg:gap-5 ">
                {lyrics.map(lyricy => {
                    return <Lyric key={lyricy._id} lyricy={lyricy} />
                })}
            </div> :
            <div className='my-3 md:mt-20 grid max-w-[1200px] grid-cols-2 px-5 lg:grid-cols-3 gap-2 lg:gap-5'>
                {searchLyrics.map(lyricy => {
                return (
                    <Link key={lyricy._id} to={`/post/lyric/read?lyricId=${lyricy._id}`} 
                        className=' ' > 
                        <div
                          onMouseEnter={()=>setShowDescription(true)}  
                          onMouseLeave={()=>setShowDescription(false)}
                          className=' hover:bg-blue-100 w-[95%] md:w-[95%] bg-blue-50 border rounded-md flex flex-col ring-blue-200 ring-2 '>
                          {lyricy.photo ? <img className=' m-[3%] w-[40vw] md:w-[13vw] my-2' src={lyricy.photo} alt='x'/>
                          : null
                          }
                          <p className=' mx-[5%] font-bold '>{lyricy.title}</p>  
                          {showDescription && lyricy.description ? <p className=' mx-[5%]'>{lyricy.lyric.substring(0,40)}...</p>  : null}
                        </div>
                    </Link> 
                )
                })
                }
            </div>
        }
    </section>
  )
} 

export default Lyricx;
