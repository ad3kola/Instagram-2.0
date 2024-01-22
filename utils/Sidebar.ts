import { ChatBubbleLeftEllipsisIcon, HeartIcon, MagnifyingGlassIcon, MapPinIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { SidebarLinksProps } from "./typings";

export const SidebarLinks: SidebarLinksProps[] = [
    {name: 'Home', Icon: HomeIcon},
    {name: 'Search', Icon: MagnifyingGlassIcon},
    {name: 'Explore', Icon: MapPinIcon},
    {name: 'Reels', Icon: VideoCameraIcon},    
]