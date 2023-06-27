import { FC, useCallback, useState } from "react";
import useRegisterModal from "../hooks/useRegister";
import useLoginModal from "../hooks/useLoginModal";
import useCurrentUser from "../hooks/useCurrentUser";
import usePosts from "../hooks/usePosts";
import { toast } from "react-hot-toast";
import axios from "axios";
import { PostModel } from "../models";
import TButton from "./TButton";
import Avatar from "./Avatar";
import usePost from "../hooks/usePost";

const PostForm: FC<PostFormProps> = ({ isComment, placeholder, postID }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postID);
  const [body, setBody] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const url = isComment ? `/api/comments?postID=${encodeURIComponent(postID ?? "")}` : "/api/posts";
      const res = await axios.post<PostModel>(url, { body });
      if (res.data.id) {
        toast.success("Post created successfully");
        setBody("");
        mutatePosts();
        mutatePost();
        mutateCurrentUser();
      } else {
        console.log("--- create post onSubmit response error");
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log("--- post form onSubmit error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [body, isComment, mutateCurrentUser, mutatePost, mutatePosts, postID]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser?.id ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userName={currentUser.userName} />
          </div>
          <div className="w-full">
            <textarea
              disabled={loading}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={placeholder}
              className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="mt-4 flex flex-row justify-end">
              <TButton label="Tweet" disabled={loading || !body} onClick={onSubmit} />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to Twitter</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <TButton label={"Login"} onClick={loginModal.onOpen} />
            <TButton label={"Register"} onClick={registerModal.onOpen} secondary={true} />
          </div>
        </div>
      )}
    </div>
  );
};

interface PostFormProps {
  placeholder?: string;
  isComment?: boolean;
  postID?: string;
}

export default PostForm;
