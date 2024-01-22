"use client";
import { PostDetailsProps } from "@/utils/typings";
import IGlogo from "@/assets/IG-logo.png";
import { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import { Timestamp } from "firebase/firestore";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
const crypto = require("crypto");
import {
  ArrowUturnRightIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as LikedHeartIcon,
  BookmarkIcon as BookmarkedIcon,
} from "@heroicons/react/24/solid";
import CommentSection from "./CommentSection";
import { useSession } from "next-auth/react";
interface AllPostProps {
  post: {
    readonly id: string;
    postText: string;
    userName: string;
    userImage: string;
    postImage?: string;
    userEmail: string;
    createdAt: Timestamp;
  };
  id: string;
}
function Post({ post, id }: AllPostProps) {
  const { data: session } = useSession();
  const [likesNumber, setLikesNumber] =
    useState<number>(10000);
  const [otherLikesNumber, setOtherLikesNumber] =
    useState<number>(5);
  const generateRandomNumber = (
    min: number,
    max: number
  ): number => {
    return (
      Math.floor(Math.random() * (max - min + 1)) + min
    );
  };
  useEffect(() => {
    const newRandomNumber = generateRandomNumber(
      10000,
      5000000
    );
    const otherRandomNumber = generateRandomNumber(5, 100);
    setLikesNumber(newRandomNumber);
    setOtherLikesNumber(otherRandomNumber);
  }, []);
  const randomNumberOfLikes = likesNumber;
  const otherRandomNumberOfLikes = otherLikesNumber;
  const [toggleLike, setToggleLike] =
    useState<boolean>(false);
  const [toggleBookmark, setToggleBookmark] =
    useState<boolean>(false);

  const handleLikeButton = () => {
    setToggleLike((prev) => !prev);
  };
  const handleBookmarkButton = () => {
    setToggleBookmark((prev) => !prev);
  };
  const timestampInSeconds = post?.createdAt?.seconds;
  const timestampInMillis =
    timestampInSeconds * 1000 +
    Math.round(post?.createdAt?.nanoseconds / 1e6);

  const postTimestamp = moment(
    timestampInMillis
  )?.fromNow();

  return (
    <div className="mt-2 bg-white border-gray-400 shadow-lg">
      <div className="flex flex-col p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full relative">
              <Image
                src={post.userImage}
                alt="Error Loading Image"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-neutral-950">
                {post.userName}
              </p>
              <p
                suppressHydrationWarning
                className="text-[11px] font-medium text-gray-500"
              >
                Suggested | Following |{" "}
                {postTimestamp ? postTimestamp : "Loading"}
              </p>
            </div>
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer duration-100 transform transition ease-in-out">
            <EllipsisHorizontalIcon className="w-7 h-7 text-gray-600" />
          </div>
        </div>
        {post.postImage && (
          <>
            <div className="relative h-[550px] w-full mt-4">
              <Image
                fill
                src={post.postImage}
                alt="Error Loading Image"
                className="w-full object-cover"
              />
            </div>

            {session && (
              <div className="flex items-center justify-between py-3 px-1 w-full">
                <div className="flex items-center space-x-2">
                  {toggleLike ? (
                    <LikedHeartIcon
                      onClick={handleLikeButton}
                      className="h-6 w-6 text-red-600 cursor-pointer hover:scale-110 duration-100 transition transform ease-in-out"
                    />
                  ) : (
                    <HeartIcon
                      onClick={handleLikeButton}
                      className="h-6 w-6 text-gray-800 cursor-pointer hover:scale-110 duration-100 transition transform ease-in-out"
                    />
                  )}
                  <ChatBubbleOvalLeftIcon className="h-6 w-6 text-gray-800 cursor-pointer hover:scale-110 duration-100 transition transform ease-in-out" />
                  <ArrowUturnRightIcon className="h-6 w-6 text-gray-800 cursor-pointer hover:scale-110 duration-100 transition transform ease-in-out" />
                </div>
                <div className="relative flex flex-col">
                  {toggleBookmark ? (
                    <BookmarkedIcon
                      onClick={handleBookmarkButton}
                      className="h-6 w-6 text-blue-600 cursor-pointer hover:scale-110 duration-100 transition transform ease-in-out"
                    />
                  ) : (
                    <BookmarkIcon
                      onClick={handleBookmarkButton}
                      className="h-6 w-6 text-gray-800 cursor-pointer hover:scale-110 duration-100 transition transform ease-in-out"
                    />
                  )}
                  {toggleBookmark && (
                    <p className="whitespace-nowrap absolute -bottom-4 text-[10px] text-gray-400 font-semibold left-1/2 -translate-x-1/2">
                      Saved
                    </p>
                  )}
                </div>
              </div>
            )}

            {randomNumberOfLikes && (
              <p
                suppressHydrationWarning
                className="px-2 text-[13px] tracking-wide mt-2 text-gray-700 font-semibold"
              >
                Liked by{" "}
                {randomNumberOfLikes.toLocaleString()}{" "}
                people and{" "}
                {otherRandomNumberOfLikes.toLocaleString()}{" "}
                others
              </p>
            )}
          </>
        )}
        <div className="flex text-gray-800 mt-2 space-x-2 px-2">
          <p className="text-[13px] font-medium tracking-tighter">
            {post.userName
              .toLowerCase()
              .replace(/\s/g, "_")}
          </p>
          <p className="text-sm font-semibold">
            {post.postText}
          </p>
        </div>
        <div className="p-2">
          <CommentSection postId={id} />
        </div>
      </div>
    </div>
  );
}

export default Post;
