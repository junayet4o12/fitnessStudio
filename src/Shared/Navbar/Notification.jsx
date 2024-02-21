import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
  Badge,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { FaBell } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import '../../Pages/Dashboard/Sidebar.css'


function ClockIcon() {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99998 14.9C9.69736 14.9 11.3252 14.2257 12.5255 13.0255C13.7257 11.8252 14.4 10.1974 14.4 8.49998C14.4 6.80259 13.7257 5.17472 12.5255 3.97449C11.3252 2.77426 9.69736 2.09998 7.99998 2.09998C6.30259 2.09998 4.67472 2.77426 3.47449 3.97449C2.27426 5.17472 1.59998 6.80259 1.59998 8.49998C1.59998 10.1974 2.27426 11.8252 3.47449 13.0255C4.67472 14.2257 6.30259 14.9 7.99998 14.9ZM8.79998 5.29998C8.79998 5.0878 8.71569 4.88432 8.56566 4.73429C8.41563 4.58426 8.21215 4.49998 7.99998 4.49998C7.7878 4.49998 7.58432 4.58426 7.43429 4.73429C7.28426 4.88432 7.19998 5.0878 7.19998 5.29998V8.49998C7.20002 8.71213 7.28434 8.91558 7.43438 9.06558L9.69678 11.3288C9.7711 11.4031 9.85934 11.4621 9.95646 11.5023C10.0536 11.5425 10.1577 11.5632 10.2628 11.5632C10.3679 11.5632 10.472 11.5425 10.5691 11.5023C10.6662 11.4621 10.7544 11.4031 10.8288 11.3288C10.9031 11.2544 10.9621 11.1662 11.0023 11.0691C11.0425 10.972 11.0632 10.8679 11.0632 10.7628C11.0632 10.6577 11.0425 10.5536 11.0023 10.4565C10.9621 10.3593 10.9031 10.2711 10.8288 10.1968L8.79998 8.16878V5.29998Z"
        fill="#90A4AE"
      />
    </svg>
  );
}

export function NotificationsMenu() {

  const axiosPublic = useAxiosPublic()
  const { user } = useAuth()

  const { data } = useQuery({
    queryKey: [user],
    queryFn: async () => {
      const res = await axiosPublic.get(`/get_following_and_follower/${user?.email}`)
      return res?.data
    }
  })
  // console.log(data);

  const { data: blogsNotify = [] } = useQuery({
    queryKey: ['blogsNotify'],
    queryFn: async () => {
      const response = await axiosPublic.get(`/following_users_blog/${user?.email}`);
      return response.data;
    }
  })
  // console.log(blogsNotify);

  // Get the current time in milliseconds
const currentTime = new Date().getTime();
const storedTime = blogsNotify?.map(item => (item?.time));
const differenceTime = currentTime - storedTime;

  // Convert milliseconds to minutes, hours, or days
  const minutes = Math.floor(differenceTime / (1000 * 60));
  const hours = Math.floor(differenceTime / (1000 * 60 * 60));
  const days = Math.floor(differenceTime / (1000 * 60 * 60 * 24));

  // Determine the appropriate time unit based on the difference
  let timeAgo;
  if (days > 0) {
    timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    timeAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  // console.log(timeAgo);

  return (
    <Menu>
      <MenuHandler>
        <IconButton variant="text" className="text-xl text-white md:text-2xl mt-2">
          <Badge color="amber"><FaBell /></Badge>
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col gap-2 max-h-80 scroolBar">
        {(data?.followedMembers || []).length === 0 && blogsNotify.length === 0 ? (
          <MenuItem>
            <h1 className="text-lg text-gray-400">No Notifications Here</h1>
          </MenuItem>
        ) : (
          [...(data?.followedMembers || []), ...(blogsNotify || [])].map((item) => (
            <MenuItem key={item?._id} className="flex items-center gap-4 py-2 pl-2 pr-8">
              <Avatar
                variant="circular"
                alt="User Image"
                src={item?.image || item?.userImg}
              />
              <div className="flex flex-col gap-1">
                <Typography variant="small" color="gray" className="font-semibold">
                  {item?.name || item?.userName} {item?.name ? 'has followed you' : item?.userName ? 'posted a blog' : ''}
                </Typography>
                <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                  <ClockIcon />
                  {item?.time ? timeAgo : 'a few minutes ago'}
                </Typography>
              </div>
            </MenuItem>
          ))
        )}
      </MenuList>
    </Menu>
  );
}