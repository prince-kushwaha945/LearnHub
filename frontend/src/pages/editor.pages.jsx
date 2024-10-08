import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Navigate, useParams } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishFrom from "../components/publish-form.component";
import Loader from "../components/loader.component";
import axios from "axios";
import PageNoteFound from "./404.page";

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
  author: { personal_info: {} },
};

export const EditorContext = createContext({});

const Editor = () => {
  let { blog_id } = useParams();

  const [blog, setBlog] = useState(blogStructure);

  let {
    userAuth: { access_token, isAdmin },
  } = useContext(UserContext);

  const [editorState, setEditorState] = useState("editor");

  const [textEditor, setTextEditor] = useState({ isReady: false });

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (!blog_id) {
      return setLoading(false);
    }


    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", {blog_id, draft: true, mode: 'edit'})
    .then(( { data: { blog}}) => {
      setBlog(blog);
      setLoading(false)
    })
    .catch((err => {
      setBlog(null);
      setLoading(null)
    }))

  }, []);

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        textEditor,
        setTextEditor,
      }}
    >
      {
        !isAdmin ? <Navigate to="/404" /> :
      
      access_token === null ? (
        <Navigate to="/signin" />
      ) : loading ? (
        <Loader />
      ) : editorState == "editor" ? (
        <BlogEditor />
      ) : (
        <PublishFrom />
      )}
    </EditorContext.Provider>
  );
};

export default Editor;
