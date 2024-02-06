import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
//import "./css/video.css";
import { FaUpload } from "react-icons/fa6";
import {countries} from "country-data-list";
import axios from "../api/axios";
const ROOM_URL = "/api/v1/room";
const LYRIC_URL = "/api/v1/lyric";
const GET_LYRIC_URL = "/api/v1/lyric/get";
const EDIT_LYRIC_URL = "/api/v1/lyric/edit";
const DELETE_LYRIC_URL = "/api/v1/lyric";
const VIEWS_LYRIC_URL = "/api/v1/lyric/views";
const LIKES_LYRIC_URL = "/api/v1/lyric/likes";
const RECOMMENDED_LYRIC_URL = "/api/v1/lyric/recommendation";
const SEARCH_LYRIC_URL = "/api/v1/lyric/search";
const EditorPostLyric = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory]  = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artistName, setArtistName] = useState("");
  const [country, setCountry] = useState("");
  const [countriesx, setCountriesx] = useState([]);
  const [points, setPoints] = useState("");
  const [famous, setFamous] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [files, setFiles] = useState(null);
  const [showAudio, setShowAudio] = useState(false);
  const {userInfo} = useSelector(state => state.auth);
  const [audio, setAudio] = useState();
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [Hi, setHi] = useState("");
  const [lyric, setLyric] = useState("");
  const [photo, setPhoto] = useState();
  const test = countriesx.map(country => country);
  //console.log(test);
  //const country1 = countriesx.filter(country => country.name === "France");
  useEffect(() => {
    setCountriesx(countries.all); 
    setCountry("France");
  }, [])

  {/** REctification */}
  useEffect(() => {
    async function getLyric() {
      try {
        if(userInfo) {
          const userId = userInfo._id;
          const res = await axios.get(`api/v1/upload/audio/lyric`, {headers: {withCredentials: true}});
          console.log("resss ", res.data);
          setAudio(res.data.lyrics[1].path);
        }
      }
      catch(err) {
          console.log(err);
      }     
    }
    getLyric();
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
      console.log("heyy");
      const formData = new FormData();
      for(let i=0; i<files.length; i++) {
        formData.append("files", files[i]);
      }
      formData.append("lyric", lyric);
      formData.append("category", category);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("artistName", artistName);
      formData.append("points", points);
      formData.append("country", country);
      formData.append("isPopular", isPopular);
      const postLyric = await axios.post(LYRIC_URL, formData,{headers: {withCredentials: true, "Content-Type": "multipart/form-data" }} );
      if(postLyric) {
        console.log(postLyric);
        setSuccess("Lyric audio/text has been posted successfully ");
        setErrMsg("");
        setArtistName("");
        setDescription("");
        setTitle("");
        setFamous(false);
        setPoints("");
        setLyric("");
        setIsPopular(false);
        setTimeout(() => {
          setSuccess("");
          setHi(true);
        }, [4000])
      }
      console.log(postLyric);
    }catch(err) {
      console.log(err);
      setErrMsg(err?.data?.message);
    }
  }
  console.log(files);
  
  return (
    <section className=" md:mt-16  visible w-[90vw] md:w-[55vw] bg-zinc-100 md:bg-zinc-200 md:absolute md:top-0 md:left-40 lg:left-60 xl:left-64 mx-2 px-1">
      <div className="mb-8 mt-1 bg-gradient-to-l from-fuchsia-400 ">
        <h1 className="text-2xl text-center ">Editor DashBard</h1>
      </div>
      {/** Get videos to post */}
      <form className=" mx-2 " onSubmit={handlePostSubmit}>
            {Hi ? null : null}      
            {errMsg ? <div className="font-bold text-lg text-red-500"><h1>{errMsg}</h1></div> : null}
            {success ? <div className="font-bold text-lg text-green-500"><h1>{success}</h1></div> : null}
        <div className=" flex space-x-11 relative my-2">
          <div className="flex-col">
          <p  className="ml-2 font-medium mb-2 md:text-lg ">Photo</p>
          <label className=" cursor-pointer" htmlFor='image'>
            <FaUpload className=" ml-8 h-7 w-11"/><p className=" text-lg ml-8">Upload</p>
            </label>
            <input type='file' id="image"  multiple onChange={e=>setFiles(e.target.files)} />
            {/*files? <div className="absolute top-7 left-40 flex flex-col space-y-3 text-blue-800 font-medium"><p className="mr-2" >
  filename: </p> <p>size: </p></div> :null*/}  
          </div>       
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
            <label htmlFor="lyric">Lyric</label>
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
            <label className="text-lg">Popular</label>
            <input className=" h-6 w-6 ml-7 md:p-3" type="checkbox" value={isPopular} onChange={e=>setIsPopular(e.target.checked)} />
        </div>
        <div className="text-lg">
            <label htmlFor=" description">Description</label>
            <textarea className=" h-32 border w-full rounded-md py-2 md:py-3 shadow p-2 outline-1" type="text" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>
        <div className="w-48 mb-3 md:my-1">
          <button className=" w-40 p-1 text-lg animation delay-150 duration-500 border rounded-md shadow-sm bg-indigo-300 hover:bg-indigo-400 hover:translate-y-1" type="submit">Send to admin for verification</button>
        </div>
      </form>
      <div>
          <button onClick={() => setShowAudio(!showAudio)}>Show my post</button>
          {showAudio ? 
            <div className="">
              <audio className=" w-[90%] h-[50vh] " controls src={audio}  />
              <button className="border shadow rounded-full bg-indigo-200 ">Play</button>
            </div>
            : null}       
      </div>
    </section>
  )
}

export default EditorPostLyric