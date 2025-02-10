import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (!res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Job<span className="text-yellow-300">Spark</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="text-white hover:text-yellow-300 transition-colors"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="text-white hover:text-yellow-300 transition-colors"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="text-white hover:text-yellow-300 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="text-white hover:text-yellow-300 transition-colors"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="text-white hover:text-yellow-300 transition-colors"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <Button className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 transition-colors">
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-yellow-300 text-purple-700 hover:bg-white hover:text-purple-600 transition-colors">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer border border-yellow-300 h-8 w-8 rounded-full overflow-hidden flex items-center justify-center bg-yellow-300">
                  <AvatarImage
                    className="h-full w-full object-cover"
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname || "User"}
                  />
                  <AvatarFallback className="text-purple-700 text-xs">
                    {user?.fullname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 mt-2 p-0 bg-transparent border-none"
                style={{ zIndex: 9999 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="bg-gradient-to-br from-purple-700 via-pink-600 to-yellow-400 p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="cursor-pointer border-2 border-white h-16 w-16 rounded-full overflow-hidden">
                        <AvatarImage
                          className="h-full w-full object-cover"
                          src={user?.profile?.profilePhoto}
                          alt={user?.fullname || "User"}
                        />
                        <AvatarFallback className="bg-yellow-300 text-purple-700 text-xl font-bold flex items-center justify-center">
                          {user?.fullname?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-lg text-white">
                          {user?.fullname}
                        </h4>
                        <p className="text-sm text-yellow-300">
                          {user?.profile?.bio || "No bio available"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4">
                    <div className="flex flex-col gap-3">
                      {user && user.role === "student" && (
                        <button>
                          <Link
                            to="/profile"
                            className="flex items-center gap-2 text-purple-700 hover:text-pink-600 transition-colors"
                          >
                            <User2 className="h-5 w-5" />
                            <span>View Profile</span>
                          </Link>
                        </button>
                      )}
                      <button
                        onClick={logoutHandler}
                        className="flex items-center gap-2 text-purple-700 hover:text-pink-600 transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
