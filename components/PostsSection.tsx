"use client";
import {
  IGPostsCollectionRef,
  db,
} from "@/firebase-config";
import { PostDetailsProps } from "@/utils/typings";
import {
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "./Post";

type FeedPostsProps = {
  SSRPosts: PostDetailsProps[];
};

function PostsSection({ SSRPosts }: FeedPostsProps) {
  const [posts, setPosts] = useState<
    PostDetailsProps[] | []
  >([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchPostsQuery = query(
        IGPostsCollectionRef,
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(fetchPostsQuery);
      const queryData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PostDetailsProps[];

      setPosts(queryData);
    };

    fetchPosts();
  }, [posts]);
  return (
    <div className="w-full md:max-w-[600px] mx-auto mt-3 first:mt-0 gap-2">
      {!posts || posts.length == 0
        ? SSRPosts?.map((post, id) => (
            <Post key={post.id} post={post} id={post.id} />
          ))
        : posts?.map((post, id) => (
            <Post key={post.id} post={post} id={post.id} />
          ))}
    </div>
  );
}

export default PostsSection;
