import { useEffect, useState } from "react";
import { InputWithButton } from "../Layouts/AddNoteButton";
import { Links } from "../Layouts/Links";
import { ModeToggle } from "../theme/theme";
import { getUrls } from "@/services/user/apiMethods";
import { useSelector } from "react-redux";

import { LogoutModal } from "../Layouts/LogoutModal";

function Home() {
  const [links, setLinks] = useState([]);
  const selectUser = (state: any) => state.auth.user;
  const userData = useSelector(selectUser);
  const userId = userData._id || "";

  useEffect(() => {
    getUrls(userId).then((resposne: any) => {
      setLinks(resposne.data);
    });
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex justify-end gap-4 p-5">
        <ModeToggle />
        <LogoutModal />
      </div>
      <div className="flex justify-center items-center mt-12">
        <InputWithButton setLinks={setLinks} />
      </div>
      <div className=" flex gap-5 flex-wrap justify-center  mt-14">
        {links.map((link) => (
          <Links link={link} />
        ))}
      </div>
    </div>
  );
}

export default Home;
