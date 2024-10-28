import { Box, Typography ,styled} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "../../service/api";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "./comments/Comments";


const Container=styled(Box)`
margin: 50px 100px
`;
;const Image=styled('img')({
width:'100%',
objectFit:'cover',
height: '50vh'

})
const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
  word-break: break word;
`;

const EditIcon1 = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon1 = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;
const Author=styled(Box)`
color: #878787;
margin: 20px 0;
display: flex;

`;
    

const DetailView=()=>{
 const navigate = useNavigate();
     const {id}=useParams();
     const [post,setpost]=useState({});
      const { account } = useContext(DataContext);
     const url =post.picture ? post.picture :  'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    useEffect(()=>{
       const fetchData=async()=>{
      let response = await API.getPostById(id);
      if(response.isSuccess){
        setpost(response.data);
      }
       }
       fetchData();
    }, []);
    const deleteBlog = async () => {
      await API.deletePost(post._id);
      navigate("/");
    };
    return (
      <Container>
        <Image src={url} alt="blog" />
        <Box style={{ float: "right" }}>
          {account.username === post.username && (
            <>
              <Link to={`/update/${post._id}`}>
                <EditIcon1 color="primary" />
              </Link>
              <DeleteIcon1 onClick={() => deleteBlog()} color="error" />
            </>
          )}
        </Box>
        <Heading>{post.title}</Heading>
        <Author>
          <Typography>
            Author: <span style={{ fontWeight: 600 }}>{post.username}</span>
          </Typography>
          <Typography style={{ marginLeft: "auto" }}>
            {new Date(post.createdDate).toDateString()}
          </Typography>
        </Author>
        <Typography>{post.description}</Typography>
        <Comments post={post}/>
      </Container>
    );
}
export default DetailView;