import {useState, useEffect} from "react";
import queryString from "query-string";
import { FaComment } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import { FaCommentDots } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import {useSelector} from "react-redux";
import TimeAgo from "timeago-react";
import {IoMdSend} from "react-icons/io";
import Picker from "emoji-picker-react";
import {BsEmojiSmileFill} from "react-icons/bs";
import { FaCamera } from "react-icons/fa6";

const VIDEO_URL = "/api/v1/video";
const GET_VIDEO_URL = "/api/v1/video/get";
const SEARCH_VIDEO_URL = "/api/v1/video/search";
const IMAGE_URL = "/api/v1/upload/avatar";
const COMMENT_VIDEO_URL = "/api/v1/comment";
const LIKE_VIDEO_URL = "/api/v1/video/like"
const LIKE_COMMENT_VIDEO_URL = "/api/v1/comment/like";
const COMMENT_RESPONSE_VIDEO_URL = "/api/v1/comment/response"
const LIKE_COMMENT_RESPONSE_VIDEO_URL = "/api/v1/comment/response/like"
const VIEWS_VIDEO_URL = "/api/v1/video/views";
const DOWNLOAD_VIDEO_URL = "/api/v1/video/download";
import axios from "../api/axios";

const VideoStream = () => {
  const [id, setId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [videoy, setVideoy] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artistName, setArtistName] = useState("");
  const [country, setCountry] = useState("");
  const [videos, setVideos] = useState([]);
  const [points, setPoints] = useState("");
  const [downloads, setDownloads] = useState("");
  const [commentv, setCommentv] = useState("");
  const [path, setPath] = useState();
  var [likes, setLikes] = useState(0);
  const [shares, setShares] = useState("");
  const [comments, setComments] = useState([]);
  const [success, setSuccess] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likeToggle, setLikeToggle] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [commentLikes, setCommentLikes] = useState("");
  const [responseCommentLikes, setResponseCommentLikes] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [sVideo, setSVideo] = useState([]);
  const [views, setViews] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [hasLike, setHasLike] = useState(false);
  const [likesArr, setLikesArr] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [runFunc, setRunFunc] = useState(false);
  const [searchvideos, setSearchvideos] = useState(null);
  const [rec, setRec] = useState(null);
  const [showCommentOption, setShowCommentOption] = useState(false);
  
  const handleEmojiPicker =  () => {
    setShowEmojiPicker(!showEmojiPicker);
  }
  const handleEmojiClick = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    let txt = text;
    txt += emoji
    setText(txt);
    console.log("emoji: ", emoji);
    console.log("MMM: ", text);
  }

  const {_id, firstName} = useSelector(state => state.auth.userInfo);
  useEffect (() => {
    const getImage = async () => {
      try {
        const res = await axios.get(`${IMAGE_URL}/${_id}`, {headers: {withCredentials: true}});
        console.log(res.data);
        setImage(res.data.user.avatar);
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }
    getImage();
  }, [_id])

  useEffect(() => {
    const {videoId} = queryString.parse(location.search);
    setId(videoId);
  }, [id])

  /*const toggleComment = async (e,commentId, commentText, commentLikes) => {
    e.preventDefault();
    if(likeToggle) {
        console.log("likeFocus: ", true);
        setCommentLike(parseInt(commentLikes) + 1);
        setLikeToggle(false);
    }else {
        setCommentLike(parseInt(commentLikes) -1 );
        setLikeToggle(true);
    }
    const res = await axios.put(`${BASE_URL}/video/comment/like/${commentId}`, {likes:commentLikes, text: commentText}, {headers: {withCredentials: true}});
    console.log(res.data);
  }*/
  console.log("likes: ", likes);
  console.log("id: ", id);
  console.log("image: ", image);
  useEffect(() => {
    const getVideoById = async () => {
        try {
            const res = await axios.get(`${GET_VIDEO_URL}/${id}`, {headers: {withCredentials: true}});
            setPath(res.data.video.path);
            setTitle(res.data.video.title);
            setViews(res.data.video.views);
            setCreatedAt(res.data.video.createdAt);
            res.data.video.likes ? setLikes(res.data.video.likes.length) : setLikes(0);
            setLikesArr(res.data.video.likes);
            setCommentv(res.data.video.comments);
            setShares(res.data.video.shares);
            setDownloads(res.data.video.download);
            console.log(res.data.video);
            console.log(videoy);
            const answ = likesArr.find(like => like.userId ==_id );
            if(answ) {
              setHasLike(true);
           }else {
              setHasLike(false);
            }
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }
    getVideoById();
  }, [id])

  useEffect(() => {
    const videoViews = async () => {
      try{
        const res = await axios.put(`${VIEWS_VIDEO_URL}/${id}`, {headers: {"Content-Type": "application/json", withCredentials: true}});
        console.log(res.data);
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }
    videoViews();
  }, [id])
  console.log("videoy: ", videoy);

  const downloadVideo = async (e) => {
    e.preventDefault();
    console.log("Heyy");
    try {
        const res = await axios.get(`${DOWNLOAD_VIDEO_URL}/${id}`, {headers: {withCredentials: true}});
        console.log(res.data);
    }catch(err) {
        setErrMsg(err?.data?.message);
    }
  }
  console.log(_id, firstName);

  const commentVideo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(COMMENT_VIDEO_URL, {mediaId: id, userId: _id, text: text, username: firstName, userprofile: image, type: 'video'}, {headers: {withCredentials: true}});
      console.log(res.data);
    }catch(err) {
      setErrMsg(err?.data?.message);
    }
  } 

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`${COMMENT_VIDEO_URL}/${id}`, {headers: {withCredentials: true}});
        setComments(res.data.comments);      
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }
    getComments();
  }, [id])

  const answerComment = async (e,commentId) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${COMMENT_RESPONSE_VIDEO_URL}/${commentId}`, 
      { userId:_id, txt: text, username: firstName, userprofile: image}, {headers: {withCredentials: true}});
      console.log(res.data);
    }catch(err) {
      setErrMsg(err?.data?.message);
    }
  }

  const getCommentResponse = async (e) => {
    e.preventDefault();
    setShowResponse(!showResponse);
  }

  useEffect(() => {
    const similarVideo = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/upload/video/similar/${id}`, {headers: {withCredentials: true}});
        console.log(res.data);
        setSVideo(res.data.sVideo);
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }
    similarVideo();
  }, [id]);

  const likeFunction = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${LIKE_VIDEO_URL}/${id}`, {userId: _id}, { headers: {"Content-Type": "application/json"}});
      console.log(res.data);
      setLikes(res.data.comment.likes.length);   
    }catch(err) {
      setErrMsg(err?.data?.message);      
    }
  }

  const likeCommentFunction = async (e, commentId) => {
    e.preventDefault();
    console.log("Yess");
    try {
      const res = await axios.put(`${LIKE_COMMENT_VIDEO_URL}/${commentId}`, {userId: _id}, { headers: {"Content-Type": "application/json"}});
      console.log(res.data);
      setCommentLikes(res.data.comment.likes.length);
    }catch(err) {
      setErrMsg(err?.data?.message);      
    }
  }

  const likeResponseCommentFunction = async (e, commentId) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${LIKE_COMMENT_RESPONSE_VIDEO_URL}/${commentId}`, {userId: _id}, { headers: {"Content-Type": "application/json"}});
      console.log(res.data);
      setResponseCommentLikes(res.data.comment.response.length);
    }catch(err) {
      setErrMsg(err?.data?.message);      
    }
  }
  
  const SearchVideo = async (e, searchId) => {
    console.log("olllk");
    try {
      const res = await axios.get(`${SEARCH_VIDEO_URL}/${searchId}`,  {headers: {withCredentials: true}});
      //setSearchvideos(res.data.searchvideos);
      console.log(res.data);
      setRec(res.data.searchvideos);
    }catch(err) {
      setErrMsg(err?.data?.message);
    }
  }


  return (
    <div>
    <div className="">
      <div className="">
        <button className="">Recommendations</button>
        <button className=""></button>
      </div>
    </div>
    { searchvideos ? 
         <div className="border shadow rounded-md bg-slate-100 cursor-pointer">
        {rec.map(r => {
          return (<div className=" my-1 mx-3  border-b-2 " key={r._id}>
            <p className="hover:bg-slate-300">{r.title}</p>
          </div>)
        })}
          </div> : <p></p>}
          
           
    <div className="relative py-2 md:w-[100%] ">
      <div className="text-gray-700 text-lg">
        <input value={searchId} onKeyUp={e=>SearchVideo(e, searchId)} 
          onChange={e=>setSearchId(e.target.value)} onKeyDown={e=> e.key === 'Enter' ? 
          SearchVideo(e, searchId) : null} className=" mx-1 border shadow rounded-md p-2 bg-slate-50 w-80" 
          type="text" placeholder="search.." />
        <button onClick={e=>SearchVideo(e, searchId)} type="button" className=" border shadow rounded-md p-2 bg-violet-100 hover:bg-violet-300 w-24 hover:translate-y-[2px]">Search</button>
      </div>

      {/**  ABSOLUTE LEFT FOR SINGLE VIDEO */}
      <div className="">
        <video className=" mx-1 md:w-[48%] md:ml-2 mt-2 md:[50vw] rounded-md " src={path} controls/>
        <h1 className=" mt-2 md:text-xl font-medium mx-2 md:ml-2 text-gray-800">{title}</h1>
     <div className=" md:text-[15px] text-sm mx-2 mt-0 flex space-x-3 ">
      <h1><TimeAgo datetime={createdAt}/></h1>
      <h1 className="font-medium">{views} view(s)</h1>
     </div>
     
     <div className=" mx-2 md:ml-2 flex space-x-14 md:space-x-20">
      {/*Like*/}   
      <FaHeart className=" cursor-pointer w-5 h-5 md:w-7 md:h-7" onClick={(e) => likeFunction(e)}/>   
        <FaComment onClick={() => setShowComments(true)} className=" cursor-pointer w-5 h-5 md:w-7 md:h-7 text-slate-900"/>
        <FaShare className="  w-5 h-5 md:w-7 md:h-7 text-slate-900"/>
        <FaDownload onClick={(e)=>downloadVideo(e)} className="  w-5 h-5 md:w-7 md:h-7 bg-yellow-500 cursor-pointer text-slate-900"/>
     </div>
     <div className=" mx-2 md:ml-2 flex space-x-16 md:space-x-24">
        <p >{likes}</p>
        <Link to={`video/comments/${id}`}>{comments.length} </Link>
        {shares ? <Link to="/video/share">{shares}</Link> : <Link to="/video/share">0</Link>}
        <p>{downloads}</p>
     </div>
    
    { showComments ?
     comments ?       
      <div className="mx-1 md:w-[46vw]">
      <div className="mt-4 bg-violet-100 mb-3">
        <button className=" mx-3 text-lg font-medium text-blue-950 mb-4">Comments</button>
        <button className=" ml-80 md:ml-[70%] mt-2 "><FaX className="w-5 h-5" onClick={() => setShowComments(false)}/></button>
      </div>
      <div className=" mb-3">
        <button className="shadow p-3 bg-slate-100 mr-7 rounded-md hover:bg-slate-400">Most Popular</button>
        <button className="shadow p-3 bg-slate-300 rounded-md hover:bg-slate-500 ">Most recent</button>  
      </div>

      {/** COMMENTS__SECTuo  */}
      {comments.map(comment => {
        return(
          <div className=" md:w-[50vw] mx-2 mb-6 border-b-[1px]" key={comment._id}>
            <div className=" relative flex space-x-9">
              <img className=" absolute top-5 w-5 h-5 md:w-7 md:h-7 rounded-full mr-4" src={comment.userprofile} alt="X"/>      
            </div>
            <div className="ml-11 flex space-x-28 mb-2">
              <h1 className="font-medium">{comment.username}</h1>     
              <BsThreeDots  onClick={e=>answerComment(e, comment._id)} className="w-5 h-5 text-blue-500"/>  
            </div>
            <div className="flex space-x-10">
              <h1 className="ml-11">{comment.text}</h1>   
              <FaHeart onClick={e=>likeCommentFunction(e, comment._id)} className=" w-5 h-5 cursor-pointer text-blue-500 mr-2"/>
              {comment.likes.length > 0 ? <p>{comment.likes.length}</p> : <p>0</p>}
            </div>
            {comment.response.length > 0 ? 
              <p onClick={e=>getCommentResponse(e)} className="cursor-pointer text-blue-500"> {comment.response.length} response(s)</p>
              :null
            }
      {showResponse ? 
        comment.response.map(res => {
          return(
            <div key={res._id} className="flex flex-col py-2 relative space-x-9">
              <img className="absolute top-5 w-5 h-5 md:w-7 md:h-7 rounded-full mr-4" src={res.userprofile}/>
              <h1 className="font-medium">{res.username}</h1> 
            <div className="flex space-x-9">
              <h1 className="">{res.text}</h1>   
              <FaHeart onClick={e=>likeResponseCommentFunction(e, res._id) } className="w-5 h-5 text-blue-500 mr-2"/>
              {res.likes > 0 ? <p>{res.likes.length}</p> : <p>0</p>}
            </div>
            </div>
          )
        }) : null
      }
          </div>
        )
      })}

      <div className="relative mt-5 ">
        <div className="absolute top-2 left-0 ">
          <BsEmojiSmileFill className="w-10 h-6" onClick={handleEmojiPicker}/>
          {showEmojiPicker && <Picker onClick={handleEmojiClick}/>}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? commentVideo(e) : null)}
          placeholder="add a comment..."
          className=" pl-9 py-2 bg-slate-100 text-gray-800 w-[90%] md:w-[65%] h-11 border shadow rounded"
        />
      <button >
        <IoMdSend className="absolute -top-1 ml-1 w-11 h-14 " onClick={e=>commentVideo(e)}/>
      </button>
      </div>
      </div>
    :       
     <div className="relative ml-2  ">
      <h1>Hummm</h1>
        <div className="absolute top-2 left-0 ">
          <BsEmojiSmileFill className="absolute top-6 w-10 h-6" onClick={handleEmojiPicker}/>
          {showEmojiPicker && <Picker onClick={handleEmojiClick}/>}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? commentVideo(e) : null)}
          placeholder="add a comment..."
          className="  px-9 py-2 bg-slate-100 text-gray-900 w-[80%] md:w-[65%] h-11 border shadow rounded"
        />
      <button >
        <IoMdSend className="absolute top-4 ml-1 w-11 h-14 " onClick={e=>commentVideo(e)}/>
      </button>
      </div>
     : null
    }
    </div>      
     
    <h1 className="text-gray-900 font-medium text-lg ml-16">Recommendations</h1>
    <div className=" grid grid-cols-2 lg:grid-cols-none md:absolute md:top-0 md:-mt-5 mt-3">      
      {sVideo ? sVideo.map(video => {
        return (
          <div className=" md:ml-[64vw] mx-2 bg-slate-100" key={video._id}>
            <Link  to={`/video/stream?videoId=${video._id}`}>
              <div>
                <video className=" h-[19vh] md:h-[20vw] rounded-md" src={video.path} alt="X"/>
              </div>
              <div>
                <h1>{video.title}</h1>
              </div>
              <div className="flex space-x-5 my-1">   
                <h1>{video.views}</h1>
                <TimeAgo datetime={video.createdAt}/>
              </div>
            </Link>
          </div>
        )
      }) : null}
      </div>
    </div>
    </div>
  )
}

export default VideoStream;