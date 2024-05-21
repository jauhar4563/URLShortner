import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { shortenUrl } from "@/services/user/apiMethods";
import { useState } from "react";
import { toast } from "sonner";
import {useSelector} from 'react-redux';


export function InputWithButton({setLinks}:any) {
  const selectUser = (state: any) => state.auth.user;
  const userData = useSelector(selectUser);
  const userId = userData._id || "";
  const [url,setUrl] = useState('');

  const handleSubmit=()=>{
    if(url.trim()==='')
      toast.error("Enter a url");
    else{
      shortenUrl({fullUrl:url, userId}).then((response:any)=>{
        toast("url Stortend");
        setUrl('');
        const url = response.data
        setLinks((prev:any)=>[...prev,url])
        console.log(response)
      })
    }
  }
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="Link" className="h-12 w-96"/>
      <Button type="button" onClick={handleSubmit} className="h-12">Shorten</Button>
    </div>
  )
}
