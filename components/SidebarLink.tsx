import { SidebarLinksProps } from "@/utils/typings";

function SidebarLink({ name, Icon, onClick }: SidebarLinksProps) {
  return (

    <div onClick = {onClick} className="flex items-center space-x-4 text-black group cursor-pointer hover:bg-gray-100 rounded-lg p-3 w-fit xl:w-full">
      {<Icon className="w-7 h-7 group-hover:scale-110 duration-50 ease-in-out transtion transform" />}
      <p className={`${name.toLowerCase() == 'home' && 'font-semibold'} font-normal hidden lg:inline-flex text-lg`}>{name}</p>
    </div>
  );
}

export default SidebarLink;
