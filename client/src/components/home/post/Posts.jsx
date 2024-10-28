import { useState,useEffect } from "react";
import { API } from "../../../service/api";
import Post from './Post'
import { Box, Grid } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";




const Posts=()=>{
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
     const category = searchParams.get("category");
    useEffect(() => {
      
      const fetchData = async () => {
        let response = await API.getAllPosts({ category: category || "" });
        if (response.isSuccess) {
          setPosts(response.data);
        }
      };
      fetchData();
    }, [category]);
    return (
      <>
        {posts?.length ? (
          posts.map((post) => (
            <Grid item lg={3} sm={4} xs={12}>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`details/${post._id}`}
              >
                <Post post={post} />
              </Link>
            </Grid>
          ))
        ) : (
          <Box style={{ color: "878787", margin: "30px 80px 50px 80px", fontSize: 18  }}>
            No Blog is available for selected category!
          </Box>
        )}
      </>
    );
}
export default Posts;