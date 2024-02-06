import {useState, useEffect} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
//import "./css/video.css";
import { FaUpload } from "react-icons/fa6";
//const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = "https://mimlyricstest-api.onrender.com";
import {countries} from "country-data-list";
import { Link, useNavigate } from "react-router-dom";
const EditorAlbum1 = () => {
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
  const [file, setFile] = useState();
  const [showAudio, setShowAudio] = useState(false);
  const {userInfo} = useSelector(state => state.auth);
  const [audio, setAudio] = useState();
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [Hi, setHi] = useState("");
  const [lyric, setLyric] = useState("");
  const [photo, setPhoto] = useState();
  const [showNext, setShowNext] = useState(true); 
  const test = countriesx.map(country => country);

  const navigate = useNavigate();
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
          const res = await axios.get(`${BASE_URL}/upload/audio/lyric`, {headers: {withCredentials: true}});
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
      const res = await axios.get(`${BASE_URL}/room`, {headers: {withCredentials: true}});
      setCategories(res.data.rooms);
      setCategory(res.data.rooms[0].name);
    }
    getRooms();
  }, [])

  const onChangeCategory = (e) => setCategory(e.target.value);

  const createAlbum = async (e) => {
    e.preventDefault();    
    try {
      console.log("heyy");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("artistName", artistName);
      formData.append("points", points);
      formData.append("country", country);
      formData.append("isPopular", isPopular);
      const postAlbum = await axios.post(`${BASE_URL}/album`, formData,
        {headers: {withCredentials: true, "Content-Type": "multipart/form-data" }});
      if(postAlbum) {
        console.log(postAlbum);
        setSuccess("Lyric audio/text has been posted successfully ");
        setErrMsg("");
        setShowNext(false);
        /*setArtistName("");
        setDescription("");
        setTitle("");
        setFamous(false);
        setPoints("");
        setLyric("");
        setIsPopular(false);
        setTimeout(() => {
          setSuccess("");
          setHi(true);
        }, [4000])*/
      }
    }catch(err) {
      console.log(err);
      setErrMsg(err?.data?.message);
    }
  }
  console.log(files);

  const handleConfirmNext = (e) => {
    e.preventDefault();
    navigate('/post/editor/album2');
  }

  const handleCancelNext = (e) => {
    e.preventDefault();
    setShowNext(false);
  }

  const createAudios = async () => {
    try {
        const audios = await axios.post(`${BASE_URL}`, {headers: {withCredentials: true, "Content-Type": "application/json"}});

    }catch(err) {
        setErrMsg(err?.data?.message);
    }
  }
  
  return (
    <section className=" md:mt-4 visible w-[60vw] md:w-[40vw] bg-zinc-100 md:bg-zinc-200 md:absolute md:top-0 md:left-1 lg:left-1 xl:left-2 mx-2 px-1">
      <div className="mb-8 mt-1 bg-gradient-to-l from-fuchsia-400 ">
        <h1 className="text-2xl text-center ">Editor DashBoard ALBUM</h1>
      </div>
      {/** Get videos to post */}
      <form className=" mx-2 ">
        {Hi ? null : null}      
        {errMsg ? <div className="font-bold text-lg text-red-500"><h1>{errMsg}</h1></div> : null}
        {success ? <div className="font-bold text-lg text-green-500"><h1>{success}</h1></div> : null}
        <div className=" flex space-x-11 relative my-2">
          <div className="flex-col">
          <p  className="ml-2 font-bold mb-2 md:text-lg text-blue-950 ">ALBUM</p>
          <label className=" cursor-pointer" htmlFor='image'>
            <FaUpload className=" ml-8 h-7 w-11"/><p className=" text-lg ml-8">Upload</p>
            </label>
            <input type='file' accept="image/*" id="image" onChange={e=>setFile(e.target.files[0])} />
            {/*files? <div className="absolute top-7 left-40 flex flex-col space-y-3 text-blue-800 font-medium"><p className="mr-2" >
                filename: </p> <p>size: </p></div> :null*/}  
          </div>       
        </div>

        <div className="my-3 text-lg ">
          <label htmlFor='category'>Category</label>
          <select className="h-11 px-5 rounded-md shadow-sm border outline-none bg-gray-200 w-[80%] block"
             value={category} onChange={e=>setCategory(e.target.value)}
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
        {/*<div className="text-lg">
            <label htmlFor="lyric">Lyric</label>
            <textarea id="lyric" className=" h-60 border w-full rounded-md py-2 md:py-3 shadow p-2 outline-1" type="text" value={lyric} onChange={e=>setLyric(e.target.value)}></textarea>
        </div>*/}
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
          <button onClick={e=>createAlbum(e)} className=" w-40 p-1 text-lg animation delay-150 duration-500 border rounded-md shadow-sm 
          bg-indigo-300 hover:bg-indigo-400 hover:translate-y-1" type="submit">
            Send to admin for verification
          </button>
        </div>
        {showNext ? 
          <div className=" absolute top-96 right-2  ">
            <h1 className="">Do you want to continue ? </h1>
            <div className="flex space-x-11">
              <div onClick={(e)=>handleConfirmNext(e)}>
                <button className=" border shadow rounded-md bg-indigo-100 
                  hover:translate-y-[1px] hover:bg-indigo-400 p-1 text-lg ">
                  Yes
                </button>
              </div>
              <div onClick={(e)=>handleCancelNext(e)}>
                <button className=" border shadow rounded-md bg-red-100 
                  hover:translate-y-[1px] hover:bg-red-400 p-1 text-lg ">
                  Cancel
                </button>
              </div>
            </div> 
          </div> : 
          null 
        }
      </form>
    </section>
  )
}

export default EditorAlbum1;
