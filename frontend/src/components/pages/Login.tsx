
import { Outlet } from "react-router-dom";

export function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <img
          src="https://i.pinimg.com/564x/c5/b4/88/c5b488608a65dad4b12e9bc19eb55962.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <Outlet />
    </div>
  );
}
