
import { Outlet } from "react-router-dom";

export function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <img
          // src="https://ibb.co/3SbJsz2https://i.ibb.co/wpqvLsV/6188cb69-0b91-4977-9815-3da485b106c8.jpg"
          src="https://i.ibb.co/ss4BPHn/6188cb69-0b91-4977-9815-3da485b106c8.jpg"
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
