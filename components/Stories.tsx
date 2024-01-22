"use client";
import { generateUsersData } from "@/utils/getUserStoriesData";
import { UsersProps } from "@/utils/typings";
import { UserIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type FeedStoriesProps = {
  SSRStories: UsersProps[];
};

function Stories({ SSRStories }: FeedStoriesProps) {
  const { data: session, status } = useSession();
  const [stories, setStories] = useState<UsersProps[] | []>(
    []
  );
  useEffect(() => {
    const storiesData = generateUsersData(20);
    setStories(storiesData);
  }, []);
  return (
    <>
      {status === "loading" && (
        <div className="flex-1 overflow-x-scroll scrollbar-hide px-5">
          <div className="flex space-x-3 items-center justify-evenly">
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-11 h-11 bg-gray-300 rounded-full p-1.5">
                <UserIcon className="bottom-1 absolute left-1/2 -translate-x-1/2 w-8 h-8 text-white" />
              </div>
              <div>
                <div className="h-2 bg-gray-300 mt-2 rounded-full w-20 mb-2"></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-11 h-11 bg-gray-300 rounded-full p-1.5">
                <UserIcon className="bottom-1 absolute left-1/2 -translate-x-1/2 w-8 h-8 text-white" />
              </div>
              <div>
                <div className="h-2 bg-gray-300 mt-2 rounded-full w-20 mb-2"></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-11 h-11 bg-gray-300 rounded-full p-1.5">
                <UserIcon className="bottom-1 absolute left-1/2 -translate-x-1/2 w-8 h-8 text-white" />
              </div>
              <div>
                <div className="h-2 bg-gray-300 mt-2 rounded-full w-20 mb-2"></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-11 h-11 bg-gray-300 rounded-full p-1.5">
                <UserIcon className="bottom-1 absolute left-1/2 -translate-x-1/2 w-8 h-8 text-white" />
              </div>
              <div>
                <div className="h-2 bg-gray-300 mt-2 rounded-full w-20 mb-2"></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-11 h-11 bg-gray-300 rounded-full p-1.5">
                <UserIcon className="bottom-1 absolute left-1/2 -translate-x-1/2 w-8 h-8 text-white" />
              </div>
              <div>
                <div className="h-2 bg-gray-300 mt-2 rounded-full w-20 mb-2"></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-11 h-11 bg-gray-300 rounded-full p-1.5">
                <UserIcon className="bottom-1 absolute left-1/2 -translate-x-1/2 w-8 h-8 text-white" />
              </div>
              <div>
                <div className="h-2 bg-gray-300 mt-2 rounded-full w-20 mb-2"></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-11 h-11 bg-gray-300 rounded-full p-1.5">
                <UserIcon className="bottom-1 absolute left-1/2 -translate-x-1/2 w-8 h-8 text-white" />
              </div>
              <div>
                <div className="h-2 bg-gray-300 mt-2 rounded-full w-20 mb-2"></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-11 h-11 bg-gray-300 rounded-full p-1.5">
                <UserIcon className="bottom-1 absolute left-1/2 -translate-x-1/2 w-8 h-8 text-white" />
              </div>
              <div>
                <div className="h-2 bg-gray-300 mt-2 rounded-full w-20 mb-2"></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-11 h-11 bg-gray-300 rounded-full p-1.5">
                <UserIcon className="bottom-1 absolute left-1/2 -translate-x-1/2 w-8 h-8 text-white" />
              </div>
              <div>
                <div className="h-2 bg-gray-300 mt-2 rounded-full w-20 mb-2"></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-11 h-11 bg-gray-300 rounded-full p-1.5">
                <UserIcon className="bottom-1 absolute left-1/2 -translate-x-1/2 w-8 h-8 text-white" />
              </div>
              <div>
                <div className="h-2 bg-gray-300 mt-2 rounded-full w-20 mb-2"></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-11 h-11 bg-gray-300 rounded-full p-1.5">
                <UserIcon className="bottom-1 absolute left-1/2 -translate-x-1/2 w-8 h-8 text-white" />
              </div>
              <div>
                <div className="h-2 bg-gray-300 mt-2 rounded-full w-20 mb-2"></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-11 h-11 bg-gray-300 rounded-full p-1.5">
                <UserIcon className="bottom-1 absolute left-1/2 -translate-x-1/2 w-8 h-8 text-white" />
              </div>
              <div>
                <div className="h-2 bg-gray-300 mt-2 rounded-full w-20 mb-2"></div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-11 h-11 bg-gray-300 rounded-full p-1.5">
                <UserIcon className="bottom-1 absolute left-1/2 -translate-x-1/2 w-8 h-8 text-white" />
              </div>
              <div>
                <div className="h-2 bg-gray-300 mt-2 rounded-full w-20 mb-2"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "authenticated" && (
        <div className="flex-1 overflow-x-scroll scrollbar-hide px-5">
          <div className="flex items-center w-full">
            {!stories || stories.length == 0
              ? SSRStories.map((story, id) => (
                  <div
                    key={story._id}
                    className="flex flex-col whitespace-nowrap w-20 justify-center p-1"
                  >
                    <div className="w-[62px] h-[62px] rounded-full border-[3px] border-pink-600 p-2 mx-auto relative flex items-center  justify-center ">
                      <Image
                        src={story.avatar}
                        fill
                        alt={story.avatar}
                        className="rounded-full object-contain border-[3px] border-white"
                      />
                    </div>
                    <p className="mt-1 text-center font-medium whitespace-nowrap text-xs text-gray-800 truncate">
                      {story.fullName
                        .toLowerCase()
                        .replace(/\s/g, "")}
                    </p>
                  </div>
                ))
              : stories.map((story, id) => (
                  <div
                    key={story._id}
                    className="flex flex-col whitespace-nowrap w-20 justify-center p-1"
                  >
                    <div className="w-[62px] h-[62px] rounded-full border-[3px] border-pink-600 p-2 mx-auto relative flex items-center  justify-center ">
                      <Image
                        src={story.avatar}
                        fill
                        alt={story.avatar}
                        className="rounded-full object-contain border-[3px] border-white"
                      />
                    </div>
                    <p className="mt-1 text-center font-medium whitespace-nowrap text-xs text-gray-800 truncate">
                      {story.fullName
                        .toLowerCase()
                        .replace(/\s/g, "")}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Stories;
