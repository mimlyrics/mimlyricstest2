import axios from "axios";
import {useState, useEffect} from "react";
import { FaUpload } from "react-icons/fa6";
//const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = "https://mimlyricstest-api.onrender.com";
const EditorAlbum2 = () => {
  const [album, setAlbum] = useState([]);
  const [files, setFiles] = useState(null);
  const [file, setFile] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [audios, setAudios] = useState(null);
  const [albumId, setAlbumId] = useState("");
  const [showPostAudio, setShowPostAudio] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  // State - for each audio
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [fileObj, setFileObj] = useState({});
  useEffect(() => {
    const getAlbum = async () => {
        const res = await axios.get(`${BASE_URL}/album`, {headers: {withCredentials: true}});
        console.log(res.data.album);
        setAlbum(res.data.album);
        res.data.album.map(al => {
            setAlbumId(al._id)
            setAudios(al.lyric)
        } )
    }
    getAlbum();
  }, [])

  console.log(audios);

  const postFiles = async () => {
    try {
        const formData = new FormData();
        for(let i=0; i<files.length; i++) {
            formData.append("files", files[i]);
        }
        const res = await axios.put(`${BASE_URL}/album/audios/${albumId}`, formData,
             {headers: {withCredentials: true, "Content-Type": "multipart/formData"}});
        if(res.data) {
            setShowPostAudio(true);
        }
        console.log(res.data);
        
    }catch(err) {
        setErrMsg(err?.data?.message);
        console.log(err?.data);
    }
  }

  console.log("AlbumId: ", albumId);

  const postAlbumPhoto = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("file", file);
        console.log(file);
        const res = await axios.put(`${BASE_URL}/album/edit/${albumId}`, formData, 
            {headers: {withCredentials: true, "Content-Type": "multipart/form-data"}});
        console.log(res.data);
    }catch(err) {
        setErrMsg(err?.data?.message);
    }
  }
  

  const handleClickEdit = (e, filex) => {
    console.log("filex: ", filex);
    setShowEdit(!showEdit)
    setFileObj(filex);
  }

  const updateAlbum = async (e, id) => {
    e.preventDefault();
    console.log("ID: ", id);
    try {
        console.log(text, artist, text);
        const res = await axios.put(`${BASE_URL}/album/edit2/${id}`, {text:text, title:title, artistName: artist}, {headers: {withCredentials: true}})
        console.log(res.data);
    }catch(err) {
        setErrMsg(err?.data?.message);
        console.log(err?.data?.message);
    }
  }
  
  return (
    <div className="mx-1 my-2"> 
        <div className="my-2 bg-indigo-100 py-1 rounded-md shadow text-lg text-center ">
            <h1>2.Album edit</h1>
        </div>
        <div>
            {album.map(al => {
                return (
                    <div key={al._id} className=" my-5 flex space-x-5 ">
                        {al.photo ? 
                            <div className=" ">
                                <img className=" border-2 border-y-4 border-gray-700 " src={al.photo} alt="photo"/> 
                            </div> : 
                            <div className="border shadow rounded-md w-[65vw]  ">
                                <div className=" py-24 mx-11 ">
                                    <label htmlFor="post" className="cursor-pointer bg-slate-100 p-2 hover:bg-slate-300 rounded-md ">Choose Pic</label>
                                    <input id="post" accept="image/*" type="file" onChange={e=>setFile(e.target.files[0])} hidden/>
                                </div>
                            <button onClick={(e)=> postAlbumPhoto(e) } type="submit" className=" my-5 w-96 text-lg p-2 border shadow rounded
                            bg-slate-100 hover:bg-slate-400 hover:translate-y-[1px] ">Save</button>
                            </div>
                        }
                        <div className=" space-y-2">
                            <h1>Id: <span>{al._id}</span></h1>
                            <h1>Album: <span className=" font-semibold">{al.title}</span> </h1>
                            <h1>artist: <span className=" font-semibold ">{al.artistName}</span></h1>
                            <h1>Description: <span className=" font-semibold ">{al.description}</span></h1>
                            <h1>Points: <span className=" font-semibold ">{al.points}</span></h1>
                        </div>
                    </div>
                )
            })}
        </div>   
        {showPostAudio ?
        <div className=" my-2 ">
            <label htmlFor="audiox" className=" cursor-pointer "><FaUpload className="w-7 h-7 text-blue-500"/>Upload Audios</label>
            <input id="audiox" accept="audio/*" type="file" multiple onChange={e=>setFiles(e.target.files)} hidden/>
            <button onClick={() => postFiles()} className=" block border shadow rounded p-2 bg-slate-100 hover:bg-slate-300">Save</button>
        </div> : null}
        <div className="grid grid-cols-1 border shadow rounded-md border-b-8 border-b-blue-700 md:grid-cols-2 space-x-9 md:space-x-11">
            {audios ? audios.map((filex, i) => {
                return (<div key={filex._id} className=" mx-2 my-3 ">
                    <h1 className="my-1 font-semibold text-gray-700"><span className="font-bold">{i+1}.</span> {filex.originalname.substring(0,30)}</h1>
                    <audio className=" my-1 " src={filex.audio} controls/>
                    <button onClick={(e)=>handleClickEdit(e, filex)} type="submit" className=" my-5 w-96 text-lg p-2 border shadow rounded bg-violet-100
                         hover:bg-violet-400 hover:translate-y-[1px] ">Edit
                    </button>
                </div>)
            }) : null}
            </div> 
            {
                showEdit ? 
                <div>
                    <div className=" space-x-4 my-1 ">
                        <label className="font-semibold text-gray-600" htmlFor="">Title</label>
                        <input className=" w-96 border shadow rounded p-2 "
                         type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className=" space-x-4 my-1 ">
                        <label className="font-semibold text-gray-600 " htmlFor="">ArtistName</label>
                        <input className=" w-80 border shadow rounded p-2 "
                         type="text" value={artist} onChange={(e)=>setArtist(e.target.value)}/>
                    </div>
                    <div className=" space-x-5 my-1 " >
                        <label className="font-semibold text-gray-600" htmlFor="">Lyric</label>
                        <textarea className=" w-96 border border-b-8 border-b-red-200 shadow rounded p-2" 
                        value= {text} onChange={(e)=>setText(e.target.value)}  />
                    </div>   
                    <p className="w-[100%] border-b-4 border-b-slate-500 "></p>                
                <div >
                    <button onClick={(e)=>updateAlbum(e,fileObj._id)} type="submit" className=" my-5 w-96 text-lg p-2 border 
                        shadow rounded bg-slate-100 hover:bg-slate-400 hover:translate-y-[1px] ">Save</button>
                </div>
                </div>
                : null
            }
        
    </div>
  )
}

export default EditorAlbum2
