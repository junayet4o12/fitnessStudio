import { useEffect, useState } from "react";
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
import { FaBell } from "react-icons/fa";
import { io } from "socket.io-client";
import useAuth from "../../Hooks/useAuth";

const Notification2 = () => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth()

  useEffect(() => {
    setSocket(io("wss://green-aquamarine-pint.glitch.me"));
  }, [])

  useEffect(() => {
    socket.emit('blogsNotify', user)
  }, [socket, user])

  return (
    <Menu>
      <MenuHandler>
        <IconButton variant="text" className="text-xl md:text-2xl mt-2">
          <Badge color="amber"><FaBell /></Badge>
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col gap-2 max-h-80 scroolBar">
        <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8">
          <Avatar
            variant="circular"
            alt="paypal"
            src="https://dwglogo.com/wp-content/uploads/2016/08/PayPal_Logo_Icon.png"
          />
          <div className="flex flex-col gap-1">
            <Typography variant="small" color="gray" className="font-semibold">
              You&apos;ve received a payment.
            </Typography>
            <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
              {/* <ClockIcon />5 hours ago */}
            </Typography>
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Notification2;