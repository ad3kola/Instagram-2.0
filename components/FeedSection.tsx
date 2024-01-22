"use client";
import {
  PostDetailsProps,
  UsersProps,
} from "@/utils/typings";
import CreatePost from "./CreatePost";
import PostsSection from "./PostsSection";
import Stories from "./Stories";
import { signIn, useSession } from "next-auth/react";

type AllFeedProps = {
  SSRPosts: PostDetailsProps[];
  SSRStories: UsersProps[];
};

function FeedSection({
  SSRPosts,
  SSRStories,
}: AllFeedProps) {
  const { data: session } = useSession();
  return (
    <>
      <section className="flex-1 mx-auto w-full mt-14 md:mt-2 max-w-[650px] md:max-w-[700px] lg:max-w-[645px] h-full overflow-y-scroll scrollbar-hide">
        <div className="md:pb-0 pb-28 flex flex-col w-full ">
        
          {session && <Stories SSRStories={SSRStories} />}
          <CreatePost />
          <PostsSection SSRPosts={SSRPosts} />
        </div>
      </section>
    </>
  );
}

export default FeedSection;
