import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { FaUpload } from "react-icons/fa6";
import {countries} from "country-data-list";
import queryString from "query-string";
import axios from "../api/axios";
const ROOM_URL = "/api/v1/room";
const GET_LYRIC_URL = "/api/v1/lyric/get";
const EDIT_LYRIC_URL = "/api/v1/lyric/edit";

const EditorEditLyric = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory]  = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artistName, setArtistName] = useState("");
  const [country, setCountry] = useState("");
  const [countriesx, setCountriesx] = useState([]);
  const [points, setPoints] = useState("");
  const [famous, setFamous] = useState(false);
  const [file, setFile] = useState();
  const [files, setFiles] = useState(null);
  const [audio, setAudio] = useState("");
  const [showAudio, setShowAudio] = useState(false);
  const {userInfo} = useSelector(state => state.auth);
  const [lyric, setLyric] = useState("");
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [Hi, setHi] = useState("");
  var [id, setId] = useState("");

  useEffect(() => {
    const {lyricId} = queryString.parse(location.search);
    setId(lyricId);
  }, [id])
  
  useEffect(() => {
    const getLyricById = async () => {    
      try {
        const res = await axios.get(`${GET_LYRIC_URL}/${id}`, {headers: {withCredentials: true}});
        setArtistName(res.data.lyric.artistName);
        setTitle(res.data.lyric.title);
        setDescription(res.data.lyric.description);
        setCategory(res.data.lyric.category);
        setCountry(res.data.lyric.country);
        setLyric(res.data.lyric.lyric);
        setFamous(res.data.lyric.famous);
        setPoints(res.data.lyric.points);
        setLyric(res.data.lyric.lyric);
        console.log(res.data);
      }catch(err) {
        setErrMsg(err?.data?.message);
        console.log(err?.data);
      }
    }
    getLyricById()
  }, [id])

  useEffect(() => {
    setCountriesx(countries.all); 
    setCountry("France");
  }, [])

  useEffect(() => {
    const getRooms = async () => {
      const res = await axios.get(ROOM_URL, {headers: {withCredentials: true}});
      setCategories(res.data.rooms);
      setCategory(res.data.rooms[0].name);
    }
    getRooms();
  }, [])

  const onChangeCategory = (e) => setCategory(e.target.value);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for(let i=0; i<files.length; i++) {
        formData.append("files", files[i]);
      }
      formData.append("category", category);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("artistName", artistName);
      formData.append("points", points);
      formData.append("country", country);
      formData.append("famous", famous);
      formData.append("lyric", lyric);
      const putLyric = await axios.put(`${EDIT_LYRIC_URL}/${id}`, formData, {headers: {withCredentials: true}});
      if(putLyric) {
        setSuccess("Video has been updated successfully ");
        setErrMsg("");
        setArtistName("");
        setFile();
        setDescription("");
        setTitle("");
        setFamous(false);
        setPoints("");
        setLyric("");
        setTimeout(() => {
          setSuccess("");
          setHi(true);
        }, [4000])
      }
      console.log(putLyric);
    }catch(err) {
      console.log(err);
      setErrMsg(err?.data?.message);
    }
  }

  return (
    <section className=" relative -z-50 md:mt-16  visible w-[93vw] md:w-[55vw] bg-zinc-100 md:bg-zinc-200 md:absolute md:top-0 md:left-40 lg:left-60 xl:left-64 my-2 mx-2 px-1">
      <div className="mb-8 mt-1 bg-red-200">
        <h1 className="text-2xl text-center bg-gradient-to-l from-blue-100 to-purple-100">Edit Lyric</h1>
      </div>
      {/** Get videos to post */}
      <form className=" mx-2 bg-gradient-to-l from-red-100 to-violet-100" onSubmit={handlePostSubmit}>
            {Hi ? null : null}      
            {errMsg ? <div className="font-bold text-lg text-red-500"><h1>{errMsg}</h1></div> : null}
            {success ? <div className="font-bold text-lg text-green-500"><h1>{success}</h1></div> : null}
        <div className="relative my-2">
          <p  className="ml-2 font-medium mb-2 md:text-lg ">Choose a lyric to post</p>
          <label className=" cursor-pointer" htmlFor='audio'>
            <FaUpload className=" ml-8 h-7 w-11"/><p className=" text-lg ml-8">Upload</p>
            </label>
            <input type='file' id="audio" multiple onChange={e=>setFiles(e.target.files)} hidden/>
            {/*files? <div className="absolute top-7 left-40 flex flex-col space-y-3 text-blue-800 font-medium"><p className="mr-2" >
              filename: </p> <p>size: </p></div> :null*/}  
        </div>

        <div className="my-3 text-lg ">
          <label htmlFor='category'>Category</label>
          <select className="h-11 px-5 rounded-md shadow-sm border outline-none bg-gray-200 w-[80%] block" value={category} onChange={e=>setCategory(e.target.value)}

          > 
            {categories ? categories.map(category => {
              return (<option className="border m-3" key={category._id} value={category.name}>{category.name}</option>)
            }) : null}
          </select>
        </div>
        <div className="my-2 md:my-3 ">
            <label htmlFor="title">Title</label>
            <input className="border rounded-md shadow-sm px-2 py-2 md:py-3  w-[80%] block" type="text" value={title} onChange={e=> setTitle(e.target.value)}  />
        </div>
        <div className="text-lg">
            <label htmlFor=" lyric">Lyric</label>
            <textarea id="lyric" className=" h-60 border w-full rounded-md py-2 md:py-3 shadow p-2 outline-1" type="text" value={lyric} onChange={e=>setLyric(e.target.value)}></textarea>
        </div>
        <div className="my-2 md:my-3">
            <label htmlFor="artist">Artist</label>
            <input className=" h-11 border rounded-md shadow w-[80%] block p-2 md:p-3" type="text" value={artistName} onChange={e=>setArtistName(e.target.value)}/>
        </div>
        <div className="my-2 my:py-3">
            <label>Points</label>
            <input className=" h-11 border rounded-md shadow w-[80%] block p-2 md:p-3" type="text" value={points} min={1} max={100} onChange={e=>setPoints(e.target.value)}/>
        </div>
        <div className="my-2 md:my-3">
          <label>Country</label>
          <select className="h-11 px-5 rounded-md shadow-sm border outline-none bg-gray-200 w-[80%] block" value={country} onChange={e=>setCountry(e.target.value)}
          > 
            {countriesx ? countriesx.map(countr => {
               return (<option className="border m-3" key={countr.i} value={countr.name}> <p className=" mx-5">{countr.emoji}</p> <p className=" mr-6">{countr.name}</p> </option>)
            }) : null}
          </select>            
        </div>
        <div className="my-2 md:my-3">
            <label className="text-lg">Famous</label>
            <input className=" h-8 w-7 ml-9 p-2 md:p-3" type="checkbox" value={famous} onChange={e=>setFamous(e.target.checked)} />
        </div>
        <div className="text-lg">
            <label htmlFor="description">Description</label>
            <textarea id="description" className=" h-40 border w-full rounded-md py-2 md:py-3 shadow p-2 outline-1" type="text" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>
        <div className="w-48 mb-3 md:my-1">
          <button className=" w-40 p-1 text-lg animation delay-150 duration-500 border rounded-md shadow-sm bg-indigo-300 hover:bg-indigo-400 hover:translate-y-1" type="submit">Send to admin for verification</button>
        </div>
      </form>
      <div>
          <button onClick={() => setShowAudio(!showAudio)}>Show my post</button>
          {showAudio ? 
            <div className="">
              <audio className=" w-[90%] h-[50vh]" controls src={audio}  />
              <button className="border shadow rounded-full bg-indigo-200 ">Play</button>
            </div>
            : null}       
      </div>
    </section>
  )
}

export default EditorEditLyric
