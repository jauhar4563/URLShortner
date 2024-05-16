import {InputWithButton} from "../Layouts/AddNoteButton";
import { Links } from "../Layouts/Links";
import { ModeToggle } from "../theme/theme";

function Home() {
  return (
    <div className="w-full h-full">
      <div className="flex justify-end p-5">
        <ModeToggle />
      </div>
      <div className="flex justify-center items-center mt-12">

        <InputWithButton />
      </div>
      <div className=" flex gap-5 flex-wrap justify-center  mt-14">
        <Links />
        <Links />
        <Links />
        <Links />
        <Links />
        <Links />
        <Links />

      </div>
    </div>
  )
}

export default Home