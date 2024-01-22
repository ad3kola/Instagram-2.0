"use client";
import Image from "next/image";
import IGLogo from "@/assets/IG-logo.png";
import { useEffect, useState } from "react";
import { UsersProps } from "@/utils/typings";
import { generateUsersData } from "@/utils/getUserStoriesData";
import { signIn, signOut, useSession } from "next-auth/react";
import DefaultUserImage from "@/assets/Default-User-Image.png";

function Widgets() {
  const { data: session, status } = useSession();
  const [widgets, setWidgets] = useState<UsersProps[] | []>(
    []
  );
  useEffect(() => {
    const widgetsData = generateUsersData(6);
    setWidgets(widgetsData);
  }, []);

  return (
    <section className="hidden xl:flex mr-3 flex-1 max-w-[350px] flex-col h-screen mt-5">
      <div className="mt-3 px-2 py-4">
        <div className="flex items-center p-1 justify-between space-x-1 w-full">
          <div className="flex items-center space-x-3">
            {session ? (
              <Image
                src={session?.user?.image as string}
                alt="Account Image"
                width={45}
                height={45}
                className="rounded-full object-contain"
              />
            ) : (
              <Image
                src={DefaultUserImage}
                alt="Account Image"
                width={60}
                height={60}
                className="rounded-full object-contain"
              />
            )}
            {session ? (
              <div className="text-sm">
                {session.user ? (
                  <>
                    <p className="font-semibold text-gray-600">
                      @
                      {session.user.name
                        ?.replace(/\s+/g, "_")
                        .toLowerCase()}
                    </p>
                    <p className="font-medium capitalize text-gray-500">
                      {session.user.name}
                    </p>
                  </>
                ) : (
                  <p>User information not available</p>
                )}
              </div>
            ) : (
              <div className="flex-1 w-full flex flex-col items-start justify-start">
                <div className="w-[70%] h-4 bg-gray-400 animate-pulse rounded-full"></div>
                <div className="w-[40%] mt-2 h-4 bg-gray-400 animate-pulse rounded-full"></div>
              </div>
            )}
          </div>
          <button
            onClick={() => session ? signOut() : signIn()}
            className="text-xs text-blue-400 hover:text-blue-600 capitalize font-semibold cursor-pointer duration-200 hover:scale-105 transform transition"
          >
            {session ? "Sign Out" : "Sign In"}
          </button>
        </div>
        <div className="py-5 w-full flex flex-col">
          {session && <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500">
              Suggested for you
            </h3>
            <button className="text-sm text-gray-800 hover:opacity-60 capitalize font-semibold cursor-pointer duration-200 hover:scale-105 transform transition">
              See All
            </button>
          </div>}
          {status === "loading" && (
            <div className="flex flex-col gap-2">
              <div
                role="status"
                className="max-w-md p-4 space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse md:p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          {session && status === "authenticated" && (
            <div className="flex flex-col">
              {widgets?.map((widget) => (
                <div
                  key={widget._id}
                  className="mt-2 flex items-center p-1 justify-between space-x-1 w-full"
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src={widget.avatar}
                      alt="Account Image"
                      width={40}
                      height={40}
                      className="rounded-full object-contain"
                    />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-600">
                        @
                        {widget.fullName
                          .replace(/\s+/g, "_")
                          .toLowerCase()}
                      </p>
                      <p className="font-medium capitalize text-gray-500">
                        {widget.fullName}
                      </p>
                    </div>
                  </div>
                  <button className="text-xs text-blue-400 hover:text-blue-600 capitalize font-semibold cursor-pointer duration-200 hover:scale-105 transform transition">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Widgets;
