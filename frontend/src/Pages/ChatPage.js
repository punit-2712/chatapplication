import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../Components/ChatBox.js";
import MyChats from "../Components/MyChats.js";
import SideDrawer from "../Components/miscellaneous/SideDrawer.js";
import { ChatState } from "../Context/ChatProvider.js";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  //destructure kar diya usne 5**
  const { user } = ChatState();
  return (
     <div style={{ width: "100%"}}>
      {/* Checking if user is there or not. then only sideDrawer you can apply. SideDrawer is a component */}
         {user && <SideDrawer />}
         <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
     </div>
  );
};

export default Chatpage;