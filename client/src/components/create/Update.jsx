import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";
import { useParams } from "react-router-dom";
// import { Navigate } from "react-router-dom";
const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});
const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));
const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;
const InputStyled = styled(InputBase)`
  flex: 1;
  margin-left: 10px;
`;
const TextArea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const Update = () => {
    const {id}=useParams();
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const { account } = useContext(DataContext);
  const location = useLocation();

    useEffect(() => {
      const fetchData = async () => {
        let response = await API.getPostById(id);
        if (response.isSuccess) {
          setPost(response.data);
        }
      };
      fetchData();
    }, []);
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        //api to upload in mongo db
        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
   const updatePost = async () => {
     await API.updatePost(post);
     navigate(`/details/${id}`);
   };

  return (
    <Container>
      <Image src={url} alt="logo" />
      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputStyled
          placeholder="title"
          onChange={(e) => handleChange(e)}
          name="title"
          value={post.title}
        />
        <Button variant="contained" onClick={() => updatePost()}>
          Update
        </Button>
      </StyledFormControl>
      <TextArea
        minRows={5}
        placeholder="Tell your story..."
        onChange={(e) => handleChange(e)}
        name="description"
        value={post.description}
      ></TextArea>
    </Container>
  );
};

export default Update;
