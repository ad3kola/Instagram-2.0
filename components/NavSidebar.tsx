"use client";
import React, { useState } from "react";
import IGLogo from "@/assets/IG-logo.png";
import IGTextLogo from "@/assets/IG-text-logo.png";
import Image from "next/image";
import { SidebarLinks } from "@/utils/Sidebar";
import SidebarLink from "./SidebarLink";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { OpenPostModal } from "@/redux/features/PostModalSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  BellIcon,
  TvIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog8ToothIcon,
  HeartIcon,
  PlusCircleIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { SidebarLinksProps } from "@/utils/typings";
import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

function NavSidebar() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const [otherSidebarState, setOtherSidebarState] =
    useState<boolean>(false);
  function OpenModal() {
    dispatch(OpenPostModal());
  }
  function OpenOtherSidebar() {
    setOtherSidebarState((prev) => !prev);
  }
  function OtherSidebar({
    name,
    Icon,
    onClick,
  }: SidebarLinksProps) {
    return (
      <div
        onClick={onClick}
        className="flex items-center space-x-4 text-black group cursor-pointer hover:bg-white rounded-lg p-3 pr-16 w-full"
      >
        {
          <Icon className="w-6 h-6 group-hover:scale-110 duration-50 ease-in-out transtion transform" />
        }
        <p className="font-semibold text-sm whitespace-nowrap">
          {name}
        </p>
      </div>
    );
  }

  return (
    <nav className="hidden md:flex flex-col pt-7 pb-4 px-3 flex-1 max-w-fit lg:w-[350px] justify-between xl:max-w-[250px] max-h-screen items-center lg:items-start border border-r-gray-200 border-l-0">
      <Image
        src={IGLogo}
        alt="Instagram Logo"
        width={35}
        height={35}
        className="block lg:hidden object-contain cursor-pointer hover:scale-100 duration-100 ease-in-out transform transition "
      />
      <Image
        src={IGTextLogo}
        alt="Instagram Logo"
        width={120}
        height={50}
        className="hidden lg:block object-contain xl:ml-2 cursor-pointer hover:scale-100 duration-100 ease-in-out transform transition "
      />
      <div
        className={`flex flex-col gap-1 w-full -mt-8`}
      >
        {SidebarLinks.map((link, indx) => (
          <SidebarLink
            key={indx}
            name={link.name}
            Icon={link.Icon}
          />
        ))}
        <SidebarLink
          key={"Messages"}
          name={"Messages"}
          Icon={ChatBubbleLeftEllipsisIcon}
        />
        <SidebarLink
          key={"Notifications"}
          name={"Notifications"}
          Icon={HeartIcon}
        />
        {session && (
          <SidebarLink
            key={"Create"}
            name={"Create"}
            Icon={PlusCircleIcon}
            onClick={OpenModal}
          />
        )}
      </div>
      <div
        onClick={OpenOtherSidebar}
        className={`absolute hidden md:flex duration-200 ease-in-out transition-all bg-transparent ${
          otherSidebarState
            ? "opacity-1 left-0 right-0 cursor-pointer"
            : "opacity-0 -left-full right-full"
        } top-0 bottom-0 rounded-xl w-full h-full`}
      >
        <nav
          className={`absolute hidden md:flex duration-400 z-20 ease-in-out transition-all bg-gray-100 ${
            otherSidebarState
              ? "opacity-1 left-10 "
              : "opacity-0 -left-full"
          } bottom-[70px] rounded-lg max-w-96`}
        >
          <div className=" flex flex-col p-4">
            <OtherSidebar
              Icon={StarIcon}
              name={"Favorites"}
            />
            <OtherSidebar
              Icon={TvIcon}
              name={"Watch Live"}
            />
            <OtherSidebar
              Icon={BellIcon}
              name={"Notifications"}
            />
            <OtherSidebar
              name={"Settings"}
              Icon={Cog8ToothIcon}
            />
            <OtherSidebar
              name={"Sign Out"}
              onClick={() => signOut()}
              Icon={UserIcon}
            />
          </div>
        </nav>
      </div>
      <div className = 'w-full' >

      {session ? (
        <SidebarLink
          onClick={OpenOtherSidebar}
          name="More"
          Icon={Bars3Icon}
        />
      ) : (
        <SidebarLink
          Icon={UserIcon}
          name="Sign In"
          onClick={() => signIn()}
        />
      )}
      </div>
    </nav>
  );
}

export default NavSidebar;
