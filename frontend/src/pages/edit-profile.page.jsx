import React, { useContext, useEffect, useRef, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import { UserContext } from "../App";
import axios from "axios";
import { profileDataStructure } from "./profile.page";
import Loader from "../components/loader.component";
import toast, { Toaster } from "react-hot-toast";
import InputBox from "../components/input.component";
import { UploadImage } from "../common/aws";

const EditeProflie = () => {
  let {
    userAuth,
    userAuth: { access_token },
  } = useContext(UserContext);

  let bioLimit = 150;

  let profileImgEle = useRef();

  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);

  const [charactersLeft, setCharactersLeft] = useState(bioLimit);

  const [ updatedProfileImg, setUpdatedProfileImg] = useState(null);

  let {
    personal_info: {
      fullname,
      username: profile_username,
      profile_img,
      email,
      bio,
    },
    social_links,
  } = profile;

  useEffect(() => {
    if (access_token) {
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", {
          username: userAuth.username,
        })
        .then(({ data }) => {
          setProfile(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [access_token]);


  const handleCharaterChange = (e) => {
    setCharactersLeft( bioLimit - e.target.value.length)
  }


  const handleImagePreview = (e) => {
    let img = e.target.files[0];

    profileImgEle.current.src = URL.createObjectURL(img);

    setUpdatedProfileImg(img)
  }

  const handleImageUpload = (e) => {

    e.preventDefault();

    if(updatedProfileImg) {
      let loadingToast = toast.loading("Uploading....")

      e.target.setAttribute("disabled", true)

      UploadImage(updatedProfileImg)
      .then(url => {
        console.log(url)
      })
      .catch(err => {
        console.log(err)
      })

    }
  }


  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <form>
          <Toaster />

          <h1 className="max-md:hidden">Edite profile</h1>

          <div className="flex flex-col lg:flex-row items-start py-10  gap-8 lg:gap-10 ">
            <div className=" max-lg:center mb-5">
              <label
                htmlFor="uploadImg"
                id="profileImgLable"
                className="relative block w-48 h-48 bg-grey rounded-full overflow-hidden"
              >
                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/30 opacity-0 hover:opacity-100 cursor-pointer">
                  Upload Image
                </div>
                <img src={profile_img} alt="" ref={profileImgEle} />
              </label>

              <input
                type="file"
                id="uploadImg"
                accept=".jpeg, .png, .jpg"
                hidden
                onChange={handleImagePreview}
              />

              <button className="btn-light mt-5 max-lg:center lg:w-full px-10" onClick={handleImageUpload}>
                Upload
              </button>
            </div>

            <div className="w-full">

              <div className=" grid grid-cols-1 md:grid-cols-2 md:gap-5">
                <div>
                  <InputBox name="fullname" type='text' value={fullname} placeholder="full Name" disable={true} icon="fi-rr-user" />
                </div>

                <div>
                  <InputBox name="email" type='email' value={email} placeholder="Email" disable={true} icon="fi-rr-envelope" />
                </div>
              </div>

              <InputBox name="username" type='text' value={profile_username} placeholder="Username"  icon="fi-rr-at" />

              <p className=" text-dark-grey -mt-3">Username will use to search user and will be visible to all users </p>

              <textarea name="bio" maxLength={bioLimit} defaultValue={bio} placeholder="Bio" className="input-box h-64 lg:h-40 resize-none leading-7 mt-5 pl-5" onChange={handleCharaterChange} ></textarea>

              <p className="mt-1 text-dark-grey"> { charactersLeft } characters left</p>

              <p className="my-6 text-dark-grey">Add your social handles below </p>

              <div className=" md:grid md:grid-cols-2 gap-x-6">

                {
                  Object.keys(social_links).map((key, i) => {

                    let link = social_links[key]

                    return <InputBox key={i} name={key} type="text" value={link} placeholder="https://" icon={"fi " + (key != 'website' ? "fi-brands-" + key : "fi-br-globe") } />
                  })
                }
              </div>

              <button className="btn-dark w-auto px-10">Update</button>

            </div>
          </div>
        </form>
      )}
      
    </AnimationWrapper>
  );
};

export default EditeProflie;


